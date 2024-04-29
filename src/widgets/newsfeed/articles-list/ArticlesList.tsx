import { CardGrid } from "@vkontakte/vkui";

import { Article } from "../article/Article";

export function ArticlesList({ data }: { data: string[] }) {
  return (
    <CardGrid size="l">
      {data.map((id) => (
        <Article key={id} id={id} />
      ))}
    </CardGrid>
  );
}
