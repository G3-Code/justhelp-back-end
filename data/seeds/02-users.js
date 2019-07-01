const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").insert([
    {
      first_name: "admin",
      last_name: "admin",
      phone_number: 0000000000,
      email: "admin@rag.com",
      password: bcrypt.hashSync("password", 10)
    }
  ]);
};
