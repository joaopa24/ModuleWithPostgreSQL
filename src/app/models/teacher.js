const db = require('../../config/db')
const { age, date, schooling } = require("../../lib/utils")

module.exports = {
    all(callback){
    db.query(`SELECT * FROM teachers`, function(err,results){
        if (err) throw `Database Error ${err}`

        callback(results.rows)
    })  
    },
    create(data, callback){
        const query =  `
        INSERT INTO teachers (
         avatar_url,
         name,
         birth_date,
         education_level,
         class_type,
         subjects_taught,
         created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `
    const values = [
        data.avatar_url,
        data.name,
        date(data.birth_date).iso,
        schooling(data.education_level),
        data.class_type,
        data.subjects_taught,
        date(Date.now()).iso
    ]

    db.query(query, values, function(err , results){
        if (err) throw `Database Error ${err}`

        callback(results.rows[0])
    })
    
    },
    find(id, callback){

    },
    update(data, callback){

    },
    delete(id, callback){

    }
}