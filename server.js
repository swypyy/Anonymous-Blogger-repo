const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'posts.json');
const COMMENTS_FILE = path.join(__dirname, 'comments.json');

// Helper to read posts safely
function getPosts() {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

// Helper to read comments safely
function getComments() {
    if (!fs.existsSync(COMMENTS_FILE)) return {};
    try {
        const data = fs.readFileSync(COMMENTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

// Get all posts
app.get('/api/posts', (req, res) => {
    const posts = getPosts();
    res.json(posts);
});

// Create a new post
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const posts = getPosts();
    const newPost = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        author: author ? author.trim() : 'Anonymous',
        date: new Date().toLocaleDateString()
    };

    posts.unshift(newPost);
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));

    res.status(201).json({ message: 'Post published successfully!', post: newPost });
});

// Get comments for a specific post
app.get('/api/comments/:postId', (req, res) => {
    const commentsStore = getComments();
    const postId = req.params.postId;
    res.json(commentsStore[postId] || []);
});

// Add a comment to a specific post
app.post('/api/comments/:postId', (req, res) => {
    const postId = req.params.postId;
    const { text } = req.body;
    
    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Comment text is required' });
    }

    const commentsStore = getComments();
    if (!commentsStore[postId]) {
        commentsStore[postId] = [];
    }

    const newComment = {
        id: Date.now(),
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    commentsStore[postId].push(newComment);
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(commentsStore, null, 2));

    res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Blog server running on port ${PORT}`));
            
