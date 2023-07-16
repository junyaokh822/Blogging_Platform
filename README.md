# CRUD Blogging Platform Web Application

This is a CRUD web application for a blogging platform with user authentication and authorization, incorporating database relationships using Sequelize. The application allows users to create, read, update, and delete blog posts and comments.

## Getting Started

To get started with the project, follow the steps below:

### Prerequisites

1. Node.js and npm (Node Package Manager) must be installed on your system.

### Installation

1. Clone the GitHub repository to your local machine.

```bash
git clone https://github.com/your-username/your-project.git
```

2. Change into the project's root directory.

```bash
cd your-project
```

3. Install the project's dependencies using npm.

```bash
npm install
```

4. Set up the database configuration.

Create a `.env` file in the root directory and add the following environment variables:

```
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name
SESSION_SECRET=your_session_secret
```

### Database Setup

1. Run the database migrations to set up the necessary tables.

```bash
npx sequelize-cli db:migrate
```

2. Run the database seeders to populate the Users, BlogPosts, and Comments tables with sample data.

```bash
npx sequelize-cli db:seed:all
```

### Running the Application

Start the development server to run the application.

```bash
npm start
```

The server will start at `http://localhost:4000`.

## Usage

### User Registration and Login

- Use the `/signup` endpoint to register a new user. Provide a `username` and `password` in the request body.
- Use the `/login` endpoint to log in as a registered user. Provide the `username` and `password` in the request body.

### Blog Posts

- Use the `/posts` endpoint to create a new blog post. Provide the `title`, `contents`, and `postDate` in the request body.
- Use the `/posts/:id` endpoint to retrieve a specific blog post by its ID.
- Use the `/posts/:id` endpoint with the `PATCH` method to update a specific blog post by its ID. Provide the updated `title`, `contents`, or `postDate` in the request body.
- Use the `/posts/:id` endpoint with the `DELETE` method to delete a specific blog post by its ID.

### Comments

- Use the `/comments` endpoint to create a new comment. Provide the `contents` and `postDate` in the request body.
- Use the `/comments/:id` endpoint to retrieve a specific comment by its ID.
- Use the `/comments/:id` endpoint with the `PATCH` method to update a specific comment by its ID. Provide the updated `contents` or `postDate` in the request body.
- Use the `/comments/:id` endpoint with the `DELETE` method to delete a specific comment by its ID.

### Authentication and Authorization

- Routes for creating, updating, and deleting blog posts and comments are protected by authentication. You must be logged in to perform these actions.
- After successful login, a session cookie will be created, enabling you to access protected routes.

## Contributing

This project is open to contributions. If you find any bugs or have suggestions for improvements, feel free to create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

