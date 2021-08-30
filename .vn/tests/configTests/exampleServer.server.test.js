describe('Server-only test (collocated with code)', () => {
    // Since jsdom also has node definied, this test is more to be sure that server tests will run than to see that it isn't processed as a client.
    test('server-only test is run in a Node environment', () => {
        expect(process?.versions?.node).toBeDefined()
    })
    test('server-only test is NOT run in a JSDOM environment', () => {
        expect(typeof window).toBe('undefined')
    })
})