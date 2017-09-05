#!/bin/sh
/root/wfi/wait-for-it.sh $POSTGRES_HOST:$POSTGRES_PORT -s -t 60  -- /bin/sh /root/run.sh