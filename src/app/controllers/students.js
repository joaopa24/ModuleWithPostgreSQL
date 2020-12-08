const { age, date, schooling } = require("../../lib/utils")
const db = require('../../config/db')
const Intl = require("intl")

module.exports = {
    index(req, res) {
        return res.render('Students/Students')
    },
    create(req, res) {
        return
    },
    post(req, res) {
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
