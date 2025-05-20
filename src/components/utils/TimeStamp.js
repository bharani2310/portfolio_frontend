export const isCacheValid = (key, expiryTime = 6 * 60 * 60 * 1000) => {
    const lastUpdated = parseInt(localStorage.getItem(`${key}_timestamp`), 10) || 0;
    return (Date.now() - lastUpdated) < expiryTime;
};
