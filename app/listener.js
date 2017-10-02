#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const PS = require('pg-pubsub');

const rabbitConnectionString = 'amqp://' + process.env.RABBIT_USER + ':'
  + process.env.RABBIT_PASSWORD + '@' + process.env.RABBIT_HOST + ':'
  + process.env.RABBIT_PORT;

const cn = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    getConnectionString: function () {
        return 'postgres://' + this.user + ':' + this.password + '@' + this.host + ':' + this.port + '/' + this.database;
    }
};

const ps = new PS(cn.getConnectionString());
try {
  ps.addChannel('messenger', function (payload) {
    amqp.connect(rabbitConnectionString, function (err, conn) {
      conn.createChannel(function (err, ch) {
        ch.assertExchange(payload.exchange, payload.type, payload.options);
        var ops = {};
        if (payload.headers) {
          ops = {headers: payload.headers}
        }
        ch.publish(payload.exchange, "", new Buffer(JSON.stringify(payload.data)), ops);
        console.log(" [x] Exchange:  ", payload.exchange);
        console.log(" [x] Data:      ", payload.data);
        console.log(" -------------- ");
      });
    });
  });
} catch (e) {
    console.error(e.message);
}