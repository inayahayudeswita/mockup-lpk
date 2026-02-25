import React, { useState } from 'react';

const cashOutData = [
  { id: 'CO-2025-001', tanggal: '2025-02-02', penerima: 'PT. Garuda Travel', keterangan: 'Tiket pesawat keberangkatan batch Jan 2025 (6 pax)', kategori: 'Keberangkatan', jumlah: 36000000, rekening: 'BCA - 9876543210', status: 'Approved' },
  { id: 'CO-2025-002', tanggal: '2025-02-04', penerima: 'Klinik Sehat Sejahtera', keterangan: 'Medical check up 8 siswa batch Feb 2025', kategori: 'Medical', jumlah: 6400000, rekening: 'Mandiri - 5432109876', status: 'Approved' },
  { id: 'CO-2025-003', tanggal: '2025-02-05', penerima: 'Sensei Hiroshi Tanaka', keterangan: 'Honorarium instruktur bahasa Jepang - Januari 2025', kategori: 'Operasional', jumlah: 8500000, rekening: 'BNI - 6677889900', status: 'Approved' },
  { id: 'CO-2025-004', tanggal: '2025-02-06', penerima: 'Kantor Imigrasi', keterangan: 'Biaya pengurusan paspor 10 siswa', kategori: 'Dokumen', jumlah: 3500000, rekening: 'BRI - 1020304050', status: 'Pending' },
  { id: 'CO-2025-005', tanggal: '2025-02-07', penerima: 'PLN / Telkom', keterangan: 'Pembayaran listrik dan internet kantor Feb 2025', kategori: 'Utilitas', jumlah: 1200000, rekening: 'BCA - 9876543210', status: 'Approved' },
  { id: 'CO-2025-006', tanggal: '2025-02-09', penerima: 'Percetakan Maju Jaya', keterangan: 'Cetak modul pelatihan bahasa Jepang batch baru', kategori: 'Operasional', jumlah: 2300000, rekening: 'BNI - 6677889900', status: 'Approved' },
  { id: 'CO-2025-007', tanggal: '2025-02-11', penerima: 'PT. Asuransi Jiwa Raya', keterangan: 'Premi asuransi tenaga kerja ke luar negeri - 6 orang', kategori: 'Asuransi', jumlah: 4800000, rekening: 'Mandiri - 5432109876', status: 'Pending' },
  { id: 'CO-2025-008', tanggal: '2025-02-13', penerima: 'Toko Perlengkapan Kerja', keterangan: 'Seragam dan alat pelindung diri siswa batch Feb', kategori: 'Perlengkapan', jumlah: 5600000, rekening: 'BCA - 9876543210', status: 'Rejected' },
];

const kategoriColor = {
  'Keberangkatan': 'bg-blue-100 text-blue-700',
  'Medical': 'bg-pink-100 text-pink-700',
  'Operasional': 'bg-orange-100 text-orange-700',
  'Dokumen': 'bg-indigo-100 text-indigo-700',
  'Utilitas': 'bg-gray-100 text-gray-600',
  'Asuransi': 'bg-teal-100 text-teal-700',
  'Perlengkapan': 'bg-yellow-100 text-yellow-700',
};

const statusColor = {
  'Approved': 'bg-emerald-100 text-emerald-700',
  'Pending': 'bg-yellow-100 text-yellow-700',
  'Rejected': 'bg-red-100 text-red-700',
};

export default function CashOut() {
  const [search, setSearch] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = cashOutData.filter(c => {
    const matchSearch = c.penerima.toLowerCase().includes(search.toLowerCase()) || c.keterangan.toLowerCase().includes(search.toLowerCase());
    const matchKat = filterKategori === 'Semua' || c.kategori === filterKategori;
    const matchSt = filterStatus === 'Semua' || c.status === filterStatus;
    return matchSearch && matchKat && matchSt;
  });

  const totalApproved = cashOutData.filter(c => c.status === 'Approved').reduce((acc, c) => acc + c.jumlah, 0);
  const totalPending = cashOutData.filter(c => c.status === 'Pending').reduce((acc, c) => acc + c.jumlah, 0);
  const totalAll = cashOutData.reduce((acc, c) => acc + c.jumlah, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cash Out</h1>
          <p className="text-sm text-gray-500 mt-1">Pencatatan semua pengeluaran keuangan LPK</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Tambah Cash Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Pengeluaran</p>
          <p className="text-xl font-bold text-red-500">{totalAll.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-400">{cashOutData.length} transaksi</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Sudah Disetujui</p>
          <p className="text-xl font-bold text-emerald-600">{totalApproved.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-400">{cashOutData.filter(c => c.status === 'Approved').length} transaksi</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Menunggu Approval</p>
          <p className="text-xl font-bold text-yellow-600">{totalPending.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-400">{cashOutData.filter(c => c.status === 'Pending').length} transaksi</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
          <input
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="Cari penerima atau keterangan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filterKategori}
            onChange={e => setFilterKategori(e.target.value)}
          >
            {['Semua', ...Object.keys(kategoriColor)].map(k => <option key={k}>{k}</option>)}
          </select>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            {['Semua', 'Approved', 'Pending', 'Rejected'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Penerima</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Keterangan</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Kategori</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Jumlah</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-red-500 font-medium text-xs">{c.id}</td>
                  <td className="px-4 py-3 text-gray-600">{c.tanggal}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.penerima}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate" title={c.keterangan}>{c.keterangan}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${kategoriColor[c.kategori]}`}>{c.kategori}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-red-500">
                    -{c.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-xs font-medium">Detail</button>
                      {c.status === 'Pending' && <button className="text-emerald-500 hover:text-emerald-700 text-xs font-medium">Approve</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-red-50">
                <td colSpan={5} className="px-4 py-3 text-sm font-bold text-gray-700">Total Ditampilkan</td>
                <td className="px-4 py-3 font-bold text-red-600">
                  -{filtered.reduce((a, c) => a + c.jumlah, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}