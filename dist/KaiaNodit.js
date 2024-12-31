import axios from 'axios';
class KaiaNodit {
    client;
    nft;
    token;
    statistics;
    blockchain;
    constructor(apiKey, baseUrl = 'https://web3.nodit.io') {
        this.client = new Client(apiKey, baseUrl);
        this.nft = new NFTService(this.client);
        this.token = new TokenService(this.client);
        this.statistics = new StatisticsService(this.client);
        this.blockchain = new BlockchainService(this.client);
    }
}
// Internal Client class
class Client {
    apiKey;
    baseUrl;
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    async post(endpoint, payload) {
        try {
            const response = await axios.post(`${this.baseUrl}${endpoint}`, payload, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-KEY': this.apiKey
                }
            });
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`HTTP error! status: ${error.response?.status}`);
            }
            throw error;
        }
    }
}
// NFT Service
class NFTService {
    client;
    constructor(client) {
        this.client = client;
    }
    async getNftContractMetadataByContracts(contractAddresses) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftContractMetadataByContracts", { contractAddresses });
    }
    async getNftContractsByAccount(accountAddress, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftContractsByAccount", { accountAddress, ...params });
    }
    async getNftHoldersByContract(contractAddress, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftHoldersByContract", { contractAddress, ...params });
    }
    async getNftHoldersByTokenId(contractAddress, tokenId, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftHoldersByTokenId", { contractAddress, tokenId, ...params });
    }
    async getNftMetadataByContract(contractAddress, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftMetadataByContract", { contractAddress, ...params });
    }
    async getNftMetadataByTokenIds(tokens) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftMetadataByTokenIds", { tokens });
    }
    async getNftTransfersByAccount(accountAddress, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersByAccount", { accountAddress, ...params });
    }
    async getNftTransfersByContract(contractAddress, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersByContract", { contractAddress, ...params });
    }
    async getNftTransfersByTokenId(contractAddress, tokenId, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersByTokenId", { contractAddress, tokenId, ...params });
    }
    async getNftTransfersWithinRange(params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersWithinRange", params || {});
    }
    async getNftsOwnedByAccount(accountAddress, params) {
        return this.client.post("/v1/kaia/mainnet/nft/getNftsOwnedByAccount", { accountAddress, ...params });
    }
    async searchNftContractMetadataByKeyword(keyword, params) {
        return this.client.post("/v1/kaia/mainnet/nft/searchNftContractMetadataByKeyword", { keyword, ...params });
    }
}
// Token Service
class TokenService {
    client;
    constructor(client) {
        this.client = client;
    }
    async getNativeBalanceByAccount(accountAddress) {
        return this.client.post("/v1/kaia/mainnet/native/getNativeBalanceByAccount", { accountAddress });
    }
    async getTokenPricesByContracts(contractAddresses, currency) {
        const endpoint = "/v1/kaia/mainnet/token/getTokenPricesByContracts";
        const payload = { contractAddresses };
        if (currency)
            payload.currency = currency;
        return this.client.post(endpoint, payload);
    }
    async getTokenTransfersByAccount(accountAddress, params) {
        const endpoint = "/v1/kaia/mainnet/token/getTokenTransfersByAccount";
        const payload = {
            accountAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async getTokenAllowance(contractAddress, ownerAddress, spenderAddress) {
        const endpoint = "/v1/kaia/mainnet/token/getTokenAllowance";
        return this.client.post(endpoint, {
            contractAddress,
            ownerAddress,
            spenderAddress
        });
    }
    async getTokenContractMetadataByContracts(contractAddresses) {
        const endpoint = "/v1/kaia/mainnet/token/getTokenContractMetadataByContracts";
        return this.client.post(endpoint, { contractAddresses });
    }
    async getTokenHoldersByContract(contractAddress, params) {
        const endpoint = "/v1/kaia/mainnet/token/getTokenHoldersByContract";
        const payload = {
            contractAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async getTokenTransfersByContract(contractAddress, params) {
        const endpoint = "/v1/kaia/mainnet/token/getTokenTransfersByContract";
        const payload = {
            contractAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async getTokenTransfersWithinRange(params) {
        const endpoint = "/v1/kaia/mainnet/token/getTokenTransfersWithinRange";
        return this.client.post(endpoint, params || {});
    }
    async getTokensOwnedByAccount(accountAddress, params) {
        const endpoint = "/v1/kaia/mainnet/token/getTokensOwnedByAccount";
        const payload = {
            accountAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async searchTokenContractMetadataByKeyword(keyword, params) {
        const endpoint = "/v1/kaia/mainnet/token/searchTokenContractMetadataByKeyword";
        const payload = {
            keyword,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
}
// Statistics Service
class StatisticsService {
    client;
    constructor(client) {
        this.client = client;
    }
    async getAccountStats(address) {
        return this.client.post("/v1/kaia/mainnet/stats/getAccountStats", { address });
    }
}
// New Blockchain Service
class BlockchainService {
    client;
    constructor(client) {
        this.client = client;
    }
    async getBlockByHashOrNumber(block) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getBlockByHashOrNumber", { block });
    }
    async getBlocksWithinRange(params) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getBlocksWithinRange", params || {});
    }
    async getGasPrice() {
        return this.client.post("/v1/kaia/mainnet/blockchain/getGasPrice", {});
    }
    async getInternalTransactionsByAccount(accountAddress, params) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getInternalTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }
    async getNextNonceByAccount(accountAddress) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getNextNonceByAccount", { accountAddress });
    }
    async getTransactionByHash(transactionHash, params) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionByHash", {
            transactionHash,
            ...params
        });
    }
    async getTransactionsByAccount(accountAddress, params) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }
    async getTransactionsByHashes(transactionHashes, params) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionsByHashes", {
            transactionHashes,
            ...params
        });
    }
    async getTransactionsInBlock(block, params) {
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionsInBlock", {
            block,
            ...params
        });
    }
    async isContract(address) {
        return this.client.post("/v1/kaia/mainnet/blockchain/isContract", { address });
    }
    async searchEvents(contractAddress, eventNames, abi, params) {
        return this.client.post("/v1/kaia/mainnet/blockchain/searchEvents", {
            contractAddress,
            eventNames,
            abi,
            ...params
        });
    }
}
export { KaiaNodit };
// or alternatively:
export default KaiaNodit; // both should work now with proper ES module configuration
