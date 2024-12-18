import React, { useState } from "react";
import axios from "axios";

const SkillForm = ({ handleAddSkill }) => {
  const [certificateFile, setCertificateFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  // Pinata API credentials (ensure these are secured in a backend for production)
  const PINATA_API_KEY = "760f0d41bd22f9f471b1";
  const PINATA_API_SECRET =
    "dba57a5c03690d057eef29b3326e84c7a714051f5ac3dba2719f490db623a923";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file);
    }
  };

  const uploadToPinata = async () => {
    if (!certificateFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", certificateFile);

    try {
      setUploading(true);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
          },
        }
      );

      const hash = response.data.IpfsHash;
      setIpfsHash(hash);
      alert("File successfully uploaded to IPFS!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please check the console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !ipfsHash) {
      alert("Please fill all the fields and upload a file.");
      return;
    }
    await handleAddSkill(name, description, ipfsHash);
    setName("");
    setDescription("");
    setCertificateFile(null);
    setIpfsHash("");
  };
  

  const styles = {
    container: {
      backgroundColor: "#f2f3f4 ",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      margin: "20px 20px",
      textAlign: "center",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: "15px",
    },
    label: {
      marginBottom: "8px",
      fontSize: "14px",
      color: "#555",
      fontWeight: "500",
    },
    input: {
      width: "95%",
      padding: "10px",
      fontSize: "14px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
    },
    fileInput: {
      marginTop: "10px",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: uploading ? "#6c757d" : "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    successMessage: {
      marginTop: "10px",
      color: "#28a745",
      fontWeight: "600",
    },
    link: {
      marginTop: "10px",
      color: "#007BFF",
      textDecoration: "none",
      fontWeight: "500",
    },
    hashCharacter: (index) => ({
      color: index % 2 === 0 ? "blue" : "blue", // Alternating colors
      fontWeight: "bold",
    }),
  };

  // Function to render IPFS hash with alternating colors
  const renderColoredHash = (hash) => {
    return hash.split("").map((char, index) => (
      <span key={index} style={styles.hashCharacter(index)}>
        {char}
      </span>
    ));
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "15px" }}>
        Upload Your Skill Certificate
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Skill Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Skill Name</label>
          <input
            type="text"
            placeholder="Enter skill name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Skill Description */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Skill Description</label>
          <textarea
            placeholder="Enter a short description"
            rows="3"
            style={{ ...styles.input, resize: "none" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* File Upload */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Certificate File</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            style={styles.fileInput}
            onChange={handleFileChange}
          />
        </div>

        {/* Upload Button */}
        <button
          type="button"
          style={styles.button}
          onClick={uploadToPinata}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload to IPFS"}
        </button>

        {/* Success Message */}
        {ipfsHash && (
          <div style={styles.successMessage}>
            <p>
              IPFS Hash: {renderColoredHash(ipfsHash)} {/* Colored Hash */}
            </p>
            File Uploaded Successfully!{" "}
            <a
              href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              View File on IPFS
            </a>
          </div>
        )}

        {/* Submit Form */}
        <br />
        <button type="submit" style={{ ...styles.button, marginTop: "15px" }}>
          {"Submit Skill"}
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
