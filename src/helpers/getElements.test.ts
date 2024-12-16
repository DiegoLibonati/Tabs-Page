import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { btnsTab, tabImage, tabText } = getElements();

  expect(tabImage).toBeInTheDocument();
  expect(tabText).toBeInTheDocument();

  for (let btnTab of btnsTab) {
    expect(btnTab).toBeInTheDocument();
  }
});