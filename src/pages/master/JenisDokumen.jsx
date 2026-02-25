import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'DOC-KTP', nama: 'KTP / e-KTP', kategori: 'Identitas Diri', deskripsi: 'Kartu Tanda Penduduk elektronik yang masih berlaku', wajib: true, expiry: false, aktif: true },
  { id: 2, kode: 'DOC-KK', nama: 'Kartu Keluarga', kategori: 'Identitas Diri', deskripsi: 'Kartu keluarga resmi dari Dinas Kependudukan', wajib: true, expiry: false, aktif: true },
  { id: 3, kode: 'DOC-IJAZAH', nama: 'Ijazah Terakhir', kategori: 'Pendidikan', deskripsi: 'Ijazah pendidikan formal terakhir (min. SMA/SMK)', wajib: true, expiry: false, aktif: true },
  { id: 4, kode: 'DOC-SKCK', nama: 'SKCK', kategori: 'Legalitas', deskripsi: 'Surat Keterangan Catatan Kepolisian yang masih berlaku', wajib: true, expiry: true, aktif: true },
  { id: 5, kode: 'DOC-MCU', nama: 'Hasil Medical Check Up', kategori: 'Kesehatan', deskripsi: 'Sertifikat kesehatan dari rumah sakit yang ditunjuk', wajib: true, expiry: true, aktif: true },
  { id: 6, kode: 'DOC-PASPOR', nama: 'Paspor', kategori: 'Perjalanan', deskripsi: 'Paspor aktif dengan masa berlaku minimal 3 tahun', wajib: true, expiry: true, aktif: true },
  { id: 7, kode: 'DOC-FOTO', nama: 'Foto 4x6 Background Putih', kategori: 'Identitas Diri', deskripsi: 'Foto terbaru maksimal 3 bulan terakhir', wajib: true, expiry: false, aktif: true },
  { id: 8, kode: 'DOC-SERTIF', nama: 'Sertifikat Pelatihan Bahasa Jepang', kategori: 'Sertifikasi', deskripsi: 'Sertifikat hasil tes JLPT atau NAT-TEST', wajib: false, expiry: false, aktif: true },
  { id: 9, kode: 'DOC-KONTRAK', nama: 'Kontrak Magang/Kerja', kategori: 'Kontrak', deskripsi: 'Dokumen kontrak antara siswa dan perusahaan Jepang', wajib: true, expiry: true, aktif: true },
  { id: 10, kode: 'DOC-AKT-LHR', nama: 'Akta Kelahiran', kategori: 'Identitas Diri', deskripsi: 'Akta kelahiran resmi', wajib: true, expiry: false, aktif: true },
  { id: 11, kode: 'DOC-BPJS', nama: 'Kartu BPJS Kesehatan', kategori: 'Asuransi', deskripsi: 'Kartu BPJS Kesehatan aktif', wajib: false, expiry: false, aktif: false },
];

const kategoriColor = {
  'Identitas Diri': 'bg-blue-50 text-blue-700',
  'Pendidikan': 'bg-green-50 text-green-700',
  'Legalitas': 'bg-yellow-50 text-yellow-700',
  'Kesehatan': 'bg-red-50 text-red-700',
  'Perjalanan': 'bg-purple-50 text-purple-700',
  'Sertifikasi': 'bg-indigo-50 text-indigo-700',
  'Kontrak': 'bg-orange-50 text-orange-700',
  'Asuransi': 'bg-teal-50 text-teal-700',
};

export default function JenisDokumen() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterKat, setFilterKat] = useState('Semua');

  const filtered = dummyData.filter(d => {
    const matchS = d.nama.toLowerCase().includes(search.toLowerCase()) || d.kode.toLowerCase().includes(search.toLowerCase());
    const matchK = filterKat === 'Semua' || d.kategori === filterKat;
    return matchS && matchK;
  });

  const kategoriList = [...new Set(dummyData.map(d => d.kategori))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jenis Dokumen</h1>
          <p className="text-sm text-gray-500 mt-1">Daftar jenis dokumen yang diperlukan dalam proses seleksi dan keberangkatan</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Jenis Dokumen
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Jenis Dokumen</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Dokumen Wajib</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{dummyData.filter(d => d.wajib).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Ada Kadaluarsa</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{dummyData.filter(d => d.expiry).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Kategori</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{kategoriList.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <input type="text" placeholder="Cari jenis dokumen..." value={search} onChange={e => setSearch(e.target.value)}
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
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Nama Dokumen</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Deskripsi</th>
              <th className="px-4 py-3">Wajib</th>
              <th className="px-4 py-3">Ada Kadaluarsa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.kode}</td>
                <td className="px-4 py-3 font-medium text-gray-800">📄 {row.nama}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kategoriColor[row.kategori] || 'bg-gray-100 text-gray-600'}`}>{row.kategori}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{row.deskripsi}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.wajib ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>{row.wajib ? 'Wajib' : 'Opsional'}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  {row.expiry ? <span className="text-orange-500 text-xs">⏰ Ya</span> : <span className="text-gray-400 text-xs">Tidak</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.aktif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{row.aktif ? 'Aktif' : 'Nonaktif'}</span>
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Jenis Dokumen' : 'Tambah Jenis Dokumen'}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-gray-500 font-medium">Kode</label>
                  <input defaultValue={selected?.kode || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
                <div><label className="text-xs text-gray-500 font-medium">Kategori</label>
                  <select defaultValue={selected?.kategori || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {kategoriList.map(k => <option key={k}>{k}</option>)}
                  </select></div>
              </div>
              <div><label className="text-xs text-gray-500 font-medium">Nama Dokumen</label>
                <input defaultValue={selected?.nama || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Deskripsi</label>
                <textarea defaultValue={selected?.deskripsi || ''} rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked={selected?.wajib} className="rounded" /> Dokumen Wajib
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" defaultChecked={selected?.expiry} className="rounded" /> Ada Kadaluarsa
                </label>
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