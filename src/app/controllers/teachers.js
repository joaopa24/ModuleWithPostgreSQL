const { age, date, schooling, graduation } = require("../../lib/utils")
const db = require('../../config/db')
const teacher = require('../models/teacher')
const Intl = require("intl")

module.exports = {
    index(req, res) {
        const { filter } = req.query

        if(filter){
            teacher.findBy(filter,function(teachers){
                return res.render('Teachers/Teachers', {  filter , teachers })
            })
        }
        else{
            teacher.all(function(teachers){
                return res.render('Teachers/Teachers', { teachers })
            })
        }
    },
    create(req, res) {
        return res.render('Teachers/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                res.send("Porfavor, preenchar todos os campos!")
            }
        }

        teacher.create(req.body, function (teacher) {
            return res.redirect(`/Teachers/${teacher.id}`)
        })
    },
    show(req, res) {
        teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("teacher not found!")

            teacher.age = age(teacher.birth_date)
            teacher.level = graduation(teacher.education_level)
            teacher.type = teacher.class_type
            teacher.subjects = teacher.subjects_taught.split(",")
            teacher.created_at = date(teacher.created_at).format

            return res.render("Teachers/show", { teacher })
        })
    },
    edit(req, res) {
        teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("teacher not found!")

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render("Teachers/edit", { teacher })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("porfavor preencha todos os campos")
            }
        }

        teacher.update(req.body, function () {
            return res.redirect(`/Teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        teacher.delete(req.body.id, function () {
            return res.redirect("/Teachers")
        })
    }
}
