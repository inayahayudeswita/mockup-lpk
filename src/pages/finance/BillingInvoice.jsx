import React, { useState } from 'react';

const invoices = [
  { id: 'INV-2025-001', siswa: 'Ahmad Fauzi', program: 'Magang Jepang', jumlah: 25000000, status: 'Lunas', tanggal: '2025-01-10', jatuhTempo: '2025-01-15', metode: 'Transfer Bank' },
  { id: 'INV-2025-002', siswa: 'Siti Rahayu', program: 'Tokutei Ginou', jumlah: 32000000, status: 'Sebagian', tanggal: '2025-01-18', jatuhTempo: '2025-02-01', metode: 'Virtual Account' },
  { id: 'INV-2025-003', siswa: 'Budi Santoso', program: 'SSW', jumlah: 28500000, status: 'Belum Bayar', tanggal: '2025-01-25', jatuhTempo: '2025-02-10', metode: '-' },
  { id: 'INV-2025-004', siswa: 'Dewi Lestari', program: 'Magang Jepang', jumlah: 25000000, status: 'Lunas', tanggal: '2025-02-01', jatuhTempo: '2025-02-05', metode: 'Transfer Bank' },
  { id: 'INV-2025-005', siswa: 'Rizki Pratama', program: 'Tokutei Ginou', jumlah: 32000000, status: 'Jatuh Tempo', tanggal: '2025-01-05', jatuhTempo: '2025-01-20', metode: '-' },
  { id: 'INV-2025-006', siswa: 'Nurul Hidayah', program: 'SSW', jumlah: 28500000, status: 'Lunas', tanggal: '2025-02-08', jatuhTempo: '2025-02-15', metode: 'Virtual Account' },
  { id: 'INV-2025-007', siswa: 'Hendra Wijaya', program: 'Magang Jepang', jumlah: 25000000, status: 'Sebagian', tanggal: '2025-02-10', jatuhTempo: '2025-02-25', metode: 'Transfer Bank' },
  { id: 'INV-2025-008', siswa: 'Rina Kusuma', program: 'Tokutei Ginou', jumlah: 32000000, status: 'Belum Bayar', tanggal: '2025-02-12', jatuhTempo: '2025-03-01', metode: '-' },
];

const statusColor = {
  'Lunas': 'bg-emerald-100 text-emerald-700',
  'Sebagian': 'bg-yellow-100 text-yellow-700',
  'Belum Bayar': 'bg-slate-100 text-slate-600',
  'Jatuh Tempo': 'bg-red-100 text-red-700',
};

const stats = [
  { label: 'Total Tagihan', value: 'Rp 228.000.000', sub: '8 invoice', color: 'bg-blue-50 border-blue-200', icon: '🧾' },
  { label: 'Sudah Dibayar', value: 'Rp 107.500.000', sub: '3 lunas', color: 'bg-emerald-50 border-emerald-200', icon: '✅' },
  { label: 'Belum Lunas', value: 'Rp 120.500.000', sub: '5 invoice', color: 'bg-red-50 border-red-200', icon: '⚠️' },
  { label: 'Jatuh Tempo', value: 'Rp 32.000.000', sub: '1 invoice', color: 'bg-orange-50 border-orange-200', icon: '🔔' },
];

export default function BillingInvoice() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = invoices.filter(inv => {
    const matchSearch = inv.siswa.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || inv.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Billing & Invoice</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola tagihan dan pembayaran siswa SIMPEL-LPK</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <span>+ Buat Invoice</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-xl border p-4 ${s.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs text-gray-500 font-medium">{s.label}</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
          <input
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Cari nama siswa atau nomor invoice..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            {['Semua', 'Lunas', 'Sebagian', 'Belum Bayar', 'Jatuh Tempo'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 flex items-center gap-1">
            📥 Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">No. Invoice</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Siswa</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Jumlah</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Jatuh Tempo</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Metode</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-600 font-medium">{inv.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                        {inv.siswa.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{inv.siswa}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{inv.program}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {inv.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{inv.jatuhTempo}</td>
                  <td className="px-4 py-3 text-gray-500">{inv.metode}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-xs font-medium">Lihat</button>
                      <button className="text-gray-400 hover:text-gray-600 text-xs font-medium">Cetak</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Menampilkan {filtered.length} dari {invoices.length} invoice</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">‹ Prev</button>
            <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50">Next ›</button>
          </div>
        </div>
      </div>
    </div>
  );
}