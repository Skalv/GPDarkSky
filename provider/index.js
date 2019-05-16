'use strict'

const Forecast = require('forecast')
const Database = use('Database')

class DarkSky {
  constructor () {
    console.log("start darksky")
    this.init()
  }

  async init() {
    const config = await Database
      .table('darskyConfig')
      .first()

    if (!config) throw "NoConfigFound"
    
    this.longitude = config.longitude
    this.latitude = config.latitude
    this.forecast = new Forecast({
      service: 'darksky',
      key: config.api_key,
      units: config.units,
      cache: true,      // Cache API requests
      ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 27,
        seconds: 45
      }
    });
  }

  getData () {
    return new Promise((resolve, reject) => {
      this.forecast.get([this.latitude, this.longitude], (err, weather) => {
        if (err) reject(err)
        resolve(weather)
      })
    })
  }

  getTriggers() {
    return {}
  }

  getActions() {
    return {}
  }
}

module.exports = DarkSky