import React, { useState } from 'react';

const pengajuanData = [
  { id: 'APK-001', kandidat: 'Fajar Nugroho', foto: 'FN', program: 'Magang Jepang', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', posisi: 'Operator Produksi', diajukanOleh: 'Admin Penyaluran', tanggal: '2025-02-08', skorKesesuaian: 94, alasanMatch: 'Nilai bahasa N5 cukup, pengalaman manufaktur sesuai, fisik lulus', status: 'Menunggu' },
  { id: 'APK-002', kandidat: 'Mira Agustina', foto: 'MA', program: 'Tokutei Ginou', perusahaan: 'Panasonic Corp.', prefektur: 'Osaka', posisi: 'Operator Elektronik', diajukanOleh: 'Admin Penyaluran', tanggal: '2025-02-08', skorKesesuaian: 97, alasanMatch: 'Nilai N4 sangat baik, pengalaman manufaktur 1 tahun relevan, semua tes lulus', status: 'Menunggu' },
  { id: 'APK-003', kandidat: 'Rendi Pratama', foto: 'RP', program: 'SSW', perusahaan: 'Toyota Housing Corp.', prefektur: 'Aichi', posisi: 'Pekerja Konstruksi', diajukanOleh: 'Admin Penyaluran', tanggal: '2025-02-09', skorKesesuaian: 91, alasanMatch: 'Level N3, pengalaman konstruksi 1 tahun, nilai teknis sangat tinggi', status: 'Menunggu' },
  { id: 'APK-004', kandidat: 'Doni Setiawan', foto: 'DS', program: 'SSW', perusahaan: 'Mitsubishi Electric', prefektur: 'Tokyo', posisi: 'Teknisi Elektronik', diajukanOleh: 'Admin Penyaluran', tanggal: '2025-02-07', skorKesesuaian: 98, alasanMatch: 'Level N3 terbaik di batch, pengalaman 2 tahun teknisi, semua nilai di atas 90', status: 'Disetujui', approvedBy: 'Direktur Penyaluran', approvedAt: '2025-02-08' },
  { id: 'APK-005', kandidat: 'Hadi Kurniawan', foto: 'HK', program: 'Tokutei Ginou', perusahaan: 'Honda Motor Co., Ltd.', prefektur: 'Saitama', posisi: 'Mekanik Otomotif', diajukanOleh: 'Admin Penyaluran', tanggal: '2025-02-06', skorKesesuaian: 88, alasanMatch: 'Pengalaman 3 tahun mekanik sangat relevan, nilai N4 baik, psikologi perlu konfirmasi', status: 'Revisi', catatanRevisi: 'Perlu konfirmasi hasil psikologi dulu sebelum diajukan ke perusahaan', approvedBy: 'Direktur Penyaluran' },
  { id: 'APK-006', kandidat: 'Lia Permata', foto: 'LP', program: 'Magang Jepang', perusahaan: 'JA Zen-Noh Farm', prefektur: 'Hokkaido', posisi: 'Pekerja Pertanian', diajukanOleh: 'Admin Penyaluran', tanggal: '2025-02-10', skorKesesuaian: 82, alasanMatch: 'Minat pertanian kuat, nilai N5 cukup, fisik lulus, siap untuk magang pertanian', status: 'Menunggu' },
];

const statusColor = {
  'Menunggu': 'bg-yellow-100 text-yellow-700',
  'Disetujui': 'bg-emerald-100 text-emerald-700',
  'Revisi': 'bg-orange-100 text-orange-700',
  'Ditolak': 'bg-red-100 text-red-700',
};

function ScoreBadge({ score }) {
  const color = score >= 95 ? 'bg-emerald-500' : score >= 88 ? 'bg-blue-500' : score >= 80 ? 'bg-yellow-500' : 'bg-red-400';
  return (
    <div className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
      {score}%
    </div>
  );
}

export default function ApprovalKandidat() {
  const [tab, setTab] = useState('menunggu');
  const [catatanModal, setCatatanModal] = useState(null);
  const [catatan, setCatatan] = useState('');

  const menunggu = pengajuanData.filter(d => d.status === 'Menunggu');
  const disetujui = pengajuanData.filter(d => d.status === 'Disetujui');
  const revisi = pengajuanData.filter(d => d.status === 'Revisi');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Approval Kandidat</h1>
        <p className="text-sm text-gray-500 mt-1">Review dan setujui pengajuan matching kandidat ke perusahaan Jepang</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Menunggu Approval</p>
          <p className="text-3xl font-bold text-yellow-600">{menunggu.length}</p>
          <p className="text-xs text-gray-400">kandidat perlu direview</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Disetujui</p>
          <p className="text-3xl font-bold text-emerald-600">{disetujui.length}</p>
          <p className="text-xs text-gray-400">siap interview</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Perlu Revisi</p>
          <p className="text-3xl font-bold text-orange-500">{revisi.length}</p>
          <p className="text-xs text-gray-400">perlu perbaikan</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white rounded-xl border border-gray-200 p-1 w-fit">
        {[
          { key: 'menunggu', label: `⏳ Menunggu (${menunggu.length})` },
          { key: 'disetujui', label: `✅ Disetujui (${disetujui.length})` },
          { key: 'revisi', label: `📝 Revisi (${revisi.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{t.label}</button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {(tab === 'menunggu' ? menunggu : tab === 'disetujui' ? disetujui : revisi).map(d => (
          <div key={d.id} className={`bg-white rounded-xl border shadow-sm p-5 ${d.status === 'Revisi' ? 'border-orange-200' : 'border-gray-200'}`}>
            <div className="flex items-start gap-4">
              <ScoreBadge score={d.skorKesesuaian} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-800">{d.kandidat}</p>
                      <span className="text-gray-400">→</span>
                      <p className="font-semibold text-blue-700">{d.perusahaan}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                      <span>📋 {d.program}</span>
                      <span>💼 {d.posisi}</span>
                      <span>🇯🇵 {d.prefektur}</span>
                      <span>📅 {d.tanggal}</span>
                    </div>
                  </div>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColor[d.status]}`}>{d.status}</span>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                  <p className="text-xs font-medium text-blue-700 mb-1">📊 Alasan Kesesuaian (Skor: {d.skorKesesuaian}%)</p>
                  <p className="text-xs text-blue-600">{d.alasanMatch}</p>
                </div>

                {d.catatanRevisi && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
                    <p className="text-xs font-medium text-orange-700">📝 Catatan Revisi: {d.catatanRevisi}</p>
                  </div>
                )}

                {d.status === 'Disetujui' && (
                  <p className="text-xs text-emerald-600 font-medium">✅ Disetujui oleh {d.approvedBy} pada {d.approvedAt}</p>
                )}

                {d.status === 'Menunggu' && (
                  <div className="flex gap-2 pt-3 border-t border-gray-100 mt-3">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg font-medium">✅ Setujui & Jadwalkan Interview</button>
                    <button className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-4 py-2 rounded-lg font-medium" onClick={() => setCatatanModal(d)}>📝 Minta Revisi</button>
                    <button className="bg-red-400 hover:bg-red-500 text-white text-xs px-4 py-2 rounded-lg font-medium">❌ Tolak</button>
                    <button className="border border-gray-200 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50">👤 Lihat Profil Lengkap</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {(tab === 'menunggu' ? menunggu : tab === 'disetujui' ? disetujui : revisi).length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500">Tidak ada data di kategori ini</p>
          </div>
        )}
      </div>

      {/* Catatan Modal */}
      {catatanModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="font-bold text-gray-800 mb-1">Minta Revisi</h2>
            <p className="text-sm text-gray-500 mb-4">{catatanModal.kandidat} → {catatanModal.perusahaan}</p>
            <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" rows={4} placeholder="Jelaskan revisi yang diperlukan..." value={catatan} onChange={e => setCatatan(e.target.value)} />
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-orange-500 text-white text-sm py-2 rounded-lg hover:bg-orange-600">Kirim</button>
              <button className="border border-gray-200 text-sm px-4 py-2 rounded-lg text-gray-600" onClick={() => setCatatanModal(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}