
exports.seed = function (knex) {
  return knex('users').insert([
    {
      // Password is 123 (hashed)
      id: 1, username: "testUser_01",
      password: "$2a$10$06O4kv2CcsBOKYj2im5wneQGH4GcLvnz.uBLTqkPPHx5Iqu8afhWi",
      email: "testUser_01@mail.com"
    },
    {
      // Password is 123 (hashed)
      id: 2, username: "testUser_02",
      password: "$2a$10$06O4kv2CcsBOKYj2im5wneQGH4GcLvnz.uBLTqkPPHx5Iqu8afhWi",
      email: "testUser_01@mail.com"
    }
  ]);
};
