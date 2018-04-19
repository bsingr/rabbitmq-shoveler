# RabbitMQ Shoveler

Shovels messages from a rabbitmq queue to an exchange

## Requirements

- [nodejs](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com)

## Installation

    git clone https://github.com/bsingr/rabbitmq-shoveler.git
    cd rabbitmq-shoveler
    npm install

## Usage

    node shovel.js "amqp://<user>:<pass>@<from-address>:5672" <from-queue> "amqp://<user>:<pass>@<to-address>:5672" <to-exchange> <to-exchange-type> <to-routing-key>
