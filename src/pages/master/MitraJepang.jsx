import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'MJ-001', nama: 'Sakura Nouji Kumiai', jenis: 'Kumiai', wilayah: 'Hokkaido', bidang: 'Pertanian & Peternakan', kontak: 'Yamamoto Kenji', email: 'yamamoto@sakura-nouji.jp', telp: '+81-11-123-4567', statusMOU: 'Aktif', tanggalMOU: '2023-04-01', expiredMOU: '2026-03-31', jumlahSiswa: 24 },
  { id: 2, kode: 'MJ-002', nama: 'Tanaka Seisakusho Co., Ltd', jenis: 'Perusahaan', wilayah: 'Aichi', bidang: 'Manufaktur - Mesin', kontak: 'Tanaka Hiroshi', email: 'hr@tanaka-ss.co.jp', telp: '+81-52-987-6543', statusMOU: 'Aktif', tanggalMOU: '2022-10-01', expiredMOU: '2025-09-30', jumlahSiswa: 18 },
  { id: 3, kode: 'MJ-003', nama: 'Yamamura Kaigo Center', jenis: 'Yayasan', wilayah: 'Osaka', bidang: 'Perawatan Lansia', kontak: 'Yamamura Akiko', email: 'info@yamamura-kaigo.jp', telp: '+81-6-2222-3333', statusMOU: 'Aktif', tanggalMOU: '2024-01-15', expiredMOU: '2027-01-14', jumlahSiswa: 12 },
  { id: 4, kode: 'MJ-004', nama: 'Suzuki Fisheries Corp', jenis: 'Perusahaan', wilayah: 'Miyagi', bidang: 'Perikanan & Kelautan', kontak: 'Suzuki Masato', email: 'suzuki@sf-corp.jp', telp: '+81-22-345-6789', statusMOU: 'Proses Perpanjangan', tanggalMOU: '2021-06-01', expiredMOU: '2024-05-31', jumlahSiswa: 8 },
  { id: 5, kode: 'MJ-005', nama: 'Kobe Steel Construction', jenis: 'Perusahaan', wilayah: 'Hyogo', bidang: 'Konstruksi', kontak: 'Ito Ryuichi', email: 'ito@kobeconstruct.jp', telp: '+81-78-456-7890', statusMOU: 'Aktif', tanggalMOU: '2023-07-20', expiredMOU: '2026-07-19', jumlahSiswa: 20 },
  { id: 6, kode: 'MJ-006', nama: 'Kyushu Niku Processing', jenis: 'Perusahaan', wilayah: 'Fukuoka', bidang: 'Makanan & Minuman', kontak: 'Nakamura Jun', email: 'nakamura@kyushu-niku.co.jp', telp: '+81-92-567-8901', statusMOU: 'Tidak Aktif', tanggalMOU: '2020-04-01', expiredMOU: '2023-03-31', jumlahSiswa: 6 },
];

const statusColor = { 'Aktif': 'bg-green-100 text-green-700', 'Proses Perpanjangan': 'bg-yellow-100 text-yellow-700', 'Tidak Aktif': 'bg-red-100 text-red-700' };
const jenisColor = { 'Perusahaan': 'bg-blue-100 text-blue-700', 'Kumiai': 'bg-purple-100 text-purple-700', 'Yayasan': 'bg-teal-100 text-teal-700' };

export default function MitraJepang() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.wilayah.toLowerCase().includes(search.toLowerCase()) ||
    d.bidang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mitra Jepang</h1>
          <p className="text-sm text-gray-500 mt-1">Data mitra dan organisasi penerima dari Jepang (IM Japan, Kumiai, dll)</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Mitra
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Mitra', value: dummyData.length, color: 'text-blue-600' },
          { label: 'MOU Aktif', value: dummyData.filter(d => d.statusMOU === 'Aktif').length, color: 'text-green-600' },
          { label: 'Proses Perpanjangan', value: dummyData.filter(d => d.statusMOU === 'Proses Perpanjangan').length, color: 'text-yellow-600' },
          { label: 'Total Siswa Ditempatkan', value: dummyData.reduce((a, b) => a + b.jumlahSiswa, 0), color: 'text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <input type="text" placeholder="Cari mitra, wilayah, bidang..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Mitra</th>
              <th className="px-4 py-3">Jenis</th>
              <th className="px-4 py-3">Wilayah / Bidang</th>
              <th className="px-4 py-3">Kontak</th>
              <th className="px-4 py-3">MOU</th>
              <th className="px-4 py-3">Siswa</th>
              <th className="px-4 py-3">Status MOU</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 text-xs">{row.nama}</p>
                  <p className="text-gray-400 text-xs font-mono">{row.kode}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${jenisColor[row.jenis]}`}>{row.jenis}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">
                  <p>🗾 {row.wilayah}</p>
                  <p className="text-gray-400">{row.bidang}</p>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">
                  <p>{row.kontak}</p>
                  <p className="text-gray-400">{row.email}</p>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  <p>{row.tanggalMOU}</p>
                  <p className="text-gray-400">s/d {row.expiredMOU}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-0.5 rounded-full">{row.jumlahSiswa}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[row.statusMOU]}`}>{row.statusMOU}</span>
                </td>
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
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Mitra Jepang' : 'Tambah Mitra Jepang'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode', 'kode'], ['Nama Mitra', 'nama'], ['Wilayah', 'wilayah'], ['Bidang', 'bidang'], ['Nama Kontak', 'kontak'], ['Email', 'email'], ['Telepon', 'telp']].map(([l, k]) => (
                <div key={k}><label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              ))}
              <div><label className="text-xs text-gray-500 font-medium">Jenis</label>
                <select defaultValue={selected?.jenis || 'Perusahaan'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Perusahaan</option><option>Kumiai</option><option>Yayasan</option>
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