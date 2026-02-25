import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'CC-OPS', nama: 'Operasional Pusat', tipe: 'Departemen', cabang: 'Pusat', anggaran: 500000000, realisasi: 312000000, status: 'Aktif' },
  { id: 2, kode: 'CC-TRAI', nama: 'Pelatihan & Pendidikan', tipe: 'Departemen', cabang: 'Pusat', anggaran: 800000000, realisasi: 590000000, status: 'Aktif' },
  { id: 3, kode: 'CC-HR', nama: 'Sumber Daya Manusia', tipe: 'Departemen', cabang: 'Pusat', anggaran: 350000000, realisasi: 198000000, status: 'Aktif' },
  { id: 4, kode: 'CC-MKT', nama: 'Marketing & Promosi', tipe: 'Departemen', cabang: 'Pusat', anggaran: 200000000, realisasi: 175000000, status: 'Aktif' },
  { id: 5, kode: 'CC-JKT', nama: 'Operasional Cabang Jakarta', tipe: 'Cabang', cabang: 'Jakarta', anggaran: 450000000, realisasi: 280000000, status: 'Aktif' },
  { id: 6, kode: 'CC-SBY', nama: 'Operasional Cabang Surabaya', tipe: 'Cabang', cabang: 'Surabaya', anggaran: 300000000, realisasi: 198000000, status: 'Aktif' },
  { id: 7, kode: 'CC-BDG', nama: 'Operasional Cabang Bandung', tipe: 'Cabang', cabang: 'Bandung', anggaran: 250000000, realisasi: 167000000, status: 'Aktif' },
  { id: 8, kode: 'CC-IT', nama: 'Teknologi Informasi', tipe: 'Departemen', cabang: 'Pusat', anggaran: 180000000, realisasi: 95000000, status: 'Aktif' },
];

function formatRp(val) { return 'Rp ' + (val / 1000000).toFixed(0) + ' Jt'; }
function pct(r, a) { return Math.min(100, Math.round((r / a) * 100)); }

export default function CostCenter() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) || d.kode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cost Center</h1>
          <p className="text-sm text-gray-500 mt-1">Pusat biaya untuk alokasi anggaran dan realisasi</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Cost Center
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Anggaran</p>
          <p className="text-xl font-bold text-blue-600 mt-1">Rp {(dummyData.reduce((a, b) => a + b.anggaran, 0) / 1000000000).toFixed(2)} M</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Realisasi</p>
          <p className="text-xl font-bold text-orange-600 mt-1">Rp {(dummyData.reduce((a, b) => a + b.realisasi, 0) / 1000000000).toFixed(2)} M</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Rata-rata Penyerapan</p>
          <p className="text-xl font-bold text-green-600 mt-1">{Math.round(dummyData.reduce((a, b) => a + pct(b.realisasi, b.anggaran), 0) / dummyData.length)}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <input type="text" placeholder="Cari cost center..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Nama Cost Center</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Cabang</th>
              <th className="px-4 py-3">Anggaran</th>
              <th className="px-4 py-3">Realisasi & Penyerapan</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => {
              const p = pct(row.realisasi, row.anggaran);
              const barColor = p >= 90 ? 'bg-red-400' : p >= 70 ? 'bg-yellow-400' : 'bg-green-400';
              return (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.kode}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{row.nama}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${row.tipe === 'Departemen' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{row.tipe}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{row.cabang}</td>
                  <td className="px-4 py-3 text-gray-700 font-mono text-xs">{formatRp(row.anggaran)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${p}%` }} />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-16 text-right">{formatRp(row.realisasi)} ({p}%)</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 hover:text-blue-700 text-xs mr-2">Edit</button>
                    <button className="text-red-400 hover:text-red-600 text-xs">Hapus</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Cost Center' : 'Tambah Cost Center'}</h2>
            <div className="space-y-3">
              {[['Kode', 'kode'], ['Nama Cost Center', 'nama'], ['Cabang', 'cabang']].map(([l, k]) => (
                <div key={k}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Tipe</label>
                <select defaultValue={selected?.tipe || 'Departemen'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Departemen</option><option>Cabang</option><option>Proyek</option>
                </select></div>
              <div><label className="text-xs text-gray-500 font-medium">Anggaran (Rp)</label>
                <input type="number" defaultValue={selected?.anggaran || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
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