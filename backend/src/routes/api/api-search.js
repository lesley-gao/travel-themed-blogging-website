import express from "express";
import {
  searchArticlebyUsername, searchArticlebyTitle, searchArticlebyDate
} from "../../data/articles-dao.js";
const router = express.Router();

/**
 * GET /api/search/username
 * get matching articles by username
 */
router.get('/username', async (req, res) => {
  const keyword = req.query.keyword;
  const articles = await searchArticlebyUsername(keyword);
  return res.json(articles);
});

/**
 * GET /api/search/title
 * get matching articles by title
 */
router.get('/title', async (req, res) => {
  const keyword = req.query.keyword;
  const article = await searchArticlebyTitle(keyword);
  return res.json(article);
});

/**
 * GET /api/search/date
 * get matching articles by date
 */
router.get('/date', async (req, res) => {
  const dateMin = req.query.dateMin;
  const dateMax = req.query.dateMax;
  const article = await searchArticlebyDate(dateMin, dateMax);
  return res.json(article);
});

export default router;