import React, { useState } from 'react';

const cashflowData = [
  { bulan: 'Agt 2024', masuk: 45000000, keluar: 32000000, saldoAwal: 120000000 },
  { bulan: 'Sep 2024', masuk: 52000000, keluar: 38000000, saldoAwal: 133000000 },
  { bulan: 'Okt 2024', masuk: 48000000, keluar: 35000000, saldoAwal: 147000000 },
  { bulan: 'Nov 2024', masuk: 61000000, keluar: 42000000, saldoAwal: 160000000 },
  { bulan: 'Des 2024', masuk: 75000000, keluar: 58000000, saldoAwal: 179000000 },
  { bulan: 'Jan 2025', masuk: 83000000, keluar: 61000000, saldoAwal: 196000000 },
  { bulan: 'Feb 2025', masuk: 68000000, keluar: 47500000, saldoAwal: 218000000 },
];

cashflowData.forEach((d, i) => {
  d.saldoAkhir = d.saldoAwal + d.masuk - d.keluar;
  if (i < cashflowData.length - 1) cashflowData[i + 1].saldoAwal = d.saldoAkhir;
});

export default function ReportCashflow() {
  const maxSaldo = Math.max(...cashflowData.map(d => d.saldoAkhir));
  const totalMasuk = cashflowData.reduce((a, b) => a + b.masuk, 0);
  const totalKeluar = cashflowData.reduce((a, b) => a + b.keluar, 0);
  const saldoAkhirTerakhir = cashflowData[cashflowData.length - 1].saldoAkhir;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Cashflow</h1>
          <p className="text-sm text-gray-500 mt-1">Arus kas masuk dan keluar LPK SIMPEL</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">📥 Export</button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Saldo Awal Periode</p>
          <p className="text-xl font-bold text-gray-800">{(cashflowData[0].saldoAwal / 1000000).toFixed(0)}jt</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Total Arus Masuk</p>
          <p className="text-xl font-bold text-emerald-600">+{(totalMasuk / 1000000).toFixed(0)}jt</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Total Arus Keluar</p>
          <p className="text-xl font-bold text-red-500">-{(totalKeluar / 1000000).toFixed(0)}jt</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Saldo Akhir</p>
          <p className="text-xl font-bold text-blue-700">{(saldoAkhirTerakhir / 1000000).toFixed(0)}jt</p>
        </div>
      </div>

      {/* Saldo Trend */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-5">
        <h3 className="font-semibold text-gray-800 mb-4 text-sm">Tren Saldo Akhir</h3>
        <div className="flex items-end gap-2 h-32">
          {cashflowData.map(d => (
            <div key={d.bulan} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${(d.saldoAkhir / maxSaldo) * 100}px` }} title={`${d.bulan}: ${(d.saldoAkhir / 1000000).toFixed(0)}jt`}></div>
              <p className="text-xs text-gray-400 text-center leading-tight">{d.bulan.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Tabel Cashflow Bulanan</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bulan</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Saldo Awal</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Arus Masuk</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Arus Keluar</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Net</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Saldo Akhir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cashflowData.map(d => {
              const net = d.masuk - d.keluar;
              return (
                <tr key={d.bulan} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{d.bulan}</td>
                  <td className="px-4 py-3 text-gray-600">{(d.saldoAwal / 1000000).toFixed(1)}jt</td>
                  <td className="px-4 py-3 text-emerald-600 font-medium">+{(d.masuk / 1000000).toFixed(1)}jt</td>
                  <td className="px-4 py-3 text-red-500 font-medium">-{(d.keluar / 1000000).toFixed(1)}jt</td>
                  <td className="px-4 py-3"><span className={`font-bold ${net >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{net >= 0 ? '+' : ''}{(net / 1000000).toFixed(1)}jt</span></td>
                  <td className="px-4 py-3 font-bold text-gray-800">{(d.saldoAkhir / 1000000).toFixed(1)}jt</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50">
              <td className="px-4 py-3 font-bold text-gray-700">Total</td>
              <td className="px-4 py-3 text-gray-500">—</td>
              <td className="px-4 py-3 font-bold text-emerald-600">+{(totalMasuk / 1000000).toFixed(1)}jt</td>
              <td className="px-4 py-3 font-bold text-red-500">-{(totalKeluar / 1000000).toFixed(1)}jt</td>
              <td className="px-4 py-3 font-bold text-blue-600">+{((totalMasuk - totalKeluar) / 1000000).toFixed(1)}jt</td>
              <td className="px-4 py-3 font-bold text-blue-700">{(saldoAkhirTerakhir / 1000000).toFixed(1)}jt</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}