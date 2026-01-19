"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const turkishMap = {
    ç: "c", Ç: "c",
    ğ: "g", Ğ: "g",
    ı: "i", İ: "i",
    ö: "o", Ö: "o",
    ş: "s", Ş: "s",
    ü: "u", Ü: "u",
};
const slugify = (text) => text
    .split("")
    .map((char) => turkishMap[char] ?? char)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
exports.default = slugify;
