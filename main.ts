const allPromised = Promise.all([
  Promise.resolve('foo'),
  new Promise(resolve => {
    setTimeout(() => {
      resolve('timer')
    }, 1000)
  }).then(result => console.log(result)),
  new Promise(resolve => {
    setTimeout(() => {
      resolve('timer')
    }, 2000)
  }).then(result => console.log(result)),
  // Promise.reject('error')
]).then(() => {
  console.log('end')
}).catch(() => {
  console.error('error')
})
