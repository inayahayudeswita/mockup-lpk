import React, { useState } from 'react';

const pengajuanData = [
  { id: 'APD-2025-001', jenisDokumen: 'Surat Pernyataan Kesanggupan Siswa', pengaju: 'Ahmad Fauzi', batch: 'Jan 2025', program: 'Magang Jepang', tanggal: '2025-02-01', file: 'surat_kesanggupan_ahmad.pdf', status: 'Menunggu', catatan: '', prioritas: 'Tinggi' },
  { id: 'APD-2025-002', jenisDokumen: 'Formulir Data Pribadi Lengkap', pengaju: 'Siti Rahayu', batch: 'Jan 2025', program: 'Tokutei Ginou', tanggal: '2025-02-02', file: 'form_pribadi_siti.pdf', status: 'Disetujui', catatan: 'Dokumen lengkap dan valid', prioritas: 'Normal' },
  { id: 'APD-2025-003', jenisDokumen: 'Copy Ijazah Terlegalisir', pengaju: 'Budi Santoso', batch: 'Feb 2025', program: 'SSW', tanggal: '2025-02-03', file: 'ijazah_budi.pdf', status: 'Revisi', catatan: 'Legalisir belum dari sekolah asal, harap perbaiki', prioritas: 'Normal' },
  { id: 'APD-2025-004', jenisDokumen: 'Surat Izin Orang Tua/Wali', pengaju: 'Dewi Lestari', batch: 'Jan 2025', program: 'Magang Jepang', tanggal: '2025-02-04', file: 'izin_ortu_dewi.pdf', status: 'Disetujui', catatan: '', prioritas: 'Tinggi' },
  { id: 'APD-2025-005', jenisDokumen: 'Hasil Medical Check Up', pengaju: 'Rizki Pratama', batch: 'Feb 2025', program: 'Tokutei Ginou', tanggal: '2025-02-05', file: 'mcu_rizki.pdf', status: 'Menunggu', catatan: '', prioritas: 'Tinggi' },
  { id: 'APD-2025-006', jenisDokumen: 'SKCK (Surat Keterangan Catatan Kepolisian)', pengaju: 'Nurul Hidayah', batch: 'Jan 2025', program: 'SSW', tanggal: '2025-02-06', file: 'skck_nurul.pdf', status: 'Disetujui', catatan: '', prioritas: 'Normal' },
  { id: 'APD-2025-007', jenisDokumen: 'Paspor (Scan Semua Halaman)', pengaju: 'Hendra Wijaya', batch: 'Feb 2025', program: 'Magang Jepang', tanggal: '2025-02-07', file: 'paspor_hendra.pdf', status: 'Menunggu', catatan: '', prioritas: 'Normal' },
  { id: 'APD-2025-008', jenisDokumen: 'Copy KTP & KK', pengaju: 'Rina Kusuma', batch: 'Feb 2025', program: 'Tokutei Ginou', tanggal: '2025-02-08', file: 'ktp_kk_rina.pdf', status: 'Revisi', catatan: 'KK belum terbaru, minta update dari kelurahan', prioritas: 'Normal' },
];

const statusColor = {
  'Disetujui': 'bg-emerald-100 text-emerald-700',
  'Menunggu': 'bg-yellow-100 text-yellow-700',
  'Revisi': 'bg-orange-100 text-orange-700',
  'Ditolak': 'bg-red-100 text-red-700',
};

const prioritasColor = {
  'Tinggi': 'bg-red-100 text-red-600',
  'Normal': 'bg-blue-100 text-blue-600',
};

export default function ApprovalDokumen() {
  const [tab, setTab] = useState('menunggu');
  const [catatanModal, setCatatanModal] = useState(null);
  const [inputCatatan, setInputCatatan] = useState('');

  const menunggu = pengajuanData.filter(d => d.status === 'Menunggu');
  const disetujui = pengajuanData.filter(d => d.status === 'Disetujui');
  const revisi = pengajuanData.filter(d => d.status === 'Revisi');
  const ditolak = pengajuanData.filter(d => d.status === 'Ditolak');

  const dataByTab = { menunggu, disetujui, revisi, ditolak };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Approval Dokumen</h1>
          <p className="text-sm text-gray-500 mt-1">Review dan validasi dokumen yang diunggah siswa</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Menunggu Review', val: menunggu.length, color: 'text-yellow-600', bg: 'border-yellow-300' },
          { label: 'Disetujui', val: disetujui.length, color: 'text-emerald-600', bg: 'border-emerald-300' },
          { label: 'Perlu Revisi', val: revisi.length, color: 'text-orange-500', bg: 'border-orange-300' },
          { label: 'Ditolak', val: ditolak.length, color: 'text-red-500', bg: 'border-red-300' },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-xl border-l-4 border border-gray-200 ${s.bg} p-4`}>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-white rounded-xl border border-gray-200 p-1 w-fit">
        {[
          { key: 'menunggu', label: `⏳ Menunggu (${menunggu.length})` },
          { key: 'disetujui', label: `✅ Disetujui (${disetujui.length})` },
          { key: 'revisi', label: `📝 Revisi (${revisi.length})` },
          { key: 'ditolak', label: `❌ Ditolak (${ditolak.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${tab === t.key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {(dataByTab[tab] || []).map(d => (
          <div key={d.id} className={`bg-white rounded-xl border shadow-sm p-5 ${d.status === 'Revisi' ? 'border-orange-200' : 'border-gray-200'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg flex-shrink-0">
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{d.jenisDokumen}</span>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${prioritasColor[d.prioritas]}`}>{d.prioritas}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>👤 {d.pengaju}</span>
                    <span>📋 {d.program}</span>
                    <span>🗓️ Batch {d.batch}</span>
                    <span>📅 {d.tanggal}</span>
                  </div>
                  {d.catatan && (
                    <div className="mt-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                      <p className="text-xs text-orange-700 font-medium">📝 Catatan: {d.catatan}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[d.status]}`}>{d.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <button className="text-blue-500 text-xs font-medium flex items-center gap-1 hover:text-blue-700">
                📄 {d.file}
              </button>
              {tab === 'menunggu' && (
                <div className="flex gap-2">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors">
                    ✅ Setujui
                  </button>
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                    onClick={() => setCatatanModal(d)}
                  >
                    📝 Minta Revisi
                  </button>
                  <button className="bg-red-400 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors">
                    ❌ Tolak
                  </button>
                </div>
              )}
              {tab === 'revisi' && (
                <button className="text-orange-500 text-xs font-medium hover:text-orange-700">
                  🔔 Kirim Notif ke Siswa
                </button>
              )}
            </div>
          </div>
        ))}

        {(dataByTab[tab] || []).length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500 font-medium">Tidak ada dokumen di kategori ini</p>
          </div>
        )}
      </div>

      {/* Modal Revisi */}
      {catatanModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="font-bold text-gray-800 mb-2">Minta Revisi Dokumen</h2>
            <p className="text-sm text-gray-500 mb-4">{catatanModal.jenisDokumen} — {catatanModal.pengaju}</p>
            <label className="block text-xs font-medium text-gray-600 mb-2">Keterangan Revisi</label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              rows={4}
              placeholder="Jelaskan apa yang perlu diperbaiki siswa..."
              value={inputCatatan}
              onChange={e => setInputCatatan(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-orange-500 text-white text-sm py-2 rounded-lg hover:bg-orange-600">Kirim Permintaan Revisi</button>
              <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg" onClick={() => setCatatanModal(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}