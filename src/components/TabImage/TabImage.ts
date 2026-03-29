import type { TabImageProps } from "@/types/props";
import type { TabImageComponent } from "@/types/components";

import "@/components/TabImage/TabImage.css";

const TabImage = ({ id, src, title }: TabImageProps): TabImageComponent => {
  const image = document.createElement("img");
  image.className = "tab-image";
  image.id = id;
  image.src = src;
  image.alt = title;

  return image;
};

export default TabImage;
