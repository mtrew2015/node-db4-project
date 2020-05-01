
exports.up = function(knex) {
    return knex.schema.createTable('ingredients', tbl => {
        tbl.increments();
        tbl.string('name').notNull().unique()
    })
    .createTable('recipes', tbl => {
        tbl.increments(); 
        tbl.string('recipe_name').notNull(); 
    })
    .createTable('steps', tbl => {
        tbl.increments();
        tbl.string('name').notNull().references('id').inTable('recipes').onDelete('CASCADE').onUpdate('CASCADE') 
        tbl.string('instruction').notNull();
        tbl.string('quantity').notNull();
        tbl.integer('order').unsigned().notNull();
    })
    .createTable('joinTable', tbl => {
        tbl.integer('recipesId').references('id').inTable('recipes').onDelete('CASCADE').onUpdate('CASCADE')
        tbl.integer('ingredientsId').references('id').inTable('ingredients').onDelete('RESTRICT').onUpdate('CASCADE')
    })
  
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('recipes')
  .dropTableIfExists('steps')
  .dropTableIfExists('joinTable')
  .dropTableIfExists('ingredients')
};
