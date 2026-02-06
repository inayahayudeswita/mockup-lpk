# 🎌 SIMPEL-LPK - Sistem Informasi Manajemen Pelatihan Kerja Jepang

Website administrasi untuk Lembaga Pelatihan Kerja (LPK) yang fokus pada penempatan kerja ke Jepang.

## ✨ Fitur Utama

### 📊 Dashboard
- Statistik real-time: Calon peserta, Peserta aktif, Siap salur, Ditempatkan
- Chart kelulusan seleksi 6 bulan terakhir
- Progress pembelajaran per program
- Notifikasi penting (dokumen, job order, interview)
- Daftar penempatan terbaru

### 👥 Pendaftaran & Seleksi
- Manajemen data calon peserta
- Verifikasi dokumen (KTP, KK, Ijazah)
- Tes awal (akademik, fisik, minat & komitmen)
- Keputusan seleksi (Lulus, Cadangan, Tidak Lulus)
- Auto-generate akun LMS untuk yang lulus

### 📚 Manajemen Akademik
- Database peserta aktif
- Manajemen kelas dan batch
- Jadwal pembelajaran
- Sistem absensi
- Nilai & evaluasi
- Catatan instruktur

### 🎓 Ujian & Sertifikasi
- Ujian internal LPK
- Simulasi bahasa Jepang (JLPT, JFT-Basic)
- Hasil ujian & analytics
- Generate sertifikat digital dengan QR code
- Verifikasi sertifikat publik

### 💼 Penyaluran Kerja Jepang
- Database peserta siap salur
- Job order dari perusahaan Jepang
- Sistem matching otomatis
- Jadwal interview
- Hasil seleksi Jepang

### ✈️ Administrasi Keberangkatan
- Manajemen dokumen (Paspor, COE, Visa, Kontrak)
- Monitoring timeline keberangkatan
- Final briefing checklist
- Status keberangkatan real-time

### 📈 Monitoring Pasca Penempatan
- Data penempatan di Jepang
- Evaluasi kinerja peserta
- Sistem pelaporan masalah
- Tracking perpanjangan kontrak

### 💰 Keuangan
- Manajemen biaya pendidikan
- Sistem pembayaran & cicilan
- Generate invoice otomatis
- Laporan keuangan

### 🗄️ Master Data
- Program pelatihan
- Kurikulum
- Bidang kerja Jepang
- Database mitra Jepang
- Tahun angkatan

### 🔐 Manajemen User & Akses
- Manajemen admin & instruktur
- Role & permission system
- Audit log aktivitas

### 📋 Laporan
- Laporan peserta
- Laporan akademik
- Laporan penyaluran
- Export PDF & Excel

### ⚙️ Pengaturan Sistem
- Profil LPK
- Template dokumen
- Pengaturan notifikasi
- Backup & restore

## 🚀 Cara Instalasi

### Prerequisites
- Node.js 16+ dan npm/yarn
- Git

### Langkah Instalasi

1. **Clone atau download project**
```bash
# Jika dari Git
git clone <repository-url>
cd simpel-lpk

# Atau extract file zip
unzip simpel-lpk.zip
cd simpel-lpk
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
```

3. **Jalankan development server**
```bash
npm start
# atau
yarn start
```

4. **Buka browser**
```
http://localhost:3000
```

## 📁 Struktur Project

```
simpel-lpk/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.jsx                 # Main component dengan routing
│   ├── App.css                 # Styling utama
│   ├── index.js                # Entry point
│   └── components/             # Komponen reusable (untuk pengembangan)
├── package.json                # Dependencies
└── README.md                   # Dokumentasi ini
```

## 🎨 Design System

### Warna
- **Primary Orange** (#FF6B00): Energi & semangat Jepang
- **Dark Blue** (#1A1A2E): Profesional & kredibel
- **Accent Pink** (#E94560): Call-to-action
- **Success Green** (#16A085): Status positif
- **Warning Orange** (#F39C12): Perhatian
- **Info Blue** (#3498DB): Informasi

### Typography
- **Display**: Outfit (Modern, Bold, Clean)
- **Body**: Outfit (Readable, Professional)
- **Accent**: Noto Sans JP (Japanese Context)

### Components
- Sidebar fixed dengan collapse
- Cards dengan shadow & hover effect
- Smooth animations & transitions
- Responsive untuk mobile & tablet
- Loading states & skeleton screens

## 🔧 Pengembangan Selanjutnya

### Phase 1: Core Features (Saat Ini)
- ✅ Dashboard dengan statistik
- ✅ Sidebar navigation lengkap
- ✅ Responsive layout
- ✅ Design system

### Phase 2: Data Management
- [ ] Integrasi dengan backend API
- [ ] Form pendaftaran peserta
- [ ] Upload & verifikasi dokumen
- [ ] CRUD untuk semua modul
- [ ] Filter & search advanced

### Phase 3: Academic Features
- [ ] Sistem penjadwalan
- [ ] Absensi digital (QR code / NFC)
- [ ] Gradebook & analytics
- [ ] Integration dengan LMS

### Phase 4: Placement & Monitoring
- [ ] Job matching algorithm
- [ ] Interview scheduling
- [ ] Document tracking system
- [ ] Post-placement monitoring dashboard

### Phase 5: Advanced Features
- [ ] Real-time notifications (WebSocket)
- [ ] Email & SMS integration
- [ ] Mobile app (React Native)
- [ ] Multi-language (ID, JP, EN)
- [ ] AI-powered insights & predictions

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Date**: date-fns
- **Styling**: CSS with CSS Variables

## 📱 Fitur Responsive

Website ini fully responsive untuk:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔐 Role & Permission (Rencana)

### Super Admin
- Akses semua modul
- Manajemen user & role
- Backup & restore sistem

### Admin Akademik
- Pendaftaran & seleksi
- Manajemen akademik
- Ujian & sertifikasi

### Admin Penyaluran
- Penyaluran kerja Jepang
- Administrasi keberangkatan
- Monitoring pasca penempatan

### Admin Keuangan
- Modul keuangan
- Laporan keuangan

### Instruktur
- Lihat kelas yang diampu
- Input nilai & absensi
- Catatan pembelajaran

## 📞 Support

Untuk bantuan atau pertanyaan:
- Email: admin@lpk-yukmari.id
- WhatsApp: +62 xxx xxxx xxxx
- Website: www.lpk-yukmari.id

## 📄 License

Copyright © 2026 YUK-MARI Project. All rights reserved.

---

**Dibuat dengan ❤️ untuk kesuksesan pekerja Indonesia di Jepang**