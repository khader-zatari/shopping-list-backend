import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../../../core/constants';

export const validateSignIn = (req: Request, res: Response, next: NextFunction): void => {
	const { googleId } = req.body;

	if (!googleId || typeof googleId !== 'string') {
		res.status(HttpCode.BAD_REQUEST).json({ error: 'Google Id is required and must be a string.' });
	} else {
		next();
	}
};
