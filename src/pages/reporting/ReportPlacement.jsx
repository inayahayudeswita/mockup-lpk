import React, { useState } from 'react';

const placementStats = {
  totalLulusan: 87,
  totalTerkirim: 72,
  tingkatPlacement: 82.8,
  rataGaji: '¥158,000',
};

const dataPerTahun = [
  { tahun: '2021', lulusan: 18, terkirim: 12, gagal: 6 },
  { tahun: '2022', lulusan: 22, terkirim: 17, gagal: 5 },
  { tahun: '2023', lulusan: 26, terkirim: 23, gagal: 3 },
  { tahun: '2024', lulusan: 21, terkirim: 20, gagal: 1 },
];

const dataPerProgram = [
  { program: 'Magang Jepang (Tokenshusei)', jumlah: 38, persen: 52.8, warna: '#3B82F6' },
  { program: 'Tokutei Ginou (SSW1)', jumlah: 24, persen: 33.3, warna: '#8B5CF6' },
  { program: 'SSW2 / SSW', jumlah: 10, persen: 13.9, warna: '#10B981' },
];

const dataPerPerusahaan = [
  { perusahaan: 'Yamaha Motor Co., Ltd.', jumlah: 18, prefektur: 'Shizuoka', bidang: 'Otomotif' },
  { perusahaan: 'Honda Motor Co., Ltd.', jumlah: 14, prefektur: 'Saitama', bidang: 'Otomotif' },
  { perusahaan: 'Panasonic Corp.', jumlah: 11, prefektur: 'Osaka', bidang: 'Elektronik' },
  { perusahaan: 'Suzuki Motor Corp.', jumlah: 10, prefektur: 'Hamamatsu', bidang: 'Otomotif' },
  { perusahaan: 'Toyota Housing Corp.', jumlah: 9, prefektur: 'Aichi', bidang: 'Konstruksi' },
  { perusahaan: 'Mitsubishi Electric', jumlah: 6, prefektur: 'Tokyo', bidang: 'Elektronik' },
  { perusahaan: 'JA Zen-Noh Farm', jumlah: 4, prefektur: 'Hokkaido', bidang: 'Pertanian' },
];

const dataPerPrefektur = [
  { prefektur: 'Shizuoka', jumlah: 18 },
  { prefektur: 'Saitama', jumlah: 14 },
  { prefektur: 'Osaka', jumlah: 11 },
  { prefektur: 'Hamamatsu', jumlah: 10 },
  { prefektur: 'Aichi', jumlah: 9 },
  { prefektur: 'Tokyo', jumlah: 6 },
  { prefektur: 'Hokkaido', jumlah: 4 },
];

function BarChart({ data, maxVal }) {
  return (
    <div className="space-y-2.5">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-28 text-xs text-gray-600 text-right truncate">{item.perusahaan || item.prefektur}</div>
          <div className="flex-1 bg-gray-100 rounded-full h-5 relative">
            <div className="absolute left-0 top-0 h-5 rounded-full bg-blue-500 flex items-center justify-end pr-2 transition-all" style={{ width: `${(item.jumlah / maxVal) * 100}%` }}>
              <span className="text-white text-xs font-bold">{item.jumlah}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReportPlacement() {
  const [filterTahun, setFilterTahun] = useState('Semua');
  const maxJumlah = Math.max(...dataPerPerusahaan.map(d => d.jumlah));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Placement Jepang</h1>
          <p className="text-sm text-gray-500 mt-1">Analisis statistik penyaluran TKI ke Jepang</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterTahun} onChange={e => setFilterTahun(e.target.value)}>
            {['Semua', '2024', '2023', '2022', '2021'].map(t => <option key={t}>{t}</option>)}
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">📥 Export</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Lulusan', val: placementStats.totalLulusan, unit: 'orang', icon: '🎓', color: 'text-gray-800', bg: 'bg-gray-50' },
          { label: 'Berhasil Ditempatkan', val: placementStats.totalTerkirim, unit: 'orang', icon: '✈️', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Tingkat Placement', val: `${placementStats.tingkatPlacement}%`, unit: '', icon: '📈', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Rata-rata Gaji', val: placementStats.rataGaji, unit: '/bln', icon: '💴', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl border border-gray-200 p-5`}>
            <div className="flex items-center gap-2 mb-2"><span className="text-xl">{s.icon}</span><p className="text-xs text-gray-500">{s.label}</p></div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}<span className="text-sm font-normal text-gray-400 ml-1">{s.unit}</span></p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Trend per Tahun */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Tren Placement per Tahun</h3>
          <div className="space-y-3">
            {dataPerTahun.map(d => (
              <div key={d.tahun}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">{d.tahun}</span>
                  <span>{d.terkirim}/{d.lulusan} (<span className="text-emerald-600 font-medium">{Math.round(d.terkirim / d.lulusan * 100)}%</span>)</span>
                </div>
                <div className="flex h-5 rounded-full overflow-hidden bg-gray-100">
                  <div className="bg-emerald-500 flex items-center justify-center" style={{ width: `${(d.terkirim / d.lulusan) * 100}%` }}>
                    <span className="text-white text-xs font-bold">{d.terkirim}</span>
                  </div>
                  <div className="bg-red-200 flex items-center justify-center" style={{ width: `${(d.gagal / d.lulusan) * 100}%` }}>
                    <span className="text-red-700 text-xs font-bold">{d.gagal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>Ditempatkan</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-200 inline-block"></span>Tidak Lulus</span>
          </div>
        </div>

        {/* Per Program */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Distribusi per Program</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {dataPerProgram.reduce((acc, d, i) => {
                  const startAngle = acc.cumulative;
                  const angle = (d.persen / 100) * 360;
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                  const largeArc = angle > 180 ? 1 : 0;
                  acc.paths.push(
                    <path key={i} d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={d.warna} opacity={0.85} />
                  );
                  acc.cumulative += angle;
                  return acc;
                }, { paths: [], cumulative: 0 }).paths}
                <circle cx="50" cy="50" r="22" fill="white" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">{placementStats.totalTerkirim}</p>
                  <p className="text-xs text-gray-400">orang</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {dataPerProgram.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.warna }}></div>
                  <span className="text-xs text-gray-600">{d.program}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800">{d.jumlah} orang</span>
                  <span className="text-xs text-gray-400">({d.persen}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Per Perusahaan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Top Perusahaan Mitra</h3>
          <BarChart data={dataPerPerusahaan} maxVal={maxJumlah} />
        </div>

        {/* Per Prefektur */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">Distribusi per Prefektur 🇯🇵</h3>
          <BarChart data={dataPerPrefektur} maxVal={18} />
        </div>
      </div>
    </div>
  );
}