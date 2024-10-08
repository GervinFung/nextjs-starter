import type { EndPointFunc } from '../../src/api/endpoint';

import cors from '../../src/api/cors';

const contact: EndPointFunc<string> = async (request, response) => {
	await cors<string>()(request, response);
	if (request.method !== 'POST') {
		response.status(404).json('Only accept POST request');
	} else {
		response.status(200).json('hi');
	}
};

export default contact;
