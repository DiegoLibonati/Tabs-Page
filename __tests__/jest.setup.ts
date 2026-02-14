import "@testing-library/jest-dom";

import { mockTabs } from "@tests/__mocks__/tabs.mock";

jest.mock("@/constants/tabs", () => ({
  __esModule: true,
  default: mockTabs,
}));
