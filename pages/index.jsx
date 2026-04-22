import { useState, useEffect, useRef } from "react";

const TEAL = '#0F6E56';
const TL = '#E1F5EE';
const TM = '#1D9E75';
const CODE_USER = "OAS2025";
const CODE_ADMIN = "ADMIN-OAS";

const MODULES = [
  {
    id:1, num:"01", name:"Architecture de la machine", tag:"Fondations", dur:"1h30",
    title:"Architecture de la machine outbound",
    intro:"Comprendre pourquoi la majorité des équipes échouent et poser les bases d'un système opérable dans le temps.",
    rules:["Clay est un moteur d'orchestration, pas un outil d'enrichissement en masse.","Aucune action ne s'exécute sans condition Run if.","Un workflow Clay doit être : manuel → testé → validé → automatisé."],
    concepts:[
      {t:"Les 4 symptômes d'un outbound non systémique",b:"Chaque campagne est un bricolage · La data se dégrade (doublons, clients recontactés) · Le sourcing coûte trop cher · Les résultats dépendent des personnes, pas du système."},
      {t:"Le mental model fondamental",b:"Clay = moteur · Conditions = cerveau · Outreach = sortie. Le problème n'est jamais le copywriting — c'est l'absence de machine opérable dans le temps."},
      {t:"Les 4 tables fondamentales",b:"TAM / Companies → Blocklist → Company/Prospects → Outreach Output. Règle absolue : 1 table = 1 fonction."}
    ],
    qq:["C'est quoi un Run if ?","Pourquoi 1 table = 1 fonction ?","Clay vs Apollo ?"]
  },
  {
    id:2, num:"02", name:"ICP & signaux exploitables", tag:"Ciblage", dur:"1h30",
    title:"ICP, segmentation & signaux exploitables",
    intro:"Définir un ICP actionnable et une segmentation orientée opérations — pas théorique.",
    rules:["L'ICP doit être filtrable dans Clay, pas seulement lisible dans un deck.","On segmente par signal, pas uniquement par secteur.","Qualify before enrich : on n'enrichit que ce qui est validé."],
    concepts:[
      {t:"ICP actionnable vs théorique",b:"Un ICP théorique décrit votre client idéal. Un ICP actionnable est constitué de critères directement filtrables : taille, industrie, pays, keywords. Si tu ne peux pas le filtrer dans Clay, ce n'est pas un ICP opérationnel."},
      {t:"Les 3 niveaux de segmentation",b:"Firmographique (taille, secteur, pays) · Comportemental (technos utilisées) · Signal de croissance (recrutements, levée, expansion). Le niveau 3 est celui qui différencie vraiment."},
      {t:"Signaux exploitables concrets",b:"Recrutements actifs · Levée de fonds récente · Nouveau produit · Changement de leadership. Un signal = un événement observable qui indique une douleur ou une opportunité."}
    ],
    qq:["Comment détecter un signal dans Clay ?","Combien de segments ?","ICP B2B vs B2C ?"]
  },
  {
    id:3, num:"03", name:"Tables Clay & architecture data", tag:"Structure", dur:"2h",
    title:"Architecture des tables Clay",
    intro:"Maîtriser la structure de données fondamentale — la base sur laquelle tout repose.",
    rules:["La TAM Table est permanente. Une entreprise entre une seule fois, n'est jamais supprimée.","La blocklist est globale et non négociable.","Aucun contact ne sort sans Is Outreach Ready = TRUE."],
    concepts:[
      {t:"La TAM Table — mini-CRM de prospection",b:"Centralise toutes les entreprises sourcées. Évite toute reprospection accidentelle. Suivi de statut : Prospect → Contacté → En cours → Client → Closed Lost. Champs min : Company Name, Website, Domain normalisé, LinkedIn URL."},
      {t:"La Blocklist — protection systémique",b:"Sources : CRM client, anciens prospects, comptes sensibles, clients actifs. Domaine normalisé obligatoire (sans www., /fr /en). Action Clay : Lookup Single Row → Blocklist avant tout enrichissement."},
      {t:"La table intermédiaire Approved Companies",b:"Créée via Send data to table avec Run condition : Company Status = 'Qualified'. Seule entrée autorisée pour enrichissement, sourcing contact et automatisations downstream."}
    ],
    qq:["Comment normaliser un domaine ?","Lookup Single Row ?","TAM par client ?"]
  },
  {
    id:4, num:"04", name:"Sourcing & enrichissement", tag:"Data Ops", dur:"2h30",
    title:"Sourcing & enrichissement maîtrisés",
    intro:"Sourcer des entreprises et contacts de façon propre, conditionnelle et sans gaspillage de crédits.",
    rules:["Aucun contact n'est sourcé si l'entreprise n'est pas validée.","Déduplication AVANT enrichissement — toujours.","La cascade email s'arrête dès qu'un email valide est trouvé."],
    concepts:[
      {t:"Sourcing entreprise — sources possibles",b:"Clay native source (Find Companies) · Google Sheet dynamique · Import CSV · Lien Sales Navigator. Règle : laisser la source en Manual — jamais d'auto-update avant validation du workflow."},
      {t:"Enrichissement entreprise — strict minimum",b:"À ce stade : Industry, Domain, LinkedIn Company URL, Employee Range, Country/City, Short Description. Pas d'enrichissement 'nice to have'. Coût = 0 si l'entreprise n'est pas qualifiée après."},
      {t:"Cascade email intelligente",b:"Waterfall sequence : providers dans l'ordre (ex : Enrow → FullEnrich). Stop dès qu'un email valide est trouvé. Activer Validation Provider + Require validation success = ON."}
    ],
    qq:["Meilleurs providers email ?","Limiter à 3 contacts/entreprise ?","Run if pour l'enrichissement ?"]
  },
  {
    id:5, num:"05", name:"Copy & séquences multicanales", tag:"Messaging", dur:"2h",
    title:"Copy outbound & séquences multicanales",
    intro:"Écrire des messages qui ouvrent des conversations — pas qui vendent.",
    rules:["Structure : Observation → Supposition → Question.","Jamais de chiffres inventés, jamais de flatterie, jamais de vente au premier contact.","L'icebreaker ne s'utilise que quand tu as un signal exploitable réel."],
    concepts:[
      {t:"La structure qui fonctionne",b:"Commence par une observation naturelle. Formule une supposition prudente ('je me demandais si...', 'j'imagine que...'). Termine par une question ouverte courte. Maximum 2 phrases. Ton professionnel et naturel."},
      {t:"Personnalisation utile vs cosmétique",b:"Cosmétique : mentionner le prénom, le logo, le poste. Utile : mentionner un signal réel (recrutement, expansion, changement de tech). La personnalisation utile augmente les taux de réponse."},
      {t:"Séquences multicanales",b:"LinkedIn connexion → Email J0 → Relance valeur J3 → Breakup J7. Même angle, même ton, pas de répétition entre canaux."}
    ],
    qq:["Prompt icebreaker générique ?","Combien de relances ?","LinkedIn vs email en FR ?"]
  },
  {
    id:6, num:"06", name:"Déploiement & mise en production", tag:"Ops", dur:"2h",
    title:"Déploiement, validation & mise en production",
    intro:"Mettre en production un système sécurisé, sans exposer de clients ni brûler de crédits.",
    rules:["Run on schedule ne s'active JAMAIS sur un workflow non validé.","Tester sur 5–10 lignes maximum avant tout déploiement.","Aucun export sans Is Outreach Ready = TRUE."],
    concepts:[
      {t:"Is Outreach Ready — checklist",b:"Company Status = Approved · Lead Status = Approved · Work Email = VALID · Job Title non vide · LinkedIn URL existe · Non présent en Blocklist. Ces 6 conditions doivent être vraies simultanément."},
      {t:"Ordre strict de mise en production",b:"1. Construire le workflow manuellement · 2. Tester sur 5–10 lignes · 3. Tester l'export · 4. Valider la checklist · 5. Activer le Run on schedule UNIQUEMENT après. Jamais l'inverse."},
      {t:"Erreurs fréquentes à éviter",b:"Activer le schedule 'pour voir' · Sans blocklist · Avec enrichissements non conditionnés · Sur un client non validé. Une erreur non détectée dans un workflow automatisé se reproduit à l'infini."}
    ],
    qq:["Fréquence du schedule ?","Auto-update : quand ?","Comment monitorer ?"]
  }
];

