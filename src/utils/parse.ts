var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var abbreviatedDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var shortestDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var timezoneNames = [
  "ACDT",
  "ACST",
  "ACWT",
  "ADT",
  "ACT",
  "AEDT",
  "AEST",
  "AFT",
  "AKDT",
  "AKST",
  "ALMT",
  "AMT",
  "AMST",
  "ANAT",
  "ANAST",
  "AQTT",
  "ART",
  "AST",
  "AWDT",
  "AWST",
  "AZOT",
  "AZOST",
  "AZT",
  "AZST",
  "BNT",
  "BDT",
  "BOT",
  "BRT",
  "BRST",
  "BST",
  "BTT",
  "B",
  "CAST",
  "CAT",
  "CCT",
  "CDT",
  "CEDT",
  "CEST",
  "CET",
  "CHADT",
  "CHAST",
  "CHOT",
  "CHOST",
  "CHsT",
  "CHUT",
  "CIT",
  "CKT",
  "CLST",
  "CLT",
  "COT",
  "CST",
  "CVT",
  "CWST",
  "CXT",
  "C",
  "DAVT",
  "DDUT",
  "DST",
  "EASST",
  "EAST",
  "EAT",
  "ECT",
  "EDT",
  "EEDT",
  "EEST",
  "EET",
  "EGT",
  "EGST",
  "EST",
  "E",
  "EIT",
  "FET",
  "FJT",
  "FJST",
  "FKST",
  "FKT",
  "FNT",
  "F",
  "GALT",
  "GAMT",
  "GET",
  "GFT",
  "GILT",
  "GMT",
  "GST",
  "GYT",
  "G",
  "HADT",
  "HAST",
  "HKT",
  "HOVT",
  "HOVST",
  "HST",
  "ICT",
  "IDT",
  "IOT",
  "IRDT",
  "IRKT",
  "IRKST",
  "IRST",
  "IST",
  "JST",
  "KGT",
  "KOST",
  "KRAT",
  "KRAST",
  "KST",
  "KUYT",
  "LHDT",
  "LHST",
  "LINT",
  "L",
  "MAGT",
  "MAGST",
  "MART",
  "MAWT",
  "MDT",
  "MeST",
  "MHT",
  "MIST",
  "MMT",
  "MSD",
  "MSK",
  "MST",
  "MUT",
  "MVT",
  "MYT",
  "NCT",
  "NDT",
  "NFT",
  "N",
  "NOVT",
  "NOVST",
  "NPT",
  "NRT",
  "NST",
  "NT",
  "NUT",
  "NZDT",
  "NZST",
  "OMST",
  "OMSST",
  "ORAT",
  "O",
  "PDT",
  "PET",
  "PETT",
  "PETST",
  "PGT",
  "PHT",
  "PHOT",
  "PKT",
  "PMDT",
  "PMST",
  "PONT",
  "PST",
  "PWT",
  "PYT",
  "PYST",
  "P",
  "QYZT",
  "RET",
  "ROTT",
  "R",
  "SAKT",
  "SAMT",
  "SAST",
  "SBT",
  "SCT",
  "SGT",
  "SRT",
  "SLT",
  "SLST",
  "SRET",
  "SST",
  "SYOT",
  "TAHT",
  "TFT",
  "TJT",
  "TKT",
  "TLT",
  "TMT",
  "TOT",
  "TRUT",
  "TVT",
  "T",
  "ULAT",
  "ULAST",
  "UTC",
  "UYST",
  "UYT",
  "UZT",
  "U",
  "VET",
  "VLAT",
  "VLAST",
  "VOLT",
  "VUT",
  "V",
  "WAKT",
  "WAT",
  "WAST",
  "WDT",
  "WEDT",
  "WEST",
  "WET",
  "WFT",
  "WGT",
  "WGST",
  "WIB",
  "WIT",
  "WITA",
  "WST",
  "WT",
  "YAKT",
  "YAKST",
  "YAP",
  "YEK",
  "YEKS",
];

var abbreviatedMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var regexDayNames = new RegExp(dayNames.join("|"), "i");
var regexAbbreviatedDayNames = new RegExp(abbreviatedDayNames.join("|"), "i");
var regexShortestDayNames = new RegExp(
  "\\b(" + shortestDayNames.join("|") + ")\\b",
  "i"
);
var regexMonthNames = new RegExp(monthNames.join("|"), "i");
var regexAbbreviatedMonthNames = new RegExp(
  abbreviatedMonthNames.join("|"),
  "i"
);
var regexTimezoneNames = new RegExp(
  "\\b(" + timezoneNames.join("|") + ")\\b",
  "i"
);

var regexFirstSecondThirdFourth = /(\d+)(st|nd|rd|th)\b/i;
var regexEndian = /(\d{1,4})([/.-])(\d{1,2})[/.-](\d{1,4})/;

var regexTimezone =
  /((\+|-)(12:00|11:00|10:00|09:30|09:00|08:00|07:00|06:00|05:00|04:00|03:30|03:00|02:00|01:00|00:00|01:00|02:00|03:00|03:30|04:00|04:30|05:00|05:30|05:45|06:00|06:30|07:00|08:00|08:45|09:00|09:30|10:00|10:30|11:00|12:00|12:45|13:00|14:00))$/;
var regexTimezoneNaked =
  /((\+|-)(1200|1100|1000|0930|0900|0800|0700|0600|0500|0400|0330|0300|0200|0100|0000|0100|0200|0300|0330|0400|0430|0500|0530|0545|0600|0630|0700|0800|0845|0900|0930|1000|1030|1100|1200|1245|1300|1400))$/;

var amOrPm = "(" + ["AM?", "PM?"].join("|") + ")";
var regexHoursWithLeadingZeroDigitMinutesSecondsAmPm = new RegExp(
  "0\\d\\:\\d{1,2}\\:\\d{1,2}(\\s*)" + amOrPm,
  "i"
);
var regexHoursWithLeadingZeroDigitMinutesAmPm = new RegExp(
  "0\\d\\:\\d{1,2}(\\s*)" + amOrPm,
  "i"
);
var regexHoursWithLeadingZeroDigitAmPm = new RegExp("0\\d(\\s*)" + amOrPm, "i");
var regexHoursMinutesSecondsAmPm = new RegExp(
  "\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}(\\s*)" + amOrPm,
  "i"
);
var regexHoursMinutesAmPm = new RegExp(
  "\\d{1,2}\\:\\d{1,2}(\\s*)" + amOrPm,
  "i"
);
var regexHoursAmPm = new RegExp("\\d{1,2}(\\s*)" + amOrPm, "i");
var regexHours = /\d{1,2}/;
var regexMonthNameYearShort = new RegExp(monthNames.join("|") + "-\\d{2}", "i");
var regexMonthNameAbbreviatedYearShort = new RegExp(
  abbreviatedMonthNames.join("|") + "-\\d{2}",
  "i"
);

// Various forms of (D|DD)<SEP>(MMM|MMMM)<SEP>('?YY|YYYY)
var regexDayMonthNameYear = new RegExp(
  "(\\d{1,2})(\\D+)(" +
    monthNames.join("|") +
    "|" +
    abbreviatedMonthNames.join("|") +
    ")(\\2)('?\\d{2,4})"
);

var regexISO8601HoursWithLeadingZeroMinutesSecondsMilliseconds =
  /\d{2}:\d{2}:\d{2}\.\d{3}/;
var regexISO8601HoursWithLeadingZeroMinutesSecondsCentiSeconds =
  /\d{2}:\d{2}:\d{2}\.\d{2}/;
var regexISO8601HoursWithLeadingZeroMinutesSecondsDeciSeconds =
  /\d{2}:\d{2}:\d{2}\.\d{1}/;
