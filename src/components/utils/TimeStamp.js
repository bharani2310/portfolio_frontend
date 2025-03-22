export const isCacheValid = (key, expiryTime = 6 * 60 * 60 * 1000) => {
    const lastUpdated = parseInt(localStorage.getItem(`${key}_timestamp`), 10) || 0;

    // const timeElapsed = Date.now() - lastUpdated;
    // const timeLeft = expiryTime - timeElapsed;

    // const elapsedHours = Math.floor(timeElapsed / (1000 * 60 * 60));
    // const elapsedMinutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));

    // const leftHours = Math.floor(timeLeft / (1000 * 60 * 60));
    // const leftMinutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    // console.log(`Time elapsed for '${key}': ${elapsedHours}h ${elapsedMinutes}m`);
    // console.log(`Time left before expiry: ${leftHours}h ${leftMinutes}m`);

    return (Date.now() - lastUpdated) < expiryTime;
};
