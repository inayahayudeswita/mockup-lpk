import React, { useState } from 'react';

const kandidatData = [
  { id: 'KND-001', nama: 'Fajar Nugroho', usia: 22, asal: 'Karawang, Jawa Barat', program: 'Magang Jepang', levelBahasa: 'N5', nilaiJFT: 85, nilaiAkademik: 88, nilaiTeknis: 82, fisik: 'Lulus', psikologi: 'Lulus', status: 'Siap Salur', pengalaman: '-', bidangMinat: 'Manufaktur', foto: 'FN' },
  { id: 'KND-002', nama: 'Mira Agustina', usia: 21, asal: 'Bandung, Jawa Barat', program: 'Tokutei Ginou', levelBahasa: 'N4', nilaiJFT: 92, nilaiAkademik: 91, nilaiTeknis: 89, fisik: 'Lulus', psikologi: 'Lulus', status: 'Siap Salur', pengalaman: '1 tahun pabrik tekstil', bidangMinat: 'Manufaktur', foto: 'MA' },
  { id: 'KND-003', nama: 'Doni Setiawan', usia: 24, asal: 'Bekasi, Jawa Barat', program: 'SSW', levelBahasa: 'N3', nilaiJFT: 96, nilaiAkademik: 94, nilaiTeknis: 91, fisik: 'Lulus', psikologi: 'Lulus', status: 'Siap Salur', pengalaman: '2 tahun teknisi', bidangMinat: 'Elektronik', foto: 'DS' },
  { id: 'KND-004', nama: 'Lia Permata', usia: 23, asal: 'Cirebon, Jawa Barat', program: 'Magang Jepang', levelBahasa: 'N5', nilaiJFT: 78, nilaiAkademik: 83, nilaiTeknis: 75, fisik: 'Lulus', psikologi: 'Lulus', status: 'Menunggu Matching', pengalaman: '-', bidangMinat: 'Pertanian', foto: 'LP' },
  { id: 'KND-005', nama: 'Hadi Kurniawan', usia: 25, asal: 'Tasikmalaya, Jawa Barat', program: 'Tokutei Ginou', levelBahasa: 'N4', nilaiJFT: 88, nilaiAkademik: 86, nilaiTeknis: 84, fisik: 'Lulus', psikologi: 'Perlu Review', status: 'Menunggu Matching', pengalaman: '3 tahun mekanik motor', bidangMinat: 'Otomotif', foto: 'HK' },
  { id: 'KND-006', nama: 'Sari Wulandari', usia: 22, asal: 'Garut, Jawa Barat', program: 'Magang Jepang', levelBahasa: 'N5', nilaiJFT: 72, nilaiAkademik: 79, nilaiTeknis: 70, fisik: 'Lulus', psikologi: 'Lulus', status: 'Perlu Persiapan', pengalaman: '-', bidangMinat: 'Perhotelan', foto: 'SW' },
  { id: 'KND-007', nama: 'Rendi Pratama', usia: 23, asal: 'Sukabumi, Jawa Barat', program: 'SSW', levelBahasa: 'N3', nilaiJFT: 90, nilaiAkademik: 92, nilaiTeknis: 88, fisik: 'Lulus', psikologi: 'Lulus', status: 'Siap Salur', pengalaman: '1 tahun konstruksi', bidangMinat: 'Konstruksi', foto: 'RP' },
  { id: 'KND-008', nama: 'Fitri Handayani', usia: 21, asal: 'Indramayu, Jawa Barat', program: 'Magang Jepang', levelBahasa: 'N5', nilaiJFT: 81, nilaiAkademik: 85, nilaiTeknis: 79, fisik: 'Tidak Lulus', psikologi: 'Lulus', status: 'Perlu Persiapan', pengalaman: '-', bidangMinat: 'Manufaktur', foto: 'FH' },
];

const statusColor = {
  'Siap Salur': 'bg-emerald-100 text-emerald-700',
  'Menunggu Matching': 'bg-blue-100 text-blue-700',
  'Perlu Persiapan': 'bg-orange-100 text-orange-700',
  'Sudah Ditempatkan': 'bg-purple-100 text-purple-700',
};

const levelColor = {
  'N3': 'bg-purple-100 text-purple-700',
  'N4': 'bg-blue-100 text-blue-700',
  'N5': 'bg-gray-100 text-gray-600',
};

