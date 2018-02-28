const axios = require('axios')

module.exports = {
    generateId: () => {
        // localStorage.removeItem("generatedId")
        if(localStorage.getItem("generatedId")){
            axios.post('/api/generatedId', {generatedId: localStorage.getItem("generatedId")})
        } else {
            var generatedId = Math.floor((Math.random() * 100000) + 1) + Math.floor((Math.random() * 100000) + 1)
            localStorage.setItem('generatedId', generatedId)
            axios.post('/api/generatedId', {generateId: localStorage.getItem("generatedId")})
        }
    }, 
    isEmail: (input) => {
        if(input.includes('@') && input.includes('.')){
            return 'valid email'
        } else {
            return 'invalid email'
        }
    }
}