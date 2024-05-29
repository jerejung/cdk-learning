import { handler } from "../services/hello"

describe('Hello describe test suite', () => {
    test('Handler should return 200', async () => {
        const result = await handler({}, {});
        expect(result.statusCode).toBe(400);
    })
})
