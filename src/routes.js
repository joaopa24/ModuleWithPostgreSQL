const express = require('express')
const routes = express.Router()
const Teachers = require('./app/controllers/teachers')
const Students = require('./app/controllers/students')


routes.get("/", function(req,res){
    return res.redirect("/Teachers")
})

routes.get("/Teachers", Teachers.Teachers)
routes.get("/Teachers/create",Teachers.create)
routes.get("/Teachers/:id" , Teachers.show)
routes.get("/Teachers/:id/edit", Teachers.edit)
routes.put("/Teachers" , Teachers.put)
routes.post("/Teachers", Teachers.post)
routes.delete("/Teachers" , Teachers.delete)


routes.get("/Students", Students.Students)
routes.get("/Students/create",Students.create)
routes.get("/Students/:id" , Students.show)
routes.get("/Students/:id/edit", Students.edit)
routes.put("/Students" , Students.put)
routes.post("/Students", Students.post)
routes.delete("/Students" , Students.delete)

module.exports = routes 