import { useEffect, useMemo, useState } from "react";

import {
  CardGrid,
  Group,
  Header,
  Headline,
  Link,
  PanelHeader,
  SimpleCell,
  Spacing,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { useParams } from "@vkontakte/vk-mini-apps-router";

import Comment from "../entities/Comment/Comment";

import { Story } from "../shared/types/Story";
import { formatDate } from "../shared/utils/formatDate";

export default function News() {
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams<"id">();

  useEffect(() => {
    async function fetchStory(id: string | undefined) {
      if (!id) {
        return;
      }

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

    fetchStory(params?.id);
  }, [params?.id]);

  const commentsSectionHeader = useMemo(
    () => <Header mode="secondary">{story?.descendants} comments</Header>,
    [story?.descendants]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!story) {
    return null;
  }

  const formattedDate = formatDate(story.time);

  return (
    <>
      <PanelHeader>Hacker News VK</PanelHeader>
      <Group style={{ width: "800px" }}>
        <SimpleCell>
          <Headline level="1">{`by ${story.by} on ${formattedDate}`}</Headline>
          <Spacing />

          <Title level="1">
            {story.title}&nbsp;(
            <Link href={story.url} target="_blank">
              {story.url}
            </Link>
            )
          </Title>
        </SimpleCell>
      </Group>
      <Group style={{ width: "800px" }} header={commentsSectionHeader}>
        <CardGrid size="l">
          {story.kids.map((commentId) => {
            return <Comment key={commentId} id={commentId} />;
          })}
        </CardGrid>
      </Group>
    </>
  );
}
