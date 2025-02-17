import request from "supertest";
import server from "../server";
import { json } from "sequelize";

describe('GET /api/message', () => {
    test('should be a json response', async () => {
        const res = await request(server).get('/api/message')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')
        //lo que no debe pasar.
        expect(res.status).not.toBe(404)
    })
})
