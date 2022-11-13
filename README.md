# Tabs-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

## Description

I made a web page that through different tabs you can get different information. Also if you tab with your keyboard you can access the different tabs and not only with the mouse click.

## Feel free to edit my code

If you happen to add a button in the HTML and then look up the id of that button you can add it in this condition to render what text you want to show for that button/tab

```
if (myActualButton == "btnhistory"){
    newText.innerHTML = "La historia de este lugar es xD"
} else if (myActualButton == "btnvision"){
    newText.innerHTML = "La vision es xD"
} else {
    newText.innerHTML = "Los goals son xd"
}
```

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![tabs-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/tabs2-0.jpg)

![tabs-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/tabs2-1.jpg)

![tabs-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/tabs2-2.jpg)

![tabs-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/tabs2-3.jpg)

![tabs-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/tabs2-4.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Tabs%20Page`

## Video

## Documentation

Here we obtain all the buttons of the tab to be able to use them in javascript:

```
const btnsTab = document.querySelectorAll(
  ".tabs_container_text_buttons_button"
);
```

Here we get the text container that will change with each tab we select:

```
const tabText = document.getElementById("tab-text");
```

Here we get the image container that will change with each tab we select:

```
const tabImage = document.getElementById("tab-image");
```

Here what I did was to go through the array of buttons and assign to each button an event when the button is clicked, when the button is clicked the `changeTabInformation()` function will be executed:

```
btnsTab.forEach((btnTab) => {
  btnTab.addEventListener("click", (e) => changeTabInformation(e));
});
```

This function will get the id of the button pressed, then it will execute the ``changeClassActiveButton` function and finally depending on the ID of each element with the ID of the button pressed it will change the container text element and the image:

```
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
```

This function removes the `isActive` class from the buttons and adds it to the pressed button:

```
const changeClassActiveButton = (event) => {
  const btnPressed = event.target;

  btnsTab.forEach((btnTab) => {
    if (btnTab.classList.contains("isActive")) {
      btnTab.classList.remove("isActive");
    }
  });

  btnPressed.classList.add("isActive");
};

```
