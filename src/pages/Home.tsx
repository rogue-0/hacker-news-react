import { useCallback, useEffect, useState } from "react";

import { PanelHeader, Group, Spinner, CardGrid, Button } from "@vkontakte/vkui";

import Article from "../entities/Article/Article";

export default function Home() {
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchIds() {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://hacker-news.firebaseio.com/v0/newstories.json"
        );

        const ids = await res.json();

        setIds(ids.slice(0, 100));
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

  const refreshNewsfeed = useCallback(() => {
    async function fetchIds() {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://hacker-news.firebaseio.com/v0/newstories.json"
        );

        const ids = await res.json();

        setIds(ids.slice(0, 100));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIds();
  }, []);

  return (
    <>
      <PanelHeader>Hacker News VK</PanelHeader>
      <Group mode="plain" style={{ width: "800px" }}>
        <Button
          size="m"
          stretched
          onClick={refreshNewsfeed}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Refresh comments"}
        </Button>
      </Group>
      <Group style={{ width: "800px" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <CardGrid size="l">
            {ids.map((id) => {
              return <Article key={id} id={id} />;
            })}
          </CardGrid>
        )}
      </Group>
    </>
  );
}
