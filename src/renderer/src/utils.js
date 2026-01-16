/**
 * Service length calculator with coefficients (k) + sorting + overlap checks.
 *
 * Assumptions:
 * - Dates are in ISO "YYYY-MM-DD" (UTC) and inclusive.
 * - Total is normalized as: 1 year = 365 days, 1 month = 30 days.
 * - After applying coefficient k, fractional days are floored.
 */

function parseISODateUTC(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  if (![y, m, d].every(Number.isFinite)) throw new Error(`Invalid date: ${iso}`);
  return new Date(Date.UTC(y, m - 1, d));
}

function dateToISO(d) {
  // d is Date in UTC midnight
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function diffDaysInclusive(begISO, endISO) {
  const beg = parseISODateUTC(begISO);
  const end = parseISODateUTC(endISO);
  const msPerDay = 24 * 60 * 60 * 1000;

  const diff = Math.floor((end - beg) / msPerDay);
  if (diff < 0) throw new Error(`endDate < begDate: ${begISO} > ${endISO}`);
  return diff + 1;
}

function daysToYMD(totalDays) {
  const y = Math.floor(totalDays / 365);
  const remAfterYears = totalDays - y * 365;

  const m = Math.floor(remAfterYears / 30);
  const d = remAfterYears - m * 30;

  return { y, m, d };
}

function formatK(k) {
  return Number.isInteger(k) ? String(k) : String(k);
}

function addDaysUTC(dateObj, days) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return new Date(dateObj.getTime() + days * msPerDay);
}

/**
 * Validate + sort periods by begDate (then endDate).
 * Checks:
 * - date validity
 * - begDate <= endDate
 * - overlaps (inclusive)
 * Also returns normalized periods with parsed dates for internal use.
 */
function normalizeSortAndValidate(periods) {
  if (!Array.isArray(periods)) throw new Error("Input must be an array of periods");

  const normalized = periods.map((p, idx) => {
    if (!p || !p.begDate || !p.endDate) {
      throw new Error(`Period #${idx} must have begDate and endDate`);
    }

    const k = (p.k === undefined || p.k === null) ? 1 : Number(p.k);
    if (!Number.isFinite(k) || k <= 0) throw new Error(`Period #${idx} has invalid k: ${p.k}`);

    const beg = parseISODateUTC(p.begDate);
    const end = parseISODateUTC(p.endDate);
    if (end < beg) throw new Error(`Period #${idx} endDate < begDate: ${p.begDate} > ${p.endDate}`);

    return {
      ...p,
      k,
      _idx: idx,         // original index for debugging
      _beg: beg,
      _end: end,
    };
  });

  normalized.sort((a, b) => {
    const d1 = a._beg - b._beg;
    if (d1 !== 0) return d1;
    return a._end - b._end;
  });

  // Overlap check (inclusive):
  // If next.beg <= current.end => overlap
  for (let i = 1; i < normalized.length; i++) {
    const prev = normalized[i - 1];
    const cur = normalized[i];

    if (cur._beg <= prev._end) {
      // give a helpful message including original indices and dates
      throw new Error(
        `Periods overlap (inclusive): ` +
        `#${prev._idx} [${dateToISO(prev._beg)}..${dateToISO(prev._end)}] ` +
        `and #${cur._idx} [${dateToISO(cur._beg)}..${dateToISO(cur._end)}]`
      );
    }
  }

  return normalized;
}

function calcService(periods) {
  const sorted = normalizeSortAndValidate(periods);

  const byPeriods = [];
  let totalDays = 0;

  for (const p of sorted) {
    const begDate = dateToISO(p._beg);
    const endDate = dateToISO(p._end);

    const calendarDays = diffDaysInclusive(begDate, endDate);
    const creditedDays = Math.floor(calendarDays * p.k);

    totalDays += creditedDays;

    byPeriods.push({
      periodDescription: `${begDate}..${endDate} (k=${formatK(p.k)})`,
      calendarDays,
      totalDays: creditedDays,
      total: daysToYMD(creditedDays),
    });
  }

  return {
    totalDays,
    total: daysToYMD(totalDays),
    byPeriods,
  };
}

// ---- Example ----
// const input = [
//   { begDate: "2020-01-01", endDate: "2022-02-24", k: 1 },
//   { begDate: "2022-02-25", endDate: "2023-02-01", k: 1.5 },
// ];

// console.log(calcService(input));

/*
  Notes:
  - Overlap is inclusive. If you want to allow "touching" periods like:
      prev: 2022-02-24..2022-02-24
      next: 2022-02-24..2022-03-01
    that's overlap and will throw.
  - If you want to allow adjacent periods where next starts the day AFTER prev ends,
    that's already allowed (e.g., 2022-02-24 then 2022-02-25).
*/

export { calcService, formatK }
