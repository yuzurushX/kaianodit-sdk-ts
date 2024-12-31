export interface ApiResponse {
   [key: string]: any;
};

export interface PaginationParams {
   page?: number;
   rpp?: number;
   cursor?: string;
   withCount?: boolean;
};

export interface DateRangeParams {
   fromDate?: string;
   toDate?: string;
};

export interface BlockRangeParams {
   fromBlock?: string;
   toBlock?: string;
};

export interface TokenTransferParams extends PaginationParams, DateRangeParams, BlockRangeParams {
   withZeroValue?: boolean;
   withMetadata?: boolean;
};

export interface NftTransferParams extends PaginationParams, DateRangeParams, BlockRangeParams {
   withMetadata?: boolean;
};  

export interface TransactionParams extends PaginationParams {
   withLogs?: boolean;
   withDecode?: boolean;
};

export interface NftToken {
    contractAddress: string;
    tokenId: string;
};