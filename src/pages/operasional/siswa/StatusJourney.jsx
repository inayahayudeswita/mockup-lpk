import React, { useState } from 'react';

const siswaDummy = [
  { id: 'SIS-2024-0142', nama: 'Ahmad Fauzan Hidayat', batch: 'B-2024-03', program: 'Tokutei Ginou', step: 3, foto: 'AF' },
  { id: 'SIS-2024-0143', nama: 'Dewi Rahayu Putri', batch: 'B-2024-03', program: 'Tokutei Ginou', step: 3, foto: 'DR' },
  { id: 'SIS-2024-0144', nama: 'Rizki Maulana', batch: 'B-2024-03', program: 'Magang (Kenshusei)', step: 2, foto: 'RM' },
  { id: 'SIS-2024-0145', nama: 'Siti Nurhaliza', batch: 'B-2024-03', program: 'Tokutei Ginou', step: 4, foto: 'SN' },
  { id: 'SIS-2024-0146', nama: 'Budi Santoso', batch: 'B-2024-02', program: 'Magang (Kenshusei)', step: 5, foto: 'BS' },
  { id: 'SIS-2024-0147', nama: 'Mega Wulandari', batch: 'B-2024-02', program: 'Tokutei Ginou', step: 6, foto: 'MW' },
];

const journeySteps = [
  { key: 1, label: 'Pendaftaran', icon: '📋', color: 'green' },
  { key: 2, label: 'Seleksi', icon: '🔍', color: 'blue' },
  { key: 3, label: 'Pelatihan', icon: '📚', color: 'indigo' },
  { key: 4, label: 'Sertifikasi', icon: '🏆', color: 'yellow' },
  { key: 5, label: 'Matching', icon: '🤝', color: 'orange' },
  { key: 6, label: 'Berangkat', icon: '✈️', color: 'purple' },
];

const detailJourney = {
  'SIS-2024-0142': [
    { step: 1, label: 'Pendaftaran', tanggal: '10 Jun 2024', status: 'Selesai', catatan: 'Pendaftaran online via website. Dokumen awal lengkap.', petugas: 'Admin Jakarta' },
    { step: 2, label: 'Seleksi Administrasi', tanggal: '15 Jun 2024', status: 'Selesai', catatan: 'Lulus seleksi berkas. Semua dokumen valid.', petugas: 'Tim Seleksi' },
    { step: 3, label: 'Seleksi Wawancara', tanggal: '20 Jun 2024', status: 'Selesai', catatan: 'Lulus wawancara. Nilai: 85/100. Motivasi tinggi.', petugas: 'Budi Hartono' },
    { step: 4, label: 'Mulai Pelatihan', tanggal: '01 Jul 2024', status: 'Selesai', catatan: 'Resmi masuk program pelatihan Batch B-2024-03.', petugas: 'Hiroshi Tanaka' },
    { step: 5, label: 'Evaluasi Bulan 1', tanggal: '01 Agu 2024', status: 'Selesai', catatan: 'Nilai: 78/100. Perlu peningkatan kanji.', petugas: 'Rina Kusuma' },
    { step: 6, label: 'Evaluasi Bulan 2', tanggal: '01 Sep 2024', status: 'Selesai', catatan: 'Nilai: 82/100. Progres baik.', petugas: 'Rina Kusuma' },
    { step: 7, label: 'Evaluasi Bulan 3', tanggal: '01 Okt 2024', status: 'Aktif', catatan: 'Sedang berjalan. Target: 85/100.', petugas: 'Rina Kusuma' },
    { step: 8, label: 'Tes JLPT N4', tanggal: 'Des 2024', status: 'Pending', catatan: 'Jadwal tes JLPT periode Desember 2024.', petugas: '-' },
    { step: 9, label: 'Matching Perusahaan', tanggal: '-', status: 'Pending', catatan: 'Menunggu kelulusan sertifikasi.', petugas: '-' },
    { step: 10, label: 'Keberangkatan', tanggal: '-', status: 'Pending', catatan: 'Target: Februari 2025.', petugas: '-' },
  ]
};

const statusColor = { Selesai: 'bg-green-100 text-green-700', Aktif: 'bg-blue-100 text-blue-700', Pending: 'bg-gray-100 text-gray-500' };
const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];

export default function StatusJourney() {
  const [selected, setSelected] = useState(siswaDummy[0]);

  const detail = detailJourney[selected.id] || detailJourney['SIS-2024-0142'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Status Journey</h1>
        <p className="text-sm text-gray-500 mt-1">Pantau perkembangan perjalanan setiap siswa dari pendaftaran hingga keberangkatan</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {journeySteps.map(step => (
          <div key={step.key} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
            <div className="text-xl mb-1">{step.icon}</div>
            <p className="text-xs font-medium text-gray-600">{step.label}</p>
            <p className="text-lg font-bold text-gray-800 mt-1">{siswaDummy.filter(s => s.step === step.key).length}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Siswa List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-600">DAFTAR SISWA</p>
          </div>
          <div className="divide-y divide-gray-50">
            {siswaDummy.map((s, i) => {
              const currentStep = journeySteps.find(j => j.key === s.step);
              return (
                <div key={s.id} onClick={() => setSelected(s)}
                  className={`p-3 cursor-pointer hover:bg-gray-50 transition ${selected.id === s.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{s.foto}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-xs truncate">{s.nama}</p>
                      <p className="text-gray-400 text-xs">{s.batch}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full flex-shrink-0">{currentStep?.icon} {currentStep?.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Journey Detail */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <div className={`w-10 h-10 ${avatarColors[siswaDummy.indexOf(selected) % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold`}>{selected.foto}</div>
              <div>
                <p className="font-bold text-gray-800">{selected.nama}</p>
                <p className="text-xs text-gray-500">{selected.id} · {selected.program}</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full">
                  Langkah {selected.step}/6 — {journeySteps.find(j => j.key === selected.step)?.label}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center mb-6 gap-1">
              {journeySteps.map((step, i) => (
                <React.Fragment key={step.key}>
                  <div className={`flex flex-col items-center`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step.key < selected.step ? 'bg-green-500 text-white' : step.key === selected.step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {step.key < selected.step ? '✓' : step.key}
                    </div>
                    <p className={`text-xs mt-0.5 ${step.key <= selected.step ? 'text-gray-700' : 'text-gray-400'}`}>{step.label}</p>
                  </div>
                  {i < journeySteps.length - 1 && <div className={`flex-1 h-0.5 mb-4 ${step.key < selected.step ? 'bg-green-400' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-4">
                {detail.map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-4 w-4 h-4 rounded-full border-2 ${item.status === 'Selesai' ? 'bg-green-500 border-green-500' : item.status === 'Aktif' ? 'bg-blue-500 border-blue-500 animate-pulse' : 'bg-white border-gray-300'}`} />
                    <div className={`ml-2 p-3 rounded-xl text-xs ${item.status === 'Pending' ? 'bg-gray-50 border border-dashed border-gray-200' : 'bg-white border border-gray-100'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`font-semibold ${item.status === 'Pending' ? 'text-gray-400' : 'text-gray-800'}`}>{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{item.tanggal}</span>
                          <span className={`px-1.5 py-0.5 rounded-full font-medium text-xs ${statusColor[item.status]}`}>{item.status}</span>
                        </div>
                      </div>
                      <p className={`${item.status === 'Pending' ? 'text-gray-400' : 'text-gray-600'}`}>{item.catatan}</p>
                      {item.petugas !== '-' && <p className="text-gray-400 mt-0.5">Petugas: {item.petugas}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}