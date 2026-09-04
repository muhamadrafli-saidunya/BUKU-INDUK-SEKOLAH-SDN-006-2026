import React, { useState } from 'react';
import { Search, SearchCheck, CheckCircle2, XCircle, ArrowLeft, School, UserCheck, BookOpen, ShieldCheck, Award } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';
import { cn, formatIndonesianDate } from '../../lib/utils';

interface PublicVerifyViewProps {
  onBack?: () => void;
  onSelectStudentDetail?: (studentId: string) => void;
}

export const PublicVerifyView: React.FC<PublicVerifyViewProps> = ({
  onBack,
  onSelectStudentDetail,
}) => {
  const { students, schoolProfile } = useSchool();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundStudent, setFoundStudent] = useState<Student | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.trim().toLowerCase();
    const result = students.find(
      (s) =>
        s.nisn.toLowerCase() === q ||
        s.noInduk.toLowerCase() === q ||
        (s.nik && s.nik.toLowerCase() === q) ||
        s.namaLengkap.toLowerCase() === q
    );

    setFoundStudent(result || null);
    setSearched(true);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#003399] dark:text-blue-400" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
        )}
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Verifikasi & Cek NISN Siswa
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Layanan pencarian dan pengecekan keabsahan data siswa terdaftar di {schoolProfile.namaSekolah}
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#003399] dark:text-blue-400 flex items-center justify-center mx-auto">
          <SearchCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Pengecekan Nomor Induk Siswa Nasional (NISN)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Masukkan Nomor NISN, Nomor Induk (NIS), atau NIK Siswa untuk memverifikasi arsip buku induk resmi
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh NISN: 0081234567 atau NIS: 2024001"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#003399] hover:bg-[#002266] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Verifikasi Data
          </button>
        </form>
      </div>

      {/* Search Result */}
      {searched && (
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-150">
          {foundStudent ? (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/40 shadow-md space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>DATA VALID TERDAFTAR DI BUKU INDUK</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Status: {foundStudent.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Nama Lengkap:</span>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                    {foundStudent.namaLengkap}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Nomor Induk / NISN:</span>
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {foundStudent.noInduk} / {foundStudent.nisn}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Tempat, Tanggal Lahir:</span>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {foundStudent.tempatLahir}, {formatIndonesianDate(foundStudent.tanggalLahir)}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Jenis Kelamin / Kelas:</span>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {foundStudent.jenisKelamin === 'L' ? 'Laki-Laki' : 'Perempuan'} (Kelas {foundStudent.kelasSekarang})
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Nama Orang Tua (Ayah / Ibu):</span>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {foundStudent.orangTuaAyah?.nama || '-'} / {foundStudent.orangTuaIbu?.nama || '-'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Satuan Pendidikan:</span>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {schoolProfile.namaSekolah} (NPSN: {schoolProfile.npsn})
                  </div>
                </div>
              </div>

              {onSelectStudentDetail && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => onSelectStudentDetail(foundStudent.id)}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-[#003399] dark:text-blue-300 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    Buka Biodata Lengkap Siswa →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/40 text-center space-y-3">
              <XCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Data Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Nomor identitas &quot;{query}&quot; tidak tercatat dalam buku induk {schoolProfile.namaSekolah}. Pastikan NISN atau NIS yang dimasukkan sudah benar.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
