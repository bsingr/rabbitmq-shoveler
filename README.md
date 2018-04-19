# Shoveler

Copies messages from a rabbitmq queue to an exchange

    node shovel.js "amqp://<user>:<pass>@<from-address>:5672" <from-queue> "amqp://<user>:<pass>@<to-address>:5672" <to-exchange> <to-exchange-type> <to-routing-key>