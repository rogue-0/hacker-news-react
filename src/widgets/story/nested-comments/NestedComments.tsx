import { Div } from "@vkontakte/vkui";

import { Comment } from "../comment/Comment";

import styles from "./NestedComments.module.css";

export function NestedComments({ comments }: { comments: number[] }) {
  return (
    <Div className={styles["nested-comment-container"]}>
      <div className={styles.separator} />
      <div className={styles["nested-comments-list"]}>
        {comments.map((id) => {
          return <Comment key={id} id={id} />;
        })}
      </div>
    </Div>
  );
}
