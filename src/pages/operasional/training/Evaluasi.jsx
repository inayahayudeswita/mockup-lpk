import React, { useState } from 'react';

const evaluasiList = [
  {
    id: 'EVL-001', siswa: 'Ahmad Fauzan Hidayat', siswaId: 'SIS-0142', foto: 'AF',
    periode: 'Bulan 3 - Oktober 2024', batch: 'B-2024-03', evaluator: 'Rina Kusuma, S.Pd',
    tanggal: '2024-10-15', status: 'Selesai',
    aspek: [
      { nama: 'Kemampuan Bahasa Jepang', skor: 78, target: 85, komentar: 'Percakapan baik, kanji perlu ditingkatkan.' },
      { nama: 'Kedisiplinan & Kehadiran', skor: 92, target: 90, komentar: 'Kehadiran sangat baik, tidak pernah terlambat.' },
      { nama: 'Motivasi & Semangat', skor: 88, target: 80, komentar: 'Antusias dan proaktif dalam kelas.' },
      { nama: 'Kemampuan Teknis', skor: 80, target: 80, komentar: 'Sesuai target. Perlu latihan pengoperasian mesin.' },
      { nama: 'Kerja Tim & Sikap', skor: 85, target: 80, komentar: 'Sangat kooperatif dan sopan terhadap sesama.' },
    ],
    rekomendasi: 'Siswa menunjukkan progres yang baik. Fokuskan latihan tambahan kanji N4 2-3x/minggu. Direkomendasikan untuk lanjut ke tahap sertifikasi.',
    tindakLanjut: 'Les tambahan kanji setiap Selasa & Kamis.',
  },
  {
    id: 'EVL-002', siswa: 'Dewi Rahayu Putri', siswaId: 'SIS-0143', foto: 'DR',
    periode: 'Bulan 3 - Oktober 2024', batch: 'B-2024-03', evaluator: 'Hiroshi Tanaka',
    tanggal: '2024-10-15', status: 'Selesai',
    aspek: [
      { nama: 'Kemampuan Bahasa Jepang', skor: 91, target: 85, komentar: 'Sangat baik, sudah melampaui target.' },
      { nama: 'Kedisiplinan & Kehadiran', skor: 95, target: 90, komentar: 'Teladan bagi siswa lain.' },
      { nama: 'Motivasi & Semangat', skor: 90, target: 80, komentar: 'Selalu antusias dan aktif bertanya.' },
      { nama: 'Kemampuan Teknis', skor: 85, target: 80, komentar: 'Baik, sudah melebihi target.' },
      { nama: 'Kerja Tim & Sikap', skor: 93, target: 80, komentar: 'Sangat baik, sering membantu teman.' },
    ],
    rekomendasi: 'Siswa terbaik di batch ini. Direkomendasikan untuk dijadikan tutor sebaya dan prioritas matching.',
    tindakLanjut: 'Pertahankan performa. Perkuat koneksi dengan perusahaan Jepang.',
  },
  {
    id: 'EVL-003', siswa: 'Rizki Maulana', siswaId: 'SIS-0144', foto: 'RM',
    periode: 'Bulan 3 - Oktober 2024', batch: 'B-2024-03', evaluator: 'Rina Kusuma, S.Pd',
    tanggal: '2024-10-16', status: 'Selesai',
    aspek: [
      { nama: 'Kemampuan Bahasa Jepang', skor: 65, target: 85, komentar: 'Di bawah target. Kosakata masih kurang.' },
      { nama: 'Kedisiplinan & Kehadiran', skor: 75, target: 90, komentar: '3x izin tanpa keterangan jelas.' },
      { nama: 'Motivasi & Semangat', skor: 68, target: 80, komentar: 'Terlihat kurang bersemangat beberapa minggu terakhir.' },
      { nama: 'Kemampuan Teknis', skor: 72, target: 80, komentar: 'Cukup, masih di bawah target.' },
      { nama: 'Kerja Tim & Sikap', skor: 78, target: 80, komentar: 'Cukup baik dalam kerja tim.' },
    ],
    rekomendasi: 'Perlu perhatian khusus. Lakukan konseling untuk mengetahui hambatan. Risiko gagal jika tidak ada perbaikan.',
    tindakLanjut: 'Konseling dengan admin. Program intensif bahasa 5x/minggu. Monitoring ketat.',
  },
  {
    id: 'EVL-004', siswa: 'Siti Nurhaliza', siswaId: 'SIS-0145', foto: 'SN',
    periode: 'Bulan 3 - Oktober 2024', batch: 'B-2024-03', evaluator: 'Dwi Prasetyo, S.T',
    tanggal: '2024-10-17', status: 'Draft',
    aspek: [], rekomendasi: '', tindakLanjut: '',
  },
];

const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];

