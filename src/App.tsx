import {
  useActiveVkuiLocation,
  useGetPanelForView,
} from "@vkontakte/vk-mini-apps-router";
import { Root, View, Panel } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./pages/Home";
import News from "./pages/News";

function App() {
  const { view: activeView } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView("default_view");

  return (
    <Root activeView={activeView || "default_view"}>
      <View nav="default_view" activePanel={activePanel || "home_panel"}>
        <Panel id="main" nav="home_panel" centered>
          <Home />
        </Panel>
        <Panel id="news" nav="news_panel" centered>
          <News />
        </Panel>
      </View>
    </Root>
  );
}

export default App;
