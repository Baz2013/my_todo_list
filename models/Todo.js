const db = require('../db');

module.exports = db.defineModel('todos', {
    ownerId: db.ID,
    name: db.STRING(100),
    description: db.STRING(600),
    endTime: db.BIGINT,
    status: db.INTEGER(10),
});
