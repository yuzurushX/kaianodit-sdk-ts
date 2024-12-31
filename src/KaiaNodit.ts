import axios from 'axios';
import {
    ApiResponse,
    PaginationParams,
    DateRangeParams,
    BlockRangeParams,
    TransactionParams,
    TokenTransferParams,
    NftTransferParams,
    NftToken
} from './types';

 class KaiaNodit {
    private client: Client;
    public nft: NFTService;
    public token: TokenService;
    public statistics: StatisticsService;
    public blockchain: BlockchainService;

    constructor(apiKey: string, baseUrl: string = 'https://web3.nodit.io') {
        this.client = new Client(apiKey, baseUrl);
        this.nft = new NFTService(this.client);
        this.token = new TokenService(this.client);
        this.statistics = new StatisticsService(this.client);
        this.blockchain = new BlockchainService(this.client);
    }
}

// Internal Client class
class Client {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, baseUrl: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public async post(endpoint: string, payload: any): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}${endpoint}`, payload, {
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
        return this.client.post("/v1/kaia/mainnet/nft/getNftContractMetadataByContracts", { contractAddresses });
    }

    public async getNftContractsByAccount(
        accountAddress: string,
        params?: PaginationParams & { contractAddresses?: string[] }
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftContractsByAccount", { accountAddress, ...params });
    }

    public async getNftHoldersByContract(
        contractAddress: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftHoldersByContract", { contractAddress, ...params });
    }

    public async getNftHoldersByTokenId(
        contractAddress: string,
        tokenId: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftHoldersByTokenId", { contractAddress, tokenId, ...params });
    }

    public async getNftMetadataByContract(
        contractAddress: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftMetadataByContract", { contractAddress, ...params });
    }

    public async getNftMetadataByTokenIds(
        tokens: NftToken[]
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftMetadataByTokenIds", { tokens });
    }

    public async getNftTransfersByAccount(
        accountAddress: string,
        params?: NftTransferParams & {
            relation?: string;
            contractAddresses?: string[];
        }
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersByAccount", { accountAddress, ...params });
    }

    public async getNftTransfersByContract(
        contractAddress: string,
        params?: NftTransferParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersByContract", { contractAddress, ...params });
    }

    public async getNftTransfersByTokenId(
        contractAddress: string,
        tokenId: string,
        params?: NftTransferParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersByTokenId", { contractAddress, tokenId, ...params });
    }

    public async getNftTransfersWithinRange(
        params?: NftTransferParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftTransfersWithinRange", params || {});
    }

    public async getNftsOwnedByAccount(
        accountAddress: string,
        params?: PaginationParams & {
            contractAddresses?: string[];
            withMetadata?: boolean;
        }
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/getNftsOwnedByAccount", { accountAddress, ...params });
    }

    public async searchNftContractMetadataByKeyword(
        keyword: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/nft/searchNftContractMetadataByKeyword", { keyword, ...params });
    }
}

// Token Service
class TokenService {
    constructor(private client: Client) {}

    public async getNativeBalanceByAccount(
        accountAddress: string
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/native/getNativeBalanceByAccount", { accountAddress });
    }
    
    public async getTokenPricesByContracts(
        contractAddresses: string[],
        currency?: string
    ): Promise<ApiResponse> {
        const endpoint = "/v1/kaia/mainnet/token/getTokenPricesByContracts";
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
        const endpoint = "/v1/kaia/mainnet/token/getTokenTransfersByAccount";
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
        const endpoint = "/v1/kaia/mainnet/token/getTokenAllowance";
        return this.client.post(endpoint, {
            contractAddress,
            ownerAddress,
            spenderAddress
        });
    }

    public async getTokenContractMetadataByContracts(
        contractAddresses: string[]
    ): Promise<ApiResponse> {
        const endpoint = "/v1/kaia/mainnet/token/getTokenContractMetadataByContracts";
        return this.client.post(endpoint, { contractAddresses });
    }

    public async getTokenHoldersByContract(
        contractAddress: string,
        params?: PaginationParams
    ): Promise<ApiResponse> {
        const endpoint = "/v1/kaia/mainnet/token/getTokenHoldersByContract";
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
        const endpoint = "/v1/kaia/mainnet/token/getTokenTransfersByContract";
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
        const endpoint = "/v1/kaia/mainnet/token/getTokenTransfersWithinRange";
        return this.client.post(endpoint, params || {});
    }

    public async getTokensOwnedByAccount(
        accountAddress: string,
        params?: PaginationParams & {
            contractAddress?: string;
        }
    ): Promise<ApiResponse> {
        const endpoint = "/v1/kaia/mainnet/token/getTokensOwnedByAccount";
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
    constructor(private client: Client) {}

    public async getAccountStats(
        address: string
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/stats/getAccountStats", { address });
    }
}

// Blockchain Service
class BlockchainService {
    constructor(private client: Client) {}

    public async getBlockByHashOrNumber(
        block: string
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getBlockByHashOrNumber", { block });
    }

    public async getBlocksWithinRange(
        params?: PaginationParams & DateRangeParams & BlockRangeParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getBlocksWithinRange", params || {});
    }

    public async getGasPrice(): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getGasPrice", {});
    }

    public async getInternalTransactionsByAccount(
        accountAddress: string,
        params?: PaginationParams & {
            withZeroValue?: boolean;
            withExternalTransaction?: boolean;
        }
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getInternalTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }

    public async getNextNonceByAccount(
        accountAddress: string
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getNextNonceByAccount", { accountAddress });
    }

    public async getTransactionByHash(
        transactionHash: string,
        params?: TransactionParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionByHash", {
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
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionsByAccount", {
            accountAddress,
            ...params
        });
    }

    public async getTransactionsByHashes(
        transactionHashes: string[],
        params?: TransactionParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionsByHashes", {
            transactionHashes,
            ...params
        });
    }

    public async getTransactionsInBlock(
        block: string,
        params?: TransactionParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/getTransactionsInBlock", {
            block,
            ...params
        });
    }

    public async isContract(
        address: string
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/isContract", { address });
    }

    public async searchEvents(
        contractAddress: string,
        eventNames: string[],
        abi: Record<string, any>,
        params?: PaginationParams & DateRangeParams & BlockRangeParams
    ): Promise<ApiResponse> {
        return this.client.post("/v1/kaia/mainnet/blockchain/searchEvents", {
            contractAddress,
            eventNames,
            abi,
            ...params
        });
    }
}

export default KaiaNodit;  