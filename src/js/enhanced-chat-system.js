// Enhanced AI Chat System with MongoDB Integration
// Progressive enhancement of existing chat functionality

/**
 * Enhanced AI Chat class that extends existing functionality
 * with MongoDB logging and modern analytics
 */
class EnhancedAIChat {
  constructor(options = {}) {
    this.config = {
      apiEndpoint: '/api/lightweight-storage',
      analyticsEndpoint: '/api/analytics',
      fallbackToLocalStorage: true,
      enableAnalytics: true,
      debug: false,
      ...options
    };

    // Initialize analytics tracker
    if (this.config.enableAnalytics && typeof AnalyticsTracker !== 'undefined') {
      this.analytics = new AnalyticsTracker({
        endpoint: this.config.analyticsEndpoint,
        debug: this.config.debug
      });
    }

    // Session management
    this.sessionId = this.getOrCreateSessionId();
    this.conversationHistory = this.loadConversationHistory();

    // Rate limiting state
    this.lastRequestTime = 0;
    this.requestCount = 0;
    this.rateLimitWindow = 60 * 1000; // 1 minute
    this.maxRequestsPerWindow = 10;

    this.init();
  }

  /**
   * Initialize enhanced chat system
   */
  init() {
    // Extend existing chat UI if it exists
    this.enhanceExistingChat();

    // Set up event listeners
    this.setupEventListeners();

    // Track chat system initialization
    if (this.analytics) {
      this.analytics.track('chat_system_initialized', {
        sessionId: this.sessionId,
        hasExistingHistory: this.conversationHistory.length > 0
      });
    }

    if (this.config.debug) {
      console.log('🤖 Enhanced AI Chat System initialized', {
        sessionId: this.sessionId,
        historyCount: this.conversationHistory.length
      });
    }
  }

  /**
   * Enhance existing chat functionality if present
   */
  enhanceExistingChat() {
    // Look for existing chat interface
    const existingChatForm = document.querySelector('#ai-chat-form');
    const existingChatInput = document.querySelector('#chat-input');
    const existingChatMessages = document.querySelector('#chat-messages');

    if (existingChatForm && existingChatInput) {
      // Enhance existing form submission
      existingChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleChatSubmission(existingChatInput.value.trim());
      });