function ScoreBar({ score, max = 100 }) {
  const pct = (score / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${score >= 90 ? 'bg-emerald-500' : score >= 80 ? 'bg-blue-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-400'}`} style={{ width: `${pct}%` }}></div>
      </div>
      <span className="text-xs text-gray-600 w-6 text-right">{score}</span>
    </div>
  );
}

export default function PoolKandidat() {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterProgram, setFilterProgram] = useState('Semua');
  const [filterBidang, setFilterBidang] = useState('Semua');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('table');
  const [selected, setSelected] = useState(null);

  const filtered = kandidatData.filter(k => {
    const mS = filterStatus === 'Semua' || k.status === filterStatus;
    const mP = filterProgram === 'Semua' || k.program === filterProgram;
    const mB = filterBidang === 'Semua' || k.bidangMinat === filterBidang;
    const mQ = k.nama.toLowerCase().includes(search.toLowerCase()) || k.asal.toLowerCase().includes(search.toLowerCase());
    return mS && mP && mB && mQ;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pool Kandidat</h1>
          <p className="text-sm text-gray-500 mt-1">Database siswa yang siap disalurkan ke perusahaan Jepang</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('table')} className={`px-3 py-2 rounded-lg text-sm border ${view === 'table' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}>☰ Tabel</button>
          <button onClick={() => setView('card')} className={`px-3 py-2 rounded-lg text-sm border ${view === 'card' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}>⊞ Kartu</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Kandidat', val: kandidatData.length, color: 'text-gray-800', icon: '👥' },
          { label: 'Siap Salur', val: kandidatData.filter(k => k.status === 'Siap Salur').length, color: 'text-emerald-600', icon: '✅' },
          { label: 'Menunggu Matching', val: kandidatData.filter(k => k.status === 'Menunggu Matching').length, color: 'text-blue-600', icon: '🔍' },
          { label: 'Perlu Persiapan', val: kandidatData.filter(k => k.status === 'Perlu Persiapan').length, color: 'text-orange-500', icon: '📚' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span>{s.icon}</span>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 min-w-44" placeholder="Cari nama atau asal..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['Semua', 'Siap Salur', 'Menunggu Matching', 'Perlu Persiapan'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
          {['Semua', 'Magang Jepang', 'Tokutei Ginou', 'SSW'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterBidang} onChange={e => setFilterBidang(e.target.value)}>
          {['Semua', 'Manufaktur', 'Elektronik', 'Otomotif', 'Pertanian', 'Konstruksi', 'Perhotelan'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kandidat</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Program</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bahasa</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nilai JFT</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Akademik</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Teknis</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bidang Minat</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(k => (
                <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center text-xs font-bold">{k.foto}</div>
                      <div>
                        <p className="font-medium text-gray-800">{k.nama}</p>
                        <p className="text-xs text-gray-400">{k.asal} · {k.usia} th</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{k.program}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${levelColor[k.levelBahasa]}`}>{k.levelBahasa}</span></td>
                  <td className="px-4 py-3 w-28"><ScoreBar score={k.nilaiJFT} /></td>
                  <td className="px-4 py-3 w-28"><ScoreBar score={k.nilaiAkademik} /></td>
                  <td className="px-4 py-3 w-28"><ScoreBar score={k.nilaiTeknis} /></td>
                  <td className="px-4 py-3 text-xs text-gray-600">{k.bidangMinat}</td>
                  <td className="px-4 py-3"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[k.status]}`}>{k.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-xs font-medium" onClick={() => setSelected(k)}>Detail</button>
                      {k.status === 'Siap Salur' && <button className="text-emerald-500 hover:text-emerald-700 text-xs font-medium">Matching</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {view === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(k => {
            const avgScore = Math.round((k.nilaiJFT + k.nilaiAkademik + k.nilaiTeknis) / 3);
            return (
              <div key={k.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold">{k.foto}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{k.nama}</p>
                    <p className="text-xs text-gray-400">{k.usia} th · {k.asal.split(',')[0]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${levelColor[k.levelBahasa]}`}>{k.levelBahasa}</span>
                  <span className="text-xs text-gray-500">{k.program}</span>
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Rata-rata Nilai</span>
                    <span className="font-bold text-gray-800">{avgScore}</span>
                  </div>
                  <ScoreBar score={k.nilaiJFT} />
                  <ScoreBar score={k.nilaiAkademik} />
                  <ScoreBar score={k.nilaiTeknis} />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[k.status]}`}>{k.status}</span>
                  <button className="text-blue-500 hover:text-blue-700 text-xs font-medium" onClick={() => setSelected(k)}>Detail →</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center text-xl font-bold">{selected.foto}</div>
              <div>
                <h2 className="font-bold text-gray-800 text-lg">{selected.nama}</h2>
                <p className="text-sm text-gray-500">{selected.usia} tahun · {selected.asal}</p>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${statusColor[selected.status]}`}>{selected.status}</span>
              </div>
              <button onClick={() => setSelected(null)} className="ml-auto text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                ['ID', selected.id], ['Program', selected.program], ['Level Bahasa', selected.levelBahasa],
                ['Bidang Minat', selected.bidangMinat], ['Fisik', selected.fisik], ['Psikologi', selected.psikologi],
                ['Pengalaman', selected.pengalaman || '-'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-gray-400">{k}</p>
                  <p className="text-sm font-medium text-gray-800">{v}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Penilaian</p>
              <div className="space-y-2">
                {[['Nilai JFT / Bahasa', selected.nilaiJFT], ['Nilai Akademik', selected.nilaiAkademik], ['Nilai Teknis', selected.nilaiTeknis]].map(([label, val]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1"><span>{label}</span><span className="font-bold">{val}</span></div>
                    <ScoreBar score={val} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-emerald-500 text-white text-sm py-2 rounded-lg hover:bg-emerald-600 font-medium">🔍 Mulai Matching</button>
              <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50" onClick={() => setSelected(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}