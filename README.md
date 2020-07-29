# Backend - Use my Tech Stuff

## Author
**Elchin Nasirov** 
Github: [@ElchinNasirov](https://github.com/ElchinNasirov)

## App
### https://use-my-tech-stuff-be.herokuapp.com/

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

# Dummy data

### `Users`
```
[
    // Password is 123 (hashed) 
    { id: 1, username: "testUser_01", password: "$2a$10$06O4kv2CcsBOKYj2im5wneQGH4GcLvnz.uBLTqkPPHx5Iqu8afhWi", email: "testUser_01@mail.com" },
    { id: 2, username: "testUser_02", password: "$2a$10$06O4kv2CcsBOKYj2im5wneQGH4GcLvnz.uBLTqkPPHx5Iqu8afhWi", email: "testUser_01@mail.com" }
]
```

### `Items`

```
[
    {
      id: 1,
      name: "Macbook Pro",
      description: "2018 and 15 inch screen",
      user_id: 1,
      availability: true,
      daily_rate: 15,
      condition: "Good",
      location: "San Francisco",
      img: "https://i.ebayimg.com/images/g/N-IAAOSw5-hcA11v/s-l1600.jpg"
    },
    {
      id: 2,
      name: "Apple iPad",
      description: "9.7 inches",
      user_id: 2,
      availability: true,
      daily_rate: 10,
      condition: "Very Good",
      location: "Chicago",
      img: "https://i.ebayimg.com/images/g/jKkAAOSwjedctSo3/s-l1600.jpg"
    }
]
```

## `Users` Router Endpoints

| Method | Endpoint              | Requires                        | Description                                                             |
| ------ | --------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/api/users/register` | `username`, `password`, `email` | Used to add a new user to database.                                     |
| POST   | `/api/users/login`    | `username`, `password`          | Used to log a user in. Returns a token and the user's name in its body. |
| GET    | `/api/users/`         | Successful Login                | Used to show all users in the database.                                 |
| GET    | `/api/users/:id`      | Successful Login                | Used to show a specific user in the database.                           |
| GET    | `/api/users/:id/items`| Successful Login                | Used to show a specific user's listed tech items in the database.       |
| POST   | `/api/users/:id/items`| Successful Login, Data          | Used to add new tech items (stuff) for a specific user in the database. |
| DELETE | `/api/users/:id`      | Successful Login                | Used to delete a specific user in the database.                         |
---
## `Items` Router Endpoints
| Method | Endpoint              | Requires                        | Description                                                             |
| ------ | --------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/items/`         | Successful Login                | Used to show tech items (stuff) in the database.                        |
| GET    | `/api/items/:id`      | Successful Login                | Used to show a specific tech item (stuff) in the database.              |
| POST   | `/api/items/`         | Successful Login, Data          | Used to post a new tech item (stuff) to the database.                   |
| PUT    | `/api/items/:id`      | Successful Login, Data          | Used to edit the logged in user's tech item (stuff).                    |
| DELETE | `/api/items/:id`      | Successful Login                | Used to delete the logged in user's tech item (stuff).                  |
---

### User Registration

Method used: **[POST]** `/api/users/register`

On Success: Returns the the new user.

Parameters:

| Name     | Type   | Required | Notes                                  |
| -------- | ------ | -------- | -------------------------------------- |
| username | text   | yes      | Must be unique.                        |
| password | text   | yes      | Can be up to 255 characters in length. |
| email    | text   | yes      | The email the user wishes to use.      |

Example:

```
{
    username: "user_01",
    password: "pass_01",
    email: "user_01@mail.com"
}
```
---
### User Login 

Method used: **[POST]** `/api/users/login`

On Success: Returns a token to be used to authenticate the user, the user id, and the username.

Parameters:

| Name     | Type   | Required |
| -------- | ------ | -------- |
| username | text   | yes      |
| password | text   | yes      |

Example:

```
{
    username: "user_01",
    password: "pass_01"
}
```
---

### Get Users 

Method used: **[GET]** `/api/users/`

On Success: Returns an array of users

---

### Get a specific User

Method used: **[GET]** `/api/users/:id`

On Success: Returns a specific user in database.

Parameters:

| Name          | Type       | Required | Notes                             |
| ------------- | ---------- | -------- | --------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login. |
---

### Get a specific user's Tech Items (Stuff)

Method used: **[GET]** `/api/users/:id/items`

On Success: Returns a specific user in database.

Parameters:

| Name          | Type       | Required | Notes                             |
| ------------- | ---------- | -------- | --------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login. |
---

### Post Tech Item (Stuff) for a specific user

Method used: **[POST]** `/api/users/:id/items`

On Success: Adds a new tech item to a specific user in the database.

Parameters:

| Name          | Type       | Required | Notes                                                    |
| ------------- | ---------- | -------- | -------------------------------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login.                        |
| name          | text       | yes      | The name of the tech item.                               |
| description   | text       | yes      | A description of the tech item.                          |
| availability  | boolean    | yes      | Whether or not the tech item is available to rent.       |
| daily_rate    | integer    | yes      | The cost of the tech item.                               |
| condition     | text       | yes      | Condition of the tech item.                              |
| picture       | text       | yes      | The image url to display the tech item.                  |

Example:

```
{
    "name": "New Item",
    "description": "New Description",
    "availability": 1,
    "daily_rate": 15,
    "condition": "Good",
    "location": "New Location"
  }
```
---

### Delete a specific User in the database

Method used: **[DELETE]** `/api/users/:id`

On Success: Deletes a specific piece of tech from the database.

Parameters:

| Name          | Type       | Required | Notes                             |
| ------------- | ---------- | -------- | --------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login. |
---

### Get List of Tech Items (Stuff)

Method used: **[GET]** `/api/items`

On Success: Returns an array of all tech in database.

Parameters:

| Name          | Type       | Required | Notes                             |
| ------------- | ---------- | -------- | --------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login. |
---

### Get a specific Tech Item (Stuff)

Method used: **[GET]** `/api/items/:id`

On Success: Returns a specific piece of tech in the database.

Parameters:

| Name          | Type       | Required | Notes                             |
| ------------- | ---------- | -------- | --------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login. |
---

### Post Tech Item (Stuff)

Method used: **[POST]** `/api/items/`

On Success: Adds a new piece of tech to the database.

Parameters:

| Name          | Type       | Required | Notes                                                    |
| ------------- | ---------- | -------- | -------------------------------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login.                        |
| name          | text       | yes      | The name of the tech item.                               |
| description   | text       | yes      | A description of the tech item.                          |
| user_id       | text       | yes      | User id that the tech item belogs to.                    |
| availability  | boolean    | yes      | Whether or not the tech item is available to rent.       |
| daily_rate    | integer    | yes      | The cost of the tech item.                               |
| condition     | text       | yes      | Condition of the tech item.                              |
| picture       | text      text | yes      | The image url to display the tech item.                  |

Example:

```
{
    "name": "New Item",
    "description": "New Description",
    "availability": 1,
    "daily_rate": 15,
    "condition": "Good",
    "location": "New Location"
}
```
---

### Update a specific Tech Item (Stuff)

Method used: **[PUT]** `api/items/:id`

On Success: Updates a specific piece of tech in the database.

Parameters:

| Name          | Type       | Required | Notes                                                    |
| ------------- | ---------- | -------- | -------------------------------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login.                        |
| name          | text       | no       | The name of the tech item.                               |
| description   | text       | no       | A description of the tech item.                          |
| availability  | boolean    | no       | Whether or not the tech item is available to rent.       |
| daily_rate    | integer    | no       | The cost of the tech item.                               |
| condition     | text       | no       | Condition of the tech item.                              |
| picture       | text       | no       | The image url to display the tech item.                  |

Example:

```
{
    "name": "New Item",
    "description": "New Description",
    "availability": 1,
    "daily_rate": 15,
    "condition": "Good",
    "location": "New Location"
  }
```
---

### Delete a specific Tech Item (Stuff)

Method used: **[DELETE]** `/api/items/:id`

On Success: Deletes a specific piece of tech from the database.

Parameters:

| Name          | Type       | Required | Notes                             |
| ------------- | ---------- | -------- | --------------------------------- |
| Authorization | **Header** | yes      | Acquired from a successful login. |
---