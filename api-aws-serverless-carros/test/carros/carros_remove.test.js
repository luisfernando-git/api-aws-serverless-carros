require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const { ObjectId } = require('mongodb')
const carrosRemove = require('./../../functions/carros/carros_remove')

const collectionCarros = 'carros'

describe('carros/carros_remove.js', () => {
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
      await mongodb(collectionCarros).removeOne({ placa: 'LFG1502' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('valid code carro', async () => {
      const event = {}
      const res = await carrosRemove(event)
      expect(res.statusCode).toBe(400)
    })
    it('remove carro', async () => {
      const event = {
        body: JSON.stringify({
          _id: '5c326feaf8a79d378757bed0'
        })
      }
      const res = await carrosRemove(event)
      expect(res.statusCode).toBe(200)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await carrosRemove()
      expect(res.statusCode).toBe(400)
    })
  })
})
