const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'posts.json');

function getPosts() {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

app.get('/api/posts', (req, res) => {
    const posts = getPosts();
    res.json(posts);
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Blog server running on port ${PORT}`));
  
