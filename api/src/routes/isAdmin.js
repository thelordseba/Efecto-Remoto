// const { isAdmin} = require('./helper')

module.exports = function (req) {
    if (!req.user) return false;
    if (!req.user.isAdmin) return false;
    if (req.user.isAdmin !== true) return false;
    return true;
  };
  