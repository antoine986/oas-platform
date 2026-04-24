import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const T = '#0F6E56';
const TL = '#E0F5EE';
const TM = '#1D9E75';
const TD = '#085041';
const CODE_USER = "OAS2025";
const CODE_ADMIN = "ADMIN-OAS";

/* ─── Fil rouge ─── */
const FIL = {
  company: "Syncflow",
  desc: "SaaS de gestion RH & onboarding",
  team: "2 commerciaux (1 AE, 1 SDR)",
  budget: "Starter Clay — 50 000 crédits/mois",
  icp: "DRH & HRBP · PME 100-500 salariés · France · secteurs tech, services, industrie",
  stack: "Clay + Apollo + HubSpot + Lemlist",
  context: "Avant Clay : sourcing manuel sur LinkedIn + Apollo brut. Taux de réponse < 1%. Aucun système de déduplication. Le SDR reprospcete les mêmes entreprises sans le savoir.",
};

/* ─── Clickable SVG node ─── */
const N = ({ onClick, children, x, y, w, h, r=9, fill, stroke, sw=1 }) => {
  const [hov, setHov] = useState(false);
  return (
    <g onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{cursor:'pointer'}}>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={hov?2.5:sw} opacity={hov?.88:1} style={{transition:'all .1s'}}/>
      {children}
    </g>
  );
};

