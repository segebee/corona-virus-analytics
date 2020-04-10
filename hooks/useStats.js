import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export default function(url) {
  const defaultState = {
    confirmed: {
      value: 0
    },
    recovered: {
      value: 0
    },
    deaths: {
      value: 0
    }
  };

  const [stats, setStats] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const data = await fetch(url).then(res => res.json());
      setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, [url]);

  return { stats, loading };
}
