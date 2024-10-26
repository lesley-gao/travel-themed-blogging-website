import bcrypt from "bcrypt";

/**
 * salt and hash the given plain password.
 * @param {string} password the password to be hashed
 * @returns the hashed password.
 */
export async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

/**
 * compare the given plain password with the hashed one
 * @param {string} password the plain password to be compared
 * @param {string} hashedPassword the hashed password to be compared
 * @returns true if they are the same, or false otherwise
 */
export async function comparePassword(password, hashedPassword) {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}