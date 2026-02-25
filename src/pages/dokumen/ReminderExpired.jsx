import React, { useState } from 'react';

const reminderData = [
  { id: 'REM-001', jenis: 'Dokumen Legal', nama: 'Surat Keterangan Domisili Perusahaan', pemilik: 'LPK SIMPEL', tanggalExpiry: '2025-01-31', daysLeft: -26, status: 'Expired', notified: true, prioritas: 'Kritis' },
  { id: 'REM-002', jenis: 'Dokumen Legal', nama: 'Perjanjian Kerja Sama dengan Disnaker Prov. Jabar', pemilik: 'LPK SIMPEL', tanggalExpiry: '2025-12-31', daysLeft: 308, status: 'Hampir Berakhir', notified: false, prioritas: 'Tinggi' },
  { id: 'REM-003', jenis: 'Dokumen Legal', nama: 'Dokumen Registrasi Sending Organization (SO)', pemilik: 'LPK SIMPEL', tanggalExpiry: '2025-08-31', daysLeft: 186, status: 'Hampir Berakhir', notified: true, prioritas: 'Tinggi' },
  { id: 'REM-004', jenis: 'Kontrak Perusahaan', nama: 'MOU Honda Motor Co., Ltd.', pemilik: 'Honda Motor / Saitama', tanggalExpiry: '2025-06-30', daysLeft: 124, status: 'Hampir Berakhir', notified: false, prioritas: 'Tinggi' },
  { id: 'REM-005', jenis: 'Kontrak Siswa', nama: 'Kontrak Kerja - Nurul Hidayah', pemilik: 'Nurul Hidayah / Suzuki Corp.', tanggalExpiry: '2025-06-01', daysLeft: 95, status: 'Hampir Berakhir', notified: false, prioritas: 'Normal' },
  { id: 'REM-006', jenis: 'Dokumen Siswa', nama: 'Paspor - Ahmad Fauzi', pemilik: 'Ahmad Fauzi', tanggalExpiry: '2025-09-15', daysLeft: 201, status: 'Normal', notified: false, prioritas: 'Normal' },
  { id: 'REM-007', jenis: 'Kontrak Siswa', nama: 'Kontrak Kerja - Ahmad Fauzi', pemilik: 'Ahmad Fauzi / Yamaha Motor', tanggalExpiry: '2026-03-01', daysLeft: 373, status: 'Normal', notified: false, prioritas: 'Rendah' },
  { id: 'REM-008', jenis: 'Dokumen Siswa', nama: 'SKCK - Hendra Wijaya', pemilik: 'Hendra Wijaya', tanggalExpiry: '2025-08-15', daysLeft: 170, status: 'Hampir Berakhir', notified: false, prioritas: 'Normal' },
  { id: 'REM-009', jenis: 'Kontrak Perusahaan', nama: 'MOU Toyota Housing Corp.', pemilik: 'Toyota Housing / Aichi', tanggalExpiry: '2026-02-28', daysLeft: 367, status: 'Normal', notified: false, prioritas: 'Rendah' },
  { id: 'REM-010', jenis: 'Dokumen Siswa', nama: 'Visa TKI - Dewi Lestari', pemilik: 'Dewi Lestari', tanggalExpiry: '2026-02-01', daysLeft: 340, status: 'Normal', notified: false, prioritas: 'Normal' },
];

const statusColor = {
  'Expired': 'bg-red-100 text-red-700',
  'Hampir Berakhir': 'bg-orange-100 text-orange-700',
  'Normal': 'bg-emerald-100 text-emerald-700',
};

const prioritasColor = {
  'Kritis': 'bg-red-500 text-white',
  'Tinggi': 'bg-orange-400 text-white',
  'Normal': 'bg-blue-100 text-blue-700',
  'Rendah': 'bg-gray-100 text-gray-500',
};

const jenisIcon = {
  'Dokumen Legal': '🏛️',
  'Kontrak Perusahaan': '🤝',
  'Kontrak Siswa': '👤',
  'Dokumen Siswa': '📄',
};

