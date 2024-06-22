// const server = require('../index')
// const chai = require('chai')
// const chaiHttp = require('chai-http')

// chai.should()
// chai.use(chaiHttp)

// describe("All User API", () => {

//     describe("User Sigup APIs ", () => {

//         it("If user provided valid data return signup Successfully message", (done) => {
//             const data = {
//                 email: "sandipp@abcgmail.com",
//                 password: "darshan98",
//                 confirmpassword: "darshan98",
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
//         })

//     })
// })