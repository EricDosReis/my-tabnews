import useSWR from 'swr';

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>

      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR('/api/v1/status', fetchAPI, {
    refreshInterval: 3000,
  });

  if (!isLoading && data) {
    return (
      <p>
        <b>Última atualização:</b> {new Date(data.updated_at).toLocaleDateString()}
      </p>
    );
  }

  return (
    <p>
      <b>Última atualização:</b> Carregando...
    </p>
  );
}

function DatabaseStatus() {
  const { data, isLoading } = useSWR('/api/v1/status', fetchAPI, {
    refreshInterval: 3000,
  });

  if (!isLoading && data) {
    return (
      <>
        <h2>Banco de dados</h2>

        <p>
          <b>Máximo de conexões:</b> {data.dependencies.database.max_connections}
          <br />
          <b>Conexões abertas:</b> {data.dependencies.database.opened_connections}
          <br />
          <b>Versão:</b> {data.dependencies.database.version}
        </p>
      </>
    );
  }

  return (
    <>
      <h2>Banco de dados</h2>

      <p>Carregando...</p>
    </>
  );
}
