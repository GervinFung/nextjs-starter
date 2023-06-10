import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import type { Response } from '../endpoint';
import { guard } from '../../common/type';

const initMiddleware =
    <T>(
        middleware: (
            req: NextApiRequest,
            res: NextApiResponse<T>,
            callback: (result: unknown) => void
        ) => void
    ) =>
    (req: NextApiRequest, res: NextApiResponse<T>) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result: unknown) =>
                result instanceof Error ? reject(result) : resolve(result)
            );
        });

const cors = <T>() =>
    initMiddleware<Response<T>>(
        Cors({
            credentials: true,
            origin: guard({
                value: process.env.ORIGIN,
                error: () =>
                    new Error(
                        'There is no environment variable calle "ORIGIN"'
                    ),
            }),
        })
    );

export default cors;
