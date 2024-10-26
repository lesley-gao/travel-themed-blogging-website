import express from "express";
import { requiresAuthentication } from "../../middleware/authmiddleware.js";
import { getAllComments, addComment, deleteComment } from "../../data/comments-dao.js";
const router = express.Router();

/**
 * GET /api/comments/:id
 * get all comments for a specific article
 */
router.get("/:id", async (req, res) => {
    const article_id = req.params.id;
    const comments = await getAllComments(article_id);
    return res.json(comments);
});

/**
 * POST /api/comments
 * create a new comment for a specific article
 */
router.post("/", requiresAuthentication, async (req, res) => {
    const userId = req.user.id;
    const { parentId, articleId, newReply, time } = req.body;
    const added = await addComment(userId, parentId, articleId, newReply, time);
    return res.sendStatus(added ? 200 : 422);
});

/**
 * DELETE /api/comments
 * soft delete a comment
 */
router.delete("/", requiresAuthentication, async (req, res) => {
    const { commentId } = req.body;
    const deleted = await deleteComment(commentId);
    return res.sendStatus(deleted ? 200 : 422);
});

export default router;

