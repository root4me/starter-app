process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
var request = require('supertest');
var expect = chai.expect;
chai.use(chaiHttp);

describe('Default route', function () {

    describe('Get /', () => {
        it('Get alive status', (done) => {
            request("http://localhost:3000")
                .get("/")
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.status).eq("alive");
                    done();
                });
        });
    });

    describe('Post /', () => {
        it('Post default', (done) => {
            request("http://localhost:3000")
                .post("/")
                .send({
                    id: 1
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body.id).eq(1);
                    done();
                });
        })
    });

});