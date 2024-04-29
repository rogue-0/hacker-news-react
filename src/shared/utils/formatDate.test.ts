import { formatDate } from "./formatDate";

describe("formatDate", () => {
  test("1714380156 equals 13:42 · 29 Apr 2024", () => {
    expect(formatDate(1714380156)).toBe("13:42 · 29 Apr 2024");
  });

  test("1714376490 equals 12:41 · 29 Apr 2024", () => {
    expect(formatDate(1714376490)).toBe("12:41 · 29 Apr 2024");
  });
});