var regexISO8601HoursWithLeadingZeroMinutesSeconds = /T\d{2}:\d{2}:\d{2}/; // Weird test case - format don't usually come like this, but one of ours does.
var regexHoursWithLeadingZeroMinutesSeconds = /0\d:\d{2}:\d{2}/;
var regexHoursWithLeadingZeroMinutes = /0\d:\d{2}/;

var regexHoursMinutesSeconds = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]:\d{2}/;
var regexHoursMinutesSecondsMilliseconds =
  /\b([01]?[0-9]|2[0-3]):[0-5][0-9]:\d{2}\.\d{3}/;
var regexHoursMinutesSecondsCentiSeconds =
  /\b([01]?[0-9]|2[0-3]):[0-5][0-9]:\d{2}\.\d{2}/;
var regexHoursMinutesSecondsDeciSeconds =
  /\b([01]?[0-9]|2[0-3]):[0-5][0-9]:\d{2}\.\d{1}/;
var regexHoursMinutes = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]/;

var regexExtended24HoursMinutesSeconds = /24:00:\d{2}/;
var regexExtended24HoursMinutesSecondsMilliseconds = /24:00:\d{2}\.\d{3}/;
var regexExtended24HoursMinutesSecondsCentiSeconds = /24:00:\d{2}\.\d{2}/;
var regexExtended24HoursMinutesSecondsDeciSeconds = /24:00:\d{2}\.\d{1}/;
var regexExtended24HoursMinutes = /24:00/;

var regexYearLong = /\d{4}/;
var regexYearShort = /\d{2}/;
var regexYearShortApostrophe = /'\d{2}/;
var regexDayLeadingZero = /0\d/;
var regexDay = /\d{1,2}/;

var regexMonthLeadingZero = /0\d/;
var regexMonth = /\d{1,2}/;

var regexDayShortMonthShort = /^([1-9])\/([1-9]|0[1-9])$/;
var regexDayShortMonth = /^([1-9])\/(1[012])$/;
var regexDayMonthShort = /^(0[1-9]|[12][0-9]|3[01])\/([1-9])$/;
var regexDayMonth = /^(0[1-9]|[12][0-9]|3[01])\/(1[012]|0[1-9])$/;

var regexMonthShortYearShort = /^([1-9])(\D)([1-9][0-9])$/;
var regexMonthShortDay = /^([1-9])(\D)([0][0-9])$/;
var regexMonthYearShort = /^(0[1-9]|1[012])(\D)([1-9][0-9])$/;
var regexMonthDay = /^(0[1-9]|1[012])(\D)([0][0-9])$/;

var formatIncludesMonth = /([/][M]|[M][/]|[MM]|[MMMM])/;
var formatIncludesNumericDay = /(D)/;
var formatIncludesYear = /(Y)/;

var formatHasMultipleRemainingSegments = /\d+\D.+$/;
var formatOnlyHasTerminatingNumbers = /\D+(\d+)($|Z)/;
var formatHasDayAfterMonthSegment = /M\s*\d{1,2}\b.+$/;
var formatHasDayWithLeadingZeroAfterMonthSegment = /M\D+(0[1-9])\b.+$/;

var formatHasTimeAfterRemainingDigits = /\d+\s+(H|h|k)/;

var regexFillingWords = /\b(at)\b/i;

var regexUnixMillisecondTimestamp = /\d{13}/;
var regexUnixTimestamp = /\d{10}/;

// option defaults
const defaultOrder: { [sep: string]: "MDY" | "DMY" | "YMD" } = {
  "/": "MDY",
  ".": "DMY",
  "-": "YMD",
};

/**
 * Parses a date string and returns a date-fns format string.
 *
 * @param dateString The date string to parse.
 * @param options
 *   locale: string
 *     - e.g. 'en-US', 'en-GB', 'fr', 'ja', etc. If provided, sets date order for common locales.
 *
 * Example:
 *   parseFormat('08-03-2020', { locale: 'en-US' }) // 'MM-dd-yyyy'
 *   parseFormat('08-03-2020', { locale: 'en-GB' }) // 'dd-MM-yyyy'
 */

