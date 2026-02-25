import React, { useState } from 'react';

const dummyData = [
  { id: 1, kode: 'FY2023', nama: 'Tahun Fiskal 2023', mulai: '2023-01-01', selesai: '2023-12-31', status: 'Tutup', periodeAktif: null },
  { id: 2, kode: 'FY2024-Q1', nama: 'Kuartal 1 - 2024', mulai: '2024-01-01', selesai: '2024-03-31', status: 'Tutup', periodeAktif: null },
  { id: 3, kode: 'FY2024-Q2', nama: 'Kuartal 2 - 2024', mulai: '2024-04-01', selesai: '2024-06-30', status: 'Tutup', periodeAktif: null },
  { id: 4, kode: 'FY2024-Q3', nama: 'Kuartal 3 - 2024', mulai: '2024-07-01', selesai: '2024-09-30', status: 'Tutup', periodeAktif: null },
  { id: 5, kode: 'FY2024-Q4', nama: 'Kuartal 4 - 2024', mulai: '2024-10-01', selesai: '2024-12-31', status: 'Tutup', periodeAktif: null },
  { id: 6, kode: 'FY2025-Q1', nama: 'Kuartal 1 - 2025', mulai: '2025-01-01', selesai: '2025-03-31', status: 'Buka', periodeAktif: true },
  { id: 7, kode: 'FY2025-Q2', nama: 'Kuartal 2 - 2025', mulai: '2025-04-01', selesai: '2025-06-30', status: 'Draft', periodeAktif: null },
  { id: 8, kode: 'FY2025-Q3', nama: 'Kuartal 3 - 2025', mulai: '2025-07-01', selesai: '2025-09-30', status: 'Draft', periodeAktif: null },
];

const statusColor = { 'Tutup': 'bg-gray-100 text-gray-600', 'Buka': 'bg-green-100 text-green-700', 'Draft': 'bg-yellow-100 text-yellow-700' };

export default function FiscalPeriod() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fiscal Period</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola periode fiskal untuk laporan keuangan</p>
        </div>
        <button onClick={() => { setSelected(null); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Periode
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 border-l-4 border-l-green-500">
          <p className="text-xs text-gray-500">Periode Aktif</p>
          <p className="text-lg font-bold text-green-600 mt-1">Kuartal 1 - 2025</p>
          <p className="text-xs text-gray-400 mt-0.5">1 Jan – 31 Mar 2025</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Periode</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{dummyData.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Periode Tutup</p>
          <p className="text-2xl font-bold text-gray-600 mt-1">{dummyData.filter(d => d.status === 'Tutup').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Daftar Periode Fiskal</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Nama Periode</th>
              <th className="px-4 py-3">Tanggal Mulai</th>
              <th className="px-4 py-3">Tanggal Selesai</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(row => (
              <tr key={row.id} className={`border-b border-gray-50 hover:bg-gray-50 ${row.periodeAktif ? 'bg-green-50/30' : ''}`}>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.kode}</td>
                <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                  {row.periodeAktif && <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />}
                  {row.nama}
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{row.mulai}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{row.selesai}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[row.status]}`}>{row.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => { setSelected(row); setShowModal(true); }} className="text-blue-500 hover:text-blue-700 text-xs mr-2">Edit</button>
                  {row.status === 'Buka' && <button className="text-orange-500 hover:text-orange-700 text-xs mr-2">Tutup</button>}
                  {row.status === 'Draft' && <button className="text-green-500 hover:text-green-700 text-xs">Buka</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{selected ? 'Edit Periode' : 'Tambah Periode Fiskal'}</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500 font-medium">Kode</label>
                <input defaultValue={selected?.kode || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Nama Periode</label>
                <input defaultValue={selected?.nama || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-gray-500 font-medium">Mulai</label>
                  <input type="date" defaultValue={selected?.mulai || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
                <div><label className="text-xs text-gray-500 font-medium">Selesai</label>
                  <input type="date" defaultValue={selected?.selesai || ''} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}