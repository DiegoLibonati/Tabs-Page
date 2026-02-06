import type { PageElement } from "@/types/pages";
import type { TabKey } from "@/types/app";

import { Tab } from "@/components/Tab/Tab";
import { TabImage } from "@/components/TabImage/TabImage";

import tabsData from "@/constants/tabs";

import "@/pages/TabsPage/TabsPage.css";

export const TabsPage = (): PageElement => {
  const mainElement = document.createElement("main");
  mainElement.className = "tabs-page";

  mainElement.innerHTML = `
    <section class="page-wrapper">
        <article class="header-wrapper">
            <h1 class="header__title">About us</h1>
            <p class="header__description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                voluptate. Ipsam nisi nihil cum iusto?
            </p>
        </article>

        <article class="tabs">
            <div class="tabs-wrapper">
                <div class="tabs__list"></div>

                <p id="tab-text" class="tabs__description"></p>
            </div>
        </article>
    </section>
  `;

  const currentTab = tabsData.history;
  const tabs = mainElement.querySelector<HTMLElement>(".tabs");
  const tabsList = mainElement.querySelector<HTMLDivElement>(".tabs__list");
  const tabsDescription =
    mainElement.querySelector<HTMLParagraphElement>(".tabs__description");

  let currentTabImage = TabImage({
    id: "tab-image",
    src: currentTab.src,
    title: currentTab.text,
  });

  const changeTabInformation = (e: MouseEvent, id: string): void => {
    currentTabImage.remove();

    const btnPressed = e.target as HTMLButtonElement;

    const currentActiveButton =
      mainElement.querySelector<HTMLButtonElement>(".tab--active");

    if (currentActiveButton)
      currentActiveButton.classList.remove("tab--active");

    btnPressed.classList.add("tab--active");

    const tab = tabsData[id as TabKey];

    currentTabImage = TabImage({
      id: "tab-image",
      src: tab.src,
      title: tab.text,
    });

    if (tabs) tabs.append(currentTabImage);
    if (tabsDescription) tabsDescription.textContent = tab.text;
  };

  const tabHistory = Tab({
    id: "history",
    ariaLabel: "history button",
    isActive: true,
    children: "History",
    onClick: changeTabInformation,
  });

  const tabVision = Tab({
    id: "vision",
    ariaLabel: "vision button",
    isActive: false,
    children: "Vision",
    onClick: changeTabInformation,
  });

  const tabGoals = Tab({
    id: "goals",
    ariaLabel: "goals button",
    isActive: false,
    children: "Goals",
    onClick: changeTabInformation,
  });

  if (tabs) tabs.append(currentTabImage);
  if (tabsList) tabsList.append(tabHistory, tabVision, tabGoals);
  if (tabsDescription) tabsDescription.textContent = currentTab.text;

  const main = mainElement as PageElement;

  main.cleanup = (): void => {
    tabHistory.cleanup();
    tabVision.cleanup();
    tabGoals.cleanup();
  };

  return main;
};
