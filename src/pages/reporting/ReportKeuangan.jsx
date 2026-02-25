import React, { useState } from 'react';

const bulanData = [
  { bulan: 'Agt 2024', pemasukan: 45000000, pengeluaran: 32000000 },
  { bulan: 'Sep 2024', pemasukan: 52000000, pengeluaran: 38000000 },
  { bulan: 'Okt 2024', pemasukan: 48000000, pengeluaran: 35000000 },
  { bulan: 'Nov 2024', pemasukan: 61000000, pengeluaran: 42000000 },
  { bulan: 'Des 2024', pemasukan: 75000000, pengeluaran: 58000000 },
  { bulan: 'Jan 2025', pemasukan: 83000000, pengeluaran: 61000000 },
  { bulan: 'Feb 2025', pemasukan: 68000000, pengeluaran: 47500000 },
];

const kategoriPemasukan = [
  { kategori: 'Biaya Pendidikan Siswa', jumlah: 182000000, persen: 43.5 },
  { kategori: 'Fee Penempatan Perusahaan', jumlah: 145000000, persen: 34.6 },
  { kategori: 'Subsidi / Hibah Pemerintah', jumlah: 75000000, persen: 17.9 },
  { kategori: 'Biaya Tes & Sertifikasi', jumlah: 17000000, persen: 4.0 },
];

const kategoriPengeluaran = [
  { kategori: 'Honorarium Instruktur', jumlah: 95000000, persen: 31.0 },
  { kategori: 'Biaya Keberangkatan TKI', jumlah: 88000000, persen: 28.7 },
  { kategori: 'Medical Check Up', jumlah: 42000000, persen: 13.7 },
  { kategori: 'Pengurusan Dokumen', jumlah: 38000000, persen: 12.4 },
  { kategori: 'Operasional Kantor', jumlah: 28000000, persen: 9.1 },
  { kategori: 'Lain-lain', jumlah: 16000000, persen: 5.1 },
];

const totalPemasukan = bulanData.reduce((a, b) => a + b.pemasukan, 0);
const totalPengeluaran = bulanData.reduce((a, b) => a + b.pengeluaran, 0);
const netProfit = totalPemasukan - totalPengeluaran;

const maxVal = Math.max(...bulanData.map(d => d.pemasukan));

export default function ReportKeuangan() {
  const [tab, setTab] = useState('ringkasan');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Keuangan</h1>
          <p className="text-sm text-gray-500 mt-1">Ringkasan keuangan LPK SIMPEL periode Agustus 2024 – Februari 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-200 bg-white text-gray-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-50">📄 PDF</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">📥 Excel</button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Total Pemasukan</p>
          <p className="text-2xl font-bold text-emerald-600">{(totalPemasukan / 1000000).toFixed(0)}jt</p>
          <p className="text-xs text-gray-400 mt-1">{bulanData.length} bulan terakhir</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Total Pengeluaran</p>
          <p className="text-2xl font-bold text-red-500">{(totalPengeluaran / 1000000).toFixed(0)}jt</p>
          <p className="text-xs text-gray-400 mt-1">{bulanData.length} bulan terakhir</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Net Profit</p>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{netProfit >= 0 ? '+' : ''}{(netProfit / 1000000).toFixed(0)}jt</p>
          <p className="text-xs text-gray-400 mt-1">Margin: {Math.round((netProfit / totalPemasukan) * 100)}%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white rounded-xl border border-gray-200 p-1 w-fit">
        {[['ringkasan', 'Ringkasan'], ['pemasukan', 'Pemasukan'], ['pengeluaran', 'Pengeluaran']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{label}</button>
        ))}
      </div>

      {/* Ringkasan Tab */}
      {tab === 'ringkasan' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Grafik Keuangan 7 Bulan Terakhir</h3>
          <div className="space-y-3">
            {bulanData.map(d => {
              const selisih = d.pemasukan - d.pengeluaran;
              return (
                <div key={d.bulan}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="font-medium text-gray-700 w-20">{d.bulan}</span>
                    <span className="text-emerald-600">+{(d.pemasukan / 1000000).toFixed(0)}jt</span>
                    <span className="text-red-500">-{(d.pengeluaran / 1000000).toFixed(0)}jt</span>
                    <span className={`font-bold ${selisih >= 0 ? 'text-blue-600' : 'text-red-600'}`}>={selisih >= 0 ? '+' : ''}{(selisih / 1000000).toFixed(0)}jt</span>
                  </div>
                  <div className="flex gap-1 h-4 rounded overflow-hidden">
                    <div className="bg-emerald-400 rounded-sm" style={{ width: `${(d.pemasukan / maxVal) * 60}%` }}></div>
                    <div className="bg-red-300 rounded-sm" style={{ width: `${(d.pengeluaran / maxVal) * 60}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block"></span>Pemasukan</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-300 inline-block"></span>Pengeluaran</span>
          </div>
        </div>
      )}

      {/* Pemasukan Tab */}
      {tab === 'pemasukan' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Rincian Sumber Pemasukan</h3>
          <div className="space-y-4">
            {kategoriPemasukan.map((k, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-700 font-medium">{k.kategori}</span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600">{k.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span>
                    <span className="text-gray-400 ml-2">({k.persen}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-emerald-400 h-3 rounded-full" style={{ width: `${k.persen}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <span className="font-bold text-gray-700">Total Pemasukan</span>
            <span className="font-bold text-emerald-600 text-lg">{totalPemasukan.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span>
          </div>
        </div>
      )}

      {/* Pengeluaran Tab */}
      {tab === 'pengeluaran' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Rincian Kategori Pengeluaran</h3>
          <div className="space-y-4">
            {kategoriPengeluaran.map((k, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-700 font-medium">{k.kategori}</span>
                  <div className="text-right">
                    <span className="font-bold text-red-500">{k.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span>
                    <span className="text-gray-400 ml-2">({k.persen}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-red-400 h-3 rounded-full" style={{ width: `${k.persen}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <span className="font-bold text-gray-700">Total Pengeluaran</span>
            <span className="font-bold text-red-500 text-lg">{totalPengeluaran.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</span>
          </div>
        </div>
      )}
    </div>
  );
}