import  request  from "supertest";
import server from "../../server";

describe('Post /api/products', () => {
    test('It should display validation errors', async () => {
        const response = await request(server).post('/api/createProduct').send({})
        expect(response.status).toBe(400)
    })

    test('should create a new product', async () => {
        const response = await request(server).post('/api/createProduct').send({
            "name": "p3",
            "price": 550
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        //ahora tocarian los que no deben
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })

    test('price must be > 0', async () => {
        const response = await request(server).post('/api/createProduct').send({
            "name": "p3aa",
            "price": -50
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1) //solo deberia tener un error, porque el nombre si lo hemos pasado correctamente
    })

    test('price must be an integer', async () => {
        const response = await request(server).post('/api/createProduct').send({
            "name": "p3aa",
            "price": "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2) //ahora deberia lanzarnos dos errores.
    })
})

describe('GET /getProducts', () => {
    test('should check the /api/getProducts url exists', async () => {
        const response = await request(server).get('/api/getProducts')
        expect(response.status).not.toBe(404)
    })

    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/getProducts')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })
})

// describe('GET /api/products/:id', () => {
//     test('Should return 404 if the product does not exist', async () =>{
//         const productId = 2000
//         const response = await request(server).get(`/api/products/${productId}`)
//         expect(response.status).toBe(400)
//         expect(response.body).toHaveProperty('errors')
//     })

//     test('should check a valid ID in the URL', async () =>{
//         const response = await request(server).get('/api/products/messi')
//         expect(response.status).toBe(400)
//         expect(response.body).toHaveProperty('errors')
//         expect(response.body.errors).toHaveLength(1)
//     })
// })

// describe('PUT /api/updateProduct/:id', () => {
//     test('should display validation error', async () => {
//         const response = await request(server).put('/api/products/1').send({})
//         expect(response.status).toBe(404)
//         expect(response.body).toHaveProperty('errors')
//         expect(response.body.errors).toBeTruthy()
//         expect(response.body.errors).toHaveLength(5)

//         expect(response.body).not.toHaveProperty('data')
//     })
// })