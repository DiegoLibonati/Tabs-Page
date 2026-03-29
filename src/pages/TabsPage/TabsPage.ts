import type { Page } from "@/types/pages";
import type { TabKey } from "@/types/app";

import Tab from "@/components/Tab/Tab";
import TabImage from "@/components/TabImage/TabImage";

import tabsData from "@/constants/tabs";

import "@/pages/TabsPage/TabsPage.css";

const TabsPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "tabs-page";

  main.innerHTML = `
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
  const tabs = main.querySelector<HTMLElement>(".tabs")!;
  const tabsList = main.querySelector<HTMLDivElement>(".tabs__list")!;
  const tabsDescription =
    main.querySelector<HTMLParagraphElement>(".tabs__description")!;

  let currentTabImage = TabImage({
    id: "tab-image",
    src: currentTab.src,
    title: currentTab.text,
  });

  const changeTabInformation = (e: MouseEvent, id: string): void => {
    currentTabImage.remove();

    const btnPressed = e.target as HTMLButtonElement;

    const currentActiveButton =
      main.querySelector<HTMLButtonElement>(".tab--active")!;

    currentActiveButton.classList.remove("tab--active");
    btnPressed.classList.add("tab--active");

    const tab = tabsData[id as TabKey];

    currentTabImage = TabImage({
      id: "tab-image",
      src: tab.src,
      title: tab.text,
    });

    tabs.append(currentTabImage);
    tabsDescription.textContent = tab.text;
  };

  const tabHistory = Tab({
    id: "history",
    ariaLabel: "Select History tab",
    isActive: true,
    children: "History",
    onClick: changeTabInformation,
  });

  const tabVision = Tab({
    id: "vision",
    ariaLabel: "Select Vision tab",
    isActive: false,
    children: "Vision",
    onClick: changeTabInformation,
  });

  const tabGoals = Tab({
    id: "goals",
    ariaLabel: "Select Goals tab",
    isActive: false,
    children: "Goals",
    onClick: changeTabInformation,
  });

  tabs.append(currentTabImage);
  tabsList.append(tabHistory, tabVision, tabGoals);
  tabsDescription.textContent = currentTab.text;

  main.cleanup = (): void => {
    tabHistory.cleanup?.();
    tabVision.cleanup?.();
    tabGoals.cleanup?.();

    currentTabImage.remove();
  };

  return main;
};

export default TabsPage;
