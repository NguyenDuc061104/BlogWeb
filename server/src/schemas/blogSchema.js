const blogSchema = `
  CREATE TABLE IF NOT EXISTS blogs (
    blogId VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36),
    title VARCHAR(255),
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId)
  )
`;

module.exports = blogSchema;