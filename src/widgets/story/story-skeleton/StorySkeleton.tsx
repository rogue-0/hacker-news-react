import { Group, PanelHeader, Spinner } from "@vkontakte/vkui";

export default function StorySkeleton() {
  return (
    <>
      <PanelHeader />
      <Group mode="plain">
        <Spinner />
      </Group>
    </>
  );
}
