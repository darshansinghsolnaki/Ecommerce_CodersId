const server = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe("All User API", () => {

    describe("User Sigup APIs ", () => {

        it("If user provided valid data return signup Successfully message", (done) => {
//             const data = {
//                 fullName : "darshansing",
//                 email : "chetansingh@abcgmail.com",
//                 contact : "8989170056",
//                 password : "darshan98",
//                 confirmpassword : "darshan98",
//             };
//             chai.request(server)
//                 .post("/user/signup")
//                 .send(data)
//                 .end((err, res) => {
//                     res.should.have.status(200),
//                         res.should.be.a('object'),
//                         res.body.should.have.property("status").eq("success"),
//                         res.body.should.have.property("message").eq("User Signup Successfully"),
//                         done()
//                 })
//         }),
//             it("if user alredy exists then rwetun user alredy Exists", (done) => {
//                 const data = {
//                     fullName : "darshansing",
//                     email : "acasdh@gmail.com",
//                     contact : "8989170056",
//                     password : "darshan98",
//                     confirmpassword : "darshan98"
//                 };
//                 chai.request(server)
//                     .post("/user/signup")
//                     .send(data)
//                     .end((err, res) => {
//                         res.should.have.status(403),
//                             res.should.be.a('object'),
//                             res.body.should.have.property("status").eq("Exist"),
//                             res.body.should.have.property("message").eq("User Alredy Exist"),
//                             done()
//                     })
//             }),
//             it("if user password and confirmpassword not match then rwetun Pawword not match ", (done) => {
//                 const data = {
//                     fullName : "darshansing",
//                     email : "darshannn@gmail.com",
//                     contact : "8989170056",
//                     password : "darshan98",
//                     confirmpassword : "darshan999"
//                 };
//                 chai.request(server)
//                     .post("/user/signup")
//                     .send(data)
//                     .end((err, res) => {
//                         res.should.have.status(400),
//                             res.should.be.a('object'),
//                             res.body.should.have.property("status").eq("Failed"),
//                             res.body.should.have.property("message").eq("Password NOT Match"),
//                             done()
//                     })
//             })
    })
//     // describe("User login APIs", () => {

//     // })
})