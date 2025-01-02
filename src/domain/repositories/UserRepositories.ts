import logger from '../../core/config/logger';
import { User } from '../../types/user.types';
var users: [User] = [
	{
		googleId: '12',
		id: '1',
		name: '1',
		email: '1',
		createdAt: new Date(Date.now())
	}
];
const UserRepository = {
	findByGoogleId: (googleId: string): User | undefined => {
		var res = users.find((user) => user.googleId === googleId);
		logger.debug(JSON.stringify(users));
		return res;
	},

	save: (user: User): User => {
		users.push(user);
		logger.debug(JSON.stringify(users));
		return user;
	},

	update: (user: User): User => {
		const index = users.findIndex((u) => u.id === user.id);
		if (index === -1) {
			throw new Error('User not found');
		}
		users[index] = user;
		logger.debug(JSON.stringify(users));
		return user;
	}
};

export default UserRepository;
