const fs = require('fs');

function updateDashboardLayout() {
  const path = 'components/dashboard/layout.tsx';
  let content = fs.readFileSync(path, 'utf8');

  content = content.replace(
    `? 'bg-[#6366F1]/10 border-l-2 border-[#6366F1] text-indigo-900 dark:text-[#F8FAFC]'`,
    `? 'bg-foreground/5 border-l-2 border-foreground text-foreground font-medium'`
  );

  content = content.replace(
    `\${isActive ? 'text-[#6366F1]' : 'text-slate-500 dark:text-[#94A3B8]'}`,
    `\${isActive ? 'text-foreground' : 'text-muted-foreground'}`
  );

  content = content.replace(
    'rounded-full bg-[#6366F1] px-1.5 py-0.5 text-[11px] font-semibold text-white',
    'rounded-[2px] bg-editorial-accent px-1.5 py-0.5 text-[10px] font-mono font-bold text-editorial-bg'
  );

  content = content.replace(
    'h-2 w-2 rounded-full bg-[#6366F1]',
    'h-1.5 w-1.5 rounded-full bg-editorial-accent'
  );

  content = content.replace(
    'bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-[#1E293B] shadow-2xl',
    'bg-card border-r border-border shadow-none'
  );

  content = content.replace(
    'bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-[#1E293B] shadow-sm overflow-hidden',
    'bg-card border-r border-border shadow-none overflow-hidden'
  );

  content = content.replace(
    'h-9 w-9 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20',
    'h-8 w-8 rounded-[4px] bg-foreground/5 border border-border'
  );

  content = content.replace(
    'h-9 w-9 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 shrink-0',
    'h-8 w-8 rounded-[4px] bg-foreground/5 border border-border shrink-0'
  );

  content = content.replace(
    'Dev<span className="text-[#6366F1] dark:text-[#818CF8]">Link</span>',
    'DevLink'
  );

  content = content.replace(
    'Dev<span className="text-[#6366F1] dark:text-[#818CF8]">Link</span>',
    'DevLink'
  );

  content = content.replace(
    'bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur border-b border-slate-200 dark:border-[#1E293B]',
    'bg-background border-b border-border'
  );

  fs.writeFileSync(path, content);
  console.log('Updated components/dashboard/layout.tsx');
}

function updateSignInPage() {
  const path = 'app/auth/signin/page.tsx';
  let content = fs.readFileSync(path, 'utf8');

  // Replace gradient background with clean background
  content = content.replace(
    'min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4',
    'min-h-screen bg-background text-foreground flex items-center justify-center p-4'
  );

  // Replace variant="glow" with clean auto
  content = content.replace(
    '<LogoIcon size={44} variant="glow" />',
    '<LogoIcon size={36} />'
  );

  fs.writeFileSync(path, content);
  console.log('Updated app/auth/signin/page.tsx');
}

function updateDiscoverPage() {
  const path = 'app/discover/page.tsx';
  let content = fs.readFileSync(path, 'utf8');

  // Remove blur blobs
  content = content.replace(
    `<div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-48 -left-16 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>`,
    ''
  );

  content = content.replace(
    'border-b border-border/70 bg-background/80 backdrop-blur-xl',
    'border-b border-border bg-background'
  );

  content = content.replace(
    'bg-cyan-600 text-white hover:bg-cyan-700',
    'bg-foreground text-background hover:bg-foreground/90'
  );

  content = content.replace(
    'rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300',
    'rounded-[3px] border border-border bg-muted px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground'
  );

  fs.writeFileSync(path, content);
  console.log('Updated app/discover/page.tsx');
}

function updateSparkForgePage() {
  const path = 'app/sparkforge/page.tsx';
  let content = fs.readFileSync(path, 'utf8');

  // Remove blur blobs
  content = content.replace(
    `<div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-48 -left-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      </div>`,
    ''
  );

  content = content.replace(
    'border-b border-border/70 bg-background/80 backdrop-blur-xl',
    'border-b border-border bg-background'
  );

  content = content.replace(
    'bg-blue-600 text-white hover:bg-blue-700',
    'bg-foreground text-background hover:bg-foreground/90'
  );

  fs.writeFileSync(path, content);
  console.log('Updated app/sparkforge/page.tsx');
}

updateDashboardLayout();
updateSignInPage();
updateDiscoverPage();
updateSparkForgePage();

