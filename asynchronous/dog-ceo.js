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

// readfilePromise(readFilePath)
//   .then((breed) => {
//     if (breed) {
//       console.log(`Breed:: ${breed}`)
//       return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`)
//     }
//   })
//   .then((result) => {
//     let data = result.body.message
//     return writefilePromise(writeFilePath, data)
//   })
//   .then((result) => {
//     console.log('Success !!! 😃', result)
//   })
//   .catch((error) => {
//     console.log('Failure !!! 😢', error)
//   })

const getDogpic = async () => {
  try {
    const breed = await readfilePromise(readFilePath)
    const image1 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`)
    const image2 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`)
    const image3 = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`)

    const allImages = await Promise.all([image1, image2, image3])
    const body = allImages.map((item) => item.body.message)
    console.log(body)
    const result = await writefilePromise(writeFilePath, body.join('\n'))
    console.log(result)
  } catch (err) {
    throw err
  }
  return '2. Ready 🐶'
}

// console.log('1. will get dog pic')
// getDogpic().then((result) => {
//   console.log(result)
//   console.log('3. Done with getting dog pics')
// })

;(async () => {
  try {
    console.log('1. will get dog pic')
    const result = await getDogpic()
    console.log(result)
    console.log('3. Done with getting dog pics')
  } catch (err) {
    console.log(err.message)
  }
})()
