import { Mail, MapPin, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site";
import { createTelHref } from "@/lib/contact-links";

type LegalPageType = "privacy" | "terms" | "imprint";

const pageDetails: Record<LegalPageType, { title: string; updatedAt: string }> = {
  privacy: { title: "Politica de confidențialitate", updatedAt: "27 august 2026" },
  terms: { title: "Termeni și condiții", updatedAt: "27 august 2026" },
  imprint: { title: "Date legale", updatedAt: "30 august 2026" },
};

const contactDetails = () => {
  const emailHref = siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Contact b.rent")}`
    : null;
  const phoneHref = createTelHref(siteConfig.contact.phoneE164);

  return (
    <div className="not-prose mt-5 grid gap-3 rounded-xl border border-black/10 bg-muted/50 p-5 text-sm">
      <p className="font-bold text-foreground">{siteConfig.legal.businessName}</p>
      {siteConfig.legal.fiscalCode ? <p>CUI: {siteConfig.legal.fiscalCode}</p> : null}
      {siteConfig.legal.registrationNumber ? (
        <p>Nr. Registrul Comerțului: {siteConfig.legal.registrationNumber}</p>
      ) : null}
      {phoneHref && siteConfig.contact.phoneDisplay ? (
        <a className="flex w-fit items-center gap-2 font-semibold hover:text-brand-green" href={phoneHref}>
          <PhoneCall className="h-4 w-4 text-brand-green" aria-hidden />
          {siteConfig.contact.phoneDisplay}
        </a>
      ) : null}
      {emailHref && siteConfig.contact.email ? (
        <a className="flex w-fit items-center gap-2 font-semibold hover:text-brand-green" href={emailHref}>
          <Mail className="h-4 w-4 text-brand-green" aria-hidden />
          {siteConfig.contact.email}
        </a>
      ) : null}
    </div>
  );
};

function PrivacyContent() {
  return (
    <>
      <p>
        Această politică explică modul în care b.rent prelucrează datele personale atunci când
        folosești site-ul, soliciți să fii contactat sau comunici cu noi prin telefon, e-mail ori WhatsApp.
      </p>

      <h2>1. Operatorul datelor</h2>
      <p>
        Operatorul datelor este entitatea care operează serviciul b.rent. Pentru întrebări despre
        confidențialitate sau exercitarea drepturilor, folosește datele de contact de mai jos.
      </p>
      {contactDetails()}

      <h2>2. Datele pe care le putem colecta</h2>
      <ul>
        <li>numele, numărul de telefon și localitatea introduse în formular;</li>
        <li>detalii despre proiect, capacitatea aleasă și conținutul mesajelor transmise;</li>
        <li>date tehnice și statistice despre utilizarea site-ului, numai cu acordul tău;</li>
        <li>preferința privind cookie-urile, stocată local în browser.</li>
      </ul>

      <h2>3. Scopuri și temeiuri</h2>
      <p>
        Folosim datele pentru a răspunde solicitărilor, a pregăti sau executa serviciile cerute, a
        comunica detaliile livrării și a proteja site-ul. Analiza opțională a traficului se bazează pe
        consimțământ, la fel ca măsurarea reclamelor prin Meta Pixel, și poate fi dezactivată oricând din „Preferințe cookie”.
      </p>

      <h2>4. Destinatari și transferuri</h2>
      <p>
        Datele pot fi accesate de furnizorii necesari pentru găzduire, formular și comunicații, în
        limita serviciilor prestate. Dacă accepți analiza, date tehnice pot fi transmise furnizorului
        de analiză configurat și către Meta Platforms Ireland Ltd., prin Meta Pixel, pentru măsurarea
        reclamelor. Nu vindem date personale. Orice transfer în afara Spațiului Economic
        European se face prin mecanismele legale oferite de furnizorul respectiv.
      </p>

      <h2>5. Durata păstrării</h2>
      <p>
        Păstrăm solicitările atât cât este necesar pentru răspuns și relația contractuală, de regulă
        cel mult 24 de luni, dacă obligațiile legale nu impun un termen diferit. Preferința cookie
        rămâne în browser până când o schimbi sau ștergi datele site-ului.
      </p>

      <h2>6. Drepturile tale</h2>
      <p>
        Poți solicita acces, rectificare, ștergere, restricționare, portabilitate sau opoziție și îți
        poți retrage consimțământul. Ai și dreptul de a depune o plângere la Autoritatea Națională de
        Supraveghere a Prelucrării Datelor cu Caracter Personal, prin{" "}
        <a href="https://www.dataprotection.ro/" target="_blank" rel="noreferrer">
          dataprotection.ro
        </a>
        .
      </p>

      <h2>7. Cookie-uri și analiză</h2>
      <p>
        Site-ul folosește stocare strict necesară pentru preferința de consimțământ. Instrumentele de
        analiză și Meta Pixel (care setează cookie-uri precum _fbp) sunt încărcate numai după acceptare. Poți reveni asupra alegerii din subsolul oricărei pagini.
      </p>

      <h2>8. Actualizări</h2>
      <p>Putem actualiza această politică atunci când serviciile sau cerințele legale se schimbă.</p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <p>
        Acești termeni stabilesc regulile de utilizare a site-ului b.rent și cadrul general pentru
        solicitarea serviciilor de închiriere, livrare și ridicare a containerelor.
      </p>

      <h2>1. Operator și contact</h2>
      <p>Datele operatorului și canalele prin care ne poți contacta sunt:</p>
      {contactDetails()}

      <h2>2. Rolul site-ului</h2>
      <p>
        Estimatorul și informațiile despre capacități sunt orientative. Trimiterea formularului sau a
        unui mesaj nu reprezintă automat confirmarea unei comenzi. Disponibilitatea, prețul, perioada,
        zona, tipul de deșeu și condițiile de acces se confirmă direct înainte de prestare.
      </p>

      <h2>3. Confirmarea serviciului</h2>
      <p>
        Serviciul este considerat confirmat numai după acceptarea expresă a detaliilor comunicate de
        ambele părți. Condițiile comerciale specifice confirmate pentru comandă prevalează asupra
        informațiilor generale din site.
      </p>

      <h2>4. Utilizarea containerului</h2>
      <p>
        Clientul trebuie să comunice corect tipul materialelor, să permită accesul în siguranță pentru
        livrare și ridicare și să respecte indicațiile primite privind încărcarea. Materialele
        periculoase, lichide sau alte categorii cu regim special nu pot fi depuse fără acceptare expresă.
      </p>

      <h2>5. Acces, amplasare și autorizații</h2>
      <p>
        Clientul răspunde pentru existența unui spațiu adecvat și, când este cazul, pentru acordurile
        sau autorizațiile necesare amplasării pe proprietate ori domeniul public. Orice limitare de
        acces trebuie comunicată înainte de confirmare.
      </p>

      <h2>6. Preț, plată, modificare și anulare</h2>
      <p>
        Prețul și modalitatea de plată sunt cele confirmate pentru fiecare comandă. Costurile generate
        de schimbarea condițiilor, acces imposibil, depășirea perioadei sau încărcarea neconformă se
        aplică numai dacă au fost comunicate și acceptate conform legii. Pentru modificare sau anulare,
        contactează-ne cât mai devreme.
      </p>

      <h2>7. Răspundere</h2>
      <p>
        Informațiile site-ului sunt oferite cu grijă, dar recomandarea automată nu înlocuiește
        confirmarea tehnică. Nicio prevedere nu limitează drepturile legale ale consumatorilor sau o
        răspundere care nu poate fi exclusă prin lege.
      </p>

      <h2>8. Proprietate intelectuală</h2>
      <p>
        Textele, elementele vizuale, marca și funcționalitățile site-ului nu pot fi copiate sau
        reutilizate comercial fără acord, cu excepția utilizărilor permise de lege.
      </p>

      <h2>9. Legea aplicabilă și reclamații</h2>
      <p>
        Se aplică legea română. Încercăm să rezolvăm amiabil orice neînțelegere. Consumatorii pot folosi
        și mecanismele ANPC de soluționare alternativă afișate în subsolul site-ului.
      </p>
    </>
  );
}

function ImprintContent() {
  const emailHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Contact b.rent")}`;

  const companyDetails = [
    { label: "Denumire legală", value: siteConfig.legal.businessName },
    { label: "Cod unic de înregistrare (CUI)", value: siteConfig.legal.fiscalCode },
    {
      label: "Nr. Registrul Comerțului — format istoric",
      value: siteConfig.legal.registrationNumber,
    },
    {
      label: "Nr. ONRC — format actual",
      value: siteConfig.legal.currentRegistrationNumber,
    },
    { label: "Identificator unic european (EUID)", value: siteConfig.legal.euid },
    { label: "Activitate principală", value: siteConfig.legal.primaryActivity },
  ];

  return (
    <>
      <p>
        Website-ul și marca b.rent sunt operate de {siteConfig.legal.businessName}, societate
        înregistrată în România. Mai jos găsești informațiile de identificare și contact ale
        operatorului.
      </p>

      <h2>Identificarea societății</h2>
      <dl className="not-prose mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        {companyDetails.map((detail) => (
          <div
            key={detail.label}
            className="grid gap-1 border-b border-black/10 px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6"
          >
            <dt className="text-sm font-bold text-muted-foreground">{detail.label}</dt>
            <dd className="break-words font-semibold text-foreground">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <h2>Sediu social și contact</h2>
      <div className="not-prose mt-5 grid gap-4 rounded-2xl bg-brand-black p-5 text-white sm:p-6">
        <address className="flex items-start gap-3 not-italic leading-7 text-white/80">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-green" aria-hidden />
          <span>
            <strong className="block text-white">Sediu social</strong>
            {siteConfig.legal.registeredOffice}
          </span>
        </address>
        <a
          className="flex w-fit items-center gap-3 font-semibold text-white hover:text-brand-green"
          href={emailHref}
        >
          <Mail className="h-5 w-5 text-brand-green" aria-hidden />
          {siteConfig.contact.email}
        </a>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {siteConfig.businessPhones.map((phone) => (
            <a
              key={phone.phoneE164}
              className="flex w-fit items-center gap-3 font-semibold text-white hover:text-brand-green"
              href={createTelHref(phone.phoneE164) ?? undefined}
            >
              <PhoneCall className="h-5 w-5 text-brand-green" aria-hidden />
              {phone.display}
            </a>
          ))}
        </div>
      </div>

      <h2>Informații despre website</h2>
      <p>
        Domeniul oficial este <a href={siteConfig.siteUrl}>{siteConfig.siteUrl}</a>. Pentru modul în
        care folosim datele personale, consultă <a href="/politica-de-confidentialitate/">politica de
        confidențialitate</a>. Regulile de utilizare și condițiile generale ale serviciului sunt
        descrise în <a href="/termeni-si-conditii/">termeni și condiții</a>.
      </p>

      <h2>Corectarea informațiilor</h2>
      <p>
        Datele societății au fost verificate la data ultimei actualizări. Dacă observi o neconcordanță,
        scrie-ne la <a href={emailHref}>{siteConfig.contact.email}</a> pentru a o putea corecta.
      </p>
    </>
  );
}

export function LegalPage({ type }: { type: LegalPageType }) {
  const { title, updatedAt } = pageDetails[type];

  return (
    <div className="bg-brand-offwhite py-12 sm:py-16">
      <article className="container">
        <div className="mx-auto max-w-3xl">
          <a className="text-sm font-bold text-brand-green hover:underline" href="/">
            ← Înapoi la pagina principală
          </a>
          <header className="mt-7 border-b border-black/10 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              Informații legale
            </p>
            <h1 className="mt-3 text-balance font-display text-5xl font-black uppercase leading-none sm:text-7xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">Ultima actualizare: {updatedAt}</p>
          </header>
          <div className="legal-copy mt-9 text-base leading-8 text-brand-charcoal">
            {type === "privacy" ? (
              <PrivacyContent />
            ) : type === "terms" ? (
              <TermsContent />
            ) : (
              <ImprintContent />
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
