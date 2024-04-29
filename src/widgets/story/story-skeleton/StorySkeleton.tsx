import { Group, PanelHeader, Spinner } from "@vkontakte/vkui";

export function StorySkeleton() {
  return (
    <>
      <PanelHeader />
      <Group mode="plain">
        <Spinner />
      </Group>
    </>
  );
}
