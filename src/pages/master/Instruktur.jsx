import React, { useState } from 'react';

const dummyData = [
  { id: 1, nik: 'INS-001', nama: 'Hiroshi Tanaka', bidang: 'Bahasa Jepang N3-N4', kualifikasi: 'JLPT N1', pengalaman: 8, cabang: 'Jakarta', status: 'Aktif', email: 'hiroshi@lpksimpel.id', hp: '0812-3456-7890', kelas: 3 },
  { id: 2, nik: 'INS-002', nama: 'Rina Kusuma, S.Pd', bidang: 'Bahasa Jepang N5-N4', kualifikasi: 'S1 Pendidikan Bahasa Jepang', pengalaman: 5, cabang: 'Jakarta', status: 'Aktif', email: 'rina@lpksimpel.id', hp: '0813-2345-6789', kelas: 2 },
  { id: 3, nik: 'INS-003', nama: 'Dwi Prasetyo, S.T', bidang: 'Teknis Manufaktur', kualifikasi: 'S1 Teknik Mesin', pengalaman: 10, cabang: 'Surabaya', status: 'Aktif', email: 'dwi@lpksimpel.id', hp: '0814-3456-7890', kelas: 4 },
  { id: 4, nik: 'INS-004', nama: 'Sari Indah, Amd.Kep', bidang: 'Perawatan Lansia', kualifikasi: 'D3 Keperawatan', pengalaman: 6, cabang: 'Bandung', status: 'Aktif', email: 'sari@lpksimpel.id', hp: '0815-4567-8901', kelas: 2 },
  { id: 5, nik: 'INS-005', nama: 'Budi Hartono', bidang: 'Budaya & Etika Kerja Jepang', kualifikasi: 'Pengalaman Kerja Jepang 5th', pengalaman: 12, cabang: 'Jakarta', status: 'Aktif', email: 'budi@lpksimpel.id', hp: '0816-5678-9012', kelas: 5 },
  { id: 6, nik: 'INS-006', nama: 'Yanti Nugroho, S.P', bidang: 'Pertanian & Perkebunan', kualifikasi: 'S1 Agronomi', pengalaman: 7, cabang: 'Semarang', status: 'Aktif', email: 'yanti@lpksimpel.id', hp: '0817-6789-0123', kelas: 3 },
  { id: 7, nik: 'INS-007', nama: 'Riko Fathurrahman', bidang: 'Bahasa Jepang N3', kualifikasi: 'JLPT N2', pengalaman: 3, cabang: 'Surabaya', status: 'Cuti', email: 'riko@lpksimpel.id', hp: '0818-7890-1234', kelas: 0 },
  { id: 8, nik: 'INS-008', nama: 'Mega Oktaviani, S.Pi', bidang: 'Perikanan & Kelautan', kualifikasi: 'S1 Perikanan', pengalaman: 4, cabang: 'Makassar', status: 'Aktif', email: 'mega@lpksimpel.id', hp: '0819-8901-2345', kelas: 2 },
];

const avatar = (nama) => nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500'];

export default function Instruktur() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('table');

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.bidang.toLowerCase().includes(search.toLowerCase()) ||
    d.cabang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Instruktur</h1>
          <p className="text-sm text-gray-500 mt-1">Data instruktur dan pengajar program pelatihan</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Instruktur
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Instruktur', value: dummyData.length, color: 'text-blue-600' },
          { label: 'Aktif', value: dummyData.filter(d => d.status === 'Aktif').length, color: 'text-green-600' },
          { label: 'Total Kelas Aktif', value: dummyData.reduce((a, b) => a + b.kelas, 0), color: 'text-indigo-600' },
          { label: 'Rata-rata Pengalaman', value: Math.round(dummyData.reduce((a, b) => a + b.pengalaman, 0) / dummyData.length) + ' thn', color: 'text-orange-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <input type="text" placeholder="Cari instruktur, bidang, cabang..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5">
            <button onClick={() => setView('table')} className={`px-3 py-1 rounded text-xs font-medium transition ${view === 'table' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>Tabel</button>
            <button onClick={() => setView('card')} className={`px-3 py-1 rounded text-xs font-medium transition ${view === 'card' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>Kartu</button>
          </div>
        </div>

        {view === 'table' ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="px-4 py-3">Instruktur</th>
                <th className="px-4 py-3">Bidang</th>
                <th className="px-4 py-3">Kualifikasi</th>
                <th className="px-4 py-3">Cabang</th>
                <th className="px-4 py-3">Pengalaman</th>
                <th className="px-4 py-3">Kelas Aktif</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{avatar(row.nama)}</div>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{row.nama}</p>
                        <p className="text-gray-400 text-xs">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{row.bidang}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{row.kualifikasi}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{row.cabang}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.pengalaman} thn</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-0.5 rounded-full">{row.kelas}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 text-xs mr-2">Edit</button>
                    <button className="text-red-400 text-xs">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 grid grid-cols-4 gap-4">
            {filtered.map((row, i) => (
              <div key={row.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold`}>{avatar(row.nama)}</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{row.nama}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${row.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{row.status}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">🎯 {row.bidang}</p>
                <p className="text-xs text-gray-500 mb-1">📍 {row.cabang}</p>
                <p className="text-xs text-gray-500 mb-3">🏆 {row.pengalaman} tahun pengalaman</p>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button onClick={() => { setSelected(row); setShowModal(true); }} className="flex-1 text-xs text-blue-600 hover:bg-blue-50 py-1 rounded">Edit</button>
                  <button className="flex-1 text-xs text-red-500 hover:bg-red-50 py-1 rounded">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Instruktur' : 'Tambah Instruktur'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['NIK', 'nik'], ['Nama Lengkap', 'nama'], ['Bidang', 'bidang'], ['Kualifikasi', 'kualifikasi'], ['Email', 'email'], ['No. HP', 'hp'], ['Cabang', 'cabang']].map(([l, k]) => (
                <div key={k}>
                  <label className="text-xs text-gray-500 font-medium">{l}</label>
                  <input defaultValue={selected?.[k] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-500 font-medium">Pengalaman (tahun)</label>
                <input type="number" defaultValue={selected?.pengalaman || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
              </div>
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