import React, { useState } from 'react';

const interviewData = [
  { id: 'JI-2025-001', kandidat: 'Fajar Nugroho', foto: 'FN', perusahaan: 'Yamaha Motor Co., Ltd.', prefektur: 'Shizuoka', posisi: 'Operator Produksi', tanggal: '2025-02-20', waktu: '09:00 WIB', durasi: '45 menit', metode: 'Video Call (Zoom)', interviewer: 'Tanaka Hiroshi (HR Manager)', link: 'https://zoom.us/j/123456789', status: 'Terjadwal', catatan: 'Wawancara dalam Bahasa Jepang dasar + penerjemah' },
  { id: 'JI-2025-002', kandidat: 'Mira Agustina', foto: 'MA', perusahaan: 'Panasonic Corp.', prefektur: 'Osaka', posisi: 'Operator Elektronik', tanggal: '2025-02-20', waktu: '13:00 WIB', durasi: '60 menit', metode: 'Video Call (Teams)', interviewer: 'Nakamura Yuki (Supervisor)', link: 'https://teams.microsoft.com/l/xyz', status: 'Terjadwal', catatan: 'Tes praktik membaca komponen elektronik' },
  { id: 'JI-2025-003', kandidat: 'Rendi Pratama', foto: 'RP', perusahaan: 'Toyota Housing Corp.', prefektur: 'Aichi', posisi: 'Pekerja Konstruksi', tanggal: '2025-02-21', waktu: '10:00 WIB', durasi: '45 menit', metode: 'Video Call (Zoom)', interviewer: 'Yamamoto Kenji (Site Manager)', link: 'https://zoom.us/j/987654321', status: 'Terjadwal', catatan: 'Wawancara bidang konstruksi dasar' },
  { id: 'JI-2025-004', kandidat: 'Doni Setiawan', foto: 'DS', perusahaan: 'Mitsubishi Electric', prefektur: 'Tokyo', posisi: 'Teknisi Elektronik', tanggal: '2025-02-15', waktu: '10:30 WIB', durasi: '60 menit', metode: 'Video Call (Zoom)', interviewer: 'Ito Masahiro (Technical Lead)', link: 'https://zoom.us/j/456789123', status: 'Selesai', catatan: 'Tes teknis dan wawancara', hasilSementara: 'Sangat Baik' },
  { id: 'JI-2025-005', kandidat: 'Lia Permata', foto: 'LP', perusahaan: 'JA Zen-Noh Farm', prefektur: 'Hokkaido', posisi: 'Pekerja Pertanian', tanggal: '2025-02-22', waktu: '08:00 WIB', durasi: '30 menit', metode: 'Video Call (Zoom)', interviewer: 'Sato Kento (Farm Manager)', link: 'https://zoom.us/j/321654987', status: 'Terjadwal', catatan: 'Wawancara terkait pengalaman bertani' },
  { id: 'JI-2025-006', kandidat: 'Hadi Kurniawan', foto: 'HK', perusahaan: 'Honda Motor Co., Ltd.', prefektur: 'Saitama', posisi: 'Mekanik Otomotif', tanggal: '2025-02-13', waktu: '14:00 WIB', durasi: '50 menit', metode: 'Video Call (Zoom)', interviewer: 'Suzuki Akira (Workshop Head)', link: 'https://zoom.us/j/741852963', status: 'Dibatalkan', catatan: 'Dibatalkan - psikologi belum diverifikasi', hasilSementara: '' },
];

const statusColor = {
  'Terjadwal': 'bg-blue-100 text-blue-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
  'Dibatalkan': 'bg-red-100 text-red-700',
  'Menunggu Konfirmasi': 'bg-yellow-100 text-yellow-700',
};

const metodeIcon = {
  'Video Call (Zoom)': '📹',
  'Video Call (Teams)': '💻',
  'Tatap Muka': '🤝',
};

const today = '2025-02-20';

