# Crowdfundingvergleichs-Plattform

## Thema der Arbeit
Angesichts der wachsenden Anzahl an Crowdfunding-Plattformen wird es zunehmend schwieriger, den Überblick zu bewahren und die passende Plattform für die eigenen Bedürfnisse zu finden. Eine Applikation, die den Suchenden mit einer Vergleichsanalyse hilft, könnte hilfreich sein, um den idealen Crowdfunding-Provider zu identifizieren. Diese Applikation ermöglicht es den Nutzern, ihre spezifischen Anforderungen an einen Crowdfunding-Anbieter anzugeben, um so, eine auf ihre Bedürfnisse zugeschnittene, Auswahl an Anbieter zu erhalten.

Mittels Front-End-Entwicklung wurde eine Web-Applikation umgesetzt, welche es den Benutzenden ermöglicht einen passenden Crowdfunding-Anbieter zu finden. Die Applikation wurde mit Next.js im Front-End und mit Supabase im Back-End realisiert. Die Kombination dieser Technologien bietet eine robuste Lösung, die eine reichhaltige und zeitgerechte Benutzererfahrung bietet.

Unter Vergleichsanalyse versteht man in diesem Kontext eine Nutzwertanalyse über verschiedenen Crowdfunding-Anbieter, welche in einer Datenbank gespeichert wurden. Dabei kann der Benutzer die Kriterien und dessen Gewichtung, wie bei einer Nutzwertanalyse üblich, selbst bestimmen. Für den Benutzer sind dann nach der Auswertung der Nutzwertanalyse, Scoring-Punkte zu jedem Anbieter ersichtlich. Diese Punkte repräsentieren die Gesamtbewertung der jeweiligen Plattformen, basierend auf ihren spezifischen Eigenschaften und der Übereinstimmung mit den Anforderungen des Nutzers und zeigt diesem wie gut eine Plattform für die individuelle Suche geeignet ist.


## Lokal ausführen
Um die Applikation lokal zum Laufen zu bringen müssen folgende Schritte ausgeführt werden.

1. ```git clone https://github.com/RobinMuehBFH/crowdfunding-comparison```
2. Download node.js (Version > 18)
3. ```npm install```
4. ```npm install jest``` -> Nur wenn die Tests ausgeführt werden sollen.
    1. ```npm test``` -> Um die Tests auszuführen
5. ```npm run dev```-> Das Projekt wird unter localhost:3000 erreichbar sein.
6. Da die Datenbank Credentials gegeben sein müssen, welche nicht in diesem Repository zu finden sind, kann man mich bei Interesse unter der folgenden Email-Adresse kontaktieren: robin.muehlemann@students.bfh.ch