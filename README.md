# Webshop med Stripe-integration

## Projektbeskrivning
I det här projektet har vi skapat en webshop som möjliggör registrering och inloggning av användare, samt genomförande av betalningar med hjälp av Stripe. Användaren kan lägga till produkter i en kundvagn och genomföra ett köp. Vid varje genomförd betalning skapas en order som sparas i en JSON-fil på servern. Projektet integrerar också med PostNord API för att välja utlämningsställen baserat på användarens adress.

### Teknikstack
- **Frontend:** React, TypeScript
- **Backend:** Node.js med Express
- **Databehandling:** JSON-filer för lagring av användardata och ordrar
- **Övrigt:** Stripe för betalningar, PostNord API för utlämningsställen.

## Installation
1. Klona detta GitHub-repository.
2. Installera beroenden i både server- och client-mappen.
   - cd server
   - npm install
   - cd../client
   - npm install


## Konfiguration
Skapa en `.env`-fil i både `server` och `client`. Dessa filer ska innehålla nödvändiga API-nycklar och konfigurationer specifika för din miljö.

## Körning av projektet
För att starta servern och klienten, kör följande kommandon i separata terminalfönster:
- För servern:
  1. cd server
  2. npm run dev

- För klienten:
  1. cd client
  2. npm run dev
   
