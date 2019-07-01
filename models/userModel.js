const db = require("../data/dbconfig");

module.exports = {
  add,
  findBy
};

async function add(user) {
  await db("users").insert(user);
  return findBy({ email: user.email });
}

async function findBy(filter) {
  return await db("users")
    .where(filter)
    .first();
}
