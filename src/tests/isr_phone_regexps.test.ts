import { ISRAEL_PHONE_REGEXP } from "../db/schemas/patterns.ts";
import { describe, it, expect } from "vitest";

describe("ISRAEL_PHONE_REGEXP", () => {
  describe("Valid phone numbers", () => {
    const validCases = [
      // Landline numbers (02, 03, 04, 08, 09)
      { phone: "031234567", desc: "Landline with 0 prefix" },
      { phone: "03-1234567", desc: "Landline with hyphen" },
      { phone: "+97231234567", desc: "Landline with +972 prefix" },
      { phone: "+972-3-1234567", desc: "Landline with +972 prefix and hyphens" },

      // Mobile numbers (050, 052, 053, 054, 055, 058)
      { phone: "0541234567", desc: "Mobile with 0 prefix" },
      { phone: "054-1234567", desc: "Mobile with hyphen" },
      { phone: "+972541234567", desc: "Mobile with +972 prefix" },
      { phone: "+972-54-1234567", desc: "Mobile with +972 prefix and hyphens" },

      // VoIP numbers (072, 073, 074, 076, 077, 079)
      { phone: "0771234567", desc: "VoIP 077" },
      { phone: "073-1234567", desc: "VoIP 073 with hyphen" },
      { phone: "+972721234567", desc: "VoIP 072 with +972" },

      // Special service numbers (1-800, 1-900, 1-700)
      { phone: "1800123456", desc: "Toll-free 1800 without hyphens" },
      { phone: "1-800-123-456", desc: "Toll-free 1800 with hyphens" },
      { phone: "1801123456", desc: "Toll-free 1801" },
      { phone: "1-900-123-456", desc: "Premium rate 1900" },
      { phone: "1-700-123-456", desc: "Local rate 1700" }
    ];

    validCases.forEach(({ phone, desc }) => {
      it(`should accept: ${phone} (${desc})`, () => {
        expect(ISRAEL_PHONE_REGEXP.test(phone)).toBe(true);
      });
    });
  });

  describe("Invalid phone numbers", () => {
    const invalidCases = [
      // Format & structure errors
      { phone: "", desc: "Empty string" },
      { phone: "abc", desc: "Letters" },
      { phone: "054123456", desc: "Too short (6 digits body)" },
      { phone: "05412345678", desc: "Too long (8 digits body)" },

      // Unsupported operator prefixes
      { phone: "0571234567", desc: "Decommissioned prefix 057" },
      { phone: "0711234567", desc: "Invalid VoIP prefix 071" },
      { phone: "0612345678", desc: "Invalid area code 06" },

      // Invalid zero start in local subscriber number
      { phone: "030123456", desc: "Subscriber number starting with 0" },

      // Malformed service numbers
      { phone: "1-600-123-456", desc: "Invalid service prefix 1600" },
      { phone: "1-800-123-45", desc: "Too short 1-800 number" },

      // Invalid international formats
      { phone: "972541234567", desc: "Missing + in 972" },
      { phone: "+9720541234567", desc: "Including leading 0 after +972" }
    ];

    invalidCases.forEach(({ phone, desc }) => {
      it(`should reject: ${phone} (${desc})`, () => {
        expect(ISRAEL_PHONE_REGEXP.test(phone)).toBe(false);
      });
    });
  });
});
