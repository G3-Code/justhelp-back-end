exports.up = function(knex, Promise) {
  return knex.schema.createTable("contacts", contacts => {
    contacts.increments();
    contacts.string("contact_first_name", 128).notNullable();
    contacts.string("contact_last_name", 128).notNullable();
    contacts
      .integer("contact_type")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("type")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    contacts.string("contact_nick_name", 128);
    contacts
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contacts");
};
