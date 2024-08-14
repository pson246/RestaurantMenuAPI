const isEmpty = (str) => {
    return (!str || str.trim() === "");
};

module.exports = {
    isEmpty: isEmpty
};