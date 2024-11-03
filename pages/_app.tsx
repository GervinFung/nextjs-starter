import type { AppProps } from 'next/app';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import React from 'react';

import ErrorBoundary from '../src/web/components/error/boundary';
import Layout from '../src/web/components/layout';

const App = (props: AppProps) => {
	return (
		<ChakraProvider value={defaultSystem}>
			<ErrorBoundary>
				<Layout>
					<main>
						<props.Component {...props.pageProps} />
					</main>
				</Layout>
			</ErrorBoundary>
		</ChakraProvider>
	);
};

export default App;
