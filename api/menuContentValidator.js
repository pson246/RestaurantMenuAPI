function containsPossiblePhoneNumber(str) {
    return (str.match(/\d/g)?.length >= 5) && (str.match(/\d/g)?.length <= 15);
};

function containsPossibleEmail(str) {
    const lastAtIndex = str.lastIndexOf('@');
    return lastAtIndex > 0 && str.indexOf('.', lastAtIndex) > lastAtIndex;
};

module.exports = {
    containsPossiblePhoneNumber: containsPossiblePhoneNumber,
    containsPossibleEmail: containsPossibleEmail
};