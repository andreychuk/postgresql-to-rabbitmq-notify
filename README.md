# postgresql-to-rabbitmq-notify

## How to use

    postgres=# SELECT pg_notify('messenger', json_message);
     pg_notify
     -----------
    
     (1 row)

## Message data structure
    
    RabbitMq Type: topic
      
    Message data:
    {
        "exchange" - Exchange name
        "type" - Exchange type
        "options" - Exchange options
        "headers" - message headers
        "data" - Document object
         
    }     

## Environment Variables

    - POSTGRES_PASSWORD - postresql db password
    - POSTGRES_USER - postgresql db user
    - POSTGRES_DATABASE - postgresql db name
    - POSTGRES_HOST - postgresql host
    - POSTGRES_PORT- postgresql port
    - RABBIT_HOST - rabbitmq host
    - RABBIT_PORT - rabbitmq post
    - RABBIT_USER - rabbitmq user
    - RABBIT_PASSWORD - rabbitmq password
 