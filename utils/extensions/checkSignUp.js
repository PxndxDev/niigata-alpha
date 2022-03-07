/* eslint-disable no-useless-escape */
module.exports = async (req) => {
    const validateEmail = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const allowedCharacters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "-", "_",
    ];

    const nameCharacters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ];

    const allowed = {
        realName: true,
        pseudonyme: true,
        email: validateEmail(req.email),
        password: true,
        confirmedPassword: req.password === req.confirmedPassword,
    };

    for (const char of req.realName.replace(/ +/g, "")) if (allowed.realName && !nameCharacters.includes(String(char).toLowerCase())) allowed.realName = false;
    for (const char of req.pseudonyme) if (allowed.pseudonyme && !allowedCharacters.includes(String(char).toLowerCase())) allowed.pseudonyme = false;
    for (const char of req.password) if (allowed.password && !allowedCharacters.includes(String(char).toLowerCase())) allowed.password = false;

    return allowed;
};