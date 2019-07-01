exports.up = function(knex, Promise) {
  return knex.schema.createTable("kind_acts", kind_acts => {
    kind_acts.increments();
    kind_acts.string("description", 128);
    kind_acts
      .integer("act_type")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("type")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    kind_acts
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("kind_acts");
};
