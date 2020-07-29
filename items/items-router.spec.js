const request = require("supertest")
const server = require("../server")
const db = require("../database/dbConfig")

describe("Items Router", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3RVc2VyXzAxIiwiaWF0IjoxNTk1OTAxMTExLCJleHAiOjE1OTU5ODc1MTF9.FO-zqCyjEChZvV4h3xpxhcjNtkPLvqrE3aqaWIzd4DQ"
    const wrongToken = "This is wrong token"

    it("Tests", () => {
        expect(true).toBe(true)
    })

    it("GET api/items/ - returns status code 401 with wrong token", () => {

        return request(server)
            .get("/api/items")
            .set("Authorization", wrongToken)
            .then(res => {
                expect(res.status).toBe(401)
            })
    })

    describe("POST request to api/items", () => {

        beforeEach(async () => {
            await db("items").truncate();
        })

        it("POST to api/items - returns 201 on success", () => {
            return request(server)
                .post("/api/items/")
                .set("Authorization", token)
                .send({
                    "name": "Samsung",
                    "description": "Does the job",
                    "user_id": 2,
                    "availability": true,
                    "daily_rate": 10,
                    "condition": "Great",
                    "location": "LA"
                })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it("POST to api/items - returns a 401 with wrong token", () => {
            return request(server)
                .post("/api/items/")
                .set("Authorization", wrongToken)
                .send({
                    "name": "Samsung",
                    "description": "Does the job",
                    "user_id": 2,
                    "availability": true,
                    "daily_rate": 10,
                    "condition": "Great",
                    "location": "LA"
                })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

        it("POST to api/items - returns a 500 code if required field is missing", () => {
            return request(server)
                .post("/api/items")
                .set("Authorization", token)
                .send({
                    // "name": "Samsung",
                    "description": "Does the job",
                    "user_id": 2,
                    "availability": true,
                    "daily_rate": 10,
                    "condition": "Great",
                    "location": "LA"
                })
                .then(res => {
                    expect(res.status).toBe(500)
                })
        })
    })

    describe("PUT request to api/items/:id", () => {

        it("PUT to api/items/:id - returns 200 on success", () => {
            return request(server)
                .put("/api/items/1")
                .set("Authorization", token)
                .send({
                    "name": "Apple",
                    "description": "Does not do the job",
                    "user_id": 2,
                    "availability": true,
                    "daily_rate": 20,
                    "condition": "New",
                    "location": "SF"
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("PUT to api/items/:id - returns 401 with wrong token", () => {
            return request(server)
                .put("/api/items/1")
                .set("Authorization", wrongToken)
                .send({
                    "name": "Apple",
                    "description": "Does not do the job",
                    "user_id": 2,
                    "availability": true,
                    "daily_rate": 20,
                    "condition": "New",
                    "location": "SF"
                })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
    })

    describe("DELETE request to - api/items/:id", () => {

        it("DELETE api/items/:id - returns 200 on success", () => {
            return request(server)
                .delete("/api/items/1")
                .set("Authorization", token)
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })

        it("DELETE api/items/:id - returns 401 with wrong token", () => {
            return request(server)
                .delete("/api/items/1")
                .set("Authorization", wrongToken)
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

        it("DELETE api/items/:id - expects a message", () => {
            return request(server)
                .delete("/api/items/1")
                .set("Authorization", token)
                .then(res => {
                    expect(res.text).toBe("{\"message\":\"Item deleted!\"}")
                })
        })
    })
})