# Skill Verification System using Blockchain Technology

## Overview

The **Skill Verification System** is a decentralized application (DApp) designed to verify skills and credentials securely using **Blockchain Technology**. It leverages **Ethereum blockchain**, **MetaMask** for wallet integration, and **Pinata IPFS** for decentralized file storage. Built with **React.js**, **Solidity**, **JavaScript**, **HTML**, and **CSS**, this project ensures tamper-proof and transparent skill verification.

## Features

- **Decentralized Verification:** Skill records are stored on the blockchain, ensuring transparency and security.
- **MetaMask Integration:** Users can connect their Ethereum wallets for transactions and verification.
- **IPFS Integration:** Skill certificates and proofs are stored on Pinata IPFS for decentralized access.
- **User Roles:** Separate interfaces for users (to upload credentials) and verifiers (to validate and approve credentials).
- **Interactive UI:** Built with React.js for a seamless user experience.

## Tech Stack

- **Frontend:** React.js, JavaScript, HTML, CSS
- **Smart Contracts:** Solidity
- **Blockchain Network:** Ethereum
- **Storage:** Pinata IPFS
- **Wallet Integration:** MetaMask

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MetaMask](https://metamask.io/) (Browser Extension)
- [Ganache](https://trufflesuite.com/ganache/) or Ethereum Testnet for local blockchain development
- [Pinata](https://pinata.cloud/) account for IPFS integration

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Ankanpanda/Skill-Verification-System.git
cd skill-verification-blockchain
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Add the following details in src → App.js
```bash
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
```
Add the following details in src → Components → Skillform.js
```bash
CONTRACT_ADDRESS=your_deployed_contract_address
```

### 4. Start the Application
```bash
npm start
```
Open your browser and navigate to http://localhost:3000.

##
