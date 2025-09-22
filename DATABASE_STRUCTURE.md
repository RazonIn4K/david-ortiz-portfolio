# MongoDB Database Structure Documentation
## Portfolio Website - Clean Database Implementation

**Database Name:** `personal_website_cs-learning`
**Created:** September 21, 2025
**Purpose:** Clean, organized data storage for portfolio website functionality

---

## 🗄️ Collections Overview

### 1. **chat_logs**
**Purpose:** Store AI chat interactions and conversation history
**Indexes:**
- `timestamp: -1` (Primary sort for recent conversations)
- `sessionId: 1` (Group conversations by session)
- `userId: 1` (Track user interactions)

**Schema:**
```javascript
{
  _id: ObjectId,
  sessionId: String,          // Unique session identifier
  userId: String,             // User identifier (optional)
  query: String,              // User's question/message
  response: String,           // AI assistant's response
  timestamp: Date,            // When the interaction occurred
  responseTime: Number,       // Response time in milliseconds
  model: String,              // AI model used (e.g., "x-ai/grok-4-fast:free")
  metadata: Object            // Additional context data
}
```

### 2. **contact_submissions**
**Purpose:** Store contact form submissions and inquiries
**Indexes:**
- `timestamp: -1` (Recent submissions first)
- `email: 1` (Quick lookup by email)
- `status: 1` (Filter by processing status)

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String,               // Submitter's name
  email: String,              // Contact email address
  subject: String,            // Message subject (optional)
  message: String,            // Message content
  timestamp: Date,            // Submission time
  status: String,             // "new", "read", "responded", "archived"
  ipAddress: String,          // Submitter's IP (for security)
  userAgent: String,          // Browser information (optional)
  source: String              // Form source ("contact_page", "footer", etc.)
}
```

### 3. **analytics_events**
**Purpose:** Track user behavior and website analytics
**Indexes:**
- `timestamp: -1` (Chronological analysis)
- `event_type: 1` (Group by event type)
- `page: 1` (Page-specific analytics)

**Schema:**
```javascript
{
  _id: ObjectId,
  event_type: String,         // "page_view", "click", "scroll", "form_submit"
  page: String,               // Page URL or identifier
  timestamp: Date,            // Event occurrence time
  sessionId: String,          // Session identifier
  userId: String,             // User identifier (optional)
  userAgent: String,          // Browser information
  referrer: String,           // Referring page
  metadata: Object            // Event-specific data
}
```

### 4. **user_sessions**
**Purpose:** Manage user sessions and activity tracking
**Indexes:**
- `sessionId: 1` (Unique constraint)
- `lastActivity: -1` (Active sessions first)
- `createdAt: -1` (Recent sessions first)

**Schema:**
```javascript
{
  _id: ObjectId,
  sessionId: String,          // Unique session identifier (indexed unique)
  userId: String,             // User identifier (optional)
  createdAt: Date,            // Session start time
  lastActivity: Date,         // Last interaction time
  ipAddress: String,          // User's IP address
  userAgent: String,          // Browser information
  pages: Array,               // Pages visited in session
  events: Number,             // Total events in session
  duration: Number,           // Session duration in seconds
  isActive: Boolean           // Session active status
}
```

### 5. **performance_metrics**
**Purpose:** Store website performance and monitoring data
**Indexes:**
- `timestamp: -1` (Time-series data)
- `metric_type: 1` (Group by metric type)

**Schema:**
```javascript
{
  _id: ObjectId,
  metric_type: String,        // "lighthouse", "core_web_vitals", "api_response"
  timestamp: Date,            // Measurement time
  value: Number,              // Metric value
  unit: String,               // Measurement unit ("ms", "score", "bytes")
  page: String,               // Page being measured
  metadata: Object,           // Additional metric data
  thresholds: Object          // Performance thresholds
}
```

---

## 🔧 Database Configuration

### Connection Details
- **Cluster:** Stored in environment variables
- **Username:** Stored in environment variables
- **Database:** `personal_website_cs-learning`
- **Connection String:** Stored in environment variables

### Environment Variables
```env
MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DATABASE=personal_website_cs-learning
MONGODB_USERNAME=your-username
```

---

## 🚀 Implementation Notes

### Features Implemented
- ✅ **Optimized Indexes:** Strategic indexing for common query patterns
- ✅ **Scalable Schema:** Flexible document structure for future expansion
- ✅ **Time-Series Ready:** Timestamp indexing for analytics and monitoring
- ✅ **Security Aware:** IP tracking and user agent logging for security analysis
- ✅ **Clean Structure:** No legacy data or duplicate collections

### Performance Optimizations
- **Compound Indexes:** Multiple field indexing for complex queries
- **TTL Indexes:** Automatic data expiration (can be added later)
- **Aggregation Pipeline Ready:** Schema optimized for MongoDB aggregation
- **Sharding Prepared:** Structure supports horizontal scaling

### Integration Points
- **Chat System:** Real-time logging of AI interactions
- **Contact Forms:** Secure submission handling with status tracking
- **Analytics:** Comprehensive user behavior tracking
- **Monitoring:** Performance metrics collection for optimization

---

## 📋 Maintenance Tasks

### Daily
- Monitor collection sizes and growth rates
- Check for failed insertions or connection issues
- Review recent chat logs for system health

### Weekly
- Analyze analytics events for user behavior patterns
- Review contact submissions and response times
- Check index usage and performance metrics

### Monthly
- Optimize indexes based on query patterns
- Archive old data if storage limits approached
- Review and update performance thresholds
- Backup database structure and sample data

---

## 🔍 Query Examples

### Recent Chat Logs
```javascript
db.chat_logs.find().sort({timestamp: -1}).limit(10)
```

### Contact Submissions by Status
```javascript
db.contact_submissions.find({status: "new"}).sort({timestamp: -1})
```

### Analytics for Specific Page
```javascript
db.analytics_events.find({page: "/contact"}).sort({timestamp: -1})
```

### Active User Sessions
```javascript
db.user_sessions.find({isActive: true}).sort({lastActivity: -1})
```

---

## ✅ Testing Status

**Database Status:** ✅ **ACTIVE AND TESTED**
**Test Results:**
- ✅ Chat logs: Insert/query successful
- ✅ Contact submissions: Insert/query successful
- ✅ Analytics events: Insert/query successful
- ✅ Indexes: All created and functioning
- ✅ Website connectivity: Verified working

**Last Updated:** September 21, 2025
**Next Review:** October 21, 2025

---

*This documentation reflects the clean database implementation created after removing duplicate databases and establishing proper structure for the portfolio website.*