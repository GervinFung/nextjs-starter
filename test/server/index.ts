import child from 'child_process';
import config from '../config';

export default class Server {
    private readonly port: number;

    private constructor() {
        this.port = config().port;
    }

    static create = () => new this();

    getPort = () => this.port;

    kill = () => {
        child.exec(`kill $(lsof -t -i:${this.port})`);
    };

    start = async () => {
        const server = child
            .exec(`make start arguments="-p ${this.port}"`)
            .on('spawn', () => console.log('spawned server'))
            .on('message', console.log)
            .on('error', console.error)
            .on('kill', () => {
                this.kill();
            });
        server.stdout?.setEncoding('utf-8');
        server.stderr?.setEncoding('utf-8');
        await new Promise<void>((resolve) => {
            server.stdout?.on('data', (data: string) => {
                console.log(data);
                if (data.includes('started server')) {
                    resolve();
                }
            });
        });
    };
}
