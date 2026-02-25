import React, { useState } from 'react';

const dummyCatatan = [
  { id: 1, tipe: 'Issue', prioritas: 'Tinggi', judul: 'Paspor hampir kadaluarsa', isi: 'Paspor siswa akan kadaluarsa pada 15 Sep 2025. Perlu perpanjangan sebelum keberangkatan Feb 2025. Sudah diberitahu ke siswa via WA.', tanggal: '2024-10-01', petugas: 'Admin Jakarta', status: 'Open', label: 'Dokumen' },
  { id: 2, tipe: 'Catatan', prioritas: 'Normal', judul: 'Nilai Evaluasi Bulan 3 - Perlu Perhatian', isi: 'Nilai kanji masih di bawah target (65/100). Disarankan mengikuti les tambahan 2x seminggu. Instruktur Rina sudah dihubungi.', tanggal: '2024-10-05', petugas: 'Rina Kusuma', status: 'Resolved', label: 'Akademik' },
  { id: 3, tipe: 'Issue', prioritas: 'Sedang', judul: 'Keterlambatan pembayaran cicilan 3', isi: 'Cicilan ke-3 belum dibayar per tanggal 1 Oktober 2024. Sudah dihubungi 2x, siswa mengaku sedang menunggu transfer dari orang tua.', tanggal: '2024-10-08', petugas: 'Admin Keuangan', status: 'Open', label: 'Keuangan' },
  { id: 4, tipe: 'Catatan', prioritas: 'Normal', judul: 'Koordinasi dengan keluarga', isi: 'Panggilan ke orang tua Ahmad pada 10 Okt 2024. Orang tua mendukung program dan akan segera melunasi cicilan.', tanggal: '2024-10-10', petugas: 'Admin Jakarta', status: 'Resolved', label: 'Umum' },
  { id: 5, tipe: 'Issue', prioritas: 'Rendah', judul: 'Seragam belum dikembalikan', isi: 'Seragam praktik ukuran M yang dipinjam belum dikembalikan dari sesi latihan lapangan 25 Sep 2024.', tanggal: '2024-10-12', petugas: 'Staff Logistik', status: 'Open', label: 'Operasional' },
  { id: 6, tipe: 'Catatan', prioritas: 'Normal', judul: 'Persiapan tes JLPT Desember', isi: 'Siswa sudah mendaftar tes JLPT N4 periode Desember 2024. Nomor peserta: JLPT-2024-1234. Lokasi tes: Universitas Indonesia.', tanggal: '2024-10-15', petugas: 'Tim Akademik', status: 'Resolved', label: 'Akademik' },
];

const tipeColor = { Issue: 'bg-red-100 text-red-700', Catatan: 'bg-blue-100 text-blue-700' };
const prioritasColor = { Tinggi: 'bg-red-50 border-l-4 border-l-red-400', Sedang: 'bg-yellow-50 border-l-4 border-l-yellow-400', Normal: 'bg-white', Rendah: 'bg-gray-50' };
const prioritasBadge = { Tinggi: 'bg-red-100 text-red-700', Sedang: 'bg-yellow-100 text-yellow-700', Normal: 'bg-gray-100 text-gray-600', Rendah: 'bg-gray-100 text-gray-500' };
const statusColor = { Open: 'bg-orange-100 text-orange-700', Resolved: 'bg-green-100 text-green-700', 'In Progress': 'bg-blue-100 text-blue-700' };
const labelColor = { Dokumen: 'bg-purple-100 text-purple-700', Akademik: 'bg-blue-100 text-blue-700', Keuangan: 'bg-green-100 text-green-700', Umum: 'bg-gray-100 text-gray-600', Operasional: 'bg-orange-100 text-orange-700' };

