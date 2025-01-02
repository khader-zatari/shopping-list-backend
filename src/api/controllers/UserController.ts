import { Request, Response, NextFunction } from 'express';
import SignInUserUseCase from '../../usecases/user/SignInUserUseCase';
import { HttpCode } from '../../core/constants';

/**
 * Sign in a user using Google token.
 */
export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const user = req.body;
		const result = await SignInUserUseCase.execute(user);
		res.status(HttpCode.OK).json(result);
	} catch (error) {
		next(error);
	}
};
