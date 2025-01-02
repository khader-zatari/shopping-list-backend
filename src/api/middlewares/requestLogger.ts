import { Request, Response, NextFunction } from 'express';
import logger from '../../core/config/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
	logger.info('Incoming request', {
		method: req.method,
		url: req.url,
		body: req.body
	});
	next();
};

export default requestLogger;
