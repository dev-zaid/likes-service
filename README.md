# Likes Service

This is a service to handle Like, Unlike and Get No. of Likes on a post.

## Installation ⚙️

**Using Docker**

`docker-compose up`

---

**Using Yarn**

```
yarn
yarn build
yarn start
```

> NOTE: Make sure to create an env before building or copy paste the .env.example to test the code

## Endpoints

Authentication

```
# Signup
-> http://localhost:5050/api/auth/signup

# Login
-> http://localhost:5050/api/auth/login
```

---

Like Service

```
# Like Post with PostID
-> http://localhost:5050/api/like-service/like/<PostID>?user=<UserID>

# Unlike Post with PostID
-> http://localhost:5050/api/like-service/unlike/<PostID>?user=<UserID>

# Get No. of Likes
-> http://localhost:5050/api/like-service/like/<PostID>
```

> NOTE: Ensure to signup and login to like and unlike posts.
