const db = require("../data/dbconfig");

module.exports = {
  add,
  findByUserId,
  findById,
  update,
  remove
};

async function add(contact) {
  console.log(`:: CONTACTS MODEL :: ADD :: ${JSON.stringify(contact)}`);
  await db("contacts").insert(contact);
  return findByUserId(contact.user_id);
}

async function findBy(filter) {
  console.log(`:: CONTACT-MODEL :: FINDBY ::`);
  const result = await db("contacts")
    .where(filter)
    .first();
  console.log(`:: CONTACT-MODEL :: FINDBY RESULT :: ${JSON.stringify(result)}`);
  return result;
}

async function findByUserId(userId) {
  const result = await db("contacts").where({ user_id: userId });
  console.log(
    `:: CONTACTS MODEL :: FIND BY USER ID :: RESULT IS ${JSON.stringify(
      result
    )}`
  );
  return result;
}

function findById(id) {
  console.log(`:: IN FIND BY ID :: ${id}`);
  const result = db("contacts")
    .where({ id: id })
    .first();
  return result;
}

async function update(id, contact) {
  await db("contacts")
    .where({ id })
    .update(contact);
  let result = await findByUserId(contact.user_id);
  console.log(`:: CONTACTS MODEL :: UPDATE CONTACT :: RESULT IS ${result}`);
  return result;
}

async function remove(id) {
  console.log(`:: CONTACTS MODEL :: REMOVE ::`);
  const userId = await db("contacts")
    .select("user_id")
    .where({ id })
    .first();
  await db("contacts")
    .where({ id: id })
    .del();
  const result = await findByUserId(userId.user_id);
  console.log(`:: CONTACTS MODEL :: DELETE CONTACT :: RESULT IS ${result}`);
  return result;
}
