import { ApiResponse, PaginationParams, DateRangeParams, BlockRangeParams, TransactionParams, TokenTransferParams, NftTransferParams, NftToken, WebhookEventType, WebhookUpdatePayload, WebhookHistoryParams, WebhookCondition, WebhookParams } from './types';
declare class KaiaNodit {
    private client;
    private nodeClient;
    nft: NFTService;
    token: TokenService;
    statistics: StatisticsService;
    blockchain: BlockchainService;
    node: NodeService;
    webhook: WebhookService;
    constructor(apiKey: string, network?: string, baseUrl?: string);
}
declare class Client {
    private apiKey;
    private baseUrl;
    private network;
    constructor(apiKey: string, baseUrl: string, network: string);
    post(endpoint: string, payload: any): Promise<any>;
    postNode(payload: any): Promise<any>;
    get(endpoint: string, params: any): Promise<ApiResponse>;
    patch(endpoint: string, payload: any): Promise<ApiResponse>;
    delete(endpoint: string): Promise<ApiResponse>;
}
declare class NFTService {
    private client;
    constructor(client: Client);
    getNftContractMetadataByContracts(contractAddresses: string[]): Promise<ApiResponse>;
    getNftContractsByAccount(accountAddress: string, params?: PaginationParams & {
        contractAddresses?: string[];
    }): Promise<ApiResponse>;
    getNftHoldersByContract(contractAddress: string, params?: PaginationParams): Promise<ApiResponse>;
    getNftHoldersByTokenId(contractAddress: string, tokenId: string, params?: PaginationParams): Promise<ApiResponse>;
    getNftMetadataByContract(contractAddress: string, params?: PaginationParams): Promise<ApiResponse>;
    getNftMetadataByTokenIds(tokens: NftToken[]): Promise<ApiResponse>;
    getNftTransfersByAccount(accountAddress: string, params?: NftTransferParams & {
        relation?: string;
        contractAddresses?: string[];
    }): Promise<ApiResponse>;
    getNftTransfersByContract(contractAddress: string, params?: NftTransferParams): Promise<ApiResponse>;
    getNftTransfersByTokenId(contractAddress: string, tokenId: string, params?: NftTransferParams): Promise<ApiResponse>;
    getNftTransfersWithinRange(params?: NftTransferParams): Promise<ApiResponse>;
    getNftsOwnedByAccount(accountAddress: string, params?: PaginationParams & {
        contractAddresses?: string[];
        withMetadata?: boolean;
    }): Promise<ApiResponse>;
    searchNftContractMetadataByKeyword(keyword: string, params?: PaginationParams): Promise<ApiResponse>;
}
declare class TokenService {
    private client;
    constructor(client: Client);
    getNativeBalanceByAccount(accountAddress: string): Promise<ApiResponse>;
    getTokenPricesByContracts(contractAddresses: string[], currency?: string): Promise<ApiResponse>;
    getTokenTransfersByAccount(accountAddress: string, params?: TokenTransferParams & {
        relation?: string;
        contractAddresses?: string[];
    }): Promise<ApiResponse>;
    getTokenAllowance(contractAddress: string, ownerAddress: string, spenderAddress: string): Promise<ApiResponse>;
    getTokenContractMetadataByContracts(contractAddresses: string[]): Promise<ApiResponse>;
    getTokenHoldersByContract(contractAddress: string, params?: PaginationParams): Promise<ApiResponse>;
    getTokenTransfersByContract(contractAddress: string, params?: TokenTransferParams): Promise<ApiResponse>;
    getTokenTransfersWithinRange(params?: TokenTransferParams & {
        withMetadata?: boolean;
        withZeroValue?: boolean;
    }): Promise<ApiResponse>;
    getTokensOwnedByAccount(accountAddress: string, params?: PaginationParams & {
        contractAddress?: string;
    }): Promise<ApiResponse>;
    searchTokenContractMetadataByKeyword(keyword: string, params?: PaginationParams): Promise<ApiResponse>;
}
declare class StatisticsService {
    private client;
    constructor(client: Client);
    getAccountStats(address: string): Promise<ApiResponse>;
}
declare class BlockchainService {
    private client;
    constructor(client: Client);
    getBlockByHashOrNumber(block: string): Promise<ApiResponse>;
    getBlocksWithinRange(params?: PaginationParams & DateRangeParams & BlockRangeParams): Promise<ApiResponse>;
    getGasPrice(): Promise<ApiResponse>;
    getInternalTransactionsByAccount(accountAddress: string, params?: PaginationParams & {
        withZeroValue?: boolean;
        withExternalTransaction?: boolean;
    }): Promise<ApiResponse>;
    getNextNonceByAccount(accountAddress: string): Promise<ApiResponse>;
    getTransactionByHash(transactionHash: string, params?: TransactionParams): Promise<ApiResponse>;
    getTransactionsByAccount(accountAddress: string, params?: TransactionParams & DateRangeParams & BlockRangeParams & {
        relation?: string;
    }): Promise<ApiResponse>;
    getTransactionsByHashes(transactionHashes: string[], params?: TransactionParams): Promise<ApiResponse>;
    getTransactionsInBlock(block: string, params?: TransactionParams): Promise<ApiResponse>;
    isContract(address: string): Promise<ApiResponse>;
    searchEvents(contractAddress: string, eventNames: string[], abi: Record<string, any>, params?: PaginationParams & DateRangeParams & BlockRangeParams): Promise<ApiResponse>;
}
declare class NodeService {
    private client;
    constructor(client: Client);
    getChainId(): Promise<ApiResponse>;
    getBlockNumber(): Promise<ApiResponse>;
    getBalance(address: string, blockParameter?: string): Promise<ApiResponse>;
    call(transaction: any, blockParameter?: string): Promise<ApiResponse>;
    createAccessList(transaction: any, blockParameter?: string): Promise<ApiResponse>;
    estimateGas(transaction: any): Promise<ApiResponse>;
    getFeeHistory(blockCount: string, newestBlock: string, rewardPercentiles: number[]): Promise<ApiResponse>;
    getGasPrice(): Promise<ApiResponse>;
    getBlockByHash(hash: string): Promise<ApiResponse>;
    getBlockByNumber(number: string): Promise<ApiResponse>;
    getBlockReceipts(blockHash: string): Promise<ApiResponse>;
    getTransactionByHash(hash: string): Promise<ApiResponse>;
    getTransactionByBlockHashAndIndex(blockHash: string, index: string): Promise<ApiResponse>;
    getTransactionByBlockNumberAndIndex(blockNumber: string, index: string): Promise<ApiResponse>;
    getTransactionReceipt(hash: string): Promise<ApiResponse>;
    getTransactionCount(address: string): Promise<ApiResponse>;
    getStorageAt(address: string, position: string): Promise<ApiResponse>;
    getCode(address: string): Promise<ApiResponse>;
    getBlockTransactionCountByHash(hash: string): Promise<ApiResponse>;
    getBlockTransactionCountByNumber(number: string): Promise<ApiResponse>;
    getFilterChanges(filterId: string): Promise<ApiResponse>;
    getFilterLogs(filterId: string): Promise<ApiResponse>;
    getLogs(filter: any): Promise<ApiResponse>;
    getProof(address: string, storageKeys: string[], blockParameter?: string): Promise<ApiResponse>;
    getMaxPriorityFeePerGas(): Promise<ApiResponse>;
    newBlockFilter(): Promise<ApiResponse>;
    newFilter(filter: any): Promise<ApiResponse>;
    newPendingTransactionFilter(): Promise<ApiResponse>;
    sendRawTransaction(signedTransactionData: string): Promise<ApiResponse>;
    uninstallFilter(filterId: string): Promise<ApiResponse>;
}
declare class WebhookService {
    private client;
    private network;
    private baseEndpoint;
    constructor(client: Client, network: string);
    getWebhooks(params: WebhookParams): Promise<ApiResponse>;
    createWebhook(eventType: WebhookEventType | string, webhookUrl: string, description: string, condition: WebhookCondition): Promise<ApiResponse>;
    createAddressActivityWebhook(webhookUrl: string, addresses: string[], description: string): Promise<ApiResponse>;
    updateWebhook(webhookId: string, updates: WebhookUpdatePayload): Promise<ApiResponse>;
    deleteWebhook(webhookId: string): Promise<ApiResponse>;
    getWebhookHistory(params: WebhookHistoryParams): Promise<ApiResponse>;
}
export default KaiaNodit;
