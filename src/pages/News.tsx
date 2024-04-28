import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Button,
  CardGrid,
  Div,
  Group,
  Header,
  Headline,
  Link,
  PanelHeader,
  Spacing,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import Comment from "../entities/Comment/Comment";

import { Story } from "../shared/types/Story";
import { formatDate } from "../shared/utils/formatDate";

export type Comments = {
  comments: number[];
  total: number;
};

export default function News() {
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [comments, setComments] = useState<Comments>({
    comments: [],
    total: 0,
  });
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  const params = useParams<"id">();
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    async function fetchStory(id: string | undefined) {
      if (!id) {
        return;
      }

      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        const story: Story = await res.json();

        setStory(story);
        setComments({ comments: story.kids ?? [], total: story.descendants });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsCommentsLoading(false);
      }
    }

    fetchStory(params?.id);
  }, [params?.id]);

  const commentsSectionHeader = useMemo(
    () => <Header mode="secondary">{comments.total} comments</Header>,
    [story?.descendants]
  );

  const refreshComments = useCallback(() => {
    async function fetchStory(id: string | undefined) {
      if (!id) {
        return;
      }

      setIsCommentsLoading(true);

      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        const story: Story = await res.json();

        setComments({ comments: story.kids ?? [], total: story.descendants });
      } catch (error) {
        console.error(error);
      } finally {
        setIsCommentsLoading(false);
      }
    }

    fetchStory(params?.id);
  }, []);

  if (isLoading) {
    return (
      <>
        <PanelHeader>Hacker News VK</PanelHeader>
        <Group mode="plain" style={{ width: "800px" }}>
          <Spinner />
        </Group>
      </>
    );
  }

  if (!story) {
    return null;
  }

  const formattedDate = formatDate(story.time);

  return (
    <>
      <PanelHeader>Hacker News VK</PanelHeader>
      <Group mode="plain" style={{ width: "800px" }}>
        <Button
          size="s"
          mode="outline"
          onClick={() => routeNavigator.push("/")}
        >
          Return to the home page
        </Button>
      </Group>
      <Group style={{ width: "800px" }}>
        <Div>
          <Headline level="1">{`by ${story.by} on ${formattedDate}`}</Headline>
          <Spacing />
          <Title>{story.title}</Title>
          {story.url && (
            <>
              <Spacing />
              <Headline>
                <Link href={story.url} target="_blank">
                  {story.url}
                </Link>
              </Headline>
            </>
          )}
        </Div>
      </Group>
      <Group style={{ width: "800px" }} header={commentsSectionHeader}>
        <Div>
          <Button size="m" stretched onClick={refreshComments}>
            Refresh comments
          </Button>
        </Div>
        {isCommentsLoading ? (
          <Spinner />
        ) : (
          <CardGrid size="l">
            {comments.comments.map((commentId) => {
              return <Comment key={commentId} id={commentId} />;
            })}
          </CardGrid>
        )}
      </Group>
    </>
  );
}
