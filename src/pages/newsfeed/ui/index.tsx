import { PanelHeader, Group, Button, Div } from "@vkontakte/vkui";

import { ArticlesList } from "../../../widgets/newsfeed/articles-list/ArticlesList";
import { NewsfeedSkeleton } from "../../../widgets/newsfeed/newsfeed-skeleton/NewsfeedSkeleton";

import { useGetNewsfeed } from "../model/hooks";

export function Newsfeed() {
  const { data, loading, refetch } = useGetNewsfeed();

  return (
    <>
      <PanelHeader />
      {/* Refresh button */}
      <Div>
        <Button
          size="m"
          stretched
          loading={loading}
          disabled={loading}
          onClick={refetch}
        >
          Refresh stories
        </Button>
      </Div>
      {/* Newsfeed */}
      <Group>
        {loading ? <NewsfeedSkeleton /> : <ArticlesList data={data} />}
      </Group>
    </>
  );
}
