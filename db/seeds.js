const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  // Careful with .remove() -- it sends a command directly to the database
  // and skips any mongoose validations
  await User.deleteMany() // Deletes all records
  return User.create([
    {
      email: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'Jonh',
      last_name: 'Smith',
      admin: false,
      average: 80,
      assignments: [
        {
          title: 'HTML/CSS',
          project_description: 'HTML, CSS and some JS',
          project_link: 'http://www.google.com/',
          score: 85,
          base: 100
        }
      ]
    },
    {
      email: 'admin@email.com',
      password: bcrypt.hashSync('password', 10),
      first_name: 'Admin',
      last_name: 'Administrator',
      admin: true
    }  
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
