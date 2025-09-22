# GEMINI.md

## Project Overview

This project is a professional portfolio website for a Cloud Support Engineer & Database Specialist. It is a static website built with vanilla HTML, CSS, and JavaScript, but with a heavy emphasis on modern web technologies, performance, accessibility, and SEO. The site showcases the creator's expertise in cloud infrastructure and database optimization, with a particular focus on MongoDB.

The frontend features an advanced animation system with a starfield background, WebGL particles, and other interactive elements. It also includes a robust browser compatibility system to ensure a good user experience across a wide range of devices and browsers.

The backend is powered by serverless functions and a MongoDB Atlas database. It includes a custom analytics system, a contact form submission handler, and an AI-powered chat system that can answer questions about the creator's work.

## Building and Running

### Prerequisites

*   Node.js and npm
*   Python 3 (for the local development server)

### Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your MongoDB connection string and other environment variables. You can use `.env.example` as a template.

### Running the Development Server

The project uses a simple Python HTTP server for local development:

```bash
npm run dev
```

This will start a server on port 8000.

### Database Setup

The project includes a script to set up the MongoDB database with the required collections, indexes, and validation schemas. To run the script, use the following command:

```bash
node scripts/setup-mongodb-indexes.js setup
```

You can also check the health of the database with this command:

```bash
node scripts/setup-mongodb-indexes.js health
```

### Building and Deploying

This is a static website, so there is no build step. To deploy the site, you can simply upload the files to a static hosting provider like Vercel or GitHub Pages. The `vercel.json` file is included for easy deployment to Vercel.

## Development Conventions

*   **Code Style:** The code is written in a modular, class-based style. It uses modern JavaScript features (ES6+).
*   **Testing:** The `README.md` file mentions performance, accessibility, and cross-browser testing, but there are no automated tests included in the project.
*   **Contribution:** The project is a personal portfolio, but the `README.md` file includes a section on contributing, suggesting that the creator is open to feedback and contributions.
