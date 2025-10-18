import { Tab as TabT } from "@src/entities/app";

import { Tab } from "@src/components/Tab/Tab";
import { TabImage } from "@src/components/TabImage/TabImage";

import tabsData from "@src/constants/tabs";

import "@src/pages/TabsPage/TabsPage.css";

const changeTabInformation = (e: MouseEvent, id: string) => {
  const tabsDescription =
    document.querySelector<HTMLParagraphElement>(".tabs__description");
  const tabs = document.querySelector<HTMLElement>(".tabs");
  const tabImage = document.querySelector<HTMLImageElement>(".tab-image");

  if (tabImage) tabImage.remove();

  const btnPressed = e.target as HTMLButtonElement;

  const currectActiveBtn =
    document.querySelector<HTMLButtonElement>(".tab--active");

  currectActiveBtn!.classList.remove("tab--active");
  btnPressed.classList.add("tab--active");

  const tab = tabsData[id as keyof TabT];

  const tabImageComponent = TabImage({
    id: "tab-image",
    src: tab.src,
    title: tab.text,
  });

  tabs?.append(tabImageComponent);
  tabsDescription!.textContent = tab.text;
};

export const TabsPage = (): HTMLElement => {
  const main = document.createElement("main");
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

  const currentTab = tabsData["history"];
  const tabs = main.querySelector<HTMLElement>(".tabs");
  const tabsList = main.querySelector<HTMLDivElement>(".tabs__list");
  const tabsDescription =
    main.querySelector<HTMLParagraphElement>(".tabs__description");

  const tabImage = TabImage({
    id: "tab-image",
    src: currentTab.src,
    title: currentTab.text,
  });

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

  tabs?.append(tabImage);
  tabsList?.append(tabHistory, tabVision, tabGoals);
  tabsDescription!.textContent = currentTab.text;

  return main;
};
