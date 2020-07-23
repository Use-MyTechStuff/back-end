
exports.seed = function (knex) {
  // Inserts seed entries
  return knex('items').insert([
    {
      id: 1,
      name: "Macbook Pro",
      description: "2018 and 15 inch screen",
      user_id: 1,
      availability: true,
      daily_rate: 15,
      condition: "Good",
      location: "San Francisco",
      img: "https://i.ebayimg.com/images/g/N-IAAOSw5-hcA11v/s-l1600.jpg"
    },
    {
      id: 2,
      name: "Apple iPad",
      description: "9.7 inches",
      user_id: 2,
      availability: true,
      daily_rate: 10,
      condition: "Very Good",
      location: "Chicago",
      img: "https://i.ebayimg.com/images/g/jKkAAOSwjedctSo3/s-l1600.jpg"
    }
  ]);
};
