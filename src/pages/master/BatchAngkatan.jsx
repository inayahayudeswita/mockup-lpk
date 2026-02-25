import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'B-2024-01', nama: 'Batch Januari 2024', tahun: '2024', program: 'Tokutei Ginou - Pertanian', jumlahSiswa: 24, status: 'Selesai', mulai: '2024-01-15', selesai: '2024-07-15' },
  { id: 2, kode: 'B-2024-02', nama: 'Batch Maret 2024', tahun: '2024', program: 'Tokutei Ginou - Perikanan', jumlahSiswa: 18, status: 'Selesai', mulai: '2024-03-01', selesai: '2024-09-01' },
  { id: 3, kode: 'B-2024-03', nama: 'Batch Juni 2024', tahun: '2024', program: 'Magang - Manufaktur', jumlahSiswa: 30, status: 'Berjalan', mulai: '2024-06-10', selesai: '2024-12-10' },
  { id: 4, kode: 'B-2024-04', nama: 'Batch September 2024', tahun: '2024', program: 'Tokutei Ginou - Konstruksi', jumlahSiswa: 22, status: 'Berjalan', mulai: '2024-09-01', selesai: '2025-03-01' },
  { id: 5, kode: 'B-2025-01', nama: 'Batch Januari 2025', tahun: '2025', program: 'Magang - Perawatan Lansia', jumlahSiswa: 15, status: 'Berjalan', mulai: '2025-01-20', selesai: '2025-07-20' },
  { id: 6, kode: 'B-2025-02', nama: 'Batch Maret 2025', tahun: '2025', program: 'Tokutei Ginou - Makanan & Minuman', jumlahSiswa: 27, status: 'Pendaftaran', mulai: '2025-03-15', selesai: '2025-09-15' },
];

const statusColor = {
  'Selesai': 'bg-gray-100 text-gray-600',
  'Berjalan': 'bg-green-100 text-green-700',
  'Pendaftaran': 'bg-blue-100 text-blue-700',
};

export default function BatchAngkatan() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.kode.toLowerCase().includes(search.toLowerCase()) ||
    d.program.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Batch / Angkatan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data batch dan angkatan pelatihan</p>
        </div>
        <button
          onClick={() => { setSelected(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
        >
          <span>+</span> Tambah Batch
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Batch', value: dummyData.length, color: 'text-blue-600' },
          { label: 'Sedang Berjalan', value: dummyData.filter(d => d.status === 'Berjalan').length, color: 'text-green-600' },
          { label: 'Selesai', value: dummyData.filter(d => d.status === 'Selesai').length, color: 'text-gray-600' },
          { label: 'Total Siswa', value: dummyData.reduce((a, b) => a + b.jumlahSiswa, 0), color: 'text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Cari batch, program..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Semua Status</option>
            <option>Berjalan</option>
            <option>Selesai</option>
            <option>Pendaftaran</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Nama Batch</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Periode</th>
              <th className="px-4 py-3">Siswa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id} className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.kode}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{row.nama}</td>
                <td className="px-4 py-3 text-gray-600">{row.program}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{row.mulai} — {row.selesai}</td>
                <td className="px-4 py-3">
                  <span className="bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full text-xs">{row.jumlahSiswa} siswa</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[row.status]}`}>{row.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 hover:text-blue-700 text-xs">Edit</button>
                    <button className="text-red-400 hover:text-red-600 text-xs">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-xs text-gray-400 flex justify-between">
          <span>Menampilkan {filtered.length} dari {dummyData.length} data</span>
          <div className="flex gap-2">
            <button className="px-2 py-1 border rounded text-gray-500">‹</button>
            <button className="px-2 py-1 border rounded bg-blue-600 text-white">1</button>
            <button className="px-2 py-1 border rounded text-gray-500">›</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Batch' : 'Tambah Batch Baru'}</h2>
            <div className="space-y-3">
              {[['Kode Batch', 'kode', 'B-2025-03'], ['Nama Batch', 'nama', 'Batch Juli 2025'], ['Program', 'program', 'Tokutei Ginou - Konstruksi']].map(([label, key, ph]) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 font-medium">{label}</label>
                  <input defaultValue={selected?.[key] || ''} placeholder={ph} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium">Tanggal Mulai</label>
                  <input type="date" defaultValue={selected?.mulai || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Tanggal Selesai</label>
                  <input type="date" defaultValue={selected?.selesai || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Status</label>
                <select defaultValue={selected?.status || 'Pendaftaran'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Pendaftaran</option><option>Berjalan</option><option>Selesai</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}