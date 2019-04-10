require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const carrosPost = require('./../../functions/carros/carros_post')

const collectionCarros = 'carros'

describe('carros/carros_post.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionCarros).insertOne({ placa: 'ABC1234' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionCarros).removeOne({ placa: 'ABC1234' })
      await mongodb(collectionCarros).removeOne({ placa: 'LFG1502' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('valid carro', async () => {
      const event = {
        body: JSON.stringify({
            placa: 'carro test placa'
        })
      }
      const res = await carrosPost(event)
      expect(res.statusCode).toBe(400)
    })
    it('should add a new carro', async () => {
      const event = {
        body: JSON.stringify({
            placa: 'LFG1502',
            modelo: 'Gol',
            marca: 'Volkswagen',
            cor: 'Preto'
        })
      }
      const res = await carrosPost(event)
      expect(res.statusCode).toBe(200)
    })
    it('should test placa', async () => {
      const event = {
        body: JSON.stringify({
          placa: 'ABC1234',
          modelo: 'HRV',
          marca: 'Honda',
          cor: 'Prata'
        })
      }
      const res = await carrosPost(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(400)
      expect(body).toHaveProperty('errorMessage')
    })
  })
  describe('Should fail', () => {
    it('should return an error body not send', async () => {
      const res = await carrosPost()
      expect(res.statusCode).toBe(400)
    })
    it('should return valid carro empty', async () => {
      const res = await carrosPost({ body: '' })
      expect(res.statusCode).toBe(400)
    })
  })
})
