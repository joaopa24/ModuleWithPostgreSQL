const { age, date, schooling } = require("../utils")
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
