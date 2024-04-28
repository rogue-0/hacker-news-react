import { useCallback, useEffect, useState } from "react";

import { useParams } from "@vkontakte/vk-mini-apps-router";

import { Story } from "../../../shared/types";

import { Comments } from "./types";

export function useGetStory() {
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [isStoryLoading, setIsStoryLoading] = useState(true);

  const [comments, setComments] = useState<Comments>({
    list: [],
    total: 0,
  });
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  const params = useParams<"id">();

  useEffect(() => {
    async function fetchStory(id: string | undefined) {
      if (!id) {
        return;
      }

      setIsStoryLoading(true);

      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        const story: Story = await res.json();

        setStory(story);
        setComments({ list: story.kids ?? [], total: story.descendants });
      } catch (error) {
        console.error(error);
      } finally {
        setIsStoryLoading(false);
        setIsCommentsLoading(false);
      }
    }

    fetchStory(params?.id);
  }, [
    params?.id,
    setStory,
    setComments,
    setIsStoryLoading,
    setIsCommentsLoading,
  ]);

  const refetch = useCallback(() => {
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

        setComments({ list: story.kids ?? [], total: story.descendants });
      } catch (error) {
        console.error(error);
      } finally {
        setIsCommentsLoading(false);
      }
    }

    fetchStory(params?.id);
  }, [params?.id, setComments, setIsCommentsLoading]);

  return {
    story,
    isStoryLoading,
    comments: comments.list,
    total: comments.total,
    isCommentsLoading,
    refetch,
  };
}
