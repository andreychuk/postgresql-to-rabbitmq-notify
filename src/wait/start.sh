#!/bin/sh
/root/wfi/wait-for-it.sh $RABBIT_HOST:$RABBIT_PORT -s -t 60  -- /bin/sh /root/wait-postgres.sh