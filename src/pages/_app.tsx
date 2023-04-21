import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Layout from '@/components/structures/layout';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider attribute="class">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
};

export default MyApp;
