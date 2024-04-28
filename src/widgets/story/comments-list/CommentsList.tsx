import { CardGrid } from "@vkontakte/vkui";

import { Comment } from "../comment/Comment";

export function CommentsList({ comments }: { comments: number[] }) {
  return (
    <CardGrid size="l">
      {comments.map((commentId) => {
        return <Comment key={commentId} id={commentId} />;
      })}
    </CardGrid>
  );
}
