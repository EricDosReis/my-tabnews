import database from 'infra/database';

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseMaxConnectionsResult = await database.query('SHOW max_connections;');
  const databaseMaxConnections = databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: 'SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName],
  });
  const databaseOpenedConnections = databaseOpenedConnectionsResult.rows[0].count;

  const databaseVersionResult = await database.query('SHOW server_version;');
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  response.status(200).json({
    dependencies: {
      database: {
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: databaseOpenedConnections,
        version: databaseVersion,
      },
    },
    updated_at: updatedAt,
  });
}

export default status;
