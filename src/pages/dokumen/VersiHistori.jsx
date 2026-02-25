import React, { useState } from 'react';

const dokumenList = [
  {
    id: 'DOC-001',
    nama: 'Kontrak Kerja - Ahmad Fauzi & Yamaha Motor',
    jenis: 'Kontrak Siswa',
    versiAktif: 'v3.0',
    versi: [
      { v: 'v3.0', tanggal: '2025-02-10', oleh: 'Admin Penyaluran', catatan: 'Update tanggal mulai kontrak sesuai konfirmasi Yamaha Motor', ukuran: '2.4 MB', file: 'kontrak_ahmad_v3.pdf', status: 'Aktif' },
      { v: 'v2.0', tanggal: '2025-01-25', oleh: 'Admin Penyaluran', catatan: 'Revisi pasal 5 tentang tunjangan perumahan', ukuran: '2.3 MB', file: 'kontrak_ahmad_v2.pdf', status: 'Arsip' },
      { v: 'v1.0', tanggal: '2025-01-10', oleh: 'Admin Penyaluran', catatan: 'Draft awal kontrak kerja', ukuran: '2.1 MB', file: 'kontrak_ahmad_v1.pdf', status: 'Arsip' },
    ],
  },
  {
    id: 'DOC-002',
    nama: 'MOU - LPK SIMPEL & Yamaha Motor Co., Ltd.',
    jenis: 'Kontrak Perusahaan',
    versiAktif: 'v2.1',
    versi: [
      { v: 'v2.1', tanggal: '2025-01-15', oleh: 'Direktur LPK', catatan: 'Penyesuaian kuota dan jadwal pengiriman 2025', ukuran: '1.8 MB', file: 'mou_yamaha_v2.1.pdf', status: 'Aktif' },
      { v: 'v2.0', tanggal: '2024-07-01', oleh: 'Direktur LPK', catatan: 'Perpanjangan kontrak periode ke-2 (2024-2025)', ukuran: '1.7 MB', file: 'mou_yamaha_v2.pdf', status: 'Arsip' },
      { v: 'v1.0', tanggal: '2024-01-01', oleh: 'Direktur LPK', catatan: 'MOU awal kerja sama resmi', ukuran: '1.5 MB', file: 'mou_yamaha_v1.pdf', status: 'Arsip' },
    ],
  },
  {
    id: 'DOC-003',
    nama: 'Surat Izin Operasional LPK (SIO)',
    jenis: 'Dokumen Legal',
    versiAktif: 'v2.0',
    versi: [
      { v: 'v2.0', tanggal: '2022-03-15', oleh: 'Admin Legalitas', catatan: 'Perpanjangan SIO 5 tahun dari Kemnaker RI', ukuran: '0.8 MB', file: 'sio_lpk_2022.pdf', status: 'Aktif' },
      { v: 'v1.0', tanggal: '2017-03-15', oleh: 'Admin Legalitas', catatan: 'SIO pertama kali terbit', ukuran: '0.7 MB', file: 'sio_lpk_2017.pdf', status: 'Arsip' },
    ],
  },
  {
    id: 'DOC-004',
    nama: 'Kontrak Kerja - Dewi Lestari & Honda Motor',
    jenis: 'Kontrak Siswa',
    versiAktif: 'v2.0',
    versi: [
      { v: 'v2.0', tanggal: '2025-01-28', oleh: 'Admin Penyaluran', catatan: 'Revisi pasal gaji sesuai hasil negosiasi ulang', ukuran: '2.2 MB', file: 'kontrak_dewi_v2.pdf', status: 'Aktif' },
      { v: 'v1.0', tanggal: '2025-01-05', oleh: 'Admin Penyaluran', catatan: 'Draft kontrak pertama', ukuran: '2.0 MB', file: 'kontrak_dewi_v1.pdf', status: 'Arsip' },
    ],
  },
];

const jenisColor = {
  'Kontrak Siswa': 'bg-blue-100 text-blue-700',
  'Kontrak Perusahaan': 'bg-purple-100 text-purple-700',
  'Dokumen Legal': 'bg-emerald-100 text-emerald-700',
};

const statusVersionColor = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Arsip': 'bg-gray-100 text-gray-500',
};

