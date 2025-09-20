// Integration Testing Script
// Tests all MongoDB integrations and API endpoints

import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test configuration
 */
const TEST_CONFIG = {
  baseUrl: process.env.VERCEL_URL || 'http://localhost:3000',
  mongoConnectionString: process.env.MONGODB_CONNECTION_STRING,
  database: process.env.MONGODB_DATABASE || 'personal_website_cs-learning',
  timeout: 10000 // 10 seconds
};

/**
 * Test results tracking
 */
let testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

/**
 * Test utilities
 */
function logTest(name, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${name}`);

  if (details) {
    console.log(`    ${details}`);
  }

  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
    testResults.errors.push(`${name}: ${details}`);
  }
}

/**
 * Test MongoDB connection
 */
async function testMongoDBConnection() {
  console.log('\n🔗 Testing MongoDB Connection...');

  try {
    const client = new MongoClient(TEST_CONFIG.mongoConnectionString);
    await client.connect();

    const db = client.db(TEST_CONFIG.database);
    await db.admin().ping();

    logTest('MongoDB Connection', true, 'Successfully connected to MongoDB Atlas');

    // Test collections exist
    const collections = await db.listCollections().toArray();
    const expectedCollections = ['chat_logs', 'analytics_events', 'contact_submissions'];

    for (const expectedCol of expectedCollections) {
      const exists = collections.some(col => col.name === expectedCol);
      logTest(`Collection: ${expectedCol}`, exists, exists ? 'Collection exists' : 'Collection missing');
    }

    await client.close();

  } catch (error) {
    logTest('MongoDB Connection', false, error.message);
  }
}

/**
 * Test Analytics API endpoint
 */
async function testAnalyticsAPI() {
  console.log('\n📊 Testing Analytics API...');

  const testEvents = [
    {
      event: 'test_event',
      timestamp: Date.now(),
      sessionId: 'test_session_123',
      data: { test: true }
    }
  ];

  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testEvents),
      timeout: TEST_CONFIG.timeout
    });

    const data = await response.json();

    logTest('Analytics API - Status', response.ok, `Status: ${response.status}`);
    logTest('Analytics API - Response', data.success === true, `Success: ${data.success}`);

    if (data.success) {
      logTest('Analytics API - Data Processing', data.processed === 1, `Processed: ${data.processed} events`);
    }

  } catch (error) {
    logTest('Analytics API', false, error.message);
  }
}

/**
 * Test Contact Form API endpoint
 */
async function testContactAPI() {
  console.log('\n📧 Testing Contact Form API...');

  const testSubmission = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Message',
    message: 'This is a test message for integration testing.'
  };

  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testSubmission),
      timeout: TEST_CONFIG.timeout
    });

    const data = await response.json();

    logTest('Contact API - Status', response.ok, `Status: ${response.status}`);
    logTest('Contact API - Response', data.success === true, `Success: ${data.success}`);

    if (data.submissionId) {
      logTest('Contact API - Submission ID', true, `ID: ${data.submissionId}`);
    }

  } catch (error) {
    logTest('Contact API', false, error.message);
  }
}

/**
 * Test Chat Log API endpoint
 */
async function testChatLogAPI() {
  console.log('\n🤖 Testing Chat Log API...');

  const testChatLog = {
    query: 'This is a test query',
    response: 'This is a test response from the AI',
    sessionId: 'test_session_123',
    model: 'grok-4-fast',
    responseTime: 1500,
    tokenCount: 25
  };

  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/chat-log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testChatLog),
      timeout: TEST_CONFIG.timeout
    });

    const data = await response.json();

    logTest('Chat Log API - Status', response.ok, `Status: ${response.status}`);
    logTest('Chat Log API - Response', data.success === true, `Success: ${data.success}`);

    if (data.logId) {
      logTest('Chat Log API - Log ID', true, `ID: ${data.logId}`);
    }

  } catch (error) {
    logTest('Chat Log API', false, error.message);
  }
}

/**
 * Test MongoDB client functionality
 */
async function testMongoDBClient() {
  console.log('\n🏗️ Testing MongoDB Client...');

  try {
    // Dynamic import for MongoDB client
    const { default: MongoDBClient } = await import('../api/mongodb-client.js');
    const client = new MongoDBClient();

    // Test health check
    const healthResult = await client.healthCheck();
    logTest('MongoDB Client - Health Check', healthResult.success, healthResult.status);

    // Test analytics logging
    const analyticsResult = await client.logAnalyticsEvent({
      event: 'test_client_event',
      sessionId: 'test_session_client',
      timestamp: Date.now(),
      data: { source: 'integration_test' }
    });

    logTest('MongoDB Client - Analytics Logging', analyticsResult.success,
      analyticsResult.success ? 'Event logged successfully' : analyticsResult.error);

    // Test chat logging
    const chatResult = await client.logChatInteraction({
      query: 'Test client query',
      response: 'Test client response',
      sessionId: 'test_session_client',
      model: 'test-model'
    });

    logTest('MongoDB Client - Chat Logging', chatResult.success,
      chatResult.success ? 'Chat logged successfully' : chatResult.error);

  } catch (error) {
    logTest('MongoDB Client', false, error.message);
  }
}

/**
 * Test rate limiting
 */
async function testRateLimiting() {
  console.log('\n🚦 Testing Rate Limiting...');

  try {
    // Send multiple rapid requests to analytics endpoint
    const requests = [];
    for (let i = 0; i < 5; i++) {
      requests.push(
        fetch(`${TEST_CONFIG.baseUrl}/api/analytics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([{
            event: `rate_limit_test_${i}`,
            timestamp: Date.now(),
            sessionId: 'rate_limit_test'
          }])
        })
      );
    }

    const responses = await Promise.all(requests);
    const statuses = responses.map(r => r.status);

    // Check if at least some requests succeeded
    const successCount = statuses.filter(s => s === 200).length;
    logTest('Rate Limiting - Some Success', successCount > 0, `${successCount} requests succeeded`);

    // Check for rate limit headers
    const lastResponse = responses[responses.length - 1];
    const hasRateLimitHeaders = lastResponse.headers.has('X-RateLimit-Remaining');
    logTest('Rate Limiting - Headers Present', hasRateLimitHeaders, 'Rate limit headers included');

  } catch (error) {
    logTest('Rate Limiting', false, error.message);
  }
}

