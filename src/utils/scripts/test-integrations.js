// Integration Testing Script
// Tests key API endpoints, rate limiting, and validation (no database required)
import fetch from 'node-fetch';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
/**
 * Test configuration
 */
const TEST_CONFIG = {
  baseUrl: process.env.VERCEL_URL || 'https://www.cs-learning.me',
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
  if (details) {
  }
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
    testResults.errors.push(`${name}: ${details}`);
  }
}
// Database connections no longer used – removed connection tests
/**
 * Test Analytics API endpoint
 */
async function testAnalyticsAPI() {
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
 * Test Chat API endpoint (optional, requires OPENROUTER_API_KEY)
 */
async function testChatAPI() {
  if (!process.env.OPENROUTER_API_KEY) {
    logTest('Chat API - Skipped', true, 'OPENROUTER_API_KEY not set; skipping live test');
    return;
  }
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Hello! Please respond with a short greeting.',
        sessionId: 'test_session_cli',
        history: []
      }),
      timeout: TEST_CONFIG.timeout
    });
    const data = await response.json().catch(() => ({}));
    logTest('Chat API - Status', response.ok, `Status: ${response.status}`);
    if (response.ok && data.success) {
      logTest('Chat API - Response Present', !!data.response, 'Model returned a response');
    }
  } catch (error) {
    logTest('Chat API', false, error.message);
  }
}
// Database client tests removed
/**
 * Test rate limiting
 */
async function testRateLimiting() {
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
  // No required envs in the current stack
  const requiredEnvVars = [];
  if (requiredEnvVars.length === 0) {
    logTest('Environment Variables - Required', true, 'No required variables for current stack');
  }
  // Test optional environment variables
  const optionalEnvVars = [
    'OPENROUTER_API_KEY',
    'GOOGLE_MAPS_API_KEY',
    'NODE_ENV'
  ];
  for (const envVar of optionalEnvVars) {
    const exists = !!process.env[envVar];
    '}`);
  }
}
/**
 * Main test runner
 */
async function runAllTests() {
  const startTime = Date.now();
  try {
    await testEnvironmentConfig();
    await testAnalyticsAPI();
    await testContactAPI();
    await testChatAPI();
    await testRateLimiting();
    await testDataValidation();
  } catch (error) {
  }
  const duration = Date.now() - startTime;
  // Print summary
  );
  );
  if (testResults.failed > 0) {
    testResults.errors.forEach(error => );
  }
  const success = testResults.failed === 0;
  process.exit(success ? 0 : 1);
}
/**
 * Individual test functions for specific testing
 */
export {
  testAnalyticsAPI,
  testContactAPI,
  testChatAPI,
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
      analytics: testAnalyticsAPI,
      contact: testContactAPI,
      chat: testChatAPI,
      ratelimit: testRateLimiting,
      validation: testDataValidation,
      config: testEnvironmentConfig
    };
    const testFunction = testFunctions[testName];
    if (testFunction) {
      testFunction().catch(console.error);
    } else {
      .join(', ')}`);
    }
  } else {
    // Run all tests
    runAllTests().catch(console.error);
  }
}