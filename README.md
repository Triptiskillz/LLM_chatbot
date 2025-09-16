# Interview Project

This project is divided into two main parts:

- **Client:** A React-based frontend application located in [client](client/README.md) that provides a chat interface for users to ask medical questions.
- **Server:** An Express-based backend located in [server/index.js](server/index.js) that processes doctor support requests using a generative AI model and exposes API endpoints.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
## Setup

### 1. Environment Variables

Ensure you have the required API keys and settings in the respective `.env` files:
- Server: [server/.env](server/.env)

### 2. Install Dependencies

#### Client
```sh
cd client
npm install
```

#### Server
```sh
cd server
npm install
```

## Running the Applications

### Running the Client

In the `client` directory:

```sh
npm start
```

The React app will be available at [http://localhost:3000](http://localhost:3000).

### Running the Server

In the `server` directory:

```sh
npm start
```

The Express server will run on [http://localhost:4000](http://localhost:4000).

## API Endpoints

### Server Endpoints

- **GET /**  
  Basic health-check endpoint.

- **POST /api/docter-support**  
  Processes a medical query using a generative AI model. See [server/index.js](server/index.js) for implementation details.


## Project Structure

```
/client    -> React frontend application
/server    -> Express backend
```
