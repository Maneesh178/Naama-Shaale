const assetsSeed = [
  { id: "NS-GHPS-SPORT-001", name: "Cricket Kit Full", category: "Sports", location: "Sports Room", status: "Working", icon: "🏏", serial: "CK-2024-009", value: "₹8,500", owner: "Mr. Kumar", updated: "Verified yesterday" },
  { id: "NS-GHPS-LAB-023", name: "Olympus CX23 Microscope", category: "Science Lab", location: "Lab B", status: "Needs Repair", icon: "🔬", serial: "OLY-CX23-778", value: "₹42,000", owner: "Mrs. Sharma", updated: "Marked 2 hrs ago" },
  { id: "NS-GHPS-ICT-112", name: "Dell Latitude Tablet", category: "ICT", location: "Computer Lab", status: "Working", icon: "💻", serial: "DL-3420-8831", value: "₹58,000", owner: "Mrs. Sharma", updated: "Scanned today" },
  { id: "NS-GHPS-FUR-031", name: "Student Desk - Double", category: "Furniture", location: "Class 7A", status: "Needs Repair", icon: "🪑", serial: "FR-DESK-410", value: "₹3,200", owner: "Mr. Prakash", updated: "Repair pending" },
  { id: "NS-GHPS-LIB-204", name: "Library Book Bundle", category: "Library", location: "Library", status: "Working", icon: "📚", serial: "LIB-BDL-204", value: "₹12,400", owner: "Librarian", updated: "Verified yesterday" },
  { id: "NS-GHPS-ICT-067", name: "Projector Epson X49", category: "ICT", location: "Smart Classroom", status: "Missing", icon: "📽️", serial: "EP-X49-332", value: "₹36,500", owner: "Head Master", updated: "Missing reported" }
];

const state = {
  route: "splash",
  previousRoute: "home",
  filter: "All Assets",
  query: "",
  selectedAssetId: "NS-GHPS-ICT-112",
  auditChecked: new Set(["NS-GHPS-SPORT-001", "NS-GHPS-LIB-204", "NS-GHPS-ICT-112"]),
  dark: localStorage.getItem("namma-dark") === "true",
  assets: JSON.parse(localStorage.getItem("namma-assets") || "null") || assetsSeed
};

const app = document.getElementById("app");

function save() {
  localStorage.setItem("namma-assets", JSON.stringify(state.assets));
  localStorage.setItem("namma-dark", String(state.dark));
}

function icon(name) {
  const map = {
    home: "⌂", assets: "▦", audit: "☑", reports: "◔", profile: "●", bell: "🔔",
    back: "‹", search: "⌕", plus: "+", scan: "▣", repair: "⚠", export: "⇩",
    check: "✓", school: "🏫", settings: "⚙", logout: "↪", camera: "▧"
  };
  return map[name] || name;
}

function navigate(route, assetId) {
  state.previousRoute = state.route;
  state.route = route;
  if (assetId) state.selectedAssetId = assetId;
  render();
  history.pushState({ route, assetId }, "", `#${route}`);
}

window.onpopstate = () => {
  const route = location.hash.replace("#", "") || "home";
  state.route = route;
  render();
};

function counts() {
  return {
    total: state.assets.length,
    working: state.assets.filter(a => a.status === "Working").length,
    repair: state.assets.filter(a => a.status === "Needs Repair").length,
    missing: state.assets.filter(a => a.status === "Missing").length
  };
}

function filteredAssets() {
  const q = state.query.trim().toLowerCase();
  return state.assets.filter(asset => {
    const statusOk = state.filter === "All Assets" || asset.status === state.filter;
    const queryOk = !q || [asset.name, asset.id, asset.category, asset.location].join(" ").toLowerCase().includes(q);
    return statusOk && queryOk;
  });
}

function statusClass(status) {
  if (status === "Working") return "working";
  if (status === "Needs Repair") return "repair";
  return "missing";
}

function shell(title = "Namma Shaale", body, showNav = true) {
  const isTopRoute = ["home", "assets", "audit", "reports", "profile", "notifications"].includes(state.route);
  return `
    <div class="qr-bg"></div>
    <header class="topbar">
      <div class="brand">
        ${isTopRoute ? `<div class="avatar">NS</div>` : `<button class="icon-btn" onclick="goBack()">${icon("back")}</button>`}
        <h1>${title}</h1>
      </div>
      <button class="icon-btn" onclick="navigate('notifications')" aria-label="Notifications">${icon("bell")}</button>
    </header>
    <main class="app-shell">${body}</main>
    ${showNav ? bottomNav() : ""}
    <div id="toast" class="toast"></div>
  `;
}

