import { useCallback, useEffect, useState } from "react";

import {
  Button,
  Card,
  Div,
  Paragraph,
  Separator,
  SimpleCell,
  Spacing,
  Text,
} from "@vkontakte/vkui";

import { formatDate } from "../../../shared/utils/formatDate";
import { Comment as CommentType } from "../../../shared/types";

import { CommentSkeleton } from "../comment-skeleton/CommentSkeleton";

import { NestedComments } from "../nested-comments/NestedComments";

export function Comment({ id }: { id: number }) {
  const [comment, setComment] = useState<CommentType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchComment(id: number) {
      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        const comment: CommentType = await res.json();

        setComment(comment);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComment(id);
  }, [id]);

  const expandCommentTree = useCallback(
    () => setIsExpanded(true),
    [setIsExpanded]
  );

  if (isLoading) {
    return <CommentSkeleton />;
  }

  if (!comment) {
    return null;
  }

  const formattedDate = formatDate(comment.time);

  const loadMoreButton = comment.kids && comment.kids.length > 0 && !isExpanded;

  return (
    <Card>
      <SimpleCell>
        <Text>
          by {comment.by} at {formattedDate}
        </Text>
      </SimpleCell>
      <Spacing>
        <Separator />
      </Spacing>
      <Div>
        {comment.deleted ? (
          <Paragraph>[deleted]</Paragraph>
        ) : (
          <Paragraph dangerouslySetInnerHTML={{ __html: comment.text }} />
        )}
      </Div>
      {loadMoreButton && (
        <SimpleCell>
          <Button size="s" onClick={expandCommentTree}>
            More Comments
          </Button>
        </SimpleCell>
      )}
      {isExpanded && <NestedComments comments={comment.kids ?? []} />}
    </Card>
  );
}
