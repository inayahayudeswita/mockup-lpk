import React, { useState } from 'react';

const siswaAkademik = [
  { id: 'S001', nama: 'Ahmad Fauzi', batch: 'Jan 2025', program: 'Magang', nilaiJepang: 85, nilaiKaiwa: 78, nilaiBudaya: 88, nilaiTeknis: 82, kehadiran: 95, status: 'Lulus' },
  { id: 'S002', nama: 'Siti Rahayu', batch: 'Jan 2025', program: 'Tokutei', nilaiJepang: 92, nilaiKaiwa: 88, nilaiBudaya: 91, nilaiTeknis: 89, kehadiran: 98, status: 'Lulus' },
  { id: 'S003', nama: 'Budi Santoso', batch: 'Feb 2025', program: 'SSW', nilaiJepang: 78, nilaiKaiwa: 72, nilaiBudaya: 80, nilaiTeknis: 75, kehadiran: 88, status: 'Perbaikan' },
  { id: 'S004', nama: 'Dewi Lestari', batch: 'Jan 2025', program: 'Magang', nilaiJepang: 94, nilaiKaiwa: 91, nilaiBudaya: 95, nilaiTeknis: 90, kehadiran: 100, status: 'Lulus' },
  { id: 'S005', nama: 'Rizki Pratama', batch: 'Feb 2025', program: 'Tokutei', nilaiJepang: 70, nilaiKaiwa: 65, nilaiBudaya: 72, nilaiTeknis: 80, kehadiran: 82, status: 'Perbaikan' },
  { id: 'S006', nama: 'Nurul Hidayah', batch: 'Jan 2025', program: 'SSW', nilaiJepang: 88, nilaiKaiwa: 85, nilaiBudaya: 90, nilaiTeknis: 87, kehadiran: 97, status: 'Lulus' },
  { id: 'S007', nama: 'Hendra Wijaya', batch: 'Feb 2025', program: 'Magang', nilaiJepang: 82, nilaiKaiwa: 79, nilaiBudaya: 84, nilaiTeknis: 81, kehadiran: 93, status: 'Lulus' },
  { id: 'S008', nama: 'Rina Kusuma', batch: 'Feb 2025', program: 'Tokutei', nilaiJepang: 62, nilaiKaiwa: 58, nilaiBudaya: 65, nilaiTeknis: 70, kehadiran: 75, status: 'Tidak Lulus' },
];

const statusColor = {
  'Lulus': 'bg-emerald-100 text-emerald-700',
  'Perbaikan': 'bg-yellow-100 text-yellow-700',
  'Tidak Lulus': 'bg-red-100 text-red-700',
};

function getRating(val) {
  if (val >= 90) return '🌟 A';
  if (val >= 80) return '✅ B';
  if (val >= 70) return '⚠️ C';
  return '❌ D';
}

const avgNilai = (field) => {
  const vals = siswaAkademik.map(s => s[field]);
  return Math.round(vals.reduce((a, b) => a + b) / vals.length);
};

export default function ReportAkademik() {
  const [filterBatch, setFilterBatch] = useState('Semua');
  const [sortBy, setSortBy] = useState('nilaiJepang');

  let filtered = siswaAkademik.filter(s => filterBatch === 'Semua' || s.batch === filterBatch);
  filtered = [...filtered].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Akademik</h1>
          <p className="text-sm text-gray-500 mt-1">Rekap nilai dan perkembangan akademik seluruh siswa</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">📥 Export Excel</button>
      </div>

      {/* KPI Rata-rata */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Bahasa Jepang', avg: avgNilai('nilaiJepang'), icon: '🈯' },
          { label: 'Kaiwa (Percakapan)', avg: avgNilai('nilaiKaiwa'), icon: '🗣️' },
          { label: 'Budaya & Etos', avg: avgNilai('nilaiBudaya'), icon: '🎌' },
          { label: 'Teknis', avg: avgNilai('nilaiTeknis'), icon: '⚙️' },
          { label: 'Kehadiran', avg: avgNilai('kehadiran'), icon: '📅' },
        ].map((s, i) => {
          const color = s.avg >= 88 ? 'text-emerald-600 bg-emerald-50' : s.avg >= 78 ? 'text-blue-600 bg-blue-50' : 'text-yellow-600 bg-yellow-50';
          return (
            <div key={i} className={`${color} rounded-xl border border-gray-200 p-4 text-center`}>
              <p className="text-xl mb-1">{s.icon}</p>
              <p className="text-2xl font-bold">{s.avg}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Distribusi Kelulusan */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Lulus', count: siswaAkademik.filter(s => s.status === 'Lulus').length, total: siswaAkademik.length, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
          { label: 'Perlu Perbaikan', count: siswaAkademik.filter(s => s.status === 'Perbaikan').length, total: siswaAkademik.length, color: 'bg-yellow-400', textColor: 'text-yellow-600' },
          { label: 'Tidak Lulus', count: siswaAkademik.filter(s => s.status === 'Tidak Lulus').length, total: siswaAkademik.length, color: 'bg-red-400', textColor: 'text-red-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`text-xl font-bold ${s.textColor}`}>{s.count} siswa</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className={`${s.color} h-2 rounded-full`} style={{ width: `${(s.count / s.total) * 100}%` }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{Math.round((s.count / s.total) * 100)}%</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Detail Nilai Siswa</p>
          <div className="flex gap-3">
            <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs" value={filterBatch} onChange={e => setFilterBatch(e.target.value)}>
              {['Semua', 'Jan 2025', 'Feb 2025'].map(b => <option key={b}>{b}</option>)}
            </select>
            <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              {[['nilaiJepang', 'Urut: Bahasa'], ['nilaiKaiwa', 'Urut: Kaiwa'], ['kehadiran', 'Urut: Kehadiran']].map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Siswa</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bahasa 🈯</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kaiwa 🗣️</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Budaya 🎌</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Teknis ⚙️</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kehadiran</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rata-rata</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s, rank) => {
                const avg = Math.round((s.nilaiJepang + s.nilaiKaiwa + s.nilaiBudaya + s.nilaiTeknis) / 4);
                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {rank < 3 && <span className="text-sm">{['🥇', '🥈', '🥉'][rank]}</span>}
                        <div>
                          <p className="font-medium text-gray-800">{s.nama}</p>
                          <p className="text-xs text-gray-400">{s.batch} · {s.program}</p>
                        </div>
                      </div>
                    </td>
                    {[s.nilaiJepang, s.nilaiKaiwa, s.nilaiBudaya, s.nilaiTeknis].map((n, i) => (
                      <td key={i} className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className={`font-bold text-sm ${n >= 88 ? 'text-emerald-600' : n >= 75 ? 'text-blue-600' : 'text-red-500'}`}>{n}</span>
                          <span className="text-xs text-gray-400">{getRating(n)}</span>
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <span className={`font-medium text-sm ${s.kehadiran >= 90 ? 'text-emerald-600' : s.kehadiran >= 80 ? 'text-yellow-600' : 'text-red-500'}`}>{s.kehadiran}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${avg >= 88 ? 'text-emerald-600' : avg >= 78 ? 'text-blue-600' : 'text-red-500'}`}>{avg}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[s.status]}`}>{s.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}