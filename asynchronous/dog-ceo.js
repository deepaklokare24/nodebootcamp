const fs = require('fs')
const superagent = require('superagent')

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, breed) => {
  console.log('dog breed is ', breed)

  if (breed) {
    superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`).end((err, dogImage) => {
      console.log(dogImage.body.message)

      fs.writeFile(`${__dirname}/../txt/dogfile.txt`, dogImage.body.message, (err) => {
        if (err) return console.log(err.message)

        console.log('Dog breed image is successfully saved to file')
      })
    })
  }
})
