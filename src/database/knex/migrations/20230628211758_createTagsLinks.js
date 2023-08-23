exports.up = knex => knex.schema.createTable("tagsLinks", table => {
  table.increments("id").primary();
  table.text("url").notNullable();

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");

  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("tagsLinks");