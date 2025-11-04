# Opal Tools TypeScript Service

This is an Opal tools service built with TypeScript that currently provides address lookup functionality using the Bring API.

## Features

- **Address Details Tool**: Fetches address suggestions from the Bring API based on query and country code
- Built with TypeScript and Express
- Modular tool architecture with decorator-based registration
- Docker support for containerized deployment

## Prerequisites

- Node.js (18+ recommended)
- npm or yarn
- Bring API credentials (API_UID and API_KEY)

## Setup

### Environment Variables

Create a `.env` file in the project root (copy from `.env.sample`):

```bash
cp .env.sample .env
```

Then edit `.env` with your actual credentials:

```env
API_UID=your_bring_api_uid
API_KEY=your_bring_api_key
```

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Running the Service

### Local Development

```bash
# Run in development mode with hot reload
npm run dev

# Or run in watch mode
npm run watch

# Or build and run production
npm run build
npm start
```

### Docker

```bash
# Build the Docker image
docker build -t opal-tools-typescript .

# Run the container
docker run -p 3000:3000 opal-tools-typescript
```

## API Usage

Once the service is running, you can access:

- **Discovery endpoint**: `http://localhost:3000/discovery`
- **Address tool endpoint**: `http://localhost:3000/tools/address-details`

### Address Details Tool

Fetches address suggestions from the Bring API.

**Request:**
```bash
curl -X POST http://localhost:3000/tools/address-details \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Storgata 1",
    "countryCode": "NO"
  }'
```

**Response:**
```json
[
  {
    "text": "Storgata 1, 0155 Oslo",
    "postalCode": "0155",
    "city": "Oslo",
    "country": "Norge"
  }
]
```

**Parameters:**
- `query` (string, required): Search query for address
- `countryCode` (string, required): ISO country code (e.g., "NO", "SE", "DK")

## Project Structure

```
src/
├── index.ts              # Main application entry point
└── tools/
    ├── index.ts          # Tool exports
    └── AddressTools.ts   # Address lookup tool implementation
```

## Development

### Adding New Tools

1. Create a new tool class in `src/tools/`
2. Use the `@tool` decorator to define the tool
3. Export the tool from `src/tools/index.ts`
4. The tool will be automatically registered when imported

### Scripts

- `npm run dev` - Run with ts-node for development
- `npm run watch` - Run with nodemon for hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript

## License

MIT
