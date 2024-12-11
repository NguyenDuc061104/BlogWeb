const { v4: uuidv4} = require('uuid');
const { checkRecordExist, insertRecord, createTable, updateRecord, deleteRecord} = require('../../utils/sqlFunction');
const blogSchema = require('../../schemas/blogSchema');
const authenticateToken = require('../middleware/authenticateToken');

const postBlog = async (req, res) => {
    const { title, content, reaction } = req.body;
    const userId = req.user.userId;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        await createTable(blogSchema);
        const blog = {
            blogId: uuidv4(),
            userId,
            title,
            content,
            reaction
        };
        await insertRecord('blogs', blog);
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editBlog = async (req, res) => {
    const { blogId, title, content, reaction } = req.body;
    const userId = req.user.userId;

    if (!blogId || !title || !content) {
        return res.status(400).json({ message: 'Blog ID, title, and content are required' });
    }

    try {
        const blog = await checkRecordExist('blogs', 'blogId', blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this blog' });
        }

        await updateRecord('blogs', { title, content, reaction }, 'blogId', blogId);
        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBlog = async (req, res) => {
    const { blogId } = req.body;
    const userId = req.user.userId;

    if (!blogId) {
        return res.status(400).json({ message: 'Blog ID is required' });
    }

    try {
        const blog = await checkRecordExist('blogs', 'blogId', blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this blog' });
        }

        await deleteRecord('blogs', 'blogId', blogId);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { postBlog, editBlog, deleteBlog };