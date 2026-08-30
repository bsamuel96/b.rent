# b.rent | Închirieri containere

Website React + TypeScript pentru estimarea orientativă a containerelor de închiriat.

## Rulare

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Configurare contact

Datele publice de contact sunt centralizate în `src/config/site.ts` și sunt citite din variabile Vite:

- `VITE_CONTACT_PHONE_DISPLAY` pentru telefonul afișat
- `VITE_CONTACT_PHONE_E164` pentru linkuri `tel:`
- `VITE_CONTACT_WHATSAPP_E164` pentru WhatsApp
- `VITE_CONTACT_EMAIL` pentru email și fallback `mailto:`
- `VITE_BUSINESS_REGISTERED_OFFICE` pentru sediul social afișat exclusiv în pagina de date legale
- `VITE_BUSINESS_NAME`, `VITE_BUSINESS_FISCAL_CODE`, `VITE_BUSINESS_REGISTRATION_NUMBER`,
  `VITE_BUSINESS_CURRENT_REGISTRATION_NUMBER`, `VITE_BUSINESS_EUID` și
  `VITE_BUSINESS_PRIMARY_ACTIVITY` pentru identificarea operatorului
- `VITE_CALLBACK_ENDPOINT` pentru trimiterea cererilor de callback prin `POST`
- `VITE_SERVICE_AREA` pentru aria de livrare afișată în zonele publice de contact
- `VITE_BUSINESS_HOURS` pentru program
- `VITE_SITE_URL` pentru URL-urile canonice și Open Graph
- `VITE_GA_MEASUREMENT_ID` pentru Google Analytics, încărcat numai după consimțământ

Vezi `.env.example`. Valorile lipsă rămân `null`; interfața omite datele necunoscute în loc să publice linkuri sau informații inventate.

## Pagini de lansare

Build-ul generează pagini HTML separate pentru pagina principală, politica de confidențialitate,
termeni și condiții, datele legale, confirmarea formularului și pagina 404. `public/robots.txt`,
`public/sitemap.xml`, manifestul și setul de favicon-uri sunt copiate automat în `dist`.

## Estimator

Categoriile de proiect și capacitățile sunt în `src/data/container-options.ts`. Valorile actuale sunt provizorii:

- Mic: 3 m³
- Mediu: 5 m³
- Mare: 7 m³
- Șantier: 10 m³

## Asset-uri și shadcn

Logo-urile originale sunt păstrate în `logo/`, iar imaginile master în `source-assets/`.
Versiunile WebP folosite la runtime sunt:

- `public/brand/greu-logo-dark-background.webp`: pentru fundaluri închise
- `public/brand/greu-logo-light-background.webp`: pentru fundaluri deschise

Proiectul folosește Tailwind CSS v3. Componentele shadcn sunt în `src/components/ui`, aliniate cu aliasul `@/components/ui`. O singură locație previzibilă ajută generatoarele shadcn, păstrează importurile consistente, evită primitive duplicate și permite adăugarea de componente viitoare fără rescrieri manuale de path-uri.
