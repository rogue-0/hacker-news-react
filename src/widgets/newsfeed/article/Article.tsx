import { useEffect, useState } from "react";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { ContentCard } from "@vkontakte/vkui";

import { formatDate } from "../../../shared/utils/formatDate";
import { Story } from "../../../shared/types";

import styles from "./Article.module.css";

export function Article({ id }: { id: string }) {
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    async function fetchStory(id: string) {
      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        const story = await res.json();

        setStory(story);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStory(id);
  }, [id]);

  if (isLoading) {
    return <ContentCard className={styles.skeleton} />;
  }

  if (!story) {
    return null;
  }

  const formattedDate = formatDate(story.time);

  return (
    <ContentCard
      onClick={() => routeNavigator.push(`/${id}`)}
      subtitle={`by ${story.by} on ${formattedDate}`}
      header={story.title}
      caption={`score: ${story.score}`}
    />
  );
}
