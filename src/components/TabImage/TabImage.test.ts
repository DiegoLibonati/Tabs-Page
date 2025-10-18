import { screen } from "@testing-library/dom";

import { TabImageProps } from "@src/entities/props";

import { TabImage } from "@src/components/TabImage/TabImage";

type RenderComponent = {
  container: HTMLImageElement;
  props: TabImageProps;
};

const renderComponent = (props: TabImageProps): RenderComponent => {
  const container = TabImage(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("TabImage.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: TabImageProps = {
        id: "test-image",
        src: "/test-image.jpg",
        title: "Test Image",
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLImageElement);
      expect(container.className).toBe("tab-image");
    });

    test("It should return HTMLImageElement", () => {
      const props: TabImageProps = {
        id: "test-image",
        src: "/test-image.jpg",
        title: "Test Image",
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("IMG");
    });

    test("It should have correct CSS class", () => {
      const props: TabImageProps = {
        id: "test-image",
        src: "/test-image.jpg",
        title: "Test Image",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("tab-image");
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should use correct id", () => {
      const props: TabImageProps = {
        id: "unique-image-id",
        src: "/image.jpg",
        title: "Image",
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("unique-image-id");
    });

    test("It should use correct src", () => {
      const props: TabImageProps = {
        id: "image-1",
        src: "/path/to/image.jpg",
        title: "My Image",
      };

      const { container } = renderComponent(props);

      expect(container.src).toContain("/path/to/image.jpg");
    });

    test("It should use title as alt attribute", () => {
      const props: TabImageProps = {
        id: "image-2",
        src: "/image.jpg",
        title: "Descriptive Title",
      };

      const { container } = renderComponent(props);

      expect(container.alt).toBe("Descriptive Title");
      expect(container.getAttribute("alt")).toBe("Descriptive Title");
    });

    test("It should render image with alt text from title prop", () => {
      const props: TabImageProps = {
        id: "alt-image",
        src: "/test.jpg",
        title: "Alternative Text",
      };

      renderComponent(props);

      const image = screen.getByAltText("Alternative Text");

      expect(image).toBeInTheDocument();
    });
  });

  describe("Image Source Tests.", () => {
    test("It should handle relative image paths", () => {
      const props: TabImageProps = {
        id: "relative-image",
        src: "./images/test.jpg",
        title: "Relative Path",
      };

      const { container } = renderComponent(props);

      expect(container.src).toContain("images/test.jpg");
    });

    test("It should handle absolute image paths", () => {
      const props: TabImageProps = {
        id: "absolute-image",
        src: "/assets/images/picture.png",
        title: "Absolute Path",
      };

      const { container } = renderComponent(props);

      expect(container.src).toContain("/assets/images/picture.png");
    });

    test("It should handle external image URLs", () => {
      const props: TabImageProps = {
        id: "external-image",
        src: "https://example.com/image.jpg",
        title: "External Image",
      };

      const { container } = renderComponent(props);

      expect(container.src).toBe("https://example.com/image.jpg");
    });

    test("It should handle different image formats", () => {
      const formats = ["jpg", "png", "gif", "webp", "svg"];

      formats.forEach((format) => {
        document.body.innerHTML = "";

        const props: TabImageProps = {
          id: `image-${format}`,
          src: `/image.${format}`,
          title: `${format.toUpperCase()} Image`,
        };

        const { container } = renderComponent(props);

        expect(container.src).toContain(`.${format}`);
      });
    });
  });

  describe("Different IDs Tests.", () => {
    test("It should handle simple string id", () => {
      const props: TabImageProps = {
        id: "simple",
        src: "/image.jpg",
        title: "Simple",
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("simple");
    });

    test("It should handle id with dashes", () => {
      const props: TabImageProps = {
        id: "image-with-dashes",
        src: "/image.jpg",
        title: "With Dashes",
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("image-with-dashes");
    });

    test("It should handle id with underscores", () => {
      const props: TabImageProps = {
        id: "image_with_underscores",
        src: "/image.jpg",
        title: "With Underscores",
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("image_with_underscores");
    });

    test("It should handle numeric id", () => {
      const props: TabImageProps = {
        id: "image-123",
        src: "/image.jpg",
        title: "Numeric",
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("image-123");
    });
  });

  describe("Multiple Images Tests.", () => {
    test("It should render multiple images independently", () => {
      const props1: TabImageProps = {
        id: "image-1",
        src: "/image1.jpg",
        title: "Image 1",
      };

      const props2: TabImageProps = {
        id: "image-2",
        src: "/image2.jpg",
        title: "Image 2",
      };

      renderComponent(props1);
      renderComponent(props2);

      const image1 = document.getElementById("image-1");
      const image2 = document.getElementById("image-2");
      const allImages = document.querySelectorAll(".tab-image");

      expect(image1).toBeInTheDocument();
      expect(image2).toBeInTheDocument();
      expect(allImages.length).toBe(2);
    });

    test("It should maintain separate attributes for multiple images", () => {
      const props1: TabImageProps = {
        id: "img-a",
        src: "/a.jpg",
        title: "Image A",
      };

      const props2: TabImageProps = {
        id: "img-b",
        src: "/b.jpg",
        title: "Image B",
      };

      const { container: img1 } = renderComponent(props1);
      const { container: img2 } = renderComponent(props2);

      expect(img1.src).toContain("a.jpg");
      expect(img1.alt).toBe("Image A");
      expect(img2.src).toContain("b.jpg");
      expect(img2.alt).toBe("Image B");
    });

    test("It should have unique ids for each image", () => {
      const props1: TabImageProps = {
        id: "unique-1",
        src: "/image.jpg",
        title: "Unique 1",
      };

      const props2: TabImageProps = {
        id: "unique-2",
        src: "/image.jpg",
        title: "Unique 2",
      };

      const { container: img1 } = renderComponent(props1);
      const { container: img2 } = renderComponent(props2);

      expect(img1.id).not.toBe(img2.id);
    });
  });

  describe("Title as Alt Text Tests.", () => {
    test("It should use title for alt attribute", () => {
      const props: TabImageProps = {
        id: "alt-test",
        src: "/test.jpg",
        title: "This is the title",
      };

      const { container } = renderComponent(props);

      expect(container.alt).toBe("This is the title");
    });

    test("It should handle long title as alt", () => {
      const longTitle = "This is a very long descriptive title for the image";
      const props: TabImageProps = {
        id: "long-title",
        src: "/image.jpg",
        title: longTitle,
      };

      const { container } = renderComponent(props);

      expect(container.alt).toBe(longTitle);
    });

    test("It should handle empty title", () => {
      const props: TabImageProps = {
        id: "empty-title",
        src: "/image.jpg",
        title: "",
      };

      const { container } = renderComponent(props);

      expect(container.alt).toBe("");
    });

    test("It should handle special characters in title", () => {
      const props: TabImageProps = {
        id: "special-title",
        src: "/image.jpg",
        title: "Title & Special <chars>",
      };

      const { container } = renderComponent(props);

      expect(container.alt).toBe("Title & Special <chars>");
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should have alt attribute for accessibility", () => {
      const props: TabImageProps = {
        id: "a11y-image",
        src: "/accessible.jpg",
        title: "Accessible Image",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveAttribute("alt");
      expect(container.alt).toBeTruthy();
    });

    test("It should use descriptive alt text from title", () => {
      const props: TabImageProps = {
        id: "descriptive-image",
        src: "/photo.jpg",
        title: "A beautiful sunset over the ocean",
      };

      const { container } = renderComponent(props);

      expect(container.alt).toBe("A beautiful sunset over the ocean");
    });

    test("It should be findable by alt text", () => {
      const props: TabImageProps = {
        id: "findable-image",
        src: "/image.jpg",
        title: "Findable Image",
      };

      renderComponent(props);

      const image = screen.getByAltText("Findable Image");

      expect(image).toBeInTheDocument();
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle empty src", () => {
      const props: TabImageProps = {
        id: "empty-src",
        src: "",
        title: "Empty Source",
      };

      const { container } = renderComponent(props);

      expect(container.src).toBeTruthy(); // Will contain the base URL
    });

    test("It should handle src with query parameters", () => {
      const props: TabImageProps = {
        id: "query-image",
        src: "/image.jpg?width=500&height=300",
        title: "Query Image",
      };

      const { container } = renderComponent(props);

      expect(container.src).toContain("width=500");
      expect(container.src).toContain("height=300");
    });

    test("It should handle data URL as src", () => {
      const props: TabImageProps = {
        id: "data-image",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg",
        title: "Data URL Image",
      };

      const { container } = renderComponent(props);

      expect(container.src).toContain("data:image/png;base64");
    });
  });

  describe("Props Integration Tests.", () => {
    test("It should use all props correctly", () => {
      const props: TabImageProps = {
        id: "integration-test",
        src: "/integration.jpg",
        title: "Integration Test Image",
      };

      const { container, props: componentProps } = renderComponent(props);

      expect(container.id).toBe(componentProps.id);
      expect(container.src).toContain(componentProps.src);
      expect(container.alt).toBe(componentProps.title);
    });

    test("It should maintain prop values after rendering", () => {
      const props: TabImageProps = {
        id: "prop-values",
        src: "/props.jpg",
        title: "Props Test",
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("prop-values");
      expect(container.alt).toBe("Props Test");
    });
  });

  describe("Image Element Properties Tests.", () => {
    test("It should be an img element", () => {
      const props: TabImageProps = {
        id: "img-element",
        src: "/image.jpg",
        title: "Image Element",
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLImageElement);
    });

    test("It should have src attribute set", () => {
      const props: TabImageProps = {
        id: "src-test",
        src: "/test.jpg",
        title: "Source Test",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveAttribute("src");
      expect(container.getAttribute("src")).toBeTruthy();
    });

    test("It should have alt attribute set", () => {
      const props: TabImageProps = {
        id: "alt-attr-test",
        src: "/test.jpg",
        title: "Alt Attribute Test",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveAttribute("alt");
    });

    test("It should have id attribute set", () => {
      const props: TabImageProps = {
        id: "id-attr-test",
        src: "/test.jpg",
        title: "ID Attribute Test",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveAttribute("id");
      expect(container.id).toBe("id-attr-test");
    });
  });
});
