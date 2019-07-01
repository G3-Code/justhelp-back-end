exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("kind_acts").insert([
    {
      description: "Have coffee with a friend!",
      act_type: 5,
      user_id: 1
    },
    {
      description: "Give a tight hug to a friend!",
      act_type: 5,
      user_id: 1
    },
    {
      description: "Cook an awesome meal for a loved one",
      act_type: 5,
      user_id: 1
    },
    {
      description: "Pass along a wonderful book you have finished reading",
      act_type: 5,
      user_id: 1
    }
  ]);
};
