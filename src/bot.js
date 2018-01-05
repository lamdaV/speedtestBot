const speedTest = require("speedtest-net");
const bunyan = require("bunyan");
const path = require("path");
const schedule = require("node-schedule");

const loggerOptions = {
  name: "speedtest",
  streams: [
    {
      level: "info",
      stream: process.stdout
    },
    {
      type: "rotating-file",
      path: path.join(path.dirname(__dirname), "logs", "speedtest.log"),
      period: "1d",
      count: 3
    }
  ]
};
const logger = bunyan.createLogger(loggerOptions);

let rule = new schedule.RecurrenceRule();
// Run everyday on the hour.
rule.minute = 0;

let job = schedule.scheduleJob(rule, () => {
  const testerOptions = {maxTime: 5000};
  const tester = speedTest(testerOptions);

  tester.on("error", (error) => {
    logger.error(error);
  });

  tester.on("data", (data) => {
    const downloadSpeed = data.speeds.download;
    const testServerLocation = data.server.location;
    const testServerPingTime = data.server.ping;
    const testServerSponsor = data.server.sponsor;

    logger.info("download speed (Mbps) %s | location %s | ping (ms) %s | sponsor %s",
      downloadSpeed, testServerLocation, testServerPingTime, testServerSponsor);
  });

  jobCheck();
});

const jobCheck = () => {
  logger.info("next job invocation: ", job.nextInvocation());
}

jobCheck.bind(null, job);

jobCheck();
