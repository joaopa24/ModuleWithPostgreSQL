module.exports = {
    age(timestamp) {
        const today = new Date
        const birth = new Date(timestamp)
        const month = today.getMonth() - birth.getMonth()

        let age = today.getFullYear() - birth.getFullYear()

        if (month < 0 || month == 0 && today.getDate() - birth.getDate < 0) {
            age = age - 1
        }

        return age
    },
    date(timestamp) { 
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        
        return {
            day,
            month,
            year,
            iso:`${year}-${month}-${day}`,
            birthday:`${day}/${month}`
        }
    },
    graduation(value){
        if(value == "Medio"){
            let graduation = "Ensino Médio Completo"
            return graduation
        }
        if(value == "Superior"){
            let graduation = "Ensino Superior Completo"
            return graduation
        }
        if(value == "Mestre"){
            let graduation = "Mestrado"
            return graduation
        }
        if(value == "Doutor"){
            let graduation = "Doutorado"
            return graduation
        }
    },
    schooling(value){
        switch(value){
            case("5EF"): return("5º Ano do Ensino Fundamental");
            case("6EF"): return("6º Ano do Ensino Fundamental");
            case("7EF"): return("7º Ano do Ensino Fundamental");
            case("8EF"): return("8º Ano do Ensino Fundamental");
            case("9EF"): return("9º Ano do Ensino Fundamental");
            case("1EM"): return("1º Ano do Ensino Médio");
            case("2EM"): return("2º Ano do Ensino Médio");
            case("3EM"): return("3º Ano do Ensino Médio");
        }
    }
}