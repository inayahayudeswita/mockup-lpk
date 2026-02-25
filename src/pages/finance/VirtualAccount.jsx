import React, { useState } from 'react';

const virtualAccounts = [
  { id: 'VA001', siswa: 'Ahmad Fauzi', program: 'Magang Jepang', noVA: '1234-0000-0001', bank: 'BCA', totalTagihan: 25000000, sudahBayar: 17000000, status: 'Aktif', expiredAt: '2025-06-30' },
  { id: 'VA002', siswa: 'Siti Rahayu', program: 'Tokutei Ginou', noVA: '1234-0000-0002', bank: 'BNI', totalTagihan: 32000000, sudahBayar: 16000000, status: 'Aktif', expiredAt: '2025-07-15' },
  { id: 'VA003', siswa: 'Budi Santoso', program: 'SSW', noVA: '1234-0000-0003', bank: 'Mandiri', totalTagihan: 28500000, sudahBayar: 0, status: 'Aktif', expiredAt: '2025-07-01' },
  { id: 'VA004', siswa: 'Dewi Lestari', program: 'Magang Jepang', noVA: '1234-0000-0004', bank: 'BCA', totalTagihan: 25000000, sudahBayar: 25000000, status: 'Lunas', expiredAt: '2025-05-30' },
  { id: 'VA005', siswa: 'Rizki Pratama', program: 'Tokutei Ginou', noVA: '1234-0000-0005', bank: 'BRI', totalTagihan: 32000000, sudahBayar: 5000000, status: 'Aktif', expiredAt: '2025-06-15' },
  { id: 'VA006', siswa: 'Nurul Hidayah', program: 'SSW', noVA: '1234-0000-0006', bank: 'BNI', totalTagihan: 28500000, sudahBayar: 28500000, status: 'Lunas', expiredAt: '2025-05-20' },
  { id: 'VA007', siswa: 'Hendra Wijaya', program: 'Magang Jepang', noVA: '1234-0000-0007', bank: 'Mandiri', totalTagihan: 25000000, sudahBayar: 21000000, status: 'Aktif', expiredAt: '2025-07-10' },
  { id: 'VA008', siswa: 'Rina Kusuma', program: 'Tokutei Ginou', noVA: '1234-0000-0008', bank: 'BCA', totalTagihan: 32000000, sudahBayar: 0, status: 'Expired', expiredAt: '2025-01-31' },
];

const transaksiVA = [
  { va: 'VA001', tanggal: '2025-01-10', jumlah: 8000000, keterangan: 'Pembayaran termin 1' },
  { va: 'VA001', tanggal: '2025-01-25', jumlah: 5000000, keterangan: 'Pembayaran termin 2' },
  { va: 'VA001', tanggal: '2025-02-10', jumlah: 4000000, keterangan: 'Pembayaran termin 3' },
  { va: 'VA002', tanggal: '2025-01-18', jumlah: 10000000, keterangan: 'Pembayaran termin 1' },
  { va: 'VA002', tanggal: '2025-02-05', jumlah: 6000000, keterangan: 'Pembayaran termin 2' },
  { va: 'VA004', tanggal: '2025-02-01', jumlah: 25000000, keterangan: 'Pelunasan penuh' },
];

const statusColor = {
  'Aktif': 'bg-blue-100 text-blue-700',
  'Lunas': 'bg-emerald-100 text-emerald-700',
  'Expired': 'bg-red-100 text-red-700',
};

const bankColor = {
  'BCA': 'bg-blue-600',
  'BNI': 'bg-orange-500',
  'Mandiri': 'bg-yellow-500',
  'BRI': 'bg-blue-800',
};

export default function VirtualAccount() {
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = virtualAccounts.filter(v =>
    filterStatus === 'Semua' || v.status === filterStatus
  );

  const selectedTx = selected ? transaksiVA.filter(t => t.va === selected.id) : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Virtual Account</h1>
          <p className="text-sm text-gray-500 mt-1">Manajemen VA pembayaran biaya pendidikan siswa</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Generate VA Baru
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">VA Aktif</p>
          <p className="text-2xl font-bold text-blue-600">{virtualAccounts.filter(v => v.status === 'Aktif').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Sudah Lunas</p>
          <p className="text-2xl font-bold text-emerald-600">{virtualAccounts.filter(v => v.status === 'Lunas').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">VA Expired</p>
          <p className="text-2xl font-bold text-red-500">{virtualAccounts.filter(v => v.status === 'Expired').length}</p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* VA List */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <p className="font-semibold text-gray-700 text-sm">Daftar Virtual Account</p>
            <select
              className="border border-gray-200 rounded-lg px-2 py-1 text-xs"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              {['Semua', 'Aktif', 'Lunas', 'Expired'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Siswa</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">No. VA</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bank</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tagihan</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Terbayar</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Progress</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((v) => {
                  const pct = Math.round((v.sudahBayar / v.totalTagihan) * 100);
                  return (
                    <tr key={v.id} className={`hover:bg-blue-50 transition-colors cursor-pointer ${selected?.id === v.id ? 'bg-blue-50' : ''}`} onClick={() => setSelected(v)}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{v.siswa.charAt(0)}</div>
                          <div>
                            <p className="font-medium text-gray-800 text-xs">{v.siswa}</p>
                            <p className="text-gray-400 text-xs">{v.program}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{v.noVA}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-white text-xs font-bold ${bankColor[v.bank]}`}>{v.bank}</span>
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-700">{(v.totalTagihan / 1000000).toFixed(0)}jt</td>
                      <td className="px-4 py-3 text-xs font-medium text-emerald-600">{(v.sudahBayar / 1000000).toFixed(0)}jt</td>
                      <td className="px-4 py-3 w-24">
                        <div className="flex items-center gap-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[v.status]}`}>{v.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-500 text-xs hover:underline">Detail</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-72 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-800 text-sm">Detail VA</p>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xs">✕ Tutup</button>
            </div>
            <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">{selected.siswa.charAt(0)}</div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{selected.siswa}</p>
                <p className="text-xs text-gray-500">{selected.program}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs"><span className="text-gray-500">No. VA</span><span className="font-mono font-semibold text-gray-800">{selected.noVA}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Bank</span><span className={`px-2 py-0.5 rounded text-white font-bold ${bankColor[selected.bank]}`}>{selected.bank}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Total Tagihan</span><span className="font-semibold text-gray-800">{selected.totalTagihan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Terbayar</span><span className="font-semibold text-emerald-600">{selected.sudahBayar.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Sisa</span><span className="font-semibold text-red-500">{(selected.totalTagihan - selected.sudahBayar).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">Berlaku s/d</span><span className="text-gray-700">{selected.expiredAt}</span></div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Riwayat Pembayaran</p>
              {selectedTx.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">Belum ada pembayaran</p>
              ) : (
                <div className="space-y-2">
                  {selectedTx.map((t, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs font-medium text-gray-700">{t.keterangan}</p>
                        <p className="text-xs text-gray-400">{t.tanggal}</p>
                      </div>
                      <p className="text-xs font-bold text-emerald-600">+{(t.jumlah / 1000000).toFixed(0)}jt</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}