import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Filter, Download, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalonPeserta = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedPeserta, setSelectedPeserta] = useState(null);

  const pesertaData = [
    {
      id: 1,
      nama: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@email.com',
      telepon: '08123456789',
      usia: 24,
      pendidikan: 'SMK',
      jurusan: 'Teknik Mesin',
      tanggalDaftar: '2024-01-15',
      status: 'menunggu',
      avatar: 'AF'
    },
    {
      id: 2,
      nama: 'Siti Nurhaliza',
      email: 'siti.nur@email.com',
      telepon: '08234567890',
      usia: 23,
      pendidikan: 'D3',
      jurusan: 'Administrasi',
      tanggalDaftar: '2024-01-16',
      status: 'lengkap',
      avatar: 'SN'
    },
    {
      id: 3,
      nama: 'Budi Santoso',
      email: 'budi.s@email.com',
      telepon: '08345678901',
      usia: 25,
      pendidikan: 'SMA',
      jurusan: 'IPA',
      tanggalDaftar: '2024-01-17',
      status: 'revisi',
      avatar: 'BS'
    },
    {
      id: 4,
      nama: 'Dewi Kusuma',
      email: 'dewi.k@email.com',
      telepon: '08456789012',
      usia: 22,
      pendidikan: 'SMK',
      jurusan: 'Teknik Las',
      tanggalDaftar: '2024-01-18',
      status: 'menunggu',
      avatar: 'DK'
    },
    {
      id: 5,
      nama: 'Eko Prasetyo',
      email: 'eko.p@email.com',
      telepon: '08567890123',
      usia: 26,
      pendidikan: 'S1',
      jurusan: 'Teknik Elektro',
      tanggalDaftar: '2024-01-19',
      status: 'lengkap',
      avatar: 'EP'
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      menunggu: 'bg-yellow-100 text-yellow-700',
      lengkap: 'bg-green-100 text-green-700',
      revisi: 'bg-red-100 text-red-700',
    };
    const labels = {
      menunggu: 'Menunggu Verifikasi',
      lengkap: 'Dokumen Lengkap',
      revisi: 'Perlu Revisi',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const DetailModal = ({ peserta, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
              {peserta.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{peserta.nama}</h2>
              <p className="text-white/80">ID: #{peserta.id.toString().padStart(4, '0')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-sm font-semibold text-gray-700">Status Pendaftaran</span>
            {getStatusBadge(peserta.status)}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-900">{peserta.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Telepon</p>
              <p className="font-semibold text-gray-900">{peserta.telepon}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Usia</p>
              <p className="font-semibold text-gray-900">{peserta.usia} tahun</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Pendidikan</p>
              <p className="font-semibold text-gray-900">{peserta.pendidikan}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Jurusan</p>
              <p className="font-semibold text-gray-900">{peserta.jurusan}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Tanggal Daftar</p>
              <p className="font-semibold text-gray-900">
                {new Date(peserta.tanggalDaftar).toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Dokumen</h3>
            <div className="space-y-2">
              {['KTP', 'Ijazah', 'Kartu Keluarga', 'Surat Kesehatan'].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{doc}</span>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">✓ Uploaded</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button className="flex-1 bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
              Verifikasi
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              Edit Data
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Calon Peserta</h1>
          <p className="text-gray-600 mt-1">Kelola data pendaftar dan proses verifikasi</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Tambah Calon Peserta
        </motion.button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pendaftar', value: '124', color: 'blue' },
          { label: 'Menunggu', value: '45', color: 'yellow' },
          { label: 'Lengkap', value: '68', color: 'green' },
          { label: 'Perlu Revisi', value: '11', color: 'red' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-${stat.color}-50 border border-${stat.color}-200 rounded-xl p-4`}
          >
            <p className={`text-sm font-medium text-${stat.color}-600 mb-1`}>{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-700`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama, email, atau telepon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="all">Semua Status</option>
            <option value="menunggu">Menunggu Verifikasi</option>
            <option value="lengkap">Dokumen Lengkap</option>
            <option value="revisi">Perlu Revisi</option>
          </select>

          <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>

          <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Peserta
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pendidikan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pesertaData.map((peserta, index) => (
                <motion.tr
                  key={peserta.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                        {peserta.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{peserta.nama}</p>
                        <p className="text-sm text-gray-500">{peserta.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {peserta.telepon}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{peserta.pendidikan}</p>
                    <p className="text-sm text-gray-500">{peserta.jurusan}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(peserta.tanggalDaftar).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(peserta.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPeserta(peserta);
                          setShowModal(true);
                        }}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-yellow-50 rounded-lg transition-colors group">
                        <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-yellow-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Menampilkan 1-5 dari 124 data
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedPeserta && (
          <DetailModal
            peserta={selectedPeserta}
            onClose={() => {
              setShowModal(false);
              setSelectedPeserta(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalonPeserta;