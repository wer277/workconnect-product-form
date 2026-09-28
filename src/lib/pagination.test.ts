import { describe, expect, it } from 'vitest';
import { getPageItems } from './pagination';

describe('getPageItems', () => {
  it.each([
    [1, 1, [1]],
    [1, 2, [1, 2]],
    [4, 7, [1, 2, 3, 4, 5, 6, 7]],
    [1, 10, [1, 2, 3, 4, 5, 'ellipsis', 10]],
    [4, 10, [1, 2, 3, 4, 5, 'ellipsis', 10]],
    [5, 10, [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]],
    [7, 10, [1, 'ellipsis', 6, 7, 8, 9, 10]],
    [10, 10, [1, 'ellipsis', 6, 7, 8, 9, 10]],
  ])('page %d of %d', (page, pageCount, expected) => {
    expect(getPageItems(page, pageCount)).toEqual(expected);
  });

  it('never returns more than 7 items', () => {
    for (let page = 1; page <= 50; page += 1) {
      expect(getPageItems(page, 50).length).toBeLessThanOrEqual(7);
    }
  });
});
