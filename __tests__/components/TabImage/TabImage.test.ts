import { screen } from "@testing-library/dom";

import type { TabImageProps } from "@/types/props";
import type { TabImageComponent } from "@/types/components";

import TabImage from "@/components/TabImage/TabImage";

const defaultProps: TabImageProps = {
  id: "tab-image",
  src: "/images/history.jpg",
  title: "Our history",
};

const renderComponent = (
  props: Partial<TabImageProps> = {}
): TabImageComponent => {
  const element = TabImage({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("TabImage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render an img element", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should set the correct id", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute("id", "tab-image");
    });

    it("should set the correct src", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/images/history.jpg"
      );
    });

    it("should set the alt from the title prop", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute("alt", "Our history");
    });

    it("should have the tab-image class", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveClass("tab-image");
    });

    it("should set a different src when provided", () => {
      renderComponent({ src: "/images/vision.jpg" });
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/images/vision.jpg"
      );
    });

    it("should set a different id when provided", () => {
      renderComponent({ id: "vision-image" });
      expect(screen.getByRole("img")).toHaveAttribute("id", "vision-image");
    });
  });
});