      // Add enhanced features to input
      this.enhanceInputField(existingChatInput);
    }

    if (existingChatMessages) {
      // Load conversation history into existing chat
      this.displayConversationHistory(existingChatMessages);
    }
  }

  /**
   * Enhance chat input field with modern features
   */
  enhanceInputField(inputElement) {
    // Add typing indicators
    let typingTimer;
    inputElement.addEventListener('input', () => {
      clearTimeout(typingTimer);
      this.showTypingIndicator(true);

      typingTimer = setTimeout(() => {
        this.showTypingIndicator(false);
      }, 1000);
    });

    // Add character counter
    this.addCharacterCounter(inputElement);

    // Add keyboard shortcuts
    inputElement.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.handleChatSubmission(inputElement.value.trim());
      }

      // Escape to clear
      if (e.key === 'Escape') {
        inputElement.value = '';
        this.showTypingIndicator(false);
      }
    });
  }

  /**
   * Handle chat message submission
   */
  async handleChatSubmission(message) {
    if (!message || message.length === 0) return;

    // Check rate limiting
    if (!this.checkRateLimit()) {
      this.showError('Please wait before sending another message.');
      return;
    }

    const startTime = Date.now();

    try {
      // Track message submission
      if (this.analytics) {
        this.analytics.track('chat_message_sent', {
          messageLength: message.length,
          sessionId: this.sessionId
        });
      }

      // Show thinking indicator
      this.showThinkingIndicator(true);

      // Send message to AI (integrate with existing AI logic)
      const response = await this.sendToAI(message);
      const responseTime = Date.now() - startTime;

      // Log to MongoDB (non-blocking)
      this.logToMongoDB(message, response, responseTime).catch(error => {
        console.warn('Failed to log to MongoDB:', error);
      });

      // Update conversation history
      this.addToConversationHistory({
        type: 'user',
        message: message,
        timestamp: new Date()
      });

      this.addToConversationHistory({
        type: 'assistant',
        message: response,
        timestamp: new Date(),
        responseTime: responseTime
      });

      // Update UI
      this.displayMessage('user', message);
      this.displayMessage('assistant', response);

      // Track successful response
      if (this.analytics) {
        this.analytics.track('chat_response_received', {
          responseTime: responseTime,
          responseLength: response.length,
          sessionId: this.sessionId
        });
      }

    } catch (error) {
      console.error('Chat error:', error);

      // Log error to MongoDB
      this.logToMongoDB(message, `Error: ${error.message}`, Date.now() - startTime, true)
        .catch(console.error);

      // Show error to user
      this.showError('Sorry, I encountered an error. Please try again.');

      // Track error
      if (this.analytics) {
        this.analytics.track('chat_error', {
          error: error.message,
          sessionId: this.sessionId
        });
      }

    } finally {
      this.showThinkingIndicator(false);
    }
  }

  /**
   * Send message to AI service
   */
  async sendToAI(message) {
    // This should integrate with your existing AI chat logic
    // For now, returning a placeholder - replace with actual implementation

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sessionId: this.sessionId,
        history: this.conversationHistory.slice(-5) // Last 5 messages for context
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || data.message || 'I apologize, but I could not generate a response.';
  }

  /**
   * Log chat interaction to MongoDB
   */
  async logToMongoDB(query, response, responseTime, errorOccurred = false) {
    if (!this.config.apiEndpoint) return;

    try {
      const logData = {
        query: query,
        response: response,
        sessionId: this.sessionId,
        model: 'grok-4-fast', // or get from config
        responseTime: responseTime,
        tokenCount: this.estimateTokenCount(query + response),
        errorOccurred: errorOccurred,
        timestamp: new Date().toISOString()
      };

      const response_log = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
        keepalive: true
      });

      if (!response_log.ok) {
        throw new Error(`Logging failed: ${response_log.status}`);
      }

      const result = await response_log.json();

      if (this.config.debug) {
        console.log('✅ Chat logged to MongoDB:', result);
      }

      return result;

    } catch (error) {
      console.error('MongoDB logging error:', error);

      // Fallback to localStorage if enabled
      if (this.config.fallbackToLocalStorage) {
        this.saveToLocalStorage(query, response, responseTime, errorOccurred);
      }

      throw error;
    }
  }

  /**
   * Fallback storage to localStorage
   */
  saveToLocalStorage(query, response, responseTime, errorOccurred) {
    try {
      const logs = JSON.parse(localStorage.getItem('chat_logs') || '[]');

      logs.push({
        query,
        response,
        sessionId: this.sessionId,
        responseTime,
        errorOccurred,
        timestamp: new Date().toISOString(),
        synced: false
      });

      // Keep only last 50 logs
      if (logs.length > 50) {
        logs.splice(0, logs.length - 50);
      }

      localStorage.setItem('chat_logs', JSON.stringify(logs));

      if (this.config.debug) {
        console.log('💾 Chat saved to localStorage');
      }

    } catch (error) {
      console.error('localStorage save error:', error);
    }
  }

  /**
   * Rate limiting check
   */
  checkRateLimit() {
    const now = Date.now();

    // Reset counter if window has passed
    if (now - this.lastRequestTime > this.rateLimitWindow) {
      this.requestCount = 0;
      this.lastRequestTime = now;
    }

    // Check if limit exceeded
    if (this.requestCount >= this.maxRequestsPerWindow) {
      return false;
    }

    this.requestCount++;
    return true;
  }

  /**
   * Display message in chat UI
   */
  displayMessage(type, message) {
    const chatMessages = document.querySelector('#chat-messages');
    if (!chatMessages) return;

    const messageElement = document.createElement('div');
    messageElement.className = `chat-message chat-message-${type}`;
    messageElement.innerHTML = `
      <div class="message-content">${this.escapeHtml(message)}</div>
      <div class="message-timestamp">${new Date().toLocaleTimeString()}</div>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Animate new message
    requestAnimationFrame(() => {
      messageElement.classList.add('message-visible');
    });
  }

  /**
   * Show/hide thinking indicator
   */
  showThinkingIndicator(show) {
    let indicator = document.querySelector('.thinking-indicator');

    if (show && !indicator) {
      indicator = document.createElement('div');
      indicator.className = 'thinking-indicator';
      indicator.innerHTML = `
        <div class="thinking-dots">
          <span></span><span></span><span></span>
        </div>
        <span>Thinking...</span>
      `;

      const chatMessages = document.querySelector('#chat-messages');
      if (chatMessages) {
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    } else if (!show && indicator) {
      indicator.remove();
    }
  }

  /**
   * Show/hide typing indicator
   */
  showTypingIndicator(show) {
    // This could be integrated with existing UI
    if (this.config.debug) {
      console.log(show ? '⌨️ User typing...' : '⌨️ User stopped typing');
    }
  }

  /**
   * Add character counter to input
   */
  addCharacterCounter(inputElement) {
    const maxLength = 1000;

    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `0/${maxLength}`;

    inputElement.parentNode.appendChild(counter);

    inputElement.addEventListener('input', () => {
      const length = inputElement.value.length;
      counter.textContent = `${length}/${maxLength}`;
      counter.classList.toggle('warning', length > maxLength * 0.8);
      counter.classList.toggle('error', length > maxLength);
    });
  }

  /**
   * Show error message
   */
  showError(message) {
    // Create error toast or integrate with existing error handling
    const error = document.createElement('div');
    error.className = 'chat-error';
    error.textContent = message;

    document.body.appendChild(error);

    setTimeout(() => {
      error.remove();
    }, 5000);
  }

  /**
   * Session management
   */
  getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('chat_session_id');

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('chat_session_id', sessionId);
    }

    return sessionId;
  }

  /**
   * Conversation history management
   */
  loadConversationHistory() {
    try {
      const history = sessionStorage.getItem(`chat_history_${this.sessionId}`);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Failed to load conversation history:', error);
      return [];
    }
  }

  addToConversationHistory(entry) {
    this.conversationHistory.push(entry);

    // Keep only last 20 messages
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    // Save to session storage
    try {
      sessionStorage.setItem(
        `chat_history_${this.sessionId}`,
        JSON.stringify(this.conversationHistory)
      );
    } catch (error) {
      console.error('Failed to save conversation history:', error);
    }
  }

  displayConversationHistory(container) {
    this.conversationHistory.forEach(entry => {
      this.displayMessage(entry.type, entry.message);
    });
  }

  /**
   * Utility functions
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  estimateTokenCount(text) {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  setupEventListeners() {
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      // Sync any pending localStorage data
      this.syncPendingLogs();
    });

    // Network status monitoring
    window.addEventListener('online', () => {
      this.syncPendingLogs();
    });
  }

  /**
   * Sync pending logs from localStorage to MongoDB
   */
  async syncPendingLogs() {
    try {
      const logs = JSON.parse(localStorage.getItem('chat_logs') || '[]');
      const pendingLogs = logs.filter(log => !log.synced);

      if (pendingLogs.length === 0) return;

      for (const log of pendingLogs) {
        try {
          await this.logToMongoDB(
            log.query,
            log.response,
            log.responseTime,
            log.errorOccurred
          );

          // Mark as synced
          log.synced = true;
        } catch (error) {
          console.error('Failed to sync log:', error);
        }
      }

      // Update localStorage
      localStorage.setItem('chat_logs', JSON.stringify(logs));

      if (this.config.debug) {
        console.log(`🔄 Synced ${pendingLogs.length} pending logs`);
      }

    } catch (error) {
      console.error('Sync error:', error);
    }
  }

  /**
   * Enable debug mode
   */
  enableDebug() {
    this.config.debug = true;
    if (this.analytics) {
      this.analytics.enableDebug();
    }
    console.log('🐛 Enhanced Chat debug mode enabled');
  }

  /**
   * Get chat statistics
   */
  getStats() {
    return {
      sessionId: this.sessionId,
      messageCount: this.conversationHistory.length,
      requestCount: this.requestCount,
      rateLimitWindow: this.rateLimitWindow,
      maxRequestsPerWindow: this.maxRequestsPerWindow
    };
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.EnhancedAIChat = EnhancedAIChat;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.enhancedChat = new EnhancedAIChat();
    });
  } else {
    window.enhancedChat = new EnhancedAIChat();
  }
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedAIChat;
}