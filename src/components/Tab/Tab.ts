import { TabProps } from "@src/entities/props";

import "@src/components/Tab/Tab.css";

export const Tab = ({
  id,
  ariaLabel,
  isActive,
  children,
  onClick,
}: TabProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";
  button.className = `tab ${isActive && "tab--active"}`;
  button.type = "button";

  button.addEventListener("click", (e) => onClick(e, id));

  return button;
};
