# Backend - Use my Tech Stuff

## Author

**Elchin Nasirov**

- Github: [@ElchinNasirov](https://github.com/ElchinNasirov)

## Install

```sh
npm install
```

## Dependencies 

```sh
 express
 sqlite3
 bcryptjs
 cors
 helmet
 jsonwebtoken
 knex
 knex-cleaner
 pg
 cross-env
 dotenv
 nodemon --dev
 jest --dev
 supertest --dev
```

## Endpoints

| Method | Endpoint              | Requires                        | Description                                                             |
| ------ | --------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/api/auth/register/` | `username`, `password`, `email` | Used for adding a new user to database.                                 |
| POST   | `/api/auth/login/`    | `username`, `password`          | Used to log a user in. Returns a token and the user's name in its body. |
| GET    | `/api/users`          | Successful Login                | Used to show all users in the database.                                 |
| GET    | `/api/users/:id/`     | Successful Login                | Used to show a specific user in the database.                           |
| GET    | `/api/tech`           | Successful Login                | Used to show tech in the database.                                      |
| GET    | `/api/tech/:id/`      | Successful Login                | Used to show a specific piece of tech in the database.                  |
| POST   | `/api/tech/`          | Successful Login, Data          | Used to post a new piece of tech to the database.                       |
| PUT    | `/api/tech/:id`       | Successful Login, Data          | Used to edit the logged in user's tech.                                 |
| POST   | `/api/tech/:id`       | Successful Login, Data          | Used to post a comment on the specific piece of tech.                   |
| DELETE | `/api/tech/:id/`      | Successful Login                | Used to delete the logged in user's tech.                               |

---