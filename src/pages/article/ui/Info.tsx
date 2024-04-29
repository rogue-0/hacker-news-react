import { Div, Group, Headline, Link, Spacing, Title } from "@vkontakte/vkui";

import { formatDate } from "../../../shared/utils/formatDate";

export interface IInfo {
  by: string;
  title: string;
  url: string | undefined;
  time: number;
}

export function Info({ by, title, url, time }: IInfo) {
  const formattedDate = formatDate(time);

  return (
    <Group>
      <Div>
        <Headline level="1">{`by ${by} on ${formattedDate}`}</Headline>
        <Spacing />
        <Title>{title}</Title>
        {url && (
          <>
            <Spacing />
            <Headline>
              <Link href={url} target="_blank">
                {url}
              </Link>
            </Headline>
          </>
        )}
      </Div>
    </Group>
  );
}
