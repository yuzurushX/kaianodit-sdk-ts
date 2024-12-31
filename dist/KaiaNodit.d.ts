import { ApiResponse, PaginationParams, DateRangeParams, BlockRangeParams, TransactionParams, TokenTransferParams, NftTransferParams, NftToken } from './types';
declare class KaiaNodit {
    private client;
    nft: NFTService;
    token: TokenService;
    statistics: StatisticsService;
    blockchain: BlockchainService;
    constructor(apiKey: string, baseUrl?: string);
}
declare class Client {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string, baseUrl: string);
    post(endpoint: string, payload: any): Promise<any>;
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
export { KaiaNodit };
export default KaiaNodit;