function bottomNav() {
  const tabs = [
    ["home", "Home", "home"],
    ["assets", "Assets", "assets"],
    ["audit", "Audit", "audit"],
    ["reports", "Reports", "reports"],
    ["profile", "Profile", "profile"]
  ];
  return `<nav class="nav">${tabs.map(([route, label, ico]) => `
    <button class="${state.route === route ? "active" : ""}" onclick="navigate('${route}')">
      <span class="nav-icon">${icon(ico)}</span><span>${label}</span>
    </button>`).join("")}</nav>`;
}

function goBack() {
  const fallback = ["add", "detail", "repair", "search"].includes(state.route) ? "assets" : "home";
  navigate(state.previousRoute && state.previousRoute !== state.route ? state.previousRoute : fallback);
}

function toast(message) {
  const node = document.getElementById("toast");
  if (!node) return;
  node.textContent = message;
  node.classList.add("show");
  setTimeout(() => node.classList.remove("show"), 2200);
}

function splash() {
  return `<main class="auth-shell">
    <div class="splash-logo">▣</div>
    <h1 class="auth-title">Namma Shaale<br>Inventory</h1>
    <p class="body-lg muted" style="text-align:center;margin:12px 0 32px">Track • Audit • Maintain School Assets</p>
    <button class="primary full" onclick="navigate('onboarding')">Get Started</button>
  </main>`;
}

function onboarding() {
  return `<main class="auth-shell">
    <div class="card" style="text-align:center">
      <div class="splash-logo" style="width:88px;height:88px;border-radius:26px;font-size:40px">🏫</div>
      <h1 class="auth-title" style="font-size:32px;line-height:38px">Digitise school assets with confidence</h1>
      <p class="body-lg muted">Scan QR codes, complete monthly health checks, raise repair requests, and generate reports for SDMC reviews.</p>
      <div class="grid" style="margin:24px 0">
        <div class="card compact"><b>QR-first</b><p class="muted">Fast classroom scans.</p></div>
        <div class="card compact"><b>Offline-ready</b><p class="muted">Local app data stays usable.</p></div>
      </div>
      <button class="primary full" onclick="navigate('login')">Continue</button>
    </div>
  </main>`;
}

function login() {
  return `<main class="auth-shell">
    <div class="brand" style="justify-content:center;margin-bottom:28px"><div class="brand-mark">NS</div><h1>Namma Shaale</h1></div>
    <div class="card">
      <h1 style="font-size:28px;color:var(--primary)">School Sign In</h1>
      <p class="muted">Use the registered mobile number for Government Higher Primary School, Block 4.</p>
      <label class="field"><label>Mobile Number</label><input id="mobile" inputmode="numeric" value="98765 43210"></label>
      <button class="primary full" onclick="navigate('otp')">Send OTP</button>
    </div>
  </main>`;
}

function otp() {
  return `<main class="auth-shell">
    <div class="card">
      <h1 style="font-size:28px;color:var(--primary)">Verify Identity</h1>
      <p class="muted">Enter the 6-digit OTP sent to 98765 43210.</p>
      <div class="otp-row">${Array.from({ length: 6 }, (_, i) => `<input inputmode="numeric" maxlength="1" value="${i + 1}">`).join("")}</div>
      <button class="primary full" onclick="navigate('home')">${icon("check")} Verify and Open App</button>
      <p class="muted" style="text-align:center;font-size:12px;margin-top:16px">Secured by Namma Shaale Identity</p>
    </div>
  </main>`;
}

function home() {
  const c = counts();
  return shell("Namma Shaale", `
    <section class="hero">
      <h2>Namaste, Mrs. Sharma!</h2>
      <p class="body-lg muted">${icon("school")} Government Higher Primary School, Block 4</p>
    </section>
    <section class="actions">
      ${action("scan", "Scan QR", "scan")}
      ${action("plus", "Add Asset", "add")}
      ${action("check", "Health Check", "audit")}
      ${action("export", "Reports", "reports")}
    </section>
    <section class="section grid desktop-4">
      <div class="card span-2 desktop-span-1"><div class="row between"><b>Total Assets</b><span class="thumb" style="width:32px;height:32px;font-size:18px">▦</span></div><div class="stat-value">${c.total.toLocaleString()}</div></div>
      ${statCard("Working", c.working, "secondary")}
      ${statCard("Needs Repair", c.repair, "tertiary")}
      <div class="card danger span-2 desktop-span-1"><div class="stat-label"><span class="dot red"></span>Missing</div><div class="stat-value" style="color:var(--error)">${c.missing}</div></div>
    </section>
    <section class="section card row between">
      <div class="grow"><h3>Monthly Audit Progress</h3><p class="muted">Complete checking physical assets for May.</p><button class="primary" onclick="navigate('audit')">Continue Audit</button></div>
      <div class="progress-ring"><span>${Math.round(state.auditChecked.size / state.assets.length * 100)}%</span></div>
    </section>
    <section class="section">
      <div class="section-head"><h3>Recent Activity</h3><button class="chip" onclick="navigate('assets')">View All</button></div>
      <div class="list">${state.assets.slice(0, 3).map(activityItem).join("")}</div>
    </section>
  `);
}

