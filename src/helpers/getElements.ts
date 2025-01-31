export const getElements = () => ({
  btnsTab: document.querySelectorAll(".tabs-wrapper__tab") as NodeList,
  tabText: document.getElementById("tab-text") as HTMLParagraphElement,
  tabImage: document.getElementById("tab-image") as HTMLImageElement,
});
