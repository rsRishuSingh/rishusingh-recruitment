// src/utils/tokenStorage.js

const MS_PER_MINUTE = 60 * 1000;

export function setWithExpiry(token_name, token, ttlMinutes) {
    const now = Date.now();
    const item = {
        token,
        expiry: now + ttlMinutes * MS_PER_MINUTE,
    };
    localStorage.setItem(token_name, JSON.stringify(item));
}

export function getWithExpiry(token_name) {
    const itemStr = localStorage.getItem(token_name);
    if (!itemStr) return null;

    try {
        const { token, expiry } = JSON.parse(itemStr);
        if (Date.now() > expiry) {
            localStorage.removeItem(token_name);
            return null;
        }
        return { token, expiry };
    } catch {
        // malformed data
        localStorage.removeItem(token_name);
        return null;
    }
}