function action(ico, label, route) {
  return `<button class="action ${route === "scan" ? "primary-action" : ""}" onclick="${route === "scan" ? "simulateScan()" : `navigate('${route}')`}"><span class="bubble">${icon(ico)}</span><span>${label}</span></button>`;
}

function statCard(label, value, color) {
  return `<div class="card compact"><div class="stat-label"><span class="dot ${color === "tertiary" ? "orange" : ""}"></span>${label}</div><div class="title" style="margin-top:10px">${value}</div></div>`;
}

function activityItem(asset) {
  return `<button class="list-item" onclick="navigate('detail','${asset.id}')">
    <span class="thumb">${asset.icon}</span><span class="grow"><b class="truncate" style="display:block">${asset.name}</b><span class="muted truncate" style="display:block">${asset.updated}</span></span><span class="chev">›</span>
  </button>`;
}

function assets() {
  const chips = ["All Assets", "Working", "Needs Repair", "Missing"];
  const list = filteredAssets();
  return shell("Namma Shaale Inventory", `
    <div class="search"><span class="glass">${icon("search")}</span><input placeholder="Search assets by name or ID..." value="${state.query}" oninput="state.query=this.value; renderOnlyAssets()"></div>
    <div class="chips section" style="margin-top:14px">${chips.map(chip => `<button class="chip ${state.filter === chip ? "active" : ""}" onclick="state.filter='${chip}'; render()">${chip}</button>`).join("")}</div>
    <section id="asset-list" class="section list">${assetList(list)}</section>
    <button class="fab" onclick="navigate('add')" aria-label="Add Asset">+</button>
  `);
}

function renderOnlyAssets() {
  const list = document.getElementById("asset-list");
  if (list) list.innerHTML = assetList(filteredAssets());
}

function assetList(list) {
  if (!list.length) return `<div class="card"><h3>No assets found</h3><p class="muted">Try another search or filter.</p></div>`;
  return list.map(asset => `<button class="card asset-card" onclick="navigate('detail','${asset.id}')">
    <span class="asset-photo">${asset.icon}</span>
    <span class="grow" style="text-align:left">
      <span class="row between"><b class="title">${asset.name}</b><span class="badge ${statusClass(asset.status)}">${asset.status}</span></span>
      <span class="muted">${asset.id}</span><br><span class="muted">${asset.location} • ${asset.category}</span>
    </span>
  </button>`).join("");
}

function detail() {
  const asset = state.assets.find(a => a.id === state.selectedAssetId) || state.assets[0];
  return shell("Asset Details", `
    <section class="detail-hero">
      <div class="row between"><div><span class="asset-photo" style="width:76px;height:76px;margin-bottom:12px">${asset.icon}</span><h2>${asset.name}</h2><p class="muted">${asset.id}</p></div><span class="badge ${statusClass(asset.status)}">${asset.status}</span></div>
    </section>
    <section class="card">
      <h3>Asset Information</h3>
      ${kv("Category", asset.category)}${kv("Serial No.", asset.serial)}${kv("Location", asset.location)}${kv("Value", asset.value)}${kv("Custodian", asset.owner)}
    </section>
    <section class="card section">
      <h3>Maintenance Timeline</h3>
      <div class="list" style="margin-top:12px">
        <div class="list-item"><span class="thumb">✓</span><span class="grow"><b>Asset Registered</b><br><span class="muted">Added to school inventory</span></span></div>
        <div class="list-item"><span class="thumb">▣</span><span class="grow"><b>Last QR Scan</b><br><span class="muted">${asset.updated}</span></span></div>
      </div>
    </section>
    <section class="section grid">
      <button class="primary" onclick="markWorking('${asset.id}')">Mark Working</button>
      <button class="secondary-btn" onclick="navigate('repair','${asset.id}')">Mark for Repair</button>
    </section>
  `);
}

