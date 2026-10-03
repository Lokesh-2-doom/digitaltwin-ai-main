const fs = require('fs');
const path = require('path');

// Fix Footer.jsx
let footerContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'layout', 'Footer.jsx'), 'utf8');
footerContent = footerContent.replace(
  'import { Activity, Shield, Cpu, Terminal, ArrowUpRight, Github, FileText, CheckCircle2 } from \'lucide-react\';',
  'import { Activity, Shield, Cpu, Terminal, ArrowUpRight, FileText, CheckCircle2 } from \'lucide-react\';'
);
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'layout', 'Footer.jsx'), footerContent, 'utf8');

// Fix StationDrawer.jsx
let drawerContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'ui', 'StationDrawer.jsx'), 'utf8');
drawerContent = drawerContent.replace(
  'import { X, Cpu, AlertTriangle, CheckCircle2, Zap, ArrowRight, Gauge, Activity, Radio, Tool, RefreshCw, BarChart2 } from \'lucide-react\';',
  'import { X, Cpu, AlertTriangle, CheckCircle2, Zap, ArrowRight, Gauge, Activity, Radio, Wrench, RefreshCw, BarChart2 } from \'lucide-react\';'
);
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'ui', 'StationDrawer.jsx'), drawerContent, 'utf8');

console.log('Fixed imports in Footer and StationDrawer');
