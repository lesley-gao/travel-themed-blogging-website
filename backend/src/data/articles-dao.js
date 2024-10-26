import { getDatabase } from "./database.js";
import dayjs from "dayjs";

/**
 * Get all articles in the database
 * @returns the articles array, or else, an empty array
 */
export async function getAllArticles() {
  const db = await getDatabase();
  return await db.all("SELECT * FROM articles");
}

/**
 * Get single articles by article id
 * @param {string} id the article id to search
 * @returns single article info as well as the author's name & avatar to display
 */
export async function getArticleByArticleID(id) {
  const db = await getDatabase();
  const sql = "SELECT a.*, u.username, u.avatar_path FROM articles AS a JOIN users AS u ON a.author_id = u.id WHERE a.id =?";
  return await db.get(sql, parseInt(id));
}

/**
 * Gets all articles authored by one user
 * @param {string} userId the user id to search
 * @returns articles array, or else an empty array
 */
export async function getArticleByUserId(userId) {
  const db = await getDatabase();
  const sql = `
    SELECT *
    FROM articles
    WHERE author_id = ?
  `;
  return await db.all(sql, parseInt(userId));
}

/**
 * create new articles
 * @param {object} article all the info from req.body to create the article
 * @returns new article ID
 */
export async function createArticle(article) {
  const db = await getDatabase();
  const { title, author_id, abstract, content, category, create_time, edit_time, icon_path } = article;
  const dbResult = await db.run(
    "INSERT INTO articles ( author_id,title, abstract, content, category, create_time, edit_time,icon_path) VALUES (?, ?, ?, ?, ?, ?,?,?)",
    author_id,
    title,
    abstract,
    content,
    category,
    create_time,
    edit_time,
    icon_path
  );
  return dbResult.lastID;
}

/**
 * edit current article
 * @param {string} id article id to change
 * @param {object} article all the info from req.body to be changed
 * @returns if there's anything been updated
 */
export async function updateArticles(id, article) {
  const db = await getDatabase();
  const sql = `
        UPDATE articles 
        SET title = ?, abstract = ?, content = ?, category = ?, edit_time = ?, icon_path = ?
        WHERE id = ?
    `;
  const dbResponse = await db.run(sql, [
    article.title,
    article.abstract,
    article.content,
    article.category,
    article.edit_time,
    article.icon_path,
    id
  ]);
  return dbResponse.changes > 0
}

/**
 * Search articles by username
 * @param {string} keyword keyword to search
 * @returns articles array matching the search terms or an empty array
 */
export async function searchArticlebyUsername(keyword) {
  const db = await getDatabase();
  const sql = `SELECT a.* FROM articles AS a, users AS u
      WHERE a.author_id = u.id
      AND u.username LIKE ? COLLATE NOCASE`;
  const matchingArticles = await db.all(sql, [`%${keyword}%`]);
  return matchingArticles;
}

/**
 * Search articles by title
 * @param {string} keyword keyword to search
 * @returns articles array matching the search terms, or else an empty array
 */
export async function searchArticlebyTitle(keyword) {
  const db = await getDatabase();
  const sql = `SELECT * FROM articles WHERE title LIKE ? COLLATE NOCASE`;
  const matchingArticles = await db.all(sql, [`%${keyword}%`]);
  return matchingArticles;
}

/**
 * Search articles by date
 * @param {*} dateMin 
 * @param {*} dateMax 
 * @returns articles array matching the search terms, or else an empty array
 */
export async function searchArticlebyDate(dateMin, dateMax) {
  const db = await getDatabase();

  const sql = `SELECT * FROM articles WHERE create_time BETWEEN ? AND ?`;
  const formatedDateMin = dayjs(dateMin).format('YYYY-MM-DD');
  const formatedDateMax = dayjs(dateMax).format('YYYY-MM-DD');
  const matchingArticles = await db.all(sql, formatedDateMin, formatedDateMax);
  return matchingArticles;
}

/**
 * Delete single article.
 * As in the database, the ON DELETE CASCADE is defined in the child table 
 * who has reference to it, when an article is deleted, 
 * all its related data in comment/likes table will be deleted at the same time.
 * @param {string} id article id to be deleted
 * @returns if there's anything been deleted
 */
export async function deleteArticleByAricleId(id) {
  const db = await getDatabase();
  const dbResponse = await db.run(`DELETE FROM articles WHERE id = ?`, parseInt(id));
  return dbResponse.changes > 0;
}

/**
 * Delete all articles under one user account.
 * @param {string} id article id to be deleted
 * @returns if there's anything been deleted
 */
export async function deleteAllArticleByUserId(id) {
  const db = await getDatabase();
  const dbResult = await db.run(`DELETE FROM articles WHERE author_id = ?`, parseInt(id));
  return dbResult.changes > 0;
}