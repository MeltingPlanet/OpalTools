#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

interface PostmanCollection {
  info: {
    _postman_id: string;
    name: string;
    description: string;
    schema: string;
  };
  item: Array<{
    name: string;
    request: {
      method: string;
      header: Array<{
        key: string;
        value: string;
        type: string;
      }>;
      body?: {
        mode: string;
        raw: string;
        options?: {
          raw: {
            language: string;
          };
        };
      };
      url: {
        raw: string;
        protocol: string;
        host: string[];
        port: string;
        path: string[];
      };
    };
    response: any[];
  }>;
  variable: Array<{
    key: string;
    value: string;
    type: string;
  }>;
}

function generatePostmanCollection(): PostmanCollection {
  const baseUrl = '{{base_url}}';
  const port = '{{port}}';

  return {
    info: {
      _postman_id: crypto.randomUUID(),
      name: 'Opal Tools API',
      description: 'Auto-generated Postman collection for Opal Tools service',
      schema:
        'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: [
      {
        name: 'Get Tool Discovery',
        request: {
          method: 'GET',
          header: [
            {
              key: 'Accept',
              value: 'application/json',
              type: 'text',
            },
          ],
          url: {
            raw: `http://${baseUrl}:${port}/discovery`,
            protocol: 'http',
            host: [baseUrl],
            port: port,
            path: ['discovery'],
          },
        },
        response: [],
      },
      {
        name: 'Address Details - Oslo Example',
        request: {
          method: 'POST',
          header: [
            {
              key: 'Content-Type',
              value: 'application/json',
              type: 'text',
            },
            {
              key: 'Accept',
              value: 'application/json',
              type: 'text',
            },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify(
              {
                query: 'Karl Johans gate 1',
                countryCode: 'NO',
              },
              null,
              2
            ),
            options: {
              raw: {
                language: 'json',
              },
            },
          },
          url: {
            raw: `http://${baseUrl}:${port}/tools/address-details`,
            protocol: 'http',
            host: [baseUrl],
            port: port,
            path: ['tools', 'address-details'],
          },
        },
        response: [],
      },
      {
        name: 'Address Details - Sweden Example',
        request: {
          method: 'POST',
          header: [
            {
              key: 'Content-Type',
              value: 'application/json',
              type: 'text',
            },
            {
              key: 'Accept',
              value: 'application/json',
              type: 'text',
            },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify(
              {
                query: 'Kungsgatan 1',
                countryCode: 'SE',
              },
              null,
              2
            ),
            options: {
              raw: {
                language: 'json',
              },
            },
          },
          url: {
            raw: `http://${baseUrl}:${port}/tools/address-details`,
            protocol: 'http',
            host: [baseUrl],
            port: port,
            path: ['tools', 'address-details'],
          },
        },
        response: [],
      },
      {
        name: 'Address Details - Error Case',
        request: {
          method: 'POST',
          header: [
            {
              key: 'Content-Type',
              value: 'application/json',
              type: 'text',
            },
            {
              key: 'Accept',
              value: 'application/json',
              type: 'text',
            },
          ],
          body: {
            mode: 'raw',
            raw: JSON.stringify(
              {
                query: 'Test address',
                // Missing countryCode to test error handling
              },
              null,
              2
            ),
            options: {
              raw: {
                language: 'json',
              },
            },
          },
          url: {
            raw: `http://${baseUrl}:${port}/tools/address-details`,
            protocol: 'http',
            host: [baseUrl],
            port: port,
            path: ['tools', 'address-details'],
          },
        },
        response: [],
      },
    ],
    variable: [
      {
        key: 'base_url',
        value: 'localhost',
        type: 'string',
      },
      {
        key: 'port',
        value: '3000',
        type: 'string',
      },
    ],
  };
}

function main() {
  console.log('🚀 Generating Postman collection for Opal Tools...');

  const collection = generatePostmanCollection();
  const outputPath = path.join(
    __dirname,
    '..',
    'postman',
    'OpalTools.postman_collection.json'
  );

  // Ensure postman directory exists
  const postmanDir = path.dirname(outputPath);
  if (!fs.existsSync(postmanDir)) {
    fs.mkdirSync(postmanDir, { recursive: true });
  }

  // Write the collection directly as JSON
  fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2));

  console.log('✅ Postman collection generated successfully!');
  console.log(`📁 File location: ${outputPath}`);
  console.log('\n📋 Collection includes:');
  console.log('  • Discovery endpoint (/discovery)');
  console.log('  • Address Details tool with examples');
  console.log('  • Error case testing');
  console.log('  • Environment variables for base URL and port');
  console.log('\n🔧 To use:');
  console.log('  1. Import the collection into Postman');
  console.log('  2. Set environment variables:');
  console.log('     - base_url: localhost (or your server URL)');
  console.log('     - port: 3000 (or your server port)');
  console.log('  3. Start your Opal Tools server');
  console.log('  4. Run the requests!');
}

if (require.main === module) {
  main();
}

export { generatePostmanCollection };
