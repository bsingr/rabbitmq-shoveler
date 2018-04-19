const subscribeToQueue = require('./subscribeToQueue')
const publishToExchange = require('./publishToExchange')

const fromConnectionUrl = process.argv[2]
const fromQueue = process.argv[3]
const toConnectionUrl = process.argv[4]
const toExchange = process.argv[5]
const toRoutingKey = process.argv[6]

console.log(process.argv)

if (process.argv.length !== 8) {
  console.log('node shovel.js "amqp://<user>:<pass>@<from-address>:5672" <from-queue> "amqp://<user>:<pass>@<to-address>:5672" <to-exchange> <to-exchange-type> <to-routing-key>')
  process.exit(1)
}

const {
  unsubscribe,
  onMessage
} = subscribeToQueue(fromConnectionUrl, 1, fromQueue)

const publish = publishToExchange(toConnectionUrl, toExchange, toRoutingKey)

onMessage(({msg, ack, nack}) => {
  publish(msg.content)
    .then(() => {
      console.log('published')
      ack()
    })
    .catch((err) => {
      console.error(err)
      nack()
    })
})