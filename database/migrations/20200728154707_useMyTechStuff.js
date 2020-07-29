exports.up = function (knex) {
    return knex.schema

        .createTable("users", users => {
            users.increments("id")
            users.string("username", 255).notNull().unique()
            users.string("password", 255).notNull()
            users.string("email", 255).notNull()
        })

        .createTable("items", items => {
            items.increments("id")
            items.string("name", 255).notNull()
            items.string("description", 255).notNull()

            items.integer("user_id")
                .notNull()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")

            items.boolean("availability").defaultTo(false)
            items.integer("daily_rate").notNull()
            items.string("condition", 20).notNull()
            items.string("location", 50).notNull()
            items.string("img", 256)
        })
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists("items")
    .dropTableIfExists("users")
};