import type { TabProps } from "@/types/props";
import type { TabElement } from "@/types/components";

import "@/components/Tab/Tab.css";

export const Tab = ({
  id,
  ariaLabel,
  isActive,
  children,
  onClick,
}: TabProps): TabElement => {
  const button = document.createElement("button") as TabElement;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";
  button.className = `tab ${isActive ? "tab--active" : ""}`.trim();
  button.type = "button";

  const handleClick = (e: MouseEvent): void => {
    onClick(e, id);
  };

  button.addEventListener("click", handleClick);

  button.cleanup = (): void => {
    button.removeEventListener("click", handleClick);
  };

  return button;
};
