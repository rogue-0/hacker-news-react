import { useGetPanelForView } from "@vkontakte/vk-mini-apps-router";
import {
  View,
  Panel,
  SplitLayout,
  SplitCol,
  PanelHeader,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { Newsfeed } from "../pages/newsfeed";
import { Story } from "../pages/article/ui";

import styles from "./App.module.css";

const header = <PanelHeader />;

function App() {
  const activePanel = useGetPanelForView("default_view");

  return (
    <SplitLayout className={styles.container} header={header}>
      <SplitCol width="100%" maxWidth="800px" stretchedOnMobile autoSpaced>
        <View nav="default_view" activePanel={activePanel || "newsfeed_panel"}>
          <Panel id="newsfeed" nav="newsfeed_panel">
            <Newsfeed />
          </Panel>
          <Panel id="news" nav="news_panel">
            <Story />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

export default App;
