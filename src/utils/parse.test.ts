/**
 * Comprehensive test suite for the date format parser using Bun test framework
 * Tests US format prioritization, ambiguity detection, and edge cases
 */

import { test, expect, describe } from "bun:test";
import {
  parseDateStringToFormats,
  getDateFormats,
  getBestDateFormat,
} from "./parse";

describe("Date Format Parser", () => {
  describe("US Format Prioritization", () => {
    test("should prioritize US format MM/dd/yyyy over dd/MM/yyyy", () => {
      const formats = getDateFormats("03/10/1990");
      expect(formats).toEqual(["MM/dd/yyyy", "dd/MM/yyyy"]);
      expect(formats[0]).toBe("MM/dd/yyyy"); // US format first
    });

    test("should prioritize US format M/d/yy over d/M/yy", () => {
      const formats = getDateFormats("3/5/90");
      expect(formats).toEqual(["M/d/yy", "d/M/yy"]);
      expect(formats[0]).toBe("M/d/yy"); // US format first
    });

    test("should return only US format when day > 12 (unambiguous)", () => {
      const formats = getDateFormats("12/25/1990");
      expect(formats).toEqual(["MM/dd/yyyy"]);
    });

    test("should return only international format when month > 12 (unambiguous)", () => {
      const formats = getDateFormats("25/12/1990");
      expect(formats).toEqual(["dd/MM/yyyy"]);
    });

    test("getBestDateFormat should return US format first", () => {
      const best = getBestDateFormat("03/10/1990");
      expect(best).toBe("MM/dd/yyyy");
    });
  });

  describe("Unambiguous Date Formats", () => {
    test("should correctly parse full month names", () => {
      const formats = getDateFormats("March 10, 1990");
      expect(formats).toEqual(["MMMM dd, yyyy"]);
    });

    test("should correctly parse short month names", () => {
      const formats = getDateFormats("Mar 10, 1990");
      expect(formats).toEqual(["MMM dd, yyyy"]);
    });

    test("should correctly parse full day names", () => {
      const formats = getDateFormats("Sunday, March 10, 1990");
      expect(formats).toEqual(["EEEE, MMMM dd, yyyy"]);
    });

    test("should correctly parse short day names", () => {
      const formats = getDateFormats("Sun Mar 10 1990");
      expect(formats).toEqual(["EEE MMM dd yyyy"]);
    });

    test("should correctly parse 4-digit years", () => {
      const formats = getDateFormats("10/03/2023");
      expect(formats[0]).toContain("yyyy");
    });

    test("should correctly parse 2-digit years", () => {
      const formats = getDateFormats("10/03/23");
      expect(formats[0]).toContain("yy");
    });
  });

  describe("Time Format Detection", () => {
    test("should correctly parse 24-hour time", () => {
      const formats = getDateFormats("14:30:45");
      expect(formats).toEqual(["HH:mm:ss"]);
    });

    test("should correctly parse 12-hour time with AM/PM", () => {
      const formats = getDateFormats("2:30 PM");
      expect(formats).toEqual(["h:mm aa"]);
    });

    test("should correctly parse zero-padded 12-hour time", () => {
      const formats = getDateFormats("02:30:45 AM");
      expect(formats).toEqual(["hh:mm:ss aa"]);
    });

    test("should correctly parse time without seconds", () => {
      const formats = getDateFormats("14:30");
      expect(formats).toEqual(["HH:mm"]);
    });

    test("should handle mixed date and time", () => {
      const formats = getDateFormats("03/10/1990 2:30 PM");
      expect(formats[0]).toBe("MM/dd/yyyy h:mm aa");
    });
  });

  describe("Edge Cases and Validation", () => {
    test("should throw error for empty string", () => {
      expect(() => getDateFormats("")).toThrow(
        "Input must be a non-empty string"
      );
    });

    test("should throw error for null input", () => {
      expect(() => getDateFormats(null as any)).toThrow(
        "Input must be a non-empty string"
      );
    });

    test("should throw error for undefined input", () => {
      expect(() => getDateFormats(undefined as any)).toThrow(
        "Input must be a non-empty string"
      );
    });

    test("should handle single digit dates", () => {
      const formats = getDateFormats("3/5/1990");
      expect(formats[0]).toBe("M/d/yyyy");
    });

    test("should handle mixed padding", () => {
      const formats = getDateFormats("03/5/1990");
      expect(formats[0]).toBe("MM/d/yyyy");
    });

    test("should handle different separators", () => {
      const formats1 = getDateFormats("03-10-1990");
      const formats2 = getDateFormats("03.10.1990");
      const formats3 = getDateFormats("03 10 1990");

      expect(formats1[0]).toBe("MM-dd-yyyy");
      expect(formats2[0]).toBe("MM.dd.yyyy");
      expect(formats3[0]).toBe("MM dd yyyy");
    });
  });

  describe("Ambiguity Detection", () => {
    test("should detect ambiguity in MM/dd vs dd/MM", () => {
      const result = parseDateStringToFormats("03/10/1990");
      expect(result.hasAmbiguity).toBe(true);
      expect(result.interpretations.length).toBe(2);
    });

    test("should not detect ambiguity when day > 12", () => {
      const result = parseDateStringToFormats("12/25/1990");
      expect(result.hasAmbiguity).toBe(false);
      expect(result.interpretations.length).toBe(1);
    });

    test("should not detect ambiguity with month names", () => {
      const result = parseDateStringToFormats("March 10, 1990");
      expect(result.hasAmbiguity).toBe(false);
      expect(result.interpretations.length).toBe(1);
    });

    test("should provide reasoning for interpretations", () => {
      const result = parseDateStringToFormats("03/10/1990");
      expect(result.interpretations[0].reasoning).toBeDefined();
      expect(result.interpretations[0].reasoning.length).toBeGreaterThan(0);
    });
  });

  describe("Confidence Scoring", () => {
    test("should give higher confidence to US format", () => {
      const result = parseDateStringToFormats("03/10/1990");
      const usFormat = result.interpretations.find((i) => i.isUSFormat);
      const nonUsFormat = result.interpretations.find((i) => !i.isUSFormat);

      expect(usFormat?.confidence).toBeGreaterThan(
        nonUsFormat?.confidence || 0
      );
    });

    test("should give high confidence to unambiguous formats", () => {
      const result = parseDateStringToFormats("March 10, 1990");
      expect(result.interpretations[0].confidence).toBeGreaterThan(90);
    });

    test("should give lower confidence to ambiguous formats", () => {
      const result = parseDateStringToFormats("03/10/1990");
      result.interpretations.forEach((interp) => {
        expect(interp.confidence).toBeLessThan(100);
      });
    });
  });

  describe("Token Information", () => {
    test("should provide detailed token information", () => {
      const result = parseDateStringToFormats("03/10/1990");
      const tokens = result.interpretations[0].tokens;

      expect(tokens).toHaveLength(3);
      expect(tokens[0].originalValue).toBe("03");
      expect(tokens[0].token).toBe("MM");
      expect(tokens[0].position).toEqual([0, 2]);
    });

    test("should include token descriptions", () => {
      const result = parseDateStringToFormats("March 10, 1990");
      const tokens = result.interpretations[0].tokens;

      expect(tokens[0].description).toContain("month");
    });
  });

  describe("Complex Date Formats", () => {
    test("should handle ISO-like formats", () => {
      const formats = getDateFormats("1990-03-10");
      expect(formats[0]).toBe("yyyy-MM-dd");
    });

    test("should handle European format with dots", () => {
      const formats = getDateFormats("10.03.1990");
      expect(formats[0]).toBe("MM.dd.yyyy"); // US format first
    });

    test("should handle long format with weekday", () => {
      const formats = getDateFormats("Saturday, March 10, 1990");
      expect(formats).toEqual(["EEEE, MMMM dd, yyyy"]);
    });

    test("should handle timestamp-like format", () => {
      const formats = getDateFormats("Mar 10 1990 14:30:45");
      expect(formats).toEqual(["MMM dd yyyy HH:mm:ss"]);
    });
  });

  describe("Time-only Formats", () => {
    test("should handle various time formats", () => {
      expect(getDateFormats("14:30")).toEqual(["HH:mm"]);
      expect(getDateFormats("2:30")).toEqual(["H:mm"]);
      expect(getDateFormats("02:30")).toEqual(["HH:mm"]);
      expect(getDateFormats("14:30:45")).toEqual(["HH:mm:ss"]);
    });

    test("should handle AM/PM variations", () => {
      expect(getDateFormats("2:30 PM")).toEqual(["h:mm aa"]);
      expect(getDateFormats("2:30 pm")).toEqual(["h:mm aa"]);
      expect(getDateFormats("02:30 AM")).toEqual(["hh:mm aa"]);
    });
  });

  describe("Performance and Edge Cases", () => {
    test("should handle very long date strings", () => {
      const longDate = "Sunday, the 10th of March, in the year 1990";
      // Should not crash, even if it doesn't parse perfectly
      expect(() => getDateFormats(longDate)).not.toThrow();
    });

    test("should handle numbers that could be confused", () => {
      // Test edge case where numbers could be hours, minutes, days, months
      const formats = getDateFormats("12:12:12");
      expect(formats[0]).toBe("HH:mm:ss");
    });

    test("should handle single numbers", () => {
      const formats = getDateFormats("1990");
      expect(formats).toEqual(["yyyy"]);
    });

    test("should preserve original formatting characters", () => {
      const formats = getDateFormats("03/10/1990 @ 2:30 PM");
      expect(formats[0]).toBe("MM/dd/yyyy @ h:mm aa");
    });
  });

  describe("Return Value Structure", () => {
    test("parseDateStringToFormats should return correct structure", () => {
      const result = parseDateStringToFormats("03/10/1990");

      expect(result).toHaveProperty("originalString");
      expect(result).toHaveProperty("interpretations");
      expect(result).toHaveProperty("hasAmbiguity");
      expect(result.originalString).toBe("03/10/1990");
      expect(Array.isArray(result.interpretations)).toBe(true);
      expect(typeof result.hasAmbiguity).toBe("boolean");
    });

    test("each interpretation should have required properties", () => {
      const result = parseDateStringToFormats("03/10/1990");
      const interp = result.interpretations[0];

      expect(interp).toHaveProperty("format");
      expect(interp).toHaveProperty("confidence");
      expect(interp).toHaveProperty("reasoning");
      expect(interp).toHaveProperty("tokens");
      expect(interp).toHaveProperty("isUSFormat");

      expect(typeof interp.format).toBe("string");
      expect(typeof interp.confidence).toBe("number");
      expect(typeof interp.reasoning).toBe("string");
      expect(Array.isArray(interp.tokens)).toBe(true);
      expect(typeof interp.isUSFormat).toBe("boolean");
    });
  });
});
