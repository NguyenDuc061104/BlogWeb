const { v4: uuidv4} = require('uuid');
const { checkRecordExist, insertRecord, createTable} = require('../../utils/sqlFunction');
const blogSchema = require('../../schemas/blogSchema');
const authenticateToken = require('../middleware/authenticateToken');

const postBlog = async(req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;

    if (!title || !content) {
        return res.status(400).json({message: 'User ID, title, and content are required'});
    }

    try {
        await createTable(blogSchema);
        const blog = {
            blogId: uuidv4(),
            userId,
            title,
            content
        }
        await insertRecord('blogs', blog);
        res.status(201).json({message: 'Blog created successfully'});
    } catch (e) {
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = { postBlog };