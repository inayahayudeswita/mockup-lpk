import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'BK-001', nama: 'Pertanian & Perkebunan', kategori: 'Tokutei Ginou', deskripsi: 'Bidang kerja terkait tanaman pangan, hortikultura, dan perkebunan', jumlahProgram: 4, aktif: true },
  { id: 2, kode: 'BK-002', nama: 'Perikanan & Kelautan', kategori: 'Tokutei Ginou', deskripsi: 'Budidaya ikan, pengolahan hasil laut, dan nelayan', jumlahProgram: 3, aktif: true },
  { id: 3, kode: 'BK-003', nama: 'Manufaktur & Produksi', kategori: 'Magang (Kenshusei)', deskripsi: 'Produksi komponen, perakitan mesin, dan quality control', jumlahProgram: 6, aktif: true },
  { id: 4, kode: 'BK-004', nama: 'Konstruksi & Bangunan', kategori: 'Tokutei Ginou', deskripsi: 'Pembangunan gedung, infrastruktur, dan finishing', jumlahProgram: 5, aktif: true },
  { id: 5, kode: 'BK-005', nama: 'Perawatan Lansia & Kesehatan', kategori: 'Magang (Kenshusei)', deskripsi: 'Asisten perawat, perawatan lansia di panti jompo', jumlahProgram: 3, aktif: true },
  { id: 6, kode: 'BK-006', nama: 'Makanan & Minuman', kategori: 'Tokutei Ginou', deskripsi: 'Pengolahan makanan, restoran, dan catering', jumlahProgram: 2, aktif: true },
  { id: 7, kode: 'BK-007', nama: 'Otomotif & Mekanik', kategori: 'Magang (Kenshusei)', deskripsi: 'Servis kendaraan, perakitan, dan perawatan mesin otomotif', jumlahProgram: 4, aktif: false },
  { id: 8, kode: 'BK-008', nama: 'Tekstil & Garmen', kategori: 'Magang (Kenshusei)', deskripsi: 'Jahit pakaian, tenun kain, dan industri tekstil', jumlahProgram: 2, aktif: false },
];

const kategoriIcon = {
  'Tokutei Ginou': '🔑',
  'Magang (Kenshusei)': '🎓',
};

export default function BidangKerja() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterKategori, setFilterKategori] = useState('Semua');

  const filtered = dummyData.filter(d => {
    const matchSearch = d.nama.toLowerCase().includes(search.toLowerCase()) || d.kode.toLowerCase().includes(search.toLowerCase());
    const matchKat = filterKategori === 'Semua' || d.kategori === filterKategori;
    return matchSearch && matchKat;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bidang Kerja</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola bidang kerja yang tersedia untuk program pelatihan</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <span>+</span> Tambah Bidang Kerja
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Bidang Kerja</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Tokutei Ginou</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{dummyData.filter(d => d.kategori === 'Tokutei Ginou').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Magang (Kenshusei)</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{dummyData.filter(d => d.kategori === 'Magang (Kenshusei)').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <input type="text" placeholder="Cari bidang kerja..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <select value={filterKategori} onChange={e => setFilterKategori(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none">
            <option>Semua</option><option>Tokutei Ginou</option><option>Magang (Kenshusei)</option>
          </select>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Nama Bidang Kerja</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Deskripsi</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.kode}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{row.nama}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.kategori === 'Tokutei Ginou' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {kategoriIcon[row.kategori]} {row.kategori}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{row.deskripsi}</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full text-xs">{row.jumlahProgram}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.aktif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {row.aktif ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 hover:text-blue-700 text-xs">Edit</button>
                    <button className="text-red-400 hover:text-red-600 text-xs">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-xs text-gray-400">Menampilkan {filtered.length} dari {dummyData.length} data</div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Bidang Kerja' : 'Tambah Bidang Kerja'}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-medium">Kode</label>
                <input defaultValue={selected?.kode || ''} placeholder="BK-009" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Nama Bidang Kerja</label>
                <input defaultValue={selected?.nama || ''} placeholder="Nama bidang kerja..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Kategori</label>
                <select defaultValue={selected?.kategori || 'Tokutei Ginou'} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Tokutei Ginou</option><option>Magang (Kenshusei)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Deskripsi</label>
                <textarea defaultValue={selected?.deskripsi || ''} rows={3} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}