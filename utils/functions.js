const User = require("../structures/database/User");

module.exports = {
    createUser: async (client, body) => {
        await client.Users.ensure(body.pseudonyme, User.ensure);
        await client.Users.set(body.pseudonyme, {
            realName: body.realName,
            pseudonyme: body.realName,
            email: body.email,
            password: body.password,
            avatar: User.defaults.avatar,
            joinedAt: User.defaults.joinedAt,
        });
    },
    findUser: async (client, pseudonyme) => {
        if (client.Users.has(pseudonyme)) return await client.Users.get(pseudonyme);
        else return null;
    },
};