/* ─── SCHEMAS ─── */
const makeSchemas = (chat) => ({
  1: (
    <svg width="100%" viewBox="0 0 540 200" role="img">
      <defs><marker id="ar1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      <N onClick={()=>chat("Clay est le moteur d'orchestration — explique-moi concrètement ce que ça veut dire et en quoi c'est différent d'un outil d'enrichissement classique comme Apollo")} x={195} y={62} w={150} h={56} fill="#E0F5EE" stroke="#0F6E56" sw={1.5}>
        <text x="270" y="86" textAnchor="middle" fontSize="12" fontWeight="700" fill="#085041">Clay</text>
        <text x="270" y="103" textAnchor="middle" fontSize="10" fill="#0F6E56">Moteur d'orchestration</text>
      </N>
      <N onClick={()=>chat("Quand utiliser Sales Navigator plutôt qu'Apollo pour sourcer mes entreprises dans Clay ?")} x={12} y={18} w={120} h={36} fill="#EFF6FF" stroke="#185FA5">
        <text x="72" y="41" textAnchor="middle" fontSize="10" fill="#042C53">Sales Nav / Apollo</text>
      </N>
      <N onClick={()=>chat("Comment importer un fichier CSV dans Clay ? Quelles colonnes sont indispensables ?")} x={12} y={70} w={120} h={36} fill="#EFF6FF" stroke="#185FA5">
        <text x="72" y="93" textAnchor="middle" fontSize="10" fill="#185FA5">CSV importé</text>
      </N>
      <N onClick={()=>chat("Comment exporter correctement la Blocklist depuis HubSpot pour l'importer dans Clay ?")} x={12} y={122} w={120} h={36} fill="#EFF6FF" stroke="#185FA5">
        <text x="72" y="145" textAnchor="middle" fontSize="10" fill="#185FA5">HubSpot / Blocklist</text>
      </N>
      <line x1="132" y1="36" x2="195" y2="82" stroke="#185FA5" strokeWidth="1" markerEnd="url(#ar1)"/>
      <line x1="132" y1="88" x2="195" y2="92" stroke="#185FA5" strokeWidth="1" markerEnd="url(#ar1)"/>
      <line x1="132" y1="140" x2="195" y2="105" stroke="#185FA5" strokeWidth="1" markerEnd="url(#ar1)"/>
      <N onClick={()=>chat("Quelle est la différence entre Heyreach et Lemlist ? Dans quel cas je choisis l'un ou l'autre ?")} x={408} y={18} w={122} h={36} fill="#ECFDF5" stroke="#059669">
        <text x="469" y="41" textAnchor="middle" fontSize="10" fill="#064E3B">Heyreach / Lemlist</text>
      </N>
      <N onClick={()=>chat("Comment pousser mes leads qualifiés depuis Clay vers HubSpot sans créer de doublons ?")} x={408} y={70} w={122} h={36} fill="#ECFDF5" stroke="#059669">
        <text x="469" y="93" textAnchor="middle" fontSize="10" fill="#059669">HubSpot enrichi</text>
      </N>
      <N onClick={()=>chat("Quel modèle IA utiliser pour générer les icebreakers dans Clay et combien ça coûte en crédits ?")} x={408} y={122} w={122} h={36} fill="#FEF3C7" stroke="#D97706">
        <text x="469" y="145" textAnchor="middle" fontSize="10" fill="#92400E">Icebreakers IA</text>
      </N>
      <line x1="345" y1="82" x2="408" y2="36" stroke="#0F6E56" strokeWidth="1" markerEnd="url(#ar1)"/>
      <line x1="345" y1="92" x2="408" y2="88" stroke="#0F6E56" strokeWidth="1" markerEnd="url(#ar1)"/>
      <line x1="345" y1="105" x2="408" y2="140" stroke="#0F6E56" strokeWidth="1" markerEnd="url(#ar1)"/>
      <N onClick={()=>chat("C'est quoi exactement un Run if dans Clay ? Donne-moi un exemple concret sur une colonne d'enrichissement")} x={145} y={152} w={250} h={26} r={6} fill="#FEF2F2" stroke="#FCA5A5" sw={0.5}>
        <text x="270" y="169" textAnchor="middle" fontSize="10" fill="#991B1B">⚡ Aucune action sans condition Run if</text>
      </N>
      <text x="270" y="194" textAnchor="middle" fontSize="9" fill="#9CA3AF">Clique sur un élément pour l'explorer avec le tuteur</text>
    </svg>
  ),
  2: (
    <svg width="100%" viewBox="0 0 540 210" role="img">
      <defs><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      <N onClick={()=>chat("Quels critères firmographiques mettre dans Clay Find Companies pour une PME SaaS B2B ciblant des DRH en France ?")} x={20} y={12} w={500} h={46} fill="#EFF6FF" stroke="#185FA5">
        <text x="270" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#042C53">Niveau 1 — Firmographique</text>
        <text x="270" y="47" textAnchor="middle" fontSize="10" fill="#185FA5">Taille · Secteur · Pays · Revenus</text>
      </N>
      <line x1="270" y1="58" x2="270" y2="72" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#ar2)"/>
      <N onClick={()=>chat("Comment détecter la stack technologique d'une entreprise dans Clay ? Quel enrichissement utiliser ?")} x={50} y={72} w={440} h={46} fill="#F5F3FF" stroke="#7C3AED">
        <text x="270" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730A3">Niveau 2 — Comportemental</text>
        <text x="270" y="107" textAnchor="middle" fontSize="10" fill="#7C3AED">Stack technologique · Type de business · Canaux utilisés</text>
      </N>
      <line x1="270" y1="118" x2="270" y2="132" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#ar2)"/>
      <N onClick={()=>chat("Quels sont les 4 signaux de croissance les plus puissants et comment les sourcer concrètement dans Clay ?")} x={80} y={132} w={380} h={46} fill="#E0F5EE" stroke="#0F6E56" sw={1.5}>
        <text x="270" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fill="#085041">Niveau 3 — Signal de croissance ★</text>
        <text x="270" y="167" textAnchor="middle" fontSize="10" fill="#0F6E56">Recrutement · Levée de fonds · Expansion · Nouveau décideur</text>
      </N>
      <N onClick={()=>chat("Pourquoi le signal de croissance génère-t-il plus de réponses qu'un message basé uniquement sur le secteur ou la taille ?")} x={155} y={188} w={230} h={18} r={5} fill="#FEF3C7" stroke="#D97706" sw={0.5}>
        <text x="270" y="201" textAnchor="middle" fontSize="9" fill="#92400E">★ Le niveau 3 fait la différence — c'est lui qui génère des réponses</text>
      </N>
      <text x="270" y="208" textAnchor="middle" fontSize="9" fill="#9CA3AF">Clique sur un niveau pour l'explorer avec le tuteur</text>
    </svg>
  ),
  3: (
    <svg width="100%" viewBox="0 0 540 218" role="img">
      <defs><marker id="ar3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      <rect x="8" y="8" width="155" height="82" rx="9" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="85" y="24" textAnchor="middle" fontSize="9" fill="#6B7280">Workbook séparé</text>
      <N onClick={()=>chat("Quelle est la différence entre TAM Company et TAM People ? Dans quel cas j'ai besoin des deux ?")} x={15} y={30} w={62} h={52} fill="#E0F5EE" stroke="#0F6E56">
        <text x="46" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#085041">TAM</text>
        <text x="46" y="66" textAnchor="middle" fontSize="9" fill="#0F6E56">déjà</text>
        <text x="46" y="78" textAnchor="middle" fontSize="9" fill="#0F6E56">travaillées</text>
      </N>
      <N onClick={()=>chat("Comment exporter correctement la Blocklist depuis HubSpot ? Quel filtre utiliser exactement ?")} x={83} y={30} w={72} h={52} fill="#FEF2F2" stroke="#E24B4A">
        <text x="119" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B">Blocklist</text>
        <text x="119" y="64" textAnchor="middle" fontSize="9" fill="#DC2626">clients</text>
        <text x="119" y="78" textAnchor="middle" fontSize="9" fill="#DC2626">existants</text>
      </N>
      <N onClick={()=>chat("Comment configurer le Lookup Single Row pour dédupliquer sur la TAM et la Blocklist dans le workbook sourcing ?")} x={192} y={8} w={155} h={82} fill="#EFF6FF" stroke="#185FA5">
        <text x="269" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill="#042C53">Workbook Sourcing</text>
        <text x="269" y="44" textAnchor="middle" fontSize="9" fill="#185FA5">Find Companies ou CSV</text>
        <text x="269" y="58" textAnchor="middle" fontSize="9" fill="#185FA5">Normalize Domain</text>
        <text x="269" y="72" textAnchor="middle" fontSize="9" fill="#185FA5">Lookup TAM + Blocklist</text>
        <text x="269" y="84" textAnchor="middle" fontSize="9" fill="#0F6E56">Good Fit = "Approved"</text>
      </N>
      <line x1="163" y1="49" x2="192" y2="49" stroke="#6B7280" strokeWidth="1" markerEnd="url(#ar3)"/>
      <N onClick={()=>chat("Pourquoi créer une table Approved Companies séparée plutôt d'enrichir directement depuis la table de sourcing ?")} x={376} y={8} w={156} h={82} fill="#FFFBEB" stroke="#D97706" sw={1.5}>
        <text x="454" y="26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E">Approved Companies</text>
        <text x="454" y="42" textAnchor="middle" fontSize="9" fill="#B45309">Run if Good Fit = Approved</text>
        <text x="454" y="56" textAnchor="middle" fontSize="9" fill="#B45309">Find People</text>
        <text x="454" y="70" textAnchor="middle" fontSize="9" fill="#B45309">Enrichissement email</text>
        <text x="454" y="84" textAnchor="middle" fontSize="9" fill="#B45309">Agents IA</text>
      </N>
      <line x1="347" y1="49" x2="376" y2="49" stroke="#D97706" strokeWidth="1.5" markerEnd="url(#ar3)"/>
      <N onClick={()=>chat("Montre-moi exactement où cliquer dans Clay pour configurer Normalize Domain et quelles options choisir")} x={192} y={110} w={155} h={46} fill="#F0FDF4" stroke="#16A34A">
        <text x="269" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532D">Normalize Domain</text>
        <text x="269" y="144" textAnchor="middle" fontSize="9" fill="#16A34A">Add Enrichment → Remove Prefixes</text>
      </N>
      <line x1="269" y1="90" x2="269" y2="110" stroke="#16A34A" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#ar3)"/>
      <N onClick={()=>chat("Comment configurer Send Data to Table dans Clay pour alimenter automatiquement Approved Companies ?")} x={192} y={170} w={155} h={40} fill="#ECFDF5" stroke="#059669">
        <text x="269" y="188" textAnchor="middle" fontSize="10" fontWeight="700" fill="#064E3B">Outreach</text>
        <text x="269" y="202" textAnchor="middle" fontSize="9" fill="#059669">Heyreach · Lemlist · Smartlead</text>
      </N>
      <line x1="454" y1="90" x2="454" y2="116" stroke="#D97706" strokeWidth="1" strokeDasharray="3 2"/>
      <line x1="454" y1="116" x2="312" y2="170" stroke="#059669" strokeWidth="1.5" markerEnd="url(#ar3)"/>
      <text x="270" y="214" textAnchor="middle" fontSize="9" fill="#9CA3AF">Clique sur un workbook ou une action pour l'explorer</text>
    </svg>
  ),
  4: (
    <svg width="100%" viewBox="0 0 540 195" role="img">
      <defs><marker id="ar4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      {[
        {x:5,  fill:'#EFF6FF',stroke:'#185FA5',tc:'#042C53',sc:'#185FA5',title:'Sourcing',    sub1:'Clay / Apollo',  sub2:'Sales Nav CSV',   q:"Quelle est la meilleure façon d'importer une URL de recherche Sales Navigator dans Clay ?"},
        {x:114,fill:'#E0F5EE',stroke:'#0F6E56',tc:'#085041',sc:'#0F6E56',title:'Qualify',     sub1:'TAM + Blocklist',sub2:'Good Fit',         q:"Comment créer la colonne Good Fit qui synthétise les lookups TAM et Blocklist en une seule condition ?"},
        {x:223,fill:'#F5F3FF',stroke:'#7C3AED',tc:'#3730A3',sc:'#7C3AED',title:'Find People', sub1:'5 max / entrep.',sub2:'Run if Approved',  q:"Quelle est la différence entre 'similar to' et 'is exactly' dans les filtres Job Title de Find People ?"},
        {x:332,fill:'#FEF3C7',stroke:'#D97706',tc:'#92400E',sc:'#B45309',title:'Email cascade',sub1:'Full Enrich',  sub2:'→ Dropcontact',    q:"Comment configurer la cascade email waterfall dans Clay avec Full Enrich, Dropcontact et Enrichley ?"},
        {x:441,fill:'#ECFDF5',stroke:'#059669',tc:'#064E3B',sc:'#059669',title:'Output',      sub1:'Outreach',      sub2:'prêt à lancer',   q:"Quelles conditions Run if mettre sur la dernière colonne avant d'exporter vers Heyreach ?"},
      ].map((s,i,a)=>(
        <g key={i}>
          <N onClick={()=>chat(s.q)} x={s.x} y={12} w={100} h={82} fill={s.fill} stroke={s.stroke}>
            <text x={s.x+50} y={38} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.tc}>{s.title}</text>
            <text x={s.x+50} y={56} textAnchor="middle" fontSize="9" fill={s.sc}>{s.sub1}</text>
            <text x={s.x+50} y={70} textAnchor="middle" fontSize="9" fill={s.sc}>{s.sub2}</text>
          </N>
          {i<a.length-1 && <line x1={s.x+100} y1={53} x2={s.x+114} y2={53} stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#ar4)"/>}
        </g>
      ))}
      <N onClick={()=>chat("Donne-moi un exemple concret de Run if mal configuré qui fait perdre des crédits et comment l'éviter")} x={5} y={108} w={530} h={24} r={6} fill="#F9FAFB" stroke="#E5E7EB" sw={0.5}>
        <text x="270" y="124" textAnchor="middle" fontSize="10" fill="#374151">⚡ Chaque colonne a un <tspan fontWeight="700">Run if</tspan> — enrichir sans condition = crédits perdus</text>
      </N>
      <N onClick={()=>chat("Comment fonctionne exactement le waterfall email ? Dans quel ordre configurer Full Enrich, Dropcontact et Enrichley ?")} x={332} y={142} w={208} h={44} fill="#FFFBEB" stroke="#D97706" sw={0.5}>
        <text x="436" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E">Waterfall email</text>
        <text x="436" y="176" textAnchor="middle" fontSize="9" fill="#B45309">Full Enrich → trouvé ? stop. Sinon Dropcontact → Enrichley</text>
      </N>
      <text x="270" y="192" textAnchor="middle" fontSize="9" fill="#9CA3AF">Clique sur une étape pour l'explorer avec le tuteur</text>
    </svg>
  ),
  5: (
    <svg width="100%" viewBox="0 0 540 218" role="img">
      <defs><marker id="ar5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      <N onClick={()=>chat("Je n'ai aucun signal disponible pour mon client. Comment construire un icebreaker efficace basé sur un enjeu sectoriel ?")} x={8} y={14} w={130} h={78} fill="#FEF3C7" stroke="#D97706">
        <text x="73" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E">Signal</text>
        <text x="73" y="54" textAnchor="middle" fontSize="9" fill="#B45309">Recrutement</text>
        <text x="73" y="67" textAnchor="middle" fontSize="9" fill="#B45309">Levée de fonds</text>
        <text x="73" y="80" textAnchor="middle" fontSize="9" fill="#B45309">Expansion · nouveau poste</text>
      </N>
      <line x1="138" y1="53" x2="162" y2="53" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#ar5)"/>
      <N onClick={()=>chat("Donne-moi un exemple complet de message LinkedIn qui suit la structure Observation → Supposition → Question ouverte pour un SaaS RH ciblant des DRH")} x={162} y={6} w={200} h={108} fill="#E0F5EE" stroke="#0F6E56" sw={1.5}>
        <text x="262" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="#085041">Structure du message</text>
        <rect x="172" y="34" width="180" height="22" rx="4" fill="#0F6E56"/>
        <text x="262" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="white">1. Observation</text>
        <rect x="172" y="61" width="180" height="22" rx="4" fill="#1D9E75"/>
        <text x="262" y="77" textAnchor="middle" fontSize="10" fontWeight="600" fill="white">2. Supposition prudente</text>
        <rect x="172" y="88" width="180" height="22" rx="4" fill="#5DCAA5"/>
        <text x="262" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#085041">3. Question ouverte</text>
      </N>
      <line x1="362" y1="53" x2="390" y2="30" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#ar5)"/>
      <N onClick={()=>chat("Pourquoi ne jamais mettre de message dans la demande de connexion LinkedIn ? Quelle est l'alternative recommandée ?")} x={390} y={6} w={145} h={48} fill="#EFF6FF" stroke="#185FA5">
        <text x="462" y="26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#042C53">LinkedIn</text>
        <text x="462" y="42" textAnchor="middle" fontSize="9" fill="#185FA5">Connexion sans message · J0</text>
      </N>
      <N onClick={()=>chat("Quelle séquence email recommandes-tu en termes de nombre de messages et d'espacement entre chaque ?")} x={390} y={66} w={145} h={48} fill="#F5F3FF" stroke="#7C3AED">
        <text x="462" y="86" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730A3">Email</text>
        <text x="462" y="102" textAnchor="middle" fontSize="9" fill="#7C3AED">J0 · J3 · J7 · J14</text>
      </N>
      <N onClick={()=>chat("Comment configurer l'agent IA Clay pour générer des icebreakers pertinents ? Quelles directives mettre dans le prompt ?")} x={162} y={130} w={200} h={36} fill="#FEF3C7" stroke="#D97706">
        <text x="262" y="148" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E">Agent IA Clay</text>
        <text x="262" y="162" textAnchor="middle" fontSize="9" fill="#B45309">Run if Approved · test 5-10 lignes d'abord</text>
      </N>
      <N onClick={()=>chat("Mon client prospecte des DRH dans des PME sans signal disponible. Aide-moi à construire un icebreaker adapté")} x={8} y={124} w={130} h={48} fill="#F9FAFB" stroke="#E5E7EB" sw={0.5}>
        <text x="73" y="144" textAnchor="middle" fontSize="9" fontWeight="600" fill="#374151">Sans signal</text>
        <text x="73" y="158" textAnchor="middle" fontSize="9" fill="#6B7280">Enjeu sectoriel universel</text>
      </N>
      <text x="270" y="195" textAnchor="middle" fontSize="9" fill="#9CA3AF">Clique sur un élément pour construire ton message avec le tuteur</text>
      <text x="270" y="210" textAnchor="middle" fontSize="9" fill="#D97706" fontWeight="600">⚠ Jamais de chiffres inventés · jamais de flatterie · jamais de vente directe</text>
    </svg>
  ),
  6: (
    <svg width="100%" viewBox="0 0 540 220" role="img">
      <defs><marker id="ar6" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      {[
        {cx:54,  label:'Construire', sub:'Run if partout',   q:"Quelles colonnes nécessitent absolument un Run if dans un workflow Clay standard ?"},
        {cx:162, label:'Tester 5-10',sub:'Ligne par ligne',  q:"Comment faire un Save and Run sur seulement 5 lignes dans Clay pour tester avant de lancer ?"},
        {cx:270, label:'Test export', sub:'Heyreach · CRM',  q:"Comment vérifier que le mapping des variables est correct avant d'exporter vers Heyreach ?"},
        {cx:378, label:'Checklist',   sub:'Is Outreach Ready',q:"Explique-moi les 6 conditions de Is Outreach Ready et pourquoi chacune est nécessaire"},
        {cx:486, label:'Schedule',    sub:'Weekly défaut',   q:"Comment activer Run on Schedule dans Clay et quelle fréquence choisir selon le volume ?"},
      ].map((s,i,a)=>(
        <g key={i} onClick={()=>chat(s.q)} style={{cursor:'pointer'}}>
          <circle cx={s.cx} cy={52} r={26} fill={i===4?'#E0F5EE':'#F9FAFB'} stroke={i===4?'#0F6E56':'#D1D5DB'} strokeWidth={i===4?1.5:1}/>
          <text x={s.cx} y={48} textAnchor="middle" fontSize="14" fontWeight="700" fill={i===4?'#085041':'#374151'}>{i+1}</text>
          <text x={s.cx} y={64} textAnchor="middle" fontSize="9" fill={i===4?'#0F6E56':'#6B7280'}>✓</text>
          <text x={s.cx} y={96} textAnchor="middle" fontSize="10" fontWeight="600" fill="#111827">{s.label}</text>
          <text x={s.cx} y={110} textAnchor="middle" fontSize="9" fill="#6B7280">{s.sub}</text>
          {i<a.length-1 && <line x1={s.cx+26} y1={52} x2={s.cx+82} y2={52} stroke="#D1D5DB" strokeWidth="1.5" markerEnd="url(#ar6)"/>}
        </g>
      ))}
      <N onClick={()=>chat("Quelles sont précisément les 6 conditions de Is Outreach Ready et que se passe-t-il si une seule est fausse ?")} x={50} y={126} w={440} h={80} fill="#E0F5EE" stroke="#0F6E56" sw={1.5}>
        <text x="270" y="146" textAnchor="middle" fontSize="11" fontWeight="700" fill="#085041">Is Outreach Ready = TRUE si les 6 conditions sont vraies</text>
        <text x="160" y="163" textAnchor="middle" fontSize="9" fill="#0F6E56">✓ Company Status = Approved</text>
        <text x="160" y="177" textAnchor="middle" fontSize="9" fill="#0F6E56">✓ Work Email = VALID</text>
        <text x="160" y="191" textAnchor="middle" fontSize="9" fill="#0F6E56">✓ LinkedIn URL exists</text>
        <text x="380" y="163" textAnchor="middle" fontSize="9" fill="#0F6E56">✓ Lead Status = Approved</text>
        <text x="380" y="177" textAnchor="middle" fontSize="9" fill="#0F6E56">✓ Job Title not empty</text>
        <text x="380" y="191" textAnchor="middle" fontSize="9" fill="#0F6E56">✓ Not in Blocklist</text>
      </N>
      <text x="270" y="217" textAnchor="middle" fontSize="9" fill="#9CA3AF">Clique sur une étape ou la checklist pour l'explorer</text>
    </svg>
  ),
});

