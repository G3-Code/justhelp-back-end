exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("type").insert([
    { description: "1 - admin" },
    { description: "2 - family" },
    { description: "3 - friends" },
    { description: "4 - pet" },
    { description: "5 - Community" },
    { description: "6 - Initial" }
  ]);
};
