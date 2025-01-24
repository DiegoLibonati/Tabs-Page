import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { mockTabs, OFFICIAL_BODY } from "./tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    const initTabKey = "history";
    const initTab = mockTabs[initTabKey];

    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the title and the description of the APP. Also it must render the active tab with its respective image, the three buttons, with the active button based on the active tab and the description of the tab.", () => {
      const titleApp = screen.getByRole("heading", { name: /about us/i });
      const descriptionApp = screen.getByText(
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, voluptate. Ipsam nisi nihil cum iusto?"
      );
      const img = screen.getByRole("img");
      const btns = screen.getAllByRole("button");
      const descriptionTab = screen.getByText(initTab.text);

      expect(titleApp).toBeInTheDocument();
      expect(descriptionApp).toBeInTheDocument();
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", initTab.src);
      expect(descriptionTab).toBeInTheDocument();

      for (let btn of btns) {
        if (btn.id === initTabKey)
          expect(
            btn.classList.contains("tabs-wrapper__list-tab--active")
          ).toBeTruthy();
        expect(btn).toBeInTheDocument();
      }
    });

    test("It should render a different tab when the new selected tab is clicked.", async () => {
      const btns = screen.getAllByRole("button");

      const btnDiffOfInitTabKey = btns.find((btn) => btn.id !== initTabKey);
      const tabCurrentKey = btnDiffOfInitTabKey!.id;

      expect(btnDiffOfInitTabKey).toBeInTheDocument();
      expect(
        btnDiffOfInitTabKey?.classList.contains("tabs-wrapper__list-tab--active")
      ).toBeFalsy();

      await user.click(btnDiffOfInitTabKey!);

      const currentTab = mockTabs[tabCurrentKey as keyof typeof mockTabs];

      const img = screen.getByRole("img");
      const descriptionTab = screen.getByText(currentTab.text);

      expect(
        btnDiffOfInitTabKey?.classList.contains("tabs-wrapper__list-tab--active")
      ).toBeTruthy();
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", currentTab.src);
      expect(descriptionTab).toBeInTheDocument();
    });
  });
});
