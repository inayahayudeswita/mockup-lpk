import React, { useState } from 'react';

const hasilData = [
  {
    id: 'HI-2025-001', kandidat: 'Doni Setiawan', foto: 'DS', perusahaan: 'Mitsubishi Electric', prefektur: 'Tokyo', posisi: 'Teknisi Elektronik',
    tanggalInterview: '2025-02-15', interviewer: 'Ito Masahiro',
    nilaiKomunikasi: 90, nilaiTeknis: 95, nilaiKepribadian: 88, nilaiMotivasi: 92,
    totalNilai: 91, keputusan: 'Lulus', catatanInterviewer: 'Kandidat sangat kompeten secara teknis, bahasa Jepang baik untuk level N3, motivasi kuat. Direkomendasikan.',
    tindakLanjut: 'Proses COE & Visa', statusLanjut: 'Aktif'
  },
  {
    id: 'HI-2025-002', kandidat: 'Ahmad Fauzi', foto: 'AF', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', posisi: 'Operator Produksi',
    tanggalInterview: '2025-02-10', interviewer: 'Tanaka Hiroshi',
    nilaiKomunikasi: 78, nilaiTeknis: 82, nilaiKepribadian: 85, nilaiMotivasi: 90,
    totalNilai: 84, keputusan: 'Lulus (Cadangan)', catatanInterviewer: 'Kandidat cukup baik, masuk sebagai cadangan. Motivasi tinggi, perlu peningkatan bahasa Jepang.',
    tindakLanjut: 'Menunggu Konfirmasi Perusahaan', statusLanjut: 'Menunggu'
  },
  {
    id: 'HI-2025-003', kandidat: 'Sari Wulandari', foto: 'SW', perusahaan: 'Fujita Hotel Group', prefektur: 'Kyoto', posisi: 'Housekeeping Staff',
    tanggalInterview: '2025-02-08', interviewer: 'Kobayashi Mei',
    nilaiKomunikasi: 65, nilaiTeknis: 70, nilaiKepribadian: 80, nilaiMotivasi: 75,
    totalNilai: 73, keputusan: 'Tidak Lulus', catatanInterviewer: 'Kemampuan komunikasi bahasa Jepang masih kurang, perlu pelatihan intensif 3-6 bulan.',
    tindakLanjut: 'Kembali ke Program Persiapan', statusLanjut: 'Tidak Lanjut'
  },
  {
    id: 'HI-2025-004', kandidat: 'Mira Agustina', foto: 'MA', perusahaan: 'Panasonic Corp.', prefektur: 'Osaka', posisi: 'Operator Elektronik',
    tanggalInterview: '2025-02-20', interviewer: 'Nakamura Yuki',
    nilaiKomunikasi: null, nilaiTeknis: null, nilaiKepribadian: null, nilaiMotivasi: null,
    totalNilai: null, keputusan: 'Menunggu', catatanInterviewer: '',
    tindakLanjut: 'Interview baru selesai, menunggu hasil evaluasi dari Jepang', statusLanjut: 'Menunggu'
  },
];

const keputusanColor = {
  'Lulus': 'bg-emerald-100 text-emerald-700',
  'Lulus (Cadangan)': 'bg-blue-100 text-blue-700',
  'Tidak Lulus': 'bg-red-100 text-red-700',
  'Menunggu': 'bg-yellow-100 text-yellow-700',
};

