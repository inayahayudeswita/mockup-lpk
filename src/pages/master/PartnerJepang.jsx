import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'PJ-001', nama: 'IM Japan (International Manpower Development Organization)', singkatan: 'IM Japan', tipe: 'Organisasi Pemerintah', negara: 'Jepang', kota: 'Tokyo', fokus: 'Semua bidang magang', website: 'www.imjapan.or.jp', kontak: 'Nakashima Taro', email: 'info@imjapan.or.jp', statusKerjasama: 'Aktif', tahunMulai: 2019, jumlahSiswa: 87 },
  { id: 2, kode: 'PJ-002', nama: 'JITCO (Japan International Trainee & Skilled Worker Cooperation)', singkatan: 'JITCO', tipe: 'Asosiasi Industri', negara: 'Jepang', kota: 'Tokyo', fokus: 'Konsultasi magang & TG', website: 'www.jitco.or.jp', kontak: 'Watanabe Keiko', email: 'support@jitco.or.jp', statusKerjasama: 'Aktif', tahunMulai: 2020, jumlahSiswa: 45 },
  { id: 3, kode: 'PJ-003', nama: 'Global Human Resource Development Corp', singkatan: 'GHRD Corp', tipe: 'Perusahaan Swasta', negara: 'Jepang', kota: 'Osaka', fokus: 'Manufaktur & Konstruksi', website: 'www.ghrd-corp.jp', kontak: 'Yamada Koji', email: 'yamada@ghrd-corp.jp', statusKerjasama: 'Aktif', tahunMulai: 2021, jumlahSiswa: 32 },
  { id: 4, kode: 'PJ-004', nama: 'Nippon Care Support Association', singkatan: 'NCSA', tipe: 'Yayasan', negara: 'Jepang', kota: 'Nagoya', fokus: 'Perawatan Lansia & Kesehatan', website: 'www.ncsa.jp', kontak: 'Ito Haruko', email: 'ito@ncsa.jp', statusKerjasama: 'Aktif', tahunMulai: 2022, jumlahSiswa: 24 },
  { id: 5, kode: 'PJ-005', nama: 'Hokkaido Agricultural Worker Network', singkatan: 'HAWN', tipe: 'Koperasi', negara: 'Jepang', kota: 'Sapporo', fokus: 'Pertanian & Peternakan', website: 'www.hawn-ag.jp', kontak: 'Sato Minoru', email: 'sato@hawn-ag.jp', statusKerjasama: 'Negosiasi', tahunMulai: 2024, jumlahSiswa: 0 },
];

const tipeColor = { 'Organisasi Pemerintah': 'bg-blue-100 text-blue-700', 'Asosiasi Industri': 'bg-purple-100 text-purple-700', 'Perusahaan Swasta': 'bg-green-100 text-green-700', 'Yayasan': 'bg-teal-100 text-teal-700', 'Koperasi': 'bg-orange-100 text-orange-700' };
const statusColor = { 'Aktif': 'bg-green-100 text-green-700', 'Negosiasi': 'bg-yellow-100 text-yellow-700', 'Tidak Aktif': 'bg-red-100 text-red-700' };

export default function PartnerJepang() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.fokus.toLowerCase().includes(search.toLowerCase()) ||
    d.kota.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Partner Jepang</h1>
          <p className="text-sm text-gray-500 mt-1">Daftar organisasi dan partner strategis di Jepang</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Partner
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Partner</p><p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Aktif</p><p className="text-2xl font-bold text-green-600 mt-1">{dummyData.filter(d => d.statusKerjasama === 'Aktif').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Negosiasi</p><p className="text-2xl font-bold text-yellow-600 mt-1">{dummyData.filter(d => d.statusKerjasama === 'Negosiasi').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Siswa</p><p className="text-2xl font-bold text-purple-600 mt-1">{dummyData.reduce((a, b) => a + b.jumlahSiswa, 0)}</p></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <input type="text" placeholder="Cari partner..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Kota</th>
              <th className="px-4 py-3">Fokus</th>
              <th className="px-4 py-3">Kontak</th>
              <th className="px-4 py-3">Sejak</th>
              <th className="px-4 py-3">Siswa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800 text-xs">{row.singkatan}</p>
                  <p className="text-gray-400 text-xs">{row.nama.length > 40 ? row.nama.substring(0, 40) + '...' : row.nama}</p>
                </td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${tipeColor[row.tipe]}`}>{row.tipe}</span></td>
                <td className="px-4 py-3 text-xs text-gray-600">🗾 {row.kota}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{row.fokus}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  <p>{row.kontak}</p>
                  <p className="text-gray-400">{row.email}</p>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{row.tahunMulai}</td>
                <td className="px-4 py-3 text-center"><span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-0.5 rounded-full">{row.jumlahSiswa}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[row.statusKerjasama]}`}>{row.statusKerjasama}</span></td>
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
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Partner' : 'Tambah Partner Jepang'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode', 'kode'], ['Singkatan', 'singkatan'], ['Nama Lengkap', 'nama'], ['Kota', 'kota'], ['Fokus', 'fokus'], ['Kontak', 'kontak'], ['Email', 'email'], ['Website', 'website']].map(([l, k]) => (
                <div key={k} className={k === 'nama' ? 'col-span-2' : ''}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Tipe</label>
                <select defaultValue={selected?.tipe || 'Perusahaan Swasta'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Organisasi Pemerintah</option><option>Asosiasi Industri</option><option>Perusahaan Swasta</option><option>Yayasan</option><option>Koperasi</option>
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