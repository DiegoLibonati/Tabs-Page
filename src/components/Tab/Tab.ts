import type { TabProps } from "@/types/props";
import type { TabComponent } from "@/types/components";

import "@/components/Tab/Tab.css";

const Tab = ({
  id,
  ariaLabel,
  isActive,
  children,
  onClick,
}: TabProps): TabComponent => {
  const button = document.createElement("button") as TabComponent;
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

export default Tab;