export const locales = [
  "en-US",
  "en-GB",
  "fr",
  "de",
  "es",
  "it",
  "ja",
  "zh",
  "ko",
  "ru",
] as const;
export type Locale = (typeof locales)[number];

const localeOrderMap: Record<Locale, { [sep: string]: "MDY" | "DMY" | "YMD" }> =
  {
    "en-US": { "/": "MDY", "-": "MDY", ".": "MDY" },
    "en-GB": { "/": "DMY", "-": "DMY", ".": "DMY" },
    fr: { "/": "DMY", "-": "DMY", ".": "DMY" },
    de: { "/": "DMY", "-": "DMY", ".": "DMY" },
    es: { "/": "DMY", "-": "DMY", ".": "DMY" },
    it: { "/": "DMY", "-": "DMY", ".": "DMY" },
    ja: { "/": "YMD", "-": "YMD", ".": "YMD" },
    zh: { "/": "YMD", "-": "YMD", ".": "YMD" },
    ko: { "/": "YMD", "-": "YMD", ".": "YMD" },
    ru: { "/": "DMY", "-": "DMY", ".": "DMY" },
    // Add more as needed
  };

export function parseFormat(
  dateString: string,
  options?: {
    locale?: Locale;
  }
): string | undefined {
  var format = dateString.toString();

  options = options || { locale: "en-US" };

  // Determine order from locale or fallback to defaultOrder
  let order: { [sep: string]: "MDY" | "DMY" | "YMD" } = defaultOrder;
  if (options.locale) {
    let localeKey = options.locale;
    if (!localeOrderMap[localeKey]) {
      // Try language only
      const lang = localeKey.split("-")[0] as Locale;
      if (localeOrderMap[lang]) {
        localeKey = lang;
      }
    }
    order = localeOrderMap[localeKey] || defaultOrder;
  }

  // Unix Millisecond Timestamp ☛ T (date-fns: ms since epoch)
  format = format.replace(regexUnixMillisecondTimestamp, "T");
  // Unix Timestamp ☛ t (date-fns: seconds since epoch)
  format = format.replace(regexUnixTimestamp, "t");

  // escape filling words
  format = format.replace(regexFillingWords, "[$1]");

  const dayMonthNameYearMatch = format.match(regexDayMonthNameYear);
  if (dayMonthNameYearMatch) {
    // [0]=full, [1]=day, [2]=sep1, [3]=month, [4]=sep2, [5]=year
    const [, daySegment, sep1, monthSegment, sep2, yearSegment] =
      dayMonthNameYearMatch;
    const parts: string[] = [];
    // Handle Day segment
    if (daySegment.length === 2 && daySegment[0] === "0") {
      parts.push("dd"); // date-fns: dd
    } else {
      parts.push("d"); // date-fns: d
    }
    // Handle day/month seperator
    parts.push(sep1);
    // Handle Month segment
    if (regexMonthNames.test(monthSegment)) {
      parts.push("MMMM"); // date-fns: MMMM
    } else if (regexAbbreviatedMonthNames.test(monthSegment)) {
      parts.push("MMM"); // date-fns: MMM
    } else {
      parts.push(monthSegment);
    }
    // Handle month/year seperator
    parts.push(sep2);
    // Handle year segment
    if (yearSegment[0] === "'") {
      parts.push("'yy"); // date-fns: 'yy (literal ')
    } else if (yearSegment.length === 2) {
      parts.push("yy"); // date-fns: yy
    } else if (yearSegment.length === 4) {
      parts.push("yyyy"); // date-fns: yyyy
    } else {
      parts.push("yyyy");
    }

    var dayMonthNameYearFormat = parts.join("");
    format = format.replace(regexDayMonthNameYear, dayMonthNameYearFormat);
  }

  //  DAYS

  // Monday ☛ EEEE (date-fns: full day name)
  format = format.replace(regexDayNames, "EEEE");
  // Mon ☛ EEE (date-fns: abbreviated day name)
  format = format.replace(regexAbbreviatedDayNames, "EEE");
  // Mo ☛ EE (date-fns: short day name)
  format = format.replace(regexShortestDayNames, "EE");

  // 1st, 2nd, 23rd ☛ do (date-fns: ordinal day)
  format = format.replace(regexFirstSecondThirdFourth, "do");

  // MONTHS

  // January ☛ MMMM
  format = format.replace(regexMonthNames, "MMMM");
  // Jan ☛ MMM
  format = format.replace(regexAbbreviatedMonthNames, "MMM");

  // replace endians, like 8/20/2010, 20.8.2010 or 2010-8-20
  format = format.replace(
    regexEndian,
    replaceEndian.bind(null, { ...options, preferredOrder: order })
  );

  // timezone name GMT ☛  [GMT]
  format = format.replace(regexTimezoneNames, (a: string) => "[" + a + "]");
  // timezone +02:00 ☛ XXX (date-fns: ISO timezone)
  format = format.replace(regexTimezone, "XXX");
  // timezone 0200 ☛ xx (date-fns: basic ISO timezone)
  format = format.replace(regexTimezoneNaked, "xx");

  // TIME
  // 23:39:43.331 ☛ 'HH:mm:ss.SSS'
  format = format.replace(
    regexISO8601HoursWithLeadingZeroMinutesSecondsMilliseconds,
    "HH:mm:ss.SSS"
  );
  // 23:39:43.33 ☛ 'HH:mm:ss.SS'
  format = format.replace(
    regexISO8601HoursWithLeadingZeroMinutesSecondsCentiSeconds,
    "HH:mm:ss.SS"
  );
  // 23:39:43.3 ☛ 'HH:mm:ss.S'
  format = format.replace(
    regexISO8601HoursWithLeadingZeroMinutesSecondsDeciSeconds,
    "HH:mm:ss.S"
  );
  // 23:39:43 ☛ 'HH:mm:ss'
  format = format.replace(
    regexISO8601HoursWithLeadingZeroMinutesSeconds,
    "THH:mm:ss"
  );
  function replaceWithAmPm(timeFormat: string) {
    return function (whitespace: string) {
      return (
        timeFormat + whitespace + "a" // date-fns: a (AM/PM)
      );
    };
  }
  // 05:30:20pm ☛ hh:mm:ssa
  format = format.replace(
    regexHoursWithLeadingZeroDigitMinutesSecondsAmPm,
    replaceWithAmPm("hh:mm:ss")
  );
  // 10:30:20pm ☛ h:mm:ssa
  format = format.replace(
    regexHoursMinutesSecondsAmPm,
    replaceWithAmPm("h:mm:ss")
  );
  // 05:30pm ☛ hh:mma
  format = format.replace(
    regexHoursWithLeadingZeroDigitMinutesAmPm,
    replaceWithAmPm("hh:mm")
  );
  // 10:30pm ☛ h:mma
  format = format.replace(regexHoursMinutesAmPm, replaceWithAmPm("h:mm"));
  // 05pm ☛ hha
  format = format.replace(
    regexHoursWithLeadingZeroDigitAmPm,
    replaceWithAmPm("hh")
  );
  // 10pm ☛ ha
  format = format.replace(regexHoursAmPm, replaceWithAmPm("h"));
  // 05:30:20 ☛ HH:mm:ss
  format = format.replace(regexHoursWithLeadingZeroMinutesSeconds, "HH:mm:ss");
  // 5:30:20.222 ☛ H:mm:ss.SSS
  format = format.replace(regexHoursMinutesSecondsMilliseconds, "H:mm:ss.SSS");
  // 24:00:00.000 ☛ k:mm:ss.SSS|kk:mm:ss.SSS (date-fns: k/kk for 24-hour)
  format = format.replace(
    regexExtended24HoursMinutesSecondsMilliseconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss.SSS"
  );
  // 5:30:20.22 ☛ H:mm:ss.SS
  format = format.replace(regexHoursMinutesSecondsCentiSeconds, "H:mm:ss.SS");
  // 24:00:00.00 ☛ k:mm:ss.SS|kk:mm:ss.SS
  format = format.replace(
    regexExtended24HoursMinutesSecondsCentiSeconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss.SS"
  );
  // 5:30:20.2 ☛ H:mm:ss.S
  format = format.replace(regexHoursMinutesSecondsDeciSeconds, "H:mm:ss.S");
  // 24:00:00.0 ☛ k:mm:ss.S|kk:mm:ss.S
  format = format.replace(
    regexExtended24HoursMinutesSecondsDeciSeconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss.S"
  );
  // 10:30:20 ☛ H:mm:ss
  format = format.replace(regexHoursMinutesSeconds, "H:mm:ss");
  // 24:00:00 ☛ k:mm:ss||kk:mm:ss
  format = format.replace(
    regexExtended24HoursMinutesSeconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss"
  );
  // 05:30 ☛ HH:mm
  format = format.replace(regexHoursWithLeadingZeroMinutes, "HH:mm");
  // 10:30 ☛ H:mm
  format = format.replace(regexHoursMinutes, "H:mm");
  // 24:00 ☛ k:mm|kk:mm
  format = format.replace(
    regexExtended24HoursMinutes,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm"
  );

  // do we still have numbers left?
  //
  //

  // Lets check for 4 digits first, these are years for sure
  format = format.replace(regexYearLong, "yyyy");
  format = format.replace(regexYearShortApostrophe, "'yy");

  // Check for (MMM|MMMM)-(YY|YYYY) formats
  format = format.replace(regexMonthNameYearShort, "MMMM-yy");
  format = format.replace(regexMonthNameAbbreviatedYearShort, "MMM-yy");

  // check if both numbers are < 13, then it must be d/M
  format = format.replace(regexDayShortMonthShort, "d/M");

  // check if first number is < 10 && last < 13, then it must be d/MM
  format = format.replace(regexDayShortMonth, "d/MM");

  // check if last number is < 32 && last < 10, then it must be dd/M
  format = format.replace(regexDayMonthShort, "dd/M");

  // check if both numbers are > 10, but first < 32 && last < 13, then it must be dd/MM
  format = format.replace(regexDayMonth, "dd/MM");

  // check if first < 10 && last > 12, then it must be M$2yy
  format = format.replace(regexMonthShortYearShort, "M$2yy");

  // check if first < 13 && last > 12, then it must be MM$2yy
  format = format.replace(regexMonthYearShort, "MM$2yy");
  //
  // check if first < 10 && last < 10, then it must be M/dd
  format = format.replace(regexMonthShortDay, "M$2dd");

  // check if first < 13 && last < 10, then it must be MM/dd
  format = format.replace(regexMonthDay, "MM$2dd");

  // to prevent 9.20 gets formated to d.y, we format the complete date first, then go for the time
  if (format.match(formatIncludesMonth)) {
    var regexHoursDotWithLeadingZeroOrDoubleDigitMinutes =
      /0\d\.\d{2}|\d{2}\.\d{2}/;
    var regexHoursDotMinutes = /\d{1}\.\d{2}/;

    format = format.replace(
      regexHoursDotWithLeadingZeroOrDoubleDigitMinutes,
      "H.mm"
    );
    format = format.replace(regexHoursDotMinutes, "h.mm");
  }

  // If the format includes a year format segment, but no month segment, then those numbers are a month

  // Remove all options.preferLongFormat references and use input string logic for token selection

  // For extended 24-hour time regexes and similar, use a replacer function to inspect the matched string
  format = format.replace(
    regexExtended24HoursMinutesSecondsMilliseconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss.SSS"
  );
  format = format.replace(
    regexExtended24HoursMinutesSecondsCentiSeconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss.SS"
  );
  format = format.replace(
    regexExtended24HoursMinutesSecondsDeciSeconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss.S"
  );
  format = format.replace(
    regexExtended24HoursMinutesSeconds,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm:ss"
  );
  format = format.replace(
    regexExtended24HoursMinutes,
    (match) => (match.startsWith("24") ? "kk" : "k") + ":mm"
  );

  // For month and day tokens, use the matched segment's length/leading zero logic
  if (!format.match(formatIncludesMonth) && format.match(formatIncludesYear)) {
    format = format.replace(regexMonthLeadingZero, "MM");
    format = format.replace(regexMonth, (m) =>
      m.length === 2 && m[0] === "0" ? "MM" : "M"
    );
  }

  // For day tokens in odd cases, use the matched segment's length/leading zero logic
  if (
    format.match(formatHasDayWithLeadingZeroAfterMonthSegment) &&
    !format.match(formatHasTimeAfterRemainingDigits)
  ) {
    format = format.replace(regexDayLeadingZero, "dd");
  }
  if (
    format.match(formatHasDayAfterMonthSegment) &&
    !format.match(formatHasTimeAfterRemainingDigits)
  ) {
    format = format.replace(regexDay, (d) =>
      d.length === 2 && d[0] === "0" ? "dd" : "d"
    );
  }
  if (
    !format.match(formatIncludesNumericDay) &&
    format.match(formatHasMultipleRemainingSegments) &&
    !format.match(formatHasTimeAfterRemainingDigits)
  ) {
    format = format.replace(regexDayLeadingZero, "dd");
    format = format.replace(regexDay, (d) =>
      d.length === 2 && d[0] === "0" ? "dd" : "d"
    );
  }

  // there could still be a year left
  if (!format.match(formatIncludesYear)) {
    format = format.replace(regexYearShort, "yy");
  }

  // if there are still numbers, it might be an odd naked hour that wasn't picked up earlier by the time checks
  const onlyTerminatingNumbersMatch = format.match(
    formatOnlyHasTerminatingNumbers
  );
  if (onlyTerminatingNumbersMatch) {
    var hour = onlyTerminatingNumbersMatch[1];
    var replacement: string;
    if (hour === "00") {
      replacement = "HH";
    } else if (hour === "24") {
      replacement = "kk";
    } else if (parseInt(hour, 10) > 12) {
      replacement = hour.length === 2 && hour[0] === "0" ? "HH" : "H";
    } else if (hour[0] === "0") {
      replacement = "hh";
    } else {
      replacement = "h";
    }
    format = format.replace(regexHours, replacement);
  }

  if (typeof format !== "string" || format.length < 1) {
    return undefined;
  }
  return format;
}

