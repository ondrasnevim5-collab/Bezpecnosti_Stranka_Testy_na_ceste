// ===== AUTH SYSTEM =====
// Accounts stored in localStorage – simulates a server

const OWNER_USERNAME = 'OndrasOwner';
const OWNER_PASSWORD = 'OndrasOwner123';

function initAuth() {
  let accounts = getAccounts();
  // Ensure owner account always exists
  if (!accounts[OWNER_USERNAME]) {
    accounts[OWNER_USERNAME] = {
      username: OWNER_USERNAME,
      password: OWNER_PASSWORD,
      isOwner: true,
      createdAt: new Date().toISOString(),
      scores: {},
      hintsUnlocked: 0
    };
    saveAccounts(accounts);
  }
}

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem('cyklosafe_accounts') || '{}');
  } catch { return {}; }
}

function saveAccounts(accounts) {
  localStorage.setItem('cyklosafe_accounts', JSON.stringify(accounts));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('cyklosafe_session') || 'null');
  } catch { return null; }
}

function setCurrentUser(user) {
  localStorage.setItem('cyklosafe_session', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('cyklosafe_session');
  updateNavUser();
  showAuthModal('login');
}

function register(username, password) {
  if (!username || username.length < 3) return { ok: false, msg: 'Jméno musí mít alespoň 3 znaky.' };
  if (!password || password.length < 4) return { ok: false, msg: 'Heslo musí mít alespoň 4 znaky.' };
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return { ok: false, msg: 'Jméno smí obsahovat jen písmena, čísla a _.' };

  const accounts = getAccounts();
  if (accounts[username]) return { ok: false, msg: 'Toto jméno je již obsazené. Zvol jiné.' };

  accounts[username] = {
    username,
    password,
    isOwner: false,
    createdAt: new Date().toISOString(),
    scores: {},
    hintsUnlocked: 0
  };
  saveAccounts(accounts);
  return { ok: true };
}

function login(username, password) {
  const accounts = getAccounts();
  const acc = accounts[username];
  if (!acc) return { ok: false, msg: 'Účet neexistuje.' };
  if (acc.password !== password) return { ok: false, msg: 'Špatné heslo.' };
  const user = { username: acc.username, isOwner: acc.isOwner };
  setCurrentUser(user);
  return { ok: true, user };
}

function saveScore(testId, score, total) {
  const user = getCurrentUser();
  if (!user) return;
  const accounts = getAccounts();
  if (!accounts[user.username]) return;
  if (!accounts[user.username].scores) accounts[user.username].scores = {};
  const prev = accounts[user.username].scores[testId] || 0;
  if (score > prev) accounts[user.username].scores[testId] = score;
  saveAccounts(accounts);
}

function getHintsUnlocked() {
  const user = getCurrentUser();
  if (!user) return 0;
  const accounts = getAccounts();
  return accounts[user.username]?.hintsUnlocked || 0;
}

function unlockHint() {
  const user = getCurrentUser();
  if (!user) return;
  const accounts = getAccounts();
  if (!accounts[user.username]) return;
  accounts[user.username].hintsUnlocked = (accounts[user.username].hintsUnlocked || 0) + 1;
  saveAccounts(accounts);
}

function getAllAccountsForOwner() {
  return getAccounts();
}

// ===== UI =====
function updateNavUser() {
  const user = getCurrentUser();
  const navUser = document.getElementById('navUser');
  if (!navUser) return;
  if (user) {
    navUser.innerHTML = `
      <span class="nav-username ${user.isOwner ? 'owner' : ''}" onclick="showProfilePanel()">
        ${user.isOwner ? '👑' : '🚴'} ${user.username}
      </span>
      <button class="nav-logout-btn" onclick="logout()">Odhlásit</button>
    `;
  } else {
    navUser.innerHTML = `
      <button class="nav-auth-btn" onclick="showAuthModal('login')">Přihlásit</button>
      <button class="nav-auth-btn register" onclick="showAuthModal('register')">Registrace</button>
    `;
  }
}

function showAuthModal(tab = 'login') {
  const overlay = document.getElementById('authOverlay');
  overlay.classList.add('active');
  switchAuthTab(tab);
}

function hideAuthModal() {
  document.getElementById('authOverlay').classList.remove('active');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('authMsg').textContent = '';
}

function handleLogin() {
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value;
  const res = login(u, p);
  const msg = document.getElementById('authMsg');
  if (res.ok) {
    msg.className = 'auth-msg success';
    msg.textContent = `Vítej, ${res.user.username}! 🎉`;
    setTimeout(() => {
      hideAuthModal();
      updateNavUser();
      if (res.user.isOwner) showOwnerPanel();
    }, 800);
  } else {
    msg.className = 'auth-msg error';
    msg.textContent = res.msg;
  }
}

function handleRegister() {
  const u = document.getElementById('regUsername').value.trim();
  const p = document.getElementById('regPassword').value;
  const p2 = document.getElementById('regPassword2').value;
  const msg = document.getElementById('authMsg');
  if (p !== p2) { msg.className = 'auth-msg error'; msg.textContent = 'Hesla se neshodují.'; return; }
  const res = register(u, p);
  if (res.ok) {
    msg.className = 'auth-msg success';
    msg.textContent = 'Účet vytvořen! Přihlašuji...';
    const lr = login(u, p);
    setTimeout(() => {
      hideAuthModal();
      updateNavUser();
    }, 800);
  } else {
    msg.className = 'auth-msg error';
    msg.textContent = res.msg;
  }
}

// ===== OWNER PANEL =====
function showOwnerPanel() {
  const user = getCurrentUser();
  if (!user || !user.isOwner) return;
  const panel = document.getElementById('ownerPanel');
  panel.classList.add('active');
  renderOwnerTable();
}

function hideOwnerPanel() {
  document.getElementById('ownerPanel').classList.remove('active');
}

function renderOwnerTable() {
  const accounts = getAllAccountsForOwner();
  const tbody = document.getElementById('ownerTableBody');
  tbody.innerHTML = '';
  Object.values(accounts).forEach(acc => {
    const scoreCount = Object.keys(acc.scores || {}).length;
    const bestScore = scoreCount > 0 ? Math.max(...Object.values(acc.scores)) : '-';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${acc.isOwner ? '👑 ' : ''}${acc.username}</td>
      <td>${new Date(acc.createdAt).toLocaleDateString('cs-CZ')}</td>
      <td>${scoreCount} testů</td>
      <td>${bestScore !== '-' ? bestScore + '/20' : '-'}</td>
      <td>${acc.hintsUnlocked || 0}</td>
      <td>${acc.isOwner ? '<em>Owner</em>' : `<button class="owner-del-btn" onclick="ownerDeleteUser('${acc.username}')">Smazat</button>`}</td>
    `;
    tbody.appendChild(row);
  });
}

function ownerDeleteUser(username) {
  if (!confirm(`Opravdu smazat účet "${username}"?`)) return;
  const accounts = getAccounts();
  delete accounts[username];
  saveAccounts(accounts);
  renderOwnerTable();
}

// ===== PROFILE PANEL =====
function showProfilePanel() {
  const user = getCurrentUser();
  if (!user) return;
  if (user.isOwner) { showOwnerPanel(); return; }
  const accounts = getAccounts();
  const acc = accounts[user.username];
  const panel = document.getElementById('profilePanel');
  const scores = acc.scores || {};
  const scoreCount = Object.keys(scores).length;
  const hints = acc.hintsUnlocked || 0;

  document.getElementById('profileName').textContent = user.username;
  document.getElementById('profileStats').innerHTML = `
    <div class="prof-stat"><span>${scoreCount}</span><small>Dokončených testů</small></div>
    <div class="prof-stat"><span>${hints}</span><small>Nápověd odemčeno</small></div>
    <div class="prof-stat"><span>${scoreCount > 0 ? Math.max(...Object.values(scores)) : 0}/20</span><small>Nejlepší skóre</small></div>
  `;
  panel.classList.add('active');
}

function hideProfilePanel() {
  document.getElementById('profilePanel').classList.remove('active');
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  updateNavUser();

  // Auth form enter key
  document.getElementById('loginPassword')?.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
  document.getElementById('regPassword2')?.addEventListener('keydown', e => { if (e.key === 'Enter') handleRegister(); });
});
