
export const AddBidderSchema = {
	description: 'Create a new bidder',
	tags: ['bidder'],
	summary: 'Creates new bidder with given values',
	body: {
		type: 'object',
		properties: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			email: { type: String, required: true },
			dateOfBirth: { type: String, required: true },
			phone: { type: String, required: true },
			password: {type: String, require: true}
		},
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
				msg:{type: String},
				code :{type : String}
			},
		},
	},
};


export const GetBidderSchema = {
	description: 'Gets a single bidder',
	tags: ['bidders'],
	summary: 'Gets bidder by Id',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'bidder Id'
			}
		}
	},
	response: {
		
	},
};
