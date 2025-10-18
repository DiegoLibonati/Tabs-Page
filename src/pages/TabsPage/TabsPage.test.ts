import { screen, waitFor } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { TabsPage } from "@src/pages/TabsPage/TabsPage";

import tabsData from "@src/constants/tabs";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = TabsPage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/constants/tabs", () => {
  const { mockTabs } = jest.requireActual("@tests/jest.constants");
  return { __esModule: true, default: mockTabs };
});

describe("TabsPage.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the main component structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("tabs-page");
      expect(container.querySelector(".page-wrapper")).toBeInTheDocument();
    });

    test("It should render header section", () => {
      renderComponent();

      const headerWrapper = document.querySelector(".header-wrapper");
      const title = screen.getByText("About us");
      const description = document.querySelector(".header__description");

      expect(headerWrapper).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(description?.textContent).toContain("Lorem ipsum dolor sit");
    });

    test("It should render h1 for title", () => {
      renderComponent();

      const title = document.querySelector(
        ".header__title"
      ) as HTMLHeadingElement;

      expect(title).toBeInstanceOf(HTMLHeadingElement);
      expect(title.tagName).toBe("H1");
    });

    test("It should render tabs section", () => {
      renderComponent();

      const tabs = document.querySelector(".tabs");
      const tabsWrapper = document.querySelector(".tabs-wrapper");
      const tabsList = document.querySelector(".tabs__list");
      const tabsDescription = document.querySelector(".tabs__description");

      expect(tabs).toBeInTheDocument();
      expect(tabsWrapper).toBeInTheDocument();
      expect(tabsList).toBeInTheDocument();
      expect(tabsDescription).toBeInTheDocument();
    });
  });

  describe("Tabs Rendering Tests.", () => {
    test("It should render all three tab buttons", () => {
      renderComponent();

      const historyTab = screen.getByRole("button", {
        name: /history button/i,
      });
      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const goalsTab = screen.getByRole("button", { name: /goals button/i });

      expect(historyTab).toBeInTheDocument();
      expect(visionTab).toBeInTheDocument();
      expect(goalsTab).toBeInTheDocument();
    });

    test("It should render tabs with correct text content", () => {
      renderComponent();

      const historyTab = screen.getByText("History");
      const visionTab = screen.getByText("Vision");
      const goalsTab = screen.getByText("Goals");

      expect(historyTab).toBeInTheDocument();
      expect(visionTab).toBeInTheDocument();
      expect(goalsTab).toBeInTheDocument();
    });

    test("It should render tabs with correct ids", () => {
      renderComponent();

      const historyTab = document.getElementById("history");
      const visionTab = document.getElementById("vision");
      const goalsTab = document.getElementById("goals");

      expect(historyTab).toBeInTheDocument();
      expect(visionTab).toBeInTheDocument();
      expect(goalsTab).toBeInTheDocument();
    });

    test("It should append all tabs to tabs list", () => {
      renderComponent();

      const tabsList = document.querySelector(".tabs__list");
      const tabs = tabsList?.querySelectorAll(".tab");

      expect(tabs?.length).toBe(3);
    });
  });

  describe("Initial State Tests.", () => {
    test("It should have history tab active by default", () => {
      renderComponent();

      const historyTab = document.getElementById("history");

      expect(historyTab).toHaveClass("tab--active");
    });

    test("It should have only history tab active initially", () => {
      renderComponent();

      const visionTab = document.getElementById("vision");
      const goalsTab = document.getElementById("goals");
      const activeTabs = document.querySelectorAll(".tab--active");

      expect(activeTabs.length).toBe(1);
      expect(visionTab).not.toHaveClass("tab--active");
      expect(goalsTab).not.toHaveClass("tab--active");
    });

    test("It should display initial tab image", () => {
      renderComponent();

      const tabImage = document.querySelector(".tab-image");

      expect(tabImage).toBeInTheDocument();
    });

    test("It should display initial tab description", () => {
      renderComponent();

      const tabsDescription = document.querySelector(".tabs__description");

      expect(tabsDescription?.textContent).toBe(tabsData.history.text);
    });

    test("It should display history tab content initially", () => {
      renderComponent();

      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;
      const tabsDescription = document.querySelector(".tabs__description");

      expect(tabImage.src).toContain(tabsData.history.src);
      expect(tabImage.alt).toBe(tabsData.history.text);
      expect(tabsDescription?.textContent).toBe(tabsData.history.text);
    });
  });

  describe("Tab Image Tests.", () => {
    test("It should render tab image with correct attributes", () => {
      renderComponent();

      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;

      expect(tabImage).toBeInTheDocument();
      expect(tabImage.id).toBe("tab-image");
      expect(tabImage).toHaveClass("tab-image");
    });

    test("It should append tab image to tabs section", () => {
      renderComponent();

      const tabs = document.querySelector(".tabs");
      const tabImage = tabs?.querySelector(".tab-image");

      expect(tabImage).toBeInTheDocument();
    });

    test("It should create TabImage component with correct props", () => {
      renderComponent();

      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;

      expect(tabImage.src).toContain(tabsData.history.src);
      expect(tabImage.alt).toBe(tabsData.history.text);
    });
  });

  describe("Tab Change Tests.", () => {
    test("It should change active tab when clicking on vision tab", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const historyTab = document.getElementById("history");

      await user.click(visionTab);

      expect(visionTab).toHaveClass("tab--active");
      expect(historyTab).not.toHaveClass("tab--active");
    });

    test("It should change active tab when clicking on goals tab", async () => {
      renderComponent();

      const goalsTab = screen.getByRole("button", { name: /goals button/i });
      const historyTab = document.getElementById("history");

      await user.click(goalsTab);

      expect(goalsTab).toHaveClass("tab--active");
      expect(historyTab).not.toHaveClass("tab--active");
    });

    test("It should maintain only one active tab at a time", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });

      await user.click(visionTab);

      const activeTabs = document.querySelectorAll(".tab--active");
      expect(activeTabs.length).toBe(1);
    });

    test("It should update description when changing tabs", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const tabsDescription = document.querySelector(".tabs__description");

      await user.click(visionTab);

      expect(tabsDescription?.textContent).toBe(tabsData.vision.text);
    });

    test("It should update tab image when changing tabs", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });

      await user.click(visionTab);

      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;

      expect(tabImage.src).toContain(tabsData.vision.src);
      expect(tabImage.alt).toBe(tabsData.vision.text);
    });

    test("It should remove previous tab image before adding new one", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });

      await user.click(visionTab);

      const tabImages = document.querySelectorAll(".tab-image");

      expect(tabImages.length).toBe(1);
    });
  });

  describe("Multiple Tab Changes Tests.", () => {
    test("It should handle multiple consecutive tab changes", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const goalsTab = screen.getByRole("button", { name: /goals button/i });
      const historyTab = screen.getByRole("button", {
        name: /history button/i,
      });

      await user.click(visionTab);
      expect(visionTab).toHaveClass("tab--active");

      await user.click(goalsTab);
      expect(goalsTab).toHaveClass("tab--active");
      expect(visionTab).not.toHaveClass("tab--active");

      await user.click(historyTab);
      expect(historyTab).toHaveClass("tab--active");
      expect(goalsTab).not.toHaveClass("tab--active");
    });

    test("It should update content correctly on multiple tab changes", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const goalsTab = screen.getByRole("button", { name: /goals button/i });
      const tabsDescription = document.querySelector(".tabs__description");

      await user.click(visionTab);
      expect(tabsDescription?.textContent).toBe(tabsData.vision.text);

      await user.click(goalsTab);
      expect(tabsDescription?.textContent).toBe(tabsData.goals.text);
    });

    test("It should not accumulate images on multiple tab changes", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const goalsTab = screen.getByRole("button", { name: /goals button/i });

      await user.click(visionTab);
      await user.click(goalsTab);
      await user.click(visionTab);

      const tabImages = document.querySelectorAll(".tab-image");
      expect(tabImages.length).toBe(1);
    });
  });

  describe("Tab Data Integration Tests.", () => {
    test("It should use tabsData for history tab", () => {
      renderComponent();

      const tabsDescription = document.querySelector(".tabs__description");
      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;

      expect(tabsDescription?.textContent).toBe(tabsData.history.text);
      expect(tabImage.src).toContain(tabsData.history.src);
    });

    test("It should use tabsData for vision tab", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });

      await user.click(visionTab);

      const tabsDescription = document.querySelector(".tabs__description");
      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;

      expect(tabsDescription?.textContent).toBe(tabsData.vision.text);
      expect(tabImage.src).toContain(tabsData.vision.src);
    });

    test("It should use tabsData for goals tab", async () => {
      renderComponent();

      const goalsTab = screen.getByRole("button", { name: /goals button/i });

      await user.click(goalsTab);

      const tabsDescription = document.querySelector(".tabs__description");
      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;

      expect(tabsDescription?.textContent).toBe(tabsData.goals.text);
      expect(tabImage.src).toContain(tabsData.goals.src);
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should have correct section structure", () => {
      const { container } = renderComponent();

      const pageWrapper = container.querySelector(".page-wrapper");
      const headerWrapper = pageWrapper?.querySelector(".header-wrapper");
      const tabs = pageWrapper?.querySelector(".tabs");

      expect(pageWrapper?.tagName).toBe("SECTION");
      expect(headerWrapper?.tagName).toBe("ARTICLE");
      expect(tabs?.tagName).toBe("ARTICLE");
    });

    test("It should nest tabs list inside tabs wrapper", () => {
      renderComponent();

      const tabsWrapper = document.querySelector(".tabs-wrapper");
      const tabsList = tabsWrapper?.querySelector(".tabs__list");

      expect(tabsList).toBeInTheDocument();
    });

    test("It should nest description inside tabs wrapper", () => {
      renderComponent();

      const tabsWrapper = document.querySelector(".tabs-wrapper");
      const tabsDescription = tabsWrapper?.querySelector(".tabs__description");

      expect(tabsDescription).toBeInTheDocument();
    });

    test("It should nest image inside tabs section", () => {
      renderComponent();

      const tabs = document.querySelector(".tabs");
      const tabImage = tabs?.querySelector(".tab-image");

      expect(tabImage).toBeInTheDocument();
    });
  });

  describe("Active Class Management Tests.", () => {
    test("It should remove active class from previous tab", async () => {
      renderComponent();

      const historyTab = document.getElementById("history");
      const visionTab = screen.getByRole("button", { name: /vision button/i });

      expect(historyTab).toHaveClass("tab--active");

      await user.click(visionTab);

      expect(historyTab).not.toHaveClass("tab--active");
    });

    test("It should add active class to clicked tab", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });

      expect(visionTab).not.toHaveClass("tab--active");

      await user.click(visionTab);

      expect(visionTab).toHaveClass("tab--active");
    });

    test("It should transfer active class between tabs", async () => {
      renderComponent();

      const historyTab = document.getElementById("history");
      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const goalsTab = screen.getByRole("button", { name: /goals button/i });

      await user.click(visionTab);
      expect(historyTab).not.toHaveClass("tab--active");
      expect(visionTab).toHaveClass("tab--active");

      await user.click(goalsTab);
      expect(visionTab).not.toHaveClass("tab--active");
      expect(goalsTab).toHaveClass("tab--active");
    });
  });

  describe("Tab Description Tests.", () => {
    test("It should have paragraph element for description", () => {
      renderComponent();

      const tabsDescription = document.querySelector(".tabs__description");

      expect(tabsDescription).toBeInstanceOf(HTMLParagraphElement);
      expect(tabsDescription?.tagName).toBe("P");
    });

    test("It should have id attribute on description", () => {
      renderComponent();

      const tabsDescription = document.querySelector(".tabs__description");

      expect(tabsDescription?.id).toBe("tab-text");
    });

    test("It should update description text content on tab change", async () => {
      renderComponent();

      const tabsDescription = document.querySelector(".tabs__description");
      const visionTab = screen.getByRole("button", { name: /vision button/i });

      const initialText = tabsDescription?.textContent;

      await user.click(visionTab);

      expect(tabsDescription?.textContent).not.toBe(initialText);
      expect(tabsDescription?.textContent).toBe(tabsData.vision.text);
    });
  });

  describe("Click Handler Tests.", () => {
    test("It should execute changeTabInformation on tab click", async () => {
      renderComponent();

      const visionTab = screen.getByRole("button", { name: /vision button/i });
      const tabsDescription = document.querySelector(".tabs__description");

      const initialDescription = tabsDescription?.textContent;

      await user.click(visionTab);

      expect(tabsDescription?.textContent).not.toBe(initialDescription);
    });

    test("It should pass correct id to changeTabInformation", async () => {
      renderComponent();

      const goalsTab = screen.getByRole("button", { name: /goals button/i });

      await user.click(goalsTab);

      const tabsDescription = document.querySelector(".tabs__description");
      const tabImage = document.querySelector(".tab-image") as HTMLImageElement;

      expect(tabsDescription?.textContent).toBe(tabsData.goals.text);
      expect(tabImage.src).toContain(tabsData.goals.src);
    });
  });
});
