
const amqplib = require('amqplib');

// returns promise that resolves when message was published
module.exports = (amqpConnectionUrl, exchange, exchangeType, routingKey) => message => amqplib
  .connect(amqpConnectionUrl)
  .then(connection => connection
    .createChannel()
    .then(channel => channel
      .assertExchange(exchange, exchangeType)
      .then(() => channel.publish(exchange, routingKey, message))
      .then(() => channel.close())
    )
    // close connection - if left out -> will block rabbitMQ-resources or file-handles
    .finally(() => connection.close())
  );
