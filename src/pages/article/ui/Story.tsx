import { useMemo } from "react";

import {
  Button,
  Div,
  Group,
  Header,
  Headline,
  Link,
  PanelHeader,
  PanelHeaderBack,
  Spacing,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import StorySkeleton from "../../../widgets/story/story-skeleton/StorySkeleton";
import { CommentsList } from "../../../widgets/story/comments-list/CommentsList";
import { formatDate } from "../../../shared/utils/formatDate";

import { useGetStory } from "../model/hooks";

export function Story() {
  const routeNavigator = useRouteNavigator();

  const { story, isStoryLoading, comments, total, isCommentsLoading, refetch } =
    useGetStory();

  const commentsSectionHeader = useMemo(
    () => (
      <Header mode="secondary">
        {total} {total > 1 ? "comments" : "comment"}
      </Header>
    ),
    [total]
  );

  if (isStoryLoading) {
    return <StorySkeleton />;
  }

  if (!story) {
    return null;
  }

  const formattedDate = formatDate(story.time);

  return (
    <>
      {/* Back button */}
      <PanelHeader
        before={
          <PanelHeaderBack
            label="Back"
            onClick={() => routeNavigator.push("/")}
          />
        }
      />
      {/* Info about story */}
      <Group>
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
      {/* Comments section */}
      <Group header={commentsSectionHeader}>
        <Div>
          <Button size="m" stretched onClick={refetch}>
            Refresh comments
          </Button>
        </Div>
        {isCommentsLoading ? <Spinner /> : <CommentsList comments={comments} />}
      </Group>
    </>
  );
}
