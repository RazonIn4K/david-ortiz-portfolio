// MongoDB Atlas Database Setup and Optimization Script
// Creates indexes, sets up TTL, and optimizes collections

import { MongoClient } from 'mongodb';

/**
 * Database setup configuration
 */
const CONFIG = {
  connectionString: process.env.MONGODB_CONNECTION_STRING,
  database: process.env.MONGODB_DATABASE || 'personal_website_cs-learning',
  collections: {
    chatLogs: 'chat_logs',
    analyticsEvents: 'analytics_events',
    contactSubmissions: 'contact_submissions'
  },
  ttl: {
    chatLogs: 90 * 24 * 60 * 60, // 90 days in seconds
    analyticsEvents: 365 * 24 * 60 * 60, // 1 year in seconds
    contactSubmissions: 730 * 24 * 60 * 60 // 2 years in seconds
  }
};

/**
 * Index definitions for each collection
 */
const INDEXES = {
  chat_logs: [
    // Compound index for session and timestamp queries
    {
      keys: { sessionId: 1, timestamp: -1 },
      options: { name: 'sessionId_timestamp_idx' }
    },
    // Index for timestamp-based queries
    {
      keys: { timestamp: -1 },
      options: { name: 'timestamp_idx' }
    },
    // TTL index for automatic document expiration
    {
      keys: { ttl: 1 },
      options: {
        name: 'ttl_idx',
        expireAfterSeconds: 0 // Expires based on ttl field value
      }
    },
    // Index for model-based queries
    {
      keys: { model: 1 },
      options: { name: 'model_idx' }
    },
    // Text index for searching chat content
    {
      keys: { query: 'text', response: 'text' },
      options: {
        name: 'chat_text_idx',
        weights: { query: 2, response: 1 } // Higher weight for queries
      }
    }
  ],

  analytics_events: [
    // Compound index for event and timestamp queries
    {
      keys: { event: 1, timestamp: -1 },
      options: { name: 'event_timestamp_idx' }
    },
    // Index for session-based queries
    {
      keys: { sessionId: 1, timestamp: -1 },
      options: { name: 'sessionId_timestamp_idx' }
    },
    // Index for timestamp-based queries
    {
      keys: { timestamp: -1 },
      options: { name: 'timestamp_idx' }
    },
    // Index for URL-based analytics
    {
      keys: { 'data.page': 1, timestamp: -1 },
      options: {
        name: 'page_timestamp_idx',
        partialFilterExpression: { 'data.page': { $exists: true } }
      }
    },
    // TTL index for automatic cleanup (1 year)
    {
      keys: { timestamp: 1 },
      options: {
        name: 'analytics_ttl_idx',
        expireAfterSeconds: CONFIG.ttl.analyticsEvents
      }
    }
  ],

  contact_submissions: [
    // Index for timestamp-based queries
    {
      keys: { timestamp: -1 },
      options: { name: 'timestamp_idx' }
    },
    // Index for status-based queries
    {
      keys: { status: 1, timestamp: -1 },
      options: { name: 'status_timestamp_idx' }
    },
    // Index for email-based queries
    {
      keys: { email: 1 },
      options: { name: 'email_idx' }
    },
    // TTL index for automatic cleanup (2 years)
    {
      keys: { timestamp: 1 },
      options: {
        name: 'contact_ttl_idx',
        expireAfterSeconds: CONFIG.ttl.contactSubmissions
      }
    },
    // Text index for searching submissions
    {
      keys: { name: 'text', subject: 'text', message: 'text' },
      options: {
        name: 'contact_text_idx',
        weights: { subject: 3, name: 2, message: 1 }
      }
    }
  ]
};

/**
 * Collection validation schemas
 */
const VALIDATION_SCHEMAS = {
  chat_logs: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['sessionId', 'query', 'response', 'timestamp'],
      properties: {
        sessionId: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 100
        },
        query: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 1000
        },
        response: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 10000
        },
        model: {
          bsonType: 'string',
          maxLength: 50
        },
        timestamp: {
          bsonType: 'date'
        },
        responseTime: {
          bsonType: 'number',
          minimum: 0
        },
        tokenCount: {
          bsonType: 'number',
          minimum: 0
        },
        errorOccurred: {
          bsonType: 'bool'
        }
      }
    }
  },

  analytics_events: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['event', 'timestamp', 'sessionId'],
      properties: {
        event: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 100
        },
        sessionId: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 100
        },
        timestamp: {
          bsonType: 'date'
        },
        data: {
          bsonType: 'object'
        },
        url: {
          bsonType: 'string',
          maxLength: 2000
        },
        userAgent: {
          bsonType: 'string',
          maxLength: 500
        }
      }
    }
  },

  contact_submissions: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'message', 'timestamp'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 100
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          maxLength: 254
        },
        subject: {
          bsonType: 'string',
          maxLength: 200
        },
        message: {
          bsonType: 'string',
          minLength: 1,
          maxLength: 5000
        },
        timestamp: {
          bsonType: 'date'
        },
        status: {
          bsonType: 'string',
          enum: ['pending', 'responded', 'archived']
        }
      }
    }
  }
};

/**
 * Main setup function
 */
