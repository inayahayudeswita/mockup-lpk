import React, { useState } from 'react';

const dummyData = [
  { id: 'SIS-0142', nama: 'Ahmad Fauzan Hidayat', foto: 'AF', batch: 'B-2024-02', program: 'Tokutei Ginou', tujuan: 'Nagoya, Aichi', perusahaan: 'Tanaka Seisakusho Co., Ltd', statusKeberangkatan: 'Menunggu Keberangkatan', tanggalBerangkat: '10 Feb 2025', tanggalTiba: '-', statusDiJepang: '-', kontrakMulai: '15 Feb 2025', kontrakSelesai: '15 Feb 2028' },
  { id: 'SIS-0147', nama: 'Mega Wulandari', foto: 'MW', batch: 'B-2024-01', program: 'Tokutei Ginou', tujuan: 'Nagoya, Aichi', perusahaan: 'Tanaka Seisakusho Co., Ltd', statusKeberangkatan: 'Sudah Berangkat', tanggalBerangkat: '10 Sep 2024', tanggalTiba: '10 Sep 2024', statusDiJepang: 'Bekerja Aktif', kontrakMulai: '15 Sep 2024', kontrakSelesai: '15 Sep 2027' },
  { id: 'SIS-0131', nama: 'Hendra Wijaya', foto: 'HW', batch: 'B-2023-03', program: 'Magang (Kenshusei)', tujuan: 'Osaka', perusahaan: 'Yamamura Kaigo Center', statusKeberangkatan: 'Sudah Berangkat', tanggalBerangkat: '15 Mar 2024', tanggalTiba: '15 Mar 2024', statusDiJepang: 'Bekerja Aktif', kontrakMulai: '20 Mar 2024', kontrakSelesai: '20 Mar 2027' },
  { id: 'SIS-0110', nama: 'Rina Lestari', foto: 'RL', batch: 'B-2023-01', program: 'Tokutei Ginou', tujuan: 'Sapporo, Hokkaido', perusahaan: 'Sakura Nouji Kumiai', statusKeberangkatan: 'Sudah Berangkat', tanggalBerangkat: '01 Jun 2023', tanggalTiba: '01 Jun 2023', statusDiJepang: 'Kontrak Berakhir', kontrakMulai: '05 Jun 2023', kontrakSelesai: '05 Jun 2024' },
  { id: 'SIS-0098', nama: 'Anton Susilo', foto: 'AS', batch: 'B-2022-02', program: 'Magang (Kenshusei)', tujuan: 'Tokyo', perusahaan: 'Global Human Resource Corp', statusKeberangkatan: 'Sudah Berangkat', tanggalBerangkat: '20 Jan 2023', tanggalTiba: '20 Jan 2023', statusDiJepang: 'Terminasi Awal', kontrakMulai: '25 Jan 2023', kontrakSelesai: '25 Jan 2026' },
];

const statusColor = {
  'Menunggu Keberangkatan': 'bg-yellow-100 text-yellow-700',
  'Sudah Berangkat': 'bg-green-100 text-green-700',
  'Batal': 'bg-red-100 text-red-700',
};
const diJepangColor = {
  'Bekerja Aktif': 'bg-green-100 text-green-700',
  'Kontrak Berakhir': 'bg-gray-100 text-gray-600',
  'Terminasi Awal': 'bg-red-100 text-red-700',
  '-': 'bg-gray-100 text-gray-400',
};
const avatarColors = ['bg-blue-500', 'bg-orange-500', 'bg-teal-500', 'bg-pink-500', 'bg-indigo-500'];

export default function StatusKeberangkatan() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = dummyData.filter(d => {
    const matchQ = d.nama.toLowerCase().includes(search.toLowerCase()) || d.tujuan.toLowerCase().includes(search.toLowerCase());
    const matchS = filterStatus === 'Semua' || d.statusKeberangkatan === filterStatus || d.statusDiJepang === filterStatus;
    return matchQ && matchS;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Status Keberangkatan</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau status keberangkatan dan kondisi siswa di Jepang</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">↓ Export</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Menunggu Berangkat', value: dummyData.filter(d => d.statusKeberangkatan === 'Menunggu Keberangkatan').length, color: 'text-yellow-600', border: 'border-l-yellow-400' },
          { label: 'Sudah Berangkat', value: dummyData.filter(d => d.statusKeberangkatan === 'Sudah Berangkat').length, color: 'text-green-600', border: 'border-l-green-500' },
          { label: 'Bekerja Aktif di Jepang', value: dummyData.filter(d => d.statusDiJepang === 'Bekerja Aktif').length, color: 'text-blue-600', border: 'border-l-blue-500' },
          { label: 'Terminasi / Bermasalah', value: dummyData.filter(d => d.statusDiJepang === 'Terminasi Awal').length, color: 'text-red-600', border: 'border-l-red-400' },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 border-l-4 ${s.border}`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="Cari siswa atau kota..." value={search} onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
          <option>Semua</option>
          <option>Menunggu Keberangkatan</option>
          <option>Bekerja Aktif</option>
          <option>Terminasi Awal</option>
          <option>Kontrak Berakhir</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Siswa</th>
              <th className="px-4 py-3">Program / Batch</th>
              <th className="px-4 py-3">Tujuan & Perusahaan</th>
              <th className="px-4 py-3">Tgl. Berangkat</th>
              <th className="px-4 py-3">Status Keberangkatan</th>
              <th className="px-4 py-3">Status di Jepang</th>
              <th className="px-4 py-3">Kontrak</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{row.foto}</div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs">{row.nama}</p>
                      <p className="text-gray-400 text-xs">{row.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">
                  <p>{row.program}</p>
                  <p className="text-gray-400">{row.batch}</p>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">
                  <p className="font-medium">🗾 {row.tujuan}</p>
                  <p className="text-gray-400">{row.perusahaan}</p>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">{row.tanggalBerangkat}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[row.statusKeberangkatan]}`}>{row.statusKeberangkatan}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diJepangColor[row.statusDiJepang]}`}>{row.statusDiJepang}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {row.kontrakMulai !== '-' ? (
                    <div><p>{row.kontrakMulai}</p><p className="text-gray-400">s/d {row.kontrakSelesai}</p></div>
                  ) : <span className="text-gray-300">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-xs text-gray-400">Menampilkan {filtered.length} dari {dummyData.length} data</div>
      </div>
    </div>
  );
}