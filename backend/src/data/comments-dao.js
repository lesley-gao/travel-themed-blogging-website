import { getDatabase } from "./database.js";

/**
 * Get all comments for a single article in recursive order
 * @param {string} id - The article ID.
 * @returns a recursive array or else, an empty array
 */
export async function getAllComments(article_id) {
  const db = await getDatabase();
  const comments = await db.all(`SELECT c.*, u.username, 
  u.avatar_path FROM comments c, users u 
  WHERE u.id =c. user_id AND article_id =${article_id}`)

  // function to build the recursive array for front end to reuse easily
  function buildCommentTree(comments, parentId = null) {
    const tree = [];
    comments.forEach(comment => {
      if (comment.parent_id === parentId) {
        const replies = buildCommentTree(comments, comment.id);
        if (replies.length > 0) {
          comment.replies = replies;
        }
        tree.push(comment);
      }
    });
    return tree;
  }
  const commentTree = buildCommentTree(comments);
  return commentTree;
}

/**
 * Add comment and replies
 * @param {string} userId, parentId, articleId, newReply, time - the comment info
 * @returns {boolean} true if a comment is added or false otherwise
 */
export async function addComment(userId, parentId, articleId, newReply, time) {
  const db = await getDatabase();
  const result = await db.run("INSERT INTO comments (parent_id, article_id, user_id, content, time) VALUES (?, ?, ?, ?, ?)",
    [parseInt(parentId), parseInt(articleId), parseInt(userId), newReply, time]);

  return result.changes > 0;
}

/**
 * Soft delete comment and replies
 * @param {string} commentId - the comment id to be deleted
 * @returns {boolean} true if deleted or false otherwise 
 */
export async function deleteComment(commentId) {
  const db = await getDatabase();
  const sql = `UPDATE comments
              SET  content = 'This comment has been deleted', time = null
              WHERE id = ?;`
  const result = await db.run(sql, parseInt(commentId));

  return result.changes > 0;
} 


