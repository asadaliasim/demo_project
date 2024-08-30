const { ethers } = require("ethers");

// Initialize the default provider (connects to multiple public services like Infura, Alchemy, etc.)
const provider = ethers.getDefaultProvider("mainnet");

// Define the contract address and a minimal ABI for ERC-721 (NFT standard)
const contractAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"; // BAYC Contract Address
const contractABI = [
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
]; // Minimal ABI to interact with ERC-721 NFT contract

// Controller function to fetch NFT data from a smart contract
exports.fetchNFTData = async (req, res) => {
  try {
    // Initialize contract instance with address, ABI, and provider
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    // Example token ID to fetch data for (e.g., token ID 1)
    const tokenId = 1;

    // Fetch the owner of the token
    const owner = await contract.ownerOf(tokenId);
    console.log("Owner Address:", owner);

    // Fetch the token URI (metadata URL)
    const tokenURI = await contract.tokenURI(tokenId);
    console.log("Token URI:", tokenURI);

    // Send the response with fetched data
    res.json({ tokenId, owner, tokenURI });
  } catch (error) {
    console.error("Error fetching NFT data:", error);

    // Check if the error is due to a failed call to the smart contract
    if (error.code === ethers.errors.CALL_EXCEPTION) {
      res.status(400).json({
        error:
          "The call to the smart contract failed. Possible reasons include an invalid token ID or restricted access to the function.",
      });
    } else {
      res.status(500).json({ error: "Failed to fetch NFT data" });
    }
  }
};
