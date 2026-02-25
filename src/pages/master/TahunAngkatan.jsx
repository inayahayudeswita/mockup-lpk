import React, { useState } from 'react';

const dummyData = [
  { id: 1, tahun: 2021, kode: 'TA-2021', totalBatch: 3, totalSiswa: 54, lulusSiswa: 54, penempatan: 48, status: 'Selesai', keterangan: 'Tahun pertama operasional LPK' },
  { id: 2, tahun: 2022, kode: 'TA-2022', totalBatch: 4, totalSiswa: 78, lulusSiswa: 75, penempatan: 69, status: 'Selesai', keterangan: 'Penambahan program Tokutei Ginou' },
  { id: 3, tahun: 2023, kode: 'TA-2023', totalBatch: 5, totalSiswa: 112, lulusSiswa: 108, penempatan: 102, status: 'Selesai', keterangan: 'Ekspansi ke cabang Surabaya & Bandung' },
  { id: 4, tahun: 2024, kode: 'TA-2024', totalBatch: 6, totalSiswa: 158, lulusSiswa: 143, penempatan: 132, status: 'Berjalan', keterangan: 'Target 200 siswa tercapai 79%' },
  { id: 5, tahun: 2025, kode: 'TA-2025', totalBatch: 3, totalSiswa: 86, lulusSiswa: 42, penempatan: 38, status: 'Berjalan', keterangan: 'Penambahan program Ikusei Shuro baru' },
  { id: 6, tahun: 2026, kode: 'TA-2026', totalBatch: 0, totalSiswa: 0, lulusSiswa: 0, penempatan: 0, status: 'Perencanaan', keterangan: 'Target 250 siswa - menunggu penyusunan batch' },
];

const statusColor = { 'Selesai': 'bg-gray-100 text-gray-600', 'Berjalan': 'bg-green-100 text-green-700', 'Perencanaan': 'bg-blue-100 text-blue-700' };

export default function TahunAngkatan() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tahun Angkatan</h1>
          <p className="text-sm text-gray-500 mt-1">Rekap data per tahun angkatan sejak LPK berdiri</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Tahun
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Tahun Operasional', value: dummyData.filter(d => d.status !== 'Perencanaan').length + ' tahun', color: 'text-blue-600' },
          { label: 'Total Siswa (All)', value: dummyData.reduce((a, b) => a + b.totalSiswa, 0), color: 'text-indigo-600' },
          { label: 'Total Penempatan', value: dummyData.reduce((a, b) => a + b.penempatan, 0), color: 'text-green-600' },
          { label: 'Rata-rata Penempatan/thn', value: Math.round(dummyData.filter(d => d.totalSiswa > 0).reduce((a, b) => a + b.penempatan, 0) / dummyData.filter(d => d.totalSiswa > 0).length), color: 'text-orange-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Timeline view */}
      <div className="space-y-4">
        {dummyData.map((row, idx) => {
          const penempPct = row.totalSiswa > 0 ? Math.round((row.penempatan / row.totalSiswa) * 100) : 0;
          const lulusPct = row.totalSiswa > 0 ? Math.round((row.lulusSiswa / row.totalSiswa) * 100) : 0;
          return (
            <div key={row.id} className={`bg-white rounded-xl shadow-sm border-l-4 border border-gray-100 p-5 ${row.status === 'Berjalan' ? 'border-l-green-500' : row.status === 'Perencanaan' ? 'border-l-blue-400' : 'border-l-gray-300'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="font-bold text-lg text-gray-700">{row.tahun}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-400">{row.kode}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[row.status]}`}>{row.status}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{row.keterangan}</p>
                  </div>
                </div>
                <div className="flex gap-8 text-center">
                  <div><p className="text-xs text-gray-400">Batch</p><p className="font-bold text-gray-700 text-lg">{row.totalBatch}</p></div>
                  <div><p className="text-xs text-gray-400">Total Siswa</p><p className="font-bold text-indigo-600 text-lg">{row.totalSiswa}</p></div>
                  <div><p className="text-xs text-gray-400">Lulus</p><p className="font-bold text-blue-600 text-lg">{row.lulusSiswa} <span className="text-xs font-normal text-gray-400">({lulusPct}%)</span></p></div>
                  <div><p className="text-xs text-gray-400">Ditempatkan</p><p className="font-bold text-green-600 text-lg">{row.penempatan} <span className="text-xs font-normal text-gray-400">({penempPct}%)</span></p></div>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 text-xs hover:text-blue-700">Edit</button>
                    <button className="text-red-400 text-xs hover:text-red-600">Hapus</button>
                  </div>
                </div>
              </div>
              {row.totalSiswa > 0 && (
                <div className="mt-2 flex gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">Tingkat Kelulusan ({lulusPct}%)</p>
                    <div className="bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${lulusPct}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">Tingkat Penempatan ({penempPct}%)</p>
                    <div className="bg-gray-100 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: `${penempPct}%` }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Tahun Angkatan' : 'Tambah Tahun Angkatan'}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-gray-500 font-medium">Tahun</label>
                  <input type="number" defaultValue={selected?.tahun || new Date().getFullYear()} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
                <div><label className="text-xs text-gray-500 font-medium">Kode</label>
                  <input defaultValue={selected?.kode || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              </div>
              <div><label className="text-xs text-gray-500 font-medium">Status</label>
                <select defaultValue={selected?.status || 'Perencanaan'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Perencanaan</option><option>Berjalan</option><option>Selesai</option>
                </select></div>
              <div><label className="text-xs text-gray-500 font-medium">Keterangan</label>
                <textarea defaultValue={selected?.keterangan || ''} rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}