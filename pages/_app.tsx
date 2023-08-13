import React from 'react';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../src/web/components/error/boundary';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../src/web/components/layout';

const App = (props: AppProps) => {
	return (
		<ChakraProvider>
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
