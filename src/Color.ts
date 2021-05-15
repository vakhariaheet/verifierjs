/** Hex To RGBA Converter
 * * Hex must be 9/7/5/4 characters long ( With '#' )
 *
 * @param hex  hexadecimal color
 * @param alpha(optional) opacity
 * @returns rgba string
 * @example
 * ("#ffffff") => rgb(255,255,255);
 * ("#000",0.1) => rgba(0,0,0,.1)
 * ("#000C") => rgba(0,0,0,0.8)
 */
export const hexToRgb = (hex: string, alpha: number = 1) => {
  //* Remove # from hex string
  hex = hex.match(/\w/g)?.join("") as string;
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  if (hex.length === 4) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  //* getting RGB hex value (hex:#RRGGBB)
  const colors = hex.match(/.{1,2}/g) as string[];
  //* Converting hex Rgb value into rgb values

  const rgbaValues: number[] = (colors as string[]).map((color) =>
    parseInt(color, 16)
  );
  //*Checking if given hex is 3 digit long
  if (hex.length === 8) {
    const alpha = (parseInt(hex[6], 16) * 16 + parseInt(hex[7], 16)) / 255;
    if (alpha !== 1) rgbaValues[3] = Number(alpha.toFixed(2));
    else rgbaValues.pop();
  } else if (alpha && alpha !== 1) {
    rgbaValues.push(alpha);
  }
  const rgba = `${rgbaValues.length === 3 ? "rgb" : "rgba"}(${rgbaValues.join(
    ","
  )})`;
  return rgba;
};
/**
 * Convert RGBA value to hex(#RRGGBBAA/#RRGGBB)
 *
 * @param   {number}  red      0-255
 * @param   {number}  blue     0-255
 * @param   {number}  green    0-255
 * @param   {number} alpha     0-1 (default 1)
 * @return  {string}  hex
 * @example
 * (255,255,255,1) => #ffffff
 * (255,255,255,.8) => #ffffffcc
 */
export const rgbToHex = (
  red: number,
  green: number,
  blue: number,
  alpha: number = 1
): string => {
  //* Converting red into hex red
  const hexRed = red.toString(16).padStart(2, "0");
  //* Converting red into hex green
  const hexGreen = green.toString(16).padStart(2, "0");
  //* Converting red into hex blue
  const hexBlue = blue.toString(16).padStart(2, "0");
  //* Converting alpha into hex alpha
  //** Multiplying alpha * 255 and removing all decimal points
  //** converting 255 decimal number to  2 digit hexstring
  const hexAlpha =
    Number((alpha * 255).toFixed())
      .toString(16)
      .padStart(2, "0") === "ff"
      ? ""
      : Number((alpha * 255).toFixed())
          .toString(16)
          .padStart(2, "0");
  if (alpha === 1) return `#${hexRed}${hexGreen}${hexBlue}`;
  return `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
};

/**
 *
 * @param rgba rgba/rgb string
 * @returns hex
 * @example
 * 'rgb(0,0,0)' => #000000
 * 'rgba(0,0,0,.8)' => #000000CC
 */

export const rgbStrToHex = (rgba: string) => {
  const rgbValues = rgba
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((value) => Number(value));

  return rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2], rgbValues[3]);
};

/**
 *  @description Converts RGBA/RGB to HSLA/HSL
 * @param red (0-255)
 * @param green (0-255)
 * @param blue (0-255)
 * @param alpha (0-1) [optional]
 * @returns hsl string
 * @example
 *  (33,33,33) => "hsl(0,0%,13%)"
 *  (0,0,0,.5) =>"hsla(0,0%,0%,0.5)"
 */
export const rgbToHsl = (
  red: number,
  green: number,
  blue: number,
  alpha?: number
) => {
  red /= 255;
  green /= 255;
  blue /= 255;
  const cmax = Math.max(red, green, blue);
  const cmin = Math.min(red, green, blue);
  const delta = cmax - cmin;
  let hue = 0,
    saturation = 0,
    lightness = (cmax + cmin) / 2;

  if (cmax === cmin) {
    hue = saturation = 0;
  } else {
    saturation =
      lightness > 0.5 ? delta / (2 - cmax - cmin) : delta / (cmax + cmin);
    if (cmax === red) hue = (green - blue) / delta + (green < blue ? 6 : 0);
    else if (cmax === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue /= 6;
  }
  hue = Number((hue * 360).toFixed());
  saturation = Number((saturation * 100).toFixed());
  lightness = Number((lightness * 100).toFixed());

  if (typeof alpha !== "undefined")
    return alpha !== 1
      ? `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
      : `hsl(${hue},${saturation}%,${lightness}%)`;
  return `hsl(${hue},${saturation}%,${lightness}%)`;
};
/**
 *
 * @param rgba rgb/rgba string
 * @returns hsl string
 * @example
 * rgb(33,33,33) => "hsl(0,0%,13%)"
 * rgba(0,0,0,.5) =>"hsla(0,0%,0%,0.5)"
 */
