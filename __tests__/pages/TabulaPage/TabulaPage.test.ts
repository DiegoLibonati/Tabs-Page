import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import TabulaPage from "@/pages/TabulaPage/TabulaPage";

import { mockTabs } from "@tests/__mocks__/tabs.mock";

const renderPage = (): Page => {
  const element = TabulaPage();
  document.body.appendChild(element);
  return element;
};

describe("TabsPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render the header title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "About us" })
      ).toBeInTheDocument();
    });

    it("should render the header description", () => {
      renderPage();
      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    });

    it("should render the History tab button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Select History tab" })
      ).toBeInTheDocument();
    });

    it("should render the Vision tab button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Select Vision tab" })
      ).toBeInTheDocument();
    });

    it("should render the Goals tab button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Select Goals tab" })
      ).toBeInTheDocument();
    });

    it("should render the History tab as active by default", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Select History tab" })
      ).toHaveClass("tab--active");
    });

    it("should not render Vision and Goals tabs as active by default", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Select Vision tab" })
      ).not.toHaveClass("tab--active");
      expect(
        screen.getByRole("button", { name: "Select Goals tab" })
      ).not.toHaveClass("tab--active");
    });

    it("should render the initial tab image with history src", () => {
      renderPage();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        mockTabs.history.src
      );
    });

    it("should render the initial tab image with history alt text", () => {
      renderPage();
      expect(screen.getByRole("img")).toHaveAttribute(
        "alt",
        mockTabs.history.text
      );
    });

    it("should render the initial description with history text", () => {
      renderPage();
      expect(screen.getByText(mockTabs.history.text)).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    describe("when clicking the Vision tab", () => {
      it("should set the Vision tab as active", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: "Select Vision tab" })
        );
        expect(
          screen.getByRole("button", { name: "Select Vision tab" })
        ).toHaveClass("tab--active");
      });

      it("should remove the active class from the History tab", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: "Select Vision tab" })
        );
        expect(
          screen.getByRole("button", { name: "Select History tab" })
        ).not.toHaveClass("tab--active");
      });

      it("should update the image src to the vision src", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: "Select Vision tab" })
        );
        expect(screen.getByRole("img")).toHaveAttribute(
          "src",
          mockTabs.vision.src
        );
      });

      it("should update the description to the vision text", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: "Select Vision tab" })
        );
        expect(screen.getByText(mockTabs.vision.text)).toBeInTheDocument();
      });
    });

    describe("when clicking the Goals tab", () => {
      it("should set the Goals tab as active and update image and description", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: "Select Goals tab" })
        );
        expect(
          screen.getByRole("button", { name: "Select Goals tab" })
        ).toHaveClass("tab--active");
        expect(screen.getByRole("img")).toHaveAttribute(
          "src",
          mockTabs.goals.src
        );
        expect(screen.getByText(mockTabs.goals.text)).toBeInTheDocument();
      });
    });

    describe("when switching between tabs multiple times", () => {
      it("should only keep one tab active at a time", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: "Select Vision tab" })
        );
        await user.click(
          screen.getByRole("button", { name: "Select Goals tab" })
        );
        expect(
          screen.getByRole("button", { name: "Select Goals tab" })
        ).toHaveClass("tab--active");
        expect(
          screen.getByRole("button", { name: "Select Vision tab" })
        ).not.toHaveClass("tab--active");
        expect(
          screen.getByRole("button", { name: "Select History tab" })
        ).not.toHaveClass("tab--active");
      });

      it("should always render exactly one image", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: "Select Vision tab" })
        );
        await user.click(
          screen.getByRole("button", { name: "Select Goals tab" })
        );
        expect(screen.getAllByRole("img")).toHaveLength(1);
      });
    });
  });

  describe("cleanup", () => {
    it("should not throw when cleanup is called", () => {
      const element = renderPage();
      expect(() => element.cleanup?.()).not.toThrow();
    });

    it("should remove the tab image from the DOM after cleanup", () => {
      const element = renderPage();
      element.cleanup?.();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("should prevent tab clicks from updating the page after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderPage();
      element.cleanup?.();
      await user.click(
        screen.getByRole("button", { name: "Select Vision tab" })
      );
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });
});
