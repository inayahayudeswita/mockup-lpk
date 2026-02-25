import React, { useState } from 'react';

const dokumenList = [
  { id: 1, jenis: 'KTP / e-KTP', kategori: 'Identitas Diri', status: 'Terverifikasi', tanggalUpload: '12 Jun 2024', tanggalVerif: '13 Jun 2024', expiry: null, keterangan: 'Valid', file: 'ktp_ahmad_fauzan.pdf', size: '1.2 MB' },
  { id: 2, jenis: 'Kartu Keluarga', kategori: 'Identitas Diri', status: 'Terverifikasi', tanggalUpload: '12 Jun 2024', tanggalVerif: '13 Jun 2024', expiry: null, keterangan: 'Valid', file: 'kk_ahmad_fauzan.pdf', size: '0.8 MB' },
  { id: 3, jenis: 'Akta Kelahiran', kategori: 'Identitas Diri', status: 'Terverifikasi', tanggalUpload: '12 Jun 2024', tanggalVerif: '13 Jun 2024', expiry: null, keterangan: 'Valid', file: 'akta_ahmad_fauzan.pdf', size: '0.5 MB' },
  { id: 4, jenis: 'Ijazah Terakhir', kategori: 'Pendidikan', status: 'Terverifikasi', tanggalUpload: '12 Jun 2024', tanggalVerif: '14 Jun 2024', expiry: null, keterangan: 'SMA Negeri 1 Pacet - 2018', file: 'ijazah_ahmad_fauzan.pdf', size: '2.1 MB' },
  { id: 5, jenis: 'SKCK', kategori: 'Legalitas', status: 'Terverifikasi', tanggalUpload: '15 Jun 2024', tanggalVerif: '16 Jun 2024', expiry: '2025-06-15', keterangan: 'Berlaku hingga Jun 2025', file: 'skck_ahmad_fauzan.pdf', size: '0.9 MB' },
  { id: 6, jenis: 'Hasil Medical Check Up', kategori: 'Kesehatan', status: 'Terverifikasi', tanggalUpload: '18 Jun 2024', tanggalVerif: '18 Jun 2024', expiry: '2025-06-18', keterangan: 'RS Mitra Keluarga - Fit to Work', file: 'mcu_ahmad_fauzan.pdf', size: '3.4 MB' },
  { id: 7, jenis: 'Foto 4x6 Background Putih', kategori: 'Identitas Diri', status: 'Terverifikasi', tanggalUpload: '12 Jun 2024', tanggalVerif: '13 Jun 2024', expiry: null, keterangan: '4 lembar', file: 'foto_ahmad_fauzan.jpg', size: '2.8 MB' },
  { id: 8, jenis: 'Paspor', kategori: 'Perjalanan', status: 'Terverifikasi', tanggalUpload: '22 Jun 2024', tanggalVerif: '23 Jun 2024', expiry: '2030-09-15', keterangan: 'No: A1234567 - Valid 6 tahun', file: 'paspor_ahmad_fauzan.pdf', size: '1.7 MB' },
  { id: 9, jenis: 'Sertifikat JLPT N4', kategori: 'Sertifikasi', status: 'Belum Upload', tanggalUpload: '-', tanggalVerif: '-', expiry: null, keterangan: 'Menunggu tes Desember 2024', file: null, size: null },
  { id: 10, jenis: 'Sertifikat Keterampilan TG', kategori: 'Sertifikasi', status: 'Belum Upload', tanggalUpload: '-', tanggalVerif: '-', expiry: null, keterangan: 'Menunggu tes keterampilan', file: null, size: null },
  { id: 11, jenis: 'Kontrak Kerja / Magang', kategori: 'Kontrak', status: 'Menunggu', tanggalUpload: '-', tanggalVerif: '-', expiry: null, keterangan: 'Menunggu matching perusahaan', file: null, size: null },
];

const statusColor = {
  'Terverifikasi': 'bg-green-100 text-green-700',
  'Menunggu Verifikasi': 'bg-yellow-100 text-yellow-700',
  'Ditolak': 'bg-red-100 text-red-700',
  'Belum Upload': 'bg-gray-100 text-gray-500',
  'Menunggu': 'bg-blue-100 text-blue-700',
};