function NilaiCircle({ label, nilai }) {
  if (nilai === null) return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-1">
        <span className="text-gray-400 text-xs">—</span>
      </div>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
  const color = nilai >= 90 ? 'text-emerald-600 border-emerald-400' : nilai >= 80 ? 'text-blue-600 border-blue-400' : nilai >= 70 ? 'text-yellow-600 border-yellow-400' : 'text-red-500 border-red-400';
  return (
    <div className="text-center">
      <div className={`w-14 h-14 rounded-full border-2 ${color} flex items-center justify-center mx-auto mb-1`}>
        <span className="font-bold text-sm">{nilai}</span>
      </div>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export default function HasilInterview() {
  const [filterKeputusan, setFilterKeputusan] = useState('Semua');
  const [inputMode, setInputMode] = useState(null);

  const filtered = hasilData.filter(d => filterKeputusan === 'Semua' || d.keputusan === filterKeputusan);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hasil Interview</h1>
          <p className="text-sm text-gray-500 mt-1">Rekap hasil wawancara kandidat dengan perusahaan Jepang</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Interview', val: hasilData.length, color: 'text-gray-800' },
          { label: 'Lulus', val: hasilData.filter(d => d.keputusan === 'Lulus').length, color: 'text-emerald-600' },
          { label: 'Lulus (Cadangan)', val: hasilData.filter(d => d.keputusan === 'Lulus (Cadangan)').length, color: 'text-blue-600' },
          { label: 'Tidak Lulus', val: hasilData.filter(d => d.keputusan === 'Tidak Lulus').length, color: 'text-red-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-5">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterKeputusan} onChange={e => setFilterKeputusan(e.target.value)}>
          {['Semua', 'Lulus', 'Lulus (Cadangan)', 'Tidak Lulus', 'Menunggu'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-5">
        {filtered.map(d => (
          <div key={d.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold">{d.foto}</div>
                <div>
                  <p className="font-bold text-gray-800">{d.kandidat}</p>
                  <p className="text-sm text-gray-500">{d.perusahaan} · {d.posisi}</p>
                  <p className="text-xs text-gray-400">🗓️ {d.tanggalInterview} · 👤 {d.interviewer}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${keputusanColor[d.keputusan]}`}>{d.keputusan}</span>
                {d.totalNilai && <span className="text-2xl font-bold text-gray-800">{d.totalNilai}<span className="text-sm text-gray-400">/100</span></span>}
              </div>
            </div>

            {/* Score Grid */}
            <div className="flex justify-around bg-gray-50 rounded-xl p-4 mb-4">
              <NilaiCircle label="Komunikasi" nilai={d.nilaiKomunikasi} />
              <NilaiCircle label="Teknis" nilai={d.nilaiTeknis} />
              <NilaiCircle label="Kepribadian" nilai={d.nilaiKepribadian} />
              <NilaiCircle label="Motivasi" nilai={d.nilaiMotivasi} />
            </div>

            {/* Catatan */}
            {d.catatanInterviewer && (
              <div className={`rounded-lg p-3 mb-3 ${d.keputusan === 'Lulus' ? 'bg-emerald-50 border border-emerald-100' : d.keputusan === 'Tidak Lulus' ? 'bg-red-50 border border-red-100' : 'bg-blue-50 border border-blue-100'}`}>
                <p className="text-xs font-semibold text-gray-600 mb-1">💬 Catatan Interviewer:</p>
                <p className="text-sm text-gray-700">{d.catatanInterviewer}</p>
              </div>
            )}

            {/* Tindak Lanjut */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Tindak Lanjut:</span>
                <span className="text-xs font-medium text-gray-700">{d.tindakLanjut}</span>
              </div>
              <div className="flex gap-2">
                {d.keputusan === 'Menunggu' && (
                  <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700" onClick={() => setInputMode(d)}>📝 Input Hasil</button>
                )}
                {d.keputusan === 'Lulus' && (
                  <button className="bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-600">🚀 Proses Penempatan</button>
                )}
                <button className="border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50">📄 Cetak</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Modal */}
      {inputMode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="font-bold text-gray-800 mb-4">Input Hasil Interview — {inputMode.kandidat}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['Komunikasi', 'Teknis', 'Kepribadian', 'Motivasi'].map(n => (
                <div key={n}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nilai {n} (0-100)</label>
                  <input type="number" min={0} max={100} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="0" />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Keputusan</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {['Lulus', 'Lulus (Cadangan)', 'Tidak Lulus'].map(k => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Catatan Interviewer</label>
              <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" rows={3} placeholder="Masukkan catatan..." />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">Simpan Hasil</button>
              <button className="border border-gray-200 text-sm px-4 py-2 rounded-lg text-gray-600" onClick={() => setInputMode(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}