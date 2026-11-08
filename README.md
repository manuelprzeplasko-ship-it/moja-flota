# Moja Flota — projekt startowy

Gotowa wersja startowa panelu WWW dla floty: dodawanie/dezaktywacja pojazdów, VIN, rejestracja, przebieg, odrębne liczniki serwisowe, daty i koszty napraw, daty polis/przeglądów, zgłoszenia QR bez zdjęć. Wszystkie pojazdy są przechowywane we wspólnej bazie Firestore, więc są widoczne na laptopie i telefonach.

## Konfiguracja — krok po kroku

1. Firebase Console → **Dodaj projekt** → np. `Moja-Flota`. Wybierz plan **Spark**. W Firebase → **Firestore Database** utwórz bazę w **trybie produkcyjnym**. Nie wybieraj otwartych reguł testowych.
2. Firebase → **Authentication** → **Sign-in method** → włącz **Email/Password** oraz **Anonymous** (anonimowe zgłoszenia kierowców).
3. Authentication → **Users** → dodaj użytkownika z e-mailem i hasłem administratora. Skopiuj jego **UID**.
4. Firebase → Firestore Database → **Rules** → wklej `firestore.rules`, zamieniając `WPISZ_UID_ADMINISTRATORA` na prawdziwy UID. Kliknij **Publish**. **Nie publikuj przykładowych reguł z placeholderem i nie używaj `allow read, write: if true`**.
5. Firebase → **Project settings** → **Your apps** → dodaj aplikację **Web** (`</>`). Skopiuj parametry `firebaseConfig` do `firebase-config.js`. Nie wklejaj tam kluczy serwisowych ani prywatnych.
6. GitHub → utwórz nowe **publiczne repozytorium**, np. `moja-flota`. Wgraj wszystkie pliki z tego folderu. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. GitHub Pages wymaga publicznego repozytorium w planie Free. Firebase Authentication → Settings → **Authorized domains** → dodaj `TWOJ_LOGIN.github.io` (bez `https://` i bez ścieżki repozytorium).
7. Otwórz `https://TWOJ_LOGIN.github.io/moja-flota/` i zaloguj się. Dodaj pojazdy. Każdy pojazd otrzyma własny link do formularza kierowcy w karcie pojazdu. Wklej go do swojego generatora QR.

## Linki QR

Po dodaniu pojazdu w Firestore system tworzy identyfikator, np. `AbC123xyz...`. Link wygląda tak:

`https://TWOJ_LOGIN.github.io/moja-flota/zgloszenie.html?pojazd=IDENTYFIKATOR`

**To jest szablon**. Rzeczywiste linki pojawią się po wdrożeniu i dodaniu pojazdów. Nie trzeba generować kodów QR w tej aplikacji — służy do tego Twój program. Link jest stały także po zmianie rejestracji. Po dezaktywacji pojazdu formularz przestaje przyjmować zgłoszenia.

## Interwały

- Benzyna + LPG: olej i filtry 10 000 km; filtry gazowe 30 000 km.
- Hybryda + LPG: olej i filtry 15 000 km; filtry gazowe 30 000 km.
- Diesel: olej i filtry 15 000 km; bez filtrów gazowych.
- Elektryk: brak obu liczników.
- Przegląd i polisa: zapis rzeczywistych dat ważności, domyślnie co rok. W obecnej wersji są widoczne daty, ale **nie ma jeszcze automatycznych powiadomień e-mail/push**.

## Bezpieczeństwo i ograniczenia

- Formularz kierowcy jest publiczny; kierowca nie widzi VIN, polis ani innych zgłoszeń. Do przesłania zgłoszenia przeglądarka loguje się anonimowo do Firebase. Kto ma link, może przesłać zgłoszenie; nie jest to uwierzytelnienie tożsamości kierowcy. Złośliwy użytkownik posiadający link może wysyłać spam — przed szerszym wdrożeniem zalecane są Firebase App Check i zabezpieczenia antyspamowe (np. pośredniczący backend z ograniczeniem częstotliwości).
- Przebieg podany przez kierowcę **nie zmienia od razu stanu pojazdu**: administrator zatwierdza zgłoszenie, aby uniknąć błędów. Przebieg pojazdu nie jest zmniejszany po zatwierdzeniu starszego zgłoszenia.
- W repozytorium publicznym można przechowywać konfigurację WWW Firebase (nie jest tajna), ale **nigdy** haseł, kluczy serwisowych, danych pojazdów ani kopii bazy. Dane pojazdów są w Firestore, nie w GitHub.
- Warto wdrożyć eksport/kopie zapasowe przed produkcyjnym użyciem. Historia serwisu zapisuje datę i przebieg, a następny termin jest wyliczany z ostatniej wymiany.
- Projekt jest wersją startową; nie ma jeszcze automatycznych kopii, powiadomień ani formularza edycji historii. Reguły Firestore ograniczają dostęp administratora przez UID jednego konta. Dodanie kolejnych administratorów wymaga zmiany reguł.
- Koszty: GitHub Pages dla publicznego repozytorium może być bezpłatny. Firebase Spark ma limity bezpłatne (Firestore, Authentication), ale nie gwarantuje to nieograniczonego darmowego używania. Bez zdjęć i funkcji płatnych 15 pojazdów powinno mieścić się w darmowych limitach przy zwykłym użyciu. Sprawdź aktualne limity w konsoli Firebase.
