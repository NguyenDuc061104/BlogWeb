const { v4: uuidv4 } = require('uuid');
const blogSchema = require('../../schemas/blogSchema');
const { createTable, insertRecord } = require('../../utils/sqlFunction');

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId; // Assuming user is authenticated and userId is available in req.user

  if (!title || !content) {
    res.status(400).json({ error: "Title and Content fields cannot be empty!" });
    return;
  }

  const blog = {
    blogId: uuidv4(),
    userId,
    title,
    content,
  };

  try {
    await createTable(blogSchema);
    await insertRecord("blogs", blog);
    res.status(201).json({ message: "Blog created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBlog };