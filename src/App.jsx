import { useState, useEffect, useRef } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#06080f;--sur:#0d1020;--card:#111525;--b1:#1e2540;--b2:#252d4a;
      --ink:#e8ecf8;--ink2:#b8c2d8;--mu:#5a6480;--mu2:#3a4060;
      --gold:#d4a843;--g2:#e8c878;--teal:#2dd4bf;--rose:#e05c6e;
      --lav:#9b8cff;--sky:#4aa8e8;--sage:#5ab87a;
      --serif:'Instrument Serif',Georgia,serif;--sans:'Geist',system-ui,sans-serif;
      --r:10px;--rlg:16px;--rxl:22px;
    }
    body{background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:14px;line-height:1.6;overflow-x:hidden}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes popIn{0%{opacity:0;transform:scale(.9)}70%{transform:scale(1.02)}100%{opacity:1;transform:scale(1)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes glow{0%,100%{box-shadow:0 0 16px 3px rgba(212,168,67,.2)}50%{box-shadow:0 0 28px 8px rgba(212,168,67,.45)}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
    @keyframes hline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
    .fu{animation:fadeUp .45s ease both}
    .pi{animation:popIn .4s cubic-bezier(.34,1.2,.64,1) both}
    .si{animation:slideIn .3s ease both}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:var(--b2);border-radius:99px}

    /* ── Layout ── */
    .app{display:flex;min-height:100vh}
    .sb{width:224px;flex-shrink:0;background:rgba(8,10,18,.92);backdrop-filter:blur(28px);border-right:1px solid var(--b1);display:flex;flex-direction:column;padding:26px 12px;position:sticky;top:0;height:100vh;overflow-y:auto}
    .sb-gem{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--gold),#9a6e15);display:flex;align-items:center;justify-content:center;font-size:15px;animation:glow 3s ease-in-out infinite;flex-shrink:0}
    .nb{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:var(--r);border:none;background:transparent;color:var(--mu);font-family:var(--sans);font-weight:500;font-size:13px;cursor:pointer;text-align:left;width:100%;transition:all .16s;border-left:2px solid transparent}
    .nb:hover{color:var(--ink2);background:rgba(255,255,255,.04)}
    .nb.on{color:var(--ink);background:rgba(255,255,255,.06);border-left-color:var(--na,var(--gold))}
    .sb-sec{font-size:10px;color:var(--mu2);font-weight:600;text-transform:uppercase;letter-spacing:1.2px;padding:13px 12px 4px}

    .main{flex:1;padding:40px 50px;overflow-y:auto;min-height:100vh}

    /* ── Buttons ── */
    .btn{display:inline-flex;align-items:center;gap:7px;padding:10px 22px;border-radius:var(--r);border:none;font-family:var(--sans);font-weight:600;font-size:13px;cursor:pointer;transition:all .17s;user-select:none}
    .btn:active{transform:scale(.97)}
    .btn:disabled{opacity:.3;cursor:not-allowed;transform:none!important}
    .btn-gold{background:linear-gradient(135deg,var(--gold),#9a6e15);color:#0c0d10;box-shadow:0 3px 14px rgba(212,168,67,.28)}
    .btn-gold:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px)}
    .btn-outline{background:transparent;color:var(--ink2);border:1px solid var(--b2)}
    .btn-outline:hover:not(:disabled){border-color:var(--gold);color:var(--g2)}
    .btn-ghost{background:transparent;color:var(--mu);border:1px solid var(--b1)}
    .btn-ghost:hover:not(:disabled){color:var(--ink2);border-color:var(--b2)}
    .btn-rose{background:linear-gradient(135deg,var(--rose),#b03040);color:#fff}
    .btn-rose:hover:not(:disabled){filter:brightness(1.07);transform:translateY(-1px)}
    .btn-teal{background:linear-gradient(135deg,var(--teal),#0f9b8a);color:#081412}
    .btn-teal:hover:not(:disabled){filter:brightness(1.07);transform:translateY(-1px)}
    .btn-sm{padding:7px 16px;font-size:12px}
    .btn-xs{padding:5px 11px;font-size:11px}

    /* ── Cards / Inputs ── */
    .card{background:rgba(14,17,32,.84);backdrop-filter:blur(14px);border:1px solid var(--b1);border-radius:var(--rxl);padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.5)}
    textarea,input[type=text],input[type=number]{width:100%;background:rgba(8,10,18,.75);border:1px solid var(--b2);border-radius:var(--r);color:var(--ink);font-family:var(--sans);font-size:13px;padding:12px 15px;outline:none;resize:vertical;transition:border-color .18s,box-shadow .18s}
    textarea:focus,input[type=text]:focus,input[type=number]:focus{border-color:rgba(212,168,67,.45);box-shadow:0 0 0 3px rgba(212,168,67,.08)}
    textarea::placeholder,input::placeholder{color:var(--mu2)}

    /* ── Misc ── */
    .lbl{font-size:11px;color:var(--mu);font-weight:600;text-transform:uppercase;letter-spacing:.8px;display:block;margin-bottom:8px}
    .pill{display:inline-flex;align-items:center;gap:5px;padding:3px 11px;border-radius:100px;font-size:11px;font-weight:600}
    .resp{background:rgba(8,10,18,.75);border:1px solid var(--b2);border-left:3px solid var(--ra,var(--gold));border-radius:0 var(--r) var(--r) 0;padding:20px 22px;margin-top:16px;animation:fadeUp .4s ease both;white-space:pre-wrap;line-height:1.88;font-size:13.5px;color:var(--ink2)}
    .sp-wrap{display:flex;align-items:center;gap:12px;padding:26px 0}
    .sp{width:20px;height:20px;border-radius:50%;border:2.5px solid var(--b2);animation:spin .7s linear infinite;flex-shrink:0}
    .divider{height:1px;background:var(--b1);margin:18px 0}
    .pbar{height:5px;background:var(--b1);border-radius:99px;overflow:hidden}
    .pbar-fill{height:100%;border-radius:99px;transition:width .45s ease}
    .sh-title{font-family:var(--serif);font-size:27px;letter-spacing:-.4px}
    .sh-title em{font-style:italic}
    .err-box{background:rgba(224,92,110,.08);border:1px solid rgba(224,92,110,.25);border-radius:var(--r);padding:13px 17px;color:var(--rose);font-size:13px;margin-top:12px}

    /* ── Hero ── */
    .hero{position:relative;overflow:hidden;background:linear-gradient(145deg,rgba(17,22,44,.94),rgba(9,11,24,.97));border:1px solid var(--b2);border-radius:var(--rxl);padding:50px;margin-bottom:26px;box-shadow:0 12px 44px rgba(0,0,0,.6)}
    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 55% at 76% 18%,rgba(212,168,67,.06),transparent 70%),radial-gradient(ellipse 40% 50% at 8% 82%,rgba(45,212,191,.04),transparent 70%);pointer-events:none}
    .hero-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(212,168,67,.5),transparent);transform-origin:left;animation:hline .8s ease .2s both}
    .kd{width:5px;height:5px;border-radius:50%;background:var(--gold);display:inline-block;animation:pulse 2s ease-in-out infinite}

    /* ── Stats / Quick ── */
    .sg{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px}
    .sc{background:rgba(12,15,28,.82);border:1px solid var(--b1);border-radius:var(--rlg);padding:20px;transition:border-color .2s,transform .2s;cursor:default}
    .sc:hover{transform:translateY(-2px)}
    .qag{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    .qac{background:rgba(12,15,28,.75);border:1px solid var(--b1);border-radius:var(--rxl);padding:22px;display:flex;align-items:center;gap:16px;cursor:pointer;transition:all .2s}
    .qac:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.4)}
    .qai{width:46px;height:46px;border-radius:13px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:19px;border:1px solid var(--b2)}

    /* ── Quiz options ── */
    .qopt{background:rgba(8,10,18,.75);border:1px solid var(--b2);border-radius:var(--r);padding:11px 14px;text-align:left;font-size:13px;color:var(--ink2);cursor:pointer;transition:all .14s;font-family:var(--sans);width:100%}
    .qopt:hover:not(.qdis){border-color:rgba(224,92,110,.5);background:rgba(224,92,110,.06);color:var(--ink)}
    .qopt.qsel{border-color:var(--rose);background:rgba(224,92,110,.1)}
    .qopt.qright{border-color:var(--teal);background:rgba(45,212,191,.08);color:var(--teal)}
    .qopt.qwrong{border-color:var(--rose);background:rgba(224,92,110,.06);color:var(--rose);opacity:.65}
    .qopt.qdis{cursor:default}
    .score-panel{text-align:center;padding:44px;background:rgba(12,15,28,.9);border:1px solid var(--b2);border-radius:var(--rxl);animation:popIn .5s cubic-bezier(.34,1.2,.64,1) both;margin-bottom:24px}

    /* ── Search History ── */
    .hist-wrap{background:rgba(10,12,22,.6);border:1px solid var(--b1);border-radius:var(--rxl);padding:20px;margin-top:24px}
    .hist-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
    .hist-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:var(--mu)}
    .hist-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r);border:1px solid var(--b1);background:rgba(8,10,18,.5);margin-bottom:7px;cursor:pointer;transition:all .18s;animation:slideIn .3s ease both}
    .hist-item:hover{border-color:var(--b2);background:rgba(14,17,32,.8)}
    .hist-item:last-child{margin-bottom:0}
    .hist-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
    .hist-text{flex:1;font-size:13px;color:var(--ink2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .hist-meta{font-size:11px;color:var(--mu2);flex-shrink:0}
    .hist-del{background:none;border:none;color:var(--mu2);cursor:pointer;font-size:14px;padding:2px 6px;border-radius:4px;transition:color .15s;flex-shrink:0}
    .hist-del:hover{color:var(--rose)}
    .hist-empty{text-align:center;padding:20px 0;color:var(--mu2);font-size:12.5px;font-style:italic}

    /* ── Timer ── */
    .ppill{padding:9px 12px;border-radius:var(--r);border:1px solid var(--b2);background:transparent;color:var(--mu);font-family:var(--sans);font-size:12px;cursor:pointer;transition:all .15s;text-align:center;font-weight:500;width:100%}
    .ppill:hover{border-color:var(--lav);color:var(--lav);background:rgba(155,140,255,.07)}
    .sdot{width:9px;height:9px;border-radius:50%;background:var(--b2);transition:all .3s}
    .sdot.lit{background:var(--lav);box-shadow:0 0 8px rgba(155,140,255,.5)}
    .mtab{padding:8px 17px;border-radius:100px;border:none;background:transparent;color:var(--mu);font-family:var(--sans);font-weight:600;font-size:12px;cursor:pointer;transition:all .17s}
    .mtab.on{background:var(--lav);color:#0c0d18}

    /* ── Task ── */
    .tr{display:flex;align-items:center;gap:10px;padding:10px 13px;background:rgba(8,10,18,.65);border-radius:var(--r);border:1px solid var(--b1);margin-bottom:6px;transition:border-color .2s}
    .tr.done-t{border-color:rgba(45,212,191,.2)}
    .tchk{width:19px;height:19px;border-radius:6px;flex-shrink:0;border:1.5px solid var(--b2);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;color:#081412;transition:all .17s}
    .tchk.on{background:var(--teal);border-color:var(--teal)}

    /* ── Level pills ── */
    .lvp{padding:7px 15px;border-radius:100px;border:1px solid var(--b2);background:transparent;color:var(--mu);font-family:var(--sans);font-weight:500;font-size:12px;cursor:pointer;transition:all .15s}
    .lvp:hover,.lvp.on{border-color:var(--sky);color:var(--sky);background:rgba(74,168,232,.08)}

    /* ── Contact ── */
    .contact-hero{position:relative;overflow:hidden;background:linear-gradient(145deg,rgba(17,22,44,.96),rgba(9,11,24,.99));border:1px solid var(--b2);border-radius:var(--rxl);padding:50px;margin-bottom:28px;box-shadow:0 12px 44px rgba(0,0,0,.6)}
    .contact-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 80% 20%,rgba(90,184,122,.06),transparent 70%),radial-gradient(ellipse 40% 40% at 10% 80%,rgba(74,168,232,.04),transparent 70%);pointer-events:none}
    .contact-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(90,184,122,.5),transparent);transform-origin:left;animation:hline .8s ease .2s both}
    .contact-card{background:rgba(14,17,32,.84);border:1px solid var(--b1);border-radius:var(--rxl);padding:28px;box-shadow:0 4px 20px rgba(0,0,0,.5);transition:border-color .2s,transform .2s}
    .contact-card:hover{transform:translateY(-2px);border-color:var(--b2)}
    .contact-icon-wrap{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px;flex-shrink:0}
    .contact-val{font-size:16px;font-weight:600;color:var(--ink);margin-bottom:4px;letter-spacing:-.2px}
    .contact-val a{color:inherit;text-decoration:none;transition:color .2s}
    .contact-val a:hover{color:var(--g2)}
    .contact-lbl{font-size:11px;color:var(--mu);text-transform:uppercase;letter-spacing:.8px;font-weight:500}
    .contact-divider{width:1px;background:var(--b1);align-self:stretch;margin:0 10px}
    .form-input{width:100%;background:rgba(8,10,18,.75);border:1px solid var(--b2);border-radius:var(--r);color:var(--ink);font-family:var(--sans);font-size:13px;padding:12px 15px;outline:none;resize:none;transition:border-color .18s,box-shadow .18s;margin-bottom:14px}
    .form-input:focus{border-color:rgba(90,184,122,.45);box-shadow:0 0 0 3px rgba(90,184,122,.08)}
    .form-input::placeholder{color:var(--mu2)}
    .sent-badge{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;background:rgba(90,184,122,.1);border:1px solid rgba(90,184,122,.25);border-radius:var(--r);color:var(--sage);font-size:13px;font-weight:500;animation:fadeUp .4s ease both}
  `}</style>
);

/* ── AI via Groq — 100% free, no credit card, CORS enabled ── */
const GROQ_KEY = import.meta.env.VITE_GROQ_KEY || '';
async function callAI(userMsg, sysMsg = '') {
  const messages = [];
  if (sysMsg) messages.push({ role: 'system', content: sysMsg });
  messages.push({ role: 'user', content: userMsg });

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1500,
      messages,
    }),
  });
  const d = await res.json();
  if (d.error) throw new Error(d.error.message || JSON.stringify(d.error));
  return d.choices?.[0]?.message?.content || '';
}

/* ── Shared UI ── */
const Spinner = ({ color='var(--gold)', text='Thinking…' }) => (
  <div className="sp-wrap">
    <div className="sp" style={{borderTopColor:color}}/>
    <span style={{color:'var(--mu)',fontSize:12.5,fontStyle:'italic'}}>{text}</span>
  </div>
);
const RespBox = ({ text, accent='var(--gold)' }) => (
  <div className="resp" style={{'--ra':accent}}>{text}</div>
);
const Err = ({ msg }) => <div className="err-box">⚠ {msg}</div>;
const SHdr = ({ icon, title, em, sub, bg, bc }) => (
  <div className="fu" style={{marginBottom:28}}>
    <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:6}}>
      <div style={{width:46,height:46,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,background:bg,border:`1px solid ${bc}`,flexShrink:0}}>{icon}</div>
      <div className="sh-title">{title} <em>{em}</em></div>
    </div>
    <div style={{color:'var(--mu)',fontSize:13,marginLeft:60,marginTop:2}}>{sub}</div>
  </div>
);

/* ── Search History Component ── */
function SearchHistory({ items, onSelect, onDelete, onClear, accent, icon, label }) {
  const fmtTime = (ts) => {
    const d = new Date(ts), now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff/3600000)}h ago`;
    return d.toLocaleDateString();
  };
  return (
    <div className="hist-wrap">
      <div className="hist-header">
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:13,color:accent}}>◷</span>
          <span className="hist-title">Search History</span>
          <span className="pill" style={{background:`${accent}15`,color:accent,border:`1px solid ${accent}30`,marginLeft:4}}>{items.length}</span>
        </div>
        {items.length > 0 && (
          <button className="btn-xs btn-ghost btn" onClick={onClear} style={{fontSize:11,color:'var(--mu2)',border:'1px solid var(--b1)',borderRadius:6,padding:'4px 10px'}}>Clear all</button>
        )}
      </div>
      {items.length === 0
        ? <div className="hist-empty">No searches yet — {label} something to get started!</div>
        : items.map((item, i) => (
          <div key={item.id} className="hist-item" style={{animationDelay:`${i*40}ms`}} onClick={()=>onSelect(item.query)}>
            <div className="hist-icon" style={{background:`${accent}12`,border:`1px solid ${accent}25`}}>{icon}</div>
            <div className="hist-text" title={item.query}>{item.query}</div>
            {item.extra && <span style={{fontSize:11,color:'var(--mu)',marginRight:6,flexShrink:0}}>{item.extra}</span>}
            <span className="hist-meta">{fmtTime(item.ts)}</span>
            <button className="hist-del" onClick={e=>{e.stopPropagation();onDelete(item.id);}}>×</button>
          </div>
        ))
      }
    </div>
  );
}

