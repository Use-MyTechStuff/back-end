const request = require("supertest")
const server = require("../server")
const db = require("../database/dbConfig")

describe("root", () => {
    test("test should begin", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });
})

describe("Register functionality", () => {
    beforeEach(async () => {
        await db("users").truncate();
    })

    it("POST api/users/register - should return status 201", function () {
        return request(server)
            .post("/api/users/register")
            .send({ username: "user_03", password: "pass_03", email: "user_03@mail.com" })
            .then(res => {
                expect(res.status).toBe(201);
            })
    })

    it("POST /auth/register - res.type should match json", function () {
        return request(server)
            .post("/api/users/register")
            .send({ username: "user_03", password: "pass_03", email: "user_03@mail.com" })
            .then(res => {

                expect(res.type).toMatch(/json/i);
            })
    })

    it("POST /auth/register - returns 500", () => {
        return request(server)
            .post("/api/users/register")
            .send({
                "username": "user_03",
                "password": "pass_)3"
            })
            .then(res => {
                expect(res.status).toBe(500);
            })
    })

    describe("Login functionality", () => {

        it("POST api/users/login - res.type should match json", function () {
            return request(server)
                .post("/api/users/login")
                .send({ username: "user_03", password: "pass_03" })
                .then(res => {

                    expect(res.type).toMatch(/json/i);
                })
        })

        it("POST api/users/login - returns 401", function () {
            return request(server).post("/api/users/login")
                .send({ username: "user_03", password: "pass_03" })
                .then(res => {
                    expect(res.status).toBe(401);
                })
        })
    })

    describe("Creating item for user", () => {
        beforeEach(async () => {
            await db("users").truncate();
        })
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3RVc2VyXzAxIiwiaWF0IjoxNTk1OTAxMTExLCJleHAiOjE1OTU5ODc1MTF9.FO-zqCyjEChZvV4h3xpxhcjNtkPLvqrE3aqaWIzd4DQ"
        const wrongToken = "you thought"

        it("POST /api/users/:id/items - should return status  500", async () => {
            const res = await request(server)
                .post("/api/users/:id/items")
                .set("Authorization", token)
                .send({ username: "user_03", password: "pass_03" });

            expect(res.status).toBe(500);
        });

        it("POST /api/users/:id/items - should ask for a valid token", async () => {
            const res = await request(server)
                .post("/api/users/:id/items")
                .set("Authorization", wrongToken)
                .send({
                    name: "Mixing Table",
                    description: "I call it the mixer",
                    availability: 1,
                    daily_rate: 62,
                    condition: "Good",
                    location: "SF",
                    imgs: ""
                })

            expect(res.status).toBe(401);
        });

        it("POST /api/users/:id/items - should return 500", async () => {
            const res = await request(server)
                .post("/api/users/:id/items")
                .set("Authorization", token)
                .send({
                    name: "Mixing Table",
                    description: "I call it the mixer",
                    availability: 1,
                    daily_rate: 62,
                    condition: "Good",
                    location: "SF",
                    imgs: ""
                });

            expect(res.status).toBe(500);
        });
    });

    describe("Delete user", () => {
        beforeEach(async () => {
            await db("users").truncate();
        })
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3RVc2VyXzAxIiwiaWF0IjoxNTk1OTAxMTExLCJleHAiOjE1OTU5ODc1MTF9.FO-zqCyjEChZvV4h3xpxhcjNtkPLvqrE3aqaWIzd4DQ"
        const wrongToken = "you thought"

        it("DELETE /api/users/:id - returns invaild Token", async () => {
            const res = await request(server)
                .delete("/api/users/:id")
                .set("Authorization", wrongToken)

            expect(res.status).toBe(401);
        });

        it("/api/users/:id - delete successful", async () => {
            const res = await request(server)
                .delete("/api/users/:id")
                .set("Authorization", token)

            expect(res.status).toBe(200);
        });

    });

    describe("Get User by ID", () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3RVc2VyXzAxIiwiaWF0IjoxNTk1OTAxMTExLCJleHAiOjE1OTU5ODc1MTF9.FO-zqCyjEChZvV4h3xpxhcjNtkPLvqrE3aqaWIzd4DQ"
        const wrongToken = "you thought"

        it("GET /api/users/:id - returns invalid Token", async () => {
            const res = await request(server)
                .get("/api/users/:id")
                .set("Authorization", wrongToken)

            expect(res.status).toBe(401);
        });

        it("GET /api/users/:id - returns valid Token", async () => {
            const res = await request(server)
                .get("/api/users/:id")
                .set("Authorization", token)

            expect(res.status).toBe(200);
        });
    })

});