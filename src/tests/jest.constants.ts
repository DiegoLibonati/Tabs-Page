import fs from "fs";
import path from "path";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

export const OFFICIAL_BODY = INITIAL_HTML.match(
  /<body[^>]*>([\s\S]*?)<\/body>/i
)![1];

export const mockTabs = {
    history: {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia.",
      src: "https://www.absolutviajes.com/wp-content/uploads/2008/11/arquitectura-china-antigua.png",
    },
    vision: {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia.",
      src: "https://img.lovepik.com/photo/50131/9815.jpg_wh860.jpg",
    },
    goals: {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, mollitia.",
      src: "http://valeriavasquez.weebly.com/uploads/4/8/7/7/48775221/1305460_orig.jpg",
    },
  };
  