import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ethers } from 'ethers';

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [active, setActive] = useState('');
	const [toggle, setToggle] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [loginType, setLoginType] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			if (scrollTop > 100) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleMetaMaskLogin = async () => {
		try {
			// Check if MetaMask is available
			if (typeof window.ethereum === 'undefined') {
				alert('MetaMask is not installed! Please install it to continue.');
				return;
			}

			// Create a provider and request access to accounts
			const provider = new ethers.BrowserProvider(window.ethereum); 
			const accounts = await provider.send('eth_requestAccounts', []); 

			// Get the signer
			const signer = await provider.getSigner();

			// Fetch the address
			const address = await signer.getAddress(); 

			// console.log('Logged in with MetaMask:', address);
			setIsLoggedIn(true);
			setLoginType('MetaMask');
		} catch (error) {
			console.error('MetaMask login failed:', error);
		}
	};

	return (
		<nav
			className={`${
				styles.paddingX
			} w-full flex items-center py-5 fixed top-0 z-20 ${
				scrolled ? 'bg-primary' : 'bg-transparent'
			}`}
		>
			<div className="w-full flex justify-between items-center max-w-7xl mx-auto">
				<Link
					to="/"
					className="flex items-center gap-2"
					onClick={() => {
						setActive('');
						window.scrollTo(0, 0);
					}}
				>
					<p className="text-white text-[18px] font-bold cursor-pointer flex ">
						Prince Ndubuisi &nbsp;
					</p>
				</Link>
				<GoogleOAuthProvider clientId="262631439908-s0937993d5a3r4svulmrnh7gbqvs6b01.apps.googleusercontent.com
">
					{!isLoggedIn ? (
						<div className="flex gap-4">
							{/* Google Login */}
							<GoogleLogin
								onSuccess={(credentialResponse) => {
									setIsLoggedIn(true);
									setLoginType('Google');
								}}
								onError={() => {
									console.log('Google Login Failed');
								}}
								useOneTap
								auto_select
							/>

							{/* MetaMask Login */}
							<button
								onClick={handleMetaMaskLogin}
								className="bg-blue-500 text-white px-4 py-2 rounded"
							>
								Login with MetaMask
							</button>
						</div>
					) : (
						<div className="flex items-center">
							{/* Show Login Type */}
							<p className="text-secondary text-[14px] mr-4">
								Logged in using: <strong>{loginType}</strong>
							</p>

							{/* Navigation Menu */}
							<ul className="list-none hidden sm:flex flex-row gap-10">
								{navLinks.map((nav) => (
									<li
										key={nav.id}
										className={`${
											active === nav.title ? 'text-white' : 'text-secondary'
										} hover:text-white text-[18px] font-medium cursor-pointer`}
										onClick={() => setActive(nav.title)}
									>
										<a href={`#${nav.id}`}>{nav.title}</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</GoogleOAuthProvider>
				<div className="sm:hidden flex flex-1 justify-end items-center">
					<img
						src={toggle ? close : menu}
						alt="menu"
						className="w-[28px] h-[28px] object-contain"
						onClick={() => setToggle(!toggle)}
					/>

					<div
						className={`${
							!toggle ? 'hidden' : 'flex'
						} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
					>
						<ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
							{navLinks.map((nav) => (
								<li
									key={nav.id}
									className={`font-poppins font-medium cursor-pointer text-[16px] ${
										active === nav.title ? 'text-white' : 'text-secondary'
									}`}
									onClick={() => {
										setToggle(!toggle);
										setActive(nav.title);
									}}
								>
									<a href={`#${nav.id}`}>{nav.title}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
