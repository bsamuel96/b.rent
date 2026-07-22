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
- `VITE_CALLBACK_ENDPOINT` pentru trimiterea cererilor de callback prin `POST`
- `VITE_SERVICE_AREA` pentru aria de livrare
- `VITE_BUSINESS_HOURS` pentru program

Vezi `.env.example`. Valorile lipsă rămân `null`, iar interfața afișează placeholder-e polishate în loc de linkuri stricate.

## Estimator

Categoriile de proiect și capacitățile sunt în `src/data/container-options.ts`. Valorile actuale sunt provizorii:

- Mic: 3 m³
- Mediu: 5 m³
- Mare: 7 m³
- Șantier: 10 m³

## Asset-uri și shadcn

Logo-urile originale sunt păstrate în `logo/`. Copiile folosite la runtime sunt:

- `public/brand/greu-logo-dark-background.png`: pentru fundaluri închise
- `public/brand/greu-logo-light-background.png`: pentru fundaluri deschise

Proiectul folosește Tailwind CSS v3. Componentele shadcn sunt în `src/components/ui`, aliniate cu aliasul `@/components/ui`. O singură locație previzibilă ajută generatoarele shadcn, păstrează importurile consistente, evită primitive duplicate și permite adăugarea de componente viitoare fără rescrieri manuale de path-uri.
