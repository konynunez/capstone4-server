# **Capstone4-Server: Notes API**

**Welcome to the Notes API!**

- This API allows users to create, retrieve, update, and delete notes. It is built using Express.js and TypeScript, and includes Jest testing for the core functionalities.

## Features

- Manage notes via a RESTful API.
- Fully tested with Jest and Supertest.
- Built with TypeScript for type safety and better developer experience.
- Easy setup for local development.
- Tech Stack
- Node.js and Express.js for the backend.
- TypeScript for static typing.
- Jest and Supertest for testing.

### Installation

Ensure the following are installed:

- [ ] Node.js (v14+)
- [ ] npm
- [ ] Setup Steps
- [ ] Clone the repository

### Github Repository

git clone
**https://github.com/konynunez/capstone4-server.git**
cd capstone4-server

### Deployment Site

### Running Tests

This project includes a full suite of tests using Jest and Supertest. To run the tests:

- npm run test
- Ensure that the server does not start during testing by using the following condition in index.ts:

```if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
```

### Technologies Used

- Typescript
- Cors
- Dotenv
- Jest/Supertest
- Supabase
- Vercel

### License

This project is licensed under the MIT License.
