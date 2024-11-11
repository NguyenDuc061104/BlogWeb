//Creating blog table
const blogSchema = `
  CREATE TABLE IF NOT EXISTS blogs (
      blogId VARCHAR(255) UNIQUE NOT NULL,
      userId VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (blogId),
      FOREIGN KEY (userId) REFERENCES users(userId)
  )
`;

module.exports = blogSchema;