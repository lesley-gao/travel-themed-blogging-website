import express from "express";
import { getUserWithCredentials, getHashedPassword, updatePassword } from "../../data/users-dao.js";
import { createUserJWT } from "../../utils/jwt-utils.js";
import { requiresAuthentication } from "../../middleware/authmiddleware.js";
import { hashPassword, comparePassword } from "../../utils/pw-utils.js";
const router = express.Router();

/**
 * POST  /api/auth 
 * for user logging in, verify if the user exists,
 * then create a new JWT token and return to browser
 */
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserWithCredentials(username, password);
    if (!user) return res.sendStatus(401);

    const jwtToken = createUserJWT(user.username);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res.cookie("authToken", jwtToken, {
        httpOnly: true,
        expires
    }).sendStatus(204);
});

/**
 * DELETE /api/auth
 * for user logging out
 * send an empty JWT token to delete the saved token.
 */
router.delete("/", (req, res) => {
    const expires = new Date(0);
    return res.cookie("authToken", "", {
        httpOnly: true,
        expires
    }).sendStatus(204);
});

/**
 * DELETE /api/auth
 * verifying and updating the password
 * Check if the current password matches the stored hashed password,if match,then update
 * If password is updated successfully, generate new JWT Token to let user log out and re-log in again
 */
router.patch('/', requiresAuthentication, async (req, res) => {
    try {
        const { userId, password, newPassword } = req.body;
        const storedHashedPassword = await getHashedPassword(userId);
        // Check if the current password matches the stored hashed password
        const currentPasswordMatches = await comparePassword(password, storedHashedPassword);
        if (currentPasswordMatches) {
            const hashedNewPassword = await hashPassword(newPassword);
            const isUpdated = await updatePassword(userId, hashedNewPassword);
            if (isUpdated) {
                res.cookie("authToken", "", {
                    httpOnly: true,
                    expires: new Date(0)
                }).sendStatus(204);
            } else {
                return res.sendStatus(404);
            }
        } else {
            return res.sendStatus(422);
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});


export default router;