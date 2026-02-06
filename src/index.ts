import "@/index.css";
import { TabsPage } from "@/pages/TabsPage/TabsPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (app) {
    const tabsPage = TabsPage();
    app.appendChild(tabsPage);
  }
};

document.addEventListener("DOMContentLoaded", onInit);
