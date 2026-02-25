import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'PRG-TG', nama: 'Tokutei Ginou (Specified Skilled Worker)', singkatan: 'TG / SSW', regulasi: 'Undang-Undang Imigrasi Jepang No.1 2019', tipe: 'Bekerja', visa: 'Tokutei Ginou 1 & 2', durasi: '5 tahun (dapat diperpanjang)', usia: '18-39 tahun', syaratBahasa: 'JLPT N4 / NAT-TEST 4', jumlahBatch: 8, jumlahSiswa: 189, status: 'Aktif' },
  { id: 2, kode: 'PRG-MG', nama: 'Magang Kenshusei (Technical Intern Training)', singkatan: 'Kenshusei', regulasi: 'TITP (Technical Intern Training Program) - Jepang', tipe: 'Magang', visa: 'Visa Magang Teknis', durasi: '3 tahun (bisa diperpanjang 5 tahun)', usia: '18-35 tahun', syaratBahasa: 'JLPT N5-N4', jumlahBatch: 5, jumlahSiswa: 112, status: 'Aktif' },
  { id: 3, kode: 'PRG-IKT', nama: 'Ikusei Shuro (育成就労)', singkatan: 'Ikusei', regulasi: 'Regulasi Baru Jepang 2024 (Pengganti TITP)', tipe: 'Bekerja', visa: 'Visa Ikusei Shuro', durasi: '3 tahun awal', usia: '18-40 tahun', syaratBahasa: 'JLPT N5 (min)', jumlahBatch: 1, jumlahSiswa: 15, status: 'Baru' },
];

const tipeColor = { 'Bekerja': 'bg-green-100 text-green-700', 'Magang': 'bg-blue-100 text-blue-700' };
const statusColor = { 'Aktif': 'bg-green-100 text-green-700', 'Baru': 'bg-purple-100 text-purple-700', 'Tidak Aktif': 'bg-gray-100 text-gray-500' };

export default function Program() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Program</h1>
          <p className="text-sm text-gray-500 mt-1">Jenis program pengiriman tenaga kerja Indonesia ke Jepang</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Program
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {dummyData.map(row => (
          <div key={row.id} className={`bg-white rounded-2xl shadow-sm border-2 p-6 hover:shadow-lg transition ${row.status === 'Baru' ? 'border-purple-300' : 'border-gray-100'}`}>
            {row.status === 'Baru' && (
              <div className="mb-3"><span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">🆕 Program Baru 2024</span></div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-mono text-xs text-gray-400">{row.kode}</span>
                <h3 className="font-bold text-gray-800 text-base mt-1">{row.nama}</h3>
                <p className="text-xs text-gray-400">({row.singkatan})</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipeColor[row.tipe]}`}>{row.tipe}</span>
            </div>

            <div className="space-y-2 text-xs text-gray-600 mb-4">
              <div className="flex gap-2"><span className="text-gray-400 w-28 flex-shrink-0">📋 Regulasi</span><span>{row.regulasi}</span></div>
              <div className="flex gap-2"><span className="text-gray-400 w-28 flex-shrink-0">🪪 Visa</span><span>{row.visa}</span></div>
              <div className="flex gap-2"><span className="text-gray-400 w-28 flex-shrink-0">⏱ Durasi</span><span>{row.durasi}</span></div>
              <div className="flex gap-2"><span className="text-gray-400 w-28 flex-shrink-0">👤 Usia</span><span>{row.usia}</span></div>
              <div className="flex gap-2"><span className="text-gray-400 w-28 flex-shrink-0">🗣 Bahasa</span><span>{row.syaratBahasa}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                <p className="text-xl font-bold text-blue-600">{row.jumlahBatch}</p>
                <p className="text-xs text-gray-500">Batch</p>
              </div>
              <div className="bg-green-50 rounded-lg p-2.5 text-center">
                <p className="text-xl font-bold text-green-600">{row.jumlahSiswa}</p>
                <p className="text-xs text-gray-500">Siswa</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[row.status]}`}>{row.status}</span>
              <div className="flex gap-2">
                <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 text-xs hover:text-blue-700">Edit</button>
                <button className="text-red-400 text-xs hover:text-red-600">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Program' : 'Tambah Program'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode', 'kode'], ['Singkatan', 'singkatan'], ['Nama Program', 'nama'], ['Regulasi', 'regulasi'], ['Jenis Visa', 'visa'], ['Durasi', 'durasi'], ['Usia', 'usia'], ['Syarat Bahasa', 'syaratBahasa']].map(([l, k]) => (
                <div key={k} className={['nama', 'regulasi'].includes(k) ? 'col-span-2' : ''}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Tipe</label>
                <select defaultValue={selected?.tipe || 'Bekerja'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Bekerja</option><option>Magang</option>
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