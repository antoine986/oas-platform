import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const T = '#0F6E56';
const TL = '#E0F5EE';
const TM = '#1D9E75';
const TD = '#085041';
const CODE_USER = "OAS2025";
const CODE_ADMIN = "ADMIN-OAS";

const SCHEMAS = {
  1:`<svg width="100%" viewBox="0 0 540 192" role="img"><title>Architecture machine outbound</title><defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><text x="534" y="11" text-anchor="end" font-size="9" fill="#9CA3AF" font-style="italic">Clique sur un noeud pour poser une question</text><g class="on" data-q="Qu'est-ce que Clay fait concrètement dans un workflow outbound ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="200" y="64" width="140" height="60" rx="9" fill="#E0F5EE" stroke="#0F6E56" stroke-width="1.5"/><text x="270" y="89" text-anchor="middle" font-size="12" font-weight="700" fill="#085041">Clay</text><text x="270" y="106" text-anchor="middle" font-size="10" fill="#0F6E56">Moteur d'orchestration</text></g><g class="on" data-q="Quand utiliser Apollo plutôt que Sales Nav pour le sourcing ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="14" y="22" width="112" height="36" rx="7" fill="#EFF6FF" stroke="#185FA5" stroke-width="1"/><text x="70" y="44" text-anchor="middle" font-size="10" fill="#042C53">Sales Nav / Apollo</text></g><g class="on" data-q="Comment importer un CSV Apollo dans Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="14" y="72" width="112" height="36" rx="7" fill="#EFF6FF" stroke="#185FA5" stroke-width="1"/><text x="70" y="94" text-anchor="middle" font-size="10" fill="#185FA5">CSV importé</text></g><g class="on" data-q="Comment exporter la Blocklist depuis HubSpot et l'importer dans Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="14" y="122" width="112" height="36" rx="7" fill="#EFF6FF" stroke="#185FA5" stroke-width="1"/><text x="70" y="144" text-anchor="middle" font-size="10" fill="#185FA5">HubSpot / Blocklist</text></g><line x1="126" y1="40" x2="200" y2="83" stroke="#185FA5" stroke-width="1" marker-end="url(#ar)"/><line x1="126" y1="90" x2="200" y2="94" stroke="#185FA5" stroke-width="1" marker-end="url(#ar)"/><line x1="126" y1="140" x2="200" y2="108" stroke="#185FA5" stroke-width="1" marker-end="url(#ar)"/><g class="on" data-q="Comment connecter Heyreach ou Lemlist à Clay pour envoyer les leads ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="414" y="22" width="112" height="36" rx="7" fill="#ECFDF5" stroke="#059669" stroke-width="1"/><text x="470" y="44" text-anchor="middle" font-size="10" fill="#064E3B">Heyreach / Lemlist</text></g><g class="on" data-q="Comment pousser des données enrichies vers HubSpot depuis Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="414" y="72" width="112" height="36" rx="7" fill="#ECFDF5" stroke="#059669" stroke-width="1"/><text x="470" y="94" text-anchor="middle" font-size="10" fill="#059669">HubSpot enrichi</text></g><g class="on" data-q="Quel modèle IA choisir pour les icebreakers dans Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="414" y="122" width="112" height="36" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/><text x="470" y="144" text-anchor="middle" font-size="10" fill="#92400E">Icebreakers IA</text></g><line x1="340" y1="83" x2="414" y2="40" stroke="#0F6E56" stroke-width="1" marker-end="url(#ar)"/><line x1="340" y1="94" x2="414" y2="90" stroke="#0F6E56" stroke-width="1" marker-end="url(#ar)"/><line x1="340" y1="108" x2="414" y2="140" stroke="#0F6E56" stroke-width="1" marker-end="url(#ar)"/><g class="on" data-q="Comment configurer un Run if sur une colonne dans Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="150" y="162" width="240" height="24" rx="6" fill="#FEF2F2" stroke="#FCA5A5" stroke-width="0.5"/><text x="270" y="178" text-anchor="middle" font-size="10" fill="#991B1B">Aucune action sans condition Run if</text></g></svg>`,
  2:`<svg width="100%" viewBox="0 0 540 220" role="img"><title>ICP segmentation signaux</title><defs><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><text x="534" y="11" text-anchor="end" font-size="9" fill="#9CA3AF" font-style="italic">Clique sur un niveau pour en savoir plus</text><g class="on" data-q="Comment filtrer par taille et secteur dans Clay Find Companies ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="20" y="16" width="500" height="54" rx="10" fill="#EFF6FF" stroke="#185FA5" stroke-width="1.5"/><text x="270" y="38" text-anchor="middle" font-size="12" font-weight="700" fill="#042C53">Niveau 1 — Firmographique</text><text x="270" y="58" text-anchor="middle" font-size="10" fill="#185FA5">Taille · Secteur · Pays · Revenus · Type d'entreprise</text></g><line x1="270" y1="70" x2="270" y2="84" stroke="#9CA3AF" stroke-width="1.5" marker-end="url(#ar2)"/><g class="on" data-q="Comment détecter la stack technologique d'une entreprise dans Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="50" y="84" width="440" height="54" rx="10" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/><text x="270" y="106" text-anchor="middle" font-size="12" font-weight="700" fill="#3730A3">Niveau 2 — Comportemental</text><text x="270" y="126" text-anchor="middle" font-size="10" fill="#7C3AED">Stack technologique · Type de business · Canaux utilisés</text></g><line x1="270" y1="138" x2="270" y2="152" stroke="#9CA3AF" stroke-width="1.5" marker-end="url(#ar2)"/><g class="on" data-q="Quel signal de croissance prioriser pour une PME B2B et comment le sourcer dans Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="80" y="152" width="380" height="54" rx="10" fill="#E0F5EE" stroke="#0F6E56" stroke-width="2"/><text x="270" y="174" text-anchor="middle" font-size="12" font-weight="700" fill="#085041">Niveau 3 — Signal de croissance ★</text><text x="270" y="194" text-anchor="middle" font-size="10" fill="#0F6E56">Recrutement · Levée de fonds · Expansion · Nouveau décideur</text></g><text x="270" y="216" text-anchor="middle" font-size="10" fill="#D97706" font-weight="600">C'est lui qui fait vraiment la différence — il génère des réponses</text></svg>`,
  3:`<svg width="100%" viewBox="0 0 540 208" role="img"><title>Tables Clay TAM Blocklist Approved</title><defs><marker id="ar3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><text x="534" y="11" text-anchor="end" font-size="9" fill="#9CA3AF" font-style="italic">Clique sur un noeud pour en savoir plus</text><rect x="8" y="14" width="155" height="80" rx="9" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="1" stroke-dasharray="4 3"/><text x="85" y="30" text-anchor="middle" font-size="9" fill="#6B7280">Workbook séparé</text><g class="on" data-q="Qu'est-ce que la TAM Table et pourquoi la garder dans un workbook séparé ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="15" y="36" width="62" height="50" rx="6" fill="#E0F5EE" stroke="#0F6E56" stroke-width="1"/><text x="46" y="56" text-anchor="middle" font-size="10" font-weight="700" fill="#085041">TAM</text><text x="46" y="70" text-anchor="middle" font-size="9" fill="#0F6E56">entreprises</text><text x="46" y="82" text-anchor="middle" font-size="9" fill="#0F6E56">déjà travaillées</text></g><g class="on" data-q="Comment créer la Blocklist depuis HubSpot ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="83" y="36" width="72" height="50" rx="6" fill="#FEF2F2" stroke="#E24B4A" stroke-width="1"/><text x="119" y="56" text-anchor="middle" font-size="10" font-weight="700" fill="#991B1B">Blocklist</text><text x="119" y="70" text-anchor="middle" font-size="9" fill="#DC2626">clients</text><text x="119" y="82" text-anchor="middle" font-size="9" fill="#DC2626">existants</text></g><g class="on" data-q="Pourquoi le workbook sourcing doit être séparé du workbook TAM Blocklist ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="192" y="14" width="155" height="80" rx="9" fill="#EFF6FF" stroke="#185FA5" stroke-width="1"/><text x="269" y="32" text-anchor="middle" font-size="10" font-weight="700" fill="#042C53">Workbook Sourcing</text><text x="269" y="48" text-anchor="middle" font-size="9" fill="#185FA5">Find Companies ou CSV</text><text x="269" y="62" text-anchor="middle" font-size="9" fill="#185FA5">Normalize Domain</text><text x="269" y="76" text-anchor="middle" font-size="9" fill="#185FA5">Lookup TAM + Blocklist</text><text x="269" y="90" text-anchor="middle" font-size="9" fill="#0F6E56">Good Fit = Approved</text></g><line x1="163" y1="54" x2="192" y2="54" stroke="#6B7280" stroke-width="1" marker-end="url(#ar3)"/><g class="on" data-q="Comment configurer Send Data to Table vers Approved Companies ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="376" y="14" width="156" height="80" rx="9" fill="#FFFBEB" stroke="#D97706" stroke-width="1.5"/><text x="454" y="30" text-anchor="middle" font-size="10" font-weight="700" fill="#92400E">Approved Companies</text><text x="454" y="46" text-anchor="middle" font-size="9" fill="#B45309">Run if Good Fit = Approved</text><text x="454" y="60" text-anchor="middle" font-size="9" fill="#B45309">Find People</text><text x="454" y="74" text-anchor="middle" font-size="9" fill="#B45309">Enrichissement email</text><text x="454" y="88" text-anchor="middle" font-size="9" fill="#B45309">Agents IA</text></g><line x1="347" y1="54" x2="376" y2="54" stroke="#D97706" stroke-width="1.5" marker-end="url(#ar3)"/><g class="on" data-q="Comment pousser les leads vers Heyreach ou Lemlist depuis Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="192" y="136" width="155" height="44" rx="9" fill="#ECFDF5" stroke="#059669" stroke-width="1"/><text x="269" y="156" text-anchor="middle" font-size="10" font-weight="700" fill="#064E3B">Outreach</text><text x="269" y="171" text-anchor="middle" font-size="9" fill="#059669">Heyreach · Lemlist · Smartlead</text></g><line x1="454" y1="94" x2="454" y2="118" stroke="#D97706" stroke-width="1" stroke-dasharray="3 2"/><line x1="454" y1="118" x2="308" y2="136" stroke="#059669" stroke-width="1.5" marker-end="url(#ar3)"/><g class="on" data-q="Pourquoi ne jamais enrichir depuis la TAM ou la Blocklist directement ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="55" y="192" width="430" height="16" rx="5" fill="#FEF2F2" stroke="#FCA5A5" stroke-width="0.5"/><text x="270" y="204" text-anchor="middle" font-size="9" fill="#991B1B">Ne jamais enrichir depuis TAM/Blocklist — toujours depuis Approved Companies</text></g></svg>`,
  4:`<svg width="100%" viewBox="0 0 540 180" role="img"><title>Sourcing enrichissement waterfall</title><defs><marker id="ar4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><text x="534" y="11" text-anchor="end" font-size="9" fill="#9CA3AF" font-style="italic">Clique sur une étape pour en savoir plus</text><g class="on" data-q="Clay vs Apollo pour le sourcing, lequel choisir ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="5" y="18" width="96" height="76" rx="8" fill="#EFF6FF" stroke="#185FA5" stroke-width="1"/><text x="53" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="#042C53">Sourcing</text><text x="53" y="57" text-anchor="middle" font-size="9" fill="#185FA5">Clay / Apollo</text><text x="53" y="70" text-anchor="middle" font-size="9" fill="#185FA5">Sales Nav CSV</text></g><line x1="101" y1="56" x2="116" y2="56" stroke="#9CA3AF" stroke-width="1" marker-end="url(#ar4)"/><g class="on" data-q="Comment configurer le Lookup TAM et Blocklist et créer la colonne Good Fit ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="116" y="18" width="96" height="76" rx="8" fill="#E0F5EE" stroke="#0F6E56" stroke-width="1"/><text x="164" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="#085041">Qualify</text><text x="164" y="57" text-anchor="middle" font-size="9" fill="#0F6E56">TAM + Blocklist</text><text x="164" y="70" text-anchor="middle" font-size="9" fill="#0F6E56">Good Fit</text></g><line x1="212" y1="56" x2="227" y2="56" stroke="#9CA3AF" stroke-width="1" marker-end="url(#ar4)"/><g class="on" data-q="Comment configurer Find People avec les bons filtres de job title ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="227" y="18" width="96" height="76" rx="8" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1"/><text x="275" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="#3730A3">Find People</text><text x="275" y="57" text-anchor="middle" font-size="9" fill="#7C3AED">5 max / entrep.</text><text x="275" y="70" text-anchor="middle" font-size="9" fill="#7C3AED">Run if Approved</text></g><line x1="323" y1="56" x2="338" y2="56" stroke="#9CA3AF" stroke-width="1" marker-end="url(#ar4)"/><g class="on" data-q="Comment configurer la cascade email waterfall avec Full Enrich et Dropcontact ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="338" y="18" width="96" height="76" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/><text x="386" y="37" text-anchor="middle" font-size="10" font-weight="700" fill="#92400E">Email cascade</text><text x="386" y="53" text-anchor="middle" font-size="9" fill="#B45309">Full Enrich</text><text x="386" y="66" text-anchor="middle" font-size="9" fill="#B45309">Dropcontact</text><text x="386" y="79" text-anchor="middle" font-size="9" fill="#B45309">Enrichley valid.</text></g><line x1="434" y1="56" x2="449" y2="56" stroke="#9CA3AF" stroke-width="1" marker-end="url(#ar4)"/><g class="on" data-q="Comment pousser les leads qualifiés dans Heyreach depuis Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="449" y="18" width="86" height="76" rx="8" fill="#ECFDF5" stroke="#059669" stroke-width="1"/><text x="492" y="40" text-anchor="middle" font-size="11" font-weight="700" fill="#064E3B">Output</text><text x="492" y="57" text-anchor="middle" font-size="9" fill="#059669">Outreach</text><text x="492" y="70" text-anchor="middle" font-size="9" fill="#059669">prêt à lancer</text></g><g class="on" data-q="Comment ajouter un Run if sur une colonne Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="5" y="106" width="530" height="22" rx="6" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="0.5"/><text x="270" y="121" text-anchor="middle" font-size="10" fill="#374151">Chaque colonne a un Run if — enrichir sans condition = crédits perdus</text></g><g class="on" data-q="Full Enrich ou Dropcontact, lequel trouve plus d'emails ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="338" y="138" width="197" height="38" rx="7" fill="#FFFBEB" stroke="#D97706" stroke-width="0.5"/><text x="436" y="154" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Waterfall email</text><text x="436" y="170" text-anchor="middle" font-size="9" fill="#B45309">Full Enrich trouvé? stop. Sinon Dropcontact puis Enrichley</text></g></svg>`,
  5:`<svg width="100%" viewBox="0 0 540 196" role="img"><title>Copy outbound icebreaker</title><defs><marker id="ar5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><text x="534" y="11" text-anchor="end" font-size="9" fill="#9CA3AF" font-style="italic">Clique sur un élément pour en savoir plus</text><g class="on" data-q="Comment identifier le bon signal outbound pour mon client ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="8" y="18" width="130" height="72" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/><text x="73" y="38" text-anchor="middle" font-size="11" font-weight="700" fill="#92400E">Signal</text><text x="73" y="56" text-anchor="middle" font-size="9" fill="#B45309">Recrutement</text><text x="73" y="69" text-anchor="middle" font-size="9" fill="#B45309">Levée de fonds</text><text x="73" y="82" text-anchor="middle" font-size="9" fill="#B45309">Expansion · nouveau poste</text></g><line x1="138" y1="54" x2="162" y2="54" stroke="#9CA3AF" stroke-width="1" marker-end="url(#ar5)"/><rect x="162" y="10" width="200" height="102" rx="8" fill="#E0F5EE" stroke="#0F6E56" stroke-width="1.5"/><text x="262" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#085041">Structure du message</text><g class="on" data-q="Comment formuler une bonne observation dans un message outbound ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="172" y="36" width="180" height="20" rx="4" fill="#0F6E56"/><text x="262" y="50" text-anchor="middle" font-size="10" font-weight="600" fill="white">1. Observation</text></g><g class="on" data-q="Comment formuler une supposition prudente sans affirmer quelque chose de faux ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="172" y="60" width="180" height="20" rx="4" fill="#1D9E75"/><text x="262" y="74" text-anchor="middle" font-size="10" font-weight="600" fill="white">2. Supposition prudente</text></g><g class="on" data-q="Quels types de CTA fonctionnent le mieux en outbound B2B ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="172" y="84" width="180" height="20" rx="4" fill="#5DCAA5"/><text x="262" y="98" text-anchor="middle" font-size="10" font-weight="600" fill="#085041">3. Question ouverte</text></g><line x1="362" y1="54" x2="390" y2="30" stroke="#9CA3AF" stroke-width="1" marker-end="url(#ar5)"/><line x1="362" y1="74" x2="390" y2="86" stroke="#9CA3AF" stroke-width="1" marker-end="url(#ar5)"/><g class="on" data-q="Pourquoi ne jamais mettre de message dans la demande de connexion LinkedIn ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="390" y="10" width="145" height="44" rx="7" fill="#EFF6FF" stroke="#185FA5" stroke-width="1"/><text x="462" y="28" text-anchor="middle" font-size="10" font-weight="600" fill="#042C53">LinkedIn</text><text x="462" y="44" text-anchor="middle" font-size="9" fill="#185FA5">Connexion sans message</text></g><g class="on" data-q="Comment espacer les relances dans une séquence email outbound ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="390" y="64" width="145" height="44" rx="7" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1"/><text x="462" y="82" text-anchor="middle" font-size="10" font-weight="600" fill="#3730A3">Email</text><text x="462" y="98" text-anchor="middle" font-size="9" fill="#7C3AED">J0 · J3 · J7 · J14</text></g><g class="on" data-q="Que faire si je n'ai pas de signal exploitable sur une entreprise ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="8" y="120" width="524" height="32" rx="7" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="0.5"/><text x="270" y="134" text-anchor="middle" font-size="10" fill="#374151">Sans signal : icebreaker basé sur un enjeu sectoriel lié au poste</text><text x="270" y="148" text-anchor="middle" font-size="9" fill="#6B7280">Jamais de chiffres inventés · jamais de flatterie</text></g><g class="on" data-q="Comment configurer l'agent IA icebreaker dans Clay ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="162" y="160" width="200" height="30" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/><text x="262" y="178" text-anchor="middle" font-size="10" font-weight="600" fill="#92400E">Agent IA Clay</text><text x="262" y="188" text-anchor="middle" font-size="9" fill="#B45309">Run if Approved · test 5-10 lignes</text></g></svg>`,
  6:`<svg width="100%" viewBox="0 0 540 248" role="img"><title>Déploiement Is Outreach Ready</title><defs><marker id="ar6" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><text x="534" y="11" text-anchor="end" font-size="9" fill="#9CA3AF" font-style="italic">Clique sur une étape pour en savoir plus</text><g class="on" data-q="Comment structurer mon workflow Clay proprement avant de lancer ?" onclick="window.oasChat(this.getAttribute('data-q'))"><circle cx="48" cy="52" r="24" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="1"/><text x="48" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="#374151">1</text><text x="48" y="88" text-anchor="middle" font-size="9" font-weight="600" fill="#111827">Construire</text><text x="48" y="101" text-anchor="middle" font-size="8" fill="#6B7280">Run if partout</text></g><line x1="72" y1="52" x2="96" y2="52" stroke="#D1D5DB" stroke-width="1.5" marker-end="url(#ar6)"/><g class="on" data-q="Combien de lignes tester avant de lancer sur toute la base ?" onclick="window.oasChat(this.getAttribute('data-q'))"><circle cx="120" cy="52" r="24" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="1"/><text x="120" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="#374151">2</text><text x="120" y="88" text-anchor="middle" font-size="9" font-weight="600" fill="#111827">Tester 5-10</text><text x="120" y="101" text-anchor="middle" font-size="8" fill="#6B7280">Ligne par ligne</text></g><line x1="144" y1="52" x2="168" y2="52" stroke="#D1D5DB" stroke-width="1.5" marker-end="url(#ar6)"/><g class="on" data-q="Comment tester l'export vers Heyreach avant de lancer la campagne ?" onclick="window.oasChat(this.getAttribute('data-q'))"><circle cx="192" cy="52" r="24" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="1"/><text x="192" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="#374151">3</text><text x="192" y="88" text-anchor="middle" font-size="9" font-weight="600" fill="#111827">Tester export</text><text x="192" y="101" text-anchor="middle" font-size="8" fill="#6B7280">Heyreach · CRM</text></g><line x1="216" y1="52" x2="240" y2="52" stroke="#D1D5DB" stroke-width="1.5" marker-end="url(#ar6)"/><g class="on" data-q="Quelles sont les 6 conditions de la checklist Is Outreach Ready ?" onclick="window.oasChat(this.getAttribute('data-q'))"><circle cx="264" cy="52" r="24" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="1"/><text x="264" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="#374151">4</text><text x="264" y="88" text-anchor="middle" font-size="9" font-weight="600" fill="#111827">Checklist</text><text x="264" y="101" text-anchor="middle" font-size="8" fill="#6B7280">Is Outreach Ready</text></g><line x1="288" y1="52" x2="312" y2="52" stroke="#D1D5DB" stroke-width="1.5" marker-end="url(#ar6)"/><g class="on" data-q="Comment activer le Run on Schedule sans risquer de brûler des crédits ?" onclick="window.oasChat(this.getAttribute('data-q'))"><circle cx="336" cy="52" r="24" fill="#E0F5EE" stroke="#0F6E56" stroke-width="1.5"/><text x="336" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="#085041">5</text><text x="336" y="88" text-anchor="middle" font-size="9" font-weight="600" fill="#111827">Schedule</text><text x="336" y="101" text-anchor="middle" font-size="8" fill="#0F6E56">Weekly défaut</text></g><g class="on" data-q="Pourquoi ces 6 conditions sont-elles toutes obligatoires simultanément ?" onclick="window.oasChat(this.getAttribute('data-q'))"><rect x="50" y="116" width="440" height="122" rx="9" fill="#E0F5EE" stroke="#0F6E56" stroke-width="1.5"/><text x="270" y="138" text-anchor="middle" font-size="11" font-weight="700" fill="#085041">Is Outreach Ready = TRUE</text><text x="270" y="154" text-anchor="middle" font-size="10" fill="#0F6E56">si les 6 conditions sont vraies simultanément</text><text x="160" y="176" text-anchor="middle" font-size="10" fill="#0F6E56">Company Status = Approved</text><text x="160" y="194" text-anchor="middle" font-size="10" fill="#0F6E56">Work Email = VALID</text><text x="160" y="212" text-anchor="middle" font-size="10" fill="#0F6E56">LinkedIn URL exists</text><text x="390" y="176" text-anchor="middle" font-size="10" fill="#0F6E56">Lead Status = Approved</text><text x="390" y="194" text-anchor="middle" font-size="10" fill="#0F6E56">Job Title not empty</text><text x="390" y="212" text-anchor="middle" font-size="10" fill="#0F6E56">Not in Blocklist</text><line x1="270" y1="164" x2="270" y2="224" stroke="#A7F3D0" stroke-width="0.5" stroke-dasharray="3 2"/></g></svg>`,
};

