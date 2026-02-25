import React, { useState } from 'react';

const siswaData = [
  { id: 'S001', nama: 'Ahmad Fauzi', program: 'Magang Jepang', totalTagihan: 25000000, rencana: [8000000, 8000000, 9000000], realisasi: [8000000, 5000000, 4000000], batch: 'Jan 2025' },
  { id: 'S002', nama: 'Siti Rahayu', program: 'Tokutei Ginou', totalTagihan: 32000000, rencana: [10000000, 11000000, 11000000], realisasi: [10000000, 6000000, 0], batch: 'Jan 2025' },
  { id: 'S003', nama: 'Budi Santoso', program: 'SSW', totalTagihan: 28500000, rencana: [9500000, 9500000, 9500000], realisasi: [0, 0, 0], batch: 'Feb 2025' },
  { id: 'S004', nama: 'Dewi Lestari', program: 'Magang Jepang', totalTagihan: 25000000, rencana: [8000000, 8000000, 9000000], realisasi: [8000000, 8000000, 9000000], batch: 'Jan 2025' },
  { id: 'S005', nama: 'Rizki Pratama', program: 'Tokutei Ginou', totalTagihan: 32000000, rencana: [10000000, 11000000, 11000000], realisasi: [5000000, 0, 0], batch: 'Feb 2025' },
  { id: 'S006', nama: 'Nurul Hidayah', program: 'SSW', totalTagihan: 28500000, rencana: [9500000, 9500000, 9500000], realisasi: [9500000, 9500000, 9500000], batch: 'Jan 2025' },
  { id: 'S007', nama: 'Hendra Wijaya', program: 'Magang Jepang', totalTagihan: 25000000, rencana: [8000000, 8000000, 9000000], realisasi: [8000000, 8000000, 5000000], batch: 'Feb 2025' },
  { id: 'S008', nama: 'Rina Kusuma', program: 'Tokutei Ginou', totalTagihan: 32000000, rencana: [10000000, 11000000, 11000000], realisasi: [0, 0, 0], batch: 'Feb 2025' },
];

const terminLabels = ['Termin 1', 'Termin 2', 'Termin 3'];

function getTerminStatus(rencana, realisasi) {
  if (realisasi === 0) return 'Belum';
  if (realisasi >= rencana) return 'Lunas';
  return 'Sebagian';
}

const terminStatusColor = {
  'Lunas': 'bg-emerald-100 text-emerald-700',
  'Sebagian': 'bg-yellow-100 text-yellow-700',
  'Belum': 'bg-gray-100 text-gray-500',
};

export default function PaymentMonitoring() {
  const [filterBatch, setFilterBatch] = useState('Semua');
  const [filterProgram, setFilterProgram] = useState('Semua');

  const filtered = siswaData.filter(s => {
    const matchB = filterBatch === 'Semua' || s.batch === filterBatch;
    const matchP = filterProgram === 'Semua' || s.program === filterProgram;
    return matchB && matchP;
  });

  const totalTagihan = filtered.reduce((a, s) => a + s.totalTagihan, 0);
  const totalTerbayar = filtered.reduce((a, s) => a + s.realisasi.reduce((x, y) => x + y, 0), 0);
  const totalTunggakan = totalTagihan - totalTerbayar;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Monitoring</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau status pembayaran per termin setiap siswa</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
          📊 Export Laporan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Tagihan</p>
          <p className="text-xl font-bold text-gray-800">{(totalTagihan / 1000000).toFixed(1)}jt</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Terbayar</p>
          <p className="text-xl font-bold text-emerald-600">{(totalTerbayar / 1000000).toFixed(1)}jt</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${(totalTerbayar / totalTagihan) * 100}%` }}></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Tunggakan</p>
          <p className="text-xl font-bold text-red-500">{(totalTunggakan / 1000000).toFixed(1)}jt</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div className="bg-red-400 h-2 rounded-full" style={{ width: `${(totalTunggakan / totalTagihan) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterBatch} onChange={e => setFilterBatch(e.target.value)}>
          {['Semua', 'Jan 2025', 'Feb 2025'].map(b => <option key={b}>{b}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
          {['Semua', 'Magang Jepang', 'Tokutei Ginou', 'SSW'].map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Siswa</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Program</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Batch</th>
              {terminLabels.map((t, i) => (
                <th key={i} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{t}</th>
              ))}
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total Bayar</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(s => {
              const totalBayar = s.realisasi.reduce((a, b) => a + b, 0);
              const pct = Math.round((totalBayar / s.totalTagihan) * 100);
              return (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{s.nama.charAt(0)}</div>
                      <span className="font-medium text-gray-800">{s.nama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{s.program}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{s.batch}</td>
                  {s.rencana.map((renc, i) => {
                    const real = s.realisasi[i];
                    const st = getTerminStatus(renc, real);
                    return (
                      <td key={i} className="px-4 py-3">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${terminStatusColor[st]}`}>{st}</span>
                          {real > 0 && (
                            <p className="text-xs text-emerald-600 font-medium">{(real / 1000000).toFixed(1)}jt</p>
                          )}
                          {real < renc && (
                            <p className="text-xs text-gray-400">/{(renc / 1000000).toFixed(1)}jt</p>
                          )}
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {totalBayar.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${pct >= 100 ? 'bg-emerald-500' : pct > 50 ? 'bg-blue-500' : pct > 0 ? 'bg-yellow-500' : 'bg-gray-300'}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}