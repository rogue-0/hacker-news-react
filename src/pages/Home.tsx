import { useEffect, useState } from "react";

import { PanelHeader, Group, Spinner, CardGrid } from "@vkontakte/vkui";

import Article from "../entities/Article/Article";

export default function Home() {
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchIds() {
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
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
      {isLoading ? (
        <Spinner />
      ) : (
        <Group style={{ width: "800px" }}>
          <CardGrid size="l">
            {ids.map((id) => {
              return <Article key={id} id={id} />;
            })}
          </CardGrid>
        </Group>
      )}
    </>
  );
}
