require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const { ObjectId } = require('mongodb')
const carrosPut = require('./../../functions/carros/carros_put')

const collectionCarros = 'carros'

describe('carros/carros_put.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionCarros).insertOne({ placa: 'LFG1502', _id: ObjectId('5c326feaf8a79d378757bed0') })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionCarros).removeOne({ email: 'LFG1502' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('update carro', async () => {
      const event = {
        body: JSON.stringify({
            _id: '5c326feaf8a79d378757bed0',
            placa: 'LFG1502',
            modelo: 'GOL',
            marca: 'Volkswagen',
            cor: 'Preto'
        })
      }
      const res = await carrosPut(event)
      expect(res.statusCode).toBe(200)
    })
    it('valid code carro', async () => {
      const event = {}
      const res = await carrosPut(event)
      expect(res.statusCode).toBe(400)
    })
    it('valid placa carro', async () => {
      const event = {
        body: JSON.stringify({
          _id: '5c326feaf8a79d378757bed0'
        })
      }
      const res = await carrosPut(event)
      expect(res.statusCode).toBe(400)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await carrosPut()
      expect(res.statusCode).toBe(400)
    })
  })
})