async function setupDatabase() {
  console.log('🚀 Starting MongoDB Atlas database setup...');

  if (!CONFIG.connectionString) {
    throw new Error('MONGODB_CONNECTION_STRING environment variable is required');
  }

  const client = new MongoClient(CONFIG.connectionString);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db(CONFIG.database);

    // Setup each collection
    for (const [collectionName, indexes] of Object.entries(INDEXES)) {
      await setupCollection(db, collectionName, indexes);
    }

    // Create view for analytics dashboard
    await createAnalyticsViews(db);

    console.log('🎉 Database setup completed successfully!');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

/**
 * Setup individual collection with indexes and validation
 */
async function setupCollection(db, collectionName, indexes) {
  console.log(`\n📁 Setting up collection: ${collectionName}`);

  try {
    // Create collection if it doesn't exist
    const collections = await db.listCollections({ name: collectionName }).toArray();

    if (collections.length === 0) {
      await db.createCollection(collectionName, {
        validator: VALIDATION_SCHEMAS[collectionName]
      });
      console.log(`  ✅ Created collection: ${collectionName}`);
    } else {
      // Update validation schema for existing collection
      await db.command({
        collMod: collectionName,
        validator: VALIDATION_SCHEMAS[collectionName]
      });
      console.log(`  ✅ Updated validation for: ${collectionName}`);
    }

    const collection = db.collection(collectionName);

    // Drop existing indexes (except _id)
    const existingIndexes = await collection.listIndexes().toArray();
    for (const index of existingIndexes) {
      if (index.name !== '_id_') {
        try {
          await collection.dropIndex(index.name);
          console.log(`  🗑️  Dropped old index: ${index.name}`);
        } catch (error) {
          console.warn(`  ⚠️  Failed to drop index ${index.name}:`, error.message);
        }
      }
    }

    // Create new indexes
    for (const indexSpec of indexes) {
      try {
        await collection.createIndex(indexSpec.keys, indexSpec.options);
        console.log(`  📊 Created index: ${indexSpec.options.name}`);
      } catch (error) {
        console.error(`  ❌ Failed to create index ${indexSpec.options.name}:`, error.message);
      }
    }

    // Show collection stats
    const stats = await db.command({ collStats: collectionName });
    console.log(`  📈 Collection stats:`, {
      documents: stats.count || 0,
      avgObjSize: stats.avgObjSize ? `${Math.round(stats.avgObjSize)} bytes` : 'N/A',
      storageSize: stats.storageSize ? `${Math.round(stats.storageSize / 1024)} KB` : 'N/A'
    });

  } catch (error) {
    console.error(`❌ Failed to setup collection ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Create aggregation views for analytics dashboard
 */
async function createAnalyticsViews(db) {
  console.log('\n📊 Creating analytics views...');

  const views = [
    {
      name: 'daily_analytics_summary',
      source: 'analytics_events',
      pipeline: [
        {
          $group: {
            _id: {
              date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
              event: '$event'
            },
            count: { $sum: 1 },
            firstOccurrence: { $min: '$timestamp' },
            lastOccurrence: { $max: '$timestamp' }
          }
        },
        {
          $sort: { '_id.date': -1, count: -1 }
        }
      ]
    },

    {
      name: 'chat_session_summary',
      source: 'chat_logs',
      pipeline: [
        {
          $group: {
            _id: '$sessionId',
            messageCount: { $sum: 1 },
            firstMessage: { $min: '$timestamp' },
            lastMessage: { $max: '$timestamp' },
            avgResponseTime: { $avg: '$responseTime' },
            models: { $addToSet: '$model' },
            errorCount: {
              $sum: { $cond: ['$errorOccurred', 1, 0] }
            }
          }
        },
        {
          $addFields: {
            sessionDuration: {
              $subtract: ['$lastMessage', '$firstMessage']
            }
          }
        },
        {
          $sort: { lastMessage: -1 }
        }
      ]
    },

    {
      name: 'contact_submission_summary',
      source: 'contact_submissions',
      pipeline: [
        {
          $group: {
            _id: {
              date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
              status: '$status'
            },
            count: { $sum: 1 },
            avgMessageLength: { $avg: { $strLenCP: '$message' } }
          }
        },
        {
          $sort: { '_id.date': -1 }
        }
      ]
    }
  ];

  for (const view of views) {
    try {
      // Drop existing view if it exists
      try {
        await db.collection(view.name).drop();
        console.log(`  🗑️  Dropped existing view: ${view.name}`);
      } catch (error) {
        // View doesn't exist, that's fine
      }

      // Create new view
      await db.createCollection(view.name, {
        viewOn: view.source,
        pipeline: view.pipeline
      });

      console.log(`  ✅ Created view: ${view.name}`);

    } catch (error) {
      console.error(`  ❌ Failed to create view ${view.name}:`, error.message);
    }
  }
}

/**
 * Utility function to check database health
 */
async function checkDatabaseHealth() {
  console.log('🏥 Checking database health...');

  const client = new MongoClient(CONFIG.connectionString);

  try {
    await client.connect();
    const db = client.db(CONFIG.database);

    // Check connection
    await db.admin().ping();
    console.log('  ✅ Database connection: OK');

    // Check collections
    const collections = await db.listCollections().toArray();
    console.log(`  ✅ Collections found: ${collections.length}`);

    for (const collection of collections) {
      const stats = await db.command({ collStats: collection.name });
      console.log(`    📁 ${collection.name}: ${stats.count || 0} documents`);
    }

    return true;

  } catch (error) {
    console.error('  ❌ Database health check failed:', error);
    return false;
  } finally {
    await client.close();
  }
}

/**
 * Export functions for use in other scripts
 */
export { setupDatabase, checkDatabaseHealth, CONFIG };

/**
 * Run setup if this script is executed directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];

  switch (command) {
    case 'setup':
      setupDatabase().catch(console.error);
      break;
    case 'health':
      checkDatabaseHealth().catch(console.error);
      break;
    default:
      console.log(`
Usage: node setup-mongodb-indexes.js [command]

Commands:
  setup   - Set up database collections, indexes, and views
  health  - Check database health and statistics

Environment variables required:
  MONGODB_CONNECTION_STRING - Your MongoDB Atlas connection string
  MONGODB_DATABASE         - Database name (optional, defaults to 'personal_website_cs-learning')
      `);
  }
}