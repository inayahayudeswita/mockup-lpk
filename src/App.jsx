import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';

// Pendaftaran
import CalonPeserta from './pages/pendaftaran/CalonPeserta';
import VerifikasiDokumen from './pages/pendaftaran/VerifikasiDokumen';
import TesAwal from './pages/pendaftaran/TesAwal';
import KeputusanSeleksi from './pages/pendaftaran/KeputusanSeleksi';

// Akademik
import DataPeserta from './pages/akademik/DataPeserta';
import ManajemenKelas from './pages/akademik/ManajemenKelas';
import JadwalPembelajaran from './pages/akademik/JadwalPembelajaran';
import Absensi from './pages/akademik/Absensi';
import NilaiEvaluasi from './pages/akademik/NilaiEvaluasi';

// Ujian
import UjianInternal from './pages/ujian/UjianInternal';
import SimulasiBahasa from './pages/ujian/SimulasiBahasa';
import HasilUjian from './pages/ujian/HasilUjian';
import Sertifikat from './pages/ujian/Sertifikat';

// Penyaluran
import PesertaSiapSalur from './pages/penyaluran/PesertaSiapSalur';
import JobOrder from './pages/penyaluran/JobOrder';
import Matching from './pages/penyaluran/Matching';
import Interview from './pages/penyaluran/Interview';
import HasilSeleksi from './pages/penyaluran/HasilSeleksi';

// Keberangkatan
import DokumenKeberangkatan from './pages/keberangkatan/DokumenKeberangkatan';
import MonitoringTimeline from './pages/keberangkatan/MonitoringTimeline';
import FinalBriefing from './pages/keberangkatan/FinalBriefing';
import StatusKeberangkatan from './pages/keberangkatan/StatusKeberangkatan';

// Monitoring
import DataPenempatan from './pages/monitoring/DataPenempatan';
import EvaluasiKinerja from './pages/monitoring/EvaluasiKinerja';
import LaporanMasalah from './pages/monitoring/LaporanMasalah';
import PerpanjanganKontrak from './pages/monitoring/PerpanjanganKontrak';

// Keuangan
import BiayaPendidikan from './pages/keuangan/BiayaPendidikan';
import Pembayaran from './pages/keuangan/Pembayaran';
import Invoice from './pages/keuangan/Invoice';
import LaporanKeuangan from './pages/keuangan/LaporanKeuangan';

// Master
import ProgramPelatihan from './pages/master/ProgramPelatihan';
import Kurikulum from './pages/master/Kurikulum';
import BidangKerja from './pages/master/BidangKerja';
import MitraJepang from './pages/master/MitraJepang';
import TahunAngkatan from './pages/master/TahunAngkatan';

// User Management
import Admin from './pages/user/Admin';
import Instruktur from './pages/user/Instruktur';
import RolePermission from './pages/user/RolePermission';
import AuditLog from './pages/user/AuditLog';

// Laporan
import LaporanPeserta from './pages/laporan/LaporanPeserta';
import LaporanAkademik from './pages/laporan/LaporanAkademik';
import LaporanPenyaluran from './pages/laporan/LaporanPenyaluran';
import ExportData from './pages/laporan/ExportData';

// Pengaturan
import ProfilLPK from './pages/pengaturan/ProfilLPK';
import TemplateDokumen from './pages/pengaturan/TemplateDokumen';
import Notifikasi from './pages/pengaturan/Notifikasi';
import Backup from './pages/pengaturan/Backup';

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1f2937',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        {/* Main Layout - Semua route menggunakan layout yang sama */}
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Pendaftaran & Seleksi */}
          <Route path="/pendaftaran/calon-peserta" element={<CalonPeserta />} />
          <Route path="/pendaftaran/verifikasi-dokumen" element={<VerifikasiDokumen />} />
          <Route path="/pendaftaran/tes-awal" element={<TesAwal />} />
          <Route path="/pendaftaran/keputusan-seleksi" element={<KeputusanSeleksi />} />

          {/* Akademik */}
          <Route path="/akademik/data-peserta" element={<DataPeserta />} />
          <Route path="/akademik/manajemen-kelas" element={<ManajemenKelas />} />
          <Route path="/akademik/jadwal" element={<JadwalPembelajaran />} />
          <Route path="/akademik/absensi" element={<Absensi />} />
          <Route path="/akademik/nilai" element={<NilaiEvaluasi />} />

          {/* Ujian & Sertifikasi */}
          <Route path="/ujian/ujian-internal" element={<UjianInternal />} />
          <Route path="/ujian/simulasi-bahasa" element={<SimulasiBahasa />} />
          <Route path="/ujian/hasil-ujian" element={<HasilUjian />} />
          <Route path="/ujian/sertifikat" element={<Sertifikat />} />

          {/* Penyaluran */}
          <Route path="/penyaluran/peserta-siap" element={<PesertaSiapSalur />} />
          <Route path="/penyaluran/job-order" element={<JobOrder />} />
          <Route path="/penyaluran/matching" element={<Matching />} />
          <Route path="/penyaluran/interview" element={<Interview />} />
          <Route path="/penyaluran/hasil-seleksi" element={<HasilSeleksi />} />

          {/* Keberangkatan */}
          <Route path="/keberangkatan/dokumen" element={<DokumenKeberangkatan />} />
          <Route path="/keberangkatan/timeline" element={<MonitoringTimeline />} />
          <Route path="/keberangkatan/briefing" element={<FinalBriefing />} />
          <Route path="/keberangkatan/status" element={<StatusKeberangkatan />} />

          {/* Monitoring */}
          <Route path="/monitoring/data-penempatan" element={<DataPenempatan />} />
          <Route path="/monitoring/evaluasi-kinerja" element={<EvaluasiKinerja />} />
          <Route path="/monitoring/laporan-masalah" element={<LaporanMasalah />} />
          <Route path="/monitoring/perpanjangan" element={<PerpanjanganKontrak />} />

          {/* Keuangan */}
          <Route path="/keuangan/biaya" element={<BiayaPendidikan />} />
          <Route path="/keuangan/pembayaran" element={<Pembayaran />} />
          <Route path="/keuangan/invoice" element={<Invoice />} />
          <Route path="/keuangan/laporan" element={<LaporanKeuangan />} />

          {/* Master Data */}
          <Route path="/master/program" element={<ProgramPelatihan />} />
          <Route path="/master/kurikulum" element={<Kurikulum />} />
          <Route path="/master/bidang-kerja" element={<BidangKerja />} />
          <Route path="/master/mitra" element={<MitraJepang />} />
          <Route path="/master/angkatan" element={<TahunAngkatan />} />

          {/* User Management */}
          <Route path="/user/admin" element={<Admin />} />
          <Route path="/user/instruktur" element={<Instruktur />} />
          <Route path="/user/role" element={<RolePermission />} />
          <Route path="/user/audit" element={<AuditLog />} />

          {/* Laporan */}
          <Route path="/laporan/peserta" element={<LaporanPeserta />} />
          <Route path="/laporan/akademik" element={<LaporanAkademik />} />
          <Route path="/laporan/penyaluran" element={<LaporanPenyaluran />} />
          <Route path="/laporan/export" element={<ExportData />} />

          {/* Pengaturan */}
          <Route path="/pengaturan/profil" element={<ProfilLPK />} />
          <Route path="/pengaturan/template" element={<TemplateDokumen />} />
          <Route path="/pengaturan/notifikasi" element={<Notifikasi />} />
          <Route path="/pengaturan/backup" element={<Backup />} />

          {/* 404 - Redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;