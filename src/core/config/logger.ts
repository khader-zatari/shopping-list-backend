import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, json } = format;

// Define the log format
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
	const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
	return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`;
});

// Create the logger instance
const logger = createLogger({
	level: 'debug', // Default level // todo change to info
	format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
	transports: [
		new transports.Console({
			format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
		}),
		new transports.DailyRotateFile({
			filename: 'logs/application-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			maxSize: '20m',
			maxFiles: '14d',
			level: 'info'
		}),
		new transports.File({ filename: 'logs/error.log', level: 'error' })
	]
});

// Adjust the logger for production
if (process.env.NODE_ENV === 'production') {
	logger.add(new transports.Console({ format: json() }));
}

export default logger;