function kv(label, value) {
  return `<div class="kv"><span>${label}</span><b>${value}</b></div>`;
}

function add() {
  return shell("Add Asset", `
    <section class="card">
      <label class="field"><label>Asset Name</label><input id="newName" placeholder="e.g. Science Model Kit"></label>
      <div class="two-col">
        <label class="field"><label>Category</label><select id="newCategory"><option>ICT</option><option>Science Lab</option><option>Furniture</option><option>Sports</option><option>Library</option></select></label>
        <label class="field"><label>Status</label><select id="newStatus"><option>Working</option><option>Needs Repair</option><option>Missing</option></select></label>
      </div>
      <label class="field"><label>Asset ID / QR Code</label><input id="newId" value="NS-GHPS-NEW-${Math.floor(100 + Math.random() * 899)}"></label>
      <label class="field"><label>Location</label><input id="newLocation" placeholder="Classroom or lab"></label>
      <button class="secondary-btn full" onclick="toast('Barcode scanner ready for manual demo')">${icon("scan")} Scan</button>
      <button class="primary full" style="margin-top:14px" onclick="createAsset()">${icon("check")} Save Asset</button>
    </section>
  `);
}

function createAsset() {
  const name = document.getElementById("newName").value.trim() || "New School Asset";
  const id = document.getElementById("newId").value.trim() || `NS-GHPS-NEW-${Date.now()}`;
  const category = document.getElementById("newCategory").value;
  const location = document.getElementById("newLocation").value.trim() || "Store Room";
  const status = document.getElementById("newStatus").value;
  state.assets.unshift({ id, name, category, location, status, icon: category === "Sports" ? "🏏" : category === "Furniture" ? "🪑" : category === "Library" ? "📚" : category === "Science Lab" ? "🔬" : "💻", serial: `SN-${Date.now().toString().slice(-5)}`, value: "₹0", owner: "Mrs. Sharma", updated: "Added just now" });
  save();
  state.selectedAssetId = id;
  navigate("detail", id);
  setTimeout(() => toast("Asset saved successfully"), 80);
}

function audit() {
  const done = Math.round(state.auditChecked.size / state.assets.length * 100);
  return shell("Monthly Health Check", `
    <section class="card row between">
      <div><h2>May Audit</h2><p class="muted">Tap each asset after physical verification.</p></div><div class="progress-ring"><span>${done}%</span></div>
    </section>
    <section class="section list">${state.assets.map(asset => `
      <button class="list-item" onclick="toggleAudit('${asset.id}')">
        <span class="thumb">${state.auditChecked.has(asset.id) ? "✓" : asset.icon}</span>
        <span class="grow"><b>${asset.name}</b><br><span class="muted">${asset.location} • ${asset.status}</span></span>
        <span class="badge ${state.auditChecked.has(asset.id) ? "working" : "repair"}">${state.auditChecked.has(asset.id) ? "Checked" : "Pending"}</span>
      </button>`).join("")}</section>
  `);
}

function toggleAudit(id) {
  state.auditChecked.has(id) ? state.auditChecked.delete(id) : state.auditChecked.add(id);
  render();
}

function reports() {
  const c = counts();
  return shell("Reports & Insights", `
    <section class="section-head"><div><h2>Reports & Insights</h2><p class="muted">Asset condition and audit health.</p></div></section>
    <section class="two-col">
      <div class="card"><div class="section-head"><h3>Asset Conditions</h3><span class="muted">Total ${c.total}</span></div><div class="donut"><span>${c.total}</span></div><div class="grid" style="margin-top:18px">${statCard("Working", c.working, "secondary")}${statCard("Repair", c.repair, "tertiary")}</div></div>
      <div class="card"><h3>Monthly Audit Completion</h3><div class="bar-chart">${[45, 58, 72, 65, Math.round(state.auditChecked.size / state.assets.length * 100)].map(v => `<div class="bar"><i style="height:${v}%"></i></div>`).join("")}</div><p class="muted">Jan Feb Mar Apr May</p></div>
    </section>
    <section class="card section"><h3>Most Damaged Categories</h3>${["Furniture", "Science Lab", "ICT"].map((name, i) => `<div class="kv"><span>${name}</span><b>${[38, 24, 18][i]}%</b></div>`).join("")}</section>
    <section class="grid section"><button class="primary">${icon("export")} Export PDF</button><button class="secondary-btn">Share Report</button></section>
  `);
}

