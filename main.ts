import * as events from 'node:events'

function createFizzBuzzEventEmitter(until: number) {
  const eventEmitter = new events.EventEmitter()

  process.nextTick(() => _emitFizzBuzz(eventEmitter, until))
  return eventEmitter
}

async function _emitFizzBuzz(eventEmitter: events.EventEmitter, until: number) {
  let count = 1

  while (count <= until) {
    await new Promise(resolve => setTimeout(resolve, 100))

    if (count % 15 === 0) {
      eventEmitter.emit('FizzBuzz', count)
    } else if (count % 3 === 0) {
      eventEmitter.emit('Fizz', count)
    } else if (count % 5 === 0) {
      eventEmitter.emit('Buzz', count)
    }
    count += 1
  }

  eventEmitter.emit('end', eventEmitter)
}

function startListener() {
  console.log('start')
}

function fizzListener(count: number) {
  console.log('Fizz', count)
}

function buzzListener(count: number) {
  console.log('Buzz', count)
}

function fizzBuzzListener(count: number) {
  console.log('FizzBuzz', count)
}

function endListener(eventEmitter: events.EventEmitter) {
  console.log('end')
  eventEmitter
    .off('start', startListener)
    .off('Fizz', fizzListener)
    .off('Buzz', buzzListener)
    .off('FizzBuzz', fizzBuzzListener)
    .off('end', endListener)
}

createFizzBuzzEventEmitter(40)
  .on('start', startListener)
  .on('Fizz', fizzListener)
  .on('Buzz', buzzListener)
  .on('FizzBuzz', fizzBuzzListener)
  .on('end', endListener)