/* ─── CAS PRATIQUES ─── */
const CAS = [
  {
    context: "Syncflow (SaaS RH & onboarding) · 2 commerciaux · cible DRH & HRBP dans PME 100-500 salariés",
    problem: "Avant Clay : sourcing manuel LinkedIn + Apollo brut. Taux de réponse < 1%. Aucune déduplication — le SDR reprospecte les mêmes entreprises sans le savoir.",
    actions: [
      {label:"Décision stack", text:"Clay (orchestration) + Apollo (volume sourcing) + HubSpot (CRM) + Lemlist (email). Clay est le seul outil qui ne peut pas changer."},
      {label:"Règle Run if", text:"Sur chaque colonne d'enrichissement, une condition Run if est obligatoire. Sans ça, chaque sourcing Apollo déborde sur des entreprises déjà contactées."},
      {label:"Architecture cible", text:"4 tables : TAM (clients + prospects traités) → Blocklist (clients HubSpot actifs) → Sourcing PME Tech/Services/Industrie → Approved → Lemlist."},
    ],
    result: "Le SDR arrête de travailler sur des fichiers isolés. Tout passe par Clay. La machine est définie avant d'être construite.",
    tip: "Commence toujours par dessiner les 4 tables sur papier avant d'ouvrir Clay. L'architecture mentale vient avant la technique.",
  },
  {
    context: "Syncflow · ICP à définir pour le premier workbook de sourcing",
    problem: "L'équipe avait un ICP vague : 'entreprises en croissance qui ont des enjeux RH'. Impossible à filtrer dans Clay.",
    actions: [
      {label:"Niveau 1 (filtres Clay)", text:"Taille : 100-500 salariés · Pays : France · Secteurs : Tech, Services B2B, Industrie · Type : Privé. Ces critères sont directement filtrables dans Find Companies."},
      {label:"Niveau 2 (comportemental)", text:"Entreprises qui utilisent un SIRH basique (Payfit, Lucca) mais pas de solution d'onboarding — elles sont prêtes à payer pour un upgrade."},
      {label:"Niveau 3 (signal retenu)", text:"Recrutement actif sur des postes RH dans les 30 derniers jours. Filtre : Find People → 'Maximum months in current role' ≤ 6 sur le DRH ou HRBP."},
    ],
    result: "L'ICP est filtrable dans Clay en 3 critères combinés. Le signal recrutement actif devient le déclencheur principal des campagnes.",
    tip: "Si tu ne peux pas le filtrer dans Clay, c'est un ICP théorique. Teste toujours le volume avant de valider un segment.",
  },
  {
    context: "Syncflow · Construction des tables dans Clay",
    problem: "Le SDR avait importé tous ses prospects directement dans une seule table. Résultat : impossible de dédupliquer, des clients Syncflow se retrouvaient dans les campagnes.",
    actions: [
      {label:"Workbook 1 : TAM + Blocklist", text:"Export HubSpot filtré sur 'First Deal Created Date is Known' (63 entreprises clientes). Import dans Clay → Normalize Domain → Remove Prefixes. Renommer : Blocklist_Syncflow."},
      {label:"Workbook 2 : Sourcing DRH PME", text:"Source : Apollo (2 000 entreprises 100-500 salariés, secteurs retenus, France). Import CSV → Normalize Domain → Lookup Blocklist → Lookup TAM → colonne Good Fit."},
      {label:"Table Approved Companies", text:"Send Data to Table → Run if Good Fit = 'Approved'. 1 847 entreprises passent le filtre sur 2 000 sourcées. 153 étaient déjà dans la Blocklist ou la TAM."},
    ],
    result: "Zéro doublon, zéro client dans les campagnes. Le SDR ne travaille plus que sur des entreprises jamais touchées.",
    tip: "Les 153 entreprises filtrées = du temps et des crédits économisés. C'est ça la valeur de l'architecture propre.",
  },
  {
    context: "Syncflow · Sourcing contacts et enrichissement email",
    problem: "Depuis Approved Companies (1 847 entreprises), il faut trouver les bons contacts et leurs emails professionnels valides.",
    actions: [
      {label:"Find People (config)", text:"Job Title 'similar to' : DRH, HRBP, Responsable RH, HR Manager, HR Director. Limiter à 3 contacts max par entreprise (PME = peu de personas). Run if Good Fit = Approved."},
      {label:"Save and Run sur 10 lignes", text:"Test : 28 contacts trouvés sur 10 entreprises. Job titles vérifiés manuellement — 2 faux positifs (Responsable Exploitation). On ajoute une condition d'exclusion."},
      {label:"Cascade email", text:"Full Enrich en 1er : 71% de couverture. Dropcontact en fallback : +12%. Enrichley validation : 83% des emails validés. Run if sur les 3 étapes."},
    ],
    result: "Sur 1 847 entreprises approuvées : 3 200 contacts DRH/HRBP trouvés, 2 650 emails valides. Coût : ~8 000 crédits au total.",
    tip: "Toujours tester sur 10 lignes avant de lancer. Les 2 faux positifs auraient coûté 3 crédits × 1847 = 5 500 crédits inutiles.",
  },
  {
    context: "Syncflow · Génération des icebreakers et séquence LinkedIn",
    problem: "Signal disponible : recrutement RH actif dans les 30 derniers jours (détecté via 'Maximum months in current role'). Le SDR veut un message LinkedIn personnalisé.",
    actions: [
      {label:"Signal exploité", text:"Find People → filtre ≤ 6 mois dans le rôle actuel. Les DRH recrutés récemment = nouveau poste = enjeux d'organisation RH immédiats. 340 contacts identifiés avec ce signal."},
      {label:"Prompt icebreaker (config Clay)", text:"Contexte : Syncflow, SaaS onboarding, client cible DRH nouvellement en poste. Structure imposée : 'En prenant connaissance de votre prise de poste chez [Company]... j'imagine que structurer rapidement vos processus d'onboarding... comment gérez-vous cela aujourd'hui ?'"},
      {label:"Test modèle", text:"Test Gemini Pro vs Claude sur 10 lignes. Gemini génère des messages plus conversationnels. Claude plus précis mais moins naturel. Gemini retenu pour cette campagne."},
    ],
    result: "340 icebreakers générés. Le client valide le ton. Campagne LinkedIn lancée : connexion sans message → J0 message avec icebreaker. Taux d'acceptation : 38%.",
    tip: "Faire valider le ton par le client sur 5 exemples avant de lancer. Un icebreaker qu'il ne reconnaît pas comme son propre style ne sera pas bien géré dans les réponses.",
  },
  {
    context: "Syncflow · Mise en production et schedule automatique",
    problem: "Le workflow est validé manuellement. L'objectif : l'automatiser pour alimenter Lemlist chaque semaine sans intervention.",
    actions: [
      {label:"Checklist Is Outreach Ready", text:"6 conditions vérifiées sur tous les contacts : Company Status = Approved ✓ · Lead Status = Approved ✓ · Work Email = VALID ✓ · Job Title not empty ✓ · LinkedIn URL exists ✓ · Not in Blocklist ✓. 2 contacts écartés (email non valide)."},
      {label:"Test export Lemlist", text:"Export 20 contacts vers Lemlist. Mapping vérifié : Icebreaker → variable {{icebreaker}}, First Name → {{firstName}}. 2 variables mal mappées corrigées avant le lancement."},
      {label:"Run on Schedule activé", text:"Weekly, lundi à 6h. Apollo re-source 200 nouvelles entreprises/semaine → elles passent automatiquement le filtre TAM + Blocklist → Approved → enrichissement → Lemlist. Le SDR n'intervient que pour valider le ton des nouveaux icebreakers."},
    ],
    result: "La machine tourne seule. Chaque semaine : ~60 nouveaux leads qualifiés entrent dans Lemlist. Le SDR passe de 4h de sourcing/semaine à 30 min de validation.",
    tip: "Activer le schedule UNIQUEMENT après avoir validé la checklist Is Outreach Ready. Une erreur non détectée se répète à l'infini et consomme des crédits.",
  },
];

