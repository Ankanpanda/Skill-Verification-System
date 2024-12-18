import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SkillVerificationABI from "./contracts/SkillVerificationABI.json";
import SkillForm from "./components/SkillForm";

// Check for window.ethereum (MetaMask)
const web3 = new Web3(window.ethereum || "http://localhost:8545");

// Contract Address (Replace with your deployed contract address)
const contractAddress = "0xb07d7632462964223B1389B862691B2a9d566311";
const contract = new web3.eth.Contract(SkillVerificationABI, contractAddress);

function App() {
  const [account, setAccount] = useState(""); // Connected wallet account

  // Load Web3 and connect to wallet
  useEffect(() => {
    async function loadWeb3() {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]); // Set the first wallet account
        } else {
          alert("Please install MetaMask!");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    }
    loadWeb3();
  }, []);

  // Add a skill to the blockchain
  const handleAddSkill = async (name, description, certificateHash) => {
    try {
      await contract.methods
        .addSkill(name, description, certificateHash)
        .send({ from: account });
      alert("Skill added successfully!");
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Failed to add skill. Check the console for details.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        {/* Header */}
        <h1 style={styles.title}>Skill Verification System</h1>
        <p style={styles.subtext}>
          Securely manage your skills and certifications on the blockchain.
        </p>

        {/* Connected Account */}
        <div style={styles.accountSection}>
          <span style={styles.accountLabel}>Connected Account: </span>
          <span style={styles.accountValue}>{account || "Not Connected"}</span>
        </div>

        {/* Skill Form */}
        <SkillForm handleAddSkill={handleAddSkill} />
      </div>
    </div>
  );
}

// Modernized Styles
const styles = {
  pageContainer: {
    backgroundColor: "#d2f5ff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    backgroundColor: "#f7dc6f",
    padding: "30px 20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    color: "#333",
    fontSize: "28px",
    marginBottom: "10px",
  },
  subtext: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "20px",
  },
  accountSection: {
    marginBottom: "20px",
    fontSize: "16px",
  },
  accountLabel: {
    fontWeight: "600",
  },
  accountValue: {
    color: "#007bff",
    fontWeight: "500",
  },
};

export default App;
