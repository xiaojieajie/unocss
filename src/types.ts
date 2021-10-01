/* eslint-disable no-use-before-define */

export type NanowindCssObject = Record<string, string | number | undefined>
export type NanowindCssEntries = [string, string | number | undefined][]

export type NanowindDynamicRule = [RegExp, ((match: string[], theme: NanowindTheme) => (NanowindCssObject | NanowindCssEntries | undefined))]
export type NanowindStaticRule = [string, NanowindCssObject | NanowindCssEntries]
export type NanowindRule = NanowindDynamicRule | NanowindStaticRule

export type NanowindVariant = {
  match: (input: string, theme: NanowindTheme) => string | undefined
  selector?: (input: string, theme: NanowindTheme) => string | undefined
  rewrite?: (input: NanowindCssEntries, theme: NanowindTheme) => NanowindCssEntries | undefined
  mediaQuery?: (selector: string, theme: NanowindTheme) => string | undefined
}

export interface NanowindTheme {
  borderRadius: Record<string, string>
  breakpoints: Record<string, string>
  colors: Record<string, string | Record<string, string>>
  fontFamily: Record<string, string>
  fontSize: Record<string, [string, string]>
  lineHeight: Record<string, string>
  letterSpacing: Record<string, string>
}

export interface NanowindConfig {
  rules: NanowindRule[]
  variants: NanowindVariant[]
  theme: NanowindTheme
}

export type NanowindUserConfig = Partial<NanowindConfig>