function RatingBar({ skor, target }) {
  return (
    <div className="relative w-full bg-gray-100 rounded-full h-3 mt-1">
      <div className={`h-3 rounded-full ${skor >= target ? 'bg-green-400' : skor >= target * 0.85 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${skor}%` }} />
      <div className="absolute top-0 h-3 w-0.5 bg-gray-400" style={{ left: `${target}%` }} title={`Target: ${target}`} />
    </div>
  );
}

export default function Evaluasi() {
  const [selected, setSelected] = useState(evaluasiList[0]);
  const [showModal, setShowModal] = useState(false);

  const avgSkor = (e) => e.aspek.length > 0 ? Math.round(e.aspek.reduce((a, b) => a + b.skor, 0) / e.aspek.length) : 0;
  const overallStatus = (e) => {
    const avg = avgSkor(e);
    return avg >= 85 ? { label: 'Sangat Baik', color: 'bg-green-100 text-green-700' }
      : avg >= 75 ? { label: 'Baik', color: 'bg-blue-100 text-blue-700' }
      : avg >= 65 ? { label: 'Cukup', color: 'bg-yellow-100 text-yellow-700' }
      : { label: 'Perlu Perhatian', color: 'bg-red-100 text-red-700' };
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Evaluasi Siswa</h1>
          <p className="text-sm text-gray-500 mt-1">Evaluasi periodik perkembangan siswa per aspek</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Buat Evaluasi
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Total Evaluasi</p><p className="text-2xl font-bold text-blue-600 mt-1">{evaluasiList.length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Selesai</p><p className="text-2xl font-bold text-green-600 mt-1">{evaluasiList.filter(e => e.status === 'Selesai').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Draft</p><p className="text-2xl font-bold text-gray-500 mt-1">{evaluasiList.filter(e => e.status === 'Draft').length}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p className="text-xs text-gray-500">Perlu Perhatian</p><p className="text-2xl font-bold text-red-600 mt-1">{evaluasiList.filter(e => avgSkor(e) < 70).length}</p></div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-3">
          {evaluasiList.map((e, i) => {
            const avg = avgSkor(e);
            const st = overallStatus(e);
            return (
              <div key={e.id} onClick={() => setSelected(e)}
                className={`bg-white rounded-xl border p-4 cursor-pointer hover:shadow-md transition ${selected.id === e.id ? 'border-blue-300 shadow-md' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{e.foto}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{e.siswa.split(' ')[0]} {e.siswa.split(' ')[1]}</p>
                    <p className="text-xs text-gray-400">{e.periode}</p>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${e.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{e.status}</span>
                </div>
                {e.aspek.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>{st.label}</span>
                    <span className={`font-bold ${avg >= 80 ? 'text-green-600' : avg >= 65 ? 'text-yellow-600' : 'text-red-600'}`}>{avg}/100</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className={`w-12 h-12 ${avatarColors[evaluasiList.findIndex(e => e.id === selected.id) % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold`}>{selected.foto}</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">{selected.siswa}</p>
              <p className="text-xs text-gray-500">{selected.periode} · Evaluator: {selected.evaluator}</p>
            </div>
            {selected.aspek.length > 0 && (
              <div className="text-right">
                <p className="text-xs text-gray-400">Rata-rata Skor</p>
                <p className="text-2xl font-bold text-blue-600">{avgSkor(selected)}</p>
              </div>
            )}
          </div>

          {selected.aspek.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-500 text-sm">Evaluasi belum diisi</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Isi Evaluasi</button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-5">
                {selected.aspek.map((a, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{a.nama}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Target: {a.target}</span>
                        <span className={`font-bold ${a.skor >= a.target ? 'text-green-600' : 'text-red-600'}`}>{a.skor}</span>
                        {a.skor >= a.target ? <span className="text-green-500 text-xs">✓</span> : <span className="text-red-500 text-xs">↓</span>}
                      </div>
                    </div>
                    <RatingBar skor={a.skor} target={a.target} />
                    <p className="text-xs text-gray-400 mt-1 italic">"{a.komentar}"</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-blue-700 mb-1.5">📝 Rekomendasi</p>
                  <p className="text-xs text-blue-800 leading-relaxed">{selected.rekomendasi}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-green-700 mb-1.5">✅ Tindak Lanjut</p>
                  <p className="text-xs text-green-800 leading-relaxed">{selected.tindakLanjut}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Buat Evaluasi Baru</h2>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500 font-medium">Siswa</label>
                <select className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {evaluasiList.map(e => <option key={e.id}>{e.siswa}</option>)}
                </select></div>
              <div><label className="text-xs text-gray-500 font-medium">Periode Evaluasi</label>
                <input placeholder="e.g. Bulan 4 - November 2024" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Evaluator</label>
                <input placeholder="Nama instruktur..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
              <div><label className="text-xs text-gray-500 font-medium">Tanggal Evaluasi</label>
                <input type="date" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">Batal</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Buat & Isi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}