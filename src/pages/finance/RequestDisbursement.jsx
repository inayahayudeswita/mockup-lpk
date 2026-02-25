import React, { useState } from 'react';

const disbursements = [
  { id: 'RD-2025-001', pengaju: 'Bagian Akademik', keperluan: 'Pengadaan modul bahasa Jepang N5 untuk batch Feb 2025', jumlah: 3500000, tanggal: '2025-02-01', prioritas: 'Normal', status: 'Disetujui', approvedBy: 'Direktur Keuangan', catatan: '' },
  { id: 'RD-2025-002', pengaju: 'Bagian Penyaluran', keperluan: 'Biaya pengurusan visa TKI 8 orang batch Jan 2025', jumlah: 12000000, tanggal: '2025-02-03', prioritas: 'Tinggi', status: 'Disetujui', approvedBy: 'Direktur Keuangan', catatan: '' },
  { id: 'RD-2025-003', pengaju: 'Admin Operasional', keperluan: 'Pembelian ATK & perlengkapan kantor Q1 2025', jumlah: 2200000, tanggal: '2025-02-05', prioritas: 'Normal', status: 'Menunggu', approvedBy: '-', catatan: '' },
  { id: 'RD-2025-004', pengaju: 'Bagian Medis', keperluan: 'MCU (Medical Check Up) calon peserta batch Feb (10 orang)', jumlah: 8000000, tanggal: '2025-02-06', prioritas: 'Tinggi', status: 'Menunggu', approvedBy: '-', catatan: '' },
  { id: 'RD-2025-005', pengaju: 'HR & Instruktur', keperluan: 'Honorarium Sensei Tanaka & Sensei Yamamoto - Januari 2025', jumlah: 17000000, tanggal: '2025-02-07', prioritas: 'Normal', status: 'Disetujui', approvedBy: 'Manajer HR', catatan: '' },
  { id: 'RD-2025-006', pengaju: 'IT & Sistem', keperluan: 'Perpanjangan lisensi software LMS dan tools akademik', jumlah: 5500000, tanggal: '2025-02-08', prioritas: 'Rendah', status: 'Ditolak', approvedBy: 'Direktur Keuangan', catatan: 'Anggaran Q1 sudah habis, ajukan ulang bulan depan' },
  { id: 'RD-2025-007', pengaju: 'Bagian Penyaluran', keperluan: 'Biaya pemberangkatan 6 peserta ke bandara Soetta + akomodasi', jumlah: 9000000, tanggal: '2025-02-10', prioritas: 'Tinggi', status: 'Menunggu', approvedBy: '-', catatan: '' },
  { id: 'RD-2025-008', pengaju: 'Admin Operasional', keperluan: 'Perbaikan AC ruang kelas lantai 2', jumlah: 3000000, tanggal: '2025-02-12', prioritas: 'Normal', status: 'Menunggu', approvedBy: '-', catatan: '' },
];

const statusColor = {
  'Disetujui': 'bg-emerald-100 text-emerald-700',
  'Menunggu': 'bg-yellow-100 text-yellow-700',
  'Ditolak': 'bg-red-100 text-red-700',
};

const prioritasColor = {
  'Tinggi': 'bg-red-100 text-red-600',
  'Normal': 'bg-blue-100 text-blue-600',
  'Rendah': 'bg-gray-100 text-gray-500',
};

export default function RequestDisbursement() {
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [form, setForm] = useState({ keperluan: '', jumlah: '', prioritas: 'Normal', catatan: '' });

  const filtered = disbursements.filter(d => filterStatus === 'Semua' || d.status === filterStatus);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Request Disbursement</h1>
          <p className="text-sm text-gray-500 mt-1">Pengajuan pencairan dana operasional LPK</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          + Buat Request
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4 text-sm">Form Pengajuan Disbursement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Keperluan / Deskripsi</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Jelaskan keperluan pencairan dana..."
                value={form.keperluan}
                onChange={e => setForm({ ...form, keperluan: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Jumlah (Rp)</label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="0"
                value={form.jumlah}
                onChange={e => setForm({ ...form, jumlah: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Prioritas</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={form.prioritas}
                onChange={e => setForm({ ...form, prioritas: e.target.value })}
              >
                {['Tinggi', 'Normal', 'Rendah'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Upload Dokumen Pendukung</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-400">
                📎 Klik untuk upload atau drag & drop file (PDF, JPG, PNG)
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Catatan Tambahan</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={2}
                placeholder="Catatan opsional..."
                value={form.catatan}
                onChange={e => setForm({ ...form, catatan: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Kirim Request</button>
            <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50" onClick={() => setShowForm(false)}>Batal</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Request', count: disbursements.length, amount: disbursements.reduce((a, d) => a + d.jumlah, 0), color: 'text-gray-800' },
          { label: 'Menunggu Approval', count: disbursements.filter(d => d.status === 'Menunggu').length, amount: disbursements.filter(d => d.status === 'Menunggu').reduce((a, d) => a + d.jumlah, 0), color: 'text-yellow-600' },
          { label: 'Disetujui', count: disbursements.filter(d => d.status === 'Disetujui').length, amount: disbursements.filter(d => d.status === 'Disetujui').reduce((a, d) => a + d.jumlah, 0), color: 'text-emerald-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.count} request</p>
            <p className="text-xs text-gray-400">{s.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Daftar Request</p>
          <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            {['Semua', 'Menunggu', 'Disetujui', 'Ditolak'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Pengaju</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Keperluan</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Prioritas</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Jumlah</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Diproses Oleh</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600 text-xs font-medium">{d.id}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{d.tanggal}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 text-xs">{d.pengaju}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs" style={{ maxWidth: 220 }}>
                    <p className="truncate text-xs">{d.keperluan}</p>
                    {d.catatan && <p className="text-xs text-red-400 mt-0.5 italic">{d.catatan}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${prioritasColor[d.prioritas]}`}>{d.prioritas}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{d.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{d.approvedBy}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:text-blue-700 text-xs font-medium">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}