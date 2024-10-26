import express from "express";
import { requiresAuthentication } from "../../middleware/authmiddleware.js";
import {
  getLikesCountForArticles, getLikesForOneArticle, getIfLiked, addLike, deleteLike
} from "../../data/likes-dao.js";
const router = express.Router();

/**
 * GET /api/likes
 * get likes counts for all the articles
 */
router.get("/", async (req, res) => {
  try {
    const likesCount = await getLikesCountForArticles();
    return res.json(likesCount);
  } catch {
    return res.sendStatus(422);
  }
});

/**
 * GET /api/likes/:articleId
 * get likes counts for a specific article
 */
router.get("/:articleId", async (req, res) => {
  try {
    const likes = await getLikesForOneArticle(req.params.articleId);
    return res.json(likes);
  } catch {
    return res.sendStatus(422);
  }
});

/**
 * POST /api/likes/:articleId
 * Route to like an article and return the updated like counts
 */
router.post("/:articleId", requiresAuthentication, async (req, res) => {
  try {
    const addedCount = await addLike(req.user.id, req.params.articleId);
    return res.json(addedCount);
  } catch {
    return res.sendStatus(422);
  }
});

/**
 * DELETE /api/likes/:articleId
 * Route to dislike an article and return the updated like counts
 */
router.delete("/:articleId", requiresAuthentication, async (req, res) => {
  try {
    const deletedLike = await deleteLike(req.user.id, req.params.articleId);
    return res.json(deletedLike);
  } catch {
    return res.sendStatus(422);
  }
});

/**
 * GET /api/likes/:articleId/like
 * Route to check if user has liked the article
 */
router.get("/:articleId/like", requiresAuthentication, async (req, res) => {
  try {
    const ifLiked = await getIfLiked(req.user.id, req.params.articleId);
    return ifLiked ? res.json(true) : res.json(false);
  } catch {
    return res.sendStatus(422);
  }
});
export default router;