export default function CatatanIssue() {
  const [data, setData] = useState(dummyCatatan);
  const [filterTipe, setFilterTipe] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({ tipe: 'Catatan', prioritas: 'Normal', judul: '', isi: '', label: 'Umum' });

  const filtered = data.filter(d => {
    const matchT = filterTipe === 'Semua' || d.tipe === filterTipe;
    const matchS = filterStatus === 'Semua' || d.status === filterStatus;
    return matchT && matchS;
  });

  const openIssues = data.filter(d => d.tipe === 'Issue' && d.status === 'Open').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Catatan & Issue</h1>
          <p className="text-sm text-gray-500 mt-1">Catatan penting dan masalah terkait siswa: Ahmad Fauzan Hidayat</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Tambah Catatan / Issue
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Catatan</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{data.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-red-100 border-l-4 border-l-red-400">
          <p className="text-xs text-gray-500">Issue Open</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{openIssues}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Issue Resolved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{data.filter(d => d.tipe === 'Issue' && d.status === 'Resolved').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Catatan</p>
          <p className="text-2xl font-bold text-gray-600 mt-1">{data.filter(d => d.tipe === 'Catatan').length}</p>
        </div>
      </div>

      {/* Open Issues Alert */}
      {openIssues > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
          <span className="text-red-500 text-xl">⚠️</span>
          <div>
            <p className="font-semibold text-red-700 text-sm">Ada {openIssues} issue yang belum diselesaikan</p>
            <p className="text-xs text-red-500">Harap segera ditindaklanjuti sebelum proses berlanjut.</p>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        <div className="flex gap-1">
          {['Semua', 'Issue', 'Catatan'].map(f => (
            <button key={f} onClick={() => setFilterTipe(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterTipe === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{f}</button>
          ))}
        </div>
        <div className="flex gap-1">
          {['Semua', 'Open', 'Resolved'].map(f => (
            <button key={f} onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === f ? 'bg-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className={`rounded-xl border p-4 shadow-sm ${prioritasColor[item.prioritas]}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tipeColor[item.tipe]}`}>{item.tipe}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${prioritasBadge[item.prioritas]}`}>Prioritas: {item.prioritas}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${labelColor[item.label]}`}>{item.label}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[item.status]}`}>{item.status}</span>
                <button className="text-gray-400 hover:text-gray-600 text-xs">✎</button>
                {item.tipe === 'Issue' && item.status === 'Open' && (
                  <button className="text-green-600 text-xs bg-green-50 hover:bg-green-100 px-2 py-0.5 rounded font-medium">Resolve</button>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.judul}</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">{item.isi}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>📅 {item.tanggal}</span>
              <span>👤 {item.petugas}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Tambah Catatan / Issue</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium">Tipe</label>
                  <select value={newNote.tipe} onChange={e => setNewNote({ ...newNote, tipe: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option>Catatan</option><option>Issue</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Prioritas</label>
                  <select value={newNote.prioritas} onChange={e => setNewNote({ ...newNote, prioritas: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option>Rendah</option><option>Normal</option><option>Sedang</option><option>Tinggi</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium">Label</label>
                  <select value={newNote.label} onChange={e => setNewNote({ ...newNote, label: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option>Umum</option><option>Akademik</option><option>Dokumen</option><option>Keuangan</option><option>Operasional</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Judul</label>
                <input value={newNote.judul} onChange={e => setNewNote({ ...newNote, judul: e.target.value })}
                  placeholder="Judul catatan atau issue..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium">Isi / Deskripsi</label>
                <textarea value={newNote.isi} onChange={e => setNewNote({ ...newNote, isi: e.target.value })}
                  rows={4} placeholder="Detail catatan atau langkah penanganan..." className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">Batal</button>
              <button onClick={() => {
                if (newNote.judul && newNote.isi) {
                  setData([{ id: data.length + 1, ...newNote, tanggal: new Date().toISOString().slice(0, 10), petugas: 'Admin', status: 'Open' }, ...data]);
                  setShowModal(false);
                  setNewNote({ tipe: 'Catatan', prioritas: 'Normal', judul: '', isi: '', label: 'Umum' });
                }
              }} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}