exports.up = function(knex, Promise) {
  return knex.schema.createTable("type", type => {
    type.increments();

    type.string("description", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("type");
};
