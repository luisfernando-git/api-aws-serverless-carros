const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const collectionCarros = 'carros'
const { ObjectId } = require('mongodb')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    if (!body._id) return util.bind(new Error('Digite seu código!'))
    if (!body.placa) return util.bind(new Error('Digite sua placa!'))

    await mongodb.connect()

    const carro = {
        placa: body.placa,
        modelo: body.modelo,
        marca: body.marca,
        cor: body.cor
    } 

    await mongodb(collectionCarros).updateOne(
      {
        _id: ObjectId(body._id)
      },
      {
        $set: carro
      }
    )
    return util.bind({})
  } catch (error) {
    return util.bind(error)
  }
}
