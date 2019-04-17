const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    
    if (event.pathParameters && event.pathParameters.id) {
      const logs = await mysql.query('select id, log, dataHora from logs where id_usuarios=?', [event.pathParameters.id])
      return util.bind(logs.length ? logs[0] : {})
    }

    const logs = await mysql.query('select id, log, dataHora from logs')
    return util.bind(logs)
  } catch (error) {
    return util.bind(error)
  }
}
