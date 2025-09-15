import pino from 'pino';

/*
const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: `${__dirname}/app.log` },
});

const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  fileTransport
);

export default logger;
*/

export default pino({});
