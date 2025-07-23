/**
 * Converts a formatted date string back to its date-fns format template(s)
 * Returns an array of possible interpretations with US format prioritized first
 * Example: "03/10/1990" -> ["MM/dd/yyyy", "dd/MM/yyyy"]
 */

interface TokenPattern {
  regex: RegExp;
  token: string;
  description: string;
  type: TokenType;
  priority?: number;
}

type TokenType =
  | "year"
  | "month"
  | "day"
  | "weekday"
  | "hour_24"
  | "hour_12"
  | "minute"
  | "second"
  | "ampm";

interface MatchResult {
  match: string;
  start: number;
  end: number;
  token: string;
  pattern: TokenPattern;
  description: string;
  value: number;
}

interface TokenInfo {
  originalValue: string;
  token: string;
  description: string;
  position: [number, number];
}

interface FormatInterpretation {
  format: string;
  confidence: number;
  reasoning: string;
  tokens: TokenInfo[];
  isUSFormat?: boolean;
}

interface ParseResult {
  originalString: string;
  interpretations: FormatInterpretation[];
  hasAmbiguity: boolean;
}

const DEFINITIVE_PATTERNS: TokenPattern[] = [
  {
    regex: /\b\d{4}\b/,
    token: "yyyy",
    description: "Full year (e.g., 1990, 2023)",
    type: "year",
  },
  {
    regex:
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i,
    token: "MMMM",
    description: "Full month name",
    type: "month",
  },
  {
    regex: /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i,
    token: "MMM",
    description: "Short month name",
    type: "month",
  },
  {
    regex: /\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/i,
    token: "EEEE",
    description: "Full day name",
    type: "weekday",
  },
  {
    regex: /\b(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\b/i,
    token: "EEE",
    description: "Short day name",
    type: "weekday",
  },
  {
    regex: /\b(AM|PM)\b/i,
    token: "aa",
    description: "AM/PM uppercase",
    type: "ampm",
  },
  {
    regex: /\b(am|pm)\b/,
    token: "aa",
    description: "AM/PM (will be uppercase in output)",
    type: "ampm",
  },
  {
    regex: /\b(A|P)\b/,
    token: "a",
    description: "A/P",
    type: "ampm",
  },
];

function analyzeNumericTokens(dateString: string): MatchResult[] {
  const matches: MatchResult[] = [];
  const hasAMPM = /\b(AM|PM|am|pm|A|P)\b/.test(dateString);
  const hasColon = /:/.test(dateString);
  const hasDateSeparators = /[\/\-\.]/.test(dateString);
  const hasMonthName =
    /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i.test(
      dateString
    );

  const numRegex = /\b(\d{1,2})\b/g;
  let regexMatch: RegExpExecArray | null;
  const allNumbers: Array<{
    value: number;
    start: number;
    end: number;
    matchStr: string;
    index: number;
  }> = [];

  while ((regexMatch = numRegex.exec(dateString)) !== null) {
    allNumbers.push({
      value: parseInt(regexMatch[1], 10),
      start: regexMatch.index,
      end: regexMatch.index + regexMatch[0].length,
      matchStr: regexMatch[0],
      index: allNumbers.length,
    });
  }

  allNumbers.forEach((num) => {
    const { value, start, end, matchStr, index } = num;

    let token = "";
    let type: TokenType = "day";
    let description = "";

    const nearColon =
      hasColon &&
      (dateString.substring(Math.max(0, start - 3), start).includes(":") ||
        dateString
          .substring(end, Math.min(dateString.length, end + 3))
          .includes(":"));

    const nearAMPM =
      hasAMPM &&
      /\s+(AM|PM|am|pm|A|P)\b/.test(dateString.substring(end, end + 10));

    let timePosition = -1;
    if (nearColon) {
      const beforeThis = dateString.substring(0, start);
      timePosition = (beforeThis.match(/:/g) || []).length;
    }

    if (nearColon || nearAMPM) {
      if (timePosition === 0 || (nearAMPM && !nearColon)) {
        if (value >= 0 && value <= 23 && !nearAMPM) {
          token =
            value >= 10 || (matchStr.length === 2 && matchStr.startsWith("0"))
              ? "HH"
              : "H";
          type = "hour_24";
          description =
            token === "HH" ? "Zero-padded 24-hour (00-23)" : "24-hour (0-23)";
        } else if (value >= 1 && value <= 12) {
          token =
            matchStr.length === 2 && matchStr.startsWith("0") ? "hh" : "h";
          type = "hour_12";
          description =
            token === "hh" ? "Zero-padded 12-hour (01-12)" : "12-hour (1-12)";
        }
      } else if (timePosition === 1) {
        token = value >= 10 || matchStr.length === 2 ? "mm" : "m";
        type = "minute";
        description =
          token === "mm" ? "Zero-padded minutes (00-59)" : "Minutes (0-59)";
      } else if (timePosition === 2) {
        token = value >= 10 || matchStr.length === 2 ? "ss" : "s";
        type = "second";
        description =
          token === "ss" ? "Zero-padded seconds (00-59)" : "Seconds (0-59)";
      }
    } else if (hasDateSeparators || hasMonthName) {
      const isLastNumber = index === allNumbers.length - 1;
      const dateNumbers = allNumbers.filter((n) => {
        const nNearColon =
          hasColon &&
          (dateString
            .substring(Math.max(0, n.start - 3), n.start)
            .includes(":") ||
            dateString
              .substring(n.end, Math.min(dateString.length, n.end + 3))
              .includes(":"));
        const nNearAMPM =
          hasAMPM &&
          /\s+(AM|PM|am|pm|A|P)\b/.test(
            dateString.substring(n.end, n.end + 10)
          );
        return !nNearColon && !nNearAMPM;
      });

      if (
        isLastNumber &&
        dateNumbers.length >= 3 &&
        value >= 0 &&
        value <= 99
      ) {
        token = "yy";
        type = "year";
        description = "Two-digit year";
      } else if (value > 31) {
        token = "yy";
        type = "year";
        description = "Two-digit year";
      } else if (value > 12 || hasMonthName) {
        token = value >= 10 || matchStr.length === 2 ? "dd" : "d";
        type = "day";
        description = token === "dd" ? "Zero-padded day (01-31)" : "Day (1-31)";
      } else {
        token =
          value >= 10 || (matchStr.length === 2 && matchStr.startsWith("0"))
            ? "MM"
            : "M";
        type = "month";
        description =
          token === "MM" ? "Zero-padded month (01-12)" : "Month (1-12)";
      }
    } else {
      if (value > 31) {
        token = "yy";
        type = "year";
        description = "Two-digit year";
      } else if (value > 12) {
        token = value >= 10 || matchStr.length === 2 ? "dd" : "d";
        type = "day";
        description = token === "dd" ? "Zero-padded day (01-31)" : "Day (1-31)";
      } else {
        token =
          value >= 10 || (matchStr.length === 2 && matchStr.startsWith("0"))
            ? "MM"
            : "M";
        type = "month";
        description =
          token === "MM" ? "Zero-padded month (01-12)" : "Month (1-12)";
      }
    }

    const pattern: TokenPattern = {
      regex: /\b\d{1,2}\b/,
      token: token,
      description: description,
      type: type,
    };

    matches.push({
      match: matchStr,
      start: start,
      end: end,
      token: token,
      pattern: pattern,
      description: description,
      value: value,
    });
  });

  return matches;
}

function createInterpretations(
  allMatches: MatchResult[],
  dateString: string
): FormatInterpretation[] {
  const interpretations: FormatInterpretation[] = [];

  const potentialMonthDay = allMatches.filter(
    (m) => m.pattern.type === "month" && m.value >= 1 && m.value <= 12
  );

  if (potentialMonthDay.length >= 2) {
    const usMatches = [...allMatches];
    const firstMatch = potentialMonthDay[0];
    const secondMatch = potentialMonthDay[1];

    const firstIndex = usMatches.indexOf(firstMatch);
    const secondIndex = usMatches.indexOf(secondMatch);

    usMatches[firstIndex] = {
      ...firstMatch,
      token:
        firstMatch.value >= 10 ||
        (firstMatch.match.length === 2 && firstMatch.match.startsWith("0"))
          ? "MM"
          : "M",
      pattern: { ...firstMatch.pattern, type: "month" },
    };
    usMatches[secondIndex] = {
      ...secondMatch,
      token:
        secondMatch.value >= 10 || secondMatch.match.length === 2 ? "dd" : "d",
      pattern: { ...secondMatch.pattern, type: "day" },
    };

    interpretations.push(
      buildInterpretation(usMatches, dateString, 85, "US format (MM/dd)", true)
    );

    if (firstMatch.value !== secondMatch.value) {
      const intlMatches = [...allMatches];
      intlMatches[firstIndex] = {
        ...firstMatch,
        token:
          firstMatch.value >= 10 || firstMatch.match.length === 2 ? "dd" : "d",
        pattern: { ...firstMatch.pattern, type: "day" },
      };
      intlMatches[secondIndex] = {
        ...secondMatch,
        token:
          secondMatch.value >= 10 ||
          (secondMatch.match.length === 2 && secondMatch.match.startsWith("0"))
            ? "MM"
            : "M",
        pattern: { ...secondMatch.pattern, type: "month" },
      };

      interpretations.push(
        buildInterpretation(
          intlMatches,
          dateString,
          70,
          "International format (dd/MM)",
          false
        )
      );
    }
  } else {
    const finalMatches = allMatches.map((match) => {
      if (
        match.pattern.type === "month" &&
        match.value >= 1 &&
        match.value <= 12
      ) {
        return {
          ...match,
          token:
            match.value >= 10 ||
            (match.match.length === 2 && match.match.startsWith("0"))
              ? "MM"
              : "M",
        };
      } else if (
        match.pattern.type === "day" &&
        match.value >= 1 &&
        match.value <= 31
      ) {
        return {
          ...match,
          token: match.value >= 10 || match.match.length === 2 ? "dd" : "d",
        };
      }
      return match;
    });

    interpretations.push(
      buildInterpretation(
        finalMatches,
        dateString,
        95,
        "Unambiguous format",
        true
      )
    );
  }

  return interpretations;
}

function buildInterpretation(
  matches: MatchResult[],
  dateString: string,
  confidence: number,
  reasoning: string,
  isUSFormat: boolean
): FormatInterpretation {
  let formatString = dateString;
  const sortedMatches = [...matches].sort((a, b) => b.start - a.start);

  for (const match of sortedMatches) {
    formatString =
      formatString.substring(0, match.start) +
      match.token +
      formatString.substring(match.end);
  }

  return {
    format: formatString,
    confidence: confidence,
    reasoning: reasoning,
    isUSFormat: isUSFormat,
    tokens: matches.map((m) => ({
      originalValue: m.match,
      token: m.token,
      description: m.description,
      position: [m.start, m.end] as [number, number],
    })),
  };
}

function parseDateStringToFormats(dateString: string): ParseResult {
  if (dateString.length === 0) {
    return {
      originalString: dateString,
      interpretations: [],
      hasAmbiguity: false,
    };
  }

  const definitiveMatches: MatchResult[] = [];

  for (const pattern of DEFINITIVE_PATTERNS) {
    let match: RegExpExecArray | null;
    const regex = new RegExp(pattern.regex.source, "gi");

    while ((match = regex.exec(dateString)) !== null) {
      definitiveMatches.push({
        match: match[0],
        start: match.index,
        end: match.index + match[0].length,
        token: pattern.token,
        pattern: pattern,
        description: pattern.description,
        value: 0,
      });

      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }
  }

  const numericMatches = analyzeNumericTokens(dateString);

  const allMatches: MatchResult[] = [...definitiveMatches];

  for (const numMatch of numericMatches) {
    const hasOverlap = definitiveMatches.some(
      (defMatch) =>
        numMatch.start < defMatch.end && numMatch.end > defMatch.start
    );

    if (!hasOverlap) {
      allMatches.push(numMatch);
    }
  }

  allMatches.sort((a, b) => a.start - b.start);

  const interpretations = createInterpretations(allMatches, dateString);

  const sortedResults = interpretations.sort((a, b) => {
    if (a.isUSFormat && !b.isUSFormat) return -1;
    if (!a.isUSFormat && b.isUSFormat) return 1;
    return b.confidence - a.confidence;
  });

  return {
    originalString: dateString,
    interpretations: sortedResults,
    hasAmbiguity: sortedResults.length > 1,
  };
}

function getDateFormats(dateString: string): string[] {
  const result = parseDateStringToFormats(dateString);
  return result.interpretations.map((i) => i.format);
}

function getBestDateFormat(dateString: string): string | undefined {
  const result = parseDateStringToFormats(dateString);
  return result.interpretations[0]?.format;
}

export {
  parseDateStringToFormats,
  getDateFormats,
  getBestDateFormat,
  type ParseResult,
  type FormatInterpretation,
  type TokenInfo,
};