const sg = k => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch(e) { return null; } };
const ss = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };

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

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const login = () => {
    const em = email.trim().toLowerCase();
    const cd = code.trim();
    if (!em || !cd) { setErr('Remplis tous les champs.'); return; }
    setLoading(true); setErr('');

    setTimeout(() => {
      if (cd === CODE_ADMIN) {
        setUser({ email: em, admin: true });
        setView('admin'); setLoading(false); return;
      }

      const extraCodes = sg('oas:codes') || [];
      const ok = cd === CODE_USER || extraCodes.includes(cd);
      if (!ok) { setErr("Code invalide. Contacte Antoine pour obtenir ton accès."); setLoading(false); return; }

      const p = sg(`oas:prog:${em}`) || {};
      setProg(p);

      const users = sg('oas:users') || [];
      if (!users.includes(em)) ss('oas:users', [...users, em]);

      setUser({ email: em, admin: false });
      setView('dash'); setLoading(false);
    }, 400);
  };

  const openMod = id => {
    setModId(id);
    const m = MODULES.find(x => x.id === id);
    const saved = sg(`oas:msgs:${user.email}:${id}`) || [];
    setMsgs(saved.length ? saved : [{ role: 'ai', content: `Bienvenue dans le Module ${m.num} — ${m.name}. Pose-moi une question ou clique sur une suggestion rapide ci-dessous.` }]);
    setView('mod');
  };

  const markDone = () => {
    const np = { ...prog, [modId]: { done: true, at: new Date().toISOString(), q: msgs.filter(m => m.role === 'user').length } };
    setProg(np); ss(`oas:prog:${user.email}`, np); setView('dash');
  };

  const chat = async t => {
    const text = t || inp.trim();
    if (!text || typing) return;
    setInp('');
    const m = MODULES.find(x => x.id === modId);
    const nm = [...msgs, { role: 'user', content: text }];
    setMsgs(nm); setTyping(true);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 600,
          system: `Tu es le tuteur expert de la formation "Outbound Automation System" d'Antoine Beliaeff, spécialiste GTM & outbound B2B. Réponds en français, concis (3-4 phrases max), opérationnel et direct. Module ${m.num} — ${m.name}. Pas de formules creuses.`,
          messages: nm.slice(-8).map(x => ({ role: x.role === 'user' ? 'user' : 'assistant', content: x.content }))
        })
      });
      const d = await r.json();
      const rep = d.content?.[0]?.text || "Connexion temporairement indisponible.";
      const fm = [...nm, { role: 'ai', content: rep }];
      setMsgs(fm);
      ss(`oas:msgs:${user.email}:${modId}`, fm.slice(-20));
    } catch(e) {
      setMsgs([...nm, { role: 'ai', content: "Erreur réseau. Réessaie dans un instant." }]);
    }
    setTyping(false);
  };

  const exportReport = () => {
    const done = MODULES.filter(m => prog[m.id]?.done);
    const date = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    const next = MODULES.find(m => !prog[m.id]?.done);
    const lines = [
      '══════════════════════════════════════════════════════',
      '  RAPPORT DE FORMATION — OUTBOUND AUTOMATION SYSTEM',
      '══════════════════════════════════════════════════════',
      '', `  Apprenant  : ${user.email}`, `  Date       : ${date}`,
      `  Progression: ${done.length}/${MODULES.length} modules (${Math.round(done.length / MODULES.length * 100)}%)`,
      '', '──────────────────────────────────────────────────────',
      '  DÉTAIL PAR MODULE', '──────────────────────────────────────────────────────', '',
      ...MODULES.map(m => {
        const p = prog[m.id];
        return p?.done
          ? `  ✓  Module ${m.num} — ${m.name}\n     Complété le ${new Date(p.at).toLocaleDateString('fr-FR')} · ${p.q || 0} question(s)`
          : `  ○  Module ${m.num} — ${m.name}\n     Non complété`;
      }),
      '', '──────────────────────────────────────────────────────',
      next ? `  → Prochaine étape : Module ${next.num} — ${next.name}` : '  → Formation complétée. Félicitations !',
      '', '══════════════════════════════════════════════════════',
      '  Formation dispensée par Antoine Beliaeff',
      '  GTM & Outbound Expert · linkedin.com/in/antoine-beliaeff-8038b8196',
      '══════════════════════════════════════════════════════',
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: `OAS_${user.email.split('@')[0]}_${new Date().toISOString().split('T')[0]}.txt` });
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const genCode = () => {
    const c = 'OAS-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const ex = sg('oas:codes') || [];
    ss('oas:codes', [...ex, c]);
    navigator.clipboard?.writeText(c).catch(() => {});
    setCopied(c);
    setTimeout(() => setCopied(false), 3000);
  };

  const logout = () => { setView('login'); setUser(null); setProg({}); setEmail(''); setCode(''); };

  const doneCount = MODULES.filter(m => prog[m.id]?.done).length;
  const pct = Math.round(doneCount / MODULES.length * 100);
  const curMod = MODULES.find(m => m.id === modId);

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (view === 'login') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#F8FAF9' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: TEAL, marginBottom: 12 }}>FORMATION B2B OUTBOUND</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>Outbound Automation System</div>
          <div style={{ fontSize: 14, color: '#6B7280', marginTop: 10 }}>Par Antoine Beliaeff · GTM & Outbound Expert</div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E5E7EB', padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          {[
            { label: 'Adresse email', value: email, set: setEmail, placeholder: 'ton@email.com', type: 'email' },
            { label: "Code d'accès", value: code, set: setCode, placeholder: '••••••••', type: 'password' }
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>{f.label}</label>
              <input value={f.value} onChange={e => f.set(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder={f.placeholder} type={f.type}
                style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: 9, padding: '11px 13px', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#111827', background: '#FAFAFA' }} />
            </div>
          ))}
          {err && <div style={{ fontSize: 13, color: '#DC2626', background: '#FEF2F2', padding: '9px 13px', borderRadius: 8, marginBottom: 16 }}>{err}</div>}
          <button onClick={login} disabled={loading}
            style={{ width: '100%', padding: 13, borderRadius: 9, background: loading ? '#9CA3AF' : TEAL, color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 600 }}>
            {loading ? 'Connexion...' : 'Accéder à la formation →'}
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#9CA3AF' }}>
          Pas encore de code ?{' '}
          <a href="https://www.linkedin.com/in/antoine-beliaeff-8038b8196/" target="_blank" rel="noreferrer" style={{ color: TEAL, textDecoration: 'none' }}>Contacte Antoine sur LinkedIn</a>
        </div>
      </div>
    </div>
  );

  // ── ADMIN ──────────────────────────────────────────────────────────────────
  if (view === 'admin') return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>OAS Platform</span>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: TL, color: TEAL, fontWeight: 500 }}>Admin</span>
        </div>
        <button onClick={logout} style={{ fontSize: 13, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>Déconnexion</button>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: 28 }}>
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Générer un code d'accès</div>
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 18 }}>Crée un code unique à envoyer à chaque nouvel apprenant. Le code par défaut partageable est <code style={{ background: TL, color: TEAL, padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>OAS2025</code>.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={genCode} style={{ padding: '9px 20px', borderRadius: 9, background: TEAL, color: 'white', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              + Générer un code
            </button>
            {copied && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <code style={{ padding: '7px 14px', borderRadius: 8, background: TL, color: TEAL, fontSize: 16, fontWeight: 700, letterSpacing: '0.05em' }}>{copied}</code>
                <span style={{ fontSize: 13, color: TM, fontWeight: 500 }}>✓ Copié dans le presse-papiers</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E7EB', padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Suivi des apprenants</div>
          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>
            Dans cette version MVP, chaque apprenant suit sa progression dans son propre navigateur. Pour suivre leur avancement, demande-leur d'utiliser le bouton <strong>↓ Exporter mon rapport</strong> et de t'envoyer le fichier par email.<br /><br />
            Le suivi centralisé en temps réel sera disponible dans la version Supabase.
          </div>
        </div>

        <div style={{ background: '#FFFBEB', borderRadius: 12, border: '1px solid #FDE68A', padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#92400E', marginBottom: 6 }}>Prochaine évolution disponible</div>
          <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>
            En ajoutant Supabase (gratuit jusqu'à 50 000 lignes), tu obtiendras un tableau de bord admin en temps réel avec la progression de tous tes apprenants, les statistiques d'utilisation du tuteur IA, et la gestion des codes depuis cette interface.
          </div>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  if (view === 'dash') return (
    <div style={{ minHeight: '100vh', background: '#F8FAF9' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>Outbound Automation System</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={exportReport} style={{ fontSize: 13, padding: '7px 16px', borderRadius: 8, border: '1px solid #E5E7EB', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
            ↓ Exporter mon rapport
          </button>
          <span style={{ fontSize: 13, color: '#9CA3AF' }}>{user?.email}</span>
          <button onClick={logout} style={{ fontSize: 13, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>Déco</button>
        </div>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 28 }}>
        <div style={{ background: TEAL, borderRadius: 16, padding: 28, marginBottom: 28, color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>Ta progression</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{doneCount}/{MODULES.length} modules complétés</div>
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, opacity: 0.9 }}>{pct}%</div>
          </div>
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.25)', borderRadius: 4, height: 8 }}>
            <div style={{ height: 8, borderRadius: 4, background: 'white', width: `${pct}%`, transition: 'width 0.5s' }} />
          </div>
          {doneCount === 0 && <div style={{ marginTop: 16, fontSize: 13, opacity: 0.8 }}>Clique sur un module pour commencer →</div>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {MODULES.map(m => {
            const isDone = prog[m.id]?.done;
            const isNext = !isDone && MODULES.find(x => !prog[x.id]?.done)?.id === m.id;
            return (
              <div key={m.id} onClick={() => openMod(m.id)}
                style={{ background: 'white', borderRadius: 12, border: `1.5px solid ${isDone ? TM : isNext ? '#93C5FD' : '#E5E7EB'}`, cursor: 'pointer', padding: 18, transition: 'transform 0.1s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 20, fontWeight: 500, background: isDone ? TL : '#F3F4F6', color: isDone ? TEAL : '#6B7280' }}>
                    {isDone ? '✓ Complété' : m.tag}
                  </span>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>{m.dur}</span>
                </div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>Module {m.num}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#111827', lineHeight: 1.35 }}>{m.name}</div>
                {isDone && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 10 }}>{prog[m.id].q || 0} question(s) posée(s) au tuteur</div>}
                {isNext && <div style={{ fontSize: 12, color: '#3B82F6', marginTop: 10, fontWeight: 500 }}>→ Commence ici</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── MODULE ─────────────────────────────────────────────────────────────────
  if (view === 'mod' && curMod) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAF9', overflow: 'hidden' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '11px 22px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => setView('dash')} style={{ fontSize: 13, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>← Dashboard</button>
        <span style={{ color: '#E5E7EB' }}>|</span>
        <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>Module {curMod.num} — {curMod.name}</span>
        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#F3F4F6', color: '#6B7280' }}>{curMod.tag}</span>
        <div style={{ flex: 1 }} />
        {!prog[modId]?.done
          ? <button onClick={markDone} style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8, background: TEAL, color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>✓ Marquer comme complété</button>
          : <span style={{ fontSize: 13, color: TEAL, fontWeight: 600 }}>✓ Module complété</span>
        }
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ fontSize: 11, color: TEAL, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>{curMod.tag} · {curMod.dur}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8, lineHeight: 1.25 }}>{curMod.title}</div>
          <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 24, fontStyle: 'italic', lineHeight: 1.65 }}>{curMod.intro}</div>
          <div style={{ height: 1, background: '#E5E7EB', marginBottom: 22 }} />
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Règles fondamentales</div>
          {curMod.rules.map((r, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${TM}`, paddingLeft: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 14, color: '#111827', lineHeight: 1.65 }}>{r}</div>
            </div>
          ))}
          <div style={{ height: 1, background: '#E5E7EB', margin: '22px 0' }} />
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Concepts clés</div>
          {curMod.concepts.map((c, i) => (
            <div key={i} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 5 }}>{c.t}</div>
              <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{c.b}</div>
            </div>
          ))}
        </div>

        <div style={{ width: 310, borderLeft: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', background: 'white', flexShrink: 0 }}>
          <div style={{ padding: '13px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: TL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: TEAL }}>OA</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Tuteur OAS</div>
              <div style={{ fontSize: 11, color: TM }}>Propulsé par Claude</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 11 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 3 }}>{m.role === 'user' ? 'Toi' : 'Tuteur OAS'}</div>
                <div style={{ maxWidth: '92%', padding: '9px 12px', borderRadius: 11, fontSize: 13, lineHeight: 1.65, background: m.role === 'user' ? TEAL : '#F3F4F6', color: m.role === 'user' ? 'white' : '#111827', borderBottomLeftRadius: m.role === 'ai' ? 3 : 11, borderBottomRightRadius: m.role === 'user' ? 3 : 11 }}>
                  {m.content}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 3 }}>Tuteur OAS</div>
                <div style={{ padding: '11px 15px', borderRadius: 11, borderBottomLeftRadius: 3, background: '#F3F4F6', display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#9CA3AF', animation: `oasBounce 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ padding: '7px 13px 9px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {curMod.qq.map((q, i) => (
              <button key={i} onClick={() => chat(q)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, border: `1px solid ${TM}`, color: TEAL, background: 'transparent', cursor: 'pointer' }}>{q}</button>
            ))}
          </div>

          <div style={{ padding: '10px 13px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <textarea value={inp} onChange={e => setInp(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), chat())}
              placeholder="Pose une question..." rows={1}
              style={{ flex: 1, border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 11px', fontSize: 13, fontFamily: 'inherit', resize: 'none', outline: 'none', background: '#F9FAFB', color: '#111827', minHeight: 36, maxHeight: 90, boxSizing: 'border-box' }} />
            <button onClick={() => chat()} disabled={typing}
              style={{ width: 34, height: 34, borderRadius: 8, background: typing ? '#9CA3AF' : TEAL, border: 'none', cursor: typing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes oasBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}`}</style>
    </div>
  );

  return null;
}
