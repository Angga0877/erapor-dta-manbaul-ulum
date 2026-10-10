E-RAPOR DTA MANBAUL ULUM — PWA TAHAP 1
=====================================

PENTING
- Ini hanya kerangka uji PWA, belum aplikasi rapor lengkap.
- Jangan masukkan data pribadi santri.
- Proyek Google Apps Script dan spreadsheet lama tidak perlu dihapus atau diubah.
- Service worker membutuhkan HTTPS (GitHub Pages memenuhi syarat) atau localhost.

ISI FOLDER
- index.html              halaman uji
- style.css               tampilan
- app.js                  status koneksi + uji IndexedDB
- sw.js                   cache shell agar halaman bisa dibuka offline
- manifest.webmanifest    metadata instalasi PWA
- icons/icon.svg + PNG    ikon lokal tanpa CDN (termasuk ukuran PWA 192/512)

CARA MENGUNGGAH KE GITHUB PAGES
1. Ekstrak ZIP ini di komputer.
2. Masuk ke https://github.com dan login.
3. Buat repository baru, misalnya: erapor-dta-manbaul-ulum
4. Pilih Public agar GitHub Pages gratis tersedia dengan pengaturan standar.
5. Unggah SEMUA ISI folder ini ke root repository, bukan folder ZIP-nya.
6. Buka Settings > Pages.
7. Pada Build and deployment pilih Deploy from a branch.
8. Branch: main; folder: /(root), lalu Save.
9. Tunggu hingga GitHub menampilkan URL Pages (biasanya berakhiran github.io).
10. Buka URL tersebut melalui Chrome atau Edge.

UJI PERTAMA
1. Buka URL Pages dan tunggu sampai status "Service worker terdaftar".
2. Ketik "Uji offline tahap 1" pada kotak catatan lalu klik "Simpan catatan uji".
3. Klik "Baca catatan tersimpan" dan pastikan teks kembali tampil.
4. Tutup tab, buka kembali URL yang sama saat masih online.
5. Setelah halaman termuat, matikan Wi-Fi/internet komputer.
6. Muat ulang halaman. Tampilan dasar seharusnya tetap muncul dari cache.
7. Klik "Baca catatan tersimpan"; catatan seharusnya tetap ada di browser yang sama.
8. Hidupkan kembali internet.

CATATAN
- Jangan menguji offline sebelum service worker berhasil terdaftar dan halaman dimuat sekali.
- Jangan hapus data situs/browser selama pengujian.
- Jika mengubah file, unggah ulang ke repository dan tunggu deployment selesai.
- GitHub Pages hanya hosting file statis. Belum ada koneksi ke Google Apps Script.
- Catatan uji disimpan hanya di browser/perangkat tersebut, tidak disinkronkan ke server.
