import express from "express";
import { requiresAuthentication } from "../../middleware/authmiddleware.js";
import {
  getAllArticles, getArticleByArticleID, createArticle,
  updateArticles, getArticleByUserId, deleteArticleByAricleId
}
  from "../../data/articles-dao.js";
const router = express.Router();

/**
 * GET /api/articles
 * get all articles data
 */
router.get('/', async (req, res) => {
  const articles = await getAllArticles();
  return res.json(articles)
});

/**
 * GET /api/articles/:id
 * get single article by id
 */
router.get('/:id', async (req, res) => {
  const article = await getArticleByArticleID(req.params.id);
  return res.json(article);
});

/**
 * GET /api/articles/user/:id
 * get all the articles according to the user id
 */
router.get('/user/:id', async (req, res) => {
  const article = await getArticleByUserId(req.params.id);
  return res.json(article);
});

/**
 * POST /api/articles
 * create new article
 */
router.post("/", requiresAuthentication, async (req, res) => {
  try {
    req.body.author_id = req.user.id;
    const newId = await createArticle(req.body);
    return res.status(201).json(newId);

  } catch (error) {
    console.error("Server-side error:", error);
    // error response
    console.log("Error response data:", error.response ? error.response.data : "No response data");
    return res.sendStatus(422);
  }
});

/**
 * PATCH /api/articles/:id
 * update one article 
 */
router.patch("/:id", requiresAuthentication, async (req, res) => {
  try {
    const todoUpdated = await updateArticles(req.params.id, req.body)
    return res.sendStatus(todoUpdated ? 204 : 404);
  } catch {
    return res.sendStatus(422);
  }
});

/**
 * DELETE /api/articles/:id
 * delete one article 
 */
router.delete("/:id", requiresAuthentication, async (req, res) => {
  const articleId = req.params.id;
  const deletedArticle = await deleteArticleByAricleId(articleId);
  if (deletedArticle) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Article not found" });
  }
});

export default router;