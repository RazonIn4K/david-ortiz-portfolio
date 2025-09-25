// Enhanced AI Chat System
// Progressive enhancement of existing chat functionality
// Constants
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const TYPING_INDICATOR_TIMEOUT = 1000;
const ERROR_DISPLAY_TIMEOUT = 5000;
const MAX_CHAR_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 20;
const MAX_LOGS_LENGTH = 50;
const HISTORY_CONTEXT_LENGTH = 5;
const TOKEN_ESTIMATE_RATIO = 4; // ~4 characters per token
const CHAT_EVENTS = {
  SYSTEM_INIT: 'chat_system_initialized',
  MESSAGE_SENT: 'chat_message_sent',
  RESPONSE_RECEIVED: 'chat_response_received',
  ERROR: 'chat_error'
};
const API_ENDPOINTS = {
  CHAT: '/api/chat',
  STORAGE: '/api/lightweight-storage',
  ANALYTICS: '/api/analytics'
};
const MESSAGES = {
  RATE_LIMIT: 'Please wait before sending another message.',
  GENERIC_ERROR: 'Sorry, I encountered an error. Please try again.',
  NO_RESPONSE: 'I apologize, but I could not generate a response.'
};
/**
 * Enhanced AI Chat class that extends existing functionality
 * with modern analytics (no external database required)
 */
