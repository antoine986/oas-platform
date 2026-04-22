import { useState, useRef } from "react";
import Head from "next/head";

const T = '#0F6E56';
const TL = '#E0F5EE';
const TM = '#1D9E75';
const TD = '#0A5241';
const CODE_USER = "OAS2025";
const CODE_ADMIN = "ADMIN-OAS";

const MODULES = [
  {
    id:1, num:"01", name:"Architecture de la machine", tag:"Fondations", dur:"1h30", color:"#7C3AED", colorLight:"#EDE9FE",
    title:"Architecture de la machine outbound",
    intro:"Comprendre pourquoi la majorité des équipes échouent et poser les bases d'un système fiable et opérable dans le temps.",
    objectives:["Comprendre la différence entre outbound tactique et outbound systémique","Identifier les 4 symptômes d'un outbound non structuré","Maîtriser le mental model Clay : moteur, cerveau, sortie","Connaître les 4 tables fondamentales et leur rôle"],
    rules:[
      {n:"01", r:"Clay est un moteur d'orchestration, pas un outil d'enrichissement en masse."},
      {n:"02", r:"Aucune action ne s'exécute sans condition Run if."},
      {n:"03", r:"Un workflow Clay doit être : manuel → testé → validé → automatisé."}
    ],
    concepts:[
      {t:"Les 4 symptômes d'un outbound non systémique",b:"Chaque campagne est un bricolage · La data se dégrade (doublons, clients recontactés) · Le sourcing coûte trop cher · Les résultats dépendent des personnes, pas du système."},
      {t:"Le mental model fondamental",b:"Clay = moteur · Conditions = cerveau · Outreach = sortie. Le problème n'est jamais le copywriting — c'est l'absence de machine opérable dans le temps."},
      {t:"Les 4 tables fondamentales",b:"TAM / Companies → Blocklist → Company/Prospects → Outreach Output. Règle absolue : 1 table = 1 fonction. Chaque table a un rôle unique et ne se substitue jamais à une autre."}
    ],
    qq:["C'est quoi un Run if ?","Pourquoi 1 table = 1 fonction ?","Clay vs Apollo ?"]
  },
  {
    id:2, num:"02", name:"ICP & signaux exploitables", tag:"Ciblage", dur:"1h30", color:"#2563EB", colorLight:"#EFF6FF",
    title:"ICP, segmentation & signaux exploitables",
    intro:"Définir un ICP directement filtrable dans Clay et une segmentation orientée opérations — pas théorique.",
    objectives:["Transformer un ICP générique en critères filtrables","Segmenter par signal et non seulement par secteur","Identifier les signaux de croissance exploitables","Structurer une base prête à être enrichie sans gaspillage"],
    rules:[
      {n:"01", r:"L'ICP doit être filtrable dans Clay, pas seulement lisible dans un deck."},
      {n:"02", r:"On segmente par signal, pas uniquement par secteur."},
      {n:"03", r:"Qualify before enrich : on n'enrichit que ce qui est validé."}
    ],
    concepts:[
      {t:"ICP actionnable vs théorique",b:"Un ICP théorique décrit votre client idéal. Un ICP actionnable est constitué de critères directement filtrables : taille, industrie, pays, keywords. Si tu ne peux pas le filtrer dans Clay, ce n'est pas un ICP opérationnel."},
      {t:"Les 3 niveaux de segmentation",b:"Firmographique (taille, secteur, pays) · Comportemental (technos utilisées) · Signal de croissance (recrutements, levée, expansion). Le niveau 3 est celui qui différencie vraiment."},
      {t:"Signaux exploitables concrets",b:"Recrutements actifs · Levée de fonds récente · Nouveau produit · Changement de leadership. Un signal = un événement observable qui indique une douleur ou une opportunité."}
    ],
    qq:["Comment détecter un signal dans Clay ?","Combien de segments ?","ICP B2B vs B2C ?"]
  },
  {
    id:3, num:"03", name:"Tables Clay & architecture data", tag:"Structure", dur:"2h", color:"#0891B2", colorLight:"#ECFEFF",
    title:"Architecture des tables Clay",
    intro:"Maîtriser la structure de données fondamentale sur laquelle tout repose — TAM, Blocklist, tables intermédiaires.",
    objectives:["Construire et gérer une TAM Table persistante","Configurer une blocklist globale et permanente","Créer des tables intermédiaires pour isoler les entreprises qualifiées","Normaliser les domaines pour éviter les doublons"],
    rules:[
      {n:"01", r:"La TAM Table est permanente. Une entreprise entre une seule fois, n'est jamais supprimée."},
      {n:"02", r:"La blocklist est globale et non négociable."},
      {n:"03", r:"Aucun contact ne sort sans Is Outreach Ready = TRUE."}
    ],
    concepts:[
      {t:"La TAM Table — mini-CRM de prospection",b:"Centralise toutes les entreprises sourcées. Évite toute reprospection accidentelle. Suivi de statut : Prospect → Contacté → En cours → Client → Closed Lost. Champs min : Company Name, Website, Domain normalisé, LinkedIn URL."},
      {t:"La Blocklist — protection systémique",b:"Sources : CRM client, anciens prospects, comptes sensibles, clients actifs. Domaine normalisé obligatoire (sans www., /fr /en). Action Clay : Lookup Single Row → Blocklist avant tout enrichissement."},
      {t:"La table intermédiaire Approved Companies",b:"Créée via Send data to table avec Run condition : Company Status = 'Qualified'. Seule entrée autorisée pour enrichissement, sourcing contact et automatisations downstream. Protège tes crédits Clay."}
    ],
    qq:["Comment normaliser un domaine ?","Lookup Single Row ?","TAM par client ?"]
  },
  {
    id:4, num:"04", name:"Sourcing & enrichissement", tag:"Data Ops", dur:"2h30", color:"#D97706", colorLight:"#FFFBEB",
    title:"Sourcing & enrichissement maîtrisés",
    intro:"Sourcer des entreprises et des contacts de façon propre, conditionnelle et sans aucun gaspillage de crédits Clay.",
    objectives:["Sourcer des entreprises depuis 5 sources différentes","Enrichir uniquement les entreprises validées","Configurer une cascade email intelligente (waterfall)","Valider les emails avant tout export"],
    rules:[
      {n:"01", r:"Aucun contact n'est sourcé si l'entreprise n'est pas validée."},
      {n:"02", r:"Déduplication AVANT enrichissement — toujours."},
      {n:"03", r:"La cascade email s'arrête dès qu'un email valide est trouvé."}
    ],
    concepts:[
      {t:"Sourcing entreprise — sources possibles",b:"Clay native source (Find Companies) · Google Sheet dynamique · Import CSV · Lien Sales Navigator. Règle critique : laisser la source en Manual — jamais d'auto-update avant validation du workflow complet."},
      {t:"Enrichissement entreprise — strict minimum",b:"À ce stade : Industry, Domain, LinkedIn Company URL, Employee Range, Country/City, Short Description. Pas d'enrichissement 'nice to have'. Coût = 0 si l'entreprise n'est pas qualifiée après."},
      {t:"Cascade email intelligente",b:"Waterfall sequence : providers dans l'ordre (ex : Enrow → FullEnrich). Stop dès qu'un email valide est trouvé. Activer Validation Provider + Require validation success = ON pour ne garder que les emails sûrs."}
    ],
    qq:["Meilleurs providers email ?","Limiter à 3 contacts/entreprise ?","Run if pour l'enrichissement ?"]
  },
  {
    id:5, num:"05", name:"Copy & séquences multicanales", tag:"Messaging", dur:"2h", color:"#BE185D", colorLight:"#FDF2F8",
    title:"Copy outbound & séquences multicanales",
    intro:"Écrire des messages qui ouvrent des conversations — pas qui vendent. Structure, icebreakers, et séquences multicanales.",
    objectives:["Maîtriser la structure Observation → Supposition → Question","Écrire des icebreakers basés sur des signaux réels","Construire une séquence email + LinkedIn cohérente","Utiliser Clay pour personnaliser à l'échelle sans inventer"],
    rules:[
      {n:"01", r:"Structure obligatoire : Observation → Supposition → Question."},
      {n:"02", r:"Jamais de chiffres inventés, jamais de flatterie, jamais de vente au premier contact."},
      {n:"03", r:"L'icebreaker ne s'utilise que quand tu as un signal exploitable réel."}
    ],
    concepts:[
      {t:"La structure qui fonctionne",b:"Commence par une observation naturelle. Formule une supposition prudente ('je me demandais si...', 'j'imagine que...'). Termine par une question ouverte courte. Maximum 2 phrases. Ton professionnel et naturel. Aucun emoji."},
      {t:"Personnalisation utile vs cosmétique",b:"Cosmétique : mentionner le prénom, le logo, le poste. Utile : mentionner un signal réel (recrutement, expansion, changement de tech). La personnalisation utile augmente les taux de réponse. La cosmétique ne fait que donner bonne conscience."},
      {t:"Séquences multicanales : ordre recommandé",b:"LinkedIn connexion → Email J0 → Relance valeur J3 → Breakup J7. Même angle, même ton, pas de répétition entre canaux. La cohérence cross-canal crée la familiarité sans être intrusif."}
    ],
    qq:["Prompt icebreaker générique ?","Combien de relances ?","LinkedIn vs email en FR ?"]
  },
  {
    id:6, num:"06", name:"Déploiement & mise en production", tag:"Ops", dur:"2h", color:"#059669", colorLight:"#ECFDF5",
    title:"Déploiement, validation & mise en production",
    intro:"Mettre en production un système sécurisé. Tester, valider, et activer le schedule sans exposer de clients ni brûler de crédits.",
    objectives:["Créer et valider la condition Is Outreach Ready","Tester le workflow sur 5-10 lignes avant tout déploiement","Exporter correctement vers Heyreach ou un CRM","Activer le Run on Schedule en toute sécurité"],
    rules:[
      {n:"01", r:"Run on schedule ne s'active JAMAIS sur un workflow non validé."},
      {n:"02", r:"Tester sur 5–10 lignes maximum avant tout déploiement."},
      {n:"03", r:"Aucun export sans Is Outreach Ready = TRUE."}
    ],
    concepts:[
      {t:"Is Outreach Ready — les 6 conditions",b:"Company Status = Approved · Lead Status = Approved · Work Email = VALID · Job Title non vide · LinkedIn URL existe · Non présent en Blocklist. Ces 6 conditions doivent être vraies simultanément. Aucune exception."},
      {t:"Ordre strict de mise en production",b:"1. Construire le workflow manuellement · 2. Tester sur 5–10 lignes · 3. Tester l'export · 4. Valider la checklist · 5. Activer le Run on schedule UNIQUEMENT après. Jamais l'inverse."},
      {t:"Erreurs fréquentes à éviter absolument",b:"Activer le schedule 'pour voir' · Sans blocklist en place · Avec enrichissements non conditionnés · Sur un client non validé. Une erreur non détectée dans un workflow automatisé se reproduit à l'infini — c'est pour ça qu'on valide d'abord."}
    ],
    qq:["Fréquence du schedule ?","Auto-update : quand ?","Comment monitorer ?"]
  }
];

