import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'CERT-JLPT-N5', nama: 'JLPT N5', kategori: 'Bahasa Jepang', penyelenggara: 'The Japan Foundation / JEES', level: 'Pemula', validasi: 'Permanen', syaratProgram: ['Tokutei Ginou', 'Magang (Kenshusei)'], biayaTes: 1650000, frekuensi: '2x/tahun', relevan: 'Wajib minimal untuk Magang', status: 'Aktif' },
  { id: 2, kode: 'CERT-JLPT-N4', nama: 'JLPT N4', kategori: 'Bahasa Jepang', penyelenggara: 'The Japan Foundation / JEES', level: 'Dasar', validasi: 'Permanen', syaratProgram: ['Tokutei Ginou'], biayaTes: 1650000, frekuensi: '2x/tahun', relevan: 'Wajib untuk Tokutei Ginou', status: 'Aktif' },
  { id: 3, kode: 'CERT-JLPT-N3', nama: 'JLPT N3', kategori: 'Bahasa Jepang', penyelenggara: 'The Japan Foundation / JEES', level: 'Menengah', validasi: 'Permanen', syaratProgram: ['Tokutei Ginou 2'], biayaTes: 1650000, frekuensi: '2x/tahun', relevan: 'Direkomendasikan untuk TG premium', status: 'Aktif' },
  { id: 4, kode: 'CERT-NATTEST-4', nama: 'NAT-TEST Level 4', kategori: 'Bahasa Jepang', penyelenggara: 'NAT Co., Ltd Jepang', level: 'Dasar', validasi: 'Permanen', syaratProgram: ['Tokutei Ginou', 'Magang (Kenshusei)'], biayaTes: 1200000, frekuensi: '6x/tahun', relevan: 'Alternatif pengganti JLPT', status: 'Aktif' },
  { id: 5, kode: 'CERT-SSW-TG', nama: 'Tokutei Ginou Skills Test', kategori: 'Keahlian Teknis', penyelenggara: 'OTIT (Jepang) / AIC (Indonesia)', level: 'Teknis', validasi: '3 tahun', syaratProgram: ['Tokutei Ginou'], biayaTes: 700000, frekuensi: '4x/tahun', relevan: 'Wajib untuk Tokutei Ginou', status: 'Aktif' },
  { id: 6, kode: 'CERT-K3', nama: 'Sertifikat K3 Umum', kategori: 'Keselamatan Kerja', penyelenggara: 'Kemnaker RI', level: 'Dasar', validasi: '3 tahun', syaratProgram: ['Semua Program'], biayaTes: 500000, frekuensi: 'On-demand', relevan: 'Wajib semua program', status: 'Aktif' },
  { id: 7, kode: 'CERT-MCU', nama: 'Sertifikat Medical Check-Up', kategori: 'Kesehatan', penyelenggara: 'RS Mitra / Pemerintah', level: 'Standar', validasi: '1 tahun', syaratProgram: ['Semua Program'], biayaTes: 1000000, frekuensi: 'On-demand', relevan: 'Wajib sebelum keberangkatan', status: 'Aktif' },
  { id: 8, kode: 'CERT-KAIGO', nama: 'Kaigo Fukushishi (Sertifikat Kaigo)', kategori: 'Perawatan Lansia', penyelenggara: 'Social Welfare & Medical Service Corp Jepang', level: 'Profesional', validasi: 'Permanen', syaratProgram: ['Tokutei Ginou - Kaigo'], biayaTes: 3500000, frekuensi: '2x/tahun', relevan: 'Untuk program perawatan lansia TG', status: 'Aktif' },
];

const katColor = { 'Bahasa Jepang': 'bg-blue-100 text-blue-700', 'Keahlian Teknis': 'bg-green-100 text-green-700', 'Keselamatan Kerja': 'bg-red-100 text-red-700', 'Kesehatan': 'bg-pink-100 text-pink-700', 'Perawatan Lansia': 'bg-teal-100 text-teal-700' };
const levelIcon = { Pemula: '🌱', Dasar: '📘', Menengah: '📗', Teknis: '⚙️', Standar: '📋', Profesional: '🏆' };
function formatRp(v) { return 'Rp ' + v.toLocaleString('id-ID'); }

export default function SkillSertifikasi() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterKat, setFilterKat] = useState('Semua');

  const kategoriList = [...new Set(dummyData.map(d => d.kategori))];
  const filtered = dummyData.filter(d => {
    const matchS = d.nama.toLowerCase().includes(search.toLowerCase()) || d.kode.toLowerCase().includes(search.toLowerCase());
    const matchK = filterKat === 'Semua' || d.kategori === filterKat;
    return matchS && matchK;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Skill & Sertifikasi</h1>
          <p className="text-sm text-gray-500 mt-1">Daftar sertifikasi dan uji kompetensi yang diperlukan peserta</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Sertifikasi
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {['Total', ...kategoriList.slice(0, 4)].map((k, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{k === 'Total' ? 'Total Sertifikasi' : k}</p>
            <p className={`text-2xl font-bold mt-1 ${i === 0 ? 'text-blue-600' : 'text-gray-700'}`}>
              {k === 'Total' ? dummyData.length : dummyData.filter(d => d.kategori === k).length}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <input type="text" placeholder="Cari sertifikasi..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <select value={filterKat} onChange={e => setFilterKat(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Semua</option>
            {kategoriList.map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Sertifikasi</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Penyelenggara</th>
              <th className="px-4 py-3">Berlaku</th>
              <th className="px-4 py-3">Biaya Tes</th>
              <th className="px-4 py-3">Frekuensi</th>
              <th className="px-4 py-3">Relevansi</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800 text-sm">{row.nama}</p>
                  <p className="text-gray-400 text-xs font-mono">{row.kode}</p>
                </td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${katColor[row.kategori] || 'bg-gray-100 text-gray-600'}`}>{row.kategori}</span></td>
                <td className="px-4 py-3 text-xs text-gray-600">{levelIcon[row.level]} {row.level}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{row.penyelenggara}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{row.validasi}</td>
                <td className="px-4 py-3 text-xs font-medium text-gray-700">{formatRp(row.biayaTes)}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{row.frekuensi}</td>
                <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">{row.relevan}</td>
                <td className="px-4 py-3">
                  <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 text-xs mr-2">Edit</button>
                  <button className="text-red-400 text-xs">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Sertifikasi' : 'Tambah Sertifikasi'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode', 'kode'], ['Nama Sertifikasi', 'nama'], ['Penyelenggara', 'penyelenggara'], ['Masa Berlaku', 'validasi'], ['Frekuensi', 'frekuensi']].map(([l, k]) => (
                <div key={k} className={k === 'penyelenggara' ? 'col-span-2' : ''}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Kategori</label>
                <select defaultValue={selected?.kategori || 'Bahasa Jepang'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {kategoriList.map(k => <option key={k}>{k}</option>)}
                </select></div>
              <div><label className="text-xs text-gray-500 font-medium">Biaya Tes (Rp)</label>
                <input type="number" defaultValue={selected?.biayaTes || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div className="col-span-2"><label className="text-xs text-gray-500 font-medium">Relevansi / Keterangan</label>
                <textarea defaultValue={selected?.relevan || ''} rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
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