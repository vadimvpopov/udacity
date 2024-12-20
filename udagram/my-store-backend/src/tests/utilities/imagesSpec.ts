//import getConversedFile from '../../utilities/images';
/*
describe('Images conversion testsuite', () => {
    it('check normal scenario', async () => {
        const filename = 'fjord';
        const width = 150;
        const height = 150;
        const covnersedFile = await getConversedFile(filename, width, height);
        expect(covnersedFile).toBeTruthy();
    });
    it('check scenario with missing width', async () => {
        const filename = 'fjord';
        const height = 150;
        await expectAsync(
            getConversedFile(filename, undefined as unknown as number, height)
        ).toBeRejected();
    });
    it('check scenario with missing height', async () => {
        const filename = 'fjord';
        const width = 200;
        await expectAsync(
            getConversedFile(filename, width, undefined as unknown as number)
        ).toBeRejected();
    });
    it('check scenario with missing filename', async () => {
        const width = 200;
        const height = 200;
        await expectAsync(
            getConversedFile(undefined as unknown as string, width, height)
        ).toBeRejected();
    });
    it('check scenario with wrong width', async () => {
        const filename = 'fjord';
        const negWidth = -150;
        const height = 150;
        await expectAsync(getConversedFile(filename, negWidth, height)).toBeRejected();
    });
    it('check scenario with wrong height', async () => {
        const filename = 'fjord';
        const width = 200;
        const negHeight = -160;
        await expectAsync(getConversedFile(filename, width, negHeight)).toBeRejected();
    });
});
*/