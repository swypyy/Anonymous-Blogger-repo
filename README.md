# Anonymous-Blogger-repo

A private anonymous blogging backend built with Node.js and Express.

## About
This project is a lightweight blog server that allows users to:
- create anonymous posts
- view all posts
- add comments to individual posts
- store post and comment data locally in JSON files

It is designed for simple local use and easy deployment on a small backend environment.

## Live Demo
Visit the working anonymous blogger here:
https://swypyy.github.io/blog.html

## Features
- Express.js REST API
- CORS enabled
- JSON-based data storage
- Anonymous post publishing
- Per-post comments
- Simple server setup with Node.js

## Tech Stack
- Node.js
- Express
- JavaScript

## Project Structure
- `server.js` - main backend server
- `posts.json` - stores published posts
- `comments.json` - stores comments by post ID
- `package.json` - project metadata and dependencies

## Installation
```bash
npm install
```

## Run
```bash
npm start
```

The server runs on port `3000` by default.

## API Endpoints
### Get all posts
```http
GET /api/posts
```

### Create a post
```http
POST /api/posts
```
Body example:
```json
{
  "title": "My first post",
  "content": "This is the post content",
  "author": "Anonymous"
}
```

### Get comments for a post
```http
GET /api/comments/:postId
```

### Add a comment
```http
POST /api/comments/:postId
```
Body example:
```json
{
  "text": "Nice post!"
}
```

## License
Copyright (c) 2026 swypyy
All rights reserved.

No permission is granted to copy, modify, distribute, or use this project without written authorization from swypyy.
