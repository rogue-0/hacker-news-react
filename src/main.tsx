import { createRoot } from "react-dom/client";

import vkBridge from "@vkontakte/vk-bridge";
import {
  RouterProvider,
  createHashRouter,
} from "@vkontakte/vk-mini-apps-router";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import App from "./app/App.tsx";

vkBridge.send("VKWebAppInit");

const router = createHashRouter([
  {
    path: "/",
    panel: "newsfeed_panel",
    view: "default_view",
  },
  {
    path: "/:id",
    panel: "news_panel",
    view: "default_view",
  },
]);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);
