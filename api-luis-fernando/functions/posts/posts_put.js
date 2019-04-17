const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')

    await mysql.query('update posts set titulo=? imagem=? where id=?', [body.titulo, body.imagem, body.id])
    return util.bind({})
  } catch (error) {
    return util.bind(error)
  }
}