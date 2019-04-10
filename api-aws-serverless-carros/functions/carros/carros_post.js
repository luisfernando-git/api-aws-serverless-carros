const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const collectionCarros = 'carros'

module.exports = async (event) => {
  try {
      const body = JSON.parse(event.body || '{}')
      if (!body.placa) return util.bind(new Error('Insira a placa!'))
      if (!body.modelo) return util.bind(new Error('Insira o modelo!'))
      if (!body.marca) return util.bind(new Error('Insira a marca!'))
      if (!body.cor) return util.bind(new Error('Insira a cor!'))

      await mongodb.connect()

      const checkCarroExistente = await mongodb(collectionCarros).findOne({ placa: body.placa })
      if (checkCarroExistente) return util.bind(new Error('Já existe um carro com essa placa!'))

      const carro = {
          placa: body.placa,
          modelo: body.modelo,
          marca: body.marca,
          cor: body.cor
      }

      await mongodb(collectionCarros).insertOne(carro)
      return util.bind({})
  } catch (error) {
      return util.bind(error)
  }
}
