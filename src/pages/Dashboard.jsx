import React from 'react';
import { Users, BookOpen, Award, Briefcase, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const statsData = [
    { 
      id: 1, 
      title: 'Calon Peserta', 
      value: '124', 
      change: 12, 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      id: 2, 
      title: 'Peserta Aktif', 
      value: '89', 
      change: 5, 
      icon: BookOpen, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      id: 3, 
      title: 'Peserta Siap Salur', 
      value: '23', 
      change: -3, 
      icon: Award, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    { 
      id: 4, 
      title: 'Ditempatkan di Jepang', 
      value: '156', 
      change: 18, 
      icon: Briefcase, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
  ];

  const chartData = [
    { month: 'Sep', lulus: 65, tidak: 35 },
    { month: 'Okt', lulus: 45, tidak: 55 },
    { month: 'Nov', lulus: 78, tidak: 22 },
    { month: 'Des', lulus: 52, tidak: 48 },
    { month: 'Jan', lulus: 89, tidak: 11 },
    { month: 'Feb', lulus: 71, tidak: 29 },
  ];

  const progressData = [
    { name: 'Bahasa Jepang N5', progress: 75, color: 'bg-blue-500' },
    { name: 'Bahasa Jepang N4', progress: 45, color: 'bg-green-500' },
    { name: 'Teknik Pengelasan', progress: 88, color: 'bg-orange-500' },
    { name: 'Budaya Kerja Jepang', progress: 92, color: 'bg-purple-500' },
  ];

  const recentPlacements = [
    { id: 1, name: 'Ahmad Irfan', company: 'Toyota Motor Corporation', location: 'Gifu', status: 'Berangkat', avatar: 'AI' },
    { id: 2, name: 'Siti Putri', company: 'Panasonic Corporation', location: 'Osaka', status: 'Proses COE', avatar: 'SP' },
    { id: 3, name: 'Rudi Dermawan', company: 'Denso Corporation', location: 'Aichi', status: 'Berangkat', avatar: 'RD' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-2xl p-8 text-white shadow-xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold mb-2">
            Selamat Datang di LPK
          </h1>
          <p className="text-white/90 text-lg">
            Sistem Informasi Manajemen Pelatihan Kerja Jepang
          </p>
          <p className="text-white/70 mt-2 font-jp text-sm">
            日本での雇用のための訓練管理システム
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              <p className="text-xs text-gray-400 mt-2">vs bulan lalu</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kelulusan Seleksi Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Statistik Kelulusan Seleksi</h3>
              <p className="text-sm text-gray-500">6 Bulan Terakhir</p>
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>6 Bulan</option>
              <option>1 Tahun</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="lulus" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="tidak" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">Lulus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-gray-600">Tidak Lulus</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Pembelajaran */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Progress Pembelajaran</h3>
            <p className="text-sm text-gray-500">Rata-rata per program</p>
          </div>

          <div className="space-y-6">
            {progressData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                  <span className="text-sm font-bold text-gray-900">{item.progress}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                    className={`h-full ${item.color} rounded-full shadow-lg`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Placements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Penempatan Terbaru</h3>
              <p className="text-sm text-gray-500">Peserta yang baru ditempatkan</p>
            </div>
            <button className="text-sm text-primary-600 font-semibold hover:text-primary-700">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-4">
            {recentPlacements.map((placement, index) => (
              <motion.div
                key={placement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                  {placement.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{placement.name}</h4>
                  <p className="text-sm text-gray-600 truncate font-jp">
                    {placement.company} • {placement.location}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  placement.status === 'Berangkat' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {placement.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-500">Akses cepat fitur utama</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Tambah Peserta', icon: Users, color: 'from-blue-500 to-blue-600' },
              { label: 'Job Order', icon: Briefcase, color: 'from-green-500 to-green-600' },
              { label: 'Verifikasi Dok', icon: Award, color: 'from-orange-500 to-orange-600' },
              { label: 'Laporan', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-br ${action.color} text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-semibold">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;