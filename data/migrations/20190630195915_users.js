exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    // COLUMN NAME:ID
    users.increments();

    // COLUMN NAME: FIRST_NAME
    users.string("first_name", 128).notNullable();

    // COLUMN NAME: LAST_NAME
    users.string("last_name", 128).notNullable();

    // COLUMN NAME: EMAIL
    users
      .string("email", 128)
      .notNullable()
      .unique();

    // COLUMN NAME:PHONE NUMBER
    users.integer("phone_number", 10);

    // COLUMN NAME:PASSWORD
    users.string("password", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
