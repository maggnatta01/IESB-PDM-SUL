import { useCallback, useEffect, useRef, useState } from 'react';
import api from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await api.getNotices();
      if (!Array.isArray(results)) {
        throw new Error('O serviço retornou uma lista de avisos inválida.');
      }
      if (isMounted.current) setNotices(results);
    } catch (requestError) {
      console.error('Não foi possível carregar os avisos.', requestError);
      if (isMounted.current) {
        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os avisos.');
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    reload();

    return () => {
      isMounted.current = false;
    };
  }, [reload]);

  return { notices, isLoading, error, reload };
}
