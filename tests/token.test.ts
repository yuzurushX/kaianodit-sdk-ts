import KaiaNodit from '../src/KaiaNodit';

describe('Token Service', () => {
    const apiKey = '2hBP536fq5~OXEK8-dmIn9u59c9YM13U';
    const sdk = new KaiaNodit(apiKey);
    
    // Add delay between tests to avoid rate limiting
    beforeEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getNativeBalanceByAccount should return balance data', async () => {
        const accountAddress = '0x9a50fe055837203a34ed4124dbf6242292a6721f';
        const response = await sdk.token.getNativeBalanceByAccount(accountAddress);
        expect(response).toBeDefined();
    });

    test('getTokenTransfersByContract should return transfers data', async () => {
        const contractAddress = '0x0f58d0abaae2f586b0d3b6d045305463e89ba603';
        const response = await sdk.token.getTokenTransfersByContract(contractAddress);
        expect(response).toBeDefined();
    });

    test('getTokenTransfersByAccount should return transfers list', async () => {
        const accountAddress = '0x9a50fe055837203a34ed4124dbf6242292a6721f';
        const response = await sdk.token.getTokenTransfersByAccount(accountAddress);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getTokenContractMetadataByContracts should return metadata list', async () => {
        const contractAddresses = [
            '0x0f58d0abaae2f586b0d3b6d045305463e89ba603',
            '0x754288077d0ff82af7a5317c7cb8c444d421d103'
        ];
        const response = await sdk.token.getTokenContractMetadataByContracts(contractAddresses);
        expect(response).toBeDefined();
        expect(Array.isArray(response)).toBeTruthy();
        expect(response.every((item: unknown) => typeof item === 'object')).toBeTruthy();
    });

    test('getTokenHoldersByContract should return holders list', async () => {
        const contractAddress = '0x0f58d0abaae2f586b0d3b6d045305463e89ba603';
        const response = await sdk.token.getTokenHoldersByContract(contractAddress);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getTokensOwnedByAccount should return tokens list', async () => {
        const accountAddress = '0x9a50fe055837203a34ed4124dbf6242292a6721f';
        const response = await sdk.token.getTokensOwnedByAccount(accountAddress);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });
});
