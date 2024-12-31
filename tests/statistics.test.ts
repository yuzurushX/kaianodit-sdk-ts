import KaiaNodit from '../src/KaiaNodit';

describe('Statistics Service', () => {
    const apiKey = '2hBP536fq5~OXEK8-dmIn9u59c9YM13U';
    const sdk = new KaiaNodit(apiKey);
    
    // Add delay between tests to avoid rate limiting
    beforeEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getAccountStats should return account statistics', async () => {
        const accountAddress = '0x9a50fe055837203a34ed4124dbf6242292a6721f';
        const response = await sdk.statistics.getAccountStats(accountAddress);
        expect(response).toBeDefined();
    });
});
