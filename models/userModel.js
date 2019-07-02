const db = require("../data/dbconfig");

module.exports = {
  add,
  findBy,
  find,
  update
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

//THIS IS FOR INTERNAL USE ONLY
function find() {
  return db("users").select("id", "username", "password");
}

async function update(id, user) {
  console.log(
    `:: USER-MODEL :: UPDATE :: id is ${id} and user is ${JSON.stringify(user)}`
  );
  const result = await db("users")
    .where({ id })
    .update(user)
    .then(count => (count > 0 ? this.findBy({ id }) : null));
  return result;
}
