const db = require('../../config/db')
const { age, date, schooling } = require("../../lib/utils")

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students`, function (err, results) {
            if (err) throw `Database Error ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO students (
         avatar_url,
         name,
         date,
         email,
         grade,
         charge,
         created_at,
         teacher_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    `
        const values = [
            data.avatar_url,
            data.name,
            date(data.date).iso,
            data.email,
            data.grade,
            data.charge,
            date(Date.now()).iso,
            data.teacher
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback) {
        db.query(`SELECT students.*, teachers.name AS teacher_name
        FROM students 
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`, [id], function (err, results) {
            if (err) throw `Database Error ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
        UPDATE students SET 
        avatar_url=($1),
        name=($2),
        date=($3),
        email=($4),
        grade=($5),
        charge=($6),
        teacher_id=($7)
        WHERE id = $8
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.date).iso,
            data.email,
            data.grade,
            data.charge,
            data.teacher,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database Error ${err}`

            return callback()
        })
    },
    StudentOptions(callback){
        db.query(`SELECT name, id FROM teachers`, function(err , results){
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })
    },
    paginate(params){
        const { filter , limit , offset , callback } = params

        let query = ""
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM students
            ) AS total`
        
        if(filter){
            filterQuery = `${query}
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'
            `
            
            totalQuery = `(
                SELECT count(*) FROM students
                ${filterQuery}
                ) as total`
        }

        query = `
        SELECT students.*,${totalQuery}
        FROM students
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query,[limit, offset], function (err, results){
            if(err) throw 'Database Error'

            callback(results.rows)
        })
    }
}
/* Não sei pq mas o charge, quando escrito "Charge" na coluna do postbird , da um erro
aparentemente sempre da erro se a coluna for escrita com letra maiuscula na primeira letra
Pesquisar mais sobre a syntax das colunas */