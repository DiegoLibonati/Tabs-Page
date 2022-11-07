const btnsTab = document.querySelectorAll(
  ".tabs_container_text_buttons_button"
);
const tabText = document.getElementById("tab-text");
const tabImage = document.getElementById("tab-image");

const changeTabInformation = (e) => {
  const btnTabId = e.target.id;

  changeClassActiveButton(e);

  if (btnTabId === "history") {
    tabText.textContent =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia.";
    tabImage.src =
      "https://www.absolutviajes.com/wp-content/uploads/2008/11/arquitectura-china-antigua.png";
    return;
  }

  if (btnTabId === "vision") {
    tabText.textContent =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia.";
    tabImage.src = "https://img.lovepik.com/photo/50131/9815.jpg_wh860.jpg";
    return;
  }

  if (btnTabId === "goals") {
    tabText.textContent =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia.";
    tabImage.src =
      "http://valeriavasquez.weebly.com/uploads/4/8/7/7/48775221/1305460_orig.jpg";
    return;
  }
};

const changeClassActiveButton = (event) => {
  const btnPressed = event.target;

  btnsTab.forEach((btnTab) => {
    if (btnTab.classList.contains("isActive")) {
      btnTab.classList.remove("isActive");
    }
  });

  btnPressed.classList.add("isActive");
};

btnsTab.forEach((btnTab) => {
  btnTab.addEventListener("click", (e) => changeTabInformation(e));
});
