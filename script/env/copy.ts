import ci from 'ci-info';
import childProcess from 'child_process';

const main = () => {
    const environment = process.argv.at(2) ?? ''.replace(/-/g, '');
    console.log({ environment });
    if (!ci.isCI) {
        childProcess.execSync(`cp .env.${environment} .env`, {
            stdio: 'inherit',
        });
    }
};

main();
