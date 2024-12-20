# Homework Project 2

## Initial setup
### Package installation
`npm install`

### Environment
The following environment variables (values shown below are contained in `.env` file) are required to connect to the database:
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=storefront_db
- POSTGRES_USER=storefront_user
- POSTGRES_PASSWORD=password123
- POSTGRES_DB_TEST=storefront_db_test
- POSTGRES_USER_TEST=storefront_user_test
- PEPPER=some-strange-word-for-peppering
- SALT_ROUNDS=10
- TOKEN_SECRET=token-secret-for-jwt
- ENV=dev

### Running Development version 
- `docker-compose up`
- before working with dev version, need to be run once: `db-migrate up`

## Testing
 - Running tests:
 `npm run full_test`
 
 ## Ports:
 - Backend: 3000
 - Postgresql: 5432

 ## Various
 - The database for this project is a very simplistic one, so many checks and constraints are not implemented here. In particular, duplicates are not prohibited in the DB, nor are they handled in code, so no special treament/error handling/messaging implemented for this type of user input.
 - Database tables are described in the REQUIREMENTS.md file