export default function ReminderExpired() {
  const [filterJenis, setFilterJenis] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [sortBy, setSortBy] = useState('daysLeft');

  let filtered = reminderData.filter(r => {
    const mJ = filterJenis === 'Semua' || r.jenis === filterJenis;
    const mS = filterStatus === 'Semua' || r.status === filterStatus;
    return mJ && mS;
  });

  filtered = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);

  const expired = reminderData.filter(r => r.status === 'Expired').length;
  const hampirBerakhir = reminderData.filter(r => r.status === 'Hampir Berakhir').length;
  const normal = reminderData.filter(r => r.status === 'Normal').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reminder Expired</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau dan kelola dokumen & kontrak yang akan berakhir</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          🔔 Kirim Notifikasi Massal
        </button>
      </div>

      {/* Alert Banner */}
      {expired > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="text-sm font-bold text-red-800">{expired} dokumen sudah EXPIRED</p>
              <p className="text-xs text-red-600">Segera perbarui untuk menghindari masalah operasional!</p>
            </div>
          </div>
          <button className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-700 font-medium">Tangani Sekarang</button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span>🔴</span>
            <p className="text-xs text-gray-600 font-medium">Expired</p>
          </div>
          <p className="text-3xl font-bold text-red-600">{expired}</p>
          <p className="text-xs text-red-400">Segera perbarui</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span>🟡</span>
            <p className="text-xs text-gray-600 font-medium">≤ 365 Hari</p>
          </div>
          <p className="text-3xl font-bold text-orange-500">{hampirBerakhir}</p>
          <p className="text-xs text-orange-400">Persiapkan perpanjangan</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span>🟢</span>
            <p className="text-xs text-gray-600 font-medium">Aman</p>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{normal}</p>
          <p className="text-xs text-emerald-400">Masih berlaku lama</p>
        </div>
      </div>

      {/* Timeline Visual */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Timeline Expiry (30 Item Terdekat)</p>
        <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
          {reminderData.sort((a, b) => a.daysLeft - b.daysLeft).map((r, i) => (
            <div
              key={r.id}
              className={`flex-1 rounded-sm ${r.daysLeft < 0 ? 'bg-red-400' : r.daysLeft <= 180 ? 'bg-orange-400' : 'bg-emerald-400'}`}
              title={`${r.nama} — ${r.daysLeft < 0 ? 'Expired' : r.daysLeft + ' hari lagi'}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Expired / Segera</span>
          <span>Masih Lama</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterJenis} onChange={e => setFilterJenis(e.target.value)}>
          {['Semua', 'Dokumen Legal', 'Kontrak Perusahaan', 'Kontrak Siswa', 'Dokumen Siswa'].map(j => <option key={j}>{j}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['Semua', 'Expired', 'Hampir Berakhir', 'Normal'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map(r => (
          <div
            key={r.id}
            className={`bg-white rounded-xl border shadow-sm p-4 flex items-center justify-between gap-4 ${r.daysLeft < 0 ? 'border-red-200 bg-red-50/30' : r.status === 'Hampir Berakhir' ? 'border-orange-200' : 'border-gray-200'}`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${r.daysLeft < 0 ? 'bg-red-100' : r.status === 'Hampir Berakhir' ? 'bg-orange-100' : 'bg-emerald-100'}`}>
                {jenisIcon[r.jenis]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="font-semibold text-gray-800 text-sm">{r.nama}</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${prioritasColor[r.prioritas]}`}>{r.prioritas}</span>
                </div>
                <div className="flex flex-wrap gap-x-3 text-xs text-gray-500">
                  <span>{jenisIcon[r.jenis]} {r.jenis}</span>
                  <span>👤 {r.pemilik}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-400">Berakhir</p>
                <p className="text-sm font-semibold text-gray-700">{r.tanggalExpiry}</p>
                <p className={`text-xs font-bold ${r.daysLeft < 0 ? 'text-red-600' : r.daysLeft <= 90 ? 'text-orange-500' : r.daysLeft <= 180 ? 'text-yellow-600' : 'text-emerald-600'}`}>
                  {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)} hari lalu` : `${r.daysLeft} hari lagi`}
                </p>
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[r.status]}`}>{r.status}</span>
              <div className="flex flex-col gap-1">
                <button className={`text-xs px-3 py-1 rounded-lg font-medium ${r.daysLeft < 0 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                  {r.daysLeft < 0 ? '🔄 Perbarui' : '🔔 Kirim Notif'}
                </button>
                {r.notified && <p className="text-xs text-gray-400 text-center">✓ Sudah dikirim</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}