/**
 * Test data validation
 */
async function testDataValidation() {
  console.log('\n✅ Testing Data Validation...');

  // Test invalid analytics data
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{
        // Missing required fields
        event: '',
        invalidField: 'should be rejected'
      }])
    });

    const data = await response.json();
    const isValidationError = response.status === 400 || !data.success;
    logTest('Data Validation - Invalid Analytics', isValidationError, 'Invalid data properly rejected');

  } catch (error) {
    logTest('Data Validation - Analytics', false, error.message);
  }

  // Test invalid contact data
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '', // Empty name
        email: 'invalid-email', // Invalid email
        message: 'hi' // Too short message
      })
    });

    const data = await response.json();
    const isValidationError = response.status === 400 || !data.success;
    logTest('Data Validation - Invalid Contact', isValidationError, 'Invalid contact data properly rejected');

  } catch (error) {
    logTest('Data Validation - Contact', false, error.message);
  }
}

/**
 * Test environment configuration
 */
async function testEnvironmentConfig() {
  console.log('\n🌍 Testing Environment Configuration...');

  const requiredEnvVars = [
    'MONGODB_CONNECTION_STRING',
    'MONGODB_DATABASE'
  ];

  for (const envVar of requiredEnvVars) {
    const exists = !!process.env[envVar];
    logTest(`Environment Variable - ${envVar}`, exists, exists ? 'Set' : 'Missing');
  }

  // Test optional environment variables
  const optionalEnvVars = [
    'OPENROUTER_API_KEY',
    'GOOGLE_MAPS_API_KEY',
    'NODE_ENV'
  ];

  for (const envVar of optionalEnvVars) {
    const exists = !!process.env[envVar];
    console.log(`    📝 ${envVar}: ${exists ? '✅ Set' : '⚠️ Not set (optional)'}`);
  }
}

/**
 * Main test runner
 */
async function runAllTests() {
  console.log('🧪 Starting MongoDB Integration Tests...\n');
  console.log(`Base URL: ${TEST_CONFIG.baseUrl}`);
  console.log(`Database: ${TEST_CONFIG.database}`);

  const startTime = Date.now();

  try {
    await testEnvironmentConfig();
    await testMongoDBConnection();
    await testMongoDBClient();
    await testAnalyticsAPI();
    await testContactAPI();
    await testChatLogAPI();
    await testRateLimiting();
    await testDataValidation();

  } catch (error) {
    console.error('\n❌ Test runner error:', error);
  }

  const duration = Date.now() - startTime;

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⏱️ Duration: ${duration}ms`);

  if (testResults.failed > 0) {
    console.log('\n❌ FAILURES:');
    testResults.errors.forEach(error => console.log(`  • ${error}`));
  }

  const success = testResults.failed === 0;
  console.log(`\n${success ? '🎉 ALL TESTS PASSED!' : '💥 SOME TESTS FAILED!'}`);

  process.exit(success ? 0 : 1);
}

/**
 * Individual test functions for specific testing
 */
export {
  testMongoDBConnection,
  testAnalyticsAPI,
  testContactAPI,
  testChatLogAPI,
  testMongoDBClient,
  testRateLimiting,
  testDataValidation,
  testEnvironmentConfig
};

/**
 * Run tests if this script is executed directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const testName = process.argv[2];

  if (testName) {
    // Run specific test
    const testFunctions = {
      mongodb: testMongoDBConnection,
      analytics: testAnalyticsAPI,
      contact: testContactAPI,
      chat: testChatLogAPI,
      client: testMongoDBClient,
      ratelimit: testRateLimiting,
      validation: testDataValidation,
      config: testEnvironmentConfig
    };

    const testFunction = testFunctions[testName];
    if (testFunction) {
      testFunction().catch(console.error);
    } else {
      console.log(`Unknown test: ${testName}`);
      console.log(`Available tests: ${Object.keys(testFunctions).join(', ')}`);
    }
  } else {
    // Run all tests
    runAllTests().catch(console.error);
  }
}