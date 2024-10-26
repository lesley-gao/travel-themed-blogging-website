import { getDatabase } from "./database.js";

/**
 * Get the number of likes for all articles
 * @returns - an array of article-user pairs
 */
export async function getLikesCountForArticles() {
    const db = await getDatabase();
    const likesCount = await db.all("SELECT article_id, COUNT(*) as likes_count FROM likes GROUP BY article_id");
    const transformedlikes = {};

    //transform the {article_id: 1, likes_count: 1} structure to {1:1} for the easy use in frontend
    likesCount.forEach(item => {
        transformedlikes[item.article_id] = item.likes_count;
    });
    return transformedlikes;
}


/**
 * Get the number of likes for a specific article
 * @param {string} articleId 
 * @returns - the likes count for this article
 */
export async function getLikesForOneArticle(articleId) {
    const db = await getDatabase();
    const sql = `SELECT COUNT(*) AS like_count, GROUP_CONCAT(users.avatar_path) AS like_avatars 
                FROM likes JOIN users ON likes.user_id = users.id WHERE likes.article_id =?`;
    const likes = await db.all(sql, parseInt(articleId));
    return likes;
}

/**
 * check if a user has liked a specific article
 * @param {string} articleId 
 * @param {string} userId 
 * @returns - the like record if any or undefined
 */
export async function getIfLiked(userId, articleId) {
    const db = await getDatabase();
    const sql = "SELECT * FROM likes WHERE user_id = ? AND article_id = ?";
    const like = await db.get(sql, [userId, articleId]);
    return like;
}

/**
 * Insert a new record into the likes table
 * @param {string} articleId 
 * @param {string} userId 
 * @returns - the updated likes count for this article
 */
export async function addLike(userId, articleId) {
    const db = await getDatabase();
    const result = await db.run("INSERT INTO likes (article_id, user_id) VALUES (?, ?)", [parseInt(articleId), parseInt(userId)]);
    // Get the new like count for the article
    const newLikeCount = await getLikesForOneArticle(articleId);
    return newLikeCount;
}

/**
 * Remove the corresponding record from the likes table 
 * @param {string} articleId 
 * @param {string} userId 
 * @returns - the updated likes count for this article
 */
export async function deleteLike(userId, articleId) {
    const db = await getDatabase();
    const sql = "DELETE FROM likes WHERE user_id = ? AND article_id = ?";
    const result = await db.run(sql, [userId, articleId]);
    const newLikeCount = await getLikesForOneArticle(articleId);
    return newLikeCount;
}


