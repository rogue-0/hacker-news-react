import { CardGrid, ContentCard } from "@vkontakte/vkui";

import styles from "./NewsfeedSkeleton.module.css";

export function NewsfeedSkeleton() {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <CardGrid size="l">
      {skeletons.map((skeleton) => (
        <ContentCard key={skeleton} className={styles.skeleton} />
      ))}
    </CardGrid>
  );
}