// Define a type for the options argument
interface ReplaceEndianOptions {
  preferredOrder: string | { [sep: string]: string };
}

function replaceEndian(
  options: ReplaceEndianOptions,
  first: string,
  separator: string,
  second: string,
  third: string
) {
  var parts: string[];

  var FIRST = 0;
  var SECOND = 1;
  var THIRD = 2;

  var isSingleDigitMap = [
    first.length === 1,
    second.length === 1,
    third.length === 1,
  ];

  var startsWithZeroMap = [
    first[0] === "0",
    second[0] === "0",
    third[0] === "0",
  ];

  var firstHasQuadDigit = first.length === 4;
  var secondHasQuadDigit = second.length === 4;
  var thirdHasQuadDigit = third.length === 4;

  // Use the preferredOrder from the options passed in (which is 'order')
  var preferredOrder =
    typeof options.preferredOrder === "string"
      ? options.preferredOrder
      : options.preferredOrder[separator];

  const firstNum = parseInt(first, 10);
  const secondNum = parseInt(second, 10);
  const thirdNum = parseInt(third, 10);
  parts = [first, second, third];
  // Safeguard: ensure preferredOrder is a string, fallback to 'MDY' if not
  preferredOrder =
    typeof preferredOrder === "string" ? preferredOrder.toUpperCase() : "MDY";

  var inferSingleDigitStatus = function (a: number, b: number) {
    if (isSingleDigitMap[a] !== isSingleDigitMap[b]) {
      if (!startsWithZeroMap[a] && !startsWithZeroMap[b]) {
        isSingleDigitMap[a] = true;
        isSingleDigitMap[b] = true;
      }
    }
  };

  // PRIORITY 1: Check for years first (most definitive)

  // If first is a year, order will always be Year-Month-Day
  if (firstNum > 31) {
    inferSingleDigitStatus(SECOND, THIRD);
    parts[0] = firstHasQuadDigit ? "yyyy" : "yy";
    parts[1] = isSingleDigitMap[SECOND] ? "M" : "MM";
    parts[2] = isSingleDigitMap[THIRD] ? "d" : "dd";
    return parts.join(separator);
  }

  // if third is a year ...
  if (thirdNum > 31) {
    parts[2] = thirdHasQuadDigit ? "yyyy" : "yy";

    // Use the preferred order to determine month and day positions
    if (preferredOrder === "YMD") {
      // For YMD format, when year is in third position, we have M-D-Y
      inferSingleDigitStatus(FIRST, SECOND);
      parts[0] = isSingleDigitMap[FIRST] ? "M" : "MM";
      parts[1] = isSingleDigitMap[SECOND] ? "d" : "dd";
      return parts.join(separator);
    } else if (preferredOrder === "MDY") {
      // For MDY format, when year is in third position, we have M-D-Y
      inferSingleDigitStatus(FIRST, SECOND);
      parts[0] = isSingleDigitMap[FIRST] ? "M" : "MM";
      parts[1] = isSingleDigitMap[SECOND] ? "d" : "dd";
      return parts.join(separator);
    } else {
      // For DMY format, when year is in third position, we have D-M-Y
      inferSingleDigitStatus(FIRST, SECOND);
      parts[0] = isSingleDigitMap[FIRST] ? "d" : "dd";
      parts[1] = isSingleDigitMap[SECOND] ? "M" : "MM";
      return parts.join(separator);
    }
  }

  // PRIORITY 2: Check for obvious days (> 12) when no year is detected

  // If first is a day (> 12), then the order will be Day-Month-Year
  if (firstNum > 12) {
    inferSingleDigitStatus(FIRST, SECOND);
    parts[0] = isSingleDigitMap[FIRST] ? "d" : "dd";
    parts[1] = isSingleDigitMap[SECOND] ? "M" : "MM";
    parts[2] = thirdHasQuadDigit ? "yyyy" : "yy";
    return parts.join(separator);
  }

  // Second will never be the year. And if it is a day,
  // the order will always be Month-Day-Year
  if (secondNum > 12) {
    inferSingleDigitStatus(FIRST, SECOND);
    parts[0] = isSingleDigitMap[FIRST] ? "M" : "MM";
    parts[1] = isSingleDigitMap[SECOND] ? "d" : "dd";
    parts[2] = thirdHasQuadDigit ? "yyyy" : "yy";
    return parts.join(separator);
  }

  const hasQuadDigit = [
    firstHasQuadDigit,
    secondHasQuadDigit,
    thirdHasQuadDigit,
  ];

  // if we had no luck until here, we use the preferred order
  inferSingleDigitStatus(
    preferredOrder.indexOf("d"),
    preferredOrder.indexOf("M")
  );
  parts[preferredOrder.indexOf("d")] = isSingleDigitMap[
    preferredOrder.indexOf("d")
  ]
    ? "d"
    : "dd";
  parts[preferredOrder.indexOf("M")] = isSingleDigitMap[
    preferredOrder.indexOf("M")
  ]
    ? "M"
    : "MM";

  parts[preferredOrder.indexOf("Y")] = hasQuadDigit[preferredOrder.indexOf("Y")]
    ? "yyyy"
    : "yy";
  return parts.join(separator);
}
