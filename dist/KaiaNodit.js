import axios from 'axios';
import { WebhookEventType } from './types';
class KaiaNodit {
    client;
    nodeClient;
    nft;
    token;
    statistics;
    blockchain;
    node;
    webhook;
    constructor(apiKey, network = 'mainnet', baseUrl = 'https://web3.nodit.io') {
        this.client = new Client(apiKey, baseUrl, network);
        const nodeBaseUrl = network === 'mainnet' ? 'https://kaia-mainnet.nodit.io' : 'https://kaia-kairos.nodit.io';
        this.nodeClient = new Client(apiKey, nodeBaseUrl, network);
        this.nft = new NFTService(this.client);
        this.token = new TokenService(this.client);
        this.statistics = new StatisticsService(this.client);
        this.blockchain = new BlockchainService(this.client);
        this.node = new NodeService(this.nodeClient);
        this.webhook = new WebhookService(this.client, network);
    }
}
// Internal Client class
class Client {
    apiKey;
    baseUrl;
    network;
    constructor(apiKey, baseUrl, network) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.network = network;
    }
    async post(endpoint, payload) {
        try {
            const response = await axios.post(`${this.baseUrl}/v1/kaia/${this.network}${endpoint}`, payload, {
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
    async postNode(payload) {
        try {
            const response = await axios.post(this.baseUrl, payload, {
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
    async get(endpoint, params) {
        try {
            const response = await axios.get(`${this.baseUrl}/v1/kaia/${this.network}${endpoint}`, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-KEY': this.apiKey
                },
                params
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
    async patch(endpoint, payload) {
        try {
            const response = await axios.patch(`${this.baseUrl}/v1/kaia/${this.network}${endpoint}`, payload, {
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
    async delete(endpoint) {
        try {
            const response = await axios.delete(`${this.baseUrl}/v1/kaia/${this.network}${endpoint}`, {
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
        return this.client.post("/nft/getNftContractMetadataByContracts", { contractAddresses });
    }
    async getNftContractsByAccount(accountAddress, params) {
        return this.client.post("/nft/getNftContractsByAccount", { accountAddress, ...params });
    }
    async getNftHoldersByContract(contractAddress, params) {
        return this.client.post("/nft/getNftHoldersByContract", { contractAddress, ...params });
    }
    async getNftHoldersByTokenId(contractAddress, tokenId, params) {
        return this.client.post("/nft/getNftHoldersByTokenId", { contractAddress, tokenId, ...params });
    }
    async getNftMetadataByContract(contractAddress, params) {
        return this.client.post("/nft/getNftMetadataByContract", { contractAddress, ...params });
    }
    async getNftMetadataByTokenIds(tokens) {
        return this.client.post("/nft/getNftMetadataByTokenIds", { tokens });
    }
    async getNftTransfersByAccount(accountAddress, params) {
        return this.client.post("/nft/getNftTransfersByAccount", { accountAddress, ...params });
    }
    async getNftTransfersByContract(contractAddress, params) {
        return this.client.post("/nft/getNftTransfersByContract", { contractAddress, ...params });
    }
    async getNftTransfersByTokenId(contractAddress, tokenId, params) {
        return this.client.post("/nft/getNftTransfersByTokenId", { contractAddress, tokenId, ...params });
    }
    async getNftTransfersWithinRange(params) {
        return this.client.post("/nft/getNftTransfersWithinRange", params || {});
    }
    async getNftsOwnedByAccount(accountAddress, params) {
        return this.client.post("/nft/getNftsOwnedByAccount", { accountAddress, ...params });
    }
    async searchNftContractMetadataByKeyword(keyword, params) {
        return this.client.post("/nft/searchNftContractMetadataByKeyword", { keyword, ...params });
    }
}
// Token Service
class TokenService {
    client;
    constructor(client) {
        this.client = client;
    }
    async getNativeBalanceByAccount(accountAddress) {
        return this.client.post("/native/getNativeBalanceByAccount", { accountAddress });
    }
    async getTokenPricesByContracts(contractAddresses, currency) {
        const endpoint = "/token/getTokenPricesByContracts";
        const payload = { contractAddresses };
        if (currency)
            payload.currency = currency;
        return this.client.post(endpoint, payload);
    }
    async getTokenTransfersByAccount(accountAddress, params) {
        const endpoint = "/token/getTokenTransfersByAccount";
        const payload = {
            accountAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async getTokenAllowance(contractAddress, ownerAddress, spenderAddress) {
        const endpoint = "/token/getTokenAllowance";
        return this.client.post(endpoint, {
            contractAddress,
            ownerAddress,
            spenderAddress
        });
    }
    async getTokenContractMetadataByContracts(contractAddresses) {
        const endpoint = "/token/getTokenContractMetadataByContracts";
        return this.client.post(endpoint, { contractAddresses });
    }
    async getTokenHoldersByContract(contractAddress, params) {
        const endpoint = "/token/getTokenHoldersByContract";
        const payload = {
            contractAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async getTokenTransfersByContract(contractAddress, params) {
        const endpoint = "/token/getTokenTransfersByContract";
        const payload = {
            contractAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async getTokenTransfersWithinRange(params) {
        const endpoint = "/token/getTokenTransfersWithinRange";
        return this.client.post(endpoint, params || {});
    }
    async getTokensOwnedByAccount(accountAddress, params) {
        const endpoint = "/token/getTokensOwnedByAccount";
        const payload = {
            accountAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }
    async searchTokenContractMetadataByKeyword(keyword, params) {
        const endpoint = "/token/searchTokenContractMetadataByKeyword";
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
        return this.client.post("/stats/getAccountStats", { address });
    }
}
// Blockchain Service
class BlockchainService {
    client;
    constructor(client) {
        this.client = client;
    }
    async getBlockByHashOrNumber(block) {
        return this.client.post("/blockchain/getBlockByHashOrNumber", { block });
    }
    async getBlocksWithinRange(params) {
        return this.client.post("/blockchain/getBlocksWithinRange", params || {});
    }
    async getGasPrice() {
        return this.client.post("/blockchain/getGasPrice", {});
    }
    async getInternalTransactionsByAccount(accountAddress, params) {
        return this.client.post("/blockchain/getInternalTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }
    async getNextNonceByAccount(accountAddress) {
        return this.client.post("/blockchain/getNextNonceByAccount", { accountAddress });
    }
    async getTransactionByHash(transactionHash, params) {
        return this.client.post("/blockchain/getTransactionByHash", {
            transactionHash,
            ...params
        });
    }
    async getTransactionsByAccount(accountAddress, params) {
        return this.client.post("/blockchain/getTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }
    async getTransactionsByHashes(transactionHashes, params) {
        return this.client.post("/blockchain/getTransactionsByHashes", {
            transactionHashes,
            ...params
        });
    }
    async getTransactionsInBlock(block, params) {
        return this.client.post("/blockchain/getTransactionsInBlock", {
            block,
            ...params
        });
    }
    async isContract(address) {
        return this.client.post("/blockchain/isContract", { address });
    }
    async searchEvents(contractAddress, eventNames, abi, params) {
        return this.client.post("/blockchain/searchEvents", {
            contractAddress,
            eventNames,
            abi,
            ...params
        });
    }
}
// Node Service
class NodeService {
    client;
    constructor(client) {
        this.client = client;
    }
    async getChainId() {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_chainId"
        });
    }
    async getBlockNumber() {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_blockNumber"
        });
    }
    async getBalance(address, blockParameter = "latest") {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBalance",
            params: [address, blockParameter]
        });
    }
    async call(transaction, blockParameter = "latest") {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_call",
            params: [transaction, blockParameter]
        });
    }
    async createAccessList(transaction, blockParameter = "latest") {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_createAccessList",
            params: [transaction, blockParameter]
        });
    }
    async estimateGas(transaction) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_estimateGas",
            params: [transaction]
        });
    }
    async getFeeHistory(blockCount, newestBlock, rewardPercentiles) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_feeHistory",
            params: [blockCount, newestBlock, rewardPercentiles]
        });
    }
    async getGasPrice() {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_gasPrice"
        });
    }
    async getBlockByHash(hash) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockByHash",
            params: [hash, true]
        });
    }
    async getBlockByNumber(number) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockByNumber",
            params: [number, true]
        });
    }
    async getBlockReceipts(blockHash) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockReceipts",
            params: [blockHash]
        });
    }
    async getTransactionByHash(hash) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionByHash",
            params: [hash]
        });
    }
    async getTransactionByBlockHashAndIndex(blockHash, index) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionByBlockHashAndIndex",
            params: [blockHash, index]
        });
    }
    async getTransactionByBlockNumberAndIndex(blockNumber, index) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionByBlockNumberAndIndex",
            params: [blockNumber, index]
        });
    }
    async getTransactionReceipt(hash) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionReceipt",
            params: [hash]
        });
    }
    async getTransactionCount(address) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionCount",
            params: [address, "latest"]
        });
    }
    async getStorageAt(address, position) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getStorageAt",
            params: [address, position, "latest"]
        });
    }
    async getCode(address) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getCode",
            params: [address, "latest"]
        });
    }
    async getBlockTransactionCountByHash(hash) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockTransactionCountByHash",
            params: [hash]
        });
    }
    async getBlockTransactionCountByNumber(number) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockTransactionCountByNumber",
            params: [number]
        });
    }
    async getFilterChanges(filterId) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getFilterChanges",
            params: [filterId]
        });
    }
    async getFilterLogs(filterId) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getFilterLogs",
            params: [filterId]
        });
    }
    async getLogs(filter) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getLogs",
            params: [filter]
        });
    }
    async getProof(address, storageKeys, blockParameter = "latest") {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getProof",
            params: [address, storageKeys, blockParameter]
        });
    }
    async getMaxPriorityFeePerGas() {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_maxPriorityFeePerGas"
        });
    }
    async newBlockFilter() {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_newBlockFilter"
        });
    }
    async newFilter(filter) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_newFilter",
            params: [filter]
        });
    }
    async newPendingTransactionFilter() {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_newPendingTransactionFilter"
        });
    }
    async sendRawTransaction(signedTransactionData) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_sendRawTransaction",
            params: [signedTransactionData]
        });
    }
    async uninstallFilter(filterId) {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_uninstallFilter",
            params: [filterId]
        });
    }
}
// Webhook Service
class WebhookService {
    client;
    network;
    baseEndpoint;
    constructor(client, network) {
        this.client = client;
        this.network = network;
        this.baseEndpoint = `/webhooks`;
    }
    async getWebhooks(params) {
        return this.client.get(this.baseEndpoint, params);
    }
    async createWebhook(eventType, webhookUrl, description, condition) {
        const payload = {
            eventType: typeof eventType === 'string' ? eventType : eventType,
            description,
            notification: { webhookUrl },
            condition
        };
        return this.client.post(this.baseEndpoint, payload);
    }
    async createAddressActivityWebhook(webhookUrl, addresses, description) {
        return this.createWebhook(WebhookEventType.ADDRESS_ACTIVITY, webhookUrl, description, { addresses });
    }
    async updateWebhook(webhookId, updates) {
        if (!webhookId) {
            throw new Error("webhookId is required");
        }
        return this.client.patch(`${this.baseEndpoint}/${webhookId}`, updates);
    }
    async deleteWebhook(webhookId) {
        if (!webhookId) {
            throw new Error("webhookId is required");
        }
        return this.client.delete(`${this.baseEndpoint}/${webhookId}`);
    }
    async getWebhookHistory(params) {
        if (!params.subscriptionId) {
            throw new Error("subscriptionId is required");
        }
        const queryParams = { ...params };
        if (params.status) {
            queryParams.status = typeof params.status === 'string'
                ? params.status
                : params.status;
        }
        if (params.startAt) {
            queryParams.startAt = params.startAt instanceof Date
                ? params.startAt.toISOString()
                : params.startAt;
        }
        if (params.endAt) {
            queryParams.endAt = params.endAt instanceof Date
                ? params.endAt.toISOString()
                : params.endAt;
        }
        return this.client.get(`${this.baseEndpoint}/history`, queryParams);
    }
}
export default KaiaNodit;
