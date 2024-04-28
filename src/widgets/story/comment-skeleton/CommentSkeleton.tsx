import { Card, Spinner } from "@vkontakte/vkui";

import styles from "./CommentSkeleton.module.css";

export function CommentSkeleton() {
  return (
    <Card className={styles.container}>
      <Spinner />
    </Card>
  );
}
