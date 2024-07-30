function containsPossiblePhoneNumber(str) {
    return (str.match(/\d/g)?.length >= 5) && (str.match(/\d/g)?.length <= 15);
};

function containsPossibleEmail(str) {
    return str.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)?.length > 0;
};

module.exports = {
    containsPossiblePhoneNumber: containsPossiblePhoneNumber,
    containsPossibleEmail: containsPossibleEmail
};