const withTimeout = (promises: Promise<unknown>[], timer: number) => {
  return Promise.race([
    ...promises,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout'))
      }, timer) 
    })
  ]).then(result => {
    console.log(result)
  }).catch(err => {
    console.error(err)
  })
}

const promises = [
  new Promise<string>(resolve => setTimeout(() => resolve('do'), 2000)),
  new Promise<number>(resolve => setTimeout(() => resolve(10), 2000)),
]

withTimeout(promises, 2000)
