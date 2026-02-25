import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'PP-TG-BJN', nama: 'Pelatihan Bahasa Jepang Intensif N4', program: 'Tokutei Ginou', kategori: 'Bahasa', durasi: 6, jamPerminggu: 40, instruktur: 'Hiroshi Tanaka', maxPeserta: 20, biaya: 8500000, materi: ['Hiragana & Katakana', 'Kanji Dasar N5-N4', 'Tata Bahasa N4', 'Percakapan Sehari-hari', 'Bahasa Kerja'], status: 'Aktif' },
  { id: 2, kode: 'PP-TG-TCN', nama: 'Pelatihan Teknis Pertanian Jepang', program: 'Tokutei Ginou', kategori: 'Teknis', durasi: 3, jamPerminggu: 30, instruktur: 'Yanti Nugroho, S.P', maxPeserta: 15, biaya: 4500000, materi: ['Pengenalan Sistem Pertanian Jepang', 'Pengoperasian Alat Pertanian', 'Standar Kualitas Produk', 'K3 Pertanian'], status: 'Aktif' },
  { id: 3, kode: 'PP-MG-BJN', nama: 'Pelatihan Bahasa Jepang Magang N5-N4', program: 'Magang (Kenshusei)', kategori: 'Bahasa', durasi: 5, jamPerminggu: 35, instruktur: 'Rina Kusuma, S.Pd', maxPeserta: 25, biaya: 7000000, materi: ['Hiragana & Katakana', 'Kosa Kata Pabrik', 'Instruksi Kerja', 'Keselamatan Kerja'], status: 'Aktif' },
  { id: 4, kode: 'PP-MG-MFG', nama: 'Pelatihan Teknis Manufaktur', program: 'Magang (Kenshusei)', kategori: 'Teknis', durasi: 2, jamPerminggu: 45, instruktur: 'Dwi Prasetyo, S.T', maxPeserta: 20, biaya: 3500000, materi: ['Pengenalan Mesin Produksi', 'Quality Control Dasar', 'Penggunaan Alat Ukur', 'SOP Manufaktur'], status: 'Aktif' },
  { id: 5, kode: 'PP-ALL-BDY', nama: 'Pelatihan Budaya & Etika Kerja Jepang', program: 'Semua Program', kategori: 'Budaya', durasi: 1, jamPerminggu: 20, instruktur: 'Budi Hartono', maxPeserta: 30, biaya: 1500000, materi: ['Etika dan Sopan Santun', 'Etos Kerja Jepang (Kaizen)', 'Kebiasaan Sehari-hari', 'Aturan Tinggal di Jepang'], status: 'Aktif' },
];

function formatRp(v) { return 'Rp ' + v.toLocaleString('id-ID'); }

export default function ProgramPelatihan() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) || d.program.toLowerCase().includes(search.toLowerCase())
  );

  const katColor = { Bahasa: 'bg-blue-100 text-blue-700', Teknis: 'bg-green-100 text-green-700', Budaya: 'bg-yellow-100 text-yellow-700' };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Program Pelatihan</h1>
          <p className="text-sm text-gray-500 mt-1">Modul dan program pelatihan yang tersedia di LPK SIMPEL</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Program Pelatihan
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Program</p><p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Bahasa</p><p className="text-2xl font-bold text-blue-500 mt-1">{dummyData.filter(d => d.kategori === 'Bahasa').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Teknis</p><p className="text-2xl font-bold text-green-600 mt-1">{dummyData.filter(d => d.kategori === 'Teknis').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Budaya</p><p className="text-2xl font-bold text-yellow-600 mt-1">{dummyData.filter(d => d.kategori === 'Budaya').length}</p></div>
      </div>

      <div className="mb-4">
        <input type="text" placeholder="Cari program pelatihan..." value={search} onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300" />
      </div>

      <div className="space-y-3">
        {filtered.map(row => (
          <div key={row.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => setExpanded(expanded === row.id ? null : row.id)}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">
                  {row.kategori === 'Bahasa' ? '🗣' : row.kategori === 'Teknis' ? '⚙️' : '🎌'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400">{row.kode}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${katColor[row.kategori]}`}>{row.kategori}</span>
                  </div>
                  <p className="font-semibold text-gray-800">{row.nama}</p>
                  <p className="text-xs text-gray-500">{row.program} · {row.instruktur}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right">
                <div><p className="text-xs text-gray-400">Durasi</p><p className="font-semibold text-gray-700">{row.durasi} bulan</p></div>
                <div><p className="text-xs text-gray-400">Kapasitas</p><p className="font-semibold text-gray-700">{row.maxPeserta} orang</p></div>
                <div><p className="text-xs text-gray-400">Biaya</p><p className="font-semibold text-blue-600">{formatRp(row.biaya)}</p></div>
                <div className="flex gap-2 ml-4">
                  <button onClick={e => { e.stopPropagation(); setSelected(row); setShowModal(true); }} className="text-blue-500 text-xs">Edit</button>
                  <button onClick={e => e.stopPropagation()} className="text-red-400 text-xs">Hapus</button>
                </div>
                <span className="text-gray-400">{expanded === row.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {expanded === row.id && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-600 mb-2">MATERI PELATIHAN</p>
                <div className="flex gap-2 flex-wrap">
                  {row.materi.map((m, i) => (
                    <span key={i} className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full">✓ {m}</span>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-xs text-gray-500">
                  <span>⏰ {row.jamPerminggu} jam/minggu</span>
                  <span>👥 Maks. {row.maxPeserta} peserta</span>
                  <span>💰 {formatRp(row.biaya)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Program Pelatihan' : 'Tambah Program Pelatihan'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode', 'kode'], ['Nama Program', 'nama'], ['Instruktur', 'instruktur'], ['Program', 'program']].map(([l, k]) => (
                <div key={k} className={k === 'nama' ? 'col-span-2' : ''}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Kategori</label>
                <select defaultValue={selected?.kategori || 'Bahasa'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Bahasa</option><option>Teknis</option><option>Budaya</option>
                </select></div>
              <div><label className="text-xs text-gray-500 font-medium">Durasi (bulan)</label>
                <input type="number" defaultValue={selected?.durasi || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Kapasitas</label>
                <input type="number" defaultValue={selected?.maxPeserta || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Biaya (Rp)</label>
                <input type="number" defaultValue={selected?.biaya || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
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