exports.up = function (knex) {
  return knex.schema.createTable("task", (table) => {
    table.increments("id").primary();
    table.string("name", 150).notNullable();
    table.string("description", 255).notNullable();
    table.boolean("completed").defaultTo(false);
    table
      .integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("task");
};
