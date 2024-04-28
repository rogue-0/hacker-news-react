import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchComment(id: number) {
      if (!id) {
        return;
      }

      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );

        const story = await res.json();

        setComment(story);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComment(id);
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!comment) {
    return null;
  }

  const formattedDate = formatDate(comment.time);

  const loadMoreButton = comment.kids && comment.kids.length > 0;
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
      <Spacing>
        <Separator />
      </Spacing>
      {loadMoreButton && (
        <SimpleCell>
          <Button size="s">Load More Comments</Button>
        </SimpleCell>
      )}
    </Card>
  );
}
