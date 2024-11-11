const {createTable, insertRecord} = require('../../utils/sqlFunction');
const {v4: uuidv4} = require('uuid');
const BlogSchema = require('../../schemas/blogSchema');

const createBlog = async (req, res) => {
  const {title, content} = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!title || !content) {
    return res.status(400).json({error: 'Title and Content are required'});
  }

  try {
    const blog = {
      blogId: uuidv4(),
      userId,
      title,
      content,
      createAt: new Date()
    };
    await createTable(BlogSchema);
    await insertRecord('blogs', blog);
    return res.status(201).json({ message: 'Blog created successfully!' });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {createBlog};