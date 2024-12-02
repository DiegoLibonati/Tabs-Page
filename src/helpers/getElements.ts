export const getElements = () => ({
  btnsTab: document.querySelectorAll(
    ".tabs_container_text_buttons_button"
  ) as NodeList,
  tabText: document.getElementById("tab-text") as HTMLParagraphElement,
  tabImage: document.getElementById("tab-image") as HTMLImageElement,
});