/* ─── MODULES ─── */
const MODULES = [
  {id:1,num:"01",name:"Architecture machine",tag:"Fondations",dur:"1h30",color:"#7C3AED",colorLight:"#EDE9FE",
   title:"Architecture de la machine outbound",
   intro:"Comprendre pourquoi la majorité des équipes échouent et poser les bases d'un système fiable et opérable dans le temps.",
   steps:["Clay est le moteur d'orchestration — pas un outil d'enrichissement en masse","Les sources (Sales Nav, Apollo, CSV) alimentent Clay depuis l'extérieur","Clay orchestre : TAM, Blocklist, qualification, enrichissement, agents IA","Les sorties : Heyreach, Lemlist/Smartlead (email), HubSpot","Aucune action ne s'exécute sans condition Run if — règle absolue"],
   rules:[{n:"01",r:"Clay est un moteur d'orchestration, pas un outil d'enrichissement en masse."},{n:"02",r:"Aucune action ne s'exécute sans Run if. Enrichir sans condition = crédits perdus à chaque run."},{n:"03",r:"Ordre strict : manuel → testé → validé → automatisé."}],
   concepts:[{t:"Mental model fondamental",b:"Clay = moteur · Conditions = cerveau · Outreach = sortie. Le problème n'est jamais le copywriting en premier — c'est l'absence de machine opérable dans le temps."},{t:"Les 4 tables fondamentales",b:"TAM (workbook séparé) → Blocklist (workbook séparé) → Approved Companies → Outreach Output. 1 table = 1 fonction."},{t:"Pourquoi pas Apollo seul ?",b:"Apollo source du volume. Clay orchestre, qualifie et automatise. Workflow recommandé : sourcer sur Apollo → CSV → tout travailler dans Clay."}],
   qq:["C'est quoi un Run if ?","Clay vs Apollo ?","Pourquoi 1 table = 1 fonction ?"]},
  {id:2,num:"02",name:"ICP & signaux",tag:"Ciblage",dur:"1h30",color:"#2563EB",colorLight:"#EFF6FF",
   title:"ICP, segmentation & signaux exploitables",
   intro:"Définir un ICP directement filtrable dans Clay et identifier les signaux qui génèrent vraiment des réponses.",
   steps:["Niveau 1 firmographique : taille, secteur, pays, CA","Niveau 2 comportemental : stack techno, type de business","Niveau 3 signal de croissance : recrutement, levée de fonds, expansion, nouveau décideur","Traduire l'ICP en filtres Clay natifs (Find Companies ou Find People)","Tester le volume généré avant de sourcer en production"],
   rules:[{n:"01",r:"L'ICP doit être filtrable dans Clay, pas seulement lisible dans un deck."},{n:"02",r:"On segmente par signal d'abord, puis par secteur."},{n:"03",r:"Qualify before enrich : on n'enrichit jamais avant d'avoir validé la qualification."}],
   concepts:[{t:"Les 4 signaux principaux",b:"Recrutement actif · Levée de fonds récente · Expansion géographique · Changement de leadership. Plus le signal est précis et récent, plus l'icebreaker est percutant."},{t:"Comment sourcer un signal dans Clay",b:"Recrutement : Find People → 'Maximum months in current role'. Levée de fonds : 'Funding Signal'. Expansion : agent IA avec scraping web."},{t:"ICP actionnable vs théorique",b:"Si tu ne peux pas le filtrer dans Clay ou Sales Nav, c'est un ICP théorique. Test : est-ce que ce critère existe dans les filtres Clay Find Companies ?"}],
   qq:["Comment détecter un signal dans Clay ?","Combien de segments au démarrage ?","URL Sales Nav dans Clay ?"]},
  {id:3,num:"03",name:"Tables Clay & data",tag:"Structure",dur:"2h",color:"#0891B2",colorLight:"#ECFEFF",
   title:"Architecture des tables Clay",
   intro:"La base de ta machine. Si l'architecture n'est pas propre au départ, tout le reste sera fragile.",
   steps:["Créer un workbook séparé pour TAM + Blocklist","Exporter la Blocklist depuis HubSpot : filtre 'First Deal Created Date is Known'","Dans le workbook Sourcing : Add Enrichment → Normalize Domain → Remove Prefixes","Configurer Lookup Single Row in Other Table → TAM, puis → Blocklist","Créer colonne Good Fit : return 'Approved' si les deux lookups n'ont pas trouvé de record","Send Data to Table → Approved Companies (Run if Good Fit = 'Approved')"],
   rules:[{n:"01",r:"TAM et Blocklist vivent dans un workbook séparé. On ne source et n'enrichit JAMAIS depuis ce workbook."},{n:"02",r:"Le domaine normalisé est la clé d'identification. Sans Normalize Domain, les lookups ne matchent pas."},{n:"03",r:"Aucune entreprise n'est enrichie sans avoir passé le filtre TAM + Blocklist."}],
   concepts:[{t:"La TAM — ce que c'est vraiment",b:"Pas ton marché adressable global. C'est la table des entreprises sur lesquelles tu as DÉJÀ travaillé. Une entreprise entre une seule fois, n'est jamais supprimée."},{t:"Normalize Domain — action native Clay",b:"Add Enrichment → Normalize Domain → Remove Prefixes. Enlève www., https://. Garder .com/.fr. Pas de formule LOWER/SUBSTITUTE."},{t:"Colonne Good Fit",b:"Synthétise les deux lookups en une seule condition. Évite de répéter des conditions complexes dans chaque Run if du workflow en aval."}],
   qq:["Comment normaliser un domaine ?","TAM Company vs TAM People ?","Export HubSpot pour Blocklist ?"]},
  {id:4,num:"04",name:"Sourcing & enrichissement",tag:"Data Ops",dur:"2h30",color:"#D97706",colorLight:"#FFFBEB",
   title:"Sourcing & enrichissement maîtrisés",
   intro:"Sourcer les bonnes entreprises, trouver les bons contacts, enrichir uniquement ce qui est qualifié.",
   steps:["Sourcer depuis Clay natif, URL Sales Nav, ou CSV Apollo","Lookup TAM + Blocklist → colonne Good Fit = 'Approved'","Find People (version gratuite) depuis Approved Companies — 5 contacts max par entreprise","Filtres job title : 'similar to' pour le volume, 'is exactly' pour la précision","Cascade email : Full Enrich → Dropcontact → Enrichley validation","Save and Run sur 5-10 lignes avant de lancer sur toute la base"],
   rules:[{n:"01",r:"Aucun contact n'est sourcé si l'entreprise n'a pas passé le filtre TAM + Blocklist."},{n:"02",r:"Toujours Save and Run sur 5-10 lignes. 3 crédits × 5000 lignes = 15 000 crédits perdus si le prompt est mauvais."},{n:"03",r:"La cascade email s'arrête dès qu'un email valide est trouvé — c'est ça le waterfall."}],
   concepts:[{t:"Clay vs Apollo vs Sales Navigator",b:"Clay : data à jour, moins de volume. Apollo : plus de volume, data parfois moins fraîche. Sales Nav : coller l'URL dans Clay (Find Companies → Company Identifiers). Workflow optimal : sourcer Apollo/Sales Nav → CSV → tout dans Clay."},{t:"Find People — les bons filtres",b:"'similar to' = volume avec quelques déchets. 'is exactly' = précision. Maximum months in current role = signal recrutement récent. 5 contacts max par entreprise."},{t:"Cascade email waterfall",b:"Full Enrich en 1er, Dropcontact en fallback, Enrichley pour la validation. Activer 'Require validation success'. Run if : Good Fit = Approved."}],
   qq:["Comment importer une URL Sales Nav ?","Pourquoi 5 contacts max ?","Full Enrich vs Dropcontact ?"]},
  {id:5,num:"05",name:"Copy & icebreakers",tag:"Messaging",dur:"2h",color:"#BE185D",colorLight:"#FDF2F8",
   title:"Copy outbound & séquences multicanales",
   intro:"Un bon message outbound ne vend pas. Il ouvre une conversation. La personnalisation utile repose sur un signal réel.",
   steps:["Identifier le signal disponible ou l'enjeu sectoriel si aucun signal","Définir le persona et le canal (LinkedIn ou email)","Structurer : Observation → Supposition prudente → Question ouverte","Configurer l'agent IA dans Clay avec le contexte client et les directives","Tester sur 5-10 lignes et faire valider le ton par le client","Run if : Good Fit = Approved uniquement"],
   rules:[{n:"01",r:"L'icebreaker ne s'utilise que si tu as un signal réel. Sans signal : enjeu sectoriel universel. Jamais de chiffres inventés."},{n:"02",r:"L'agent IA ne génère des icebreakers que sur les entreprises approuvées. Run if : Good Fit = Approved."},{n:"03",r:"Clay réécrit le prompt automatiquement — lire la version réécrite avant de lancer."}],
   concepts:[{t:"Personnalisation utile vs cosmétique",b:"Cosmétique : prénom, logo, poste, secteur générique. Utile : signal réel et récent. La personnalisation utile montre que tu as fait des recherches sur cette entreprise spécifiquement."},{t:"Configurer l'agent IA icebreaker",b:"Donner le contexte client, le persona, la structure obligatoire et le formatage. Les modèles évoluent vite — tester sur 5-10 lignes, c'est la seule vraie référence."},{t:"Séquences multicanales",b:"LinkedIn : jamais de message dans la demande de connexion. Email : sous-domaines dédiés + warm-up. Espacement : J0 · J3 · J7 · J14."}],
   qq:["Comment rédiger un prompt icebreaker ?","Quel modèle IA choisir ?","Connexion LinkedIn sans message ?"]},
  {id:6,num:"06",name:"Déploiement & prod",tag:"Ops",dur:"2h",color:"#059669",colorLight:"#ECFDF5",
   title:"Déploiement, validation & mise en production",
   intro:"Mettre en production un système sécurisé. Tester, valider, activer le schedule sans exposer de clients ni brûler de crédits.",
   steps:["Construire manuellement — Run if sur chaque colonne","Tester sur 5-10 lignes : domaines, blocklist, enrichissements","Tester l'export vers Heyreach / CRM : mapping des champs","Valider Is Outreach Ready (6 conditions simultanées)","Activer Run on Schedule UNIQUEMENT après validation complète","Activer Auto-Update colonne par colonne"],
   rules:[{n:"01",r:"Run on Schedule ne s'active JAMAIS sur un workflow non validé. Une erreur se répète à l'infini."},{n:"02",r:"Tester sur 5-10 lignes avant tout déploiement. L'auto-update amplifie les erreurs."},{n:"03",r:"Aucun export sans Is Outreach Ready = TRUE. Les 6 conditions doivent être vraies simultanément."}],
   concepts:[{t:"Is Outreach Ready — les 6 conditions",b:"Company Status = Approved · Lead Status = Approved · Work Email = VALID · Job Title not empty · LinkedIn URL exists · Not in Blocklist. Si une seule est fausse, le lead ne part pas en campagne."},{t:"Ordre strict de mise en production",b:"Manuel → test 5-10 lignes → test export → validation checklist → activation schedule. Jamais l'inverse."},{t:"Fréquences recommandées",b:"Weekly par défaut — suffisant pour la plupart des cas. Daily uniquement si volume maîtrisé et workflow parfaitement validé."}],
   qq:["Fréquence pour le schedule ?","Quand activer l'auto-update ?","Comment monitorer le workflow ?"]},
];

