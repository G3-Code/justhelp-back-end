const db = require("../data/dbconfig");

module.exports = {
  add,
  findById,
  update,
  remove
};

async function add(contact) {
  const result = await db("contacts").insert(contact);
  console.log(`:: CONTACTS MODEL :: ADD :: RESULT IS ${result}`);
  return result;
}

async function findById(userId) {
  const result = await db("contacts").where({ user_id: userId });
  console.log(`:: CONTACTS MODEL :: FIND BY ID :: RESULT IS ${result}`);
  return result;
}

async function update(id, contact) {
  const result = await db("contacts")
    .where({ id })
    .update(contact);
  console.log(`:: CONTACTS MODEL :: UPDATE CONTACT :: RESULT IS ${result}`);
  return result;
}

async function remove(id) {
  const result = await db("contacts")
    .where({ id: id })
    .del();
  console.log(`:: CONTACTS MODEL :: DELETE CONTACT :: RESULT IS ${result}`);
  return result;
}
