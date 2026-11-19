// Data Default Aplikasi Jadwal Kegiatan & Pengawas
// Bersifat Universal & Dapat Disesuaikan Secara Penuh

const DEFAULT_DATA = {
  instansi: {
    namaInstansi: "MTs. Negeri Kota Cimahi",
    namaKegiatan: "Asesmen Sumatif Akhir Semester (ASAS)",
    tahunAjaran: "Tahun Ajaran 2026-2027",
    periode: "23 November s.d. 01 Desember 2026",
    kota: "Cimahi",
    tanggalPengesahan: "20 November 2026",
    namaKepala: "Rubaitun, M. Pd",
    nipKepala: "197112111997022004",
    jabatanKepala: "Kepala MTsN Cimahi",
    namaKetua: "Ayi Dindin Sahidin, S.Ag.",
    nipKetua: "197412212007011017",
    jabatanKetua: "Ketua Pelaksana",
    namaSekretaris: "Salman Reza, S.S.",
    nipSekretaris: "198604302019031005",
    jabatanSekretaris: "Sekretaris Pelaksana",
    catatan: "Petugas pengawas hadir 15 menit sebelum ujian dimulai di Ruang Sekretariat Panitia. Memastikan tanda tangan daftar hadir dan pakta integritas pelaksanaan ujian."
  },
  
  // Daftar 53 Petugas / Pengawas (sesuai SK MTsN Kota Cimahi)
  petugas: [
    { id: 1, nama: "Dra. Rosita", nip: "196805121994032001", role: "Pengawas", gender: "F" },
    { id: 2, nama: "Sri Gunarti, S.Ag.", nip: "197108151998032002", role: "Pengawas", gender: "F" },
    { id: 3, nama: "Amin, S.Pd.", nip: "197304102000031003", role: "Pengawas", gender: "M" },
    { id: 4, nama: "Drs. D. Suryagandi, M.Pd.", nip: "196509201992031004", role: "Pengawas", gender: "M" },
    { id: 5, nama: "Muhamad Bayu, S.Ag.", nip: "197506142002121001", role: "Pengawas", gender: "M" },
    { id: 6, nama: "Kemala Sofianti, S., S.Pd.", nip: "197802112005012005", role: "Pengawas", gender: "F" },
    { id: 7, nama: "Mimi Jamilah, S.Pd.", nip: "198003182006042008", role: "Pengawas", gender: "F" },
    { id: 8, nama: "Yayu Wahyuni Hidayati, M.Pd.", nip: "197709052003122002", role: "Pengawas", gender: "F" },
    { id: 9, nama: "Teti Hopsah, S.Pd.", nip: "198201252008012009", role: "Pengawas", gender: "F" },
    { id: 10, nama: "Saeful Munawar, S.Pd.", nip: "198407122009011007", role: "Pengawas", gender: "M" },
    { id: 11, nama: "Yani Kuraesin, S.Ag.", nip: "197211041999032001", role: "Pengawas", gender: "F" },
    { id: 12, nama: "Kania Roslyani, S.Ag.", nip: "197605192005012003", role: "Pengawas", gender: "F" },
    { id: 13, nama: "Endang Nurswarni, M.Pd.", nip: "196903221997032002", role: "Pengawas", gender: "F" },
    { id: 14, nama: "Rohaeni, S.Pd.", nip: "197408102002122004", role: "Pengawas", gender: "F" },
    { id: 15, nama: "Sudeni Suheri Permana Putra, M.Pd.", nip: "198305012009011012", role: "Pengawas", gender: "M" },
    { id: 16, nama: "Aap Pathudin, S.Ag.", nip: "197009181998031005", role: "Pengawas", gender: "M" },
    { id: 17, nama: "Wawan Hermawan, S.Ag.", nip: "197103042000031002", role: "Pengawas", gender: "M" },
    { id: 18, nama: "Agus Gunawan, S.Pd.", nip: "197906152005011008", role: "Pengawas Utama / Koordinator", gender: "M", avatar: "assets/images/pak_guru_agus.jpg", highlighted: true },
    { id: 19, nama: "Gan Gan Ruslyana, S.Pd., M.M.Pd.", nip: "197812032006041011", role: "Pengawas", gender: "M" },
    { id: 20, nama: "Dede Solihin, S.Pd.I, M.M.Pd.", nip: "197704152007011019", role: "Pengawas", gender: "M" },
    { id: 21, nama: "Ratna Komalasari, S.Ag.", nip: "197609282003122003", role: "Pengawas", gender: "F" },
    { id: 22, nama: "Leli Denawati, M.Pd.", nip: "197901082005012007", role: "Pengawas", gender: "F" },
    { id: 23, nama: "Yani Eka Sapitri, M.Pd.", nip: "198106192006042015", role: "Pengawas", gender: "F" },
    { id: 24, nama: "Ella Janawati, S.Pd.", nip: "198308222009012010", role: "Pengawas", gender: "F" },
    { id: 25, nama: "Siti Rosidah, S.Pd.", nip: "198502142010012020", role: "Pengawas", gender: "F" },
    { id: 26, nama: "Deni Kurniawan As'ari, M.Pd.", nip: "198210052008011014", role: "Pengawas", gender: "M" },
    { id: 27, nama: "Azis Basyari, S.Ag.", nip: "197305172000031006", role: "Pengawas", gender: "M" },
    { id: 28, nama: "Heni Nurhayati, M.Pd.", nip: "197508292003122004", role: "Pengawas", gender: "F" },
    { id: 29, nama: "Faizun Nuraini, S.Pd.", nip: "198604122011012018", role: "Pengawas", gender: "F" },
    { id: 30, nama: "Asiah, S.Pd.I.", nip: "198007202007012013", role: "Pengawas", gender: "F" },
    { id: 31, nama: "Yoniar Medarty, S.Pt.", nip: "197806252006042011", role: "Pengawas", gender: "F" },
    { id: 32, nama: "Neneng Susy Nursamsiyah, S.HI, Gr., M.E.", nip: "198311102009012019", role: "Pengawas", gender: "F" },
    { id: 33, nama: "Yusi Asofah, S.Ag.", nip: "197409022002122003", role: "Pengawas", gender: "F" },
    { id: 34, nama: "Siti Nur Mulyani, S.Pd.", nip: "198703152011012022", role: "Pengawas", gender: "F" },
    { id: 35, nama: "Mila Sari, S.Pd.", nip: "198805202014032005", role: "Pengawas", gender: "F" },
    { id: 36, nama: "Sanny Moch. Syafril Zein, S.Pd.", nip: "198909102015031003", role: "Pengawas", gender: "M" },
    { id: 37, nama: "Rose Novia Nur Kusumawati, S.Pd.", nip: "199011042019032014", role: "Pengawas", gender: "F" },
    { id: 38, nama: "Sera Meliati Sutaryo, S.Pd.", nip: "199108172020122011", role: "Pengawas", gender: "F" },
    { id: 39, nama: "Naufal Farraz Gunarto, S.Pd.", nip: "199304122022031005", role: "Pengawas", gender: "M" },
    { id: 40, nama: "Neri Afryani, S.Pd.", nip: "199205162020122016", role: "Pengawas", gender: "F" },
    { id: 41, nama: "Navillah Paranita, S.Pd.", nip: "199401282023022008", role: "Pengawas", gender: "F" },
    { id: 42, nama: "Ridhwan Ahmad Nurdiyana, S.Pd.", nip: "199109092020121008", role: "Pengawas", gender: "M" },
    { id: 43, nama: "Lelis Sulastri, S.Pd.", nip: "199203142022032010", role: "Pengawas", gender: "F" },
    { id: 44, nama: "Lilis Juandinar, S.Pd.I.", nip: "198506212010012025", role: "Pengawas", gender: "F" },
    { id: 45, nama: "Saprina Sandy S, S.Pd.", nip: "199310112023022012", role: "Pengawas", gender: "F" },
    { id: 46, nama: "Mulyadi, S.Pd.I.", nip: "198402192009011018", role: "Pengawas", gender: "M" },
    { id: 47, nama: "Dessy Nur Laily, S.Pd.I.", nip: "199007152019032018", role: "Pengawas", gender: "F" },
    { id: 48, nama: "Nessy Anugrawati, S.Pd.", nip: "199102042020122014", role: "Pengawas", gender: "F" },
    { id: 49, nama: "Reni Anggraeni, S.Pd.", nip: "199408262023022015", role: "Pengawas", gender: "F" },
    { id: 50, nama: "Listia Fitriani, S.Psi.", nip: "199503182024042006", role: "Pengawas", gender: "F" },
    { id: 51, nama: "Nurul Andriyani, S.Sos.", nip: "199309222022032011", role: "Pengawas", gender: "F" },
    { id: 52, nama: "Allisa Yunita Shafa, S.Kom.I", nip: "199607142024042018", role: "Pengawas", gender: "F" },
    { id: 53, nama: "Desta Permana, S.Sn.", nip: "199512192024041009", role: "Pengawas", gender: "M" }
  ],

  // Daftar Ruangan Ujian (Ruang 1 s.d Ruang 33)
  ruang: Array.from({ length: 33 }, (_, i) => ({
    id: i + 1,
    nama: `Ruang ${i + 1}`,
    kapasitas: 32,
    keterangan: `Lantai ${i < 12 ? '1' : i < 24 ? '2' : '3'}`
  })),

  // Jadwal Sesi Mengawas Lengkap (7 Hari, 16 Sesi)
  jadwal: [
    {
      id: 1,
      noHari: 1,
      hari: "Senin, 23 November 2026",
      ke: 1,
      waktu: "07.30 - 09.30",
      mapel: "BAHASA INDONESIA",
      kategori: "Umum",
      penugasan: {
        1: 52, 2: 2, 3: 3, 4: 4, 5: 29, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11,
        11: 12, 12: 13, 13: 45, 14: 16, 15: 17, 16: 46, 17: 44, 18: 14, 19: 51, 20: 39,
        21: 23, 22: 41, 23: 25, 24: 26, 25: 50, 26: 42, 27: 6, 28: 36, 29: 47, 30: 53,
        31: 49, 32: 5, 33: 30
      }
    },
    {
      id: 2,
      noHari: 1,
      hari: "Senin, 23 November 2026",
      ke: 2,
      waktu: "10.00 - 12.00",
      mapel: "MATEMATIKA",
      kategori: "MIPA",
      penugasan: {
        1: 23, 2: 26, 3: 36, 4: 14, 5: 12, 6: 39, 7: 25, 8: 41, 9: 42, 10: 43,
        11: 44, 12: 6, 13: 46, 14: 18, 15: 49, 16: 50, 17: 51, 18: 52, 19: 53, 20: 1,
        21: 2, 22: 3, 23: 4, 24: 5, 25: 7, 26: 8, 27: 9, 28: 10, 29: 11, 30: 13,
        31: 17, 32: 16, 33: 21
      }
    },
    {
      id: 3,
      noHari: 2,
      hari: "Selasa, 24 November 2026",
      ke: 1,
      waktu: "07.30 - 09.00",
      mapel: "AL-QURAN HADIS",
      kategori: "Agama",
      penugasan: {
        1: 1, 2: 14, 3: 16, 4: 18, 5: 19, 6: 20, 7: 21, 8: 22, 9: 23, 10: 24,
        11: 25, 12: 26, 13: 27, 14: 28, 15: 29, 16: 30, 17: 7, 18: 32, 19: 33, 20: 34,
        21: 35, 22: 36, 23: 37, 24: 11, 25: 39, 26: 47, 27: 31, 28: 43, 29: 44, 30: 45,
        31: 46, 32: 2, 33: 3
      }
    },
    {
      id: 4,
      noHari: 2,
      hari: "Selasa, 24 November 2026",
      ke: 2,
      waktu: "09.30 - 11.00",
      mapel: "PENDIDIKAN PANCASILA",
      kategori: "PPKn",
      penugasan: {
        1: 49, 2: 29, 3: 48, 4: 37, 5: 51, 6: 42, 7: 53, 8: 1, 9: 2, 10: 52,
        11: 4, 12: 5, 13: 7, 14: 40, 15: 41, 16: 45, 17: 11, 18: 38, 19: 13, 20: 14,
        21: 18, 22: 16, 23: 17, 24: 15, 25: 27, 26: 44, 27: 20, 28: 21, 29: 22, 30: 23,
        31: 24, 32: 25, 33: 26
      }
    },
    {
      id: 5,
      noHari: 3,
      hari: "Rabu, 25 November 2026",
      ke: 1,
      waktu: "07.30 - 09.00",
      mapel: "IPA",
      kategori: "MIPA",
      penugasan: {
        1: 8, 2: 9, 3: 7, 4: 10, 5: 11, 6: 12, 7: 50, 8: 14, 9: 18, 10: 16,
        11: 17, 12: 15, 13: 19, 14: 20, 15: 21, 16: 22, 17: 23, 18: 24, 19: 25, 20: 26,
        21: 27, 22: 28, 23: 29, 24: 30, 25: 31, 26: 32, 27: 40, 28: 34, 29: 48, 30: 36,
        31: 37, 32: 38, 33: 43
      }
    },
    {
      id: 6,
      noHari: 3,
      hari: "Rabu, 25 November 2026",
      ke: 2,
      waktu: "09.30 - 11.00",
      mapel: "AQIDAH AKHLAK",
      kategori: "Agama",
      penugasan: {
        1: 25, 2: 22, 3: 24, 4: 43, 5: 44, 6: 21, 7: 31, 8: 35, 9: 48, 10: 50,
        11: 20, 12: 30, 13: 32, 14: 33, 15: 38, 16: 29, 17: 26, 18: 37, 19: 34, 20: 7,
        21: 8, 22: 9, 23: 10, 24: 11, 25: 12, 26: 27, 27: 15, 28: 16, 29: 17, 30: 14,
        31: 19, 32: 18, 33: 1
      }
    },
    {
      id: 7,
      noHari: 3,
      hari: "Rabu, 25 November 2026",
      ke: 3,
      waktu: "11.15 - 12.45",
      mapel: "FIKIH",
      kategori: "Agama",
      penugasan: {
        1: 27, 2: 28, 3: 29, 4: 30, 5: 31, 6: 32, 7: 33, 8: 34, 9: 35, 10: 36,
        11: 37, 12: 38, 13: 39, 14: 40, 15: 41, 16: 42, 17: 43, 18: 44, 19: 45, 20: 46,
        21: 47, 22: 48, 23: 49, 24: 13, 25: 51, 26: 52, 27: 53, 28: 1, 29: 2, 30: 3,
        31: 4, 32: 5, 33: 6
      }
    },
    {
      id: 8,
      noHari: 4,
      hari: "Kamis, 26 November 2026",
      ke: 1,
      waktu: "07.30 - 09.00",
      mapel: "BAHASA INGGRIS",
      kategori: "Bahasa",
      penugasan: {
        1: 20, 2: 21, 3: 22, 4: 23, 5: 24, 6: 40, 7: 26, 8: 27, 9: 28, 10: 29,
        11: 30, 12: 7, 13: 32, 14: 33, 15: 34, 16: 35, 17: 36, 18: 37, 19: 2, 20: 39,
        21: 8, 22: 42, 23: 19, 24: 18, 25: 45, 26: 53, 27: 47, 28: 48, 29: 49, 30: 13,
        31: 51, 32: 52, 33: 1
      }
    },
    {
      id: 9,
      noHari: 4,
      hari: "Kamis, 26 November 2026",
      ke: 2,
      waktu: "09.30 - 11.00",
      mapel: "IPS",
      kategori: "IPS",
      penugasan: {
        1: 38, 2: 1, 3: 2, 4: 52, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9,
        11: 10, 12: 11, 13: 12, 14: 13, 15: 18, 16: 15, 17: 46, 18: 34, 19: 14, 20: 19,
        21: 20, 22: 21, 23: 22, 24: 23, 25: 45, 26: 27, 27: 26, 28: 50, 29: 28, 30: 29,
        31: 30, 32: 53, 33: 32
      }
    },
    {
      id: 10,
      noHari: 4,
      hari: "Kamis, 26 November 2026",
      ke: 3,
      waktu: "11.15 - 12.45",
      mapel: "SENI BUDAYA",
      kategori: "Seni",
      penugasan: {
        1: 33, 2: 34, 3: 35, 4: 36, 5: 37, 6: 38, 7: 39, 8: 40, 9: 24, 10: 42,
        11: 15, 12: 46, 13: 47, 14: 48, 15: 49, 16: 50, 17: 51, 18: 52, 19: 1, 20: 2,
        21: 3, 22: 4, 23: 5, 24: 23, 25: 7, 26: 8, 27: 9, 28: 10, 29: 11, 30: 12,
        31: 16, 32: 17, 33: 20
      }
    },
    {
      id: 11,
      noHari: 5,
      hari: "Jumat, 27 November 2026",
      ke: 1,
      waktu: "07.30 - 09.30",
      mapel: "BAHASA ARAB",
      kategori: "Bahasa",
      penugasan: {
        1: 13, 2: 28, 3: 15, 4: 16, 5: 17, 6: 3, 7: 19, 8: 20, 9: 21, 10: 32,
        11: 23, 12: 24, 13: 25, 14: 26, 15: 9, 16: 18, 17: 30, 18: 31, 19: 41, 20: 49,
        21: 34, 22: 35, 23: 48, 24: 51, 25: 38, 26: 5, 27: 40, 28: 46, 29: 42, 30: 47,
        31: 12, 32: 45, 33: 2
      }
    },
    {
      id: 12,
      noHari: 5,
      hari: "Jumat, 27 November 2026",
      ke: 2,
      waktu: "10.00 - 11.30",
      mapel: "SKI",
      kategori: "Agama",
      penugasan: {
        1: 47, 2: 48, 3: 49, 4: 50, 5: 51, 6: 42, 7: 30, 8: 38, 9: 35, 10: 5,
        11: 26, 12: 40, 13: 9, 14: 45, 15: 38, 16: 12, 17: 13, 18: 28, 19: 15, 20: 18,
        21: 32, 22: 19, 23: 20, 24: 21, 25: 41, 26: 23, 27: 24, 28: 25, 29: 1, 30: 2,
        31: 3, 32: 4, 33: 7
      }
    },
    {
      id: 13,
      noHari: 6,
      hari: "Senin, 30 November 2026",
      ke: 1,
      waktu: "07.30 - 09.00",
      mapel: "BAHASA DAERAH",
      kategori: "Bahasa",
      penugasan: {
        1: 25, 2: 27, 3: 14, 4: 37, 5: 30, 6: 31, 7: 17, 8: 33, 9: 41, 10: 35,
        11: 46, 12: 36, 13: 11, 14: 39, 15: 9, 16: 42, 17: 43, 18: 44, 19: 10, 20: 16,
        21: 47, 22: 12, 23: 22, 24: 13, 25: 51, 26: 21, 27: 53, 28: 1, 29: 52, 30: 3,
        31: 4, 32: 5, 33: 18
      }
    },
    {
      id: 14,
      noHari: 6,
      hari: "Senin, 30 November 2026",
      ke: 2,
      waktu: "09.30 - 11.00",
      mapel: "PJOK",
      kategori: "PJOK",
      penugasan: {
        1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 9: 43, 10: 1,
        11: 16, 12: 17, 13: 3, 14: 44, 15: 51, 16: 21, 17: 39, 18: 22, 19: 41, 20: 25,
        21: 4, 22: 27, 23: 14, 24: 47, 25: 30, 26: 31, 27: 42, 28: 33, 29: 46, 30: 35,
        31: 36, 32: 5, 33: 38
      }
    },
    {
      id: 15,
      noHari: 7,
      hari: "Selasa, 1 Desember 2026",
      ke: 1,
      waktu: "07.30 - 09.00",
      mapel: "TAHFIZ",
      kategori: "Agama",
      penugasan: {
        1: 49, 2: 40, 3: 41, 4: 39, 5: 44, 6: 20, 7: 19, 8: 22, 9: 48, 10: 36,
        11: 50, 12: 52, 13: 27, 14: 31, 15: 1, 16: 2, 17: 29, 18: 4, 19: 37, 20: 6,
        21: 33, 22: 8, 23: 23, 24: 10, 25: 45, 26: 53, 27: 15, 28: 28, 29: 18, 30: 24,
        31: 32, 32: 17, 33: 16
      }
    },
    {
      id: 16,
      noHari: 7,
      hari: "Selasa, 1 Desember 2026",
      ke: 2,
      waktu: "09.30 - 11.00",
      mapel: "INFORMATIKA",
      kategori: "TIK",
      penugasan: {
        1: 19, 2: 20, 3: 45, 4: 22, 5: 23, 6: 15, 7: 40, 8: 4, 9: 27, 10: 28,
        11: 29, 12: 24, 13: 31, 14: 32, 15: 33, 16: 34, 17: 35, 18: 36, 19: 37, 20: 38,
        21: 39, 22: 41, 23: 42, 24: 43, 25: 44, 26: 10, 27: 18, 28: 46, 29: 48, 30: 49,
        31: 50, 32: 3, 33: 1
      }
    }
  ]
};
