const { age, date, schooling } = require("../../lib/utils")
const db = require('../../config/db')
const Intl = require("intl")

module.exports = {
    index(req, res) {
        return res.render('Teachers/Teachers')
    },
    create(req, res) {
        return
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                res.send("Porfavor, preenchar todos os campos!")
            }
        }

        const query =  `
            INSERT INTO teachers (
             name,
             avatar_url,
             birth_date,
             education_level,
             class_type,
             subjects_taught
             created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            
        ]

        return
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
