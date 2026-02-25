import React, { useState } from 'react';

const kontrakData = [
  { id: 'KS-2025-001', siswa: 'Ahmad Fauzi', nik: '3201010101900001', program: 'Magang Jepang (Tokenshusei)', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', tanggalMulai: '2025-03-01', tanggalSelesai: '2026-03-01', durasi: '12 Bulan', status: 'Aktif', ttdSiswa: true, ttdLPK: true, ttdPerusahaan: true },
  { id: 'KS-2025-002', siswa: 'Siti Rahayu', nik: '3201020202920002', program: 'Tokutei Ginou (Specified Skilled Worker)', perusahaan: 'Toyota Housing Corp.', prefektur: 'Aichi', tanggalMulai: '2025-04-01', tanggalSelesai: '2028-04-01', durasi: '36 Bulan', status: 'Draft', ttdSiswa: false, ttdLPK: false, ttdPerusahaan: false },
  { id: 'KS-2025-003', siswa: 'Budi Santoso', nik: '3201030303930003', program: 'SSW (Specified Skilled Worker 2)', perusahaan: 'Panasonic Corp.', prefektur: 'Osaka', tanggalMulai: '2025-05-01', tanggalSelesai: '2030-05-01', durasi: '60 Bulan', status: 'Menunggu TTD', ttdSiswa: true, ttdLPK: true, ttdPerusahaan: false },
  { id: 'KS-2025-004', siswa: 'Dewi Lestari', nik: '3201040404940004', program: 'Magang Jepang (Tokenshusei)', perusahaan: 'Honda Motor Co., Ltd.', prefektur: 'Saitama', tanggalMulai: '2025-02-01', tanggalSelesai: '2026-02-01', durasi: '12 Bulan', status: 'Aktif', ttdSiswa: true, ttdLPK: true, ttdPerusahaan: true },
  { id: 'KS-2025-005', siswa: 'Rizki Pratama', nik: '3201050505950005', program: 'Tokutei Ginou (Specified Skilled Worker)', perusahaan: 'Mitsubishi Electric', prefektur: 'Tokyo', tanggalMulai: '2025-06-01', tanggalSelesai: '2028-06-01', durasi: '36 Bulan', status: 'Draft', ttdSiswa: false, ttdLPK: false, ttdPerusahaan: false },
  { id: 'KS-2024-008', siswa: 'Nurul Hidayah', nik: '3201060606960006', program: 'Magang Jepang (Tokenshusei)', perusahaan: 'Suzuki Motor Corp.', prefektur: 'Hamamatsu', tanggalMulai: '2024-06-01', tanggalSelesai: '2025-06-01', durasi: '12 Bulan', status: 'Selesai', ttdSiswa: true, ttdLPK: true, ttdPerusahaan: true },
];

const statusColor = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Draft': 'bg-gray-100 text-gray-500',
  'Menunggu TTD': 'bg-yellow-100 text-yellow-700',
  'Selesai': 'bg-blue-100 text-blue-700',
  'Dibatalkan': 'bg-red-100 text-red-700',
};

function TTDStatus({ done, label }) {
  return (
    <div className={`flex items-center gap-1 text-xs ${done ? 'text-emerald-600' : 'text-gray-400'}`}>
      <span>{done ? '✅' : '⏳'}</span>
      <span>{label}</span>
    </div>
  );
}

export default function KontrakSiswa() {
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = kontrakData.filter(k => {
    const matchS = filterStatus === 'Semua' || k.status === filterStatus;
    const matchQ = k.siswa.toLowerCase().includes(search.toLowerCase()) || k.id.toLowerCase().includes(search.toLowerCase());
    return matchS && matchQ;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kontrak Siswa</h1>
          <p className="text-sm text-gray-500 mt-1">Manajemen kontrak kerja siswa dengan perusahaan Jepang</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Buat Kontrak Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Kontrak', val: kontrakData.length, color: 'text-gray-800' },
          { label: 'Aktif', val: kontrakData.filter(k => k.status === 'Aktif').length, color: 'text-emerald-600' },
          { label: 'Menunggu TTD', val: kontrakData.filter(k => k.status === 'Menunggu TTD').length, color: 'text-yellow-600' },
          { label: 'Draft', val: kontrakData.filter(k => k.status === 'Draft').length, color: 'text-gray-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 max-w-xs"
          placeholder="Cari nama atau ID kontrak..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['Semua', 'Aktif', 'Draft', 'Menunggu TTD', 'Selesai'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID Kontrak</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Siswa</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Program</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Perusahaan Jepang</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Prefektur</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Durasi</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tanda Tangan</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(k => (
              <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-blue-600 text-xs font-medium">{k.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{k.siswa.charAt(0)}</div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs">{k.siswa}</p>
                      <p className="text-gray-400 text-xs">{k.nik}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs max-w-xs">
                  <p className="truncate" style={{ maxWidth: 150 }}>{k.program}</p>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 text-xs">{k.perusahaan}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  <span>🇯🇵 {k.prefektur}</span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  <div>
                    <p className="font-medium">{k.durasi}</p>
                    <p className="text-gray-400">{k.tanggalMulai} – {k.tanggalSelesai}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    <TTDStatus done={k.ttdSiswa} label="Siswa" />
                    <TTDStatus done={k.ttdLPK} label="LPK" />
                    <TTDStatus done={k.ttdPerusahaan} label="Perusahaan" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[k.status]}`}>{k.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700 text-xs font-medium" onClick={() => setSelected(k)}>Lihat</button>
                    <button className="text-gray-400 hover:text-gray-600 text-xs font-medium">Cetak</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Detail Kontrak</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ['ID Kontrak', selected.id],
                ['Siswa', selected.siswa],
                ['NIK', selected.nik],
                ['Program', selected.program],
                ['Perusahaan', selected.perusahaan],
                ['Prefektur', `🇯🇵 ${selected.prefektur}`],
                ['Tanggal Mulai', selected.tanggalMulai],
                ['Tanggal Selesai', selected.tanggalSelesai],
                ['Durasi', selected.durasi],
                ['Status', selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-800">{v}</span>
                </div>
              ))}
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Tanda Tangan</span>
                <div className="space-y-1 text-right">
                  <TTDStatus done={selected.ttdSiswa} label="Siswa" />
                  <TTDStatus done={selected.ttdLPK} label="LPK" />
                  <TTDStatus done={selected.ttdPerusahaan} label="Perusahaan" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">📄 Unduh PDF</button>
              <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50" onClick={() => setSelected(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}