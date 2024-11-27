import { tabs } from "./constants/constants";
import { btnsTab, tabImage, tabText } from "./constants/elements";

const changeTabInformation = (e: Event) => {
  const target = e.target as HTMLElement;
  const btnTabId = target.id;

  changeClassActiveButton(e);

  const tab = tabs[btnTabId as keyof typeof tabs];
  tabText.textContent = tab.text;
  tabImage.src = tab.src;
};

const changeClassActiveButton = (event: Event) => {
  const btnPressed = event.target as HTMLElement;

  const currectActiveBtn = Array.from(btnsTab).find((btnTab: Node) => {
    const btn = btnTab as HTMLButtonElement;
    return btn.classList.contains("isActive");
  }) as HTMLButtonElement;

  currectActiveBtn.classList.remove("isActive");
  btnPressed.classList.add("isActive");
};

const onInit = () => {
  btnsTab.forEach((btnTab) =>
    btnTab.addEventListener("click", (e) => changeTabInformation(e))
  );
};

document.addEventListener("DOMContentLoaded", onInit);
