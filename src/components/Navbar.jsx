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
		const handleScroll = (e) => {
			if (!isLoggedIn) {
				e.preventDefault();
				setShowModal(true); // Show the modal when a scroll attempt is detected
				window.scrollTo(0, 0); // Reset scroll position to the top
			} else {
				const scrollTop = window.scrollY;
				setScrolled(scrollTop > 100);
			}
		};

		if (showModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		window.addEventListener('scroll', handleScroll, { passive: false });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.body.style.overflow = '';
		};
	}, [isLoggedIn, showModal]);

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

				{!isLoggedIn ? (
					<div>
						{/* Login Icon */}
						<FiLogIn
							className="hidden sm:block text-white text-[24px] cursor-pointer"
							onClick={() => setShowModal(true)}
						/>

						{/* Modal Window */}
						{showModal && (
							<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
								<div className="bg-black p-10 rounded-lg shadow-lg w-[300px]">
									<h2 className="text-xl font-bold text-center mb-4">Login</h2>
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
										className="mt-4 text-red-500 text-sm w-full text-center"
									>
										Cancel
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="flex items-center">
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
				<div className="sm:hidden flex flex-1 justify-end items-center">
					{!isLoggedIn ? (
						<>
							<FiLogIn
								className="text-white text-[24px] cursor-pointer mb-4 mt-2"
								onClick={() => setShowModal(true)} 
							/>
						</>
					) : (
						<>
							{/* Hamburger Menu */}
							<img
								src={toggle ? close : menu}
								alt="menu"
								className="w-[28px] h-[28px] object-contain"
								onClick={() => setToggle(!toggle)} // Toggle menu
							/>

							{/* Dropdown Menu */}
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
												setToggle(false); // Close the menu
												setActive(nav.title);
											}}
										>
											<a href={`#${nav.id}`}>{nav.title}</a>
										</li>
									))}
								</ul>
							</div>
						</>
					)}

					{/* Login Modal */}
					{showModal && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
							<div className="bg-black p-10 rounded-lg shadow-lg w-[300px]">
								<h2 className="text-xl font-bold text-center mb-4">Login</h2>
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
									className="mt-4 text-red-500 text-sm w-full text-center"
								>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
