import { useMemo } from 'react';
import styles from './header.module.css';
import { useTheme } from 'next-themes';
import Button from '@/components/elements/button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = (): JSX.Element => {
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;
	const ToggleButtonIcon = useMemo(() => (theme === 'light' ? MoonIcon : SunIcon), [currentTheme]);

	return (
		<header className={styles.header}>
			<Button
				className={styles.themeButton}
				onClick={() => {
					console.log('toggle');
					setTheme(currentTheme === 'light' ? 'dark' : 'light');
				}}>
				<div className={styles.buttonContainer}>
					<ToggleButtonIcon className={styles.icon} />
					Toggle to {currentTheme === 'light' ? 'Dark' : 'Light'}
				</div>
			</Button>
			<h1 className={styles.title}>Phone number validator</h1>
			<p className={styles.description}>by Crystal Hon</p>
		</header>
	);
};

export default Header;
