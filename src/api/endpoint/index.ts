import type { DeepReadonly } from '@poolofdeath20/util';
import type { NextApiRequest, NextApiResponse } from 'next';

type Response<T> = string | DeepReadonly<T>;

type EndPointFunc<T> = (
	req: NextApiRequest,
	res: NextApiResponse<Response<T>>
) => Promise<void>;

export type { EndPointFunc, Response };
