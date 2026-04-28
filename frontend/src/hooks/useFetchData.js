import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Generic data-fetching hook.
 *
 * @param {string} url - API endpoint
 * @returns {{ data: any, loading: boolean, error: string|null }}
 */
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        if (!cancelled) setData(res.data.data);
      } catch (err) {
        if (!cancelled) setError(err.message);
        console.error(`Error fetching ${url}:`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
