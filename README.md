# SIM-JADWAL GURU & PENGAWAS KEGIATAN UNIVERSAL 🌟

Aplikasi cerdas, modern, dan **bersifat 100% universal/general** untuk manajemen dan penayangan jadwal kegiatan beserta penugasan petugas/guru pengawas. Aplikasi ini mengusung perpaduan desain UI/UX modern SaaS dashboard dan estetika hangat **3D Realistic Pixar** untuk menyemangati Bapak & Ibu Guru Indonesia masa kini.

> 🔗 **Repositori GitHub:** [https://github.com/goodthink1728-cmd/jadwal-petugas](https://github.com/goodthink1728-cmd/jadwal-petugas)  
> 🌐 **Live Demo (GitHub Pages):** [https://goodthink1728-cmd.github.io/jadwal-petugas/](https://goodthink1728-cmd.github.io/jadwal-petugas/)

---

## 🎨 Tampilan UI/UX & Karakter 3D Pixar
- **Desain Modern Dashboard**: Terinspirasi dari dashboard premium dengan rounded card, soft shadows, aksen hijau toska ceria (*Emerald & Fresh Mint*), serta warna-warni cerah khas pendidik masa kini.
- **Dua Karakter Guru 3D Realistic Pixar**:
  1. **Pak Guru Agus**: Karakter pria gagah dengan seragam dinas ASN/PNS coklat khas animasi 3D Pixar.
  2. **Ibu Guru Hijab**: Karakter wanita anggun berhijab merah muda dengan seragam dinas ASN/PNS khas animasi 3D Pixar.
  - Tombol **"Ganti Avatar 3D"** memungkinkan pengguna beralih karakter secara instan kapan saja.

---

## 🚀 Fitur Unggulan

### 1. Bersifat General & Universal (Dapat Dipakai Siapa Saja & Kapan Saja)
- Bukan hanya untuk sekolah/madrasah tertentu, aplikasi ini dapat digunakan oleh:
  - Seluruh jenjang sekolah: SD, SMP, MTs, SMA, SMK, MA, Pondok Pesantren, hingga Perguruan Tinggi.
  - Berbagai jenis kegiatan: ASAS, SAS, PTS, PAS, ANBK, UM, Ujian Praktik, OSN, SBMPTN, Piket Ramadhan, Pengawas Pemilu, Shift Keamanan/Medis, dsb.
- Terdapat formulir **Identitas Instansi & Pengesahan**:
  - Nama Sekolah/Organisasi/Instansi
  - Nama Kegiatan & Program
  - Tahun Ajaran & Rentang Tanggal
  - Nama & NIP Pimpinan/Kepala
  - Nama & NIP Ketua Panitia
  - Nama & NIP Sekretaris
  - Catatan & Tata Tertib Pelaksanaan

### 2. Matriks Jadwal Master (Ruang 1 s.d Ruang N × Sesi)
- Menampilkan jadwal lengkap seluruh sesi dan pemetaan petugas di setiap ruangan.
- **Sorot Petugas Cerdas (*Smart Highlight*)**: Saat memilih seorang guru (contoh: Pak Agus Gunawan #18), nomor dan ruangan tugas beliau langsung menyala merah/pink di seluruh matriks jadwal.
- Filter interaktif berdasarkan **Hari/Tanggal** dan **Ruangan**.
- Klik langsung pada nomor petugas di tabel untuk langsung melihat detail profil dan jadwal penugasan beliau.

### 3. Pencarian Mandiri: "Cek Jadwal Saya" (Kartu Personal Guru)
- Setiap Bapak/Ibu Guru dapat memilih nama atau nomor urut pengawasnya.
- Menampilkan kartu profil personal dengan avatar 3D Pixar, total jam/sesi tugas, beban kerja, dan daftar kartu tugas per hari, mata pelajaran, jam, serta ruangan.
- Tombol **"Cetak Kartu Tugas Guru"** untuk mencetak kartu saku pengawas personal dalam format rapi.

### 4. Template & Otomatisasi (Upload & Download Excel / JSON)
- **Unduh Template Excel (.xlsx)**: Template resmi siap isi yang terdiri dari 3 sheet rapi: *Daftar Petugas*, *Jadwal Mengawas*, dan *Pengaturan Instansi*.
- **Drag & Drop Upload**: Pengguna cukup menyeret file Excel (.xlsx, .xls), CSV, atau JSON ke area upload. Aplikasi secara otomatis mem-parsing dan langsung menyesuaikan matriks tanpa reload halaman!
- **Cadangan Lengkap JSON**: Backup 1-klik untuk seluruh data jadwal.
- **Reset ke Contoh Asli ASAS Cimahi**: Tombol sekali klik untuk mengembalikan data ke contoh MTsN Kota Cimahi (53 pengawas & 16 sesi jadwal).

### 5. Format Cetak Resmi Berstandar Pemerintah / Sekolah
- Dilengkapi layout cetak khusus (`@media print`):
  - KOP Surat Resmi & Nama Instansi
  - Lembar Matriks Jadwal yang rapi dan pas satu lembar kertas (A4 / F4 landscape)
  - Bagian tanda tangan legalisasi: **Kepala Madrasah / Instansi**, **Ketua Panitia**, dan **Sekretaris** lengkap dengan NIP dan tanggal pengesahan.

### 6. Tersambung ke GitHub goodthink1728
- Terhubung langsung dengan akun GitHub `goodthink1728` (`goodthink1728-cmd`).
- Fitur ekspor payload git dan sinkronisasi cloud siap pakai.

---

## 📂 Struktur File

```
jadwal-petugas/
├── index.html                   # Aplikasi Web Utama Responsive
├── README.md                    # Dokumentasi Proyek
└── assets/
    ├── css/
    │   └── style.css            # Styling UI Modern, Palette Cerah, & Media Print
    ├── js/
    │   ├── data.js              # Data Master Default ASAS MTsN Kota Cimahi
    │   ├── app.js               # Logika Aplikasi, Filter, Parser Excel, & Renderer
    │   └── xlsx.full.min.js     # Library SheetJS Offline Excel Engine
    └── images/
        ├── pak_guru_agus.jpg    # Avatar 3D Pixar Guru Pria ASN
        ├── bu_guru_hijab.jpg    # Avatar 3D Pixar Guru Wanita Hijab ASN
        └── ui_reference.jpg     # Referensi Desain Dashboard
```

---

## 💡 Cara Menjalankan Secara Lokal

1. Buka folder `jadwal-petugas`.
2. Klik dua kali file `index.html` untuk langsung membukanya di browser apa saja (Google Chrome, Microsoft Edge, Firefox, Safari).
3. **100% Offline Ready**: Aplikasi tidak membutuhkan server backend, seluruh pemrosesan Excel dan data berjalan secara lokal di perangkat Anda dengan aman dan cepat!
