# MovieDB Backend

This is the backend server for the MovieDB application. It serves as the intermediary between the frontend and external movie APIs, provides caching for search results and movie details, and implements rate limiting middleware to prevent excessive API calls.

## Table of Contents

- [MovieDB Backend](#moviedb-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
- [OR](#or)
- [OR](#or-1)
- [OR](#or-2)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Technologies Used](#technologies-used)
  - [API Routes](#api-routes)
  - [Caching](#caching)
  - [Rate Limiting](#rate-limiting)
  - [Contributing](#contributing)

## Features

- **Node.js and Express:** Set up a backend server using Node.js and Express.
- **Fetch API:** Make requests to external movie APIs for fetching movie data.
- **Caching:** Implement an in-memory caching mechanism to store search results and movie details, reducing external API calls.
- **Rate Limiting:** Implement rate limiting middleware in Express to prevent excessive API calls.
- **API Routes:** Define routes for handling movie search and details requests.

## Installation

To set up and run the backend server locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/MantasPetrosiusI/moviedb-arca-backend.git
   cd moviedb-arca-backend

   # OR
   Clone from the respository

   https://github.com/MantasPetrosiusI/moviedb_arca_backend
   ```

2. Create a `.env` file in the root directory and add the following configuration:

   ```env
   PORT=3001  # Specify your desired port number
   OMDB_API_KEY = [ your_api_key ] #specify your api key
   omdb_url = ["http://www.omdbapi.com"] #for ease of access
   ```

3. Install required dependencies:

   ```bash
   npm install
   ```

   # OR

   ```bash
   yarn install
   ```

4. Build the server:

   ```bash
   npm run build
   ```

   # OR

   ```bash
   yarn build
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

   # OR

   ```bash
   yarn start
   ```

The backend server will be running on the specified port (default: 3001).

## Usage

- Launch the backend server using the instructions provided in the Installation section.
- The frontend application should be configured to send requests to the backend server for movie search and details.

## Folder Structure

The project directory is structured as follows:

- `src/`: Contains the application source code.
  - `routes/`: Defines API routes and handlers.
  - `middleware/`: Houses middleware functions, including caching.
  - `app.ts`: Main entry point of the server.
- `node_modules/`: Contains project dependencies.
- `.env`: Environmental variables.

## Technologies Used

- Node.js
- Express
- TypeScript
- CORS (Cross-Origin Resource Sharing)
- Dotenv (for environment variables)
- Express List Endpoints (for listing API endpoints)
- Express Rate Limit (for rate limiting middleware)
- Node-Cache (for in-memory caching)

## API Routes

- `GET /api/movies/search`: Handles movie search requests.
- `GET /api/movies/:movieId`: Retrieves detailed information for a specific movie.

## Caching

Caching is implemented to store search results and movie details temporarily. This reduces the need for repeated external API calls and improves response times.

## Rate Limiting

Rate limiting middleware is applied to prevent excessive API calls and protect against abuse. It limits the number of requests to a client can make within a specified time frame. By default it is set to 20 requests per 2 minutes. This can be changed in app.ts file.

## Contributing

Contributions to this project are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.
