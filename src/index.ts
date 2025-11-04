import express from 'express';
import { ToolsService } from '@optimizely-opal/opal-tools-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Create Express app
const app = express();
app.use(express.json());

// Create Tools Service first
console.log('Creating ToolsService...');
new ToolsService(app);

// Import and initialize tools after ToolsService is created
console.log('Importing tools...');
import('./tools').then(({ AddressTools }) => {
  new AddressTools();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
});
