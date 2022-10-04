const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('thoughts', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Connected to mySQL!')
}catch(err){
    console.log(`Nao foi possivel conectar: ${err}`)
}

module.exports = sequelize