const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    
    if (event.pathParameters && event.pathParameters.id) {
      const curtidas = await mysql.query('select id, id_posts, id_usuarios, dataHora from curtidas where id=?', [event.pathParameters.id])
      return util.bind(curtidas.length ? curtidas[0] : {})
    }

    const curtidas = await mysql.query('select id, id_posts, id_usuarios, dataHora from curtidas')
    return util.bind(curtidas)
  } catch (error) {
    return util.bind(error)
  }
}
