import { useCallback, useEffect, useState } from "react";

export function useGetNewsfeed() {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchIds() {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://hacker-news.firebaseio.com/v0/newstories.json"
        );

        const data = await res.json();

        setData(data.slice(0, 100));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIds();

    const interval = setInterval(() => {
      fetchIds();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      );

      const data = await res.json();

      setData(data.slice(0, 100));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    loading: isLoading,
    refetch,
  };
}
