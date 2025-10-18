import { TabsPage } from "@src/pages/TabsPage/TabsPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const tabsPage = TabsPage();
  app.appendChild(tabsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
