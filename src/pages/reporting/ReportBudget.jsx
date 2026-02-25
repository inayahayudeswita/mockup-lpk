import React, { useState } from 'react';

const budgetData = [
  { kategori: 'Honorarium Instruktur', anggaran: 120000000, realisasi: 95000000, icon: '👨‍🏫' },
  { kategori: 'Biaya Keberangkatan TKI', anggaran: 100000000, realisasi: 88000000, icon: '✈️' },
  { kategori: 'Medical Check Up (MCU)', anggaran: 50000000, realisasi: 42000000, icon: '🏥' },
  { kategori: 'Pengurusan Dokumen & Visa', anggaran: 45000000, realisasi: 38000000, icon: '📄' },
  { kategori: 'Operasional Kantor', anggaran: 30000000, realisasi: 28000000, icon: '🏢' },
  { kategori: 'Pengadaan Materi Pelatihan', anggaran: 25000000, realisasi: 12000000, icon: '📚' },
  { kategori: 'IT & Infrastruktur Sistem', anggaran: 20000000, realisasi: 5500000, icon: '💻' },
  { kategori: 'Marketing & Promosi', anggaran: 15000000, realisasi: 8000000, icon: '📢' },
  { kategori: 'Asuransi TKI', anggaran: 18000000, realisasi: 4800000, icon: '🛡️' },
  { kategori: 'Lain-lain & Darurat', anggaran: 12000000, realisasi: 3200000, icon: '📦' },
];

const totalAnggaran = budgetData.reduce((a, b) => a + b.anggaran, 0);
const totalRealisasi = budgetData.reduce((a, b) => a + b.realisasi, 0);

export default function ReportBudget() {
  const [sortMode, setSortMode] = useState('default');

  let sorted = [...budgetData];
  if (sortMode === 'serapan_tertinggi') sorted.sort((a, b) => (b.realisasi / b.anggaran) - (a.realisasi / a.anggaran));
  if (sortMode === 'serapan_terendah') sorted.sort((a, b) => (a.realisasi / a.anggaran) - (b.realisasi / b.anggaran));

  const overBudget = budgetData.filter(d => d.realisasi > d.anggaran);
  const totalSerapan = Math.round((totalRealisasi / totalAnggaran) * 100);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Budget vs Actual</h1>
          <p className="text-sm text-gray-500 mt-1">Perbandingan anggaran vs realisasi pengeluaran LPK Tahun 2025</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">📥 Export</button>
      </div>

      {overBudget.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
          <span>⚠️</span>
          <p className="text-sm text-red-700 font-medium">{overBudget.length} kategori melebihi anggaran</p>
        </div>
      )}

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 mb-1">Total Anggaran</p>
          <p className="text-2xl font-bold text-gray-800">{(totalAnggaran / 1000000).toFixed(0)}jt</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 mb-1">Total Realisasi</p>
          <p className="text-2xl font-bold text-blue-600">{(totalRealisasi / 1000000).toFixed(0)}jt</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 mb-1">Tingkat Serapan</p>
          <p className={`text-2xl font-bold ${totalSerapan > 90 ? 'text-orange-500' : totalSerapan > 70 ? 'text-blue-600' : 'text-emerald-600'}`}>{totalSerapan}%</p>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
            <div className={`h-1.5 rounded-full ${totalSerapan > 90 ? 'bg-orange-400' : 'bg-blue-500'}`} style={{ width: `${totalSerapan}%` }}></div>
          </div>
        </div>
      </div>

      {/* Budget Bars */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-700">Detail Anggaran per Kategori</p>
          <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs" value={sortMode} onChange={e => setSortMode(e.target.value)}>
            {[['default', 'Urutan Default'], ['serapan_tertinggi', 'Serapan Tertinggi'], ['serapan_terendah', 'Serapan Terendah']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-5">
          {sorted.map((d, i) => {
            const serapan = Math.round((d.realisasi / d.anggaran) * 100);
            const isOver = d.realisasi > d.anggaran;
            const sisa = d.anggaran - d.realisasi;
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span>{d.icon}</span>
                    <span className="text-sm font-medium text-gray-800">{d.kategori}</span>
                    {isOver && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">Over Budget!</span>}
                  </div>
                  <div className="text-xs text-right">
                    <span className="font-bold text-gray-800">{(d.realisasi / 1000000).toFixed(1)}jt</span>
                    <span className="text-gray-400"> / {(d.anggaran / 1000000).toFixed(1)}jt</span>
                  </div>
                </div>
                <div className="relative">
                  {/* Anggaran track */}
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full flex items-center justify-end pr-2 ${isOver ? 'bg-red-400' : serapan > 80 ? 'bg-blue-500' : serapan > 50 ? 'bg-emerald-400' : 'bg-yellow-400'}`}
                      style={{ width: `${Math.min(serapan, 100)}%` }}
                    >
                      <span className="text-white text-xs font-bold">{serapan}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>Realisasi: {serapan}%</span>
                  <span className={sisa >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                    {sisa >= 0 ? `Sisa: ${(sisa / 1000000).toFixed(1)}jt` : `Over: ${(Math.abs(sisa) / 1000000).toFixed(1)}jt`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block"></span>&lt;50%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block"></span>50-80%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>80%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400 inline-block"></span>Over Budget</span>
        </div>
      </div>
    </div>
  );
}