/* ─── Markdown renderer ─── */
const renderMsg = (text) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (!line.trim()) return <div key={i} style={{height:6}}/>;

    // Parse inline bold (**text**)
    const parseBold = (str) => {
      const parts = str.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, j) =>
        j % 2 === 1
          ? <strong key={j} style={{fontWeight:700, color:'inherit'}}>{part}</strong>
          : part
      );
    };

    // Bullet point
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      const content = line.trim().slice(2);
      return (
        <div key={i} style={{display:'flex',gap:7,alignItems:'flex-start',marginBottom:3}}>
          <span style={{color:TM,fontWeight:700,fontSize:14,lineHeight:'1.6',flexShrink:0}}>·</span>
          <span style={{lineHeight:1.65}}>{parseBold(content)}</span>
        </div>
      );
    }

    // Numbered list
    const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      return (
        <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:4}}>
          <span style={{background:TL,color:T,fontSize:10,fontWeight:700,borderRadius:5,padding:'2px 6px',flexShrink:0,marginTop:2}}>{numMatch[1]}</span>
          <span style={{lineHeight:1.65}}>{parseBold(numMatch[2])}</span>
        </div>
      );
    }

    // Regular line
    return <div key={i} style={{lineHeight:1.7,marginBottom:2}}>{parseBold(line)}</div>;
  });
};

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

  // Copywriting Agent
  const [cpForm, setCpForm] = useState({activite:'',persona:'',signal:'recrutement',canal:'multicanal',enjeu:'',ton:'conversationnel'});
  const [cpResult, setCpResult] = useState(null);
  const [cpLoading, setCpLoading] = useState(false);
  const [cpErr, setCpErr] = useState('');
  const [cpCopied, setCpCopied] = useState('');

  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs, typing]);

  const SYSTEM = `Tu es le tuteur expert de la formation "Outbound Automation System" créée par Antoine Beliaeff (Rerow). Tu formes des PME B2B françaises — SaaS, cabinets d'experts, équipes commerciales 1-5 personnes.

RÈGLES : Français · 3-5 phrases max · Opérationnel · Action Clay exacte quand c'est technique.

STACK : Clay = seul élément fixe. Sourcing : Clay natif + Apollo + Sales Nav. Email waterfall : Full Enrich → Dropcontact · Validation : Enrichley. LinkedIn : Heyreach. Email outreach : Lemlist ou Smartlead. CRM : HubSpot.

ACTIONS CLAY :
- Normalize Domain : Add Enrichment → Normalize Domain → Remove Prefixes (PAS de LOWER/SUBSTITUTE)
- Lookup : Add Action → Lookup Single Row in Other Table → clé = domaine normalisé
- Good Fit : return 'Approved' if [Dedup Blocklist] has found no record AND [Lookup TAM] has found no record
- Find People : version gratuite · 5 contacts max/entreprise · Run if Lead Status = Approved
- Cascade email : Full Configuration → Waterfall → Full Enrich → Dropcontact → Enrichley

MODÈLES IA : Évoluent vite — toujours tester sur 5-10 lignes. Le testing est la seule vraie référence.
CRÉDITS : Save and Run 5-10 lignes avant. 3 crédits × 5000 lignes = 15 000 crédits.
ICEBREAKER : Pose des questions sur le secteur, persona, canal et signal AVANT de recommander. Observation → Supposition → Question. Jamais de chiffres inventés.

FIL ROUGE (cas pratique de référence) : Syncflow, SaaS RH & onboarding, 2 commerciaux, cible DRH/HRBP dans PME 100-500 salariés France. Stack : Clay + Apollo + HubSpot + Lemlist. Budget : Starter 50k crédits/mois.`;

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
    const saved = sg(`oas:msgs:${user?.email}:${id}`)||[];
    setMsgs(saved.length?saved:[{role:'ai',content:`Bienvenue dans le Module ${m.num} — ${m.name}. 👆 Clique sur n'importe quel élément du schéma pour l'explorer, ou pose-moi une question ci-dessous.`}]);
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
    const lines = ['══════════════════════════════════════════════════════','  RAPPORT — OUTBOUND AUTOMATION SYSTEM','══════════════════════════════════════════════════════','',
      `  Apprenant  : ${user.email}`,`  Date       : ${date}`,`  Progression: ${done.length}/${MODULES.length} modules (${Math.round(done.length/MODULES.length*100)}%)`,
      '','──────────────────────────────────────────────────────',
      ...MODULES.map(m=>{const p=prog[m.id];return p?.done?`  ✓  Module ${m.num} — ${m.name}\n     Complété le ${new Date(p.at).toLocaleDateString('fr-FR')} · ${p.q||0} question(s)`:`  ○  Module ${m.num} — ${m.name}`;}),
      '','──────────────────────────────────────────────────────',
      next?`  → Prochaine étape : Module ${next.num} — ${next.name}`:'  → Formation complétée !',
      '','  Antoine Beliaeff · linkedin.com/in/antoine-beliaeff-8038b8196',
      '══════════════════════════════════════════════════════',
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

  const generateCopy = async () => {
    if(!cpForm.activite||!cpForm.persona||!cpForm.enjeu){ setCpErr('Remplis tous les champs obligatoires.'); return; }
    setCpLoading(true); setCpErr(''); setCpResult(null);
    const signalLabel = {recrutement:'recrutement actif sur un poste cible',levee:'levée de fonds récente',expansion:'expansion géographique ou ouverture de nouveaux sites',poste:'nouveau décideur en poste depuis moins de 6 mois',aucun:'aucun signal disponible — utiliser un enjeu sectoriel universel'}[cpForm.signal];
    const prompt = `Tu es un expert en copywriting outbound B2B. Génère une séquence de prospection complète.

CONTEXTE CLIENT :
- Activité : ${cpForm.activite}
- Persona ciblé : ${cpForm.persona}
- Signal disponible : ${signalLabel}
- Canal : ${cpForm.canal}
- Enjeu principal du persona : ${cpForm.enjeu}
- Ton : ${cpForm.ton}

RÈGLES ABSOLUES :
- Jamais de vente directe au premier contact
- Jamais de chiffres inventés — si tu mentionnes des données, elles doivent être plausibles
- Jamais de flatterie ("impressionnant", "bravo", "félicitations")
- Structure : Observation → Supposition prudente ("j'imagine que...", "je me demandais si...") → Question ouverte
- LinkedIn : 2-3 phrases max, jamais de message dans la demande de connexion
- Email : 5-6 lignes max, objet court (5 mots max), pas de signature dans le corps
- Ton conversationnel et humain — pas corporate

RETOURNE UNIQUEMENT ce JSON valide, sans markdown, sans backticks :
{
  "linkedin": {
    "message_j0": "...",
    "followup_j14": "..."
  },
  "email": {
    "j0": {"objet": "...", "corps": "..."},
    "j3": {"objet": "...", "corps": "..."},
    "j7": {"objet": "...", "corps": "..."}
  },
  "règles_appliquées": ["...", "...", "..."]
}`;
    try {
      const r = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:1200,
          system:'Tu es un expert copywriter outbound B2B. Tu réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks, sans texte autour.',
          messages:[{role:'user',content:prompt}]
        })
      });
      const d = await r.json();
      const raw = d.content?.[0]?.text||'';
      const clean = raw.replace(/```json|```/g,'').trim();
      const parsed = JSON.parse(clean);
      setCpResult(parsed);
    } catch(e){ setCpErr('Erreur de génération. Réessaie.'); }
    setCpLoading(false);
  };

  const copyText = (key, text) => {
    navigator.clipboard?.writeText(text).catch(()=>{});
    setCpCopied(key); setTimeout(()=>setCpCopied(''),2500);
  };

  const doneCount = MODULES.filter(m=>prog[m.id]?.done).length;
  const pct = Math.round(doneCount/MODULES.length*100);
  const curMod = MODULES.find(m=>m.id===modId);
  const curCas = modId ? CAS[modId-1] : null;
  const schemas = curMod ? makeSchemas(chat) : {};

  const btn = (bg,col,ex) => ({padding:'9px 18px',borderRadius:9,background:bg,color:col||'white',border:'none',cursor:'pointer',fontSize:14,fontWeight:600,...ex});
  const tagSt = (bg,col) => ({fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:bg,color:col});

  /* LOGIN */
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
            <div style={{fontSize:22,fontWeight:800,color:'#111827',marginBottom:6}}>Accède à ta formation</div>
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

  /* ADMIN */
  if(view==='admin') return (
    <>
      <Head><title>OAS — Admin</title></Head>
      <div style={{minHeight:'100vh',background:'#F4F6F5'}}>
        <div style={{background:'white',borderBottom:'1px solid #E5E7EB',padding:'13px 28px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:30,height:30,borderRadius:8,background:T,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white'}}>OA</div>
            <span style={{fontSize:15,fontWeight:700}}>OAS Platform</span>
            <span style={tagSt(TL,T)}>Admin</span>
          </div>
          <button onClick={logout} style={btn('white','#6B7280',{border:'1px solid #E5E7EB',fontSize:13,padding:'6px 14px'})}>Déconnexion</button>
        </div>
        <div style={{maxWidth:720,margin:'0 auto',padding:28}}>
          <div style={{background:'white',borderRadius:12,border:'1px solid #E5E7EB',padding:24,marginBottom:18}}>
            <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Générer un code d'accès</div>
            <div style={{fontSize:13,color:'#6B7280',marginBottom:18}}>Code par défaut : <code style={{background:TL,color:T,padding:'2px 7px',borderRadius:5,fontWeight:700}}>OAS2025</code></div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <button onClick={genCode} style={btn(T)}>+ Générer un code</button>
              {copied && <><code style={{padding:'7px 14px',borderRadius:8,background:TL,color:T,fontSize:16,fontWeight:800}}>{copied}</code><span style={{fontSize:13,color:TM,fontWeight:600}}>✓ Copié !</span></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  /* DASHBOARD */
  if(view==='dash') return (
    <>
      <Head><title>OAS — Dashboard</title></Head>
      <div style={{minHeight:'100vh',background:'#F4F6F5'}}>
        <div style={{background:'white',borderBottom:'1px solid #E5E7EB',padding:'13px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:30,height:30,borderRadius:8,background:T,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white'}}>OA</div>
            <span style={{fontSize:15,fontWeight:700,color:'#111827'}}>Outbound Automation System</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <button onClick={exportReport} style={btn('white','#374151',{border:'1px solid #E5E7EB',fontSize:13,padding:'7px 14px'})}>↓ Rapport</button>
            <span style={{fontSize:13,color:'#9CA3AF'}}>{user?.email}</span>
            <button onClick={logout} style={{fontSize:12,color:'#9CA3AF',background:'none',border:'none',cursor:'pointer'}}>Déco</button>
          </div>
        </div>
        <div style={{maxWidth:820,margin:'0 auto',padding:'28px 24px'}}>
          <div style={{background:`linear-gradient(135deg,${TD},${T},${TM})`,borderRadius:18,padding:'26px 32px',marginBottom:26,color:'white',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-30,right:-30,width:180,height:180,borderRadius:'50%',background:'rgba(255,255,255,0.05)'}}/>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:16,position:'relative'}}>
              <div>
                <div style={{fontSize:13,opacity:.75,marginBottom:5,fontWeight:500}}>Ta progression globale</div>
                <div style={{fontSize:28,fontWeight:800}}>{doneCount}/{MODULES.length} modules complétés</div>
                {doneCount===0&&<div style={{fontSize:13,opacity:.7,marginTop:8}}>Commence par le Module 01 →</div>}
              </div>
              <div style={{fontSize:48,fontWeight:800,opacity:.85}}>{pct}%</div>
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
                    <span style={tagSt(isDone?'#D1FAE5':m.colorLight,isDone?'#059669':m.color)}>{isDone?'✓ Complété':m.tag}</span>
                    <span style={{fontSize:11,color:'#9CA3AF'}}>{m.dur}</span>
                  </div>
                  <div style={{fontSize:12,color:'#9CA3AF',marginBottom:4,fontWeight:600}}>Module {m.num}</div>
                  <div style={{fontSize:15,fontWeight:700,color:'#111827',lineHeight:1.35,marginBottom:isDone||isNext?10:0}}>{m.name}</div>
                  {isDone&&<div style={{fontSize:12,color:'#6B7280'}}>{prog[m.id].q||0} question(s) posée(s)</div>}
                  {isNext&&!isDone&&<div style={{fontSize:12,color:'#3B82F6',fontWeight:600}}>→ Commence ici</div>}
                </div>
              );
            })}
          </div>

          {/* OUTILS */}
          <div style={{marginTop:32}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <div style={{fontSize:16,fontWeight:800,color:'#111827',letterSpacing:'-0.3px'}}>Outils</div>
              <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'#FEF3C7',color:'#92400E'}}>Applique ce que tu as appris</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
              <div onClick={()=>setView('copywriting')}
                style={{background:'white',borderRadius:14,border:'1px solid #E5E7EB',cursor:'pointer',padding:20,transition:'all .15s'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:36,height:36,borderRadius:9,background:'#FDF2F8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>✍️</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:'#111827'}}>Copywriting Agent</div>
                    <div style={{fontSize:12,color:'#9CA3AF'}}>Module 05 — Messaging</div>
                  </div>
                </div>
                <div style={{fontSize:13,color:'#6B7280',lineHeight:1.6}}>Génère une séquence outbound complète — LinkedIn + Email — basée sur ton ICP, ton signal et l'enjeu de ton persona.</div>
                <div style={{marginTop:12,fontSize:12,color:'#BE185D',fontWeight:600}}>Lancer l'outil →</div>
              </div>
              <div style={{background:'white',borderRadius:14,border:'1px dashed #D1D5DB',padding:20,opacity:.6}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:36,height:36,borderRadius:9,background:'#F9FAFB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🔍</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:'#111827'}}>Scraping Agent</div>
                    <div style={{fontSize:12,color:'#9CA3AF'}}>Module 02 — Ciblage</div>
                  </div>
                </div>
                <div style={{fontSize:13,color:'#6B7280',lineHeight:1.6}}>Décris ton ICP et génère une URL Apollo.io prête à importer dans Clay avec le workflow de cleaning adapté.</div>
                <div style={{marginTop:12,fontSize:12,color:'#9CA3AF',fontWeight:600}}>Bientôt disponible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  /* MODULE */
  if(view==='mod'&&curMod) return (
    <>
      <Head><title>OAS — Module {curMod.num}</title></Head>
      <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'#F4F6F5',overflow:'hidden'}}>
        <div style={{background:'white',borderBottom:'1px solid #E5E7EB',padding:'10px 20px',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
          <button onClick={()=>setView('dash')} style={{fontSize:13,color:'#6B7280',background:'none',border:'1px solid #E5E7EB',padding:'5px 12px',borderRadius:7,cursor:'pointer',fontWeight:500}}>← Dashboard</button>
          <div style={{height:16,width:1,background:'#E5E7EB'}}/>
          <span style={tagSt(curMod.colorLight,curMod.color)}>{curMod.tag}</span>
          <span style={{fontSize:13,color:'#374151',fontWeight:600}}>Module {curMod.num} — {curMod.name}</span>
          <div style={{flex:1}}/>
          {!prog[modId]?.done
            ?<button onClick={markDone} style={btn(T,'white',{fontSize:13,padding:'7px 16px'})}>✓ Marquer complété</button>
            :<span style={{fontSize:13,color:TM,fontWeight:700}}>✓ Complété</span>}
        </div>

        <div style={{flex:1,display:'flex',overflow:'hidden'}}>
          {/* Content */}
          <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div style={{padding:'16px 24px 0',flexShrink:0,background:'white',borderBottom:'1px solid #E5E7EB'}}>
              <div style={{fontSize:11,color:curMod.color,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',marginBottom:4}}>{curMod.tag} · {curMod.dur}</div>
              <div style={{fontSize:20,fontWeight:800,color:'#111827',marginBottom:4,lineHeight:1.25}}>{curMod.title}</div>
              <div style={{fontSize:13,color:'#6B7280',fontStyle:'italic',lineHeight:1.6,marginBottom:12}}>{curMod.intro}</div>
              <div style={{display:'flex',gap:0}}>
                {[
                  {id:'schema',label:'Schéma'},
                  {id:'steps', label:'Étapes Clay'},
                  {id:'rules', label:'Règles'},
                  {id:'concepts',label:'Concepts'},
                  {id:'cas',   label:'📋 Cas pratique'},
                ].map(t=>(
                  <button key={t.id} onClick={()=>setTab(t.id)}
                    style={{fontSize:13,fontWeight:tab===t.id?600:500,padding:'8px 14px',cursor:'pointer',background:'none',border:'none',borderBottom:`2px solid ${tab===t.id?curMod.color:'transparent'}`,color:tab===t.id?curMod.color:'#6B7280',marginBottom:-1,transition:'all .12s',whiteSpace:'nowrap'}}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{flex:1,overflowY:'auto',padding:'20px 24px 24px'}}>
              {tab==='schema' && (
                <div>
                  <div style={{background:'white',borderRadius:12,border:'1px solid #E5E7EB',padding:'16px 16px 10px'}}>
                    {schemas[modId]}
                  </div>
                  <div style={{marginTop:10,padding:'8px 12px',background:curMod.colorLight,borderRadius:8,fontSize:12,color:curMod.color,fontWeight:500}}>
                    👆 Clique sur n'importe quel élément — le tuteur t'explique l'action correspondante dans Clay.
                  </div>
                </div>
              )}
              {tab==='steps' && (
                <div>
                  {curMod.steps.map((s,i)=>(
                    <div key={i}>
                      <div style={{display:'flex',gap:12,alignItems:'flex-start',background:'white',borderRadius:9,border:'1px solid #E5E7EB',padding:'12px 14px'}}>
                        <div style={{width:24,height:24,borderRadius:'50%',background:T,color:'white',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>{String(i+1).padStart(2,'0')}</div>
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
              {tab==='cas' && curCas && (
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {/* Fil rouge banner */}
                  <div style={{background:`linear-gradient(135deg,${TD},${T})`,borderRadius:12,padding:'14px 18px',color:'white'}}>
                    <div style={{fontSize:11,opacity:.75,fontWeight:600,letterSpacing:'.05em',textTransform:'uppercase',marginBottom:4}}>Fil rouge · {FIL.company}</div>
                    <div style={{fontSize:14,fontWeight:700,marginBottom:2}}>{FIL.desc}</div>
                    <div style={{fontSize:12,opacity:.85}}>{curCas.context}</div>
                  </div>
                  {/* Problem */}
                  <div style={{background:'#FEF2F2',border:'1px solid #FCA5A5',borderRadius:10,padding:'12px 16px'}}>
                    <div style={{fontSize:11,fontWeight:700,color:'#991B1B',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:5}}>⚠ Problème de départ</div>
                    <div style={{fontSize:13,color:'#7F1D1D',lineHeight:1.65}}>{curCas.problem}</div>
                  </div>
                  {/* Actions */}
                  <div style={{background:'white',border:'1px solid #E5E7EB',borderRadius:10,padding:'14px 16px'}}>
                    <div style={{fontSize:11,fontWeight:700,color:TD,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:10}}>Actions réalisées dans Clay</div>
                    {curCas.actions.map((a,i)=>(
                      <div key={i}>
                        <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                          <div style={{width:22,height:22,borderRadius:6,background:TL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:T,flexShrink:0,marginTop:1}}>{i+1}</div>
                          <div>
                            <div style={{fontSize:12,fontWeight:700,color:'#111827',marginBottom:2}}>{a.label}</div>
                            <div style={{fontSize:12,color:'#6B7280',lineHeight:1.6}}>{a.text}</div>
                          </div>
                        </div>
                        {i<curCas.actions.length-1&&<div style={{height:1,background:'#F3F4F6',margin:'10px 0 10px 32px'}}/>}
                      </div>
                    ))}
                  </div>
                  {/* Result */}
                  <div style={{background:'#F0FAF5',border:'1px solid #A7F3D0',borderRadius:10,padding:'12px 16px'}}>
                    <div style={{fontSize:11,fontWeight:700,color:TD,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:5}}>✓ Résultat</div>
                    <div style={{fontSize:13,color:'#064E3B',lineHeight:1.65}}>{curCas.result}</div>
                  </div>
                  {/* Tip */}
                  <div style={{background:'#FFFBEB',border:'1px solid #FDE68A',borderRadius:10,padding:'12px 16px',display:'flex',gap:10,alignItems:'flex-start'}}>
                    <span style={{fontSize:16,flexShrink:0}}>💡</span>
                    <div style={{fontSize:12,color:'#92400E',lineHeight:1.65,fontWeight:500}}>{curCas.tip}</div>
                  </div>
                  {/* CTA tuteur */}
                  <button onClick={()=>chat(`Je travaille sur un cas similaire à Syncflow pour ce module. Aide-moi à adapter les actions à mon client.`)}
                    style={{...btn(T,'white',{fontSize:13,padding:'11px',width:'100%',marginTop:2}),textAlign:'center'}}>
                    → Adapter ce cas à mon client avec le tuteur
                  </button>
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

          {/* TUTOR */}
          <div style={{width:420,minWidth:420,borderLeft:'1px solid #E5E7EB',display:'flex',flexDirection:'column',background:'white',flexShrink:0}}>
            <div style={{padding:'13px 16px',borderBottom:'1px solid #F3F4F6',background:'#FAFDF8',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
              <div style={{width:32,height:32,borderRadius:'50%',background:TL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:T}}>OA</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#111827'}}>Tuteur OAS</div>
                <div style={{fontSize:11,color:TM,fontWeight:500}}>● Propulsé par Claude</div>
              </div>
            </div>
            <div style={{padding:'7px 14px',background:'#F0FAF5',borderBottom:'1px solid #C5E8D8',fontSize:11,color:T,lineHeight:1.5,flexShrink:0}}>
              Module {curMod.num} — {curMod.name}<br/>
              <span style={{color:'#6B7280',fontStyle:'italic'}}>Clique sur le schéma ou pose une question.</span>
            </div>

            <div style={{flex:1,overflowY:'auto',padding:14,display:'flex',flexDirection:'column',gap:11}}>
              {msgs.map((m,i)=>(
                <div key={i} style={{display:'flex',flexDirection:'column',alignItems:m.role==='user'?'flex-end':'flex-start'}}>
                  <div style={{fontSize:10,color:'#9CA3AF',marginBottom:3,fontWeight:600}}>{m.role==='user'?'Toi':'Tuteur OAS'}</div>
                  <div style={{maxWidth:'96%',padding:'11px 14px',borderRadius:12,fontSize:13,lineHeight:1.7,background:m.role==='user'?T:'#F3F4F6',color:m.role==='user'?'white':'#111827',borderBottomLeftRadius:m.role==='ai'?3:11,borderBottomRightRadius:m.role==='user'?3:11}}>
                    {m.role==="ai" ? renderMsg(m.content) : m.content}
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
                <button key={i} onClick={()=>chat(q)} style={{fontSize:11,padding:'4px 10px',borderRadius:20,border:`1.5px solid ${TM}`,color:T,background:TL,cursor:'pointer',fontWeight:500}}>{q}</button>
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
      <style>{`@keyframes oasBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}`}</style>
    </>
  );


  /* COPYWRITING AGENT */
  if(view==='copywriting') {
    const SIGNALS = [
      {v:'recrutement', l:'Recrutement actif', e:'Offre d'emploi sur un poste cible détectée'},
      {v:'levee',       l:'Levée de fonds',    e:'Financement récent — budget disponible'},
      {v:'expansion',   l:'Expansion',          e:'Ouverture de nouveaux sites ou marchés'},
      {v:'poste',       l:'Nouveau décideur',   e:'Changement de poste récent (< 6 mois)'},
      {v:'aucun',       l:'Aucun signal',        e:'Enjeu sectoriel universel utilisé'},
    ];
    const CANAUX = [{v:'linkedin',l:'LinkedIn seulement'},{v:'email',l:'Email seulement'},{v:'multicanal',l:'LinkedIn + Email'}];
    const TONS = [{v:'conversationnel',l:'Conversationnel'},{v:'professionnel',l:'Professionnel'},{v:'direct',l:'Direct & concis'}];

    const inp2 = (val, key, ph, multiline) => {
      const s = {width:'100%',border:'1.5px solid #E5E7EB',borderRadius:9,padding:'10px 13px',fontSize:13,outline:'none',boxSizing:'border-box',color:'#111827',background:'#FAFAFA',fontFamily:'inherit',resize:'none',transition:'border-color .15s'};
      return multiline
        ? <textarea value={val} onChange={e=>setCpForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} rows={3} style={{...s,minHeight:80}} onFocus={e=>e.target.style.borderColor=T} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>
        : <input value={val} onChange={e=>setCpForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} style={s} onFocus={e=>e.target.style.borderColor=T} onBlur={e=>e.target.style.borderColor='#E5E7EB'}/>;
    };

    const sel = (key, options) => (
      <select value={cpForm[key]} onChange={e=>setCpForm(f=>({...f,[key]:e.target.value}))}
        style={{width:'100%',border:'1.5px solid #E5E7EB',borderRadius:9,padding:'10px 13px',fontSize:13,outline:'none',boxSizing:'border-box',color:'#111827',background:'#FAFAFA',appearance:'none',cursor:'pointer'}}>
        {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    );

    const MsgCard = ({title, tag, content, copyKey, color, colorLight}) => (
      <div style={{background:'white',border:`1px solid #E5E7EB`,borderLeft:`3px solid ${color}`,borderRadius:10,padding:'14px 16px',marginBottom:10}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:13,fontWeight:700,color:'#111827'}}>{title}</span>
            <span style={{fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:12,background:colorLight,color:color}}>{tag}</span>
          </div>
          <button onClick={()=>copyText(copyKey, content)}
            style={{fontSize:11,padding:'4px 10px',borderRadius:6,border:`1px solid ${cpCopied===copyKey?color:'#E5E7EB'}`,background:cpCopied===copyKey?colorLight:'white',color:cpCopied===copyKey?color:'#6B7280',cursor:'pointer',fontWeight:500,transition:'all .15s'}}>
            {cpCopied===copyKey?'✓ Copié !':'Copier'}
          </button>
        </div>
        <div style={{fontSize:13,color:'#374151',lineHeight:1.75,whiteSpace:'pre-wrap',background:'#F9FAFB',borderRadius:7,padding:'10px 12px'}}>{content}</div>
      </div>
    );

    return (
      <>
        <Head><title>OAS — Copywriting Agent</title></Head>
        <div style={{minHeight:'100vh',background:'#F4F6F5'}}>
          <div style={{background:'white',borderBottom:'1px solid #E5E7EB',padding:'12px 28px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:10}}>
            <button onClick={()=>{setView('dash');setCpResult(null);setCpErr('');}} style={{fontSize:13,color:'#6B7280',background:'none',border:'1px solid #E5E7EB',padding:'5px 12px',borderRadius:7,cursor:'pointer',fontWeight:500}}>← Dashboard</button>
            <div style={{height:16,width:1,background:'#E5E7EB'}}/>
            <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'#FDF2F8',color:'#BE185D'}}>Messaging</span>
            <span style={{fontSize:14,fontWeight:700,color:'#111827'}}>✍️ Copywriting Agent</span>
            <span style={{fontSize:12,color:'#9CA3AF',marginLeft:2}}>— Module 05 appliqué</span>
          </div>

          <div style={{maxWidth:1100,margin:'0 auto',padding:'28px 24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,alignItems:'start'}}>
            {/* FORM */}
            <div>
              <div style={{background:'white',borderRadius:14,border:'1px solid #E5E7EB',padding:24,boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <div style={{fontSize:15,fontWeight:800,color:'#111827',marginBottom:4}}>Configuration</div>
                <div style={{fontSize:13,color:'#9CA3AF',marginBottom:20}}>Remplis le contexte — le tuteur génère la séquence.</div>

                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>Activité de ton client <span style={{color:'#DC2626'}}>*</span></label>
                  {inp2(cpForm.activite,'activite','Ex : SaaS de gestion RH & onboarding pour PME')}
                </div>

                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>Persona ciblé <span style={{color:'#DC2626'}}>*</span></label>
                  {inp2(cpForm.persona,'persona','Ex : DRH & HRBP dans des PME 100-500 salariés, France')}
                </div>

                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>Signal disponible</label>
                  {sel('signal', SIGNALS)}
                  <div style={{fontSize:11,color:'#9CA3AF',marginTop:4}}>{SIGNALS.find(s=>s.v===cpForm.signal)?.e}</div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>Canal</label>
                    {sel('canal', CANAUX)}
                  </div>
                  <div>
                    <label style={{fontSize:12,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>Ton</label>
                    {sel('ton', TONS)}
                  </div>
                </div>

                <div style={{marginBottom:20}}>
                  <label style={{fontSize:12,fontWeight:600,color:'#374151',display:'block',marginBottom:6}}>Enjeu principal du persona <span style={{color:'#DC2626'}}>*</span></label>
                  {inp2(cpForm.enjeu,'enjeu','Ex : mobiliser rapidement les bons profils lors des pics d'activité sans surcharger les équipes',true)}
                </div>

                {cpErr && <div style={{fontSize:13,color:'#DC2626',background:'#FEF2F2',padding:'9px 13px',borderRadius:8,marginBottom:16,fontWeight:500}}>{cpErr}</div>}

                <button onClick={generateCopy} disabled={cpLoading}
                  style={{width:'100%',padding:'13px',borderRadius:10,background:cpLoading?'#9CA3AF':T,color:'white',border:'none',cursor:cpLoading?'not-allowed':'pointer',fontSize:14,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  {cpLoading
                    ? <><div style={{width:16,height:16,borderRadius:'50%',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',animation:'oasSpin 0.8s linear infinite'}}/> Génération en cours...</>
                    : '✨ Générer la séquence'}
                </button>
              </div>

              {/* Rappel Module 05 */}
              <div style={{background:TL,borderRadius:10,border:`1px solid #A7F3D0`,padding:'12px 16px',marginTop:14}}>
                <div style={{fontSize:12,fontWeight:700,color:TD,marginBottom:6}}>📖 Rappel Module 05</div>
                <div style={{fontSize:12,color:'#065F46',lineHeight:1.7}}>
                  <div>• Observation → Supposition → Question ouverte</div>
                  <div>• Jamais de message dans la demande de connexion LinkedIn</div>
                  <div>• Email : sous-domaines dédiés + warm-up avant d'envoyer</div>
                  <div>• Tester le ton avec le client avant de lancer la séquence</div>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div>
              {!cpResult && !cpLoading && (
                <div style={{background:'white',borderRadius:14,border:'1px dashed #D1D5DB',padding:40,textAlign:'center'}}>
                  <div style={{fontSize:32,marginBottom:12}}>✍️</div>
                  <div style={{fontSize:14,fontWeight:600,color:'#374151',marginBottom:6}}>Ta séquence apparaîtra ici</div>
                  <div style={{fontSize:13,color:'#9CA3AF',lineHeight:1.6}}>Remplis le formulaire et clique sur "Générer". La séquence respecte les règles du Module 05.</div>
                </div>
              )}

              {cpLoading && (
                <div style={{background:'white',borderRadius:14,border:'1px solid #E5E7EB',padding:40,textAlign:'center'}}>
                  <div style={{width:32,height:32,borderRadius:'50%',border:'3px solid #E5E7EB',borderTopColor:T,animation:'oasSpin 0.8s linear infinite',margin:'0 auto 16px'}}/>
                  <div style={{fontSize:14,color:'#6B7280'}}>Génération de ta séquence...</div>
                </div>
              )}

              {cpResult && (
                <div>
                  {/* LinkedIn */}
                  {(cpForm.canal==='linkedin'||cpForm.canal==='multicanal') && cpResult.linkedin && (
                    <div style={{marginBottom:18}}>
                      <div style={{fontSize:12,fontWeight:700,color:'#374151',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:10,display:'flex',alignItems:'center',gap:8}}>
                        <span style={{fontSize:16}}>💼</span> LinkedIn
                        <span style={{fontSize:10,fontWeight:500,color:'#9CA3AF',textTransform:'none',letterSpacing:0}}>Connexion sans message → attend l'acceptation → envoie J0</span>
                      </div>
                      <MsgCard title="Message J0" tag="Après acceptation" content={cpResult.linkedin.message_j0} copyKey="li_j0" color="#185FA5" colorLight="#EFF6FF"/>
                      <MsgCard title="Follow-up J14" tag="Si pas de réponse" content={cpResult.linkedin.followup_j14} copyKey="li_j14" color="#185FA5" colorLight="#EFF6FF"/>
                    </div>
                  )}

                  {/* Email */}
                  {(cpForm.canal==='email'||cpForm.canal==='multicanal') && cpResult.email && (
                    <div style={{marginBottom:18}}>
                      <div style={{fontSize:12,fontWeight:700,color:'#374151',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:10,display:'flex',alignItems:'center',gap:8}}>
                        <span style={{fontSize:16}}>📧</span> Email
                        <span style={{fontSize:10,fontWeight:500,color:'#9CA3AF',textTransform:'none',letterSpacing:0}}>Sous-domaine dédié · Warm-up activé</span>
                      </div>
                      {[
                        {key:'j0', label:'Email J0', tag:'Premier contact'},
                        {key:'j3', label:'Follow-up J3', tag:'Relance'},
                        {key:'j7', label:'Follow-up J7', tag:'Dernier essai'},
                      ].map(e=>cpResult.email[e.key] && (
                        <div key={e.key}>
                          <MsgCard
                            title={e.label} tag={e.tag}
                            content={`Objet : ${cpResult.email[e.key].objet}

${cpResult.email[e.key].corps}`}
                            copyKey={`em_${e.key}`} color="#BE185D" colorLight="#FDF2F8"/>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rules applied */}
                  {cpResult.règles_appliquées && (
                    <div style={{background:'#FFFBEB',border:'1px solid #FDE68A',borderRadius:10,padding:'12px 16px'}}>
                      <div style={{fontSize:11,fontWeight:700,color:'#92400E',marginBottom:8,textTransform:'uppercase',letterSpacing:'.05em'}}>💡 Règles appliquées</div>
                      {cpResult.règles_appliquées.map((r,i)=>(
                        <div key={i} style={{fontSize:12,color:'#92400E',marginBottom:4,display:'flex',gap:6}}>
                          <span>✓</span><span style={{lineHeight:1.5}}>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button onClick={()=>{setCpResult(null);setCpErr('');}}
                    style={{width:'100%',padding:'10px',borderRadius:9,background:'white',color:'#6B7280',border:'1px solid #E5E7EB',cursor:'pointer',fontSize:13,fontWeight:500,marginTop:14}}>
                    ← Modifier et régénérer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes oasSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          @keyframes oasBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
        `}</style>
      </>
    );
  }

  return null;
}
