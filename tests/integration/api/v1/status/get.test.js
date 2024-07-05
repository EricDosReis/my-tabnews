import orchestrator from 'tests/orchestrator';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test('GET to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status');
  const responseBody = await response.json();

  expect(response.status).toBe(200);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
  expect(responseBody.dependencies.database.version).toBe('16.0');
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);
});
