import { useCallback, useEffect, useState } from "react";

import {
  Button,
  Card,
  Div,
  Paragraph,
  Separator,
  SimpleCell,
  Spacing,
  Spinner,
  Text,
} from "@vkontakte/vkui";

import { Comment as CommentType } from "../../shared/types/Comment";
import { formatDate } from "../../shared/utils/formatDate";

export default function Comment({ id }: { id: number }) {
  const [comment, setComment] = useState<CommentType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchComment(id: number) {
      if (!id) {
        return;
      }

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
    return (
      <Card style={{ height: "96px" }}>
        <Spinner />
      </Card>
    );
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
        <Paragraph dangerouslySetInnerHTML={{ __html: comment.text }} />
      </Div>
      {loadMoreButton && (
        <SimpleCell>
          <Button size="s" onClick={expandCommentTree}>
            More Comments
          </Button>
        </SimpleCell>
      )}
      {isExpanded && (
        <Div style={{ display: "flex" }}>
          <div
            style={{
              width: "2px",
              flexShrink: "0",
              backgroundColor: "#d7d8d9",
            }}
          />
          <div style={{ flexGrow: "1" }}>
            {comment.kids?.map((id) => {
              return <Comment key={id} id={id} />;
            })}
          </div>
        </Div>
      )}
    </Card>
  );
}
