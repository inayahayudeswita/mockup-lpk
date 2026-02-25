import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'JP-TKY', nama: 'Tokyo', prefektur: 'Tokyo', region: 'Kantō', biayaHidup: 'Tinggi', iklim: 'Sedang', populasi: '14 Juta', deskripsi: 'Ibu kota Jepang, pusat bisnis dan teknologi terbesar', jumlahSiswa: 45, aktif: true },
  { id: 2, kode: 'JP-OSK', nama: 'Osaka', prefektur: 'Osaka', region: 'Kansai', biayaHidup: 'Sedang', iklim: 'Hangat', populasi: '2.7 Juta', deskripsi: 'Kota terbesar kedua, pusat kuliner dan perdagangan', jumlahSiswa: 38, aktif: true },
  { id: 3, kode: 'JP-NGY', nama: 'Nagoya', prefektur: 'Aichi', region: 'Chūbu', biayaHidup: 'Sedang', iklim: 'Sedang', populasi: '2.3 Juta', deskripsi: 'Pusat industri otomotif dan manufaktur', jumlahSiswa: 52, aktif: true },
  { id: 4, kode: 'JP-HRS', nama: 'Hiroshima', prefektur: 'Hiroshima', region: 'Chūgoku', biayaHidup: 'Rendah', iklim: 'Sejuk', populasi: '1.2 Juta', deskripsi: 'Kota bersejarah dengan industri manufaktur berkembang', jumlahSiswa: 22, aktif: true },
  { id: 5, kode: 'JP-SPR', nama: 'Sapporo', prefektur: 'Hokkaido', region: 'Hokkaidō', biayaHidup: 'Rendah', iklim: 'Dingin', populasi: '1.9 Juta', deskripsi: 'Pusat pertanian dan peternakan di Hokkaido', jumlahSiswa: 28, aktif: true },
  { id: 6, kode: 'JP-FKO', nama: 'Fukuoka', prefektur: 'Fukuoka', region: 'Kyūshū', biayaHidup: 'Rendah', iklim: 'Hangat', populasi: '1.6 Juta', deskripsi: 'Pintu gerbang ke Asia, kota yang ramah', jumlahSiswa: 30, aktif: true },
  { id: 7, kode: 'JP-KNW', nama: 'Kanagawa', prefektur: 'Kanagawa', region: 'Kantō', biayaHidup: 'Tinggi', iklim: 'Sedang', populasi: '9.2 Juta', deskripsi: 'Wilayah industri dan pelabuhan internasional Yokohama', jumlahSiswa: 18, aktif: true },
  { id: 8, kode: 'JP-NHT', nama: 'Niigata', prefektur: 'Niigata', region: 'Chūbu', biayaHidup: 'Rendah', iklim: 'Dingin', populasi: '790 Ribu', deskripsi: 'Pusat pertanian padi berkualitas tinggi', jumlahSiswa: 14, aktif: false },
];

const biayaColor = { Tinggi: 'bg-red-100 text-red-700', Sedang: 'bg-yellow-100 text-yellow-700', Rendah: 'bg-green-100 text-green-700' };
const iklimColor = { Dingin: 'bg-blue-100 text-blue-700', Sedang: 'bg-gray-100 text-gray-600', Sejuk: 'bg-teal-100 text-teal-700', Hangat: 'bg-orange-100 text-orange-700' };

export default function LokasiJepang() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterRegion, setFilterRegion] = useState('Semua');

  const regions = [...new Set(dummyData.map(d => d.region))];
  const filtered = dummyData.filter(d => {
    const matchS = d.nama.toLowerCase().includes(search.toLowerCase()) || d.prefektur.toLowerCase().includes(search.toLowerCase());
    const matchR = filterRegion === 'Semua' || d.region === filterRegion;
    return matchS && matchR;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lokasi Jepang</h1>
          <p className="text-sm text-gray-500 mt-1">Data kota dan wilayah penempatan kerja di Jepang</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Lokasi
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Lokasi</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Aktif</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{dummyData.filter(d => d.aktif).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Region</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{regions.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Siswa Ditempatkan</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{dummyData.reduce((a, b) => a + b.jumlahSiswa, 0)}</p>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <input type="text" placeholder="Cari kota atau prefektur..." value={search} onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300" />
        <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none">
          <option>Semua</option>
          {regions.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(row => (
          <div key={row.id} className={`bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition ${!row.aktif ? 'opacity-60' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-mono text-gray-400">{row.kode}</span>
                <h3 className="font-bold text-gray-800 text-lg">🗾 {row.nama}</h3>
                <p className="text-xs text-gray-500">Prefektur {row.prefektur} · Region {row.region}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.aktif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{row.aktif ? 'Aktif' : 'Nonaktif'}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{row.deskripsi}</p>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${biayaColor[row.biayaHidup]}`}>💰 Biaya: {row.biayaHidup}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${iklimColor[row.iklim]}`}>🌡 Iklim: {row.iklim}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-indigo-600 font-semibold">👥 {row.jumlahSiswa} siswa ditempatkan</span>
              <div className="flex gap-2">
                <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-xs text-blue-500 hover:text-blue-700">Edit</button>
                <button className="text-xs text-red-400 hover:text-red-600">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Lokasi' : 'Tambah Lokasi Jepang'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode', 'kode'], ['Nama Kota', 'nama'], ['Prefektur', 'prefektur'], ['Region', 'region'], ['Populasi', 'populasi']].map(([l, k]) => (
                <div key={k}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Biaya Hidup</label>
                <select defaultValue={selected?.biayaHidup || 'Sedang'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Rendah</option><option>Sedang</option><option>Tinggi</option>
                </select></div>
              <div><label className="text-xs text-gray-500 font-medium">Iklim</label>
                <select defaultValue={selected?.iklim || 'Sedang'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Dingin</option><option>Sejuk</option><option>Sedang</option><option>Hangat</option>
                </select></div>
            </div>
            <div className="mt-3"><label className="text-xs text-gray-500 font-medium">Deskripsi</label>
              <textarea defaultValue={selected?.deskripsi || ''} rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
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