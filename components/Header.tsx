'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type HeaderProps = {
	isConnected?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isConnected = false }) => {
	const t = useTranslations('Header');
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

	return (
		<header className="border-b border-gray-200 bg-white px-5 py-3 shadow-sm sm:px-8">
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<Image src="/brandLogo.png" alt="Brand Logo" width={50} height={50} />
					<h1 className="m-0 text-lg font-bold sm:text-xl">The Wall Academy</h1>
				</div>

				<div
					id="header-navigation"
					className={cn(
						'mt-4 flex flex-col gap-4 md:mt-0 md:flex-row md:items-center md:justify-between ml-auto',
						isMenuOpen ? 'flex' : 'hidden md:flex'
					)}>
					<div className="flex items-center gap-3">
						{isConnected ? (
							<div className="text-sm text-gray-900">{'Profil'}</div>
						) : (
							<Button
								className="w-full cursor-pointer md:w-auto"
								variant={'outline'}
								onClick={() => {
									window.location.href = '/';
								}}>
								{t('connect')}
							</Button>
						)}
					</div>
					<div className="text-lg font-bold text-gray-900 ml-auto">
						<Link href="/en" className="hover:text-gray-600">
							en
						</Link>
						<span className="px-1">|</span>
						<Link href="/fr" className="hover:text-gray-600">
							fr
						</Link>
						<span className="px-1">|</span>
						<Link href="/nl" className="hover:text-gray-600">
							nl
						</Link>
					</div>
				</div>
				<button
					type="button"
					className="inline-flex items-center rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 md:hidden"
					onClick={handleToggleMenu}
					aria-expanded={isMenuOpen}
					aria-controls="header-navigation">
					<span className="sr-only">{t('toggleNavigation')}</span>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true">
						{isMenuOpen ? (
							<>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</>
						) : (
							<>
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</>
						)}
					</svg>
				</button>
			</div>
		</header>
	);
};

export default Header;