const MODULES = [
  {id:1,num:"01",name:"Architecture machine",tag:"Fondations",dur:"1h30",color:"#7C3AED",colorLight:"#EDE9FE",
   title:"Architecture de la machine outbound",
   intro:"Comprendre pourquoi la majorité des équipes échouent et poser les bases d'un système fiable et opérable dans le temps.",
   steps:["Clay est le moteur d'orchestration — pas un outil d'enrichissement en masse","Les sources (Sales Nav, Apollo, CSV) alimentent Clay depuis l'extérieur","Clay orchestre : TAM, Blocklist, qualification, enrichissement, agents IA","Les sorties : Heyreach, Lemlist/Smartlead (email), HubSpot","Aucune action ne s'exécute sans condition Run if — c'est la règle absolue"],
   rules:[{n:"01",r:"Clay est un moteur d'orchestration, pas un outil d'enrichissement en masse. La distinction est fondamentale."},{n:"02",r:"Aucune action ne s'exécute sans condition Run if. Enrichir sans condition = crédits perdus à chaque run."},{n:"03",r:"Un workflow Clay se construit dans cet ordre strict : manuel → testé → validé → automatisé."}],
   concepts:[{t:"Mental model fondamental",b:"Clay = moteur · Conditions = cerveau · Outreach = sortie. Le problème n'est jamais le copywriting en premier — c'est l'absence de machine opérable dans le temps."},{t:"Les 4 tables fondamentales",b:"TAM (workbook séparé) → Blocklist (workbook séparé) → Approved Companies → Outreach Output. Règle absolue : 1 table = 1 fonction."},{t:"Pourquoi pas Apollo seul ?",b:"Apollo source du volume. Clay orchestre, qualifie et automatise. Workflow recommandé : sourcer sur Apollo → exporter CSV → tout travailler dans Clay."}],
   qq:["C'est quoi un Run if ?","Clay vs Apollo ?","Pourquoi 1 table = 1 fonction ?"]},
  {id:2,num:"02",name:"ICP & signaux",tag:"Ciblage",dur:"1h30",color:"#2563EB",colorLight:"#EFF6FF",
   title:"ICP, segmentation & signaux exploitables",
   intro:"Définir un ICP directement filtrable dans Clay et identifier les signaux qui génèrent vraiment des réponses.",
   steps:["Niveau 1 firmographique : taille, secteur, pays, CA — les filtres de base","Niveau 2 comportemental : stack techno, type de business, canaux utilisés","Niveau 3 signal de croissance : recrutement, levée de fonds, expansion, nouveau décideur","Traduire l'ICP en filtres Clay natifs (Find Companies ou filtres Find People)","Tester le volume généré avec les critères avant de sourcer en production"],
   rules:[{n:"01",r:"L'ICP doit être filtrable dans Clay, pas seulement lisible dans un deck stratégique."},{n:"02",r:"On segmente par signal d'abord, puis par secteur. Le signal fait la différence sur les taux de réponse."},{n:"03",r:"Qualify before enrich : on n'enrichit jamais avant d'avoir validé la qualification de l'entreprise."}],
   concepts:[{t:"Les 4 signaux principaux",b:"Recrutement actif sur un poste cible · Levée de fonds récente · Expansion géographique (nouvelles agences, nouveaux marchés) · Changement de leadership récent. Plus le signal est précis et récent, plus l'icebreaker est percutant."},{t:"Comment sourcer un signal dans Clay",b:"Recrutement : Find People → filtre 'Maximum months in current role'. Levée de fonds : enrichissement natif 'Funding Signal'. Expansion : agent IA avec scraping web du domaine entreprise."},{t:"ICP actionnable vs théorique",b:"Si tu ne peux pas le filtrer dans Clay ou Sales Nav, c'est un ICP théorique, pas opérationnel. Test simple : est-ce que ce critère existe dans les filtres Clay Find Companies ?"}],
   qq:["Comment détecter un signal dans Clay ?","Combien de segments au démarrage ?","URL Sales Nav dans Clay ?"]},
  {id:3,num:"03",name:"Tables Clay & data",tag:"Structure",dur:"2h",color:"#0891B2",colorLight:"#ECFEFF",
   title:"Architecture des tables Clay",
   intro:"La base de ta machine. Si l'architecture n'est pas propre au départ, tout le reste sera fragile.",
   steps:["Créer un workbook séparé pour TAM + Blocklist (jamais de sourcing depuis ce workbook)","Exporter la Blocklist depuis HubSpot : filtre 'First Deal Created Date is Known'","Dans le workbook Sourcing : Add Enrichment → Normalize Domain → Remove Prefixes","Configurer Lookup Single Row in Other Table → TAM, puis → Blocklist (clé = domaine normalisé)","Créer colonne Good Fit : return 'Approved' if les deux lookups n'ont pas trouvé de record","Send Data to Table → table Approved Companies (Run if Good Fit = 'Approved')"],
   rules:[{n:"01",r:"TAM et Blocklist vivent dans un workbook séparé. On ne source et n'enrichit JAMAIS depuis ce workbook."},{n:"02",r:"Le domaine normalisé est la clé d'identification. Sans Normalize Domain, les lookups TAM et Blocklist ne matchent pas."},{n:"03",r:"Aucune entreprise n'est enrichie sans avoir passé le filtre TAM + Blocklist. Sinon tu dépenses des crédits pour rien."}],
   concepts:[{t:"La TAM — ce que c'est vraiment",b:"Pas ton marché adressable global. C'est la table des entreprises sur lesquelles tu as DÉJÀ travaillé — sourcées, enrichies, prospectées. Une entreprise entre une seule fois, n'est jamais supprimée."},{t:"Normalize Domain — action native Clay",b:"Add Enrichment → Normalize Domain → Remove Prefixes. Enlève www., https://. IMPORTANT : garder les suffixes .com/.fr — nécessaires pour matcher avec le CRM. Pas de formule LOWER/SUBSTITUTE."},{t:"Colonne Good Fit",b:"Synthétise les deux lookups en une seule condition réutilisable. Évite de répéter des conditions complexes dans chaque Run if du workflow en aval."}],
   qq:["Comment normaliser un domaine ?","TAM Company vs TAM People ?","Export HubSpot pour Blocklist ?"]},
  {id:4,num:"04",name:"Sourcing & enrichissement",tag:"Data Ops",dur:"2h30",color:"#D97706",colorLight:"#FFFBEB",
   title:"Sourcing & enrichissement maîtrisés",
   intro:"Sourcer les bonnes entreprises, trouver les bons contacts, enrichir uniquement ce qui est qualifié.",
   steps:["Sourcer depuis Clay natif (Find Companies), URL Sales Nav, ou CSV Apollo","Lookup TAM + Blocklist → colonne Good Fit = 'Approved'","Find People (version gratuite) depuis Approved Companies uniquement — 5 contacts max par entreprise","Filtres job title : 'similar to' pour le volume, 'is exactly' pour la précision","Cascade email : Full Enrich en premier → Dropcontact fallback → Enrichley validation","Run if partout — Save and Run sur 5-10 lignes avant de lancer sur toute la base"],
   rules:[{n:"01",r:"Aucun contact n'est sourcé si l'entreprise n'a pas passé le filtre TAM + Blocklist. Find People uniquement depuis Approved Companies."},{n:"02",r:"Toujours Save and Run sur 5-10 lignes. Un modèle à 3 crédits × 5000 lignes = 15 000 crédits perdus si le prompt est mauvais."},{n:"03",r:"La cascade email s'arrête dès qu'un email valide est trouvé — c'est ça le waterfall. Tu ne paies que pour les résultats."}],
   concepts:[{t:"Clay vs Apollo vs Sales Navigator",b:"Clay : data à jour, moins de volume. Apollo : plus de volume, data parfois moins fraîche. Sales Nav : coller l'URL de recherche dans Clay (Find Companies → Company Identifiers). Workflow optimal : sourcer Apollo/Sales Nav → exporter CSV → tout travailler dans Clay."},{t:"Find People — les bons filtres",b:"Job Title 'similar to' = volume avec quelques déchets. 'is exactly' = précision mais moins de résultats. Maximum months in current role = signal recrutement récent. Toujours 5 contacts max par entreprise."},{t:"Cascade email waterfall",b:"Add Enrichment → Find Work Email → Full Configuration → Waterfall Sequence. Full Enrich en 1er, Dropcontact en fallback. Enrichley pour la validation. Activer 'Require validation success'. Run if : Good Fit = Approved."}],
   qq:["Comment importer une URL Sales Nav ?","Pourquoi 5 contacts max par entreprise ?","Full Enrich vs Dropcontact ?"]},
  {id:5,num:"05",name:"Copy & icebreakers",tag:"Messaging",dur:"2h",color:"#BE185D",colorLight:"#FDF2F8",
   title:"Copy outbound & séquences multicanales",
   intro:"Un bon message outbound ne vend pas. Il ouvre une conversation. La personnalisation utile repose sur un signal réel.",
   steps:["Identifier le signal disponible (recrutement, levée, expansion) — ou l'enjeu sectoriel si aucun signal","Définir le persona (CEO, DRH, DSI, Ops) et le canal (LinkedIn ou email)","Structurer le message : Observation → Supposition prudente → Question ouverte","Configurer l'agent IA dans Clay avec le contexte client et les directives de formatage","Tester sur 5-10 lignes et faire valider le ton par le client avant de lancer","Run if : Good Fit = Approved uniquement — ne jamais enrichir toute la base d'un coup"],
   rules:[{n:"01",r:"L'icebreaker ne s'utilise que si tu as un signal exploitable réel. Sans signal : enjeu sectoriel universel. Jamais de chiffres inventés."},{n:"02",r:"L'agent IA ne génère des icebreakers que sur les entreprises approuvées. Run if : Good Fit = Approved."},{n:"03",r:"Clay réécrit le prompt automatiquement — toujours lire la version réécrite avant de lancer. Tester plusieurs modèles sur le même échantillon."}],
   concepts:[{t:"Personnalisation utile vs cosmétique",b:"Cosmétique : prénom, logo, poste, secteur générique. Utile : signal réel et récent — recrutement actif, expansion, levée de fonds, changement de leadership. La personnalisation utile montre que tu as fait des recherches sur cette entreprise spécifiquement."},{t:"Configurer l'agent IA icebreaker",b:"Donner le contexte client, le persona, la structure obligatoire du message et le formatage (une phrase par paragraphe, ligne vide entre chaque). Les modèles évoluent vite — tester sur 5-10 lignes, c'est la seule vraie référence."},{t:"Séquences multicanales",b:"LinkedIn : jamais de message dans la demande de connexion — ça grille la relation. Attendre l'acceptation, envoyer l'icebreaker après. Email : sous-domaines dédiés + warm-up obligatoire. Espacement : J0 · J3 · J7 · J14."}],
   qq:["Comment rédiger un prompt icebreaker ?","Quel modèle IA choisir ?","Connexion LinkedIn sans message ?"]},
  {id:6,num:"06",name:"Déploiement & prod",tag:"Ops",dur:"2h",color:"#059669",colorLight:"#ECFDF5",
   title:"Déploiement, validation & mise en production",
   intro:"Mettre en production un système sécurisé. Tester, valider, activer le schedule sans exposer de clients ni brûler de crédits.",
   steps:["Construire le workflow manuellement — Run if sur chaque colonne sans exception","Tester sur 5-10 lignes : domaines normalisés, blocklist active, enrichissements conditionnés","Tester l'export vers Heyreach / CRM : vérifier le mapping des champs et variables","Valider la checklist Is Outreach Ready (les 6 conditions doivent être vraies simultanément)","Activer Run on Schedule (Weekly par défaut) UNIQUEMENT après validation complète","Activer Auto-Update colonne par colonne — jamais en masse avant validation du workflow entier"],
   rules:[{n:"01",r:"Run on Schedule ne s'active JAMAIS sur un workflow non validé. Une erreur non détectée se répète à l'infini et consomme des crédits."},{n:"02",r:"Tester sur 5-10 lignes maximum avant tout déploiement. L'auto-update amplifie les erreurs — il ne les corrige pas."},{n:"03",r:"Aucun export sans Is Outreach Ready = TRUE. Les 6 conditions doivent être vraies simultanément."}],
   concepts:[{t:"Is Outreach Ready — les 6 conditions",b:"Company Status = Approved · Lead Status = Approved · Work Email = VALID · Job Title not empty · LinkedIn URL exists · Not in Blocklist. Si une seule condition est fausse, le lead ne part pas en campagne."},{t:"Ordre strict de mise en production",b:"Manuel → test 5-10 lignes → test export → validation checklist → activation schedule. Jamais l'inverse. Chaque étape protège la suivante contre les erreurs en cascade."},{t:"Fréquences recommandées",b:"Weekly par défaut — suffisant pour la plupart des cas. Daily uniquement si volume maîtrisé et workflow parfaitement validé. L'auto-update s'active colonne par colonne — jamais en masse."}],
   qq:["Fréquence recommandée pour le schedule ?","Quand activer l'auto-update ?","Comment monitorer le workflow ?"]},
];

