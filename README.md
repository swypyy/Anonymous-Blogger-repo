# Anonymous Blogger

A small anonymous blogging project with a web page and a Node.js/Express API for posts and comments.

🌐 **Web page:** [Open the blog](https://swypyy.github.io/blog.html)

## Features

- Create and view anonymous posts
- Add and read comments
- Store posts and comments in local JSON files
- Simple Express API

## Built with

- JavaScript
- Node.js
- Express

## Run locally

1. Install [Node.js](https://nodejs.org/).
2. Clone this repository and open its folder:

   ```bash
   git clone https://github.com/swypyy/Anonymous-Blogger-repo.git
   cd Anonymous-Blogger-repo
   ```

3. Install dependencies and start the server:

   ```bash
   npm install
   npm start
   ```

The server uses port `3000` by default.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/posts` | Get posts |
| `POST` | `/api/posts` | Create a post |
| `GET` | `/api/comments/:postId` | Get comments for a post |
| `POST` | `/api/comments/:postId` | Add a comment |

## License

See [LICENSE](LICENSE) for usage terms.
