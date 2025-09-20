# MongoDB Atlas Integration Guide

This guide covers the complete MongoDB Atlas integration for your portfolio website, including setup, configuration, and usage.

## 🚀 Overview

Your portfolio website now includes a comprehensive MongoDB Atlas integration that provides:

- **Real-time Analytics**: Track user interactions and behavior
- **AI Chat Logging**: Persistent storage of chat conversations
- **Contact Form Management**: Professional contact submission handling
- **Performance Monitoring**: Database and application metrics
- **Progressive Enhancement**: Graceful fallbacks for better reliability

## 📁 File Structure

```
/
├── api/
│   ├── mongodb-client.js      # Modern MongoDB client with connection pooling
│   ├── analytics.js          # Analytics API endpoint
│   ├── contact.js            # Contact form API endpoint
│   └── chat-log.js           # Chat logging API endpoint
├── scripts/
│   ├── setup-mongodb-indexes.js  # Database optimization script
│   └── test-integrations.js      # Comprehensive test suite
├── analytics-tracker.js      # Frontend analytics tracking
├── enhanced-chat-system.js   # Enhanced AI chat with MongoDB
├── progressive-enhancement.js # Class enhancement patterns
├── .env.example              # Environment variable template
└── MONGODB_INTEGRATION.md    # This file
```

## 🛠️ Setup Instructions

### 1. MongoDB Atlas Configuration

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Sign up for a free account
   - Create a new cluster (M0 free tier is sufficient)

2. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

3. **Configure Network Access**:
   - Go to "Network Access" in your Atlas dashboard
   - Add IP address `0.0.0.0/0` for development (restrict in production)
   - Or add your specific IP addresses

4. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Give read/write access to your database

### 2. Environment Variables

1. **Copy Environment Template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Configure Required Variables**:
   ```env
   # MongoDB Atlas Configuration
   MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_DATABASE=personal_website_cs-learning
   MONGODB_USERNAME=your-mongodb-username

   # OpenRouter AI Configuration (if using AI chat)
   OPENROUTER_API_KEY=your-openrouter-api-key
   ```

### 3. Install Dependencies

```bash
npm install mongodb dotenv
```

### 4. Database Setup

Run the database setup script to create indexes and optimize collections:

```bash
node scripts/setup-mongodb-indexes.js setup
```

### 5. Test Integration

Verify everything is working correctly:

```bash
node scripts/test-integrations.js
```

## 📊 Database Schema

### Collections

#### `chat_logs`
Stores AI chat interactions with automatic cleanup after 90 days.

```javascript
{
  _id: ObjectId,
  sessionId: String,        // Indexed
  query: String,           // User's question
  response: String,        // AI's response
  model: String,           // AI model used
  timestamp: Date,         // Indexed
  responseTime: Number,    // Response time in ms
  tokenCount: Number,      // Estimated token usage
  errorOccurred: Boolean,  // Whether an error occurred
  ttl: Date               // TTL for auto-deletion
}
```

#### `analytics_events`
Tracks user interactions and behavior with 1-year retention.

```javascript
{
  _id: ObjectId,
  event: String,          // Event name (indexed)
  timestamp: Date,        // Indexed with TTL
  sessionId: String,      // User session (indexed)
  data: Object,          // Event-specific data
  url: String,           // Page URL
  referrer: String,      // Referrer URL
  viewport: Object,      // Screen dimensions
  device: Object,        // Device information
  userAgent: String      // Browser info
}
```

#### `contact_submissions`
Manages contact form submissions with 2-year retention.

```javascript
{
  _id: ObjectId,
  name: String,          // Required, max 100 chars
  email: String,         // Required, validated format (indexed)
  subject: String,       // Optional, max 200 chars
  message: String,       // Required, 10-5000 chars
  timestamp: Date,       // Indexed with TTL
  status: String,        // 'pending', 'responded', 'archived' (indexed)
  ip: String,           // Submitter IP
  userAgent: String,    // Browser info
  responseTime: Date    // When responded
}
```

### Indexes

The setup script creates optimized indexes for:
- **Performance**: Fast queries on timestamp, sessionId, event types
- **Text Search**: Full-text search across chat logs and contact submissions
- **TTL**: Automatic document expiration based on retention policies
- **Compound**: Multi-field indexes for complex queries

### Views

Pre-built aggregation views for analytics:
- `daily_analytics_summary`: Daily event summaries
- `chat_session_summary`: Chat session statistics
- `contact_submission_summary`: Contact form metrics

## 🔧 API Endpoints

### Analytics API (`/api/analytics`)

**POST** - Log analytics events in batches

**Request Body**:
```javascript
[
  {
    event: "page_view",
    timestamp: 1642781234567,
    sessionId: "session_123",
    data: {
      page: "/about",
      duration: 5000
    }
  }
]
```

**Response**:
```javascript
{
  success: true,
  processed: 1,
  stored: 1,
  timestamp: "2024-01-21T10:30:00.000Z"
}
```

**Rate Limiting**: 60 requests per minute per IP

### Contact Form API (`/api/contact`)

**POST** - Submit contact form

