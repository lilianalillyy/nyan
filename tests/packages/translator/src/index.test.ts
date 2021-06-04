import Translator from "../../../../packages/translator/src/index";

const encodedExample =
  "nyaa nyan nya. nyaa nyan nyaa. nyaa nyan nyaau. nyaa nyan nyaau. nyaa nyaa nyaa. nyaha nyaaa. nyaa nyaa nyau. nyaa nyaa nyaa. nyaa nyaa nya. nyaa nyan nyaau. nyaa nyan nyan";

const decodedExample = "hello world";

describe("Translator.encode()", () => {
  test("encode()", () => {
    const result = Translator.encode(decodedExample);

    expect(result).toBe(encodedExample);
  });
});

describe("Translator.decode()", () => {
  test("decode()", () => {
    const result = Translator.decode(encodedExample);

    expect(result).toBe(decodedExample);
  });
});

describe("Translator.isEncoded()", () => {
  test("isEncoded() -> encoded: true", () => {
    const result = Translator.isEncoded(encodedExample);

    expect(result).toBe(true);
  });

  test("isEncoded() -> encoded: false", () => {
    const result = Translator.isEncoded(decodedExample);

    expect(result).toBe(false);
  });
});

describe("Translator.translate()", () => {
  test("translate() -> mode: auto, decode", () => {
    const result = Translator.translate(encodedExample, "auto");

    expect(result).toBe(decodedExample);
  });

  test("translate() -> mode: auto, encode", () => {
    const result = Translator.translate(decodedExample, "auto");

    expect(result).toBe(encodedExample);
  });

  test("translate() -> mode: encode", () => {
    const result = Translator.translate(decodedExample, "encode");

    expect(result).toBe(encodedExample);
  });

  test("translate() -> mode: decode", () => {
    const result = Translator.translate(encodedExample, "decode");

    expect(result).toBe(decodedExample);
  });
});
