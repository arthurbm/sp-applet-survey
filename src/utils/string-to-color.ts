export const Colors = [
  "purple",
  "blue",
  "teal",
  "orange",
  "magenta",
  "pink",
  "yellow",
] as const;
const defaultColor = "blue";
export type Color = (typeof Colors)[number] | "blue";

const ASCIIlowerAlphaStart = 96;
const ASCIIlowerAlphaEnd = 122;

const lowerAlphaTotal = ASCIIlowerAlphaEnd - ASCIIlowerAlphaStart;
const numberOfColors = Colors.length;

export function turnIntoColor(text: string, colorScheme: any = Colors): Color {
  const positionInASCII = text.toLowerCase().charCodeAt(0);
  const alphaPosition = Math.floor(positionInASCII - ASCIIlowerAlphaStart);
  const colorPosition = Math.floor(
    (alphaPosition * numberOfColors) / lowerAlphaTotal
  );

  return colorScheme[colorPosition] || defaultColor;
}