**Request Body**:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  subject: "Project Inquiry",
  message: "I'd like to discuss a project..."
}
```

**Response**:
```javascript
{
  success: true,
  message: "Thank you for your message! I will get back to you within 24 hours.",
  submissionId: "uuid-123",
  timestamp: "2024-01-21T10:30:00.000Z"
}
```

**Rate Limiting**: 5 submissions per hour per IP

**Features**:
- Email validation
- Spam detection
- Content sanitization
- Automatic notifications

### Chat Log API (`/api/chat-log`)

**POST** - Log AI chat interaction

**Request Body**:
```javascript
{
  query: "What is your experience with databases?",
  response: "I have extensive experience with...",
  sessionId: "session_123",
  model: "grok-4-fast",
  responseTime: 1500,
  tokenCount: 45
}
```

**Response**:
```javascript
{
  success: true,
  logId: "uuid-456",
  redacted: false,
  timestamp: "2024-01-21T10:30:00.000Z"
}
```

**Rate Limiting**: 10 requests per minute per session

**Features**:
- Sensitive information detection and redaction
- Automatic TTL for privacy
- Error tracking
- Token usage monitoring

## 🎯 Frontend Integration

### Analytics Tracker

```javascript
// Initialize analytics
const analytics = new AnalyticsTracker({
  endpoint: '/api/analytics',
  batchSize: 10,
  flushInterval: 5000
});

// Track events
analytics.track('button_click', {
  button: 'contact',
  location: 'header'
});

// Track page views automatically
analytics.trackPageView();
```

### Enhanced Chat System

```javascript
// Initialize enhanced chat
const chat = new EnhancedAIChat({
  apiEndpoint: '/api/chat-log',
  enableAnalytics: true,
  fallbackToLocalStorage: true
});

// Chat logs are automatically sent to MongoDB
// with localStorage fallback for offline support
```

### Progressive Enhancement

```javascript
// Enhance existing form validator
const EnhancedValidator = ProgressiveEnhancement.enhanceFormValidator(FormValidator);
const validator = new EnhancedValidator('#contact-form');

// Forms now automatically integrate with MongoDB
// while maintaining backward compatibility
```

## 🔒 Security Features

### Rate Limiting
- **Analytics**: 60 requests/minute per IP
- **Contact**: 5 submissions/hour per IP
- **Chat Logs**: 10 requests/minute per session

### Data Validation
- JSON schema validation for all collections
- Input sanitization and length limits
- Email format validation
- Spam detection with keyword filtering

### Privacy Protection
- Automatic PII detection and redaction
- TTL-based automatic data deletion
- IP address anonymization options
- GDPR-compliant data handling

### Connection Security
- Connection pooling with limits
- Timeout configurations
- Error handling and retry logic
- Secure environment variable management

## 📈 Monitoring & Analytics

### Health Checks

```bash
# Check database health
node scripts/setup-mongodb-indexes.js health

# Run integration tests
node scripts/test-integrations.js

# Test specific components
node scripts/test-integrations.js mongodb
node scripts/test-integrations.js analytics
```

### MongoDB Atlas Monitoring

Built-in Atlas features:
- **Performance Advisor**: Query optimization recommendations
- **Real-time Metrics**: CPU, memory, connections
- **Alerting**: Custom alerts for issues
- **Backup**: Automatic backups with point-in-time recovery

### Custom Metrics

The system tracks:
- **Response Times**: API endpoint performance
- **Error Rates**: Failed requests and database errors
- **Usage Patterns**: Popular features and peak times
- **User Behavior**: Navigation patterns and engagement

## 🚀 Deployment

### Vercel Deployment

1. **Set Environment Variables** in Vercel dashboard:
   ```
   MONGODB_CONNECTION_STRING
   MONGODB_DATABASE
   OPENROUTER_API_KEY
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

### Production Considerations

1. **IP Whitelist**: Restrict MongoDB access to your deployment IPs
2. **Connection Limits**: Monitor and adjust connection pool sizes
3. **Monitoring**: Set up alerts for errors and performance issues
4. **Backups**: Verify automatic backup configuration
5. **SSL/TLS**: Ensure encrypted connections (enabled by default)

## 🔧 Troubleshooting

### Common Issues

**Connection Errors**:
```
Error: connection timed out
```
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Test network connectivity

**Rate Limiting**:
```
HTTP 429: Too Many Requests
```
- Check rate limiting headers
- Implement exponential backoff
- Review request patterns

**Validation Errors**:
```
ValidationError: document failed validation
```
- Check required fields
- Verify data types and formats
- Review collection schemas

### Debug Mode

Enable debug logging:
```javascript
// In analytics tracker
const analytics = new AnalyticsTracker({ debug: true });

// In chat system
const chat = new EnhancedAIChat({ debug: true });
```

### Log Analysis

Monitor logs for:
- Connection pool exhaustion
- Slow query warnings
- Authentication failures
- Rate limit violations

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [MongoDB Performance Best Practices](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/)

## 🔄 Maintenance

### Regular Tasks

1. **Weekly**: Review error logs and performance metrics
2. **Monthly**: Analyze usage patterns and optimize queries
3. **Quarterly**: Review and update indexes based on query patterns
4. **Annually**: Archive old data and review retention policies

### Updates

Keep dependencies updated:
```bash
npm update mongodb
npm audit fix
```

Monitor for:
- MongoDB driver updates
- Security patches
- Performance improvements
- New Atlas features

## 📞 Support

For issues with this integration:

1. **Check Logs**: Review application and MongoDB logs
2. **Run Tests**: Use the test suite to identify issues
3. **Monitor Metrics**: Check Atlas dashboard for performance issues
4. **Review Documentation**: Consult this guide and official docs

---

**Built with modern web standards and optimized for production deployment on Vercel with MongoDB Atlas.**