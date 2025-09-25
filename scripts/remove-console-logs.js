#!/usr/bin/env node

/**
 * Remove Console Logs Script
 * Removes all console.* statements from JavaScript files for production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to process
const DIRECTORIES = [
  'src/js',
  'src/utils/scripts',
  'api'
];

// Files to exclude
const EXCLUDE_FILES = [
  'remove-console-logs.js',
  'build-minify.js'
];

// Pattern to match console statements
const CONSOLE_PATTERN = /console\.(log|debug|info|warn|error|trace|group|groupEnd|time|timeEnd)\([^)]*\);?/g;

// Stats
let totalFiles = 0;
let totalRemoved = 0;
let fileStats = [];

/**
 * Process a single file
 */
function processFile(filePath) {
  if (EXCLUDE_FILES.some(excluded => filePath.includes(excluded))) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Count console statements
    const matches = content.match(CONSOLE_PATTERN) || [];
    const count = matches.length;

    if (count > 0) {
      // Remove console statements
      content = content.replace(CONSOLE_PATTERN, '');

      // Clean up empty lines left behind
      content = content.replace(/^\s*\n/gm, '');

      // Write back to file
      fs.writeFileSync(filePath, content, 'utf8');

      totalRemoved += count;
      fileStats.push({
        file: path.relative(process.cwd(), filePath),
        removed: count
      });

      console.log(`✓ Removed ${count} console statements from ${path.basename(filePath)}`);
    }

    totalFiles++;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Process directory recursively
 */
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file) === '.js') {
      processFile(filePath);
    }
  });
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Removing console statements from JavaScript files...\n');

  DIRECTORIES.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      processDirectory(fullPath);
    } else {
      console.warn(`⚠️  Directory not found: ${dir}`);
    }
  });

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   Files processed: ${totalFiles}`);
  console.log(`   Console statements removed: ${totalRemoved}`);

  if (fileStats.length > 0) {
    console.log('\n📁 Files modified:');
    fileStats.forEach(stat => {
      console.log(`   ${stat.file}: ${stat.removed} removed`);
    });
  }

  console.log('\n✅ Console removal complete!');
}

// Add to package.json scripts
function updatePackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');

  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    if (!packageJson.scripts['remove-console']) {
      packageJson.scripts['remove-console'] = 'node scripts/remove-console-logs.js';
      packageJson.scripts['build:prod'] = 'npm run remove-console && npm run build';

      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log('\n📦 Added npm scripts to package.json');
      console.log('   Run: npm run remove-console');
      console.log('   Or:  npm run build:prod (removes console + builds)');
    }
  } catch (error) {
    console.warn('\n⚠️  Could not update package.json:', error.message);
  }
}

// Run
main();
updatePackageJson();

export { processFile, processDirectory };