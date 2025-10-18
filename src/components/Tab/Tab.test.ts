import user from "@testing-library/user-event";

import { TabProps } from "@src/entities/props";

import { Tab } from "@src/components/Tab/Tab";

type RenderComponent = {
  container: HTMLButtonElement;
  props: { onClick: jest.Mock } & TabProps;
};

const renderComponent = (props: TabProps): RenderComponent => {
  const tabProps = { ...props, onClick: jest.fn() };

  const container = Tab(tabProps);
  document.body.appendChild(container);
  return { container: container, props: tabProps };
};

describe("Tab.ts", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: TabProps = {
        id: "test-tab",
        ariaLabel: "Test Tab",
        isActive: false,
        children: "Tab Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.className).toContain("tab");
    });

    test("It should return HTMLButtonElement", () => {
      const props: TabProps = {
        id: "test-tab",
        ariaLabel: "Test Tab",
        isActive: false,
        children: "Tab Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("BUTTON");
    });

    test("It should have button type", () => {
      const props: TabProps = {
        id: "test-tab",
        ariaLabel: "Test Tab",
        isActive: false,
        children: "Tab Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.type).toBe("button");
    });

    test("It should have correct CSS class", () => {
      const props: TabProps = {
        id: "test-tab",
        ariaLabel: "Test Tab",
        isActive: false,
        children: "Tab Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("tab");
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should display the correct children content", () => {
      const props: TabProps = {
        id: "my-tab",
        ariaLabel: "My Tab",
        isActive: false,
        children: "My Tab Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("My Tab Content");
      expect(container.textContent).toBe("My Tab Content");
    });

    test("It should use correct id", () => {
      const props: TabProps = {
        id: "unique-tab-id",
        ariaLabel: "Unique Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("unique-tab-id");
    });

    test("It should have correct aria-label", () => {
      const props: TabProps = {
        id: "test-tab",
        ariaLabel: "Accessible Tab Label",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.getAttribute("aria-label")).toBe("Accessible Tab Label");
    });

    test("It should render children as innerHTML", () => {
      const props: TabProps = {
        id: "html-tab",
        ariaLabel: "HTML Tab",
        isActive: false,
        children: "<strong>Bold Text</strong>",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("<strong>Bold Text</strong>");
      expect(container.querySelector("strong")).toBeInTheDocument();
    });
  });

  describe("isActive State Tests.", () => {
    test("It should not have 'tab--active' class when isActive is false", () => {
      const props: TabProps = {
        id: "inactive-tab",
        ariaLabel: "Inactive Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("tab");
      expect(container).not.toHaveClass("tab--active");
    });

    test("It should have 'tab--active' class when isActive is true", () => {
      const props: TabProps = {
        id: "active-tab",
        ariaLabel: "Active Tab",
        isActive: true,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("tab");
      expect(container).toHaveClass("tab--active");
    });

    test("It should toggle class based on isActive prop", () => {
      const propsInactive: TabProps = {
        id: "toggle-tab",
        ariaLabel: "Toggle Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container: inactiveTab } = renderComponent(propsInactive);
      expect(inactiveTab).not.toHaveClass("tab--active");

      document.body.innerHTML = "";

      const propsActive: TabProps = {
        id: "toggle-tab",
        ariaLabel: "Toggle Tab",
        isActive: true,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container: activeTab } = renderComponent(propsActive);
      expect(activeTab).toHaveClass("tab--active");
    });
  });

  describe("Click Event Tests.", () => {
    test("It should call onClick handler when tab is clicked", async () => {
      const props: TabProps = {
        id: "clickable-tab",
        ariaLabel: "Clickable Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      await user.click(container);

      expect(componentProps.onClick).toHaveBeenCalledTimes(1);
    });

    test("It should pass event and id to onClick handler", async () => {
      const props: TabProps = {
        id: "event-tab",
        ariaLabel: "Event Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      await user.click(container);

      expect(componentProps.onClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "event-tab"
      );
    });

    test("It should call onClick with correct id parameter", async () => {
      const props: TabProps = {
        id: "specific-id-tab",
        ariaLabel: "Specific ID Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      await user.click(container);

      const callArgs = componentProps.onClick.mock.calls[0];
      expect(callArgs[1]).toBe("specific-id-tab");
    });

    test("It should call onClick handler multiple times on multiple clicks", async () => {
      const props: TabProps = {
        id: "multi-click-tab",
        ariaLabel: "Multi Click Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      await user.click(container);
      await user.click(container);
      await user.click(container);

      expect(componentProps.onClick).toHaveBeenCalledTimes(3);
    });

    test("It should attach click event listener to button", () => {
      const props: TabProps = {
        id: "listener-tab",
        ariaLabel: "Listener Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      const clickEvent = new MouseEvent("click", { bubbles: true });
      container.dispatchEvent(clickEvent);

      expect(componentProps.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Children Content Tests.", () => {
    test("It should handle empty string children", () => {
      const props: TabProps = {
        id: "empty-tab",
        ariaLabel: "Empty Tab",
        isActive: false,
        children: "",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("");
      expect(container.textContent).toBe("");
    });

    test("It should handle undefined children", () => {
      const props: TabProps = {
        id: "undefined-tab",
        ariaLabel: "Undefined Tab",
        isActive: false,
        children: undefined,
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("");
    });

    test("It should use nullish coalescing for children", () => {
      const props: TabProps = {
        id: "nullish-tab",
        ariaLabel: "Nullish Tab",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("");
    });

    test("It should handle HTML content in children", () => {
      const props: TabProps = {
        id: "html-content-tab",
        ariaLabel: "HTML Content Tab",
        isActive: false,
        children: "<em>Italic</em> and <strong>Bold</strong>",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.querySelector("em")).toBeInTheDocument();
      expect(container.querySelector("strong")).toBeInTheDocument();
    });

    test("It should handle long text content", () => {
      const longText =
        "This is a very long tab content that might span multiple lines";
      const props: TabProps = {
        id: "long-text-tab",
        ariaLabel: "Long Text Tab",
        isActive: false,
        children: longText,
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.textContent).toBe(longText);
    });
  });

  describe("Different IDs Tests.", () => {
    test("It should handle simple string id", () => {
      const props: TabProps = {
        id: "simple",
        ariaLabel: "Simple",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("simple");
    });

    test("It should handle id with dashes", () => {
      const props: TabProps = {
        id: "tab-with-dashes",
        ariaLabel: "Tab with Dashes",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("tab-with-dashes");
    });

    test("It should handle id with underscores", () => {
      const props: TabProps = {
        id: "tab_with_underscores",
        ariaLabel: "Tab with Underscores",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("tab_with_underscores");
    });

    test("It should handle numeric id", () => {
      const props: TabProps = {
        id: "tab-123",
        ariaLabel: "Numeric Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("tab-123");
    });
  });

  describe("Multiple Tabs Tests.", () => {
    test("It should render multiple tabs independently", () => {
      const props1: TabProps = {
        id: "tab-1",
        ariaLabel: "Tab 1",
        isActive: false,
        children: "Tab 1 Content",
        onClick: jest.fn(),
      };

      const props2: TabProps = {
        id: "tab-2",
        ariaLabel: "Tab 2",
        isActive: true,
        children: "Tab 2 Content",
        onClick: jest.fn(),
      };

      renderComponent(props1);
      renderComponent(props2);

      const tab1 = document.getElementById("tab-1");
      const tab2 = document.getElementById("tab-2");
      const allTabs = document.querySelectorAll(".tab");

      expect(tab1).toBeInTheDocument();
      expect(tab2).toBeInTheDocument();
      expect(allTabs.length).toBe(2);
    });

    test("It should handle different active states for multiple tabs", () => {
      const props1: TabProps = {
        id: "active-tab-1",
        ariaLabel: "Active Tab",
        isActive: true,
        children: "Active",
        onClick: jest.fn(),
      };

      const props2: TabProps = {
        id: "inactive-tab-1",
        ariaLabel: "Inactive Tab",
        isActive: false,
        children: "Inactive",
        onClick: jest.fn(),
      };

      const { container: tab1 } = renderComponent(props1);
      const { container: tab2 } = renderComponent(props2);

      expect(tab1).toHaveClass("tab--active");
      expect(tab2).not.toHaveClass("tab--active");
    });

    test("It should have unique ids for each tab", () => {
      const props1: TabProps = {
        id: "unique-1",
        ariaLabel: "Unique 1",
        isActive: false,
        children: "Content 1",
        onClick: jest.fn(),
      };

      const props2: TabProps = {
        id: "unique-2",
        ariaLabel: "Unique 2",
        isActive: false,
        children: "Content 2",
        onClick: jest.fn(),
      };

      const { container: tab1 } = renderComponent(props1);
      const { container: tab2 } = renderComponent(props2);

      expect(tab1.id).not.toBe(tab2.id);
    });

    test("It should work with different onClick handlers", async () => {
      const firstClickHandler = jest.fn();
      const secondClickHandler = jest.fn();

      const props1: TabProps = {
        id: "handler-tab-1",
        ariaLabel: "Handler Tab 1",
        isActive: false,
        children: "Content 1",
        onClick: firstClickHandler,
      };

      const props2: TabProps = {
        id: "handler-tab-2",
        ariaLabel: "Handler Tab 2",
        isActive: false,
        children: "Content 2",
        onClick: secondClickHandler,
      };

      const { container: tab1, props: props1Component } =
        renderComponent(props1);
      await user.click(tab1);

      document.body.innerHTML = "";

      const { container: tab2, props: props2Component } =
        renderComponent(props2);
      await user.click(tab2);

      expect(props1Component.onClick).toHaveBeenCalledTimes(1);
      expect(props2Component.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should have aria-label attribute", () => {
      const props: TabProps = {
        id: "a11y-tab",
        ariaLabel: "Accessible Label",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveAttribute("aria-label", "Accessible Label");
    });

    test("It should be keyboard accessible", () => {
      const props: TabProps = {
        id: "keyboard-tab",
        ariaLabel: "Keyboard Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      container.focus();
      expect(document.activeElement).toBe(container);
    });

    test("It should be a button element for accessibility", () => {
      const props: TabProps = {
        id: "button-tab",
        ariaLabel: "Button Tab",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("BUTTON");
      expect(container.type).toBe("button");
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle special characters in children", () => {
      const props: TabProps = {
        id: "special-chars-tab",
        ariaLabel: "Special Chars Tab",
        isActive: false,
        children: "Tab & Content <test>",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.textContent).toContain("Tab & Content");
    });

    test("It should handle special characters in aria-label", () => {
      const props: TabProps = {
        id: "special-label-tab",
        ariaLabel: "Tab & Label <test>",
        isActive: false,
        children: "Content",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.getAttribute("aria-label")).toBe("Tab & Label <test>");
    });
  });
});
