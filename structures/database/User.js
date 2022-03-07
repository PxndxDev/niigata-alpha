const defaults = {
    avatar: "default",
    joinedAt: Date.now(),
};
const ensure = {
    realName: "",
    pseudonyme: "",
    email: "",
    password: "",
    avatar: defaults.avatar,
    joinedAt: defaults.joinedAt,
};
module.exports = { defaults, ensure };