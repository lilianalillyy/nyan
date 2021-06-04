type TranslationMode = "auto" | "encode" | "decode";

class Translator {
  private static readonly _dict = [
    "nyan",
    "nyaa",
    "nyaaa",
    "nyaha",
    "nya",
    "nyanya",
    "nyaan",
    "nyaah",
    "nyaau",
    "nyau",
  ];

  static translate(input: string, mode: TranslationMode = "auto"): string {
    if (mode === "auto") mode = this.isEncoded(input) ? "decode" : "encode";

    return this[mode](input);
  }

  static isEncoded(input: string): boolean {
    return (
      this._dict.some((s) => input.startsWith(s)) &&
      this.decode(input).trim().length >= 1
    );
  }

  static encode(input: string): string {
    const output = [];
    const inputArray = input.split("");

    for (const inputLetter in inputArray) {
      const encoded = [];
      const atSplit = inputArray[inputLetter]
        .charCodeAt(0)
        .toString()
        .split("");

      for (const code in atSplit) {
        // todo: remove any
        encoded.push(this._dict[atSplit[code] as any]);
      }

      output.push(encoded.join(" "));
    }

    return output.join(". ");
  }

  static decode(input: string): string {
    const output = [];
    const encodedArr = input.split(". ");

    for (const encodedChar in encodedArr) {
      const codes = encodedArr[encodedChar].split(" ");
      const decoded = [];

      for (var i in codes) {
        decoded.push(this._dict.indexOf(codes[i]));
      }

      // todo: remove any
      output.push(String.fromCharCode(decoded.join("") as any));
    }

    return output.join("");
  }
}

export { TranslationMode, Translator };
export default Translator;