export default function VersiHistori() {
  const [selectedDoc, setSelectedDoc] = useState(dokumenList[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [compareFrom, setCompareFrom] = useState('');
  const [compareTo, setCompareTo] = useState('');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Versi & Histori Dokumen</h1>
          <p className="text-sm text-gray-500 mt-1">Lacak perubahan dan kelola versi seluruh dokumen LPK</p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left: Document List */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Dokumen</p>
            </div>
            <div className="divide-y divide-gray-100">
              {dokumenList.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`w-full text-left p-3 hover:bg-blue-50 transition-colors ${selectedDoc?.id === doc.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">📄</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-800 truncate">{doc.nama}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium ${jenisColor[doc.jenis]}`}>{doc.jenis}</span>
                        <span className="text-xs text-gray-400 font-mono">{doc.versiAktif}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Version History */}
        {selectedDoc && (
          <div className="flex-1">
            {/* Doc Header */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">{selectedDoc.nama}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${jenisColor[selectedDoc.jenis]}`}>{selectedDoc.jenis}</span>
                    <span className="text-xs text-gray-500">Versi aktif: <strong className="text-emerald-600">{selectedDoc.versiAktif}</strong></span>
                    <span className="text-xs text-gray-500">{selectedDoc.versi.length} versi tersimpan</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCompareMode(!compareMode)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${compareMode ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    🔍 Bandingkan Versi
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700">
                    + Upload Versi Baru
                  </button>
                </div>
              </div>

              {compareMode && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-medium text-blue-800 mb-2">Pilih 2 versi untuk dibandingkan</p>
                  <div className="flex gap-3 items-center">
                    <select className="border border-blue-200 rounded-lg px-2 py-1 text-xs" value={compareFrom} onChange={e => setCompareFrom(e.target.value)}>
                      <option value="">Dari versi...</option>
                      {selectedDoc.versi.map(v => <option key={v.v} value={v.v}>{v.v} ({v.tanggal})</option>)}
                    </select>
                    <span className="text-xs text-blue-500">→</span>
                    <select className="border border-blue-200 rounded-lg px-2 py-1 text-xs" value={compareTo} onChange={e => setCompareTo(e.target.value)}>
                      <option value="">Ke versi...</option>
                      {selectedDoc.versi.map(v => <option key={v.v} value={v.v}>{v.v} ({v.tanggal})</option>)}
                    </select>
                    <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">Bandingkan</button>
                  </div>
                </div>
              )}
            </div>

            {/* Version Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Riwayat Perubahan</p>
              </div>
              <div className="divide-y divide-gray-100">
                {selectedDoc.versi.map((v, i) => (
                  <div key={v.v} className={`p-5 ${v.status === 'Aktif' ? 'bg-emerald-50/40' : ''}`}>
                    <div className="flex items-start gap-4">
                      {/* Version Badge & Timeline */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${v.status === 'Aktif' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {v.v}
                        </div>
                        {i < selectedDoc.versi.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusVersionColor[v.status]}`}>{v.status}</span>
                            {v.status === 'Aktif' && <span className="text-xs text-emerald-600 font-medium">⭐ Versi Saat Ini</span>}
                          </div>
                          <span className="text-xs text-gray-400">{v.tanggal}</span>
                        </div>

                        <p className="text-sm font-medium text-gray-800 mb-1">{v.catatan}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>👤 {v.oleh}</span>
                          <span>📦 {v.ukuran}</span>
                          <span>📄 {v.file}</span>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <button className="text-blue-500 hover:text-blue-700 text-xs font-medium border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50">
                            👁️ Lihat
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 text-xs font-medium border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50">
                            ⬇️ Unduh
                          </button>
                          {v.status === 'Arsip' && (
                            <button className="text-orange-500 hover:text-orange-700 text-xs font-medium border border-orange-200 px-2.5 py-1 rounded-lg hover:bg-orange-50">
                              🔄 Restore
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Log Snippet */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-4 p-5">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Audit Log Akses</p>
              <div className="space-y-2">
                {[
                  { aksi: 'Lihat dokumen', pengguna: 'Direktur LPK', waktu: '2025-02-14 10:23', ip: '192.168.1.1' },
                  { aksi: 'Unduh v3.0', pengguna: 'Admin Penyaluran', waktu: '2025-02-13 14:05', ip: '192.168.1.22' },
                  { aksi: 'Upload v3.0', pengguna: 'Admin Penyaluran', waktu: '2025-02-10 09:30', ip: '192.168.1.22' },
                  { aksi: 'Setujui v2.0', pengguna: 'Direktur LPK', waktu: '2025-01-25 16:00', ip: '192.168.1.1' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🔵</span>
                      <span className="font-medium text-gray-700">{log.aksi}</span>
                      <span className="text-gray-400">oleh <strong>{log.pengguna}</strong></span>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                      <span>{log.waktu}</span>
                      <span>{log.ip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}