/* ── Canvas background ── */
function BgCanvas() {
  const ref = useRef();
  useEffect(() => {
    const cv=ref.current, cx=cv.getContext('2d');
    let W,H,pts,raf;
    const resize=()=>{W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;};
    window.addEventListener('resize',resize); resize();
    const rnd=(a,b)=>a+Math.random()*(b-a);
    pts=Array.from({length:50},()=>({x:rnd(0,W),y:rnd(0,H),vx:rnd(-.2,.2),vy:rnd(-.2,.2),r:rnd(.8,1.8)}));
    const draw=()=>{
      cx.clearRect(0,0,W,H);
      [[W*.12,H*.18,'rgba(212,168,67,.04)',W*.5],[W*.88,H*.78,'rgba(45,212,191,.03)',W*.38],[W*.5,H*.45,'rgba(155,140,255,.025)',W*.3]].forEach(([x,y,c,r])=>{
        const g=cx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'transparent');cx.fillStyle=g;cx.fillRect(0,0,W,H);
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){cx.beginPath();cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.strokeStyle=`rgba(90,110,180,${(1-d/130)*.1})`;cx.lineWidth=.5;cx.stroke();}
      }
      pts.forEach(p=>{cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);cx.fillStyle='rgba(90,110,180,.2)';cx.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;});
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{window.removeEventListener('resize',resize);cancelAnimationFrame(raf);};
  },[]);
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}}/>;
}

