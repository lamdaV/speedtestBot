# Speedtest Bot
A simple bot that runs a SpeedTest and logs the part of the results.
It was inspired by the [Comcast Twitter Bot](https://arstechnica.com/information-technology/2016/02/comcast-customer-made-bot-that-tweets-at-comcast-when-internet-is-slow/)

# Motivation
Do you pay your ISP buckets of money only to get a fraction of what was advertised?
I wanted to see how often I was getting below average speeds. Turns out, 100% of
the time was I getting 30% of the advertised speed despite having a strong connection
to the router. About 35% of the logs, were errors revolving around router/modem
failures that were assured by the 8 different ATT Uverse's Technician to be resolved
and the previous Technician was incompetent.

# Description
It is a simple bot that will run a speed test once an hour. It will log the
following basic information: download speed (Mbps), location, ping (ms), and sponsor.

It uses bunyan rotational log files. To get into a readable form, you will have
to run the following:
```
yarn start
```

All logs will be written in `logs` directory of the repository named `speedtest.log`
followed by a number. These are rotational logs. 3 log files will be created before
it rotates. In addition, logs will be displayed in their short form in the standard output.
For the most part, the logs will be `info` logs; however, there are `error` logs
written if a speed test failed to connect or for other reasons.
