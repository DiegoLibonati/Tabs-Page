import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { TabProps } from "@/types/props";
import type { TabComponent } from "@/types/components";

import { Tab } from "@/components/Tab/Tab";

const renderComponent = (props: TabProps): TabComponent => {
  const container = Tab(props);
  document.body.appendChild(container);
  return container;
};

describe("Tab Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: TabProps = {
    id: "test-tab",
    ariaLabel: "Test tab button",
    isActive: false,
    children: "Test Tab",
    onClick: mockOnClick,
  };

  it("should render tab button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test tab button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-tab");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("tab");
    expect(button.innerHTML).toBe("Test Tab");
  });

  it("should apply active class when isActive is true", () => {
    const activeProps: TabProps = {
      ...defaultProps,
      isActive: true,
    };

    renderComponent(activeProps);

    const button = screen.getByRole("button", { name: "Test tab button" });
    expect(button).toHaveClass("tab", "tab--active");
  });

  it("should not apply active class when isActive is false", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test tab button" });
    expect(button).toHaveClass("tab");
    expect(button).not.toHaveClass("tab--active");
  });

  it("should call onClick handler with event and id", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test tab button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      "test-tab"
    );
  });

  it("should cleanup event listeners", async () => {
    const user = userEvent.setup();
    const tab = renderComponent(defaultProps);

    tab.cleanup?.();

    const button = screen.getByRole("button", { name: "Test tab button" });
    await user.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
