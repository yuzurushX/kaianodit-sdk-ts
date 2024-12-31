import KaiaNodit from '../src/KaiaNodit';

describe('Blockchain Service', () => {
    const apiKey = '2hBP536fq5~OXEK8-dmIn9u59c9YM13U';
    const sdk = new KaiaNodit(apiKey);
    
    // Add delay between tests to avoid rate limiting
    beforeEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getBlockByHashOrNumber should return block data', async () => {
        const block = '172435500';
        const response = await sdk.blockchain.getBlockByHashOrNumber(block);
        expect(response).toBeDefined();
    });

    test('getBlocksWithinRange should return blocks list', async () => {
        const params = {
            fromBlock: '17000000',
            toBlock: '17000010',
            page: 1,
            rpp: 10
        };
        const response = await sdk.blockchain.getBlocksWithinRange(params);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getGasPrice should return gas price data', async () => {
        const response = await sdk.blockchain.getGasPrice();
        expect(response).toBeDefined();
    });

    test('getNextNonceByAccount should return nonce', async () => {
        const accountAddress = '0x9a50fe055837203a34ed4124dbf6242292a6721f';
        const response = await sdk.blockchain.getNextNonceByAccount(accountAddress);
        expect(response).toBeDefined();
    });

    test('getTransactionByHash should return transaction data', async () => {
        const txHash = '0x8c9486689a8780eca3252854a2b936f2462cb5ea43df80c1e7a928f55969a538';
        const response = await sdk.blockchain.getTransactionByHash(txHash);
        expect(response).toBeDefined();
    });

    test('getTransactionsByAccount should return transactions list', async () => {
        const accountAddress = '0x9a50fe055837203a34ed4124dbf6242292a6721f';
        const params = {
            page: 1,
            rpp: 10
        };
        const response = await sdk.blockchain.getTransactionsByAccount(accountAddress, params);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getTransactionsInBlock should return transactions list', async () => {
        const block = '172435500';
        const params = {
            page: 1,
            rpp: 10
        };
        const response = await sdk.blockchain.getTransactionsInBlock(block, params);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('isContract should return contract status', async () => {
        const address = '0x0f58d0abaae2f586b0d3b6d045305463e89ba603';
        const response = await sdk.blockchain.isContract(address);
        expect(response).toBeDefined();
    });
}); 