const sg = k => { try { const v = typeof window !== 'undefined' ? localStorage.getItem(k) : null; return v ? JSON.parse(v) : null; } catch(e) { return null; } };
const ss = (k, v) => { try { if (typeof window !== 'undefined') localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };

const Logo = () => (
  <div style={{width:32,height:32,borderRadius:8,background:T,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
    <span style={{fontSize:12,fontWeight:800,color:'white',letterSpacing:'-0.5px'}}>OA</span>
  </div>
);

const Tag = ({label, color, colorLight}) => (
  <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:colorLight||TL,color:color||T,letterSpacing:'0.02em'}}>{label}</span>
);

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
  const [copied, setCopied] = useState(false);
  const endRef = useRef(null);

  const scrollEnd = () => setTimeout(() => endRef.current?.scrollIntoView({behavior:'smooth'}), 50);

  const login = () => {
    const em = email.trim().toLowerCase(), cd = code.trim();
    if (!em || !cd) { setErr('Remplis tous les champs.'); return; }
    setLoading(true); setErr('');
    setTimeout(() => {
      if (cd === CODE_ADMIN) { setUser({email:em,admin:true}); setView('admin'); setLoading(false); return; }
      const extra = sg('oas:codes') || [];
      if (cd !== CODE_USER && !extra.includes(cd)) { setErr("Code invalide. Contacte Antoine pour obtenir ton accès."); setLoading(false); return; }
      const p = sg(`oas:prog:${em}`) || {};
      setProg(p);
      const users = sg('oas:users') || [];
      if (!users.includes(em)) ss('oas:users', [...users, em]);
      setUser({email:em,admin:false}); setView('dash'); setLoading(false);
    }, 500);
  };

  const openMod = id => {
    setModId(id);
    const m = MODULES.find(x => x.id === id);
    const saved = sg(`oas:msgs:${user.email}:${id}`) || [];
    setMsgs(saved.length ? saved : [{role:'ai', content:`Bienvenue dans le Module ${m.num} — ${m.name}. Je suis ton tuteur pour ce module. Pose-moi une question ou utilise les suggestions rapides ci-dessous.`}]);
    setView('mod');
    scrollEnd();
  };

  const markDone = () => {
    const np = {...prog, [modId]:{done:true, at:new Date().toISOString(), q:msgs.filter(m=>m.role==='user').length}};
    setProg(np); ss(`oas:prog:${user.email}`, np); setView('dash');
  };

  const chat = async t => {
    const text = t || inp.trim();
    if (!text || typing) return;
    setInp('');
    const m = MODULES.find(x => x.id === modId);
    const nm = [...msgs, {role:'user', content:text}];
    setMsgs(nm); setTyping(true); scrollEnd();
    try {
      const r = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-sonnet-4-20250514', max_tokens:600,
          system:`Tu es le tuteur expert de la formation "Outbound Automation System" d'Antoine Beliaeff, spécialiste GTM & outbound B2B. Réponds en français, concis (3-4 phrases max), opérationnel et direct. Tu enseignes le Module ${m.num} — ${m.name}. Contexte : ${m.intro}. Pas de formules creuses, vas droit au but.`,
          messages: nm.slice(-8).map(x => ({role: x.role==='user'?'user':'assistant', content: x.content}))
        })
      });
      const d = await r.json();
      const rep = d.content?.[0]?.text || "Connexion temporairement indisponible. Vérifie ta clé API dans Vercel.";
      const fm = [...nm, {role:'ai', content:rep}];
      setMsgs(fm); ss(`oas:msgs:${user.email}:${modId}`, fm.slice(-20));
    } catch(e) {
      setMsgs([...nm, {role:'ai', content:"Erreur réseau. Vérifie ta connexion et réessaie."}]);
    }
    setTyping(false); scrollEnd();
  };

  const exportReport = () => {
    const done = MODULES.filter(m => prog[m.id]?.done);
    const date = new Date().toLocaleDateString('fr-FR', {day:'2-digit', month:'long', year:'numeric'});
    const next = MODULES.find(m => !prog[m.id]?.done);
    const lines = [
      '══════════════════════════════════════════════════════',
      '  RAPPORT DE FORMATION — OUTBOUND AUTOMATION SYSTEM',
      '══════════════════════════════════════════════════════',
      '', `  Apprenant  : ${user.email}`, `  Date       : ${date}`,
      `  Progression: ${done.length}/${MODULES.length} modules (${Math.round(done.length/MODULES.length*100)}%)`,
      '', '──────────────────────────────────────────────────────',
      '  DÉTAIL PAR MODULE', '──────────────────────────────────────────────────────', '',
      ...MODULES.map(m => {
        const p = prog[m.id];
        return p?.done
          ? `  ✓  Module ${m.num} — ${m.name}\n     Complété le ${new Date(p.at).toLocaleDateString('fr-FR')} · ${p.q||0} question(s) posée(s)`
          : `  ○  Module ${m.num} — ${m.name}\n     Non complété`;
      }),
      '', '──────────────────────────────────────────────────────',
      next ? `  → Prochaine étape : Module ${next.num} — ${next.name}` : '  → Formation complétée. Félicitations !',
      '', '══════════════════════════════════════════════════════',
      '  Formation dispensée par Antoine Beliaeff',
      '  GTM & Outbound Expert', '  linkedin.com/in/antoine-beliaeff-8038b8196',
      '══════════════════════════════════════════════════════',
    ].join('\n');
    const blob = new Blob([lines], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {href:url, download:`OAS_${user.email.split('@')[0]}_${new Date().toISOString().split('T')[0]}.txt`});
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const genCode = () => {
    const c = 'OAS-' + Math.random().toString(36).substring(2,7).toUpperCase();
    ss('oas:codes', [...(sg('oas:codes')||[]), c]);
    navigator.clipboard?.writeText(c).catch(()=>{});
    setCopied(c); setTimeout(() => setCopied(false), 4000);
  };

  const logout = () => { setView('login'); setUser(null); setProg({}); setEmail(''); setCode(''); };

  const doneCount = MODULES.filter(m => prog[m.id]?.done).length;
  const pct = Math.round(doneCount / MODULES.length * 100);
  const curMod = MODULES.find(m => m.id === modId);

  // ── SHARED STYLES ──────────────────────────────────────────────────────────
  const card = {background:'white', borderRadius:14, border:'1px solid #E5E7EB', overflow:'hidden'};
  const btn = (bg, color='white', extra={}) => ({padding:'10px 20px', borderRadius:9, background:bg, color, border:'none', cursor:'pointer', fontSize:14, fontWeight:600, ...extra});

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (view === 'login') return (
    <>
      <Head><title>OAS — Connexion</title></Head>
      <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24, background:'#F4F6F5'}}>
        <div style={{width:'100%', maxWidth:420, animation:'fadeIn 0.3s ease'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:32}}>
            <Logo />
            <div>
              <div style={{fontSize:15, fontWeight:700, color:'#111827', letterSpacing:'-0.3px'}}>Outbound Automation System</div>
              <div style={{fontSize:12, color:'#6B7280', marginTop:1}}>Par Antoine Beliaeff · GTM & Outbound Expert</div>
            </div>
          </div>
          <div style={{...card, padding:32, boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
            <div style={{fontSize:22, fontWeight:800, color:'#111827', marginBottom:6, letterSpacing:'-0.5px'}}>Accède à ta formation</div>
            <div style={{fontSize:14, color:'#6B7280', marginBottom:28, lineHeight:1.5}}>Entre ton email et ton code d'accès pour continuer.</div>
            {[
              {label:'Adresse email', value:email, set:setEmail, ph:'ton@email.com', type:'email'},
              {label:"Code d'accès", value:code, set:setCode, ph:'••••••••', type:'password'}
            ].map(f => (
              <div key={f.label} style={{marginBottom:18}}>
                <label style={{fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:7}}>{f.label}</label>
                <input value={f.value} onChange={e => f.set(e.target.value)} onKeyDown={e => e.key==='Enter' && login()} placeholder={f.ph} type={f.type}
                  style={{width:'100%', border:'1.5px solid #E5E7EB', borderRadius:9, padding:'11px 14px', fontSize:14, outline:'none', boxSizing:'border-box', color:'#111827', background:'#FAFAFA', transition:'border-color 0.15s'}}
                  onFocus={e => e.target.style.borderColor=T} onBlur={e => e.target.style.borderColor='#E5E7EB'} />
              </div>
            ))}
            {err && <div style={{fontSize:13, color:'#DC2626', background:'#FEF2F2', padding:'10px 14px', borderRadius:8, marginBottom:18, fontWeight:500}}>{err}</div>}
            <button onClick={login} disabled={loading} style={btn(loading?'#9CA3AF':T, 'white', {width:'100%', padding:13, fontSize:15, marginTop:4})}>
              {loading ? 'Connexion...' : 'Accéder à la formation →'}
            </button>
          </div>
          <div style={{textAlign:'center', marginTop:20, fontSize:13, color:'#9CA3AF'}}>
            Pas encore de code ?{' '}
            <a href="https://www.linkedin.com/in/antoine-beliaeff-8038b8196/" target="_blank" rel="noreferrer" style={{color:T, textDecoration:'none', fontWeight:600}}>Contacte Antoine sur LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  );

  // ── ADMIN ──────────────────────────────────────────────────────────────────
  if (view === 'admin') return (
    <>
      <Head><title>OAS — Admin</title></Head>
      <div style={{minHeight:'100vh', background:'#F4F6F5'}}>
        <div style={{background:'white', borderBottom:'1px solid #E5E7EB', padding:'14px 28px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}><Logo /><span style={{fontSize:15, fontWeight:700, color:'#111827'}}>OAS Platform</span><Tag label="Admin" color={T} colorLight={TL} /></div>
          <button onClick={logout} style={{fontSize:13, color:'#6B7280', background:'none', border:'1px solid #E5E7EB', padding:'6px 14px', borderRadius:8, cursor:'pointer', fontWeight:500}}>Déconnexion</button>
        </div>
        <div style={{maxWidth:760, margin:'0 auto', padding:28}}>
          <div style={{...card, padding:24, marginBottom:20, boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <div style={{fontSize:16, fontWeight:700, color:'#111827', marginBottom:4}}>Générer un code d'accès</div>
            <div style={{fontSize:13, color:'#6B7280', marginBottom:20, lineHeight:1.6}}>
              Crée un code unique à envoyer à chaque apprenant.<br/>
              Code par défaut partageable : <code style={{background:TL, color:T, padding:'2px 8px', borderRadius:5, fontWeight:700, fontSize:13}}>OAS2025</code>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <button onClick={genCode} style={btn(T)}>+ Générer un code</button>
              {copied && (
                <div style={{display:'flex', alignItems:'center', gap:10, animation:'fadeIn 0.2s ease'}}>
                  <code style={{padding:'8px 16px', borderRadius:8, background:TL, color:T, fontSize:16, fontWeight:800, letterSpacing:'0.06em'}}>{copied}</code>
                  <span style={{fontSize:13, color:TM, fontWeight:600}}>✓ Copié !</span>
                </div>
              )}
            </div>
          </div>
          <div style={{...card, boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <div style={{padding:'16px 24px', borderBottom:'1px solid #F3F4F6', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <span style={{fontSize:15, fontWeight:700, color:'#111827'}}>Suivi apprenants</span>
            </div>
            <div style={{padding:24}}>
              <div style={{fontSize:13, color:'#6B7280', lineHeight:1.7, background:'#F9FAFB', padding:'16px 20px', borderRadius:10, border:'1px solid #E5E7EB'}}>
                Dans cette version MVP, chaque apprenant stocke sa progression dans son navigateur. Pour suivre leur avancement, demande-leur d'utiliser <strong>↓ Exporter mon rapport</strong> et de t'envoyer le fichier.<br/><br/>
                Le suivi centralisé en temps réel (dashboard admin complet) sera disponible lors de l'ajout de Supabase.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  if (view === 'dash') return (
    <>
      <Head><title>OAS — Dashboard</title></Head>
      <div style={{minHeight:'100vh', background:'#F4F6F5'}}>
        <div style={{background:'white', borderBottom:'1px solid #E5E7EB', padding:'14px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}><Logo /><span style={{fontSize:15, fontWeight:700, color:'#111827', letterSpacing:'-0.3px'}}>Outbound Automation System</span></div>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <button onClick={exportReport} style={{...btn('white','#374151',{border:'1px solid #E5E7EB', fontSize:13, padding:'7px 14px'})}}>↓ Exporter mon rapport</button>
            <div style={{height:20, width:1, background:'#E5E7EB'}} />
            <span style={{fontSize:13, color:'#9CA3AF'}}>{user?.email}</span>
            <button onClick={logout} style={{fontSize:12, color:'#9CA3AF', background:'none', border:'none', cursor:'pointer', padding:'4px 8px'}}>Déco</button>
          </div>
        </div>
        <div style={{maxWidth:800, margin:'0 auto', padding:'32px 24px'}}>
          <div style={{background:`linear-gradient(135deg, ${TD} 0%, ${T} 50%, ${TM} 100%)`, borderRadius:18, padding:'28px 32px', marginBottom:28, color:'white', position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', top:-20, right:-20, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.06)'}} />
            <div style={{position:'absolute', bottom:-40, right:40, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.04)'}} />
            <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:18, position:'relative'}}>
              <div>
                <div style={{fontSize:13, opacity:0.75, marginBottom:6, fontWeight:500}}>Ta progression globale</div>
                <div style={{fontSize:30, fontWeight:800, letterSpacing:'-0.5px'}}>{doneCount}/{MODULES.length} modules complétés</div>
                {doneCount === 0 && <div style={{fontSize:13, opacity:0.7, marginTop:8}}>Commence par le Module 01 →</div>}
              </div>
              <div style={{fontSize:48, fontWeight:800, opacity:0.85, letterSpacing:'-2px'}}>{pct}%</div>
            </div>
            <div style={{width:'100%', background:'rgba(255,255,255,0.2)', borderRadius:6, height:8, position:'relative'}}>
              <div style={{height:8, borderRadius:6, background:'white', width:`${pct}%`, transition:'width 0.6s ease', boxShadow:'0 0 8px rgba(255,255,255,0.4)'}} />
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {MODULES.map(m => {
              const isDone = prog[m.id]?.done;
              const isNext = !isDone && MODULES.find(x => !prog[x.id]?.done)?.id === m.id;
              return (
                <div key={m.id} onClick={() => openMod(m.id)}
                  style={{...card, cursor:'pointer', padding:22, borderColor: isDone ? '#A7F3D0' : isNext ? '#BFDBFE' : '#E5E7EB', transition:'all 0.15s ease', position:'relative'}}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.09)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
                  {isDone && <div style={{position:'absolute', top:16, right:16, width:24, height:24, borderRadius:'50%', background:'#D1FAE5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#059669'}}>✓</div>}
                  <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14}}>
                    <Tag label={isDone ? 'Complété' : m.tag} color={isDone ? '#059669' : m.color} colorLight={isDone ? '#D1FAE5' : m.colorLight} />
                    <span style={{fontSize:11, color:'#9CA3AF', marginLeft:'auto'}}>{m.dur}</span>
                  </div>
                  <div style={{fontSize:12, color:'#9CA3AF', marginBottom:5, fontWeight:600}}>Module {m.num}</div>
                  <div style={{fontSize:15, fontWeight:700, color:'#111827', lineHeight:1.35, marginBottom: isDone||isNext ? 12 : 0}}>{m.name}</div>
                  {isDone && <div style={{fontSize:12, color:'#6B7280'}}>{prog[m.id].q||0} question(s) posée(s) au tuteur</div>}
                  {isNext && !isDone && <div style={{fontSize:12, color:'#3B82F6', fontWeight:600}}>→ Commence ici</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  // ── MODULE ─────────────────────────────────────────────────────────────────
  if (view === 'mod' && curMod) return (
    <>
      <Head><title>OAS — Module {curMod.num}</title></Head>
      <div style={{height:'100vh', display:'flex', flexDirection:'column', background:'#F4F6F5', overflow:'hidden'}}>
        <div style={{background:'white', borderBottom:'1px solid #E5E7EB', padding:'11px 24px', display:'flex', alignItems:'center', gap:12, flexShrink:0, position:'sticky', top:0, zIndex:10}}>
          <button onClick={() => setView('dash')} style={{fontSize:13, color:'#6B7280', background:'none', border:'1px solid #E5E7EB', padding:'5px 12px', borderRadius:7, cursor:'pointer', fontWeight:500, display:'flex', alignItems:'center', gap:5}}>
            ← Dashboard
          </button>
          <div style={{height:18, width:1, background:'#E5E7EB'}} />
          <Tag label={curMod.tag} color={curMod.color} colorLight={curMod.colorLight} />
          <span style={{fontSize:13, color:'#374151', fontWeight:600}}>Module {curMod.num} — {curMod.name}</span>
          <div style={{flex:1}} />
          {!prog[modId]?.done
            ? <button onClick={markDone} style={btn(T, 'white', {fontSize:13, padding:'8px 18px'})}>✓ Marquer comme complété</button>
            : <span style={{fontSize:13, color:TM, fontWeight:700, display:'flex', alignItems:'center', gap:5}}>
                <span style={{width:20, height:20, borderRadius:'50%', background:'#D1FAE5', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11}}>✓</span>
                Complété
              </span>
          }
        </div>

        <div style={{flex:1, display:'flex', overflow:'hidden'}}>
          {/* CONTENT */}
          <div style={{flex:1, overflowY:'auto', padding:'28px 36px'}}>
            <div style={{maxWidth:680}}>
              <div style={{fontSize:11, fontWeight:700, color:curMod.color, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10}}>{curMod.tag} · {curMod.dur}</div>
              <div style={{fontSize:26, fontWeight:800, color:'#111827', marginBottom:10, lineHeight:1.2, letterSpacing:'-0.5px'}}>{curMod.title}</div>
              <div style={{fontSize:14, color:'#6B7280', marginBottom:28, lineHeight:1.7}}>{curMod.intro}</div>

              <div style={{background:curMod.colorLight, borderRadius:12, padding:'16px 20px', marginBottom:28, border:`1px solid ${curMod.color}22`}}>
                <div style={{fontSize:12, fontWeight:700, color:curMod.color, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:12}}>Ce que tu vas apprendre</div>
                <div style={{display:'flex', flexDirection:'column', gap:8}}>
                  {curMod.objectives.map((o,i) => (
                    <div key={i} style={{display:'flex', alignItems:'flex-start', gap:10}}>
                      <div style={{width:20, height:20, borderRadius:'50%', background:curMod.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'white', flexShrink:0, marginTop:1}}>{i+1}</div>
                      <span style={{fontSize:13, color:'#374151', lineHeight:1.5, fontWeight:500}}>{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{height:1, background:'#E5E7EB', marginBottom:24}} />
              <div style={{fontSize:12, fontWeight:700, color:'#6B7280', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:16}}>Règles fondamentales</div>
              <div style={{display:'flex', flexDirection:'column', gap:10, marginBottom:28}}>
                {curMod.rules.map((r,i) => (
                  <div key={i} style={{display:'flex', gap:14, alignItems:'flex-start', background:'white', borderRadius:10, padding:'14px 16px', border:'1px solid #E5E7EB'}}>
                    <div style={{width:28, height:28, borderRadius:8, background:TL, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:T, flexShrink:0}}>{r.n}</div>
                    <div style={{fontSize:14, color:'#111827', lineHeight:1.6, fontWeight:500, paddingTop:4}}>{r.r}</div>
                  </div>
                ))}
              </div>

              <div style={{height:1, background:'#E5E7EB', marginBottom:24}} />
              <div style={{fontSize:12, fontWeight:700, color:'#6B7280', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:16}}>Concepts clés</div>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                {curMod.concepts.map((c,i) => (
                  <div key={i} style={{background:'white', border:'1px solid #E5E7EB', borderRadius:12, padding:'16px 20px', borderLeft:`3px solid ${curMod.color}`}}>
                    <div style={{fontSize:14, fontWeight:700, color:'#111827', marginBottom:6}}>{c.t}</div>
                    <div style={{fontSize:13, color:'#6B7280', lineHeight:1.7}}>{c.b}</div>
                  </div>
                ))}
              </div>
              <div style={{height:40}} />
            </div>
          </div>

          {/* TUTOR */}
          <div style={{width:320, borderLeft:'1px solid #E5E7EB', display:'flex', flexDirection:'column', background:'white', flexShrink:0}}>
            <div style={{padding:'14px 18px', borderBottom:'1px solid #F3F4F6', display:'flex', alignItems:'center', gap:10, background:'#FAFAFA'}}>
              <div style={{width:32, height:32, borderRadius:'50%', background:TL, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:T}}>OA</div>
              <div>
                <div style={{fontSize:13, fontWeight:700, color:'#111827'}}>Tuteur OAS</div>
                <div style={{fontSize:11, color:TM, fontWeight:500}}>● Propulsé par Claude</div>
              </div>
            </div>

            <div style={{flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:12}}>
              {msgs.map((m,i) => (
                <div key={i} style={{display:'flex', flexDirection:'column', alignItems:m.role==='user'?'flex-end':'flex-start', animation:'fadeIn 0.2s ease'}}>
                  <div style={{fontSize:10, color:'#9CA3AF', marginBottom:4, fontWeight:600}}>{m.role==='user'?'Toi':'Tuteur OAS'}</div>
                  <div style={{maxWidth:'90%', padding:'10px 13px', borderRadius:12, fontSize:13, lineHeight:1.65, background:m.role==='user'?T:'#F3F4F6', color:m.role==='user'?'white':'#111827', fontWeight:m.role==='user'?500:400, borderBottomLeftRadius:m.role==='ai'?3:12, borderBottomRightRadius:m.role==='user'?3:12}}>
                    {m.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', animation:'fadeIn 0.2s ease'}}>
                  <div style={{fontSize:10, color:'#9CA3AF', marginBottom:4, fontWeight:600}}>Tuteur OAS</div>
                  <div style={{padding:'12px 16px', borderRadius:12, borderBottomLeftRadius:3, background:'#F3F4F6', display:'flex', gap:4}}>
                    {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:'50%',background:'#9CA3AF',animation:`bounce 1.2s ${i*0.2}s infinite`}}/>)}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div style={{padding:'8px 14px 10px', display:'flex', flexWrap:'wrap', gap:5, borderTop:'1px solid #F3F4F6'}}>
              {curMod.qq.map((q,i) => (
                <button key={i} onClick={() => chat(q)} style={{fontSize:11, padding:'4px 10px', borderRadius:20, border:`1.5px solid ${TM}`, color:T, background:TL, cursor:'pointer', fontWeight:600, transition:'all 0.1s'}}>
                  {q}
                </button>
              ))}
            </div>

            <div style={{padding:'10px 14px', borderTop:'1px solid #F3F4F6', display:'flex', gap:8, alignItems:'flex-end'}}>
              <textarea value={inp} onChange={e => setInp(e.target.value)}
                onKeyDown={e => e.key==='Enter' && !e.shiftKey && (e.preventDefault(), chat())}
                placeholder="Pose une question..." rows={1}
                style={{flex:1, border:'1.5px solid #E5E7EB', borderRadius:9, padding:'8px 12px', fontSize:13, fontFamily:'inherit', resize:'none', outline:'none', background:'#FAFAFA', color:'#111827', minHeight:38, maxHeight:90, boxSizing:'border-box', transition:'border-color 0.15s'}}
                onFocus={e => e.target.style.borderColor=T} onBlur={e => e.target.style.borderColor='#E5E7EB'} />
              <button onClick={() => chat()} disabled={typing}
                style={{width:36, height:36, borderRadius:9, background:typing?'#9CA3AF':T, border:'none', cursor:typing?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'background 0.15s'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return null;
}
