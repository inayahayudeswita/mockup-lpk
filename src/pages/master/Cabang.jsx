import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'CBG-JKT', nama: 'Cabang Jakarta Pusat', kota: 'Jakarta', provinsi: 'DKI Jakarta', alamat: 'Jl. Sudirman No. 45, Jakarta Pusat', telepon: '021-5557890', email: 'jakarta@lpksimpel.id', kepala: 'Budi Santoso, S.Pd', siswAktif: 85, status: 'Aktif' },
  { id: 2, kode: 'CBG-SBY', nama: 'Cabang Surabaya', kota: 'Surabaya', provinsi: 'Jawa Timur', alamat: 'Jl. Pemuda No. 12, Surabaya', telepon: '031-5551234', email: 'surabaya@lpksimpel.id', kepala: 'Dewi Rahayu, M.Pd', siswAktif: 62, status: 'Aktif' },
  { id: 3, kode: 'CBG-BDG', nama: 'Cabang Bandung', kota: 'Bandung', provinsi: 'Jawa Barat', alamat: 'Jl. Asia Afrika No. 78, Bandung', telepon: '022-4201234', email: 'bandung@lpksimpel.id', kepala: 'Ahmad Fauzi, S.T', siswAktif: 48, status: 'Aktif' },
  { id: 4, kode: 'CBG-MDN', nama: 'Cabang Medan', kota: 'Medan', provinsi: 'Sumatera Utara', alamat: 'Jl. Gatot Subroto No. 33, Medan', telepon: '061-4531234', email: 'medan@lpksimpel.id', kepala: 'Siti Aminah, S.E', siswAktif: 40, status: 'Aktif' },
  { id: 5, kode: 'CBG-SMG', nama: 'Cabang Semarang', kota: 'Semarang', provinsi: 'Jawa Tengah', alamat: 'Jl. Pandanaran No. 56, Semarang', telepon: '024-8441234', email: 'semarang@lpksimpel.id', kepala: 'Hendra Wijaya, S.Pd', siswAktif: 35, status: 'Aktif' },
  { id: 6, kode: 'CBG-MKS', nama: 'Cabang Makassar', kota: 'Makassar', provinsi: 'Sulawesi Selatan', alamat: 'Jl. Sam Ratulangi No. 22, Makassar', telepon: '0411-3331234', email: 'makassar@lpksimpel.id', kepala: 'Rizki Pratama, S.Pd', siswAktif: 28, status: 'Persiapan' },
];

export default function Cabang() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = dummyData.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.kota.toLowerCase().includes(search.toLowerCase()) ||
    d.kode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cabang</h1>
          <p className="text-sm text-gray-500 mt-1">Data cabang LPK SIMPEL di seluruh Indonesia</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Cabang
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Cabang', value: dummyData.length, color: 'text-blue-600' },
          { label: 'Aktif', value: dummyData.filter(d => d.status === 'Aktif').length, color: 'text-green-600' },
          { label: 'Persiapan', value: dummyData.filter(d => d.status === 'Persiapan').length, color: 'text-yellow-600' },
          { label: 'Total Siswa Aktif', value: dummyData.reduce((a, b) => a + b.siswAktif, 0), color: 'text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Card Grid */}
      <div className="mb-4">
        <input type="text" placeholder="Cari cabang..." value={search} onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(row => (
          <div key={row.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-mono text-gray-400">{row.kode}</span>
                <h3 className="font-semibold text-gray-800 text-sm mt-0.5">{row.nama}</h3>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{row.status}</span>
            </div>
            <div className="space-y-1.5 text-xs text-gray-500">
              <div className="flex items-center gap-2">📍 <span>{row.alamat}</span></div>
              <div className="flex items-center gap-2">📞 <span>{row.telepon}</span></div>
              <div className="flex items-center gap-2">✉️ <span>{row.email}</span></div>
              <div className="flex items-center gap-2">👤 <span>Kepala: <strong className="text-gray-700">{row.kepala}</strong></span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-indigo-600 font-semibold">{row.siswAktif} siswa aktif</span>
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
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Cabang' : 'Tambah Cabang Baru'}</h2>
            <div className="grid grid-cols-2 gap-3">
              {[['Kode Cabang', 'kode'], ['Nama Cabang', 'nama'], ['Kota', 'kota'], ['Provinsi', 'provinsi'], ['Telepon', 'telepon'], ['Email', 'email']].map(([label, key]) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 font-medium">{label}</label>
                  <input defaultValue={selected?.[key] || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <label className="text-xs text-gray-500 font-medium">Alamat Lengkap</label>
              <textarea defaultValue={selected?.alamat || ''} rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="mt-3">
              <label className="text-xs text-gray-500 font-medium">Kepala Cabang</label>
              <input defaultValue={selected?.kepala || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
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