import orchestrator from 'tests/orchestrator';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe('POST /api/v1/status', () => {
  describe('Anonymous user', () => {
    test('Retrieving current application status', async () => {
      const response = await fetch('http://localhost:3000/api/v1/status', {
        method: 'POST',
      });
      const responseBody = await response.json();

      expect(response.status).toBe(405);

      expect(responseBody).toEqual({
        name: 'MethodNowAllowedError',
        message: 'Método não permitido para este endpoint.',
        action: 'Verifique se o método HTTP enviado é válido para este endpoint.',
        status_code: 405,
      });
    });
  });
});
