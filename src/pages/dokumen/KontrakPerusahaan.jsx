import React, { useState } from 'react';

const perusahaanData = [
  { id: 'KP-2024-001', perusahaan: 'Yamaha Motor Co., Ltd.', negara: 'Jepang', prefektur: 'Shizuoka', bidang: 'Manufaktur Otomotif', pic: 'Tanaka Hiroshi', email: 'h.tanaka@yamaha.co.jp', noKontrak: 'YMC/LPK/2024/001', tanggalMulai: '2024-01-01', tanggalSelesai: '2025-12-31', kuota: 20, terkirim: 15, status: 'Aktif', dokumen: 'kontrak_yamaha_2024.pdf' },
  { id: 'KP-2024-002', perusahaan: 'Toyota Housing Corp.', negara: 'Jepang', prefektur: 'Aichi', bidang: 'Konstruksi / Bangunan', pic: 'Yamamoto Kenji', email: 'k.yamamoto@toyota-h.co.jp', noKontrak: 'THC/LPK/2024/002', tanggalMulai: '2024-03-01', tanggalSelesai: '2026-02-28', kuota: 15, terkirim: 8, status: 'Aktif', dokumen: 'kontrak_toyota_housing.pdf' },
  { id: 'KP-2024-003', perusahaan: 'Panasonic Corp.', negara: 'Jepang', prefektur: 'Osaka', bidang: 'Manufaktur Elektronik', pic: 'Nakamura Yuki', email: 'y.nakamura@panasonic.co.jp', noKontrak: 'PAN/LPK/2024/003', tanggalMulai: '2024-06-01', tanggalSelesai: '2027-05-31', kuota: 10, terkirim: 3, status: 'Aktif', dokumen: 'kontrak_panasonic.pdf' },
  { id: 'KP-2023-001', perusahaan: 'Honda Motor Co., Ltd.', negara: 'Jepang', prefektur: 'Saitama', bidang: 'Manufaktur Otomotif', pic: 'Suzuki Akira', email: 'a.suzuki@honda.co.jp', noKontrak: 'HMC/LPK/2023/001', tanggalMulai: '2023-07-01', tanggalSelesai: '2025-06-30', kuota: 25, terkirim: 22, status: 'Hampir Berakhir', dokumen: 'kontrak_honda.pdf' },
  { id: 'KP-2025-001', perusahaan: 'Mitsubishi Electric', negara: 'Jepang', prefektur: 'Tokyo', bidang: 'Manufaktur Elektronik', pic: 'Ito Masahiro', email: 'm.ito@mitsubishielectric.co.jp', noKontrak: 'MEC/LPK/2025/001', tanggalMulai: '2025-06-01', tanggalSelesai: '2028-05-31', kuota: 12, terkirim: 0, status: 'Draft', dokumen: 'kontrak_draft_mec.pdf' },
  { id: 'KP-2023-002', perusahaan: 'Suzuki Motor Corp.', negara: 'Jepang', prefektur: 'Hamamatsu', bidang: 'Manufaktur Otomotif', pic: 'Watanabe Shin', email: 's.watanabe@suzuki.co.jp', noKontrak: 'SMC/LPK/2023/002', tanggalMulai: '2023-01-01', tanggalSelesai: '2024-12-31', kuota: 18, terkirim: 18, status: 'Selesai', dokumen: 'kontrak_suzuki.pdf' },
];

const statusColor = {
  'Aktif': 'bg-emerald-100 text-emerald-700',
  'Hampir Berakhir': 'bg-orange-100 text-orange-700',
  'Draft': 'bg-gray-100 text-gray-500',
  'Selesai': 'bg-blue-100 text-blue-700',
  'Berakhir': 'bg-red-100 text-red-700',
};

const bidangIcon = {
  'Manufaktur Otomotif': '🚗',
  'Manufaktur Elektronik': '⚡',
  'Konstruksi / Bangunan': '🏗️',
};

