exports.up = function (knex) {
    return knex.schema

        .createTable("users", users => {
            users.increments("id")
            users.text("username", 255).notNull().unique()
            users.text("password", 255).notNull()
            users.text("email", 255).notNull()
        })

        .createTable("items", items => {
            items.increments("id")
            items.text("name", 255).notNull()
            items.text("description", 255).notNull()

            items.integer("user_id")
                .notNull()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")

            items.boolean("availability").defaultTo(false)
            items.integer("daily_rate").notNull()
            items.text("condition", 20).notNull()
            items.text("location", 50).notNull()
            items.text("img", 256)
        })
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists("items")
    .dropTableIfExists("users")
};