export const rgbStrToHsl = (rgba: string) => {
  const rgbValues = rgba
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((value) => Number(value));

  return rgbToHsl(rgbValues[0], rgbValues[1], rgbValues[2], rgbValues[3]);
};

const hueToRgb = (t1: number, t2: number, hue: number) => {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;
  if (hue < 1) return (t2 - t1) * hue + t1;
  else if (hue < 3) return t2;
  else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
};
/**
 *
 * @param hue 0-infinity
 * @param saturation 0-1(number) OR 0%-100%(string)
 * @param lightness 0-1(number) OR 0%-100%(string)
 * @param alpha 0-1 [optional]
 * @returns RGB/RGBA String
 * @example
 * (500, 0.5, 0.5) => rgb(64,191,106);
 * (200,0.5, 0.5) => rgb(64,149,191);
 * (100, '50%', '50%',.5) => rgba(106,191,64,.5)
 */
export const hslToRgb = (
  hue: number,
  saturation: string | number,
  lightness: string | number,
  alpha: number = 1
) => {
  if (hue > 360) hue = hue % 360;
  if (typeof saturation === "string") {
    saturation = Number((saturation.match(/[0-9]{1,}/) as string[])[0]) / 100;
  }
  if (typeof lightness === "string") {
    lightness = Number((lightness.match(/[0-9]{1,}/) as string[])[0]) / 100;
  }
  let t1, t2, red, green, blue;
  hue = hue / 60;

  if (lightness <= 0.5) {
    t2 = lightness * (saturation + 1);
  } else {
    t2 = lightness + saturation - lightness * saturation;
  }
  t1 = lightness * 2 - t2;

  red = hueToRgb(t1, t2, hue + 2) * 255;
  green = hueToRgb(t1, t2, hue) * 255;
  blue = hueToRgb(t1, t2, hue - 2) * 255;

  if (alpha === 1)
    return `rgb(${red.toFixed()},${green.toFixed()},${blue.toFixed()})`;
  return `rgba(${red.toFixed()},${green.toFixed()},${blue.toFixed()},${alpha})`;
};

/**
 *
 * @param hex hexdecimal string
 * @returns hsl string
 * @example
 * '#fff' => hsl(0,0%,100%)
 * '#fffc' => hsla(0,0%,100%,.8)
 */
export const hexToHsl = (hex: string): string => {
  const rgb = hexToRgb(hex);
  return rgbStrToHsl(rgb);
};
/**
 *
 * @param hue 0-infinity
 * @param saturation 0-1(number) OR 0%-100%(string)
 * @param lightness 0-1(number) OR 0%-100%(string)
 * @param alpha 0-1
 * @returns hex string
 * @example
 * (50,'50%','50%') => #bfaa40
 * (150,.5,.5) => #4080bf
 */
export const hslToHex = (
  hue: number,
  saturation: number | string,
  lightness: number | string,
  alpha: number = 1
): string => {
  const rgb = hslToRgb(hue, saturation, lightness, alpha);
  return rgbStrToHex(rgb);
};

/**
 *
 * @param hsl hsl/hsla string
 * @returns rgb/rgba  string
 * @example
 * 'hsl(100,.5,.5)' => rgb(106,191,64)
 * 'hsl(200,50%,50%,.7)' => rgb(64,149,191,.7)
 */
export const hslStrToRgb = (hsl: string): string => {
  const hslValues = hsl.split("(")[1].split(")")[0].split(",");

  return hslToRgb(
    Number(hslValues[0]),
    Number(hslValues[1]) || hslValues[1],
    Number(hslValues[1]) || hslValues[1],
    Number(hslValues[3] || 1)
  );
};

/**
 *
 * @param hsl hsl/hsla string
 * @returns hex string
 * @example
 * 'hsl(100,50%,50%)' => #6abf40
 * 'hsl(233,.6,.5) => #3345cc
 *
 */
export const hslStrToHex = (hsl: string): string => {
  const rgb = hslStrToRgb(hsl);
  console.log(rgb);
  return rgbStrToHex(rgb);
};
