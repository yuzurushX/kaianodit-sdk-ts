export interface ApiResponse {
    [key: string]: any;
}
export interface PaginationParams {
    page?: number;
    rpp?: number;
    cursor?: string;
    withCount?: boolean;
}
export interface DateRangeParams {
    fromDate?: string;
    toDate?: string;
}
export interface BlockRangeParams {
    fromBlock?: string;
    toBlock?: string;
}
export interface TokenTransferParams extends PaginationParams, DateRangeParams, BlockRangeParams {
    withZeroValue?: boolean;
    withMetadata?: boolean;
}
export interface NftTransferParams extends PaginationParams, DateRangeParams, BlockRangeParams {
    withMetadata?: boolean;
}
export interface TransactionParams extends PaginationParams {
    withLogs?: boolean;
    withDecode?: boolean;
}
export interface NftToken {
    contractAddress: string;
    tokenId: string;
}
export declare enum WebhookEventType {
    ADDRESS_ACTIVITY = "ADDRESS_ACTIVITY",
    MINED_TRANSACTION = "MINED_TRANSACTION",
    SUCCESSFUL_TRANSACTION = "SUCCESSFUL_TRANSACTION",
    FAILED_TRANSACTION = "FAILED_TRANSACTION",
    TOKEN_TRANSFER = "TOKEN_TRANSFER",
    BELOW_THRESHOLD_BALANCE = "BELOW_THRESHOLD_BALANCE",
    BLOCK_PERIOD = "BLOCK_PERIOD",
    BLOCK_LIST_CALLER = "BLOCK_LIST_CALLER",
    ALLOW_LIST_CALLER = "ALLOW_LIST_CALLER",
    LOG = "LOG"
}
export declare enum WebhookStatus {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL"
}
export interface WebhookNotification {
    webhookUrl: string;
}
export interface WebhookPayload {
    eventType: WebhookEventType | string;
    description: string;
    notification: WebhookNotification;
    condition: Record<string, any>;
}
export interface WebhookUpdatePayload {
    notification?: WebhookNotification;
    description?: string;
    isActive?: boolean;
    condition?: Record<string, any>;
}
export interface WebhookHistoryParams {
    subscriptionId: string;
    page?: number;
    rpp?: number;
    withEventMessage?: boolean;
    status?: WebhookStatus | string;
    startAt?: Date | string;
    endAt?: Date | string;
    startSequenceNumber?: string;
}
export interface WebhookCondition {
    addresses?: string[];
    tokens?: Array<{
        contractAddress: string;
    }>;
    address?: string;
    belowThresholdBalance?: string;
    period?: number;
    blockListCallers?: string[];
    allowListCallers?: string[];
    topics?: string[];
}
export interface WebhookParams {
    page?: number;
    rpp?: number;
    subscriptionId: string;
}
