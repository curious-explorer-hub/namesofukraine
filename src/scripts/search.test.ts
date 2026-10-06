import { describe, expect, it } from 'vitest';
import { prepare, rank } from './search';

const entry = (n: string, r: string, s = '') => ({ n, r, y: '', u: `/${n}/`, g: 'literature', s: `${n} ${r} ${s}` });
// Index order is by birth, as in the built index.
const index = prepare([
  entry('Григорій Сковорода', 'Філософ-мандрівник'),
  entry('Тарас Шевченко', 'Національний поет України'),
  entry('Іван Франко', 'Каменяр', 'поет письменник'),
  entry('Леся Українка', 'Поетеса', 'Лариса Косач'),
  entry('Андрій Шевченко', 'Футболіст'),
]);
const names = (q: string) => rank(index, q).map((e) => e.n);

describe('rank', () => {
  it('returns nothing for an empty query', () => {
    expect(names('  ')).toEqual([]);
  });

  it('puts names that start with the query first, then a word of the name, then other matches', () => {
    expect(names('шев')).toEqual(['Тарас Шевченко', 'Андрій Шевченко']);
    expect(names('тарас')).toEqual(['Тарас Шевченко']);
    expect(names('поет')).toEqual(['Тарас Шевченко', 'Леся Українка', 'Іван Франко']); // role before other text
  });

  it('needs every word of the query, in any order', () => {
    expect(names('шевченко андрій')).toEqual(['Андрій Шевченко']);
  });

  it('ignores case and apostrophe variants', () => {
    const withApostrophe = prepare([entry("В'ячеслав Чорновіл", 'Політик')]);
    expect(rank(withApostrophe, 'В’ЯЧЕСЛАВ').map((e) => e.n)).toEqual(["В'ячеслав Чорновіл"]);
  });

  it('keeps at most the limit', () => {
    expect(rank(index, 'а', 2)).toHaveLength(2);
  });
});
