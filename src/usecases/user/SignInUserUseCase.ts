// src/usecases/user/SignInUserUseCase.ts
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { User } from '../../types/user.types';
import UserRepository from '../../domain/repositories/UserRepositories';
import logger from '../../core/config/logger';

interface SignInResponse {
	token: string;
	user: User;
}
const generateToken = (userId: string): string => {
	//todo implement token 
	return `token-${userId}`;
};

const SignInUserUseCase = {
	execute: async (userRequest: User): Promise<SignInResponse> => {
		// Check if user exists
		let user = UserRepository.findByGoogleId(userRequest.googleId);

		if (!user) {
			// If user doesn't exist, create a new one
			logger.info('create new user');
			user = {
				id: uuidv4(),
				name: userRequest.name,
				email: userRequest.email,
				googleId: userRequest.googleId,
				createdAt: new Date()
			};
			UserRepository.save(user);
		}

		// Generate a token (placeholder)
		const token = generateToken(user.id);

		return { token, user };
	}
};

export default SignInUserUseCase;
