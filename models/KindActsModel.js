const db = require("../data/dbconfig");

module.exports = {
  add,
  findById,
  findBy,
  findByUserId,
  update,
  remove
};

async function add(kindAct) {
  const result = await db("kind_acts").insert(kindAct);
  const filter = { description: kindAct.description, user_id: kindAct.user_id };
  return findBy(filter);
}

function findBy(filter) {
  return db("kind_acts")
    .where(filter)
    .first();
}

function findById(id) {
  return db("kind_acts")
    .where({ id })
    .first();
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
