#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { minify } from 'terser';

async function minifyJSFiles() {
    const jsDir = './src/js';
    const files = fs.readdirSync(jsDir).filter(file => file.endsWith('.js') && !file.endsWith('.min.js'));

    console.log('🚀 Starting JavaScript minification...');

    for (const file of files) {
        const inputPath = path.join(jsDir, file);
        const outputPath = path.join(jsDir, file.replace('.js', '.min.js'));

        try {
            const code = fs.readFileSync(inputPath, 'utf8');
            const result = await minify(code, {
                compress: {
                    drop_console: false,
                    drop_debugger: true,
                    pure_funcs: ['console.log'],
                },
                mangle: {
                    keep_fnames: true,
                },
                format: {
                    comments: false,
                }
            });

            if (result.error) {
                console.error(`❌ Error minifying ${file}:`, result.error);
                continue;
            }

            fs.writeFileSync(outputPath, result.code);

            const originalSize = fs.statSync(inputPath).size;
            const minifiedSize = fs.statSync(outputPath).size;
            const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

            console.log(`✅ ${file} -> ${file.replace('.js', '.min.js')} (${savings}% smaller)`);

        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    }

    console.log('🎉 Minification complete!');
}

minifyJSFiles().catch(console.error);