const chai = require('chai');
const request = require('supertest');
const user = require('./fixtures/user.json');
const app = require('../src/config/server/server').default;
const UserModel = require('../src/modules/user/user.model').default;
chai.should();

/**
 * API tests
 */
describe('API', () => {

    it('login to app', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');
                global.token = res.body.token;
            })
            .end(done);
    });

    it('get all users', (done) => {
        request(app)
            .get('/api/v1/users')
            .set('x-access-token', global.token)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
            })
            .end(done);
    });

    it('create new user', (done) => {
        const newUser = {
            email: 'new.user@gmail.com',
            name: 'John Doe'
        };

        request(app)
            .post('/api/v1/users')
            .send(newUser)
            .set('x-access-token', global.token)
            .expect((res) => {
                res.status.should.equal(201);
                res.body.should.have.property('email');
            })
            .end(done);
    });
});

/**
 * clear database after tests
 */
afterAll(async () => {
    try {
        await UserModel.collection.drop();
    } catch (error) {
        console.log('Something went wrong after tests, seems your database doesnt cleaned');
    }
});
