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

async function findByUserId(userId) {
  let result = await db("kind_acts").where({ user_id: userId });
  console.log(`:: FIND BY USER ID LENGTH IS :: ${result}`);
  if (result.length === 0) {
    result = await db("kind_acts").where({ user_id: "1" });
    console.log(`:: FIND BY USER ID LENGTH IS :: ${result.length}`);
    return result;
  } else {
    return result;
  }
}

function update(id, kindAct) {
  return db("kind_acts")
    .where({ id })
    .update(kindAct)
    .then(count => (count > 0 ? findById(id) : null));
}

function remove(id) {
  return db("kind_acts")
    .where({ id })
    .del();
}
