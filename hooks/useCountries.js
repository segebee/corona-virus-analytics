import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export default function(url) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      const data = await fetch(url).then(res => res.json());
      setCountries(data.countries);
      setLoading(false);
    }
    fetchCountries();
  }, [url]);

  return { countries, loading };
}
