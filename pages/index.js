import Head from 'next/head'
import productAbi from '../utils/product_abi.json'

import Image from 'next/image'
import hodlerOnlyGif from '../public/drivein_theatre_sorryplugonly.gif'
import connectGif from '../public/drivein_theatre_connectwallet.gif'
import { useState, useEffect } from 'react'
import { useGasPrice, useEthers } from '@usedapp/core'
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
		<div className="rsvp h-screen w-full">
			<Head>
				<title>Capitalize the B in Black</title>
			</Head>
			<div className="content-window">
				{account ? (
					products > 0 ? (
						<div className="rsvp-event-brite">
							<iframe src="google form" height="720px" width="500px">
							</iframe>
						</div>
					) : (
						<div className="not-allowed">
							<div className="drive-in-gif">
								<Image 
									src={hodlerOnlyGif} 
								/>
							</div>
						</div>
					)	
				) : (
					<div className="not-allowed">
						<div className="drive-in-gif">
							<Image 
								src={connectGif} 
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

