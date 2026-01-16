import { calcMilitarySeniority_CADRE } from "./ut2.js";

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

console.log(calcMilitarySeniority_CADRE(testInput));