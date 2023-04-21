import type { NextPage } from 'next';
import Head from 'next/head';
import History, { HistoryProps } from '@/components/fragments/history';

import styles from './index.module.css';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Crystal Hon - Phone number validator</title>
				<meta name="description" content="A phone number validator developed using NextJs" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className={styles.form}></section>
			<section className={styles.histories}></section>
		</>
	);
};

export default Home;
