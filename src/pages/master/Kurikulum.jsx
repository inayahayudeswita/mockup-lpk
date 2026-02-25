import React, { useState } from 'react';

const dummyData = [
  {
    id: 1, kode: 'KUR-TG-01', nama: 'Kurikulum Tokutei Ginou - Pertanian', program: 'Tokutei Ginou', bidang: 'Pertanian & Perkebunan',
    durasi: 12, totalJam: 960, versi: 'v2.1', status: 'Aktif',
    mataPelajaran: [
      { nama: 'Bahasa Jepang N4', jam: 360, kategori: 'Bahasa' },
      { nama: 'Budaya & Etika Kerja Jepang', jam: 120, kategori: 'Budaya' },
      { nama: 'Teknis Pertanian Jepang', jam: 240, kategori: 'Teknis' },
      { nama: 'Keselamatan Kerja (K3)', jam: 80, kategori: 'Safety' },
      { nama: 'Fisika & Kesehatan', jam: 80, kategori: 'Kesehatan' },
      { nama: 'Magang & Praktik Lapangan', jam: 80, kategori: 'Praktik' },
    ]
  },
  {
    id: 2, kode: 'KUR-MFG-01', nama: 'Kurikulum Magang - Manufaktur', program: 'Magang (Kenshusei)', bidang: 'Manufaktur & Produksi',
    durasi: 10, totalJam: 800, versi: 'v3.0', status: 'Aktif',
    mataPelajaran: [
      { nama: 'Bahasa Jepang N5-N4', jam: 320, kategori: 'Bahasa' },
      { nama: 'Budaya & Etika Kerja', jam: 100, kategori: 'Budaya' },
      { nama: 'Teknik Manufaktur & Produksi', jam: 200, kategori: 'Teknis' },
      { nama: 'Keselamatan Kerja', jam: 100, kategori: 'Safety' },
      { nama: 'Simulasi Kerja', jam: 80, kategori: 'Praktik' },
    ]
  },
  {
    id: 3, kode: 'KUR-NS-01', nama: 'Kurikulum Magang - Perawatan Lansia', program: 'Magang (Kenshusei)', bidang: 'Perawatan Lansia & Kesehatan',
    durasi: 12, totalJam: 1040, versi: 'v2.0', status: 'Aktif',
    mataPelajaran: [
      { nama: 'Bahasa Jepang Medis N4', jam: 400, kategori: 'Bahasa' },
      { nama: 'Etika Keperawatan Jepang', jam: 120, kategori: 'Budaya' },
      { nama: 'Teknik Perawatan Lansia', jam: 300, kategori: 'Teknis' },
      { nama: 'Pertolongan Pertama', jam: 120, kategori: 'Safety' },
      { nama: 'Praktik Klinik', jam: 100, kategori: 'Praktik' },
    ]
  },
];

const kategoriColor = { Bahasa: 'bg-blue-100 text-blue-700', Budaya: 'bg-yellow-100 text-yellow-700', Teknis: 'bg-green-100 text-green-700', Safety: 'bg-red-100 text-red-700', Praktik: 'bg-purple-100 text-purple-700', Kesehatan: 'bg-pink-100 text-pink-700' };

export default function Kurikulum() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) || d.program.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kurikulum</h1>
          <p className="text-sm text-gray-500 mt-1">Susunan mata pelajaran dan jam pelatihan untuk setiap program</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Kurikulum
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Kurikulum</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Rata-rata Durasi</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{Math.round(dummyData.reduce((a, b) => a + b.durasi, 0) / dummyData.length)} bln</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Rata-rata Jam Pelatihan</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{Math.round(dummyData.reduce((a, b) => a + b.totalJam, 0) / dummyData.length)} jam</p>
        </div>
      </div>

      <div className="mb-4">
        <input type="text" placeholder="Cari kurikulum..." value={search} onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300" />
      </div>

      <div className="space-y-4">
        {filtered.map(row => (
          <div key={row.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => setExpanded(expanded === row.id ? null : row.id)}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">📚</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400">{row.kode}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${row.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{row.status}</span>
                    <span className="text-xs text-gray-400">{row.versi}</span>
                  </div>
                  <p className="font-semibold text-gray-800">{row.nama}</p>
                  <p className="text-xs text-gray-500">{row.program} · {row.bidang}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right">
                <div>
                  <p className="text-xs text-gray-400">Durasi</p>
                  <p className="font-semibold text-gray-700">{row.durasi} bulan</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Jam</p>
                  <p className="font-semibold text-blue-600">{row.totalJam} jam</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={e => { e.stopPropagation(); setSelected(row); setShowModal(true); }} className="text-blue-500 text-xs hover:text-blue-700">Edit</button>
                  <button onClick={e => e.stopPropagation()} className="text-red-400 text-xs hover:text-red-600">Hapus</button>
                </div>
                <span className="text-gray-400 ml-2">{expanded === row.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expanded === row.id && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-600 mb-3">MATA PELAJARAN</p>
                <div className="grid grid-cols-3 gap-3">
                  {row.mataPelajaran.map((mp, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${kategoriColor[mp.kategori] || 'bg-gray-100 text-gray-600'}`}>{mp.kategori}</span>
                        <span className="font-semibold text-blue-600 text-sm">{mp.jam} jam</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mt-1">{mp.nama}</p>
                      <div className="mt-2 bg-gray-100 rounded-full h-1.5">
                        <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${(mp.jam / row.totalJam) * 100}%` }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{Math.round((mp.jam / row.totalJam) * 100)}% dari total</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Kurikulum' : 'Tambah Kurikulum'}</h2>
            <div className="space-y-3">
              {[['Kode', 'kode'], ['Nama Kurikulum', 'nama'], ['Bidang', 'bidang']].map(([l, k]) => (
                <div key={k}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-gray-500 font-medium">Durasi (bulan)</label>
                  <input type="number" defaultValue={selected?.durasi || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
                <div><label className="text-xs text-gray-500 font-medium">Total Jam</label>
                  <input type="number" defaultValue={selected?.totalJam || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              </div>
              <div><label className="text-xs text-gray-500 font-medium">Program</label>
                <select defaultValue={selected?.program || 'Tokutei Ginou'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Tokutei Ginou</option><option>Magang (Kenshusei)</option>
                </select></div>
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