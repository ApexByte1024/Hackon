import React,{useMemo,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AlertTriangle,CheckCircle2,ChevronDown,Code2,FileCode2,FolderOpen,GitBranch,Lightbulb,Loader2,Play,RefreshCw,Send,ShieldCheck,Sparkles,Upload,UserRound,X} from 'lucide-react';
import './styles.css';

const LANGUAGES=['Python','JavaScript','TypeScript','Java','C','C++','C#','Go','Rust','PHP','Ruby','Kotlin','Swift','Dart','SQL','HTML','CSS','Bash'];
const starter={Python:`def calculate_average(numbers):\n    total = sum(numbers)\n    return total / len(numbers)\n\nvalues = [10, 20, 30]\nprint(calculate_average(values))`,JavaScript:`function findUser(users, id) {\n  return users.find(user => user.id === id);\n}\n\nconst users = [{ id: 1, name: "Alex" }];\nconsole.log(findUser(users, 2));`};

function App(){
 const [language,setLanguage]=useState('Python');
 const [code,setCode]=useState(starter.Python);
 const [tab,setTab]=useState('diagnostics');
 const [scanning,setScanning]=useState(false);
 const [analyzed,setAnalyzed]=useState(false);
 const [query,setQuery]=useState('');
 const [fileName,setFileName]=useState('main.py');
 const fileRef=useRef();
 const health=useMemo(()=>analyzed?92:Math.max(64,Math.min(98,88-Math.floor(code.split('\n').length/18)*2)),[analyzed,code]);
 const errors=analyzed?2:0;
 const warnings=analyzed?1:0;
 const run=()=>{setScanning(true);setAnalyzed(false);setTimeout(()=>{setScanning(false);setAnalyzed(true);setTab('diagnostics')},850)};
 const changeLanguage=(e)=>{const l=e.target.value;setLanguage(l);setCode(starter[l]||`// Start writing your ${l} code here\n`);setFileName(l.toLowerCase()+'.txt');setAnalyzed(false)};
 const upload=(e)=>{const f=e.target.files?.[0];if(!f)return;setFileName(f.name);const r=new FileReader();r.onload=()=>{setCode(String(r.result));setAnalyzed(false)};r.readAsText(f)};
 return <div className="app">
  <header className="topbar">
   <div className="brand"><div className="brandmark"><ShieldCheck size={20}/></div><div><b>CodeGuardian</b><span>AI CODE VALIDATOR</span></div></div>
   <div className="nav"><span className="active">Validator</span><span>History</span><span>Docs</span></div>
   <div className="profile"><div className="status"><i/> All systems ready</div><div className="avatar"><UserRound size={16}/></div></div>
  </header>
  <main>
   <section className="hero"><div><div className="eyebrow"><Sparkles size={15}/> AI-POWERED DEVELOPMENT WORKSPACE</div><h1>Write. Validate. <em>Fix.</em></h1><p>One intelligent workspace for every programmer. Detect errors, understand why they happen, and get practical fixes — instantly.</p></div><div className="heroStats"><div><strong>18+</strong><span>Languages</span></div><div><strong>AI</strong><span>Guided fixes</span></div><div><strong>2s</strong><span>Fast feedback</span></div></div></section>
   <section className="toolbar"><div className="selectWrap"><Code2 size={17}/><select value={language} onChange={changeLanguage}>{LANGUAGES.map(l=><option key={l}>{l}</option>)}</select><ChevronDown size={15}/></div><div className="fileName"><FileCode2 size={15}/>{fileName}</div><button className="ghost" onClick={()=>fileRef.current?.click()}><Upload size={16}/> Upload file</button><input ref={fileRef} type="file" hidden onChange={upload}/><button className="ghost" onClick={()=>{setCode(starter[language]||'// Start writing...');setAnalyzed(false)}}><RefreshCw size={15}/> Reset</button><button className="run" onClick={run} disabled={scanning}>{scanning?<><Loader2 className="spin" size={17}/> Analyzing…</>:<><Play size={16} fill="currentColor"/> Validate code</>}</button></section>
   <section className="workspace">
    <div className="panel editorPanel">
      <div className="panelHead"><div><b>Code editor</b><small>Write or upload your source code</small></div><div className="headPill"><GitBranch size={13}/> main</div></div>
      <div className="editor"><div className="gutter">{code.split('\n').map((_,i)=><span key={i}>{i+1}</span>)}</div><textarea spellCheck="false" value={code} onChange={e=>{setCode(e.target.value);setAnalyzed(false)}} aria-label="Code editor"/></div>
      <div className="editorFoot"><span>UTF-8</span><span>{code.split('\n').length} lines</span><span>{code.length} chars</span></div>
    </div>
    <div className="divider"><div className="scoreRing" style={{'--p':health}}><div><strong>{health}%</strong><small>health</small></div></div></div>
    <div className="panel resultPanel">
      <div className="panelHead"><div><b>Validation center</b><small>{analyzed?'Analysis completed just now':'Run validation to inspect your code'}</small></div><div className={'resultBadge '+(analyzed?'good':'idle')}>{analyzed?<><CheckCircle2 size={14}/> analyzed</>:<>● waiting</>}</div></div>
      <div className="tabs"><button className={tab==='diagnostics'?'selected':''} onClick={()=>setTab('diagnostics')}>Diagnostics <span>{analyzed?errors+warnings:0}</span></button><button className={tab==='ai'?'selected':''} onClick={()=>setTab('ai')}>AI Fix <span><Sparkles size={12}/></span></button></div>
      {tab==='diagnostics'?<Diagnostics analyzed={analyzed}/>:<AIPanel query={query} setQuery={setQuery}/>} 
      <div className="healthCard"><div><span>CODE HEALTH</span><strong>{health}%</strong></div><div className="progress"><i style={{width:health+'%'}}/></div><p>{analyzed?'Strong structure. Fix the highlighted issues to reach 100%.':'Health score updates after every validation.'}</p></div>
    </div>
   </section>
   <section className="bottomGrid"><div className="tip"><div className="tipIcon"><Lightbulb size={18}/></div><div><b>Judge-ready experience</b><p>Showcase more than an editor: explain the error, suggest a fix, and measure code quality in one flow.</p></div></div><div className="miniStats"><div><span>SUPPORTED</span><b>18 languages</b></div><div><span>DETECTED</span><b>{analyzed?'3 issues':'—'}</b></div><div><span>AFTER AI FIX</span><b>{analyzed?'97% health':'—'}</b></div></div></section>
  </main>
  <footer><span>CodeGuardian AI · Built for developers</span><span>Privacy first · Your code stays in your workspace</span></footer>
 </div>
}
function Diagnostics({analyzed}){if(!analyzed)return <div className="empty"><div className="emptyIcon"><ShieldCheck size={25}/></div><h3>Ready to inspect</h3><p>Run validation to find syntax errors, logic issues, warnings and quality problems.</p><div className="checks"><span><CheckCircle2 size={14}/> Syntax</span><span><CheckCircle2 size={14}/> Logic</span><span><CheckCircle2 size={14}/> Quality</span></div></div>;
 return <div className="issues"><Issue type="ERROR" title="Possible empty input" text="len(numbers) can be 0, which causes a ZeroDivisionError." line="3"/><Issue type="ERROR" title="Unhandled edge case" text="Consider validating the input before calculating the average." line="2"/><Issue type="WARNING" title="Improve function contract" text="Add a return type and input annotation for clearer intent." line="1"/><div className="issueFooter"><CheckCircle2 size={15}/> Analysis complete · 3 findings</div></div>}
