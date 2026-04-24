import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { TabProps } from "@/types/props";
import type { TabComponent } from "@/types/components";

import Tab from "@/components/Tab/Tab";

const mockOnClick = jest.fn();

const defaultProps: TabProps = {
  id: "history",
  ariaLabel: "Select History tab",
  isActive: false,
  children: "History",
  onClick: mockOnClick,
};

const renderComponent = (props: Partial<TabProps> = {}): TabComponent => {
  const element = Tab({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Tab", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should set the correct id", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("id", "history");
    });

    it("should set the correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Select History tab" })
      ).toBeInTheDocument();
    });

    it("should set the correct text content", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveTextContent("History");
    });

    it("should have type button", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should always have the tab class", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("tab");
    });

    it("should include tab--active class when isActive is true", () => {
      renderComponent({ isActive: true });
      expect(screen.getByRole("button")).toHaveClass("tab--active");
    });

    it("should not include tab--active class when isActive is false", () => {
      renderComponent({ isActive: false });
      expect(screen.getByRole("button")).not.toHaveClass("tab--active");
    });

    it("should render empty content when children is omitted", () => {
      renderComponent({ children: undefined });
      expect(screen.getByRole("button")).toHaveTextContent("");
    });
  });

  describe("behavior", () => {
    it("should call onClick with the event and id when clicked", async () => {
      const mockOnClick = jest.fn();
      const user = userEvent.setup();
      renderComponent({ onClick: mockOnClick });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "history"
      );
    });

    it("should call onClick with the correct id for a different tab", async () => {
      const mockOnClick = jest.fn();
      const user = userEvent.setup();
      renderComponent({
        id: "vision",
        ariaLabel: "Select Vision tab",
        onClick: mockOnClick,
      });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "vision"
      );
    });
  });

  describe("cleanup", () => {
    it("should not call onClick after cleanup", async () => {
      const mockOnClick = jest.fn();
      const user = userEvent.setup();
      const element = renderComponent({ onClick: mockOnClick });
      element.cleanup?.();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should not throw when cleanup is called", () => {
      const element = renderComponent();
      expect(() => element.cleanup?.()).not.toThrow();
    });
  });
});
