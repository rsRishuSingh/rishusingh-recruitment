// Number of milliseconds in one minute
const MS_PER_MINUTE = 60 * 1000;

/**
 * Save a token in localStorage with an expiry timestamp.
 * @param {string} token_name - Key under which the token is stored.
 * @param {string} token - The token value to store.
 * @param {number} ttlMinutes - Time-to-live in minutes.
 */
export function setWithExpiry(token_name, token, ttlMinutes) {
    const now = Date.now();
    const item = {
        token,
        expiry: now + ttlMinutes * MS_PER_MINUTE,
    };
    localStorage.setItem(token_name, JSON.stringify(item));
}

/**
 * Retrieve a token from localStorage if it has not expired.
 * @param {string} token_name - Key under which the token is stored.
 * @returns {{ token: string, expiry: number } | null}
 */
export function getWithExpiry(token_name) {
    const itemStr = localStorage.getItem(token_name);
    if (!itemStr) return null; // no item found

    try {
        const { token, expiry } = JSON.parse(itemStr);
        // If current time exceeds the stored expiry, remove and return null
        if (Date.now() > expiry) {
            localStorage.removeItem(token_name);
            return null;
        }
        // Token is still valid
        return { token, expiry };
    } catch {
        // Malformed JSON or missing fields: clean up and return null
        localStorage.removeItem(token_name);
        return null;
    }
}
