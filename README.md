# CRUD Blogging Platform Web Application

This is a CRUD web application for a blogging platform with user authentication and authorization, incorporating database relationships using Sequelize. The application allows users to create, read, update, and delete blog posts and comments.

## Getting Started

To get started with the project, follow the steps below:

### Prerequisites

1. Node.js and npm (Node Package Manager) must be installed on your system.

### Installation

1. Clone the GitHub repository to your local machine.

```bash
git clone https://github.com/junyaokh822/Blogging_Platform.git
```

2. Change into the project's root directory.

```bash
cd blogging_platform_api/
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

5. Generating a Session Secret Key and Adding it to .env

1. In your terminal, open the Node.js REPL by simply typing node and hitting enter.

2. Type the following command to generate a random string:
```
require("crypto").randomBytes(64).toString("hex")
```
3. This will output a random string which can be used as your secret key. Copy this string.

4. Open your .env file and add the following line:
```
SESSION_SECRET=your_generated_secret
```
5. Replace your_generated_secret with your secret key

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
- Use the `/logout` endpoint to log out the account.

### Blog Posts

- Use the GET:`/posts` endpoint to retrieve aLL blog posts.
- Use the GET:`/posts/:id` endpoint to retrieve a specific blog post by its ID.
- Use the POST: `/posts` endpoint to create a new blog post. Provide the `title`, `contents`, and `postDate` in the request body.
- Use the PATCH:`/posts/:id` endpoint with the `PATCH` method to update a specific blog post by its ID. Provide the updated `title`, `contents`, or `postDate` in the request body.
- Use the DELETE:`/posts/:id` endpoint with the `DELETE` method to delete a specific blog post by its ID.

### Comments

- Use the GET:`/comments` endpoint to retrieve aLL comments.
- Use the GET:`/comments/:id` endpoint to retrieve a specific comment by its ID.
- Use the POST:`/comments` endpoint to create a new comment. Provide the `contents`,`postDate`,`UserId`,and `BlogPostId` in the request body.
- Use the PATCH:`/comments/:id` endpoint with the `PATCH` method to update a specific comment by its ID. Provide the updated `contents` or `postDate` in the request body along with `UserId`,and `BlogPostId`.
- Use the DELETE:`/comments/:id` endpoint with the `DELETE` method to delete a specific comment by its ID.

### Authentication and Authorization

- Routes for creating, updating, and deleting blog posts and comments are protected by authentication. You must be logged in to perform these actions.
- After successful login, a session cookie will be created, enabling you to access protected routes.

## Contributing

This project is open to contributions. If you find any bugs or have suggestions for improvements, feel free to create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

