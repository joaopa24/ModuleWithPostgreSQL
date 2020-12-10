const { age, date, schooling } = require("../../lib/utils")
const db = require('../../config/db')
const teacher = require('../models/teacher')
const Intl = require("intl")

module.exports = {
    index(req, res) {
        teacher.all(function(teachers){
            return res.render('Teachers/Teachers', { teachers })
        })
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
        
        teacher.create(req.body, function(teacher){
            return res.redirect(`/Teachers`)
        })
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        return
    },
    delete(req, res) {
        return
    }
}
