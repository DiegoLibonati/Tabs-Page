import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { TabsPage } from "@/pages/TabsPage/TabsPage";

import { mockTabs } from "@tests/__mocks__/tabs.mock";

jest.doMock("@/constants/tabs", () => ({
  default: mockTabs,
}));

const renderPage = (): Page => {
  const page = TabsPage();
  document.body.appendChild(page);
  return page;
};

describe("TabsPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("render", () => {
    it("should render main container with correct class", () => {
      renderPage();

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();
      expect(main.tagName).toBe("MAIN");
      expect(main).toHaveClass("tabs-page");
    });

    it("should render static header", () => {
      renderPage();

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("About us");
    });

    it("should render all tab buttons", () => {
      renderPage();

      const historyBtn = screen.getByRole("button", { name: /history/i });
      const visionBtn = screen.getByRole("button", { name: /vision/i });
      const goalsBtn = screen.getByRole("button", { name: /goals/i });

      expect(historyBtn).toBeInTheDocument();
      expect(visionBtn).toBeInTheDocument();
      expect(goalsBtn).toBeInTheDocument();
    });
  });

  describe("initial state", () => {
    it("should display history content by default", () => {
      const page = renderPage();

      const description =
        page.querySelector<HTMLParagraphElement>(".tabs__description");
      const image = screen.getByRole("img");
      const historyBtn = screen.getByRole("button", { name: /history/i });

      expect(description).toHaveTextContent(mockTabs.history.text);
      expect(image).toHaveAttribute("src", mockTabs.history.src);
      expect(historyBtn).toHaveClass("tab--active");
    });
  });

  describe("interaction", () => {
    it("should update content when clicking Vision tab", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      const visionBtn = screen.getByRole("button", { name: /vision/i });
      const historyBtn = screen.getByRole("button", { name: /history/i });

      await user.click(visionBtn);

      const description =
        page.querySelector<HTMLParagraphElement>(".tabs__description");
      const image = screen.getByRole("img");

      expect(description).toHaveTextContent(mockTabs.vision.text);
      expect(image).toHaveAttribute("src", mockTabs.vision.src);

      expect(visionBtn).toHaveClass("tab--active");
      expect(historyBtn).not.toHaveClass("tab--active");
    });

    it("should update content when clicking Goals tab", async () => {
      const user = userEvent.setup();
      const page = renderPage();
      const goalsBtn = screen.getByRole("button", { name: /goals/i });

      await user.click(goalsBtn);

      const description =
        page.querySelector<HTMLParagraphElement>(".tabs__description");
      const image = screen.getByRole("img");

      expect(description).toHaveTextContent(mockTabs.goals.text);
      expect(image).toHaveAttribute("src", mockTabs.goals.src);
      expect(goalsBtn).toHaveClass("tab--active");
    });
  });

  describe("cleanup", () => {
    it("should remove event listeners from all tabs", () => {
      const page = renderPage();

      const historyBtn = screen.getByRole("button", { name: /history/i });
      const visionBtn = screen.getByRole("button", { name: /vision/i });
      const goalsBtn = screen.getByRole("button", { name: /goals/i });

      const spyHistory = jest.spyOn(historyBtn, "removeEventListener");
      const spyVision = jest.spyOn(visionBtn, "removeEventListener");
      const spyGoals = jest.spyOn(goalsBtn, "removeEventListener");

      page.cleanup?.();

      expect(spyHistory).toHaveBeenCalledWith("click", expect.any(Function));
      expect(spyVision).toHaveBeenCalledWith("click", expect.any(Function));
      expect(spyGoals).toHaveBeenCalledWith("click", expect.any(Function));
    });
  });
});
