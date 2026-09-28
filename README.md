# WorkConnect - formularz dodawania produktu

Zadanie rekrutacyjne: trzyetapowy formularz w modalu i tabela produktów z paginacją w URL.

Demo: https://workconnect-product-form-eight.vercel.app/

## Uruchomienie

Node 22+

```bash
npm install
npm run dev
```

Aplikacja działa na http://localhost:5173

## Skrypty

- `npm run dev` - serwer deweloperski
- `npm run build` - build produkcyjny
- `npm test` - testy (Vitest)
- `npm run lint` - ESLint
- `npm run typecheck` - sprawdzenie typów

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, TanStack Form, Zod, nuqs

## Uwagi

- Każdy krok ma swój schemat Zod. Pole jest walidowane schematem całego kroku, dzięki temu działają reguły typu min <= maks.
- Ceny netto i brutto przeliczają się przez listenery pól w TanStack Form.
- Numer strony jest trzymany w URL (`?page=2`).
- W Figmie jest 7 produktów, więc w danych startowych też jest 7 (w PDF było 5).
- Na makiecie kroku 3 druga linia steppera jest szara, chociaż krok 2 jest już ukończony. Uznałam to za błąd makiety: linia jest niebieska, gdy krok przed nią jest ukończony.
- Placeholder cen to 0,00 zamiast 0.00 z makiety, żeby zgadzał się z polskim formatem kwot w formularzu.
- TypeScript 6 zamiast 7, bo typescript-eslint nie obsługuje jeszcze TS 7.
