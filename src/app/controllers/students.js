const { age, date, schooling, graduation } = require("../../lib/utils")
const db = require('../../config/db')
const student = require('../models/student')
const Intl = require("intl")

module.exports = {
    index(req, res) {
        student.all(function (students) {
            return res.render('Students/Students', { students })
        })
    },
    create(req, res) {
        return res.render('Students/create')
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
        student.find(req.params.id, function (student) {
            if (!student) return res.send("student not found!")

            student.date = date(student.date).iso

            return res.render("Students/edit", { student })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
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
