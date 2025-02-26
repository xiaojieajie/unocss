import { describe, expect, test } from 'vitest'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import { createGenerator } from '@unocss/core'
import { getMatchedPositionsFromCode as match } from '@unocss/shared-common'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import cssDirectives from '@unocss/transformer-directives'

describe('matched-positions', async () => {
  test('attributify', async () => {
    const uno = createGenerator({
      presets: [
        presetAttributify({ strict: true }),
        presetUno({ attributifyPseudo: true }),
      ],
    })

    expect(await match(uno, '<div border="b gray4 2 [&_span]:white"></div>'))
      .toMatchInlineSnapshot(`
        [
          [
            13,
            14,
            "[border=\\"b\\"]",
          ],
          [
            15,
            20,
            "[border=\\"gray4\\"]",
          ],
          [
            21,
            22,
            "[border=\\"2\\"]",
          ],
          [
            23,
            37,
            "[border=\\"[&_span]:white\\"]",
          ],
        ]
      `)
  })

  test('css-directive', async () => {
    const uno = createGenerator({
      presets: [
        presetUno(),
      ],
      transformers: [cssDirectives()],
    })

    expect(await match(uno, '.btn-center{@apply text-center my-0 font-medium;\n}'))
      .toMatchInlineSnapshot(`
        [
          [
            19,
            30,
            "text-center",
          ],
          [
            31,
            35,
            "my-0",
          ],
          [
            36,
            47,
            "font-medium",
          ],
        ]
      `)
  })

  test('class-based', async () => {
    const uno = createGenerator({
      presets: [
        presetUno(),
      ],
    })

    expect(await match(uno, '<div class="bg-gray-900 h-4 hover:scale-100"></div>'))
      .toMatchInlineSnapshot(`
      [
        [
          12,
          23,
          "bg-gray-900",
        ],
        [
          24,
          27,
          "h-4",
        ],
        [
          28,
          43,
          "hover:scale-100",
        ],
      ]
    `)
  })

  test('variant-group', async () => {
    const uno = createGenerator({
      presets: [
        presetUno(),
      ],
      transformers: [
        transformerVariantGroup(),
      ],
    })

    expect(await match(uno, '<div class="hover:(h-4 w-4 bg-green-300) disabled:opacity-50"></div>'))
      .toMatchInlineSnapshot(`
        [
          [
            19,
            22,
            "hover:h-4",
          ],
          [
            23,
            26,
            "hover:w-4",
          ],
          [
            27,
            39,
            "hover:bg-green-300",
          ],
          [
            41,
            60,
            "disabled:opacity-50",
          ],
        ]
      `)
  })
})

