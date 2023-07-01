# Likes Service

This is a service to handle Like, Unlike and get No. of Likes on a post.

## Installation ⚙️

```
yarn
yarn build
yarn start
```

> NOTE: Make sure to create an env before building or copy paste the .env.example to test the code

## Endpoints

```
# Like Post with PostID
-> http://localhost:5050/api/like-service/like/<PostID>?user="<UserID>"

# Unlike Post with PostID
-> http://localhost:5050/api/like-service/unlike/<PostID>?user="<UserID>"

# Get No. of Likes
-> http://localhost:5050/api/like-service/like/<PostID>
```