const sg = k => { try { const v = typeof window!=='undefined'?localStorage.getItem(k):null; return v?JSON.parse(v):null; } catch(e){ return null; } };
const ss = (k,v) => { try { if(typeof window!=='undefined') localStorage.setItem(k,JSON.stringify(v)); } catch(e){} };

export default function OASPlatform() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [prog, setProg] = useState({});
  const [modId, setModId] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState('');
  const [typing, setTyping] = useState(false);
  const [tab, setTab] = useState('schema');
  const [copied, setCopied] = useState(false);
  const endRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs, typing]);

  useEffect(() => {
    window.oasChat = q => { setTab('schema'); chat(q); };
    return () => { delete window.oasChat; };
  });

  const SYSTEM = `Tu es le tuteur expert de la formation "Outbound Automation System" créée par Antoine Beliaeff (Rerow), agence GTM & Outbound. Tu formes des PME B2B françaises — principalement des SaaS, cabinets d'experts et équipes commerciales restreintes (1 à 5 personnes).

RÈGLES : Réponds en français · 3-5 phrases max · Opérationnel et direct · Donne l'action Clay exacte quand c'est technique · Si tu n'es pas sûr, dis-le

STACK RECOMMANDÉE : Clay = seul élément fixe. Sourcing : Clay natif (qualité) + Apollo (volume) + Sales Nav (URL à importer). Email waterfall : Full Enrich → Dropcontact · Validation : Enrichley. LinkedIn : Heyreach. Email outreach : Lemlist ou Smartlead selon le client. CRM : HubSpot.

ARCHITECTURE (4 tables) :
1. TAM Table (workbook séparé) = entreprises DÉJÀ travaillées — pas le marché adressable global
2. Blocklist (workbook séparé) = clients depuis HubSpot (filtre : First Deal Created Date is Known)
3. Workbook Sourcing (1 par client/segment) = sourcing + lookups + Good Fit
4. Approved Companies → Find People → enrichissement → agents IA → outreach

ACTIONS CLAY PRÉCISES :
- Normalize Domain : Add Enrichment → Normalize Domain → Remove Prefixes (PAS de formule LOWER/SUBSTITUTE)
- Lookup : Add Action → Lookup Single Row in Other Table → clé = domaine normalisé
- Good Fit : formula "return 'Approved' if [Dedup Blocklist] has found no record AND [Lookup TAM] has found no record"
- Find People : version gratuite · 5 contacts max/entreprise · Run if Lead Status = Approved
- Cascade email : Full Configuration → Waterfall → Full Enrich → Dropcontact → Enrichley validation

MODÈLES IA : Ils évoluent très vite — toujours tester sur 5-10 lignes avant de choisir. Le testing est la seule vraie référence. À titre indicatif : Gemini souvent plus naturel pour les icebreakers, Claude pour l'analyse/scoring, GPT Mini pour les tâches simples.

CRÉDITS : Save and Run sur 5-10 lignes avant de lancer. 3 crédits × 5000 lignes = 15 000 crédits. Enrichir sans Run if = crédits perdus. Schedule uniquement après validation complète.

ICEBREAKER : Le tuteur pose des questions sur le secteur, le persona, le canal et le signal disponible AVANT de recommander une structure. Il adapte sa recommandation à chaque cas spécifique. Principes invariables : Observation → Supposition prudente → Question ouverte. Jamais de chiffres inventés, jamais de flatterie, jamais de vente directe au premier contact.`;

  const login = () => {
    const em = email.trim().toLowerCase(), cd = code.trim();
    if(!em||!cd){ setErr('Remplis tous les champs.'); return; }
    setLoading(true); setErr('');
    setTimeout(() => {
      if(cd===CODE_ADMIN){ setUser({email:em,admin:true}); setView('admin'); setLoading(false); return; }
      const extra = sg('oas:codes')||[];
      if(cd!==CODE_USER&&!extra.includes(cd)){ setErr("Code invalide. Contacte Antoine pour obtenir ton accès."); setLoading(false); return; }
      const p = sg(`oas:prog:${em}`)||{};
      setProg(p);
      const users = sg('oas:users')||[];
      if(!users.includes(em)) ss('oas:users',[...users,em]);
      setUser({email:em,admin:false}); setView('dash'); setLoading(false);
    },500);
  };

  const openMod = id => {
    setModId(id); setTab('schema');
    const m = MODULES.find(x=>x.id===id);
    const saved = sg(`oas:msgs:${user.email}:${id}`)||[];
    setMsgs(saved.length?saved:[{role:'ai',content:`Bienvenue dans le Module ${m.num} — ${m.name}. Je suis ton tuteur. Pose-moi une question ou utilise les suggestions rapides ci-dessous.`}]);
    setView('mod');
  };

  const markDone = () => {
    const np = {...prog,[modId]:{done:true,at:new Date().toISOString(),q:msgs.filter(m=>m.role==='user').length}};
    setProg(np); ss(`oas:prog:${user.email}`,np); setView('dash');
  };

  const chat = async t => {
    const text = t||inp.trim();
    if(!text||typing) return;
    setInp('');
    if(taRef.current) taRef.current.style.height='36px';
    const m = MODULES.find(x=>x.id===modId);
    const nm = [...msgs,{role:'user',content:text}];
    setMsgs(nm); setTyping(true);
    try {
      const r = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:600,
          system:`${SYSTEM}\n\nModule en cours : ${m.num} — ${m.name}. Contexte : ${m.intro}`,
          messages:nm.slice(-8).map(x=>({role:x.role==='user'?'user':'assistant',content:x.content}))
        })
      });
      const d = await r.json();
      const rep = d.content?.[0]?.text||"Connexion temporairement indisponible.";
      const fm = [...nm,{role:'ai',content:rep}];
      setMsgs(fm); ss(`oas:msgs:${user.email}:${modId}`,fm.slice(-20));
    } catch(e){ setMsgs([...nm,{role:'ai',content:"Erreur réseau. Réessaie dans un instant."}]); }
    setTyping(false);
  };

  const exportReport = () => {
    const done = MODULES.filter(m=>prog[m.id]?.done);
    const date = new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
    const next = MODULES.find(m=>!prog[m.id]?.done);
    const lines = ['══════════════════════════════════════════════════════','  RAPPORT DE FORMATION — OUTBOUND AUTOMATION SYSTEM','══════════════════════════════════════════════════════','',
      `  Apprenant  : ${user.email}`,`  Date       : ${date}`,`  Progression: ${done.length}/${MODULES.length} modules (${Math.round(done.length/MODULES.length*100)}%)`,
      '','──────────────────────────────────────────────────────','  DÉTAIL PAR MODULE','──────────────────────────────────────────────────────','',
      ...MODULES.map(m=>{const p=prog[m.id];return p?.done?`  ✓  Module ${m.num} — ${m.name}\n     Complété le ${new Date(p.at).toLocaleDateString('fr-FR')} · ${p.q||0} question(s)`:`  ○  Module ${m.num} — ${m.name}\n     Non complété`;}),
      '','──────────────────────────────────────────────────────',
      next?`  → Prochaine étape : Module ${next.num} — ${next.name}`:'  → Formation complétée. Félicitations !',
      '','══════════════════════════════════════════════════════','  Formation dispensée par Antoine Beliaeff','  GTM & Outbound Expert · linkedin.com/in/antoine-beliaeff-8038b8196','══════════════════════════════════════════════════════',
    ].join('\n');
    const blob = new Blob([lines],{type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'),{href:url,download:`OAS_${user.email.split('@')[0]}_${new Date().toISOString().split('T')[0]}.txt`});
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const genCode = () => {
    const c = 'OAS-'+Math.random().toString(36).substring(2,7).toUpperCase();
    ss('oas:codes',[...(sg('oas:codes')||[]),c]);
    navigator.clipboard?.writeText(c).catch(()=>{});
    setCopied(c); setTimeout(()=>setCopied(false),4000);
  };

  const logout = () => { setView('login'); setUser(null); setProg({}); setEmail(''); setCode(''); };

  const doneCount = MODULES.filter(m=>prog[m.id]?.done).length;
  const pct = Math.round(doneCount/MODULES.length*100);
  const curMod = MODULES.find(m=>m.id===modId);

  const btn = (bg,col,extra) => ({padding:'9px 18px',borderRadius:9,background:bg,color:col||'white',border:'none',cursor:'pointer',fontSize:14,fontWeight:600,...extra});
  const tag = (bg,col) => ({fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:bg,color:col,letterSpacing:'.02em'});

  if(view==='login') return (
    <>
      <Head><title>OAS — Connexion</title></Head>
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24,background:'#F4F6F5'}}>
        <div style={{width:'100%',maxWidth:400}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:32}}>
            <div style={{width:36,height:36,borderRadius:10,background:T,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'white'}}>OA</div>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:'#111827'}}>Outbound Automation System</div>
              <div style={{fontSize:12,color:'#6B7280',marginTop:1}}>Par Antoine Beliaeff · GTM & Outbound Expert</div>
            </div>
          </div>
          <div style={{background:'white',borderRadius:14,border:'1px solid #E5E7EB',padding:32,boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
            <div style={{fontSize:22,fontWeight:800,color:'#111827',marginBottom:6,letterSpacing:'-0.5px'}}>Accède à ta formation</div>
            <div style={{fontSize:14,color:'#6B7280',marginBottom:26,lineHeight:1.5}}>Entre ton email et ton code d'accès.</div>
            {[{label:'Adresse email',value:email,set:setEmail,ph:'ton@email.com',type:'email'},{label:"Code d'accès",value:code,set:setCode,ph:'••••••••',type:'password'}].map(f=>(
              <div key={f.label} style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>{f.label}</label>
                <input value={f.value} onChange={e=>f.set(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} placeholder={f.ph} type={f.type}
                  style={{width:'100%',border:'1.5px solid #E5E7EB',borderRadius:9,padding:'10px 13px',fontSize:14,outline:'none',boxSizing:'border-box',color:'#111827',background:'#FAFAFA'}}
                  onFocus={e=>e.target.style.borderColor=T} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>
              </div>
            ))}
            {err && <div style={{fontSize:13,color:'#DC2626',background:'#FEF2F2',padding:'9px 13px',borderRadius:8,marginBottom:16,fontWeight:500}}>{err}</div>}
            <button onClick={login} disabled={loading} style={btn(loading?'#9CA3AF':T,'white',{width:'100%',padding:13,fontSize:15,marginTop:4})}>{loading?'Connexion...':'Accéder à la formation →'}</button>
          </div>
          <div style={{textAlign:'center',marginTop:18,fontSize:13,color:'#9CA3AF'}}>
            Pas encore de code ?{' '}<a href="https://www.linkedin.com/in/antoine-beliaeff-8038b8196/" target="_blank" rel="noreferrer" style={{color:T,textDecoration:'none',fontWeight:600}}>Contacte Antoine</a>
          </div>
        </div>
      </div>
    </>
  );

  if(view==='admin') return (
    <>
      <Head><title>OAS — Admin</title></Head>
      <div style={{minHeight:'100vh',background:'#F4F6F5'}}>
        <div style={{background:'white',borderBottom:'1px solid #E5E7EB',padding:'13px 28px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:30,height:30,borderRadius:8,background:T,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white'}}>OA</div>
            <span style={{fontSize:15,fontWeight:700}}>OAS Platform</span>
            <span style={tag(TL,T)}>Admin</span>
          </div>
          <button onClick={logout} style={btn('white','#6B7280',{border:'1px solid #E5E7EB',fontSize:13,padding:'6px 14px'})}>Déconnexion</button>
        </div>
        <div style={{maxWidth:720,margin:'0 auto',padding:28}}>
          <div style={{background:'white',borderRadius:12,border:'1px solid #E5E7EB',padding:24,marginBottom:18}}>
            <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Générer un code d'accès</div>
            <div style={{fontSize:13,color:'#6B7280',marginBottom:18,lineHeight:1.6}}>Code par défaut : <code style={{background:TL,color:T,padding:'2px 7px',borderRadius:5,fontWeight:700}}>OAS2025</code></div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <button onClick={genCode} style={btn(T)}>+ Générer un code</button>
              {copied && <><code style={{padding:'7px 14px',borderRadius:8,background:TL,color:T,fontSize:16,fontWeight:800,letterSpacing:'.05em'}}>{copied}</code><span style={{fontSize:13,color:TM,fontWeight:600}}>✓ Copié !</span></>}
            </div>
          </div>
          <div style={{background:'white',borderRadius:12,border:'1px solid #E5E7EB',padding:24}}>
            <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>Suivi apprenants</div>
            <div style={{fontSize:13,color:'#6B7280',lineHeight:1.7,background:'#F9FAFB',padding:'14px 18px',borderRadius:10,border:'1px solid #E5E7EB'}}>
              Demande à tes apprenants d'utiliser <strong>↓ Exporter mon rapport</strong> et de t'envoyer le fichier par email.<br/>
              Le suivi centralisé temps réel sera disponible après l'intégration de Supabase.
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if(view==='dash') return (
    <>
      <Head><title>OAS — Dashboard</title></Head>
      <div style={{minHeight:'100vh',background:'#F4F6F5'}}>
        <div style={{background:'white',borderBottom:'1px solid #E5E7EB',padding:'13px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:30,height:30,borderRadius:8,background:T,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white'}}>OA</div>
            <span style={{fontSize:15,fontWeight:700,color:'#111827',letterSpacing:'-0.3px'}}>Outbound Automation System</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <button onClick={exportReport} style={btn('white','#374151',{border:'1px solid #E5E7EB',fontSize:13,padding:'7px 14px'})}>↓ Exporter mon rapport</button>
            <div style={{height:18,width:1,background:'#E5E7EB'}}/>
            <span style={{fontSize:13,color:'#9CA3AF'}}>{user?.email}</span>
            <button onClick={logout} style={{fontSize:12,color:'#9CA3AF',background:'none',border:'none',cursor:'pointer',padding:'4px 8px'}}>Déco</button>
          </div>
        </div>
        <div style={{maxWidth:820,margin:'0 auto',padding:'28px 24px'}}>
          <div style={{background:`linear-gradient(135deg,${TD},${T},${TM})`,borderRadius:18,padding:'26px 32px',marginBottom:26,color:'white',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-30,right:-30,width:180,height:180,borderRadius:'50%',background:'rgba(255,255,255,0.05)'}}/>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:16,position:'relative'}}>
              <div>
                <div style={{fontSize:13,opacity:.75,marginBottom:5,fontWeight:500}}>Ta progression globale</div>
                <div style={{fontSize:28,fontWeight:800,letterSpacing:'-0.5px'}}>{doneCount}/{MODULES.length} modules complétés</div>
                {doneCount===0&&<div style={{fontSize:13,opacity:.7,marginTop:8}}>Commence par le Module 01 →</div>}
              </div>
              <div style={{fontSize:48,fontWeight:800,opacity:.85,letterSpacing:'-2px'}}>{pct}%</div>
            </div>
            <div style={{width:'100%',background:'rgba(255,255,255,0.2)',borderRadius:6,height:8}}>
              <div style={{height:8,borderRadius:6,background:'white',width:`${pct}%`,transition:'width .6s ease'}}/>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            {MODULES.map(m=>{
              const isDone = prog[m.id]?.done;
              const isNext = !isDone && MODULES.find(x=>!prog[x.id]?.done)?.id===m.id;
              return (
                <div key={m.id} onClick={()=>openMod(m.id)}
                  style={{background:'white',borderRadius:14,border:`1px solid ${isDone?'#A7F3D0':isNext?'#BFDBFE':'#E5E7EB'}`,cursor:'pointer',padding:20,transition:'all .15s'}}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                    <span style={tag(isDone?'#D1FAE5':m.colorLight,isDone?'#059669':m.color)}>{isDone?'✓ Complété':m.tag}</span>
                    <span style={{fontSize:11,color:'#9CA3AF'}}>{m.dur}</span>
                  </div>
                  <div style={{fontSize:12,color:'#9CA3AF',marginBottom:4,fontWeight:600}}>Module {m.num}</div>
                  <div style={{fontSize:15,fontWeight:700,color:'#111827',lineHeight:1.35,marginBottom:isDone||isNext?10:0}}>{m.name}</div>
                  {isDone&&<div style={{fontSize:12,color:'#6B7280'}}>{prog[m.id].q||0} question(s) au tuteur</div>}
                  {isNext&&!isDone&&<div style={{fontSize:12,color:'#3B82F6',fontWeight:600}}>→ Commence ici</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  if(view==='mod'&&curMod) return (
    <>
      <Head><title>OAS — Module {curMod.num}</title></Head>
      <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'#F4F6F5',overflow:'hidden'}}>
        {/* Top bar */}
        <div style={{background:'white',borderBottom:'1px solid #E5E7EB',padding:'10px 20px',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
          <button onClick={()=>setView('dash')} style={{fontSize:13,color:'#6B7280',background:'none',border:'1px solid #E5E7EB',padding:'5px 12px',borderRadius:7,cursor:'pointer',fontWeight:500}}>← Dashboard</button>
          <div style={{height:16,width:1,background:'#E5E7EB'}}/>
          <span style={tag(curMod.colorLight,curMod.color)}>{curMod.tag}</span>
          <span style={{fontSize:13,color:'#374151',fontWeight:600}}>Module {curMod.num} — {curMod.name}</span>
          <div style={{flex:1}}/>
          {!prog[modId]?.done
            ?<button onClick={markDone} style={btn(T,'white',{fontSize:13,padding:'7px 16px'})}>✓ Marquer comme complété</button>
            :<span style={{fontSize:13,color:TM,fontWeight:700}}>✓ Complété</span>}
        </div>

        <div style={{flex:1,display:'flex',overflow:'hidden'}}>
          {/* Content panel */}
          <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
            {/* Module header + tabs */}
            <div style={{padding:'18px 24px 0',flexShrink:0,background:'white',borderBottom:'1px solid #E5E7EB'}}>
              <div style={{fontSize:11,color:curMod.color,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',marginBottom:5}}>{curMod.tag} · {curMod.dur}</div>
              <div style={{fontSize:20,fontWeight:800,color:'#111827',marginBottom:5,lineHeight:1.25,letterSpacing:'-0.4px'}}>{curMod.title}</div>
              <div style={{fontSize:13,color:'#6B7280',fontStyle:'italic',lineHeight:1.6,marginBottom:14}}>{curMod.intro}</div>
              <div style={{display:'flex',gap:0}}>
                {[{id:'schema',label:'Schéma'},{id:'steps',label:'Étapes Clay'},{id:'rules',label:'Règles'},{id:'concepts',label:'Concepts'}].map(t=>(
                  <button key={t.id} onClick={()=>setTab(t.id)}
                    style={{fontSize:13,fontWeight:500,padding:'8px 16px',cursor:'pointer',background:'none',border:'none',borderBottom:`2px solid ${tab===t.id?curMod.color:'transparent'}`,color:tab===t.id?curMod.color:'#6B7280',marginBottom:-1,transition:'all .12s'}}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab body */}
            <div style={{flex:1,overflowY:'auto',padding:'20px 24px 24px'}}>
              {tab==='schema' && (
                <div style={{background:'white',borderRadius:12,border:'1px solid #E5E7EB',padding:16}}>
                  <div dangerouslySetInnerHTML={{__html: SCHEMAS[modId]||''}}/>
                </div>
              )}
              {tab==='steps' && (
                <div>
                  {curMod.steps.map((s,i)=>(
                    <div key={i}>
                      <div style={{display:'flex',gap:12,alignItems:'flex-start',background:'white',borderRadius:9,border:'1px solid #E5E7EB',padding:'12px 14px'}}>
                        <div style={{width:24,height:24,borderRadius:'50%',background:T,color:'white',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                          {String(i+1).padStart(2,'0')}
                        </div>
                        <div style={{fontSize:13,color:'#111827',lineHeight:1.65,fontWeight:500,paddingTop:2}}>{s}</div>
                      </div>
                      {i<curMod.steps.length-1&&<div style={{textAlign:'center',color:'#9CA3AF',fontSize:14,margin:'4px 0 4px 18px'}}>↓</div>}
                    </div>
                  ))}
                </div>
              )}
              {tab==='rules' && (
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {curMod.rules.map((r,i)=>(
                    <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',background:'white',border:'1px solid #E5E7EB',borderRadius:10,padding:'13px 16px'}}>
                      <div style={{width:28,height:28,borderRadius:8,background:TL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:T,flexShrink:0}}>{r.n}</div>
                      <div style={{fontSize:13,color:'#111827',lineHeight:1.65,fontWeight:500,paddingTop:3}}>{r.r}</div>
                    </div>
                  ))}
                </div>
              )}
              {tab==='concepts' && (
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {curMod.concepts.map((c,i)=>(
                    <div key={i} style={{background:'white',border:'1px solid #E5E7EB',borderLeft:`3px solid ${curMod.color}`,borderRadius:10,padding:'14px 16px'}}>
                      <div style={{fontSize:13,fontWeight:700,color:'#111827',marginBottom:5}}>{c.t}</div>
                      <div style={{fontSize:13,color:'#6B7280',lineHeight:1.7}}>{c.b}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress */}
            <div style={{padding:'10px 24px',borderTop:'1px solid #E5E7EB',flexShrink:0,display:'flex',alignItems:'center',gap:12,background:'white'}}>
              <div style={{display:'flex',gap:3,flex:1}}>
                {MODULES.map(m=><div key={m.id} style={{height:4,flex:1,borderRadius:2,background:prog[m.id]?.done?TM:m.id===modId?curMod.color:'#E5E7EB',transition:'background .3s'}}/>)}
              </div>
              <span style={{fontSize:12,color:'#9CA3AF',flexShrink:0}}>{doneCount}/{MODULES.length}</span>
            </div>
          </div>

          {/* TUTOR — full height right */}
          <div style={{width:320,minWidth:320,borderLeft:'1px solid #E5E7EB',display:'flex',flexDirection:'column',background:'white',flexShrink:0}}>
            <div style={{padding:'13px 16px',borderBottom:'1px solid #F3F4F6',background:'#FAFDF8',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
              <div style={{width:32,height:32,borderRadius:'50%',background:TL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:T}}>OA</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#111827'}}>Tuteur OAS</div>
                <div style={{fontSize:11,color:TM,fontWeight:500}}>● Propulsé par Claude</div>
              </div>
            </div>
            <div style={{padding:'7px 14px',background:'#F0FAF5',borderBottom:'1px solid #C5E8D8',fontSize:11,color:T,lineHeight:1.5,flexShrink:0}}>
              Module {curMod.num} — {curMod.name}<br/>
              <span style={{color:'#6B7280',fontStyle:'italic'}}>Pose une question ou demande un exemple pour ton client.</span>
            </div>

            <div style={{flex:1,overflowY:'auto',padding:14,display:'flex',flexDirection:'column',gap:11}}>
              {msgs.map((m,i)=>(
                <div key={i} style={{display:'flex',flexDirection:'column',alignItems:m.role==='user'?'flex-end':'flex-start'}}>
                  <div style={{fontSize:10,color:'#9CA3AF',marginBottom:3,fontWeight:600}}>{m.role==='user'?'Toi':'Tuteur OAS'}</div>
                  <div style={{maxWidth:'92%',padding:'9px 12px',borderRadius:11,fontSize:12,lineHeight:1.65,background:m.role==='user'?T:'#F3F4F6',color:m.role==='user'?'white':'#111827',borderBottomLeftRadius:m.role==='ai'?3:11,borderBottomRightRadius:m.role==='user'?3:11}}>
                    {m.content}
                  </div>
                </div>
              ))}
              {typing&&(
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                  <div style={{fontSize:10,color:'#9CA3AF',marginBottom:3,fontWeight:600}}>Tuteur OAS</div>
                  <div style={{padding:'11px 15px',borderRadius:11,borderBottomLeftRadius:3,background:'#F3F4F6',display:'flex',gap:4}}>
                    {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:'50%',background:'#9CA3AF',animation:`oasBounce 1.2s ${i*.2}s infinite`}}/>)}
                  </div>
                </div>
              )}
              <div ref={endRef}/>
            </div>

            <div style={{padding:'7px 13px 9px',display:'flex',flexWrap:'wrap',gap:5,borderTop:'1px solid #F3F4F6',flexShrink:0}}>
              {curMod.qq.map((q,i)=>(
                <button key={i} onClick={()=>chat(q)} style={{fontSize:11,padding:'4px 10px',borderRadius:20,border:`1.5px solid ${TM}`,color:T,background:TL,cursor:'pointer',fontWeight:500}}>
                  {q}
                </button>
              ))}
            </div>

            <div style={{padding:'10px 13px',borderTop:'1px solid #F3F4F6',display:'flex',gap:8,alignItems:'flex-end',flexShrink:0}}>
              <textarea ref={taRef} value={inp} onChange={e=>setInp(e.target.value)}
                onKeyDown={e=>{
                  if(taRef.current){taRef.current.style.height='auto';taRef.current.style.height=Math.min(taRef.current.scrollHeight,80)+'px';}
                  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();chat();}
                }}
                placeholder="Pose une question..." rows={1}
                style={{flex:1,border:'1.5px solid #E5E7EB',borderRadius:8,padding:'8px 11px',fontSize:13,fontFamily:'inherit',resize:'none',outline:'none',background:'#FAFAFA',color:'#111827',minHeight:36,maxHeight:80,boxSizing:'border-box',transition:'border-color .15s'}}
                onFocus={e=>e.target.style.borderColor=T} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>
              <button onClick={()=>chat()} disabled={typing}
                style={{width:36,height:36,borderRadius:8,background:typing?'#9CA3AF':T,border:'none',cursor:typing?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes oasBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}svg .on{cursor:pointer;transition:opacity .15s}svg .on:hover{opacity:.75}`}</style>
    </>
  );

  return null;
}