/* ── HOME ── */
function HomeTab({ goTo, stats }) {
  const cards = [
    {tab:'notes', icon:'📝',bg:'rgba(212,168,67,.08)',bc:'rgba(212,168,67,.18)',ac:'var(--gold)', t:'Summarise Notes', s:'AI extracts key insights from any material'},
    {tab:'quiz',  icon:'🧠',bg:'rgba(224,92,110,.08)',bc:'rgba(224,92,110,.18)',ac:'var(--rose)', t:'Generate a Quiz',  s:'Test comprehension on any subject instantly'},
    {tab:'planner',icon:'📅',bg:'rgba(45,212,191,.08)',bc:'rgba(45,212,191,.18)',ac:'var(--teal)',t:'Plan Your Week', s:'AI builds a structured curriculum from your goals'},
    {tab:'explain',icon:'✦', bg:'rgba(74,168,232,.08)',bc:'rgba(74,168,232,.18)',ac:'var(--sky)', t:'Explain Any Topic',s:'Adaptive explanations calibrated to your level'},
  ];
  return (
    <div className="fu" style={{maxWidth:860}}>
      <div className="hero">
        <div className="hero-line"/>
        <div style={{position:'relative'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:7,padding:'5px 14px',borderRadius:100,background:'rgba(212,168,67,.08)',border:'1px solid rgba(212,168,67,.18)',color:'var(--g2)',fontSize:11,fontWeight:600,letterSpacing:'.8px',textTransform:'uppercase',marginBottom:20}}>
            <span className="kd" style={{marginRight:4}}/> AI-Powered Learning Platform
          </div>
          <h1 style={{fontFamily:'var(--serif)',fontSize:44,fontWeight:400,lineHeight:1.1,letterSpacing:'-.6px',marginBottom:14}}>Your <em style={{fontStyle:'italic',color:'var(--g2)'}}>intelligent</em><br/>study companion.</h1>
          <p style={{color:'var(--mu)',fontSize:14,maxWidth:440,lineHeight:1.8,marginBottom:28}}>Summarise complex notes, generate adaptive quizzes, plan your curriculum, and maintain deep focus — powered by Claude AI.</p>
          <div style={{display:'flex',gap:12}}>
            <button className="btn btn-gold" onClick={()=>goTo('notes')}>Get Started →</button>
            <button className="btn btn-outline" onClick={()=>goTo('explain')}>Explore Features</button>
          </div>
        </div>
      </div>
      <div style={{fontSize:10,color:'var(--mu)',fontWeight:600,textTransform:'uppercase',letterSpacing:1,marginBottom:11}}>Your Statistics</div>
      <div className="sg">
        {[['var(--g2)',stats.notes,'Notes Summarised'],['var(--rose)',stats.quizzes,'Quizzes Taken'],['var(--lav)',stats.sessions,'Focus Sessions'],['var(--teal)',stats.tasks,'Tasks Completed']].map(([c,v,l],i)=>(
          <div key={i} className="sc pi" style={{'--sa':c,animationDelay:`${i*55}ms`}}>
            <div style={{fontFamily:'var(--serif)',fontSize:32,color:c,lineHeight:1}}>{v}</div>
            <div style={{fontSize:11,color:'var(--mu)',marginTop:4,fontWeight:500,textTransform:'uppercase',letterSpacing:'.5px'}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,color:'var(--mu)',fontWeight:600,textTransform:'uppercase',letterSpacing:1,marginBottom:11}}>Quick Access</div>
      <div className="qag">
        {cards.map((c,i)=>(
          <div key={i} className="qac" onClick={()=>goTo(c.tab)}
            onMouseEnter={e=>e.currentTarget.style.borderColor=c.ac}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--b1)'}>
            <div className="qai" style={{background:c.bg,borderColor:c.bc}}>{c.icon}</div>
            <div>
              <div style={{fontFamily:'var(--serif)',fontSize:15,letterSpacing:'-.2px'}}>{c.t}</div>
              <div style={{fontSize:12,color:'var(--mu)',marginTop:2}}>{c.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── NOTES ── */
function NotesTab({ onStat }) {
  const [text,setText]=useState('');const [loading,setLoading]=useState(false);
  const [result,setResult]=useState('');const [err,setErr]=useState('');
  const run=async()=>{
    if(!text.trim()) return;
    setLoading(true);setResult('');setErr('');
    try{
      const r=await callAI(`Summarise the following student notes:\n\n${text}`,
        `You are a world-class academic tutor. Transform raw notes into polished summaries:\n\nOVERVIEW\n2-3 sentence paragraph summarising the topic.\n\nCORE CONCEPTS\n- Bullet list of key ideas and definitions\n- Bold **key terms** inline\n\nKEY DETAILS & EXAMPLES\n- Sub-bullets with nuances, formulas, dates, names, or examples\n\nCONNECTIONS & CONTEXT\nBrief note connecting ideas to broader topics.\n\n3 KEY TAKEAWAYS\n1. Most important thing\n2. Second most important\n3. Third most important\n\nNever invent information not in the notes.`);
      setResult(r);onStat('notes');
    }catch(e){setErr(e.message);}
    setLoading(false);
  };
  return (
    <div style={{maxWidth:860}}>
      <SHdr icon="📝" title="Notes" em="Summariser" sub="Paste any lecture notes or textbook content — AI distils them into structured, actionable summaries." bg="rgba(212,168,67,.07)" bc="rgba(212,168,67,.18)"/>
      <div className="card fu" style={{marginBottom:16}}>
        <label className="lbl">Source Material</label>
        <textarea rows={10} placeholder="Paste your lecture notes, textbook passages, or any study material here…" value={text} onChange={e=>setText(e.target.value)} style={{minHeight:200}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14}}>
          <span style={{fontSize:11,color:'var(--mu)'}}>{text.length} characters</span>
          <div style={{display:'flex',gap:10}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>{setText('');setResult('');setErr('');}}>Clear</button>
            <button className="btn btn-gold" onClick={run} disabled={loading||!text.trim()}>Summarise →</button>
          </div>
        </div>
      </div>
      {loading&&<Spinner text="Analysing your notes…"/>}
      {err&&<Err msg={err}/>}
      {result&&<div className="card fu" style={{borderColor:'rgba(212,168,67,.2)'}}>
        <span className="pill" style={{background:'rgba(212,168,67,.1)',color:'var(--g2)',border:'1px solid rgba(212,168,67,.2)',marginBottom:14,display:'inline-flex'}}>✦ AI Summary</span>
        <RespBox text={result} accent="var(--gold)"/>
      </div>}
    </div>
  );
}

/* ── QUIZ ── */
function QuizTab({ onStat }) {
  const [topic,setTopic]=useState('');const [count,setCount]=useState(5);
  const [loading,setLoading]=useState(false);const [qs,setQs]=useState([]);
  const [ans,setAns]=useState({});const [rev,setRev]=useState({});
  const [score,setScore]=useState(null);const [err,setErr]=useState('');
  const [history,setHistory]=useState([]);

  const addHistory=(query,numQ)=>{
    const entry={id:Date.now(),query,extra:`${numQ} Qs`,ts:Date.now()};
    setHistory(h=>[entry,...h.filter(x=>x.query!==query).slice(0,19)]);
  };
  const deleteHist=(id)=>setHistory(h=>h.filter(x=>x.id!==id));
  const clearHist=()=>setHistory([]);
  const reuse=(q)=>{setTopic(q);};

  const generate=async()=>{
    if(!topic.trim()) return;
    setLoading(true);setQs([]);setAns({});setRev({});setScore(null);setErr('');
    try{
      const raw=await callAI(
        `Generate ${count} multiple-choice quiz questions about: "${topic}". Return ONLY a valid JSON array, no markdown.\nFormat: [{"q":"question","options":["A) opt","B) opt","C) opt","D) opt"],"answer":"A) opt","explanation":"2-3 sentence explanation"}]`,
        `You are an expert educator. Create rigorous quiz questions that test genuine understanding.\n- Mix factual, conceptual, and application questions\n- Wrong answers must represent common misconceptions\n- Explanations: 2-3 sentences on why correct and why others are wrong\n- Return ONLY valid JSON array. Nothing else.`
      );
      const parsed=JSON.parse(raw.replace(/```json|```/g,'').trim());
      setQs(parsed);onStat('quizzes');addHistory(topic,count);
    }catch(e){setErr(e.message);}
    setLoading(false);
  };

  const select=(qi,opt)=>{if(rev[qi])return;setAns(a=>({...a,[qi]:opt}));};
  const check=(qi)=>{if(!ans[qi])return;setRev(r=>({...r,[qi]:true}));};
  const allRev=qs.length>0&&qs.every((_,i)=>rev[i]);
  const showScore=()=>{let c=0;qs.forEach((q,i)=>{if(ans[i]===q.answer)c++;});setScore(c);};

  return (
    <div style={{maxWidth:860}}>
      <SHdr icon="🧠" title="Quiz" em="Generator" sub="Enter any topic and receive a custom multiple-choice assessment instantly." bg="rgba(224,92,110,.07)" bc="rgba(224,92,110,.18)"/>
      <div className="card fu" style={{marginBottom:22}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 110px',gap:14,alignItems:'end'}}>
          <div><label className="lbl">Topic</label>
            <input type="text" placeholder="e.g. Accessibility in Digital Design, Photosynthesis, React Hooks…" value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==='Enter'&&generate()}/>
          </div>
          <div><label className="lbl">Questions</label>
            <input type="number" min={3} max={10} value={count} onChange={e=>setCount(+e.target.value)}/>
          </div>
        </div>
        <div style={{marginTop:14,display:'flex',justifyContent:'flex-end'}}>
          <button className="btn btn-rose" onClick={generate} disabled={loading||!topic.trim()}>Generate Quiz →</button>
        </div>
      </div>

      {loading&&<Spinner color="var(--rose)" text="Generating questions…"/>}
      {err&&<Err msg={err}/>}

      {qs.map((q,qi)=>{
        const picked=ans[qi],isRev=rev[qi],correct=q.answer;
        return (
          <div key={qi} className="card fu" style={{marginBottom:14,animationDelay:`${qi*45}ms`,borderColor:isRev?(picked===correct?'rgba(45,212,191,.25)':'rgba(224,92,110,.25)'):'var(--b1)'}}>
            <div style={{display:'flex',gap:10,marginBottom:14}}>
              <span className="pill" style={{background:'rgba(224,92,110,.1)',color:'var(--rose)',border:'1px solid rgba(224,92,110,.2)',flexShrink:0,alignSelf:'flex-start'}}>Q{qi+1}</span>
              <p style={{fontWeight:500,lineHeight:1.65,paddingTop:1,fontSize:14}}>{q.q}</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
              {q.options.map((opt,oi)=>{
                let cls='qopt';
                if(picked===opt&&!isRev) cls+=' qsel';
                if(isRev&&opt===correct) cls+=' qright';
                if(isRev&&opt===picked&&picked!==correct) cls+=' qwrong';
                if(isRev) cls+=' qdis';
                return <button key={oi} className={cls} onClick={()=>select(qi,opt)}>{opt}{isRev&&opt===correct?' ✓':''}{isRev&&opt===picked&&picked!==correct?' ✗':''}</button>;
              })}
            </div>
            {isRev&&q.explanation&&<div style={{background:'rgba(8,10,18,.75)',borderRadius:'var(--r)',padding:'10px 14px',fontSize:12.5,color:'var(--ink2)',borderLeft:'2px solid var(--teal)',marginBottom:10}}>→ {q.explanation}</div>}
            {!isRev&&<button className="btn btn-ghost btn-sm" onClick={()=>check(qi)} disabled={!picked}>Check Answer</button>}
          </div>
        );
      })}

      {allRev&&score===null&&<div style={{textAlign:'center',marginBottom:20}}><button className="btn btn-gold" onClick={showScore}>See Final Score →</button></div>}
      {score!==null&&<div className="score-panel">
        <div style={{fontSize:52,marginBottom:12}}>{score===qs.length?'🏆':score>=qs.length/2?'✦':'◎'}</div>
        <div style={{fontFamily:'var(--serif)',fontSize:50,letterSpacing:'-.5px'}}><span style={{color:'var(--g2)'}}>{score}</span><span style={{color:'var(--mu)'}}> / {qs.length}</span></div>
        <p style={{color:'var(--mu)',marginTop:10,fontSize:13}}>{score===qs.length?'Flawless. Exceptional performance.':score>=qs.length/2?'Strong result. Keep refining.':'Keep studying — every attempt builds mastery.'}</p>
        <button className="btn btn-outline" onClick={()=>{setQs([]);setTopic('');setScore(null);}} style={{marginTop:20}}>New Quiz</button>
      </div>}

      {/* ── Search History ── */}
      <SearchHistory
        items={history}
        onSelect={q=>{reuse(q);}}
        onDelete={deleteHist}
        onClear={clearHist}
        accent="var(--rose)"
        icon="🧠"
        label="quiz"
      />
    </div>
  );
}

/* ── PLANNER ── */
function PlannerTab({ onStat }) {
  const [goal,setGoal]=useState('');const [days,setDays]=useState(7);
  const [loading,setLoading]=useState(false);const [plan,setPlan]=useState('');const [err,setErr]=useState('');
  const [tasks,setTasks]=useState([]);const [newTask,setNewTask]=useState('');
  const saveTasks=t=>setTasks(t);
  const addTask=()=>{if(!newTask.trim())return;saveTasks([...tasks,{text:newTask.trim(),done:false}]);setNewTask('');};
  const toggle=i=>{const t=[...tasks];t[i]={...t[i],done:!t[i].done};if(t[i].done)onStat('tasks');saveTasks(t);};
  const remove=i=>{const t=[...tasks];t.splice(i,1);saveTasks(t);};
  const done=tasks.filter(t=>t.done).length;
  const pct=tasks.length?Math.round(done/tasks.length*100):0;
  const generate=async()=>{
    if(!goal.trim())return;
    setLoading(true);setPlan('');setErr('');
    try{
      const r=await callAI(`Create a detailed ${days}-day study plan for: "${goal}". Full day-by-day breakdown.`,
        `You are an expert academic coach. Create structured, realistic, motivating study plans.\nFor each day: clear focus topic, 3-4 specific tasks with time estimates, and a study technique tip.\nEnd with a brief summary and 3 subject-specific study tips.`);
      setPlan(r);
    }catch(e){setErr(e.message);}
    setLoading(false);
  };
  return (
    <div style={{maxWidth:860}}>
      <SHdr icon="📅" title="Study" em="Planner" sub="Set your learning goals, generate an AI curriculum, and track tasks through to completion." bg="rgba(45,212,191,.07)" bc="rgba(45,212,191,.18)"/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:22}}>
        <div className="card">
          <div style={{fontFamily:'var(--serif)',fontSize:17,marginBottom:16,letterSpacing:'-.2px'}}>AI Plan Generator</div>
          <label className="lbl">Learning Goal</label>
          <textarea rows={3} placeholder="e.g. Master linear algebra before my exam in two weeks" value={goal} onChange={e=>setGoal(e.target.value)} style={{marginBottom:12}}/>
          <label className="lbl">Available Days</label>
          <input type="number" min={1} max={30} value={days} onChange={e=>setDays(+e.target.value)} style={{marginBottom:16}}/>
          <button className="btn btn-teal" onClick={generate} disabled={loading||!goal.trim()} style={{width:'100%',justifyContent:'center'}}>Generate Study Plan →</button>
        </div>
        <div className="card">
          <div style={{fontFamily:'var(--serif)',fontSize:17,marginBottom:10,letterSpacing:'-.2px'}}>Task Tracker</div>
          {tasks.length>0&&<div style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--mu)',marginBottom:6}}><span>{done} / {tasks.length} completed</span><span style={{color:'var(--teal)',fontWeight:600}}>{pct}%</span></div>
            <div className="pbar"><div className="pbar-fill" style={{background:'var(--teal)',width:`${pct}%`}}/></div>
          </div>}
          <div style={{display:'flex',gap:8,marginBottom:10}}>
            <input type="text" placeholder="Add a task…" value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTask()} style={{flex:1,padding:'10px 12px'}}/>
            <button className="btn btn-outline btn-sm" onClick={addTask} style={{borderRadius:8,padding:'10px 18px',fontSize:16}}>+</button>
          </div>
          <div style={{maxHeight:190,overflowY:'auto'}}>
            {tasks.length===0&&<p style={{color:'var(--mu2)',fontSize:12,textAlign:'center',padding:'18px 0'}}>No tasks yet</p>}
            {tasks.map((t,i)=>(
              <div key={i} className={`tr${t.done?' done-t':''}`}>
                <button className={`tchk${t.done?' on':''}`} onClick={()=>toggle(i)}>{t.done?'✓':''}</button>
                <span style={{flex:1,fontSize:13,textDecoration:t.done?'line-through':'none',color:t.done?'var(--mu)':'var(--ink2)'}}>{t.text}</span>
                <button onClick={()=>remove(i)} style={{background:'none',border:'none',color:'var(--mu2)',cursor:'pointer',fontSize:16,lineHeight:1,padding:'0 4px'}}>×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {loading&&<Spinner color="var(--teal)" text="Building your curriculum…"/>}
      {err&&<Err msg={err}/>}
      {plan&&<div className="card fu" style={{borderColor:'rgba(45,212,191,.2)'}}>
        <span className="pill" style={{background:'rgba(45,212,191,.1)',color:'var(--teal)',border:'1px solid rgba(45,212,191,.2)',marginBottom:14,display:'inline-flex'}}>✦ {days}-Day Study Plan</span>
        <RespBox text={plan} accent="var(--teal)"/>
      </div>}
    </div>
  );
}

/* ── TIMER ── */
function TimerTab({ onStat }) {
  const [secs,setSecs]=useState(25*60);const [init,setInit]=useState(25*60);
  const [running,setRunning]=useState(false);const [mode,setMode]=useState('focus');
  const [sessions,setSessions]=useState(0);const [task,setTask]=useState('');
  const [custM,setCustM]=useState(25);const [custS,setCustS]=useState(0);const [custL,setCustL]=useState('');
  const [presets,setPresets]=useState([{l:'Pomodoro',m:25,s:0},{l:'Power 15',m:15,s:0},{l:'Deep Work',m:50,s:0},{l:'Short Break',m:5,s:0},{l:'Long Break',m:15,s:0},{l:'Study Hour',m:60,s:0}]);
  const iv=useRef(null);
  const stop=()=>{clearInterval(iv.current);setRunning(false);};
  const applyTimer=s=>{stop();setSecs(s);setInit(s);};
  const switchMode=m=>{stop();setMode(m);const s={focus:25*60,short:5*60,long:15*60}[m];setSecs(s);setInit(s);};
  const toggle=()=>{
    if(running){stop();return;}
    setRunning(true);
    iv.current=setInterval(()=>{
      setSecs(prev=>{
        if(prev>0)return prev-1;
        clearInterval(iv.current);setRunning(false);
        setSessions(n=>{onStat('sessions');return n+1;});
        if(mode==='focus')switchMode('short');else switchMode('focus');
        return 0;
      });
    },1000);
  };
  useEffect(()=>()=>clearInterval(iv.current),[]);
  const m=Math.floor(secs/60),s=secs%60;
  const circ=2*Math.PI*100;
  const offset=Math.max(0,circ-((init-secs)/Math.max(init,1))*circ);
  const ac=mode==='focus'?'var(--lav)':mode==='short'?'var(--teal)':'var(--g2)';
  return (
    <div style={{maxWidth:860}}>
      <SHdr icon="⏱" title="Focus" em="Timer" sub="Customisable Pomodoro sessions. Multiple presets. Fully adjustable durations." bg="rgba(155,140,255,.07)" bc="rgba(155,140,255,.18)"/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:22,alignItems:'start'}}>
        <div className="card" style={{textAlign:'center',borderColor:'rgba(155,140,255,.18)'}}>
          <div style={{display:'inline-flex',background:'rgba(8,10,18,.85)',border:'1px solid var(--b2)',borderRadius:100,padding:4,marginBottom:26}}>
            {[['focus','Focus'],['short','Short Break'],['long','Long Break']].map(([k,l])=>(
              <button key={k} className={`mtab${mode===k?' on':''}`} onClick={()=>switchMode(k)} style={mode===k?{background:ac,color:'#0c0d18'}:{}}>{l}</button>
            ))}
          </div>
          <div style={{position:'relative',display:'inline-block',marginBottom:22}}>
            <svg width={220} height={220} style={{transform:'rotate(-90deg)',display:'block',margin:'0 auto'}}>
              <circle cx={110} cy={110} r={100} fill="none" stroke="var(--b2)" strokeWidth={8}/>
              <circle cx={110} cy={110} r={100} fill="none" stroke={ac} strokeWidth={8}
                strokeDasharray={circ.toFixed(1)} strokeDashoffset={offset.toFixed(1)}
                strokeLinecap="round" style={{transition:'stroke-dashoffset 1s ease',filter:`drop-shadow(0 0 7px ${ac}60)`}}/>
            </svg>
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div style={{fontFamily:'var(--serif)',fontSize:50,color:ac,lineHeight:1,letterSpacing:'-.5px'}}>{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}</div>
              <div style={{fontSize:10,color:'var(--mu)',marginTop:6,textTransform:'uppercase',letterSpacing:'1.5px',fontWeight:600}}>{mode==='focus'?'DEEP FOCUS':mode==='short'?'SHORT BREAK':'LONG BREAK'}</div>
            </div>
          </div>
          <div style={{maxWidth:280,margin:'0 auto 18px'}}><input type="text" placeholder="What are you working on?" value={task} onChange={e=>setTask(e.target.value)} style={{textAlign:'center'}}/></div>
          <div style={{display:'flex',gap:10,justifyContent:'center',marginBottom:22}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>{stop();setSecs(init);}}>↺ Reset</button>
            <button className="btn" onClick={toggle} style={{background:ac,color:'#0c0d18',padding:'11px 30px',fontSize:14,boxShadow:`0 4px 20px ${ac}50`}}>{running?'⏸ Pause':'▶ Start'}</button>
          </div>
          <div style={{fontSize:10,color:'var(--mu)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.8px',marginBottom:8}}>Sessions Completed</div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginBottom:6}}>
            {Array.from({length:Math.max(sessions,4)}).map((_,i)=>(
              <div key={i} className={`sdot${i<sessions?' lit':''}`} style={i<sessions&&(i+1)%4===0?{background:'var(--gold)'}:{}}/>
            ))}
          </div>
          <div style={{fontFamily:'var(--serif)',color:ac,fontSize:22}}>{sessions}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card">
            <div style={{fontFamily:'var(--serif)',fontSize:15,marginBottom:13,letterSpacing:'-.2px'}}>Quick Presets</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {presets.map((p,i)=>(
                <button key={i} className="ppill" onClick={()=>applyTimer(p.m*60+p.s)}>
                  <div style={{fontWeight:600,fontSize:12}}>{p.l}</div>
                  <div style={{fontSize:11,opacity:.55,marginTop:1}}>{String(p.m).padStart(2,'0')}:{String(p.s).padStart(2,'0')}</div>
                </button>
              ))}
            </div>
            <div className="divider"/>
            <button className="btn btn-ghost btn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>setPresets([...presets,{l:custL||'Custom',m:custM,s:custS}])}>+ Save as Preset</button>
          </div>
          <div className="card">
            <div style={{fontFamily:'var(--serif)',fontSize:15,marginBottom:13,letterSpacing:'-.2px'}}>Custom Duration</div>
            <label className="lbl">Minutes &amp; Seconds</label>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <input type="number" min={0} max={180} value={custM} onChange={e=>setCustM(+e.target.value)} style={{textAlign:'center',fontFamily:'var(--serif)',fontSize:20,padding:10}}/>
              <span style={{color:'var(--mu)',fontFamily:'var(--serif)',fontSize:22}}>:</span>
              <input type="number" min={0} max={59} value={custS} onChange={e=>setCustS(+e.target.value)} style={{textAlign:'center',fontFamily:'var(--serif)',fontSize:20,padding:10}}/>
            </div>
            <label className="lbl">Label</label>
            <input type="text" placeholder="e.g. Deep Reading" value={custL} onChange={e=>setCustL(e.target.value)} style={{marginBottom:12}}/>
            <button className="btn btn-outline btn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>applyTimer(custM*60+custS)}>Apply Timer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── EXPLAIN ── */
function ExplainTab() {
  const [topic,setTopic]=useState('');const [level,setLevel]=useState('high school');
  const [loading,setLoading]=useState(false);const [result,setResult]=useState('');const [err,setErr]=useState('');
  const [fuQ,setFuQ]=useState('');const [fuLoad,setFuLoad]=useState(false);
  const [fuRes,setFuRes]=useState('');const [fuErr,setFuErr]=useState('');
  const [history,setHistory]=useState([]);
  const lastEx=useRef('');

  const addHistory=(query,lv)=>{
    const entry={id:Date.now(),query,extra:lv,ts:Date.now()};
    setHistory(h=>[entry,...h.filter(x=>x.query!==query).slice(0,19)]);
  };
  const deleteHist=(id)=>setHistory(h=>h.filter(x=>x.id!==id));
  const clearHist=()=>setHistory([]);

  const explain=async()=>{
    if(!topic.trim())return;
    setLoading(true);setResult('');setErr('');setFuRes('');setFuQ('');
    try{
      const r=await callAI(
        `Explain "${topic}" to a ${level} student. Provide a thorough, well-structured explanation.`,
        `You are a brilliant teacher with deep knowledge across all subjects.\n\nStructure:\n\nWHAT IT IS\nClear 2-3 sentence definition.\n\nTHE CORE IDEA\nVivid analogy a ${level} student would instantly grasp.\n\nHOW IT WORKS (or WHY IT MATTERS)\nStep-by-step with concrete examples. For design/UX: real examples of good and bad practice.\n\nKEY POINTS TO REMEMBER\n- 3-5 specific, memorable bullet points\n\nCOMMON MISCONCEPTIONS\n1-2 things people often get wrong.\n\nCalibrate to ${level} level. Be thorough and engaging.`
      );
      setResult(r);lastEx.current=r;addHistory(topic,level);
    }catch(e){setErr(e.message);}
    setLoading(false);
  };

  const askFU=async()=>{
    if(!fuQ.trim()||!lastEx.current)return;
    setFuLoad(true);setFuRes('');setFuErr('');
    try{
      const r=await callAI(
        `Topic: "${topic}" (${level} level)\nPrevious explanation:\n${lastEx.current}\n\nStudent follow-up: "${fuQ}"\n\nAnswer clearly.`,
        `You are a patient expert tutor. Answer directly, build on the previous explanation, correct any misconceptions gently.`
      );
      setFuRes(r);setFuQ('');
    }catch(e){setFuErr(e.message);}
    setFuLoad(false);
  };

  const levels=[['elementary','Elementary'],['middle school','Middle School'],['high school','High School'],['university','University'],['expert','Expert']];

  return (
    <div style={{maxWidth:860}}>
      <SHdr icon="✦" title="AI" em="Explainer" sub="Any concept, explained with precision and clarity — calibrated exactly to your knowledge level." bg="rgba(74,168,232,.07)" bc="rgba(74,168,232,.18)"/>
      <div className="card fu" style={{marginBottom:18}}>
        <label className="lbl">Concept or Topic</label>
        <input type="text" placeholder="e.g. Accessibility in Digital Design, Quantum entanglement, The French Revolution…" value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==='Enter'&&explain()} style={{marginBottom:16}}/>
        <label className="lbl">Knowledge Level</label>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20}}>
          {levels.map(([v,l])=>(
            <button key={v} className={`lvp${level===v?' on':''}`} onClick={()=>setLevel(v)}>{l}</button>
          ))}
        </div>
        <button className="btn btn-gold" onClick={explain} disabled={loading||!topic.trim()}>Explain →</button>
      </div>
      {loading&&<Spinner color="var(--sky)" text="Formulating explanation…"/>}
      {err&&<Err msg={err}/>}
      {result&&<>
        <div className="card fu" style={{borderColor:'rgba(74,168,232,.2)',marginBottom:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <span className="pill" style={{background:'rgba(74,168,232,.1)',color:'var(--sky)',border:'1px solid rgba(74,168,232,.2)'}}>✦ {level} level</span>
            <span style={{fontSize:11,color:'var(--mu)'}}>{topic}</span>
          </div>
          <RespBox text={result} accent="var(--sky)"/>
        </div>
        <div className="card" style={{borderColor:'var(--b2)',marginBottom:16}}>
          <div style={{fontFamily:'var(--serif)',fontSize:16,marginBottom:12,color:'var(--mu)',letterSpacing:'-.2px'}}>Follow-up Question</div>
          <div style={{display:'flex',gap:10}}>
            <input type="text" placeholder="What would you like clarified?" value={fuQ} onChange={e=>setFuQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&askFU()} style={{flex:1}}/>
            <button className="btn btn-outline btn-sm" onClick={askFU} disabled={fuLoad||!fuQ.trim()}>Ask →</button>
          </div>
          {fuLoad&&<Spinner color="var(--sky)" text="Thinking…"/>}
          {fuErr&&<Err msg={fuErr}/>}
          {fuRes&&<RespBox text={fuRes} accent="var(--sky)"/>}
        </div>
      </>}

      {/* ── Search History ── */}
      <SearchHistory
        items={history}
        onSelect={q=>{setTopic(q);}}
        onDelete={deleteHist}
        onClear={clearHist}
        accent="var(--sky)"
        icon="✦"
        label="explain"
      />
    </div>
  );
}

/* ── CONTACT ── */
function ContactTab() {
  const [name,setName]=useState('');const [email,setEmail]=useState('');
  const [msg,setMsg]=useState('');const [sent,setSent]=useState(false);

  const handleSend=()=>{
    if(!name.trim()||!msg.trim())return;
    setSent(true);
    setTimeout(()=>{setSent(false);setName('');setEmail('');setMsg('');},4000);
  };

  const contacts=[
    {icon:'📞',label:'Phone',val:'8595996575',href:'tel:+918595996575',ac:'var(--teal)',bg:'rgba(45,212,191,.08)',bc:'rgba(45,212,191,.18)'},
    {icon:'✉️',label:'Email',val:'nirmit.work29@gmail.com',href:'mailto:nirmit.work29@gmail.com',ac:'var(--gold)',bg:'rgba(212,168,67,.08)',bc:'rgba(212,168,67,.18)'},
  ];

  return (
    <div style={{maxWidth:860}}>
      {/* Header */}
      <div className="fu" style={{marginBottom:28}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:6}}>
          <div style={{width:46,height:46,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,background:'rgba(90,184,122,.07)',border:'1px solid rgba(90,184,122,.18)',flexShrink:0}}>💬</div>
          <div className="sh-title">Reach <em>Us</em></div>
        </div>
        <div style={{color:'var(--mu)',fontSize:13,marginLeft:60,marginTop:2}}>Have a question, feedback, or idea? We'd love to hear from you.</div>
      </div>

      {/* Hero banner */}
      <div className="contact-hero fu">
        <div className="contact-line"/>
        <div style={{position:'relative'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:7,padding:'5px 14px',borderRadius:100,background:'rgba(90,184,122,.08)',border:'1px solid rgba(90,184,122,.2)',color:'var(--sage)',fontSize:11,fontWeight:600,letterSpacing:'.8px',textTransform:'uppercase',marginBottom:18}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:'var(--sage)',display:'inline-block',animation:'pulse 2s ease-in-out infinite'}}/> We're here to help
          </div>
          <h2 style={{fontFamily:'var(--serif)',fontSize:36,fontWeight:400,lineHeight:1.15,letterSpacing:'-.5px',marginBottom:12}}>Let's <em style={{fontStyle:'italic',color:'var(--sage)'}}>connect.</em></h2>
          <p style={{color:'var(--mu)',fontSize:14,maxWidth:420,lineHeight:1.8}}>Whether you have feedback on StudyAI, a question about a feature, or just want to say hello — reach out anytime.</p>
        </div>
      </div>

      {/* Contact cards */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:28}}>
        {contacts.map((c,i)=>(
          <div key={i} className="contact-card fu" style={{animationDelay:`${i*80}ms`}}>
            <div className="contact-icon-wrap" style={{background:c.bg,border:`1px solid ${c.bc}`}}>{c.icon}</div>
            <div className="contact-lbl">{c.label}</div>
            <div className="contact-val" style={{marginTop:6}}>
              <a href={c.href} style={{color:'var(--ink)'}} onMouseEnter={e=>e.currentTarget.style.color=c.ac} onMouseLeave={e=>e.currentTarget.style.color='var(--ink)'}>{c.val}</a>
            </div>
            <div style={{marginTop:14}}>
              <a href={c.href} className="btn btn-outline btn-sm" style={{textDecoration:'none',display:'inline-flex',borderColor:c.bc,color:'var(--mu)'}}>
                {c.icon === '📞' ? 'Call Now' : 'Send Email'} →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Message form */}
      <div className="card fu" style={{borderColor:'rgba(90,184,122,.15)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:22}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'var(--sage)',animation:'pulse 2s ease-in-out infinite'}}/>
          <div style={{fontFamily:'var(--serif)',fontSize:18,letterSpacing:'-.2px'}}>Send us a <em style={{fontStyle:'italic',color:'var(--sage)'}}>message</em></div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
          <div>
            <label className="lbl">Your Name</label>
            <input type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)}
              style={{borderColor:name?'rgba(90,184,122,.35)':'var(--b2)'}}/>
          </div>
          <div>
            <label className="lbl">Your Email (optional)</label>
            <input type="text" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
        </div>

        <label className="lbl">Message</label>
        <textarea rows={5} placeholder="Write your message, feedback, or question here…" value={msg} onChange={e=>setMsg(e.target.value)}
          className="form-input" style={{borderColor:msg?'rgba(90,184,122,.35)':'var(--b2)',marginBottom:18}}/>

        {sent
          ? <div className="sent-badge">✓ Message sent! We'll get back to you soon.</div>
          : <button className="btn btn-teal" onClick={handleSend} disabled={!name.trim()||!msg.trim()} style={{background:'linear-gradient(135deg,var(--sage),#3d9455)',color:'#fff',boxShadow:'0 3px 14px rgba(90,184,122,.25)'}}>
              Send Message →
            </button>
        }
      </div>

      {/* Footer note */}
      <div style={{textAlign:'center',marginTop:28,padding:'20px',color:'var(--mu2)',fontSize:12,lineHeight:1.8}}>
        StudyAI is built with ❤ and powered by Claude AI.<br/>
        <span style={{color:'var(--mu)'}}>Response time is typically within 24 hours.</span>
      </div>
    </div>
  );
}

/* ── ROOT ── */
const NAV=[
  {tab:'home',    label:'Overview',    icon:'◈', sec:'Workspace',   na:'var(--gold)'},
  {tab:'notes',   label:'Notes',       icon:'⊞', na:'var(--g2)'},
  {tab:'quiz',    label:'Quiz',        icon:'◎', sec:'Practice',    na:'var(--rose)'},
  {tab:'explain', label:'Explain',     icon:'◇', na:'var(--sky)'},
  {tab:'planner', label:'Planner',     icon:'▦', sec:'Productivity', na:'var(--teal)'},
  {tab:'timer',   label:'Focus Timer', icon:'◉', na:'var(--lav)'},
  {tab:'contact', label:'Contact Us',  icon:'✉', sec:'Support',      na:'var(--sage)'},
];

export default function App() {
  const [tab,setTab]=useState('home');
  const [stats,setStats]=useState({notes:0,quizzes:0,sessions:0,tasks:0});
  const onStat=key=>setStats(s=>({...s,[key]:(s[key]||0)+1}));
  let seen=new Set();
  return (
    <>
      <G/>
      <BgCanvas/>
      <div className="app" style={{position:'relative',zIndex:1}}>
        <nav className="sb">
          <div style={{padding:'0 10px 26px'}}>
            <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:5}}>
              <div className="sb-gem">✦</div>
              <div style={{fontFamily:'var(--serif)',fontSize:21,letterSpacing:'-.3px'}}>StudyAI</div>
            </div>
            <div style={{fontSize:10,color:'var(--mu)',marginLeft:45,textTransform:'uppercase',letterSpacing:'1.2px'}}>Intelligent Learning Platform</div>
          </div>
          {NAV.map(n=>{
            const showSec=n.sec&&!seen.has(n.sec);if(n.sec)seen.add(n.sec);
            return (<div key={n.tab}>
              {showSec&&<div className="sb-sec">{n.sec}</div>}
              <button className={`nb${tab===n.tab?' on':''}`} style={{'--na':n.na}} onClick={()=>setTab(n.tab)}>
                <span style={{fontSize:14,width:20,textAlign:'center',opacity:.8}}>{n.icon}</span>{n.label}
              </button>
            </div>);
          })}

        </nav>
        <main className="main">
          {tab==='home'    && <HomeTab goTo={setTab} stats={stats}/>}
          {tab==='notes'   && <NotesTab onStat={onStat}/>}
          {tab==='quiz'    && <QuizTab onStat={onStat}/>}
          {tab==='planner' && <PlannerTab onStat={onStat}/>}
          {tab==='timer'   && <TimerTab onStat={onStat}/>}
          {tab==='explain' && <ExplainTab/>}
          {tab==='contact' && <ContactTab/>}
        </main>
      </div>
    </>
  );
}
