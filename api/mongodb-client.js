// Modern MongoDB Client for Portfolio Website
// Compatible with serverless environments and edge functions

/**
 * MongoDB Client using connection string approach
 * Fallback to Data API when available
 */
class MongoDBClient {
  constructor() {
    // Use environment variables for security
    this.connectionString = process.env.MONGODB_CONNECTION_STRING || '';
    this.database = process.env.MONGODB_DATABASE || 'personal_website_cs-learning';
    this.dataApiKey = process.env.MONGODB_DATA_API_KEY;
    this.dataApiUrl = process.env.MONGODB_DATA_API_URL;

    // Connection caching for serverless
    this.cachedConnection = null;
    this.connectionPromise = null;
  }

  /**
   * Get MongoDB connection with caching for serverless
   */
  async getConnection() {
    // Return cached connection if available
    if (this.cachedConnection && this.cachedConnection.readyState === 1) {
      return this.cachedConnection;
    }

    // Return existing connection promise if in progress
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // Create new connection
    this.connectionPromise = this.createConnection();
    this.cachedConnection = await this.connectionPromise;
    this.connectionPromise = null;

    return this.cachedConnection;
  }

  /**
   * Create new MongoDB connection
   */
  async createConnection() {
    if (typeof window !== 'undefined') {
      throw new Error('MongoDB client should only be used server-side');
    }

    try {
      const { MongoClient } = await import('mongodb');

      const client = new MongoClient(this.connectionString, {
        maxPoolSize: 10, // Limit connections for serverless
        serverSelectionTimeoutMS: 5000, // Quick timeout for serverless
        socketTimeoutMS: 45000
      });

      await client.connect();
      console.log('✅ Connected to MongoDB Atlas');

      return client.db(this.database);
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      throw error;
    }
  }

  /**
   * Log AI chat interaction
   */
  async logChatInteraction(data) {
    try {
      const db = await this.getConnection();
      const collection = db.collection('chat_logs');

      const document = {
        ...data,
        timestamp: new Date(),
        _id: this.generateId(),
        ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days TTL
      };

      const result = await collection.insertOne(document);
      return { success: true, id: result.insertedId };
    } catch (error) {
      console.error('Chat logging error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Log analytics event
   */
  async logAnalyticsEvent(eventData) {
    try {
      const db = await this.getConnection();
      const collection = db.collection('analytics_events');

      const document = {
        ...eventData,
        timestamp: new Date(),
        _id: this.generateId()
      };

      const result = await collection.insertOne(document);
      return { success: true, id: result.insertedId };
    } catch (error) {
      console.error('Analytics logging error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store contact form submission
   */
  async storeContactSubmission(formData) {
    try {
      const db = await this.getConnection();
      const collection = db.collection('contact_submissions');

      const document = {
        ...formData,
        timestamp: new Date(),
        _id: this.generateId(),
        status: 'pending',
        responseTime: null
      };

      const result = await collection.insertOne(document);
      return { success: true, id: result.insertedId };
    } catch (error) {
      console.error('Contact form storage error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary(timeRange = '7d') {
    try {
      const db = await this.getConnection();
      const collection = db.collection('analytics_events');

      const startDate = this.getTimeRangeDate(timeRange);

      const pipeline = [
        { $match: { timestamp: { $gte: startDate } } },
        {
          $group: {
            _id: '$event',
            count: { $sum: 1 },
            lastOccurrence: { $max: '$timestamp' }
          }
        },
        { $sort: { count: -1 } }
      ];

      const results = await collection.aggregate(pipeline).toArray();
      return { success: true, data: results };
    } catch (error) {
      console.error('Analytics summary error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Batch insert for better performance
   */
  async batchInsert(collectionName, documents) {
    try {
      const db = await this.getConnection();
      const collection = db.collection(collectionName);

      const documentsWithIds = documents.map(doc => ({
        ...doc,
        _id: this.generateId(),
        timestamp: new Date()
      }));

      const result = await collection.insertMany(documentsWithIds, { ordered: false });
      return { success: true, insertedCount: result.insertedCount };
    } catch (error) {
      console.error('Batch insert error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Health check for monitoring
   */
  async healthCheck() {
    try {
      const db = await this.getConnection();
      await db.admin().ping();
      return {
        success: true,
        status: 'healthy',
        database: this.database,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  /**
   * Generate unique ID for documents
   */
  generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback ID generation
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get date for time range queries
   */
  getTimeRangeDate(range) {
    const now = new Date();
    switch (range) {
      case '1h': return new Date(now - 60 * 60 * 1000);
      case '24h': return new Date(now - 24 * 60 * 60 * 1000);
      case '7d': return new Date(now - 7 * 24 * 60 * 60 * 1000);
      case '30d': return new Date(now - 30 * 24 * 60 * 60 * 1000);
      default: return new Date(now - 7 * 24 * 60 * 60 * 1000);
    }
  }

  /**
   * Close connection (for cleanup)
   */
  async close() {
    if (this.cachedConnection) {
      await this.cachedConnection.client.close();
      this.cachedConnection = null;
    }
  }
}

// Export for ES modules
export default MongoDBClient;