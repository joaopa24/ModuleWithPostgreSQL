const { age, date, schooling } = require("../utils")
const db = require('../../config/db')
const Intl = require("intl")

module.exports = {
    Students(req, res) {
        return
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
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                res.send("Porfavor, preenchar todos os campos!")
            }
        }
        return
    },
    delete(req, res) {
        return
    }
}
