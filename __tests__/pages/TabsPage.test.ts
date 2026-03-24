import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { TabsPage } from "@/pages/TabsPage/TabsPage";

const renderPage = (): Page => {
  const container = TabsPage();
  document.body.appendChild(container);
  return container;
};

describe("TabsPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".tabs-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render header with title and description", () => {
    renderPage();

    const title = screen.getByRole("heading", { name: "About us" });
    expect(title).toBeInTheDocument();

    const description = document.querySelector<HTMLParagraphElement>(
      ".header__description"
    );
    expect(description).toBeInTheDocument();
  });

  it("should render three tab buttons", () => {
    renderPage();

    const historyButton = screen.getByRole("button", {
      name: "Select History tab",
    });
    const visionButton = screen.getByRole("button", {
      name: "Select Vision tab",
    });
    const goalsButton = screen.getByRole("button", {
      name: "Select Goals tab",
    });

    expect(historyButton).toBeInTheDocument();
    expect(visionButton).toBeInTheDocument();
    expect(goalsButton).toBeInTheDocument();
  });

  it("should have history tab active by default", () => {
    renderPage();

    const historyButton = screen.getByRole("button", {
      name: "Select History tab",
    });
    expect(historyButton).toHaveClass("tab--active");
  });

  it("should display initial tab image and text", () => {
    renderPage();

    const image = document.querySelector<HTMLImageElement>("#tab-image");
    const description =
      document.querySelector<HTMLParagraphElement>("#tab-text");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/history.jpg");
    expect(description?.textContent).toBe(
      "Our history is rich and meaningful."
    );
  });

  it("should change tab content when clicking vision tab", async () => {
    const user = userEvent.setup();
    renderPage();

    const visionButton = screen.getByRole("button", {
      name: "Select Vision tab",
    });
    await user.click(visionButton);

    const image = document.querySelector<HTMLImageElement>("#tab-image");
    const description =
      document.querySelector<HTMLParagraphElement>("#tab-text");

    expect(visionButton).toHaveClass("tab--active");
    expect(image).toHaveAttribute("src", "/images/vision.jpg");
    expect(description?.textContent).toBe(
      "Our vision is to lead the industry."
    );
  });

  it("should change tab content when clicking goals tab", async () => {
    const user = userEvent.setup();
    renderPage();

    const goalsButton = screen.getByRole("button", {
      name: "Select Goals tab",
    });
    await user.click(goalsButton);

    const image = document.querySelector<HTMLImageElement>("#tab-image");
    const description =
      document.querySelector<HTMLParagraphElement>("#tab-text");

    expect(goalsButton).toHaveClass("tab--active");
    expect(image).toHaveAttribute("src", "/images/goals.jpg");
    expect(description?.textContent).toBe(
      "Our goals are ambitious and achievable."
    );
  });

  it("should remove active class from previous tab when switching", async () => {
    const user = userEvent.setup();
    renderPage();

    const historyButton = screen.getByRole("button", {
      name: "Select History tab",
    });
    const visionButton = screen.getByRole("button", {
      name: "Select Vision tab",
    });

    expect(historyButton).toHaveClass("tab--active");

    await user.click(visionButton);

    expect(historyButton).not.toHaveClass("tab--active");
    expect(visionButton).toHaveClass("tab--active");
  });

  it("should cleanup tabs and remove image on page cleanup", () => {
    const page = renderPage();

    const image = document.querySelector<HTMLImageElement>("#tab-image");
    expect(image).toBeInTheDocument();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    const imageAfterCleanup =
      document.querySelector<HTMLImageElement>("#tab-image");
    expect(imageAfterCleanup).not.toBeInTheDocument();
  });
});