function profile() {
  return shell("Namma Shaale", `
    <section class="card" style="text-align:center">
      <div class="avatar" style="width:92px;height:92px;margin:0 auto 12px;font-size:28px">MS</div>
      <h2>Mrs. Sharma</h2><p class="muted">School Asset Manager</p>
    </section>
    <section class="card section"><span class="eyebrow">Assigned School</span><h3>Government Higher Primary School</h3><p class="muted">Block 4, Karnataka • UDISE 29200104509</p></section>
    <section class="section list">
      ${settingsRow("Language", "English / Kannada")}
      ${settingsRow("Notifications", "Enabled", "notifications")}
      ${settingsRow("Dark Mode", state.dark ? "On" : "Off", "toggleDark")}
      ${settingsRow("Help & Support", "Contact district admin")}
    </section>
    <button class="danger-btn full section" onclick="navigate('login')">${icon("logout")} Sign Out</button>
  `);
}

function settingsRow(title, detail, actionName) {
  const action = actionName === "toggleDark" ? "toggleDark()" : actionName === "notifications" ? "navigate('notifications')" : "toast('Setting opened')";
  return `<button class="list-item" onclick="${action}"><span class="thumb">${icon("settings")}</span><span class="grow"><b>${title}</b><br><span class="muted">${detail}</span></span><span class="chev">›</span></button>`;
}

function notifications() {
  return shell("Notifications", `
    <section class="section-head"><h2>Recent Alerts</h2><button class="chip active" onclick="toast('All alerts marked read')">Mark all read</button></section>
    <div class="chips"><button class="chip active">All</button><button class="chip">Unread</button><button class="chip">Critical</button></div>
    <section class="section list">
      ${notice("Monthly Audit Pending", "14 assets are still waiting for verification.", "repair")}
      ${notice("Repair Approved", "SDMC approved microscope repair estimate.", "working")}
      ${notice("Missing Item Reported", "Projector Epson X49 was marked missing.", "missing")}
      ${notice("New Asset Added", "Dell Latitude Tablet added to ICT lab.", "working")}
    </section>
  `);
}

function notice(title, detail, type) {
  return `<div class="list-item"><span class="thumb">${type === "missing" ? "!" : type === "repair" ? "⚠" : "✓"}</span><span class="grow"><b>${title}</b><br><span class="muted">${detail}</span></span><span class="badge ${type}">${type === "missing" ? "Critical" : "New"}</span></div>`;
}

function repair() {
  const asset = state.assets.find(a => a.id === state.selectedAssetId) || state.assets.find(a => a.status === "Needs Repair") || state.assets[0];
  return shell("Repair Request", `
    <section class="two-col">
      <div class="card"><h2>Select Asset</h2><div class="list" style="margin-top:12px">${state.assets.filter(a => a.status !== "Working").map(a => `<button class="list-item" onclick="state.selectedAssetId='${a.id}'; render()"><span class="thumb">${a.icon}</span><span class="grow"><b>${a.name}</b><br><span class="muted">${a.location}</span></span></button>`).join("")}</div></div>
      <div class="card"><h2>Repair Details</h2><p class="muted">${asset.name}</p><label class="field"><label>Issue Severity</label><select id="severity"><option>Minor</option><option>Major</option><option selected>Critical</option></select></label><label class="field"><label>Description</label><textarea rows="4">Physical condition requires repair before classroom use.</textarea></label><button class="primary full" onclick="submitRepair('${asset.id}')">Submit Repair Request</button></div>
    </section>
    <section class="card section"><h3>SDMC Approval Flow</h3>${kv("Teacher", "Submitted")}${kv("Head Master", "Reviewing")}${kv("SDMC", "Pending")}</section>
  `);
}

function submitRepair(id) {
  const asset = state.assets.find(a => a.id === id);
  if (asset) asset.status = "Needs Repair";
  save();
  render();
  setTimeout(() => toast("Repair request submitted"), 80);
}

function markWorking(id) {
  const asset = state.assets.find(a => a.id === id);
  if (asset) {
    asset.status = "Working";
    asset.updated = "Marked working just now";
    save();
  }
  render();
  setTimeout(() => toast("Asset marked as working"), 80);
}

function simulateScan() {
  state.selectedAssetId = "NS-GHPS-ICT-112";
  navigate("detail", state.selectedAssetId);
  setTimeout(() => toast("QR scan matched Dell Latitude Tablet"), 100);
}

function toggleDark() {
  state.dark = !state.dark;
  save();
  render();
}

function render() {
  document.body.classList.toggle("dark", state.dark);
  const routeMap = { splash, onboarding, login, otp, home, assets, detail, add, audit, reports, profile, notifications, repair };
  app.innerHTML = (routeMap[state.route] || home)();
}

render();
