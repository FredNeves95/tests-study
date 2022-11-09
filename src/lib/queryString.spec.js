import { queryString, parse } from './queryString'

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Fred',
      profession: 'developer'
    }
    expect(queryString(obj)).toBe(
      'name=Fred&profession=developer'
    )
  })
  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Fred',
      abilities: ['JS', 'TDD']
    }
    expect(queryString(obj)).toBe(
      'name=Fred&abilities=JS,TDD'
    )
  })
  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Fred',
      abilities: {
        first: 'JS',
        second: 'TDD'
      }
    }
    expect(() => { queryString(obj) }).toThrowError()
  })
})

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Fred&profession=developer'

    expect(parse(qs)).toEqual({
      name: 'Fred',
      profession: 'developer'
    })
  })
  it('should convert a query string of a single key-value to an object', () => {
    const qs = 'name=Fred'

    expect(parse(qs)).toEqual({
      name: 'Fred',
    })
  })
  it('should convert a query string to object taking care of comma separated values', () => {
    const qs = 'name=Fred&abilities=JS,TDD'

    expect(parse(qs)).toEqual({
      name: 'Fred',
      abilities: ['JS', 'TDD']
    })
  })
})