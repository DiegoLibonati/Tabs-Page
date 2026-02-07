import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { TabProps } from "@/types/props";
import type { TabComponent } from "@/types/components";

import { Tab } from "@/components/Tab/Tab";

const renderComponent = (props: TabProps): TabComponent => {
  const component = Tab(props);
  document.body.appendChild(component);
  return component;
};

describe("Tab", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("render", () => {
    it("should create a button element", () => {
      renderComponent({
        id: "test-tab",
        ariaLabel: "test label",
        isActive: false,
        onClick: jest.fn(),
      });

      const tab = screen.getByRole("button", { name: "test label" });
      expect(tab).toBeInTheDocument();
      expect(tab.tagName).toBe("BUTTON");
      expect(tab).toHaveAttribute("type", "button");
    });

    it("should set correct id and aria-label", () => {
      renderComponent({
        id: "my-tab",
        ariaLabel: "click me",
        isActive: false,
        onClick: jest.fn(),
      });

      const tab = screen.getByRole("button", { name: "click me" });
      expect(tab.id).toBe("my-tab");
      expect(tab).toHaveAccessibleName("click me");
    });

    it("should render children content", () => {
      renderComponent({
        id: "test-tab",
        ariaLabel: "label",
        isActive: false,
        children: "<span>Tab Content</span>",
        onClick: jest.fn(),
      });

      const tab = screen.getByRole("button", { name: "label" });
      expect(tab.innerHTML).toBe("<span>Tab Content</span>");
    });

    it("should apply basic and active classes", () => {
      renderComponent({
        id: "active-tab",
        ariaLabel: "label",
        isActive: true,
        onClick: jest.fn(),
      });

      const tab = screen.getByRole("button", { name: "label" });
      expect(tab).toHaveClass("tab", "tab--active");
    });

    it("should not have active class when isActive is false", () => {
      renderComponent({
        id: "inactive-tab",
        ariaLabel: "label",
        isActive: false,
        onClick: jest.fn(),
      });

      const tab = screen.getByRole("button", { name: "label" });
      expect(tab).toHaveClass("tab");
      expect(tab).not.toHaveClass("tab--active");
    });
  });

  describe("interaction", () => {
    it("should call onClick handler with event and id", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      renderComponent({
        id: "interactive-tab",
        ariaLabel: "label",
        isActive: false,
        onClick: handleClick,
      });

      const tab = screen.getByRole("button", { name: "label" });
      await user.click(tab);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "interactive-tab"
      );
    });
  });

  describe("cleanup", () => {
    it("should remove click event listener", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      const tab = renderComponent({
        id: "cleanup-tab",
        ariaLabel: "label",
        isActive: false,
        onClick: handleClick,
      });

      const removeSpy = jest.spyOn(tab, "removeEventListener");

      tab.cleanup();

      expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function));

      await user.click(tab);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
