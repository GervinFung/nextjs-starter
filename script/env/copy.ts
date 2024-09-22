import childProcess from 'child_process';

import ci from 'ci-info';

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
