import { ethers } from "ethers"
import * as dotenv from "dotenv"
import fetch from "isomorphic-fetch"
import * as readlineSync from "readline-sync"

let customHttpProvider: ethers.providers.JsonRpcProvider
let urlInfo: ethers.utils.ConnectionInfo
let rpcUrl: string | undefined
let rpcUser: string | undefined
let rpcPassword: string | undefined

dotenv.config()

async function main() {
    const chainId = parseInt(
        readlineSync.question(
            "Chain Ids:\n1 - Mainnet\n5 - Goerli\n100 - Gnosis\n\nEnter chainId: "
        )
    )

    // ********************
    // DEFINE RPC PROVIDER
    // ********************
    if (chainId == 1) {
        rpcUrl = process.env.RPC_ADDRESS_MAINNET
        rpcUser = process.env.RPC_USER_MAINNET
        rpcPassword = process.env.RPC_PASSWORD_MAINNET
    } else if (chainId == 5) {
        rpcUrl = process.env.RPC_ADDRESS_GOERLI
        rpcUser = process.env.RPC_USER_GOERLI
        rpcPassword = process.env.RPC_PASSWORD_GOERLI
    } else if (chainId == 100) {
        rpcUrl = process.env.RPC_ADDRESS_GNOSIS
    }

    urlInfo = {
        url: rpcUrl!,
        user: rpcUser,
        password: rpcPassword,
    }

    customHttpProvider = new ethers.providers.JsonRpcProvider(urlInfo)

    console.log("Using RPC provider: " + customHttpProvider.connection.url)

    const contractAddress = readlineSync.question("\nEnter contract address: ")
    const tokenId = readlineSync.question("Enter token ID: ")

    // Connect to the contract
    const contractAbi = ["function tokenURI(uint256 tokenId) view returns (string)"]
    const contract = new ethers.Contract(contractAddress, contractAbi, customHttpProvider)

    // Call the contract
    const uri = await contract.tokenURI(tokenId)
    console.log("\nNFT Metadata URI: ")
    console.log(uri)

    // Get the json response from the uri
    const response = await fetch(uri)
    const json = await response.json()

    console.log("\nNFT Image Location: ")
    if (chainId != 100) {
        console.log(json.image)
    } else if (chainId == 100) {
        // POAP uses a different JSON format from other NFTs
        // Is ERC721 supposed to have a standard JSON format?
        console.log(json.image_url)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
