let { equal } = require('node:assert')
let { test } = require('node:test')
let postcss = require('postcss').default

let plugin = require('./')

function run(input, output, opts) {
  let result = postcss([plugin(opts)]).process(input, { from: '/test.css' })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('sets inline-size, block-size, min-inline-size, min-block-size, max-inline-size, max-block-size', () => {
  run('a{ size: 1px 2px; }', 'a{ inline-size: 1px; block-size: 2px; }')
  run('a{ min-size: 1px 2px; }', 'a{ min-inline-size: 1px; min-block-size: 2px; }')
  run('a{ max-size: 1px 2px; }', 'a{ max-inline-size: 1px; max-block-size: 2px; }')
})

test('sets inline-size and block-size by one value', () => {
  run('a{ size: 1px; }', 'a{ inline-size: 1px; block-size: 1px; }')
  run('a{ min-size: 1px; }', 'a{ min-inline-size: 1px; min-block-size: 1px; }')
  run('a{ max-size: 1px; }', 'a{ max-inline-size: 1px; max-block-size: 1px; }')
})

test('splits values by brackets', () => {
  run(
    'a{ size: calc(4 * 2px)  2px; }',
    'a{ inline-size: calc(4 * 2px); block-size: 2px; }'
  )
  run(
    'a{ min-size: calc(4 * 2px)  2px; }',
    'a{ min-inline-size: calc(4 * 2px); min-block-size: 2px; }'
  )
  run(
    'a{ max-size: calc(4 * 2px)  2px; }',
    'a{ max-inline-size: calc(4 * 2px); max-block-size: 2px; }'
  )
})

test('prefix value', () => {
  run(
    'a{ size: -webkit-fit-content  auto; }',
    'a{ inline-size: -webkit-fit-content; block-size: auto; }'
  )
  run(
    'a{ min-size: -webkit-fit-content  auto; }',
    'a{ min-inline-size: -webkit-fit-content; min-block-size: auto; }'
  )
  run(
    'a{ max-size: -webkit-fit-content  auto; }',
    'a{ max-inline-size: -webkit-fit-content; max-block-size: auto; }'
  )
})

test('supports auto value', () => {
  run('a{ size: .98%  auto; }', 'a{ inline-size: .98%; block-size: auto; }')
  run('a{ min-size: .98%  auto; }', 'a{ min-inline-size: .98%; min-block-size: auto; }')
  run('a{ max-size: .98%  auto; }', 'a{ max-inline-size: .98%; max-block-size: auto; }')
})

test('supports !important', () => {
  run(
    'a{ size: 1px !important; }',
    'a{ inline-size: 1px !important; block-size: 1px !important; }'
  )
  run(
    'a{ min-size: 1px !important; }',
    'a{ min-inline-size: 1px !important; min-block-size: 1px !important; }'
  )
  run(
    'a{ max-size: 1px !important; }',
    'a{ max-inline-size: 1px !important; max-block-size: 1px !important; }'
  )
})

test('not conflicts with @page size descriptor', () => {
  run('@page{ size: 4cm 6cm landscape; }', '@page{ size: 4cm 6cm landscape; }')
})
