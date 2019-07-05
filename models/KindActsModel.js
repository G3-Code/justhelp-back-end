const db = require("../data/dbconfig");

module.exports = {
  add,
  findById,
  findBy,
  findByUserId,
  update,
  remove,
  findByUserIdForHP
};

async function add(kindAct) {
  const result = await db("kind_acts").insert(kindAct);
  return findByUserId(kindAct.user_id);
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

async function findByUserIdForHP(userId) {
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

async function update(id, kindAct) {
  await db("kind_acts")
    .where({ id })
    .update(kindAct);
  let result = await findByUserId(kindAct.user_id);
  console.log(`:: KIND ACT MODEL :: UPDATE KIND ACT :: RESULT IS ${result}`);
  return result;
}

function remove(id) {
  return db("kind_acts")
    .where({ id })
    .del();
}