export default function KontrakPerusahaan() {
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = perusahaanData.filter(p => {
    const matchS = filterStatus === 'Semua' || p.status === filterStatus;
    const matchQ = p.perusahaan.toLowerCase().includes(search.toLowerCase()) || p.prefektur.toLowerCase().includes(search.toLowerCase());
    return matchS && matchQ;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kontrak Perusahaan Jepang</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola kontrak kerja sama dengan perusahaan mitra di Jepang</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Tambah Kontrak
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Mitra</p>
          <p className="text-2xl font-bold text-gray-800">{perusahaanData.length}</p>
          <p className="text-xs text-gray-400">Perusahaan Jepang</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Kontrak Aktif</p>
          <p className="text-2xl font-bold text-emerald-600">{perusahaanData.filter(p => p.status === 'Aktif').length}</p>
          <p className="text-xs text-gray-400">Berlangsung</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Kuota</p>
          <p className="text-2xl font-bold text-blue-600">{perusahaanData.reduce((a, p) => a + p.kuota, 0)}</p>
          <p className="text-xs text-gray-400">Orang</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Sudah Terkirim</p>
          <p className="text-2xl font-bold text-purple-600">{perusahaanData.reduce((a, p) => a + p.terkirim, 0)}</p>
          <p className="text-xs text-gray-400">Orang</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-4">
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 max-w-xs"
          placeholder="Cari perusahaan atau prefektur..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['Semua', 'Aktif', 'Hampir Berakhir', 'Draft', 'Selesai'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(p => {
          const pct = Math.round((p.terkirim / p.kuota) * 100);
          return (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl">
                    🇯🇵
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{p.perusahaan}</h3>
                    <p className="text-xs text-gray-500">{bidangIcon[p.bidang]} {p.bidang} · {p.prefektur}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[p.status]}`}>{p.status}</span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-xs">
                <div>
                  <p className="text-gray-400">No. Kontrak</p>
                  <p className="font-medium text-gray-700">{p.noKontrak}</p>
                </div>
                <div>
                  <p className="text-gray-400">PIC</p>
                  <p className="font-medium text-gray-700">{p.pic}</p>
                </div>
                <div>
                  <p className="text-gray-400">Berlaku</p>
                  <p className="font-medium text-gray-700">{p.tanggalMulai} s/d {p.tanggalSelesai}</p>
                </div>
                <div>
                  <p className="text-gray-400">Kontak</p>
                  <p className="font-medium text-blue-600 truncate">{p.email}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Pengisian Kuota</span>
                  <span className="font-medium text-gray-700">{p.terkirim} / {p.kuota} orang ({pct}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 50 ? 'bg-blue-500' : 'bg-gray-400'}`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex-1 text-center text-xs text-blue-600 font-medium hover:text-blue-800" onClick={() => setSelected(p)}>Lihat Detail</button>
                <button className="flex-1 text-center text-xs text-gray-500 font-medium hover:text-gray-700">📄 {p.dokumen}</button>
                <button className="flex-1 text-center text-xs text-gray-500 font-medium hover:text-gray-700">✏️ Edit</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇯🇵</span>
                <h2 className="font-bold text-gray-800">{selected.perusahaan}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['ID Kontrak', selected.id],
                ['Bidang', selected.bidang],
                ['Prefektur', selected.prefektur],
                ['No. Kontrak', selected.noKontrak],
                ['PIC', selected.pic],
                ['Email PIC', selected.email],
                ['Masa Kontrak', `${selected.tanggalMulai} – ${selected.tanggalSelesai}`],
                ['Kuota', `${selected.kuota} orang`],
                ['Sudah Terkirim', `${selected.terkirim} orang`],
                ['Sisa Kuota', `${selected.kuota - selected.terkirim} orang`],
                ['Status', selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-800">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">📄 Unduh Kontrak</button>
              <button className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-50" onClick={() => setSelected(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}