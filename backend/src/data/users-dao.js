import yup from "yup";
import { getDatabase } from "./database.js";
import { hashPassword, comparePassword } from "../utils/pw-utils.js";

/**
 * Create a new user account after hash and salt the password
 * @param {*} userData new user info
 * @returns {boolean} True if the new user has been added, false otherwise
 */
export async function createUser(userData) {
    const { username, password, email, avatar_path, firstName, lastName, description, birthday } = userData;
    const hashedPassword = await hashPassword(password);
    const db = await getDatabase();
    const dbResult = await db.run(
        "INSERT INTO users(username, firstName,lastName,password, email, avatar_path,description,birthday) VALUES(?, ?, ?, ?,?, ?, ?, ?)",
        username,
        firstName,
        lastName,
        hashedPassword,
        email,
        avatar_path,
        description,
        birthday
    );
    return dbResult.changes > 0;
}

/**
 * Get all users' data from the table of users
 * @returns an array of users or empty array
 */
export async function getAllUsers() {
    const db = await getDatabase();
    const dbResult = await db.all("SELECT * FROM users");
    return dbResult;
}

/**
 * Get all usernameS from users table
 * @returns an array of usernames or else an empty array
 */
export async function getAllUsernames() {
    const db = await getDatabase();
    const dbResult = await db.all("SELECT username FROM users");
    return dbResult;
}

/**
 * Get the user with the given username, if it exists.
 * @param {string} username the username to search
 * @returns the user with the matching username, or undefined.
 */
export async function getUserWithUsername(username) {
    const db = await getDatabase();
    return await db.get("SELECT * from users WHERE username = ?", username);
}

/**
 * Verify the user with the given username and password.
 * @param {string} username the username to verify
 * @param {string} password the password to verify
 * @returns the user if it exists or null otherwise.
 */
export async function getUserWithCredentials(username, password) {
    const db = await getDatabase();
    const user = await db.get("SELECT * FROM users WHERE username = ?", username);
    if (!user) return null;

    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
        return user;
    } else {
        return null;
    }
}
/**
 * Get hashed password from database
 * @param {string} id - The userId to be searched for password
 * @returns the hashed password
 */
export async function getHashedPassword(id) {
    const db = await getDatabase();
    const user = await db.get("SELECT * from users WHERE id = ?", id);
    return user ? user.password : null;
}

/**
 * Check if an username is already taken in the database
 * @param {string} username - The username to be checked
 * @returns {boolean} - True if the username is already taken, false otherwise
 */
export async function isUsernameAlreadyTaken(username) {
    const db = await getDatabase();
    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', username);
    return !!existingUser;
}

/**
 * Schema for "update user"
 */
const updateUserSchema = yup
    .object({
        username: yup.string().min(1).optional(),
        firstName: yup.string().min(1).optional(),
        lastName: yup.string().min(1).optional(),
        email: yup.string().min(1).optional(),
        avatar_path: yup.string().optional(),
        description: yup.string().optional(),
        birthday: yup.string().optional()
    })
    .required();

/**
 * Update the user with the given id if it exists
 * @param {*} id the user id to update, will be converted to a number using parseInt().
 * @param {*} udpateData the update data to apply.
 * @returns true if the database was updated, false otherwise
 * @throws an error if updateData is invalid.
 */
export async function updateUser(id, udpateData) {
    // Validate incoming data 
    const parsedUpdateData = updateUserSchema.validateSync(udpateData, {
        abortEarly: false,
        stripUnknown: true
    });
    const [updateOperations, updateParams] = buildUpdateStatement(parsedUpdateData);
    const sql = `UPDATE users SET ${updateOperations} WHERE id = ?`;

    const db = await getDatabase();
    const dbResult = await db.run(sql, ...updateParams, parseInt(id));
    return dbResult.changes > 0;
}

function buildUpdateStatement(obj) {
    const updateOperations = [];
    const updateParams = [];

    for (const key of Object.keys(obj)) {
        const value = obj[key];
        updateOperations.push(`${key} = ?`);
        updateParams.push(value);
    }

    return [updateOperations.join(", "), updateParams];
}


/**
 * Function to update the password for a user.
 * @param {string} id - The user ID.
 * @param {string} newPassword - The new hashed password to set.
 * @returns {boolean} - True if the password is updated successfully, false otherwise.
 */
export async function updatePassword(id, newPassword) {
    try {
        const sql = `UPDATE users SET password = ? WHERE id = ?`;
        const db = await getDatabase();
        const dbResult = await db.run(sql, newPassword, parseInt(id));
        // Return true if changes were applied, false otherwise
        return dbResult.changes > 0;
    } catch (error) {
        // Handle validation errors
        console.error(error);
        return false;
    }
}

/**
 * Function to delete a user
 * @param {string} id user id to be deleted
 * @returns {boolean} True if deleted successfully, false otherwise.
 */
export async function deleteUser(id) {
    const db = await getDatabase();
    const updateSql = `
    UPDATE users
    SET
        firstName = NULL,
        lastName = NULL,
        email = NULL,
        description = NULL,
        birthday = NULL,
        avatar_path = NULL,
        password = NULL,
        username = 'This account has been deleted'
    WHERE id = ?
    `;

    const dbResult = await db.run(updateSql, parseInt(id));

    return dbResult.changes > 0;
}