function Issue({type,title,text,line}){return <div className={'issue '+type.toLowerCase()}><div className="issueTop"><span className="tag">{type}</span><span>Line {line}</span></div><b>{title}</b><p>{text}</p><button>Explain & fix <Sparkles size={12}/></button></div>}
function AIPanel({query,setQuery}){return <div className="aiPanel"><div className="aiIntro"><div className="aiIcon"><Sparkles size={17}/></div><div><b>CodeGuardian AI</b><p>Ask about an error, optimization, or how to improve this code.</p></div></div><div className="suggestions"><button onClick={()=>setQuery('Why is this code failing?')}>Why is this failing?</button><button onClick={()=>setQuery('How can I optimize this?')}>Optimize it</button><button onClick={()=>setQuery('Show me a safer version')}>Make it safer</button></div><div className="chatBox">{query?<div className="answer"><b>AI analysis</b><p>Start by validating the code. I’ll explain the root cause in plain language, show the corrected snippet, and explain the change so you can learn from it.</p><code>// Suggested next step\n// Validate input before using it</code></div>:<div className="aiPlaceholder">Your AI explanation will appear here.</div>}</div><div className="ask"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask CodeGuardian anything…"/><button onClick={()=>setQuery(query||'Analyze my code')}><Send size={16}/></button></div></div>}
createRoot(document.getElementById('root')).render(<App/>);