export default function JadwalInterview() {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [showForm, setShowForm] = useState(false);
  const [viewDate, setViewDate] = useState('Semua');

  const uniqueDates = [...new Set(interviewData.map(i => i.tanggal))].sort();

  const filtered = interviewData.filter(d => {
    const mS = filterStatus === 'Semua' || d.status === filterStatus;
    const mD = viewDate === 'Semua' || d.tanggal === viewDate;
    return mS && mD;
  });

  const todaySchedule = interviewData.filter(d => d.tanggal === today);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Jadwal Interview</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola jadwal wawancara dengan perusahaan Jepang</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Tambah Jadwal
        </button>
      </div>

      {/* Today's Schedule */}
      {todaySchedule.length > 0 && (
        <div className="mb-6 bg-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📅</span>
            <p className="font-bold">Jadwal Hari Ini — {today}</p>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{todaySchedule.length} interview</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {todaySchedule.map(s => (
              <div key={s.id} className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">{s.foto}</div>
                <div>
                  <p className="font-semibold text-sm">{s.kandidat}</p>
                  <p className="text-xs text-blue-200">{s.waktu} · {s.perusahaan.split(' ').slice(0, 2).join(' ')}</p>
                </div>
                <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">{s.durasi}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Interview</p>
          <p className="text-2xl font-bold text-gray-800">{interviewData.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Terjadwal</p>
          <p className="text-2xl font-bold text-blue-600">{interviewData.filter(d => d.status === 'Terjadwal').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Selesai</p>
          <p className="text-2xl font-bold text-emerald-600">{interviewData.filter(d => d.status === 'Selesai').length}</p>
        </div>
      </div>

      {/* Form Tambah */}
      {showForm && (
        <div className="bg-white rounded-xl border border-blue-200 p-5 mb-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4 text-sm">Tambah Jadwal Interview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Kandidat</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option>Pilih kandidat...</option>
                {['Fajar Nugroho', 'Mira Agustina', 'Rendi Pratama'].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Perusahaan Jepang</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option>Pilih perusahaan...</option>
                {['Yamaha Motor', 'Panasonic', 'Toyota Housing'].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Waktu</label>
              <input type="time" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Metode</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                {['Video Call (Zoom)', 'Video Call (Teams)', 'Tatap Muka'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Link Meeting</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="https://zoom.us/j/..." />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Simpan Jadwal</button>
            <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50" onClick={() => setShowForm(false)}>Batal</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['Semua', 'Terjadwal', 'Selesai', 'Dibatalkan'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={viewDate} onChange={e => setViewDate(e.target.value)}>
          <option value="Semua">Semua Tanggal</option>
          {uniqueDates.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {filtered.map(d => (
          <div key={d.id} className={`bg-white rounded-xl border shadow-sm p-5 ${d.status === 'Dibatalkan' ? 'opacity-60' : ''} ${d.tanggal === today && d.status === 'Terjadwal' ? 'border-blue-300' : 'border-gray-200'}`}>
            <div className="flex items-start gap-4">
              <div className="text-center w-14 flex-shrink-0">
                <div className="bg-blue-50 rounded-lg p-2">
                  <p className="text-xs text-blue-600 font-medium">{d.tanggal.slice(5)}</p>
                  <p className="text-sm font-bold text-blue-800">{d.waktu.split(':')[0]}:{d.waktu.split(':')[1]}</p>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center text-xs font-bold">{d.foto}</div>
                      <p className="font-semibold text-gray-800">{d.kandidat}</p>
                      <span className="text-gray-400 text-sm">→</span>
                      <p className="text-sm font-medium text-blue-700">{d.perusahaan}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                      <span>💼 {d.posisi}</span>
                      <span>🇯🇵 {d.prefektur}</span>
                      <span>{metodeIcon[d.metode]} {d.metode}</span>
                      <span>⏱️ {d.durasi}</span>
                    </div>
                  </div>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColor[d.status]}`}>{d.status}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5 mb-2">
                  <p className="text-xs text-gray-600">👤 Interviewer: <strong>{d.interviewer}</strong></p>
                  <p className="text-xs text-gray-500 mt-0.5">📝 {d.catatan}</p>
                </div>
                {d.hasilSementara && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 mb-2">
                    <p className="text-xs text-emerald-700 font-medium">📊 Hasil Sementara: {d.hasilSementara}</p>
                  </div>
                )}
                <div className="flex gap-2 flex-wrap">
                  {d.status === 'Terjadwal' && (
                    <>
                      <a href={d.link} className="text-xs text-blue-500 font-medium border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-50">🔗 Buka Link Meeting</a>
                      <button className="text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50">✏️ Edit Jadwal</button>
                      <button className="text-xs text-red-400 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-50">❌ Batalkan</button>
                    </>
                  )}
                  {d.status === 'Selesai' && (
                    <button className="text-xs text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-50">📝 Input Hasil Interview</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}