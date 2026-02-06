import type { TabImageProps } from "@/types/props";

import "@/components/TabImage/TabImage.css";

export const TabImage = ({
  id,
  src,
  title,
}: TabImageProps): HTMLImageElement => {
  const image = document.createElement("img");
  image.className = "tab-image";
  image.id = id;
  image.src = src;
  image.alt = title;

  return image;
};
