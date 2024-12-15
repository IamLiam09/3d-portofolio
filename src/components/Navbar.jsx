import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ethers } from 'ethers';
import { FiLogIn } from 'react-icons/fi';

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [active, setActive] = useState('');
	const [toggle, setToggle] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [loginType, setLoginType] = useState('');
	const [showModal, setShowModal] = useState(false);

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
			const signer = await provider.getSigner();
			const address = await signer.getAddress();

			setIsLoggedIn(true);
			setLoginType('MetaMask');
			setShowModal(false);
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
				<GoogleOAuthProvider
					clientId="262631439908-s0937993d5a3r4svulmrnh7gbqvs6b01.apps.googleusercontent.com
"
				>
					{!isLoggedIn ? (
						<div>
							{/* Login Icon */}
							<FiLogIn
								className="text-white text-[24px] cursor-pointer"
								onClick={() => setShowModal(true)}
							/>

							{/* Modal Window */}
							{showModal && (
								<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
									<div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
										<h2 className="text-xl font-semibold text-center mb-4">
											Choose Login Method
										</h2>
										<div className="flex flex-col gap-4">
											<GoogleLogin
												onSuccess={(credentialResponse) => {
													setIsLoggedIn(true);
													setLoginType('Google');
													setShowModal(false); // Close modal on success
												}}
												onError={() => {
													console.log('Google Login Failed');
												}}
												className="w-full"
											/>
											<button
												onClick={handleMetaMaskLogin}
												className="bg-blue-500 text-white py-2 px-4 rounded w-full"
											>
												Login with MetaMask
											</button>
										</div>
										<button
											onClick={() => setShowModal(false)}
											className="mt-4 text-red-500 text-sm underline w-full text-center"
										>
											Cancel
										</button>
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="flex items-center">
							<p className="text-secondary text-[14px] mr-4">
								Logged in using: <strong>{loginType}</strong>
							</p>
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
