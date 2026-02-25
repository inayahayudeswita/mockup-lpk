import React, { useState } from 'react';

const penerbanganData = {
  id: 'JDW-001',
  maskapai: 'Garuda Indonesia',
  logo: '🇮🇩',
  noPenerbangan: 'GA-880',
  kelas: 'Economy',
  tanggal: '10 Februari 2025',
  statusPenerbangan: 'Terkonfirmasi',
  asal: { kota: 'Jakarta', bandara: 'Soekarno-Hatta International Airport', kode: 'CGK', terminal: 'Terminal 3', jam: '08:30', tanggal: '10 Feb 2025' },
  tujuan: { kota: 'Nagoya', bandara: 'Chubu Centrair International Airport', kode: 'NGO', terminal: 'Terminal 2', jam: '16:45', tanggal: '10 Feb 2025' },
  durasi: '8j 15m',
  transit: null,
  bagasi: '20 kg check-in + 7 kg cabin',
  catatan: 'Harap tiba di bandara 3 jam sebelum keberangkatan. Semua siswa wajib membawa dokumen lengkap.',
};

const siswaBoarding = [
  { id: 'SIS-0142', nama: 'Ahmad Fauzan Hidayat', seatNo: '24A', boardingPass: 'BP-GA880-0142', status: 'Check-in', bagasiChecked: true, foto: 'AF' },
  { id: 'SIS-0143', nama: 'Dewi Rahayu Putri', seatNo: '24B', boardingPass: 'BP-GA880-0143', status: 'Check-in', bagasiChecked: true, foto: 'DR' },
  { id: 'SIS-0146', nama: 'Budi Santoso', seatNo: '24C', boardingPass: 'BP-GA880-0146', status: 'Menunggu', bagasiChecked: false, foto: 'BS' },
  { id: 'SIS-0147', nama: 'Mega Wulandari', seatNo: '25A', boardingPass: 'BP-GA880-0147', status: 'Menunggu', bagasiChecked: false, foto: 'MW' },
  { id: 'SIS-0148', nama: 'Dimas Pratama', seatNo: '25B', boardingPass: 'BP-GA880-0148', status: 'Menunggu', bagasiChecked: false, foto: 'DP' },
];

const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-teal-500', 'bg-orange-500', 'bg-pink-500'];

export default function DetailPenerbangan() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detail Penerbangan</h1>
          <p className="text-sm text-gray-500 mt-1">Informasi lengkap jadwal dan boarding penerbangan</p>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm text-gray-600">← Kembali</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">↓ Cetak Manifest</button>
        </div>
      </div>

      {/* Flight Card */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{penerbanganData.logo}</span>
            <div>
              <p className="font-bold text-lg">{penerbanganData.maskapai}</p>
              <p className="text-blue-200 text-sm">{penerbanganData.noPenerbangan} · {penerbanganData.kelas}</p>
            </div>
          </div>
          <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full">{penerbanganData.statusPenerbangan}</span>
        </div>

        <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{penerbanganData.asal.jam}</p>
            <p className="text-2xl font-mono font-bold text-blue-200">{penerbanganData.asal.kode}</p>
            <p className="text-xs text-blue-200 mt-1">{penerbanganData.asal.kota}</p>
            <p className="text-xs text-blue-300">{penerbanganData.tanggal}</p>
          </div>
          <div className="flex-1 px-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{penerbanganData.durasi}</p>
            <div className="flex items-center gap-1">
              <div className="flex-1 h-0.5 bg-blue-400" />
              <span className="text-xl">✈</span>
              <div className="flex-1 h-0.5 bg-blue-400" />
            </div>
            <p className="text-blue-300 text-xs mt-1">{penerbanganData.transit ? `Transit: ${penerbanganData.transit}` : 'Direct'}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{penerbanganData.tujuan.jam}</p>
            <p className="text-2xl font-mono font-bold text-blue-200">{penerbanganData.tujuan.kode}</p>
            <p className="text-xs text-blue-200 mt-1">{penerbanganData.tujuan.kota}</p>
            <p className="text-xs text-blue-300">{penerbanganData.tanggal}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div><p className="text-blue-300 text-xs">Bandara Asal</p><p className="text-sm font-medium">{penerbanganData.asal.terminal}</p></div>
          <div><p className="text-blue-300 text-xs">Bagasi</p><p className="text-sm font-medium">{penerbanganData.bagasi}</p></div>
          <div><p className="text-blue-300 text-xs">Bandara Tujuan</p><p className="text-sm font-medium">{penerbanganData.tujuan.terminal}</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-white rounded-xl p-1 shadow-sm border border-gray-100 w-fit">
        {[['info', 'Info Penerbangan'], ['boarding', 'Boarding Siswa']].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === key ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">DETAIL BANDARA</h3>
            <div className="space-y-3">
              {[
                ['Bandara Keberangkatan', penerbanganData.asal.bandara],
                ['Terminal', penerbanganData.asal.terminal],
                ['Check-in Dibuka', '05:30 WIB (3 jam sebelum)'],
                ['Gate Closes', '08:00 WIB'],
                ['Bandara Tujuan', penerbanganData.tujuan.bandara],
                ['Terminal Kedatangan', penerbanganData.tujuan.terminal],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between gap-4">
                  <span className="text-xs text-gray-400 w-36">{l}</span>
                  <span className="text-xs font-medium text-gray-800 text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 text-sm mb-3">CATATAN PENTING</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800 leading-relaxed">
              ⚠️ {penerbanganData.catatan}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600"><span className="text-green-500">✓</span> Koordinasi dengan pendamping keberangkatan</div>
              <div className="flex items-center gap-2 text-xs text-gray-600"><span className="text-green-500">✓</span> Semua siswa sudah dibriefing protokol imigrasi</div>
              <div className="flex items-center gap-2 text-xs text-gray-600"><span className="text-green-500">✓</span> Kontak darurat Jepang sudah dibagikan</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'boarding' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 text-sm">DAFTAR SISWA ({siswaBoarding.length} siswa)</h3>
            <div className="flex gap-3 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{siswaBoarding.filter(s => s.status === 'Check-in').length} Check-in</span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{siswaBoarding.filter(s => s.status === 'Menunggu').length} Menunggu</span>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase border-b border-gray-100">
                <th className="px-4 py-3">Siswa</th>
                <th className="px-4 py-3">No. Kursi</th>
                <th className="px-4 py-3">Boarding Pass</th>
                <th className="px-4 py-3">Bagasi</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {siswaBoarding.map((s, i) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{s.foto}</div>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{s.nama}</p>
                        <p className="text-gray-400 text-xs">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="font-mono font-bold text-blue-600">{s.seatNo}</span></td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{s.boardingPass}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.bagasiChecked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.bagasiChecked ? '✓ Checked' : 'Belum'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.status === 'Check-in' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}