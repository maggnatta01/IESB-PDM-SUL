const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL;

function getApiUrl(path) {
  if (!configuredApiUrl) {
    throw new Error('Configure EXPO_PUBLIC_API_URL no arquivo .env.');
  }

  try {
    const baseUrl = new URL(configuredApiUrl);
    return new URL(path.replace(/^\/+/, ''), baseUrl.toString().endsWith('/') ? baseUrl : `${baseUrl}/`);
  } catch (error) {
    throw new Error('EXPO_PUBLIC_API_URL não contém uma URL válida.', { cause: error });
  }
}

async function request(path, options) {
  const url = getApiUrl(path);
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error('Não foi possível conectar ao serviço de avisos. Verifique sua conexão.', {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new Error(`O serviço respondeu com erro HTTP ${response.status}.`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('O serviço retornou uma resposta inválida.', { cause: error });
  }
}

const api = {
  getNotices() {
    return request('posts?_limit=10');
  },

  create(resource, data) {
    return request(resource, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};

export default api;
