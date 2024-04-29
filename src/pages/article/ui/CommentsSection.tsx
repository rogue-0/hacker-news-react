import { useMemo } from "react";

import { Button, Div, Group, Header, Spinner } from "@vkontakte/vkui";

import { CommentsList } from "../../../widgets/story/comments-list/CommentsList";

export interface ICommentsSection {
  comments: number[];
  total: number;
  isLoading: boolean;
  refetch: () => void;
}

export function CommentsSection({
  total,
  comments,
  isLoading,
  refetch,
}: ICommentsSection) {
  const commentsSectionHeader = useMemo(
    () => (
      <Header mode="secondary">
        {total} {total > 1 ? "comments" : "comment"}
      </Header>
    ),
    [total]
  );

  return (
    <Group header={commentsSectionHeader}>
      <Div>
        <Button size="m" stretched onClick={refetch}>
          Refresh comments
        </Button>
      </Div>
      {isLoading ? <Spinner /> : <CommentsList comments={comments} />}
    </Group>
  );
}
