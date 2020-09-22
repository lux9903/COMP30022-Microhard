process.env.NODE_ENV = 'test';

const server = require('../server.js');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const imageController = require('../server/controllers/imageController');

describe('Image', () => {
    var token = '';
    var id = '';

    before(function (done) {
        request(server)
            .post('/api/user/sign-in')
            .send({
                user: {
                    email: 'admin@gmail.com',
                    password: 'admin',
                },
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                token = res.body.token;
                done();
            });
    });

    it('should get all of the user images', () =>
        request(server)
            .get('/api/image')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((r) => {
                expect(r.body.files).to.be.an.an('array');
            }));

});