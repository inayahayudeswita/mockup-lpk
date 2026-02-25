import React, { useState } from 'react';

const cashInData = [
  { id: 'CI-2025-001', tanggal: '2025-02-01', sumber: 'Ahmad Fauzi', keterangan: 'Pembayaran biaya pendidikan - Termin 1', kategori: 'Biaya Pendidikan', jumlah: 8000000, rekening: 'BCA - 1234567890', bukti: 'bukti_tf_001.pdf' },
  { id: 'CI-2025-002', tanggal: '2025-02-03', sumber: 'Dewi Lestari', keterangan: 'Pelunasan biaya pendidikan', kategori: 'Biaya Pendidikan', jumlah: 25000000, rekening: 'Mandiri - 0987654321', bukti: 'bukti_tf_002.pdf' },
  { id: 'CI-2025-003', tanggal: '2025-02-05', sumber: 'PT. Yamaha Motor Japan', keterangan: 'Fee penempatan - Batch Jan 2025 (5 orang)', kategori: 'Fee Penempatan', jumlah: 50000000, rekening: 'BNI - 1122334455', bukti: 'bukti_tf_003.pdf' },
  { id: 'CI-2025-004', tanggal: '2025-02-07', sumber: 'Nurul Hidayah', keterangan: 'Pembayaran biaya pendidikan - Termin 2', kategori: 'Biaya Pendidikan', jumlah: 10000000, rekening: 'BCA - 1234567890', bukti: 'bukti_tf_004.pdf' },
  { id: 'CI-2025-005', tanggal: '2025-02-08', sumber: 'Rizki Pratama', keterangan: 'Pembayaran uang muka pendidikan', kategori: 'Biaya Pendidikan', jumlah: 5000000, rekening: 'BRI - 5544332211', bukti: 'bukti_tf_005.pdf' },
  { id: 'CI-2025-006', tanggal: '2025-02-10', sumber: 'Kemnaker RI', keterangan: 'Subsidi pelatihan - Program G to G 2025', kategori: 'Subsidi/Hibah', jumlah: 75000000, rekening: 'BNI - 1122334455', bukti: 'bukti_tf_006.pdf' },
  { id: 'CI-2025-007', tanggal: '2025-02-12', sumber: 'Hendra Wijaya', keterangan: 'Cicilan biaya pendidikan ke-3', kategori: 'Biaya Pendidikan', jumlah: 7000000, rekening: 'BCA - 1234567890', bukti: 'bukti_tf_007.pdf' },
  { id: 'CI-2025-008', tanggal: '2025-02-14', sumber: 'Siti Rahayu', keterangan: 'Pembayaran biaya tes bahasa JLPT', kategori: 'Biaya Tes', jumlah: 1500000, rekening: 'Mandiri - 0987654321', bukti: 'bukti_tf_008.pdf' },
];

const kategoriColor = {
  'Biaya Pendidikan': 'bg-blue-100 text-blue-700',
  'Fee Penempatan': 'bg-purple-100 text-purple-700',
  'Subsidi/Hibah': 'bg-emerald-100 text-emerald-700',
  'Biaya Tes': 'bg-orange-100 text-orange-700',
};

const totalMasuk = cashInData.reduce((acc, c) => acc + c.jumlah, 0);

export default function CashIn() {
  const [search, setSearch] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filtered = cashInData.filter(c => {
    const matchSearch = c.sumber.toLowerCase().includes(search.toLowerCase()) || c.keterangan.toLowerCase().includes(search.toLowerCase());
    const matchKat = filterKategori === 'Semua' || c.kategori === filterKategori;
    return matchSearch && matchKat;
  });

  const totalFiltered = filtered.reduce((acc, c) => acc + c.jumlah, 0);

  const summaryByKat = ['Biaya Pendidikan', 'Fee Penempatan', 'Subsidi/Hibah', 'Biaya Tes'].map(kat => ({
    kat,
    total: cashInData.filter(c => c.kategori === kat).reduce((acc, c) => acc + c.jumlah, 0),
    count: cashInData.filter(c => c.kategori === kat).length,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cash In</h1>
          <p className="text-sm text-gray-500 mt-1">Pencatatan semua pemasukan keuangan LPK</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          + Tambah Cash In
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 col-span-2 lg:col-span-1">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Pemasukan (Feb 2025)</p>
          <p className="text-xl font-bold text-emerald-600">{totalMasuk.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-400 mt-1">{cashInData.length} transaksi</p>
        </div>
        {summaryByKat.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${kategoriColor[s.kat]}`}>{s.kat}</span>
            <p className="text-base font-bold text-gray-800">
              {s.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-400">{s.count} transaksi</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100">
          <input
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Cari sumber atau keterangan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
            value={filterKategori}
            onChange={e => setFilterKategori(e.target.value)}
          >
            {['Semua', 'Biaya Pendidikan', 'Fee Penempatan', 'Subsidi/Hibah', 'Biaya Tes'].map(k => (
              <option key={k}>{k}</option>
            ))}
          </select>
          <button className="text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">📥 Export</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sumber</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Keterangan</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Kategori</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Jumlah</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rekening</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Bukti</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-emerald-600 font-medium text-xs">{c.id}</td>
                  <td className="px-4 py-3 text-gray-600">{c.tanggal}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.sumber}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{c.keterangan}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${kategoriColor[c.kategori]}`}>{c.kategori}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">
                    +{c.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{c.rekening}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:underline text-xs">{c.bukti}</button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-xs font-medium">Edit</button>
                      <button className="text-red-400 hover:text-red-600 text-xs font-medium">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50">
                <td colSpan={5} className="px-4 py-3 text-sm font-bold text-gray-700">Total ({filtered.length} transaksi)</td>
                <td className="px-4 py-3 font-bold text-emerald-700">
                  +{totalFiltered.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                </td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}