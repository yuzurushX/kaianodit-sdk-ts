import axios from 'axios';
import {
    ApiResponse,
    PaginationParams,
    DateRangeParams,
    BlockRangeParams,
    TransactionParams,
    TokenTransferParams,
    NftTransferParams,
    NftToken,
    WebhookEventType,
    WebhookPayload,
    WebhookUpdatePayload,
    WebhookHistoryParams,
    WebhookCondition,
    WebhookParams
} from './types';

class KaiaNodit {
    private client: Client;
    private nodeClient: Client;
    public nft: NFTService;
    public token: TokenService;
    public statistics: StatisticsService;
    public blockchain: BlockchainService;
    public node: NodeService;
    public webhook: WebhookService;

    constructor(apiKey: string, network: string = 'mainnet', baseUrl: string = 'https://web3.nodit.io') {
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
    private apiKey: string;
    private baseUrl: string;
    private network: string;

    constructor(apiKey: string, baseUrl: string, network: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.network = network;
    }

    public async post(endpoint: string, payload: any): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}/v1/kaia/${this.network}${endpoint}`, payload, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-KEY': this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`HTTP error! status: ${error.response?.status}`);
            }
            throw error;
        }
    }

    public async postNode(payload: any): Promise<any> {
        try {
            const response = await axios.post(this.baseUrl, payload, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-KEY': this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`HTTP error! status: ${error.response?.status}`);
            }
            throw error;
        }
    }

    public async get(endpoint: string, params: any): Promise<ApiResponse> {
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
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`HTTP error! status: ${error.response?.status}`);
            }
            throw error;
        }
    }

    public async patch(endpoint: string, payload: any): Promise<ApiResponse> {
        try {
            const response = await axios.patch(`${this.baseUrl}/v1/kaia/${this.network}${endpoint}`, payload, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-KEY': this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`HTTP error! status: ${error.response?.status}`);
            }
            throw error;
        }
    }

    public async delete(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await axios.delete(`${this.baseUrl}/v1/kaia/${this.network}${endpoint}`, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'X-API-KEY': this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`HTTP error! status: ${error.response?.status}`);
            }
            throw error;
        }
    }
}


// NFT Service
class NFTService {
    constructor(private client: Client) {}

    public async getNftContractMetadataByContracts(
        contractAddresses: string[]
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftContractMetadataByContracts", { contractAddresses });
    }

    public async getNftContractsByAccount(
        accountAddress: string,
        params?: PaginationParams & { contractAddresses?: string[] }
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftContractsByAccount", { accountAddress, ...params });
    }

    public async getNftHoldersByContract(
        contractAddress: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftHoldersByContract", { contractAddress, ...params });
    }

    public async getNftHoldersByTokenId(
        contractAddress: string,
        tokenId: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftHoldersByTokenId", { contractAddress, tokenId, ...params });
    }

    public async getNftMetadataByContract(
        contractAddress: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftMetadataByContract", { contractAddress, ...params });
    }

    public async getNftMetadataByTokenIds(
        tokens: NftToken[]
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftMetadataByTokenIds", { tokens });
    }

    public async getNftTransfersByAccount(
        accountAddress: string,
        params?: NftTransferParams & {
            relation?: string;
            contractAddresses?: string[];
        }
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftTransfersByAccount", { accountAddress, ...params });
    }

    public async getNftTransfersByContract(
        contractAddress: string,
        params?: NftTransferParams
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftTransfersByContract", { contractAddress, ...params });
    }

    public async getNftTransfersByTokenId(
        contractAddress: string,
        tokenId: string,
        params?: NftTransferParams
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftTransfersByTokenId", { contractAddress, tokenId, ...params });
    }

    public async getNftTransfersWithinRange(
        params?: NftTransferParams
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftTransfersWithinRange", params || {});
    }

    public async getNftsOwnedByAccount(
        accountAddress: string,
        params?: PaginationParams & {
            contractAddresses?: string[];
            withMetadata?: boolean;
        }
    ): Promise<ApiResponse> {
        return this.client.post("/nft/getNftsOwnedByAccount", { accountAddress, ...params });
    }

    public async searchNftContractMetadataByKeyword(
        keyword: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/nft/searchNftContractMetadataByKeyword", { keyword, ...params });
    }
}

// Token Service
class TokenService {
    constructor(private client: Client) {}

    public async getNativeBalanceByAccount(
        accountAddress: string
    ): Promise<ApiResponse> {
        return this.client.post("/native/getNativeBalanceByAccount", { accountAddress });
    }
    
    public async getTokenPricesByContracts(
        contractAddresses: string[],
        currency?: string
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokenPricesByContracts";
        const payload: any = { contractAddresses };
        if (currency) payload.currency = currency;
        return this.client.post(endpoint, payload);
    }

    public async getTokenTransfersByAccount(
        accountAddress: string,
        params?: TokenTransferParams & {
            relation?: string;
            contractAddresses?: string[];
        }
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokenTransfersByAccount";
        const payload = {
            accountAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }

    public async getTokenAllowance(
        contractAddress: string,
        ownerAddress: string,
        spenderAddress: string
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokenAllowance";
        return this.client.post(endpoint, {
            contractAddress,
            ownerAddress,
            spenderAddress
        });
    }

    public async getTokenContractMetadataByContracts(
        contractAddresses: string[]
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokenContractMetadataByContracts";
        return this.client.post(endpoint, { contractAddresses });
    }

    public async getTokenHoldersByContract(
        contractAddress: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokenHoldersByContract";
        const payload = {
            contractAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }

    public async getTokenTransfersByContract(
        contractAddress: string,
        params?: TokenTransferParams
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokenTransfersByContract";
        const payload = {
            contractAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }

    public async getTokenTransfersWithinRange(
        params?: TokenTransferParams & {
            withMetadata?: boolean;
            withZeroValue?: boolean;
        }
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokenTransfersWithinRange";
        return this.client.post(endpoint, params || {});
    }

    public async getTokensOwnedByAccount(
        accountAddress: string,
        params?: PaginationParams & {
            contractAddress?: string;
        }
    ): Promise<ApiResponse> {
        const endpoint = "/token/getTokensOwnedByAccount";
        const payload = {
            accountAddress,
            ...params
        };
        return this.client.post(endpoint, payload);
    }

    public async searchTokenContractMetadataByKeyword(
        keyword: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
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
    constructor(private client: Client) {}

    public async getAccountStats(
        address: string
    ): Promise<ApiResponse> {
        return this.client.post("/stats/getAccountStats", { address });
    }
}

// Blockchain Service
class BlockchainService {
    constructor(private client: Client) {}

    public async getBlockByHashOrNumber(
        block: string
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getBlockByHashOrNumber", { block });
    }

    public async getBlocksWithinRange(
        params?: PaginationParams & DateRangeParams & BlockRangeParams
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getBlocksWithinRange", params || {});
    }

    public async getGasPrice(): Promise<ApiResponse> {
        return this.client.post("/blockchain/getGasPrice", {});
    }

    public async getInternalTransactionsByAccount(
        accountAddress: string,
        params?: PaginationParams & {
            withZeroValue?: boolean;
            withExternalTransaction?: boolean;
        }
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getInternalTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }

    public async getNextNonceByAccount(
        accountAddress: string
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getNextNonceByAccount", { accountAddress });
    }

    public async getTransactionByHash(
        transactionHash: string,
        params?: TransactionParams
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getTransactionByHash", {
            transactionHash,
            ...params
        });
    }

    public async getTransactionsByAccount(
        accountAddress: string,
        params?: TransactionParams & DateRangeParams & BlockRangeParams & {
            relation?: string;
        }
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }

    public async getTransactionsByHashes(
        transactionHashes: string[],
        params?: TransactionParams
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getTransactionsByHashes", {
            transactionHashes,
            ...params
        });
    }

    public async getTransactionsInBlock(
        block: string,
        params?: TransactionParams
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/getTransactionsInBlock", {
            block,
            ...params
        });
    }

    public async isContract(
        address: string
    ): Promise<ApiResponse> {
        return this.client.post("/blockchain/isContract", { address });
    }

    public async searchEvents(
        contractAddress: string,
        eventNames: string[],
        abi: Record<string, any>,
        params?: PaginationParams & DateRangeParams & BlockRangeParams
    ): Promise<ApiResponse> {
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
    constructor(private client: Client) {}

    public async getChainId(): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_chainId"
        });
    }

    public async getBlockNumber(): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_blockNumber"
        });
    }

    public async getBalance(address: string, blockParameter: string = "latest"): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBalance",
            params: [address, blockParameter]
        });
    }

    public async call(transaction: any, blockParameter: string = "latest"): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_call",
            params: [transaction, blockParameter]
        });
    }

    public async createAccessList(transaction: any, blockParameter: string = "latest"): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_createAccessList",
            params: [transaction, blockParameter]
        });
    }

    public async estimateGas(transaction: any): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_estimateGas",
            params: [transaction]
        });
    }

    public async getFeeHistory(blockCount: string, newestBlock: string, rewardPercentiles: number[]): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_feeHistory",
            params: [blockCount, newestBlock, rewardPercentiles]
        });
    }

    public async getGasPrice(): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_gasPrice"
        });
    }

    public async getBlockByHash(hash: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockByHash",
            params: [hash, true]
        });
    }

    public async getBlockByNumber(number: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockByNumber",
            params: [number, true]
        });
    }

    public async getBlockReceipts(blockHash: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockReceipts",
            params: [blockHash]
        });
    }

    public async getTransactionByHash(hash: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionByHash",
            params: [hash]
        });
    }

    public async getTransactionByBlockHashAndIndex(blockHash: string, index: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionByBlockHashAndIndex",
            params: [blockHash, index]
        });
    }

    public async getTransactionByBlockNumberAndIndex(blockNumber: string, index: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionByBlockNumberAndIndex",
            params: [blockNumber, index]
        });
    }

    public async getTransactionReceipt(hash: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionReceipt",
            params: [hash]
        });
    }

    public async getTransactionCount(address: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getTransactionCount",
            params: [address, "latest"]
        });
    }

    public async getStorageAt(address: string, position: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getStorageAt",
            params: [address, position, "latest"]
        });
    }

    public async getCode(address: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getCode",
            params: [address, "latest"]
        });
    }

    public async getBlockTransactionCountByHash(hash: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockTransactionCountByHash",
            params: [hash]
        });
    }

    public async getBlockTransactionCountByNumber(number: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getBlockTransactionCountByNumber",
            params: [number]
        });
    }

    public async getFilterChanges(filterId: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getFilterChanges",
            params: [filterId]
        });
    }

    public async getFilterLogs(filterId: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getFilterLogs",
            params: [filterId]
        });
    }

    public async getLogs(filter: any): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getLogs",
            params: [filter]
        });
    }

    public async getProof(address: string, storageKeys: string[], blockParameter: string = "latest"): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_getProof",
            params: [address, storageKeys, blockParameter]
        });
    }

    public async getMaxPriorityFeePerGas(): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_maxPriorityFeePerGas"
        });
    }

    public async newBlockFilter(): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_newBlockFilter"
        });
    }

    public async newFilter(filter: any): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_newFilter",
            params: [filter]
        });
    }

    public async newPendingTransactionFilter(): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_newPendingTransactionFilter"
        });
    }

    public async sendRawTransaction(signedTransactionData: string): Promise<ApiResponse> {
        return this.client.postNode({
            id: 1,
            jsonrpc: "2.0",
            method: "kaia_sendRawTransaction",
            params: [signedTransactionData]
        });
    }

    public async uninstallFilter(filterId: string): Promise<ApiResponse> {
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
    private baseEndpoint: string;

    constructor(private client: Client, private network: string) {
        this.baseEndpoint = `/webhooks`;
    }

    public async getWebhooks(params: WebhookParams): Promise<ApiResponse> {
        return this.client.get(this.baseEndpoint, params);
    }

    public async createWebhook(
        eventType: WebhookEventType | string,
        webhookUrl: string,
        description: string,
        condition: WebhookCondition
    ): Promise<ApiResponse> {
        const payload: WebhookPayload = {
            eventType: typeof eventType === 'string' ? eventType : eventType,
            description,
            notification: { webhookUrl },
            condition
        };

        return this.client.post(this.baseEndpoint, payload);
    }

    public async createAddressActivityWebhook(
        webhookUrl: string,
        addresses: string[],
        description: string
    ): Promise<ApiResponse> {
        return this.createWebhook(
            WebhookEventType.ADDRESS_ACTIVITY,
            webhookUrl,
            description,
            { addresses }
        );
    }

    public async updateWebhook(
        webhookId: string,
        updates: WebhookUpdatePayload
    ): Promise<ApiResponse> {
        if (!webhookId) {
            throw new Error("webhookId is required");
        }
        return this.client.patch(`${this.baseEndpoint}/${webhookId}`, updates);
    }

    public async deleteWebhook(webhookId: string): Promise<ApiResponse> {
        if (!webhookId) {
            throw new Error("webhookId is required");
        }
        return this.client.delete(`${this.baseEndpoint}/${webhookId}`);
    }

    public async getWebhookHistory(params: WebhookHistoryParams): Promise<ApiResponse> {
        if (!params.subscriptionId) {
            throw new Error("subscriptionId is required");
        }

        const queryParams: Record<string, any> = { ...params };
        
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