const db = require("../data/dbconfig");

module.exports = {
  add,
  findById,
  findBy,
  findByUserId,
  update,
  remove
};

function add(kindAct) {
  db("kind_acts").insert(kindAct);
  return findBy({ description: kindAct.description, user_id: kindAct.user_id });
}

function findBy(filter) {
  return db("kind_acts")
    .where(filter)
    .first();
}

function findById(id) {
  return db("kind_acts").where({ id });
}

function findByUserId(userId) {
  return db("kind_acts").where({ user_id: userId });
}

function update(id, kindAct) {
  return db("kind_acts")
    .where({ id })
    .update(kindAct)
    .then(count => (count > 0 ? findById(count) : null));
}

function remove(id) {
  return db("kind_acts")
    .where({ id })
    .del();
}
