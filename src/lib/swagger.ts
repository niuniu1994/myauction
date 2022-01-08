export const Options = {
	routePrefix: '/documentation',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'MyAuction',
			description: 'Building a REST API with Node.js, MongoDB, Fastify and Swagger',
			version: '1.0.0',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here',
		},
		tags: [
			{ name: 'bidder', description: 'Bidder related end-points' },
			{ name: 'good', description: 'Good related end-points' },
			{ name: 'auction', description: 'Auction related end-points' }
		  ],	
		host: 'localhost:3000',
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
	},
};
