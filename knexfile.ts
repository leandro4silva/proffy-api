import path from 'path'

module.exports = {
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'api', 'database', 'database.sqlite')
    }, 
    migrations:{
        directory: path.resolve(__dirname, 'api', 'database', 'migrations')
    },
    useNullAsDefault: true,
}