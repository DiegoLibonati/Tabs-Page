import { getElements } from "./helpers/getElements";
import { tabs } from "./constants/constants";

const changeTabInformation = (e: Event) => {
  const { tabText, tabImage, btnsTab } = getElements();

  const btnPressed = e.target as HTMLElement;
  const btnTabId = btnPressed.id;

  const currectActiveBtn = Array.from(btnsTab).find((btnTab: Node) => {
    const btn = btnTab as HTMLButtonElement;
    return btn.classList.contains("isActive");
  }) as HTMLButtonElement;

  currectActiveBtn.classList.remove("isActive");
  btnPressed.classList.add("isActive");

  const tab = tabs[btnTabId as keyof typeof tabs];
  tabText.textContent = tab.text;
  tabImage.src = tab.src;
};

const onInit = () => {
  const { btnsTab } = getElements();

  btnsTab.forEach((btnTab) =>
    btnTab.addEventListener("click", (e) => changeTabInformation(e))
  );
};

document.addEventListener("DOMContentLoaded", onInit);
