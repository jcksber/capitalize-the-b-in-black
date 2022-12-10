import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import productAbi from '../utils/product_abi.json'

import connectImg from '../public/jackclaim.png'
import logik from '../public/logiklogo.png'
import panther from '../public/RBK_pantherlogo_patch.png'

import { useState, useEffect } from 'react'
import { shortenAddress, useEthers } from '@usedapp/core'
import { ethers, utils } from 'ethers'

import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;


export default function Home() {
	const { activateBrowserWallet, account } = useEthers();

	const PRODUCT_ADDRESS = "0xEB7609C621F4D3A74A7A6865AA13e864573853CF";
	const PRODUCT_ABI = new utils.Interface(productAbi);
	const [products, setProductCount] = useState(0);

	const connectWallet = async () => {
		if (window.ethereum) { //check if metamask is installed
			try {
				// Connect MetaMask
				const address = await window.ethereum.request({ method: "eth_requestAccounts" });
				const obj = {
					connectedStatus: true,
					status: "",
					address: address
				}
	
				return obj;
	
			} catch (error) {
				return {
					connectedStatus: false,
					status: "🦊 Connect to Metamask using the button on the top right."
				}
			}
		} else {
			return {
				connectedStatus: false,
				status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
			}
		}
	};

	// Obtain the number of Plugs in connected wallet
	const getNumProducts = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const productContract = await new ethers.Contract(
			PRODUCT_ADDRESS,
			PRODUCT_ABI,
			signer
		);
		const numProducts = await productContract.balanceOf(account, 1);
		setProductCount(parseInt(numProducts.toHexString(), 16));

		return parseInt(numProducts.toHexString(), 16);
	}

	useEffect(() => {
		if (account) {
			const numProducts = getNumProducts();
			setProductCount(numProducts);
		}
	}, [account]);

	return(
		<div id="bomber-page" className="w-full">
			<Head>
				<title>Capitalize the B in Black</title>
			</Head>
			<nav className='bg-white z-30'>
				<div className="navbar bg-white text-black">
					<div className="px-2 md:mx-2 navbar-start w-1/3 md:w-1/2">
					</div>
					<div id="panther" className="navbar-center lg:flex">
						<div className="flex items-stretch">
							<Link href="/">
								<img src={panther.src} quality={100} width={150} height={150} className=""/>
							</Link>
						</div>
					</div>
					<div className="navbar-end">
						<button className="border-solid border-2 border-gray-500 text-black pl-8 ml-auto md:pl-16 py-1 pr-2 rounded-md hover:bg-yellow-main" onClick={() => activateBrowserWallet()} >
								{account ? shortenAddress(account) : (<span>connect 🦊</span>)}
						</button>
					</div>
				</div>
			</nav>
			<div className="content-window">
				{account ? (
					products > 0 ? (
						<div id="bomber-signup">
							<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeQsqxTot2m5B6JwnJBk_oXf1hIoSFmVd-e79nqTT2Xs0Lyig/viewform?usp=sf_link" height="720px" width="500px" frameborder="0" marginheight="0" marginwidth="0">
								Loading...
							</iframe>
						</div>
					) : (
						<div className="not-allowed">
							<div id="capitalize-video">
								<video autoPlay src={require('../public/capitalize_the_b_Blackk.mp4')} width={500} />
							</div>
						</div>
					)	
				) : (
					<a onClick={() => activateBrowserWallet()}>
						<div id="connect-img">
							<img
								src={connectImg.src}
								alt="Photo collage of bomber jacket shots" 
							/>
						</div>
					</a>
				)}
			</div>
		</div>
	);
};

