const amqplib = require('amqplib');

// returns a subscription object with functions:
// - unsubscribe()
// - onMessage(callback) => Promise
module.exports = (amqpConnectionUrl, amqpPrefetchCount, queue) => {
  const connection = amqplib.connect(amqpConnectionUrl);
  const unsubscribe = () => connection.then(conn => conn.close());
  const onMessage = callback => connection
    .then(conn => conn
      .createChannel()
      .then(ch => {
        ch.prefetch(amqpPrefetchCount);
        ch.consume(queue, msg => {
          console.log('consume message');
          const ack = () => {
            console.log('ack');
            ch.ack(msg);
          };
          const nack = (upToAll, requeue) => { 
            console.log(`nack upToAll=${upToAll} requeue=${requeue}`); 
            ch.nack(msg, upToAll, requeue); 
          };
          callback({
            msg,
            ack,
            nack
          });
        });
      })
    );
  return {
    unsubscribe,
    onMessage
  };
};
