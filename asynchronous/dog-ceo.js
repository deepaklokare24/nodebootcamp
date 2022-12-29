const fs = require('fs')
const superagent = require('superagent')

const readfilePromise = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) reject('I could not find that file 😭')
      resolve(data)
    })
  })
}

const writefilePromise = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err.message)
      resolve('Dog breed image is successfully saved to file')
    })
  })
}

let readFilePath = `${__dirname}/dog.txt`
let writeFilePath = `${__dirname}/../txt/dogfile.txt`

readfilePromise(readFilePath)
  .then((breed) => {
    if (breed) {
      console.log(`Breed:: ${breed}`)
      return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`)
    }
  })
  .then((result) => {
    let data = result.body.message
    return writefilePromise(writeFilePath, data)
  })
  .then((result) => {
    console.log('Success !!! 😃', result)
  })
  .catch((error) => {
    console.log('Failure !!! 😢', error)
  })
