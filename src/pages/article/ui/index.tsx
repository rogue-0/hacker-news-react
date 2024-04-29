import { useCallback } from "react";

import { PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { StorySkeleton } from "../../../widgets/story/story-skeleton/StorySkeleton";

import { useGetStory } from "../model/hooks";

import { Info } from "./Info";
import { CommentsSection } from "./CommentsSection";

export function Story() {
  const routeNavigator = useRouteNavigator();

  const { story, isStoryLoading, comments, total, isCommentsLoading, refetch } =
    useGetStory();

  const handleBackButton = useCallback(
    () => routeNavigator.push("/"),
    [routeNavigator]
  );

  if (isStoryLoading) {
    return <StorySkeleton />;
  }

  if (!story) {
    return null;
  }

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack label="Back" onClick={handleBackButton} />}
      />

      <Info
        by={story.by}
        title={story.title}
        url={story.url}
        time={story.time}
      />

      <CommentsSection
        comments={comments}
        total={total}
        isLoading={isCommentsLoading}
        refetch={refetch}
      />
    </>
  );
}
