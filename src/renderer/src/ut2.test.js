import { trytest, calcMilitarySeniority_CADRE } from './ut2.js';

describe('math module', () => {

    test('trytest adds numbers', () => {
        expect(trytest()).toBe("test-ok");
    });

    test('calc1', () => {
        const testInput = [
            {
                begDate: "2020-01-01",
                endDate: "2022-12-31",
                k: 1
            },
            {
                begDate: "2023-03-01",
                endDate: "2024-02-28",
                k: 3
            },
            {
                begDate: "2025-05-01",
                endDate: "2025-11-15",
                k: 1
            }
        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(6);
        expect(result.totalSeniority.m).toBe(6);
        expect(result.totalSeniority.d).toBe(16);
        expect(result.totalLengthOfService.y).toBe(4);
        expect(result.totalLengthOfService.m).toBe(6);
        expect(result.totalLengthOfService.d).toBe(16);
    })

    test('calc2 normal', () => {
        const testInput = [
            {
                begDate: "2020-01-01",
                endDate: "2022-12-31",
                k: 1
            },
            {
                begDate: "2023-03-01",
                endDate: "2024-02-28",
                k: 3
            },
            {
                begDate: "2025-05-01",
                endDate: "2025-11-15",
                k: 1
            }
        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(6);
        expect(result.totalSeniority.m).toBe(6);
        expect(result.totalSeniority.d).toBe(16);
        expect(result.totalLengthOfService.y).toBe(4);
        expect(result.totalLengthOfService.m).toBe(6);
        expect(result.totalLengthOfService.d).toBe(16);
    })

    test('calc3 less than month 01/01', () => {
        const testInput = [
            {
                begDate: "2025-01-01",
                endDate: "2025-01-15",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(0);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(15);
        expect(result.totalLengthOfService.y).toBe(0);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(15);
    })

    test('calc4 less than month 02/01', () => {
        const testInput = [
            {
                begDate: "2025-01-02",
                endDate: "2025-01-15",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(0);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(14);
        expect(result.totalLengthOfService.y).toBe(0);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(14);
    })

    test('calc5 less than month 01/02', () => {
        const testInput = [
            {
                begDate: "2025-02-01",
                endDate: "2025-02-15",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(0);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(15);
        expect(result.totalLengthOfService.y).toBe(0);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(15);
    })

    test('calc6 less than month 02/02', () => {
        const testInput = [
            {
                begDate: "2025-02-02",
                endDate: "2025-02-15",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(0);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(14);
        expect(result.totalLengthOfService.y).toBe(0);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(14);
    })

    test('calc7 less than month from 12 prev year', () => {
        const testInput = [
            {
                begDate: "2024-12-31",
                endDate: "2025-01-15",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(0);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(16);
        expect(result.totalLengthOfService.y).toBe(0);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(16);
    })

    test('calc8 year + 15 days', () => {
        const testInput = [
            {
                begDate: "2024-01-01",
                endDate: "2025-01-15",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(1);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(15);
        expect(result.totalLengthOfService.y).toBe(1);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(15);
    })

    test('calc9 year + days', () => {
        const testInput = [
            {
                begDate: "2024-01-02",
                endDate: "2026-01-02",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(2);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(1);
        expect(result.totalLengthOfService.y).toBe(2);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(1);
    })

    test('calc11 year + days', () => {
        const testInput = [
            {
                begDate: "2024-02-01",
                endDate: "2025-01-31",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(1);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(0);
        expect(result.totalLengthOfService.y).toBe(1);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(0);
    })

    test('calc12 year + days', () => {
        const testInput = [
            {
                begDate: "2024-02-03",
                endDate: "2025-02-02",
                k: 1
            },

        ];
        const result = calcMilitarySeniority_CADRE(testInput);
        expect(result.totalSeniority.y).toBe(1);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(0);
        expect(result.totalLengthOfService.y).toBe(1);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(0);
    })

    test('calc13 N years minus 1 day => exactly N years (cadre calculator rule)', () => {
        const testInput = [
            {
                begDate: "2020-03-10",
                endDate: "2023-03-09", // 3-річниця мінус 1 день
                k: 1
            },
        ];

        const result = calcMilitarySeniority_CADRE(testInput);

        expect(result.totalSeniority.y).toBe(3);
        expect(result.totalSeniority.m).toBe(0);
        expect(result.totalSeniority.d).toBe(0);

        expect(result.totalLengthOfService.y).toBe(3);
        expect(result.totalLengthOfService.m).toBe(0);
        expect(result.totalLengthOfService.d).toBe(0);
    });


    test('overlapping1 periods throws on overlapping periods (inclusive overlap)', () => {
        const input = [
            { begDate: "2025-01-01", endDate: "2025-01-10", k: 1 },
            // перетин, бо попередній включає 10-те і цей теж починається 10-го
            { begDate: "2025-01-10", endDate: "2025-01-15", k: 1 },
        ];

        expect(() => calcMilitarySeniority_CADRE(input)).toThrow(/Overlapping periods/);
    });

    test('overlapping2 does NOT throw when periods do not overlap (next starts after prev end)', () => {
        const input = [
            { begDate: "2025-01-01", endDate: "2025-01-10", k: 1 },
            // ок, бо починається з наступного дня
            { begDate: "2025-01-11", endDate: "2025-01-15", k: 1 },
        ];

        expect(() => calcMilitarySeniority_CADRE(input)).not.toThrow();
    });

    test('overlapping3 works even if input is unsorted (module sorts before checking)', () => {
        const input = [
            { begDate: "2025-02-01", endDate: "2025-02-10", k: 1 },
            { begDate: "2025-01-01", endDate: "2025-01-15", k: 1 },
        ];

        expect(() => calcMilitarySeniority_CADRE(input)).not.toThrow();
    });

    test("plus1 sorts periods by begDate (unsorted input) and keeps correct descriptions order", () => {
        const input = [
            { begDate: "2025-05-01", endDate: "2025-05-15", k: 1 },
            { begDate: "2024-01-01", endDate: "2024-01-15", k: 1 },
            { begDate: "2025-01-01", endDate: "2025-01-15", k: 1 },
        ];

        const res = calcMilitarySeniority_CADRE(input);

        // перевіряємо порядок у вихідному масиві periods
        expect(res.periods.map(p => p.description)).toEqual([
            "01.01.2024 - 15.01.2024",
            "01.01.2025 - 15.01.2025",
            "01.05.2025 - 15.05.2025",
        ]);
    });

    test("plus2 fractional k=1.5 rounding=floor (default): 15d * 1.5 => 22d (floor 22.5 -> 22)", () => {
        const input = [
            // beg=1, mTotal=0 => d = 15 (за вашим правилом для повного року/0 місяців без +1)
            { begDate: "2025-01-01", endDate: "2025-01-15", k: 1.5 },
        ];

        const res = calcMilitarySeniority_CADRE(input); // rounding за замовчуванням "floor"

        expect(res.totalLengthOfService).toEqual({ y: 0, m: 0, d: 15 });
        expect(res.totalSeniority).toEqual({ y: 0, m: 0, d: 22 }); // 15 * 1.5 = 22.5 -> 22
    });

    test("plus3 fractional k=1.5 rounding=round: 15d * 1.5 => 23d (round 22.5 -> 23)", () => {
        const input = [
            { begDate: "2025-01-01", endDate: "2025-01-15", k: 1.5 },
        ];

        const res = calcMilitarySeniority_CADRE(input, { rounding: "round" });

        expect(res.totalLengthOfService).toEqual({ y: 0, m: 0, d: 15 });
        expect(res.totalSeniority).toEqual({ y: 0, m: 0, d: 23 }); // 22.5 -> 23
    });

    test("plus4 fractional k=1.5 rounding=ceil: 15d * 1.5 => 23d (ceil 22.5 -> 23)", () => {
        const input = [
            { begDate: "2025-01-01", endDate: "2025-01-15", k: 1.5 },
        ];

        const res = calcMilitarySeniority_CADRE(input, { rounding: "ceil" });

        expect(res.totalLengthOfService).toEqual({ y: 0, m: 0, d: 15 });
        expect(res.totalSeniority).toEqual({ y: 0, m: 0, d: 23 });
    });

});
