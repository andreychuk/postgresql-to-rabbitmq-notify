#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const PS = require('pg-pubsub');
const _ = require('lodash');

const rabbitConnectionString = 'amqp://' + process.env.RABBIT_USER + ':'
  + process.env.RABBIT_PASSWORD + '@' + process.env.RABBIT_HOST + ':'
  + process.env.RABBIT_PORT || 'amqp://guest:guest@rabbitmq';

const cn = {
    host: process.env.POSTGRES_HOST || "postgresql", // server name or IP address;
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE || "test",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "DGH5k39xchgh3Po",
    getConnectionString: function () {
        return 'postgres://' + this.user + ':' + this.password + '@' + this.host + '/' + this.database;
    }
};

const ps = new PS(cn.getConnectionString());

var exchangeList = [];

ps.addChannel('messenger', function(payload){
    amqp.connect(rabbitConnectionString, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertExchange(payload.exchange, 'topic', {durable: false});
            ch.publish(payload.exchange, "", new Buffer(JSON.stringify(payload.data)));
            console.log(" [x] Exchange:  ", payload.exchange);
            console.log(" [x] Messenger: ", payload.data);
        });
    });
});


