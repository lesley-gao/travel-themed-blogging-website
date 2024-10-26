import express from "express";
import { requiresAuthentication } from "../../middleware/authmiddleware.js";
import { createUser, getAllUsers, updateUser, isUsernameAlreadyTaken, getAllUsernames, deleteUser } from "../../data/users-dao.js";
import { deleteAllArticleByUserId } from "../../data/articles-dao.js";
import { createUserJWT } from "../../utils/jwt-utils.js";

const router = express.Router();

/**
 * POST /api/users/register
 * Create new account, username, password, email and avatar are required
 * send back the new token
 */
router.post("/register", async (req, res) => {
    try {
        const user = await createUser(req.body);
        if (!user) return res.sendStatus(401);
        const jwtToken = createUserJWT(user.username);
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie("authToken", jwtToken, {
            httpOnly: true,
            expires
        }).sendStatus(204);
    } catch (err) {
        res.status(422).json(err.errors);
    }
});

/**
 * GET /api/users/
 * get all users data
 */
router.get("/", async (req, res) => {
    const users = await getAllUsers();
    return res.json(users);

})

/**
 * GET /api/users/username
 * get all username for validation
 */
router.get("/username", async (req, res) => {
    const usernames = await getAllUsernames();
    return res.json(usernames);
})

/**
 * GET /api/users/me 
 * get the user info for the currently authenticated user,
 * or return a 401 if there's an authentication error.
 * The authentication functionality is handled by the requiresAuthentication middleware, which adds the user
 * info to req.user. So just need to return that.
 */

router.get("/me", requiresAuthentication, (req, res) => {
    return res.json(req.user);
});

/**
 * POST /api/users/ 
 * check if the username is already taken in the database
 * Return the validation result
 */
router.post('/', async (req, res) => {
    try {
        const { username } = req.body;
        const isUsernameTaken = await isUsernameAlreadyTaken(username);
        res.status(200).json({ isUsernameTaken });
    } catch (error) {
        console.error('Error in username validation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * PATCH /api/users/me
 * update the currently authenticated user's sign up information.
 * If there is no currently authenticated user, a 401 response is returned (handled by requiresAuthentication middleware).
 * If the "update user" info in req.body is invalid, a 422 response is returned.
 * Otherwise, the user info is updated and a 204 response is returned.
 */

router.patch("/me", requiresAuthentication, async (req, res) => {
    try {
        const isUpdated = await updateUser(req.user.id, req.body);
        return res.sendStatus(isUpdated ? 204 : 404);
    } catch {
        return res.sendStatus(422);
    }
});

/**
 * DELETE /api/users
 * delete the currently user's account information --- Set user information to null.
 * Articles created by this user would also be deleted
 */
router.delete('/', requiresAuthentication, async (req, res) => {
    const userId = req.user.id;
    try {
        await deleteUser(userId);
        await deleteAllArticleByUserId(userId);
        res.cookie("authToken", "", {
            httpOnly: true,
            expires: new Date(0)
        }).send();
    } catch (error) {
        return res.sendStatus(422);
    }
});


export default router;