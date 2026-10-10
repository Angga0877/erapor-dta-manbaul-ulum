const $ = (id) => document.getElementById(id);

function tampilkanKoneksi() {
  const online = navigator.onLine;
  const badge = $("connectionBadge");
  badge.textContent = online ? "Terhubung internet" : "Offline";
  badge.className = "badge " + (online ? "online" : "offline");
  $("networkStatus").textContent = online
    ? "Browser mendeteksi koneksi internet."
    : "Tidak ada koneksi internet. Halaman uji tetap berjalan jika sudah tersimpan di cache.";
}
window.addEventListener("online", tampilkanKoneksi);
window.addEventListener("offline", tampilkanKoneksi);
tampilkanKoneksi();

$("appStatus").textContent = ("serviceWorker" in navigator)
  ? "Browser mendukung service worker."
  : "Browser ini tidak mendukung service worker.";

const DB_NAME = "erapor_dta_mu_pwa_test";
const STORE = "catatan_uji";
function bukaDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) return reject(new Error("IndexedDB tidak didukung browser."));
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Gagal membuka penyimpanan lokal."));
  });
}
async function simpanCatatan(catatan) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ catatan, disimpanPada: new Date().toISOString() }, "catatan-terakhir");
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error || new Error("Gagal menyimpan.")); };
    tx.onabort = () => { db.close(); reject(tx.error || new Error("Penyimpanan dibatalkan.")); };
  });
}
async function bacaCatatan() {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get("catatan-terakhir");
    req.onsuccess = () => { db.close(); resolve(req.result || null); };
    req.onerror = () => { db.close(); reject(req.error || new Error("Gagal membaca data.")); };
  });
}
$("saveBtn").addEventListener("click", async () => {
  try {
    await simpanCatatan($("testNote").value);
    $("testResult").textContent = "Berhasil disimpan di penyimpanan lokal perangkat.";
    $("storageStatus").textContent = "IndexedDB aktif; catatan uji tersimpan.";
  } catch (e) {
    $("testResult").textContent = "Gagal menyimpan: " + e.message;
    $("storageStatus").textContent = "Penyimpanan lokal belum berhasil diuji.";
  }
});
$("loadBtn").addEventListener("click", async () => {
  try {
    const data = await bacaCatatan();
    if (!data) {
      $("testResult").textContent = "Belum ada catatan uji tersimpan.";
      return;
    }
    $("testNote").value = data.catatan;
    $("testResult").textContent = "Catatan berhasil dibaca. Waktu simpan: " + new Date(data.disimpanPada).toLocaleString("id-ID");
    $("storageStatus").textContent = "Catatan uji berhasil dibaca dari IndexedDB.";
  } catch (e) {
    $("testResult").textContent = "Gagal membaca: " + e.message;
  }
});

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./sw.js");
      $("appStatus").textContent = "Service worker terdaftar. Halaman siap diuji untuk dibuka offline.";
    } catch (e) {
      $("appStatus").textContent = "Service worker gagal didaftarkan: " + e.message;
    }
  });
}