const statusIcon = {
  'Terverifikasi': '✓',
  'Menunggu Verifikasi': '⏳',
  'Ditolak': '✗',
  'Belum Upload': '—',
  'Menunggu': '⌛',
};

const katColor = {
  'Identitas Diri': 'bg-blue-50 text-blue-700',
  'Pendidikan': 'bg-green-50 text-green-700',
  'Legalitas': 'bg-yellow-50 text-yellow-700',
  'Kesehatan': 'bg-red-50 text-red-700',
  'Perjalanan': 'bg-purple-50 text-purple-700',
  'Sertifikasi': 'bg-indigo-50 text-indigo-700',
  'Kontrak': 'bg-orange-50 text-orange-700',
};

export default function DokumenSiswa() {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [search, setSearch] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filtered = dokumenList.filter(d => {
    const matchS = filterStatus === 'Semua' || d.status === filterStatus;
    const matchQ = d.jenis.toLowerCase().includes(search.toLowerCase());
    return matchS && matchQ;
  });

  const terverif = dokumenList.filter(d => d.status === 'Terverifikasi').length;
  const belumUpload = dokumenList.filter(d => d.status === 'Belum Upload' || d.status === 'Menunggu').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dokumen Siswa</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola dan verifikasi dokumen siswa: Ahmad Fauzan Hidayat</p>
        </div>
        <button onClick={() => setShowUploadModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          ↑ Upload Dokumen
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Dokumen</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{dokumenList.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Terverifikasi</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{terverif}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Belum Upload</p>
          <p className="text-2xl font-bold text-gray-500 mt-1">{belumUpload}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Kelengkapan</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{Math.round((terverif / dokumenList.length) * 100)}%</p>
          <div className="mt-1.5 bg-gray-100 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.round((terverif / dokumenList.length) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <input type="text" placeholder="Cari dokumen..." value={search} onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <div className="flex gap-1">
            {['Semua', 'Terverifikasi', 'Menunggu Verifikasi', 'Belum Upload'].map(f => (
              <button key={f} onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Jenis Dokumen</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tgl. Upload</th>
              <th className="px-4 py-3">Keterangan</th>
              <th className="px-4 py-3">Kadaluarsa</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{row.file?.endsWith('.pdf') ? '📄' : row.file?.endsWith('.jpg') ? '🖼' : '📁'}</span>
                    <div>
                      <p className="font-medium text-gray-800 text-xs">{row.jenis}</p>
                      {row.file && <p className="text-gray-400 text-xs">{row.file} · {row.size}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${katColor[row.kategori]}`}>{row.kategori}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[row.status]}`}>
                    {statusIcon[row.status]} {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{row.tanggalUpload}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{row.keterangan}</td>
                <td className="px-4 py-3 text-xs">
                  {row.expiry ? (
                    <span className={`font-medium ${new Date(row.expiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ? 'text-orange-500' : 'text-gray-600'}`}>{row.expiry}</span>
                  ) : <span className="text-gray-300">-</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {row.file && <button className="text-blue-500 text-xs hover:text-blue-700">Lihat</button>}
                    {(row.status === 'Belum Upload' || row.status === 'Ditolak') && (
                      <button onClick={() => { setSelectedDoc(row); setShowUploadModal(true); }} className="text-green-500 text-xs hover:text-green-700">Upload</button>
                    )}
                    {row.status === 'Menunggu Verifikasi' && (
                      <button className="text-yellow-600 text-xs hover:text-yellow-800">Verifikasi</button>
                    )}
                    {row.file && <button className="text-red-400 text-xs hover:text-red-600">Hapus</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Upload Dokumen</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-medium">Jenis Dokumen</label>
                <select defaultValue={selectedDoc?.jenis || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {dokumenList.map(d => <option key={d.id}>{d.jenis}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">File Dokumen</label>
                <div className="mt-1 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition cursor-pointer">
                  <p className="text-2xl mb-2">📁</p>
                  <p className="text-sm text-gray-500">Klik atau drag & drop file di sini</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG maksimal 10MB</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Keterangan (opsional)</label>
                <textarea rows={2} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="Catatan tambahan..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowUploadModal(false); setSelectedDoc(null); }} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">Batal</button>
              <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}