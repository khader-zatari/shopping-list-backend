import express, { Request, Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';
import requestLogger from './api/middlewares/requestLogger';

interface ServerOptions {
	port: number;
	apiPrefix: string;
}

export class Server {
	private readonly app: express.Application;
	private readonly port: number;

	constructor(options: ServerOptions) {
		this.app = express();
		this.port = options.port;

		this.initializeMiddlewares();
		this.initializeRoutes();
	}

	private initializeMiddlewares(): void {
		// Enable CORS
		this.app.use(
			cors({
				origin: '*', // Replace with your frontend URL
				methods: ['GET', 'POST', 'PUT', 'DELETE'],
				allowedHeaders: ['Content-Type', 'Authorization']
			})
		);

		// Parse JSON in request body (allow raw)
		this.app.use(express.json());
		this.app.use(requestLogger);

		// Allow x-www-form-urlencoded
		this.app.use(express.urlencoded({ extended: true }));

		// Compress responses
		this.app.use(compression());

		// Limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: 'Too many requests from this IP, please try again in one hour'
			})
		);
	}

	private initializeRoutes(): void {
		// Test REST API endpoint
		this.app.get('/', (_req: Request, res: Response) => {
			res.status(HttpCode.OK).send({
				message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
			});
		});
	}

	public async start(): Promise<void> {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