class EnhancedAIChat {
  constructor(options = {}) {
    this.config = {
      apiEndpoint: API_ENDPOINTS.STORAGE,
      analyticsEndpoint: API_ENDPOINTS.ANALYTICS,
      fallbackToLocalStorage: true,
      enableAnalytics: true,
      debug: false,
      ...options
    };
    // Initialize analytics tracker
    if (this.config.enableAnalytics) {
      // Use unified analytics if available, otherwise fallback to AnalyticsTracker
      this.analytics = window.analytics || (typeof AnalyticsTracker !== 'undefined'
        ? new AnalyticsTracker({
            endpoint: this.config.analyticsEndpoint,
            debug: this.config.debug
          })
        : null);
    }
    // Session management
    this.sessionId = this.getOrCreateSessionId();
    this.conversationHistory = this.loadConversationHistory();
    // Rate limiting state
    this.lastRequestTime = 0;
    this.requestCount = 0;
    this.rateLimitWindow = RATE_LIMIT_WINDOW;
    this.maxRequestsPerWindow = MAX_REQUESTS_PER_WINDOW;
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
      this.analytics.track(CHAT_EVENTS.SYSTEM_INIT, {
        sessionId: this.sessionId,
        hasExistingHistory: this.conversationHistory.length > 0
      });
    }
    if (this.config.debug) {
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
      }, TYPING_INDICATOR_TIMEOUT);
    });
    // Add character counter
    this.addCharacterCounter(inputElement);
    // Add keyboard shortcuts
    inputElement.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e, inputElement);
    });
  }
  /**
   * Handle chat message submission
   * @param {string} message - User message
   */
  async handleChatSubmission(message) {
    if (!this.validateMessage(message)) return;
    if (!this.validateRateLimit()) return;
    const startTime = Date.now();
    try {
      this.trackMessageSent(message);
      this.showThinkingIndicator(true);
      const response = await this.processMessage(message, startTime);
      await this.handleSuccessfulResponse(message, response, startTime);
    } catch (error) {
      await this.handleResponseError(message, error, startTime);
    } finally {
      this.showThinkingIndicator(false);
    }
  }
  /**
   * Validate message before processing
   * @param {string} message - User message
   * @returns {boolean} True if message is valid
   */
  validateMessage(message) {
    return message && message.length > 0;
  }
  /**
   * Validate rate limiting
   * @returns {boolean} True if within rate limit
   */
  validateRateLimit() {
    if (!this.checkRateLimit()) {
      this.showError(MESSAGES.RATE_LIMIT);
      return false;
    }
    return true;
  }
  /**
   * Process message and get AI response
   * @param {string} message - User message
   * @param {number} startTime - Processing start time
   * @returns {Promise<string>} AI response
   */
  async processMessage(message, startTime) {
    const response = await this.sendToAI(message);
    const responseTime = Date.now() - startTime;
    // Log interaction (non-blocking)
    this.logInteraction(message, response, responseTime).catch(error => {
      if (this.config.debug) {
        console.debug('Failed to log interaction:', error);
      }
    });
    return response;
  }
  /**
   * Handle successful AI response
   * @param {string} message - User message
   * @param {string} response - AI response
   * @param {number} startTime - Processing start time
   */
  async handleSuccessfulResponse(message, response, startTime) {
    const responseTime = Date.now() - startTime;
    this.updateConversationHistory(message, response, responseTime);
    this.updateChatUI(message, response);
    this.trackResponseReceived(response, responseTime);
  }
  /**
   * Handle response error
   * @param {string} message - User message
   * @param {Error} error - Error object
   * @param {number} startTime - Processing start time
   */
  async handleResponseError(message, error, startTime) {
    // Log error (non-blocking)
    this.logInteraction(message, `Error: ${error.message}`, Date.now() - startTime, true)
      .catch(() => {});
    this.showError(MESSAGES.GENERIC_ERROR);
    this.trackError(error);
  }
  /**
   * Track message sent analytics
   * @param {string} message - User message
   */
  trackMessageSent(message) {
    if (this.analytics) {
      this.analytics.track(CHAT_EVENTS.MESSAGE_SENT, {
        messageLength: message.length,
        sessionId: this.sessionId
      });
    }
  }
  /**
   * Track response received analytics
   * @param {string} response - AI response
   * @param {number} responseTime - Response time in ms
   */
  trackResponseReceived(response, responseTime) {
    if (this.analytics) {
      this.analytics.track(CHAT_EVENTS.RESPONSE_RECEIVED, {
        responseTime: responseTime,
        responseLength: response.length,
        sessionId: this.sessionId
      });
    }
  }
  /**
   * Track error analytics
   * @param {Error} error - Error object
   */
  trackError(error) {
    if (this.analytics) {
      this.analytics.track(CHAT_EVENTS.ERROR, {
        error: error.message,
        sessionId: this.sessionId
      });
    }
  }
  /**
   * Update conversation history with messages
   * @param {string} message - User message
   * @param {string} response - AI response
   * @param {number} responseTime - Response time
   */
  updateConversationHistory(message, response, responseTime) {
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
  }
  /**
   * Update chat UI with messages
   * @param {string} message - User message
   * @param {string} response - AI response
   */
  updateChatUI(message, response) {
    this.displayMessage('user', message);
    this.displayMessage('assistant', response);
  }
  /**
   * Handle keyboard shortcuts for chat input
   * @param {KeyboardEvent} e - Keyboard event
   * @param {HTMLElement} inputElement - Input element
   */
  handleKeyboardShortcuts(e, inputElement) {
    if (this.isSubmitShortcut(e)) {
      e.preventDefault();
      this.handleChatSubmission(inputElement.value.trim());
    } else if (this.isClearShortcut(e)) {
      this.clearInput(inputElement);
    }
  }
  /**
   * Check if keyboard event is submit shortcut
   * @param {KeyboardEvent} e - Keyboard event
   * @returns {boolean} True if submit shortcut
   */
  isSubmitShortcut(e) {
    return (e.ctrlKey || e.metaKey) && e.key === 'Enter';
  }
  /**
   * Check if keyboard event is clear shortcut
   * @param {KeyboardEvent} e - Keyboard event
   * @returns {boolean} True if clear shortcut
   */
  isClearShortcut(e) {
    return e.key === 'Escape';
  }
  /**
   * Clear input field
   * @param {HTMLElement} inputElement - Input element
   */
  clearInput(inputElement) {
    inputElement.value = '';
    this.showTypingIndicator(false);
  }
  /**
   * Send message to AI service
   */
  async sendToAI(message) {
    // Check if chat is enabled
    if (!window.CONFIG?.ENABLE_AI_CHAT) {
      return 'Chat is currently unavailable. Please use the contact form.';
    }
    const response = await fetch(API_ENDPOINTS.CHAT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sessionId: this.sessionId,
        history: this.conversationHistory.slice(-HISTORY_CONTEXT_LENGTH) // Last messages for context
      })
    });
    if (!response.ok) {
      // Graceful fallback for 404 or disabled endpoint
      if (response.status === 404) {
        return 'Chat is temporarily offline. Please reach me via the contact form.';
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.response || data.message || MESSAGES.NO_RESPONSE;
  }
  /**
   * Log chat interaction (local-only)
   */
  async logInteraction(query, response, responseTime, errorOccurred = false) {
    // Local storage only to avoid external dependencies
    this.saveToLocalStorage(query, response, responseTime, errorOccurred);
    return { success: true };
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
      if (logs.length > MAX_LOGS_LENGTH) {
        logs.splice(0, logs.length - MAX_LOGS_LENGTH);
      }
      localStorage.setItem('chat_logs', JSON.stringify(logs));
      if (this.config.debug) {
      }
    } catch (error) {
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
    }
  }
  /**
   * Add character counter to input
   */
  addCharacterCounter(inputElement) {
    const maxLength = MAX_CHAR_LENGTH;
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
    }, ERROR_DISPLAY_TIMEOUT);
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
      return [];
    }
  }
  addToConversationHistory(entry) {
    this.conversationHistory.push(entry);
    // Keep only last 20 messages
    if (this.conversationHistory.length > MAX_HISTORY_LENGTH) {
      this.conversationHistory = this.conversationHistory.slice(-MAX_HISTORY_LENGTH);
    }
    // Save to session storage
    try {
      sessionStorage.setItem(
        `chat_history_${this.sessionId}`,
        JSON.stringify(this.conversationHistory)
      );
    } catch (error) {
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
    return Math.ceil(text.length / TOKEN_ESTIMATE_RATIO);
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
   * Sync pending logs from localStorage (no remote sync)
   */
  async syncPendingLogs() {
    try {
      const logs = JSON.parse(localStorage.getItem('chat_logs') || '[]');
      const pendingLogs = logs.filter(log => !log.synced);
      if (pendingLogs.length === 0) return;
      // No remote syncing; mark all as synced to prevent reprocessing
      for (const log of pendingLogs) {
        log.synced = true;
      }
      // Update localStorage
      localStorage.setItem('chat_logs', JSON.stringify(logs));
      if (this.config.debug) {
      }
    } catch (error) {
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