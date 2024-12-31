import KaiaNodit from '../src/KaiaNodit';

describe('NFT Service', () => {
    const apiKey = '2hBP536fq5~OXEK8-dmIn9u59c9YM13U';
    const sdk = new KaiaNodit(apiKey);
    
    // Add delay between tests to avoid rate limiting
    beforeEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    test('getNFTContractMetadataByContracts should return contract metadata list', async () => {
        const contractAddresses = [
            '0x8e4deb5c901ef81f43f6ca83a0fed5689cfdced3',
            '0x898f2afc07924f5a4f9612449e4c4f8eca527515'
        ];
        const response = await sdk.nft.getNftContractMetadataByContracts(contractAddresses);
        expect(response).toBeDefined();
        expect(Array.isArray(response)).toBeTruthy();
        expect(response.every((item: unknown) => typeof item === 'object')).toBeTruthy();
    });

    test('getNFTContractsByAccount should return contracts data', async () => {
        const accountAddress = '0xe06670f6852de86c19e8ece42062c2640ccad001';
        const response = await sdk.nft.getNftContractsByAccount(accountAddress);
        expect(response).toBeDefined();
    });

    test('getNFTHoldersByContract should return holders list', async () => {
        const contractAddress = '0x8e4deb5c901ef81f43f6ca83a0fed5689cfdced3';
        const response = await sdk.nft.getNftHoldersByContract(contractAddress);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getNFTTransfersByAccount should return transfers list', async () => {
        const accountAddress = '0xe06670f6852de86c19e8ece42062c2640ccad001';
        const response = await sdk.nft.getNftTransfersByAccount(accountAddress);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getNFTTransfersByContract should return transfers list', async () => {
        const contractAddress = '0x8e4deb5c901ef81f43f6ca83a0fed5689cfdced3';
        const response = await sdk.nft.getNftTransfersByContract(contractAddress);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getNFTTransfersWithinRange should return transfers list', async () => {
        const params = {
            fromBlock: '0',
            toBlock: 'latest'
        };
        const response = await sdk.nft.getNftTransfersWithinRange(params);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });

    test('getNFTsOwnedByAccount should return NFTs list', async () => {
        const accountAddress = '0xc30dffb7eaeda1bf31344f902d2e2b5938553a35';
        const params = {
            rpp: 5
        };
        const response = await sdk.nft.getNftsOwnedByAccount(accountAddress, params);
        expect(response).toBeDefined();
        expect(Array.isArray(response.items)).toBeTruthy();
    });
}); 