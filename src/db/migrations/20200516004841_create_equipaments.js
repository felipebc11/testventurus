exports.up = function(knex) {
  return knex.schema.createTable('equipments', (table)=>{
    table.string('id').primary();
    table.string('model').notNullable();
    table.enu('category',['cartridge', 'toner']).notNullable();
    table.integer('ppm');
    table.boolean('wifi');
    table.bigInteger('consumption');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('equipments');
};