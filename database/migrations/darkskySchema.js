'use strict'

const Schema = use('Schema')

class DarkSkySchema extends Schema {
  up () {
    this.create('darskyConfig', (table) => {
      table.increments()
      table.timestamps()
      table.string('api_key').notNullable()
      table.integer('latitude').notNullable()
      table.integer('longitude').notNullable()
      table.string('units').defaultTo('celcius')
      table.enu('mode', ["hourly", "daily"]).notNullable()
    })
  }

  down () {
    this.drop('darskyConfig')
  }
}

module.exports = DarkSkySchema