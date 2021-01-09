const { age, date, schooling, graduation } = require("../../lib/utils")
const student = require('../models/student')
const Intl = require("intl")

module.exports = {
    index(req, res) {
        let { filter , page , limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page, 
            limit,
            offset,
            callback(students){
                const pagination = {
                    total: Math.ceil(students[0].total/ limit),
                    page
                }
                return res.render('Students/Students', { students , filter, pagination })
            }
        }
        student.paginate(params)
    },
    create(req, res) {
        student.StudentOptions(function (options) {
            return res.render('Students/create', { TeacherOptions: options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                res.send("Porfavor, preenchar todos os campos!")
            }
        }

        student.create(req.body, function (student) {
            return res.redirect(`/Students/${student.id}`)
        })
    },
    show(req, res) {
        student.find(req.params.id, function (student) {
            if (!student) return res.send("student not found!")

            student.age = age(student.date)
            student.birthday = date(student.date).birthday
            student.year = schooling(student.grade)


            return res.render("Students/show", { student })
        })
    },
    edit(req, res) {
        student.find(req.params.id, function (students) {
            if (!students) return res.send("student not found!")

            students.date = date(students.date).iso
            console.log(students.id)
            student.StudentOptions(function(options){
                return res.render('Students/edit', { students , TeacherOptions: options })
            })
        })
        
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        console.log(keys)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("porfavor preencha todos os campos")    
            }
        }
        student.update(req.body, function () {
            return res.redirect(`/Students/${req.body.id}`)
        })
    },
    delete(req, res) {
        student.delete(req.body.id, function () {
            return res.redirect("/Students")
        })
    }
}
