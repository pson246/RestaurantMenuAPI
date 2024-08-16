const sanitizeHtml = require("sanitize-html");
const mysql = require("mysql");
const error = "error";
const success = "success";
var authenticationResult = "";

const authenticate = async (request) => {
    try {
        const expectedUsername = process.env.VITE_REACT_APP_AUTHENTICATION_USERNAME || "";
        const expectedPassword = process.env.VITE_REACT_APP_AUTHENTICATION_PASSWORD || "";
        const requestBody = request.body;
        var actualUsername = requestBody.username;
        actualUsername = sanitizeHtml(actualUsername);
        actualUsername = mysql.escape(actualUsername);
        actualUsername = actualUsername.replaceAll('\'', '');
        var actualPassword = requestBody.password;
        actualPassword = sanitizeHtml(actualPassword);
        actualPassword = mysql.escape(actualPassword);
        actualPassword = actualPassword.replaceAll('\'', '');
        if (actualUsername === expectedUsername && actualPassword === expectedPassword) {
            authenticationResult = success;
        } else {
            authenticationResult = error;
        }
    } catch (error) {
        authenticationResult = error;
    }
};

module.exports = async function (context, req) {
    await authenticate(req);
    context.res.json({
        "result": authenticationResult
    });
};