import { screen } from "@testing-library/dom";

import type { TabImageProps } from "@/types/props";
import type { TabImageComponent } from "@/types/components";

import { TabImage } from "@/components/TabImage/TabImage";

const renderComponent = (props: TabImageProps): TabImageComponent => {
  const component = TabImage(props);
  document.body.appendChild(component);
  return component;
};

describe("TabImage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("render", () => {
    it("should create an img element", () => {
      renderComponent({
        id: "test-img",
        src: "/test.jpg",
        title: "Test Image",
      });

      const image = screen.getByRole("img", { name: "Test Image" });
      expect(image).toBeInTheDocument();
      expect(image.tagName).toBe("IMG");
    });

    it("should have correct class and attributes", () => {
      renderComponent({
        id: "my-image",
        src: "/img/photo.jpg",
        title: "Architecture",
      });

      const image = screen.getByRole("img", { name: "Architecture" });
      expect(image).toHaveClass("tab-image");
      expect(image.id).toBe("my-image");
      expect(image).toHaveAttribute("src", "/img/photo.jpg");
      expect(image).toHaveAttribute("alt", "Architecture");
    });
  });
});
