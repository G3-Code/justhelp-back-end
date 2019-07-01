const db = require("../data/dbconfig");

module.exports = {
  add,
  findByUserId,
  findById,
  update,
  remove
};

async function add(contact) {
  await db("contacts").insert(contact);
  return findBy({
    contact_first_name: contact.contact_first_name,
    user_id: contact.user_id
  });
}

async function findBy(filter) {
  console.log(`:: CONTACT-MODEL :: FINDBY ::`);
  const result = await db("contacts")
    .where(filter)
    .first();
  return result;
}

async function findByUserId(userId) {
  const result = await db("contacts").where({ user_id: userId });
  console.log(`:: CONTACTS MODEL :: FIND BY USER ID :: RESULT IS ${result}`);
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
  const result = await db("contacts")
    .where({ id })
    .update(contact)
    .then(count => (count > 0 ? this.findById(id) : null));
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
