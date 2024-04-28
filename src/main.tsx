import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createHashRouter,
} from "@vkontakte/vk-mini-apps-router";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import App from "./App.tsx";

const router = createHashRouter([
  {
    path: "/",
    panel: "home_panel",
    view: "default_view",
    root: 'default_root',
  },
  {
    path: "/:id",
    panel: "news_panel",
    view: "default_view",
    root: 'default_root',
  },
]);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AdaptivityProvider>
  </ConfigProvider>
);
