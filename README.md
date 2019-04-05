# Project 2 @cmda-minor-web · 2018-2019

<kbd>![Website](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/cover.png "Website")</kbd>

## Samenvatting

Dit is een verzameling van alle bevindingen en informatie over de [CMD Amsterdam website](cmd-amsterdam.nl).  
Dit is een Wordpress website waar een aantal dingen aan verbeterd kunnen worden.  
Hier gebruik ik mijn kennis voor en alles wat ik heb geleerd in de afgelopen weken bij Browser Technologies en Performance Matters.

## Inhoud

1. [Installeren](#1-Installeren)
2. [Gebruik](#2-Gebruik)
3. [Oplossingen](#3-Oplossingen)
4. [TODO](#4-TODO)
5. [Conclusie](#Conclusie)

## 1. Installeren

Je kan deze repo forken, downloaden of clonen.  
Mijn advies is git te gebruiken in je favoritere cli en:  
`git clone https://github.com/DanielvandeVelde/web-app-from-scratch-18-19.git`  
in deze cli te plakken om de hele repository binnen te halen.  
Ga vervolgens in de map met `cd web-app-from-scratch-18-19`.  
Nu kan je alle benodigdheden om de server te draaien installeren met `npm install`.  
En de server starten met `node index.js`.  
Vervolgens staat deze live op je localhost.

## 2. Gebruik

Er zijn verschillende routes die allemaal iets demonstreren

### /samenwerken

Als eerste wordt de oude variant van de website geserveerd die hier op deze GitHub staat.  
Vervolgens doet deze een vraag aan de api voor een nieuwe variant schrijft deze vervolgens weg naar het index.html bestand om de volgende keer als er een aanvraag word gedaan op te leveren.
Dit is een van de API aangevraagd en vervolgens gestripte variant van [het samenwerken onderdeel van de website](https://www.cmd-amsterdam.nl/samenwerken/).

### /battery

Geeft een statische html pagina terug.  
Dit is mijn verbeterde variant van de [battery](https://www.cmd-amsterdam.nl/battery/) pagina van cmd-amsterdam.  
Hier heb ik echter de html van de website zelf opgebouwd.  
Deze route is voornamelijk gericht op accessibility en gedeeltelijk op performance.  
Maar daar valt meer over te lezen onder het volgende kopje oplossingen.

## 3. Oplossingen

Er zijn verschillende dingen die verbeterd kunnen worden. Dit waren een aantal dingen die mij opvielen.  
Na de eerste 'audit' te doen via Google Chrome viel er verschillende zaken op.

De audit in kwestie:  
<kbd>![Audit1](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/1.png "Audit 1")</kbd>
<kbd>![Audit2](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/2.png "Audit 2")</kbd>

Dat is dus een heleboel om uit te kiezen en te behandelen.  
Ik pak de grootste en voor mij de belangrijkste punten aan.

### 1. Text compressie

Op dit moment is er geen spraken van text compressie.  
Volgens de audit zou dit bijna 22s kunnen schelen voor het laden van de website.  
Er zijn meerdere manieren waarop dit verbeterd kan worden.  
Zo worden er meerdere varianten van dezelfde javascript ingeladen (JQuery en JQuery minified)  
Sommige Javascript wordt ook helemaal niet gebruikt (op bepaalde pagina's) wanneer dit uit word gezet is dat natuurlijk ook beter voor de performance.
Naast het minify'en en compressen van bijvoorbeeld [cmd-amsterdam.nl/samenwerken](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/WordpressSamenwerken.html) van 123kb naar de GZipped variant [Gzipped](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/WordpressSamenwerkenGZipped.html.gz) van 23kb dat is 100kb minder!

In het geval van mijn opdrachtgever raad ik hem een gzip plug-in aan zoals [Deze](https://nl.wordpress.org/plugins/check-and-enable-gzip-compression/)

### 2. Nog meer winst

Niet alleen zal compressie helpen maar Wordpress zelf zet gigantisch veel troep in de html.  
Met behulp van de WordPress api heb ik een request gedaan om de eerdergenoemde /samenwerken-pagina op te halen.  
Vervolgens heb ik hiervan alle onnodige elementen weggehaald, alle lege elementen verwijderd en zo veel mogelijk rommel weggehaald.  
Deze is [hier](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/NewIndex.html) te vinden.
Wanneer je daar meer compressie overheen zit dan is dat uiteindelijk een gzip bestand van 4kb!
Dat is uiteindelijk iets meer dan 97% kleiner dan waar we mee begonnen.  
Als we dat kunnen doen met elke html pagina dan scheelt dat ons enorm veel laden.
De Gzipped variant is overigens [hier](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/NewIndexGZipped.html.gz) te vinden.

### 3. Statisch

Je kan alles natuurlijk dynamisch ophalen en kleiner maken.  
Het is ook mogelijk om dit alvast weg te schrijven, zodat er enkel een index.html opgehaald hoeft te worden.  
Daarom heb ik een functie die direct de index.html aan de opvrager stuurt.
Op deze manier heb je een statische pagina die veel sneller doorgestuurd kan worden omdat alle calculaties pas na de aanvraag plaatsvinden.  
Zolang de pagina wordt herladen wanneer er wijzingen worden doorgevoerd blijft deze dus voor iedereen up-to-date.  
Maar dat is misschien nog iets waar ik een correcte oplossing voor moet verzinnen.

### 4. Afbeeldingen

Bepaalde afbeeldingen zijn meer dan een halve MB groot.
Met meer dan 5 afbeeldingen per pagina kom je dan snel op gigantische laadtijden. die makkelijk voorkomen kunnen worden.
Zo heb ik een aantal afbeeldingen in de accessibility demo al laten zien in een kleiner formaat. Een afbeelding van 1.29mb naar 240kb verkleind en svg bestanden die gelijk met de html meegestuurd worden om de laadtijd te verkleinen.

Het lazy-loading van images is overigens ook een goed idee. Op deze manier laden afbeeldingen pas wanneer deze het scherm bereiken. Een WordPress plug-in daarvoor is bijvoorbeeld [Hier](https://wordpress.org/plugins/a3-lazy-load/) te vinden.
In mijn demo heb ik helaas niet genoeg afbeeldingen om dit correct te laten zien.

### 5. Accessibility

De accessibility van de huidige website was matig.  
Hoewel er een aardig goede score uit de audit kwam zijn er een aantal grote problemen wat betreft de usability en accessibility van de website.

Ten eerste heeft de website een overvloed aan `<div> en <span>`-elementen. Nietszeggende elementen waar binnen de website alles in word gegooid. Voor sommige van deze elementen zou een `<section>, <p>` of ook maar ieder ander element beter zijn.
In de BATTERY demo-pagina show ik de website met het correcte gebruik van deze HTML-elementen.

Dit zorgt er ook voor dat elementen zich gaan gedragen zoals ze horen. De labels in het formulier gaan nu correct naar de invulvelden toe. Het heeft zelfs een legenda die voor een screenreader leest waar het formulier over gaat.  
Het e-mail invulveld eist ook een email omdat er nu een type=email op staat. Het telefoonnummer kan nu ook direct gebeld worden als je er op klikt door een `tel: href`.  
Er staan de juiste `<meta>` tags in voor de taal

Alle afbeeldingen die alt-tags nodig hadden hebben deze gekregen. Dit helpt enorm voor de screenreaders en als placeholder tekst in het geval dat de website de afbeeldingen niet laad.

Ook kan er momenteel niet door de website heen ge-tab'd worden. wanneer iemand de tab toets gebruikt kan de gebruiker niet zien waar hij of zij zich bevind op de website. Dit heb ik ook opgelost en gezorgd dat dit over de hele website correct is.  
De knoppen zijn dus goed zichtbaar, leesbaar en goed te bereiken met bijvoorbeeld enkel het toetsenbord.

Voor de css heb ik alleen de nodige css opnieuw geschreven voor de pagina. Hierbij heb ik goed opgelet dat er een zekere mate van gebruiksvriendelijkheid blijft maar dan met wat minder extra's. Ik mis bijvoorbeeld wel custom fonts, wat geen groot probleem is maar wel leuk is voor de website zelf.
Ik heb ook goed gelet op de leesbaarheid in bijvoorbeeld de hero-knop bovenaan de pagina. Alle knoppen hebben dezelfde styling gekregen en hebben daardoor ook dezelfde goede leesbaarheid.
De knop die daar eerst zat was namelijk absoluut niet goed te spotten of lezen.

### 6. Prioriteit

Er worden diverse javascript onderdelen ingeladen waar geen gebruik van word gemaakt.
Waaronder een slider, die gebruikt wordt om slechts een enkele afbeelding te tonen en verder geen sliderfunctionaliteiten vervult.
Ook is er een woocommerce plug-in. Er is dus een winkelmandje waar je dingen aan kan toevoegen.  
Die functionaliteit zit echter nergens in de website en is dus volledig overbodig.  
Verder kan er aan de prioriteit van de javascript gewerkt worden. Bepaalde dingen zijn onnodig om in te laden maar kunnen wel ingeladen worden als daar tijd voor is. Daar werkt `rel=preload` erg goed voor.  
Of natuurlijk alles opsplitsen, zelfde voor de kritieke css.

## 4. TODO

- [x] Gzip
- [x] HTML opschonen
- [x] Statisch aanleveren
- [x] Afbeeldingen minify + accessible
- [x] Semantische HTML
- [x] Screenreader-friendly
- [x] HTML attributen (type= en alt=)
- [x] Kleur contrasten
- [ ] Uit API opgeschoonde html vervangen met semantische html
- [ ] Javascript beter aanleveren

## 5. Conclusie

Er zijn een aantal dingen die ik kon verbeteren en ook heb verbeterd en heb uitgelegd hoe deze verbeterd kunnen worden. Waaronder de compressie van de bestanden op de website. Gzip maakt een gigantisch groot verschil.  
Het statisch aanleveren van de opgeschoonde html maakte ook een goed verschil in de performance. Ik kon er echter niet achter komen hoe ik de aanvraag uit de api kon veranderen met de juiste semantische html.  
Het kleiner maken van de afbeeldingen en/of deze vervangen door svg's werkte ook goed voor de performance van de website. Door alt-tags toe te voegen werd de accessibility hiervan juist beter.  
De semantische html variant toont aan dat er niet veel html of css nodig is om een uitstekende website neer te zetten met dezelfde functionaliteit.  
De overige accessibility aanpassingen zoals meta-tags, kleur, en attributen zorgde er voor dat de website een mooie 100 scoort op dit vlak.

<kbd>![Audit 3](https://github.com/DanielvandeVelde/project-2-1819/blob/master/github/3.png "Audit 3")</kbd>

De enige die ik niet op '100' kreeg was de Best Practices. Maar daar geef ik HTTP/2 de schuld van, en tevens ook een afbeelding die een bug veroorzaakt omdat hij 1pixel te klein is.

Al met al heb ik veel geleerd en een mooi resultaat neergezet. Het proof of concept staat al had ik er graag voor gezorgd dat dit allemaal als 1 website werkte maar durfde ik het niet aan om met de API verder te gaan.
