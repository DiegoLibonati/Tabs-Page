export const getElements = () => ({
  btnsTab: document.querySelectorAll(
    ".tabs__list__btns__btn"
  ) as NodeList,
  tabText: document.getElementById("tab-text") as HTMLParagraphElement,
  tabImage: document.getElementById("tab-image") as HTMLImageElement,
});
