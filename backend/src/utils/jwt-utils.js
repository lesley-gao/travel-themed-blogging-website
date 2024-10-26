import jwt from "jsonwebtoken";
/**
 * Gets the username with the given token
 * @param  token the token to be decoded
 * @returns the username matches or throw an error message if not exist.
 */
export function getUsernameFromJWT(token) {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded.username) throw 'JWT is valid but did not contain a username';
    return decoded.username;
}

/**
 * Create a new token by given username
 */
export function createUserJWT(username, expiresIn = '24h') {
    return jwt.sign({ username }, process.env.JWT_KEY, { expiresIn });
}