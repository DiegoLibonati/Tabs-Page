import type { TabImageProps } from "@/types/props";
import type { TabImageComponent } from "@/types/components";

import { TabImage } from "@/components/TabImage/TabImage";

const renderComponent = (props: TabImageProps): TabImageComponent => {
  const container = TabImage(props);
  document.body.appendChild(container);
  return container;
};

describe("TabImage Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: TabImageProps = {
    id: "test-image",
    src: "/images/test.jpg",
    title: "Test Image",
  };

  it("should render image with correct attributes", () => {
    renderComponent(defaultProps);

    const image = document.querySelector<HTMLImageElement>("#test-image");
    expect(image).toBeInTheDocument();
    expect(image?.tagName).toBe("IMG");
    expect(image).toHaveClass("tab-image");
    expect(image).toHaveAttribute("src", "/images/test.jpg");
    expect(image).toHaveAttribute("alt", "Test Image");
  });

  it("should use title as alt text", () => {
    const propsWithDifferentTitle: TabImageProps = {
      ...defaultProps,
      title: "Different Title",
    };

    renderComponent(propsWithDifferentTitle);

    const image = document.querySelector<HTMLImageElement>("#test-image");
    expect(image).toHaveAttribute("alt", "Different Title");
  });
});
