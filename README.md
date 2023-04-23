# Express TypeScript REST API boilerplate with MongoDB and Mongoose

This is a boilerplate for a REST API made with Express, TypeScript and MongoDB using Mongoose for CRUD operations. The endpoints implement a generic interface with the following methods: `getEntities`, `getEntityById`, `postEntity`, `patchEntity`, `putEntity`. The endpoints are divided into modules, each module having the following structure:

- `/services` - where the logic for each method is implemented.
- `/routes` - where each route of the endpoint is declared.
- `/models` - where the Mongoose model and schema are created.
- `/controllers` - where we send information to the service, and the service sends a response which we then `send` back.

## Project Structure

- `/config` - where you can extract all the configurations from environment variables and put them in an object.
- `/databases` - where the connection with MongoDB is established.
- `/generic` - where we have generic models/routes/controllers that we can use in multiple places.
- `/middlewares` - where we have middlewares like error handling, etc.
- `/modules` - where the modules described above are located.
- `/utils` - where we have utility functions that we can use in multiple places.

To access the routes in the `Users` module, you will need to create a user through the `/auth/register` route or log in with an existing user.

This boilerplate has security through JWT Token, which is obtained when a user logs in or registers.

## Environment Variables

- `.env.development.local` - for the development environment.
- `.env.production.local` - for the production environment.

## Getting Started

To get started, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies with `npm install`.
3. Create a `.env` file for production or a `.env.development.local` file for development and add the necessary environment variables.
4. Start the development server with `npm run dev`.
5. Start the production server with `npm run build` followed by `npm start`.

## Roadmap

1. **Additional routes and examples** - Add more routes and examples to the existing modules to showcase the full capabilities of the boilerplate.
2. **Enhanced TypeScript definitions** - Expand the TypeScript definitions to cover more use cases and provide more clarity on the expected inputs and outputs of each function.
3. **Route for refresh token** - Implement a route for refreshing the JWT token, to ensure continuous authentication for users.
4. **Implement unit testing** - Write unit tests for the project to ensure that all functionality is working as expected and prevent regressions.
5. **Improve error handling** - Improve the error handling in the project to provide more informative error messages and prevent security vulnerabilities.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use this boilerplate for your own projects!
