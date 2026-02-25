import React, { useState } from 'react';

const requests = [
  { id: 'RD-2025-003', pengaju: 'Admin Operasional', keperluan: 'Pembelian ATK & perlengkapan kantor Q1 2025', jumlah: 2200000, tanggal: '2025-02-05', prioritas: 'Normal', dokumen: 'rab_atk_q1.pdf', status: 'Menunggu' },
  { id: 'RD-2025-004', pengaju: 'Bagian Medis', keperluan: 'MCU (Medical Check Up) calon peserta batch Feb (10 orang)', jumlah: 8000000, tanggal: '2025-02-06', prioritas: 'Tinggi', dokumen: 'rab_mcu_feb.pdf', status: 'Menunggu' },
  { id: 'RD-2025-007', pengaju: 'Bagian Penyaluran', keperluan: 'Biaya pemberangkatan 6 peserta ke bandara Soetta + akomodasi', jumlah: 9000000, tanggal: '2025-02-10', prioritas: 'Tinggi', dokumen: 'bukti_tiket_hotel.pdf', status: 'Menunggu' },
  { id: 'RD-2025-008', pengaju: 'Admin Operasional', keperluan: 'Perbaikan AC ruang kelas lantai 2', jumlah: 3000000, tanggal: '2025-02-12', prioritas: 'Normal', dokumen: 'penawaran_teknisi.pdf', status: 'Menunggu' },
];

const approved = [
  { id: 'RD-2025-001', pengaju: 'Bagian Akademik', keperluan: 'Pengadaan modul bahasa Jepang N5', jumlah: 3500000, tanggal: '2025-02-01', prioritas: 'Normal', status: 'Disetujui', approvedAt: '2025-02-02' },
  { id: 'RD-2025-002', pengaju: 'Bagian Penyaluran', keperluan: 'Biaya pengurusan visa TKI 8 orang', jumlah: 12000000, tanggal: '2025-02-03', prioritas: 'Tinggi', status: 'Disetujui', approvedAt: '2025-02-04' },
  { id: 'RD-2025-005', pengaju: 'HR & Instruktur', keperluan: 'Honorarium Sensei Tanaka & Yamamoto - Jan 2025', jumlah: 17000000, tanggal: '2025-02-07', prioritas: 'Normal', status: 'Disetujui', approvedAt: '2025-02-08' },
];

const rejected = [
  { id: 'RD-2025-006', pengaju: 'IT & Sistem', keperluan: 'Perpanjangan lisensi software LMS', jumlah: 5500000, tanggal: '2025-02-08', prioritas: 'Rendah', status: 'Ditolak', rejectedAt: '2025-02-09', alasan: 'Anggaran Q1 habis, ajukan bulan depan' },
];

const prioritasColor = {
  'Tinggi': 'bg-red-100 text-red-600',
  'Normal': 'bg-blue-100 text-blue-600',
  'Rendah': 'bg-gray-100 text-gray-500',
};

export default function ApprovalDisbursement() {
  const [tab, setTab] = useState('pending');
  const [selectedId, setSelectedId] = useState(null);
  const [alasanTolak, setAlasanTolak] = useState('');
  const [showTolakForm, setShowTolakForm] = useState(null);

  const selectedReq = requests.find(r => r.id === selectedId);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Approval Disbursement</h1>
        <p className="text-sm text-gray-500 mt-1">Review dan setujui pengajuan pencairan dana</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border-l-4 border-yellow-400 border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Menunggu Review</p>
          <p className="text-2xl font-bold text-yellow-600">{requests.length}</p>
          <p className="text-xs text-gray-400">{requests.reduce((a, r) => a + r.jumlah, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-white rounded-xl border-l-4 border-emerald-400 border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Disetujui Bulan Ini</p>
          <p className="text-2xl font-bold text-emerald-600">{approved.length}</p>
          <p className="text-xs text-gray-400">{approved.reduce((a, r) => a + r.jumlah, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-white rounded-xl border-l-4 border-red-400 border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Ditolak</p>
          <p className="text-2xl font-bold text-red-500">{rejected.length}</p>
          <p className="text-xs text-gray-400">{rejected.reduce((a, r) => a + r.jumlah, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-white rounded-xl border border-gray-200 p-1 w-fit">
        {[
          { key: 'pending', label: `⏳ Menunggu (${requests.length})` },
          { key: 'approved', label: `✅ Disetujui (${approved.length})` },
          { key: 'rejected', label: `❌ Ditolak (${rejected.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Pending Tab */}
      {tab === 'pending' && (
        <div className="space-y-4">
          {requests.map(req => (
            <div key={req.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-sm">
                    💰
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-blue-600 font-medium">{req.id}</span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${prioritasColor[req.prioritas]}`}>{req.prioritas}</span>
                    </div>
                    <p className="font-semibold text-gray-800">{req.keperluan}</p>
                    <p className="text-sm text-gray-500 mt-0.5">Diajukan oleh: <strong>{req.pengaju}</strong> · {req.tanggal}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800">{req.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
                  <button className="text-blue-500 text-xs hover:underline mt-1">📄 {req.dokumen}</button>
                </div>
              </div>

              {showTolakForm === req.id && (
                <div className="bg-red-50 rounded-lg p-3 mb-3">
                  <p className="text-xs font-medium text-red-700 mb-2">Alasan Penolakan</p>
                  <textarea
                    className="w-full border border-red-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
                    rows={2}
                    placeholder="Jelaskan alasan penolakan..."
                    value={alasanTolak}
                    onChange={e => setAlasanTolak(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-600">Konfirmasi Tolak</button>
                    <button className="text-gray-500 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100" onClick={() => setShowTolakForm(null)}>Batal</button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">
                  ✅ Setujui
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => setShowTolakForm(showTolakForm === req.id ? null : req.id)}
                >
                  ❌ Tolak
                </button>
                <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50">Lihat Detail</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Approved Tab */}
      {tab === 'approved' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Pengaju</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Keperluan</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Jumlah</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal Disetujui</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {approved.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-blue-600">{a.id}</td>
                  <td className="px-4 py-3 text-gray-700">{a.pengaju}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{a.keperluan}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">{a.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
                  <td className="px-4 py-3 text-gray-500">{a.approvedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejected Tab */}
      {tab === 'rejected' && (
        <div className="space-y-4">
          {rejected.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-red-200 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs text-blue-600">{r.id}</span>
                  <p className="font-semibold text-gray-800 mt-1">{r.keperluan}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{r.pengaju} · {r.tanggal}</p>
                  <div className="mt-2 bg-red-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-red-600 font-medium">Alasan: {r.alasan}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-500 line-through">{r.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}