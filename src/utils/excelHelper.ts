import * as XLSX from 'xlsx';
import { Student, Gender, Religion, StudentStatus } from '../types';

export interface ParsedRowResult {
  rowNumber: number;
  data: Partial<Student>;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ImportParseSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  results: ParsedRowResult[];
}

// Sample demo data for the Excel Template
export const SAMPLE_TEMPLATE_ROWS = [
  {
    NO_INDUK: '2024001',
    NISN: '0081234567',
    NIK_SISWA: '3201015205110001',
    NO_KK: '3201012508100002',
    NAMA_LENGKAP: 'MUHAMMAD RIZKY PRATAMA',
    NAMA_PANGGILAN: 'Rizky',
    JENIS_KELAMIN: 'L',
    TEMPAT_LAHIR: 'Jakarta',
    TANGGAL_LAHIR: '2011-05-12',
    AGAMA: 'Islam',
    KEWARGANEGARAAN: 'WNI',
    ANAK_KE: 1,
    JUMLAH_SAUDARA_KANDUNG: 2,
    JUMLAH_SAUDARA_TIRI: 0,
    JUMLAH_SAUDARA_ANGKAT: 0,
    STATUS_KELUARGA: 'Anak Kandung',
    BAHASA_IBU: 'Bahasa Indonesia',
    ALAMAT_JALAN: 'Jl. Merdeka No. 45 RT 03 RW 02',
    RT: '03',
    RW: '02',
    KELURAHAN_DESA: 'Cisalak Pasar',
    KECAMATAN: 'Cimanggis',
    KABUPATEN_KOTA: 'Kota Depok',
    PROVINSI: 'Jawa Barat',
    KODE_POS: '16452',
    TINGGAL_DENGAN: 'Orang Tua',
    JARAK_KE_SEKOLAH_KM: 1.5,
    TRANSPORTASI: 'Sepeda Motor',
    NO_HP_SISWA: '081234567890',
    EMAIL_SISWA: 'rizky.pratama@gmail.com',
    GOLONGAN_DARAH: 'O',
    PENYAKIT_DIDERITA: 'Tidak Ada',
    KELAINAN_JASMANI: 'Tidak Ada',
    TINGGI_BADAN_CM: 152,
    BERAT_BADAN_KG: 43,
    ASAL_SEKOLAH_TK_SD: 'SD Negeri 01 Cimanggis',
    NO_IJAZAH_SEBELUMNYA: 'DN-01/D-SD/13/0012345',
    TANGGAL_DITERIMA: '2024-07-15',
    DITERIMA_DI_KELAS: '7',
    KELAS_SEKARANG: '7A',
    STATUS_SISWA: 'Aktif',
    TAHUN_MASUK: '2024',
    NAMA_AYAH: 'Budi Santoso',
    NIK_AYAH: '3201011504780002',
    AGAMA_AYAH: 'Islam',
    PEKERJAAN_AYAH: 'Karyawan Swasta',
    PENGHASILAN_AYAH: 'Rp 4.000.000 - Rp 6.000.000',
    PENDIDIKAN_AYAH: 'S1',
    NO_HP_AYAH: '081398765432',
    STATUS_HIDUP_AYAH: 'Masih Hidup',
    NAMA_IBU: 'Siti Rahmawati',
    NIK_IBU: '3201014808800003',
    AGAMA_IBU: 'Islam',
    PEKERJAAN_IBU: 'Guru / Wiraswasta',
    PENGHASILAN_IBU: 'Rp 2.000.000 - Rp 3.500.000',
    PENDIDIKAN_IBU: 'S1',
    NO_HP_IBU: '081387654321',
    STATUS_HIDUP_IBU: 'Masih Hidup',
    NAMA_WALI: '',
    NIK_WALI: '',
    HUBUNGAN_WALI: '',
    PEKERJAAN_WALI: '',
    NO_HP_WALI: '',
  },
  {
    NO_INDUK: '2024002',
    NISN: '0087654321',
    NIK_SISWA: '3201016509110004',
    NO_KK: '3201012508100005',
    NAMA_LENGKAP: 'AULIA NUR ANGGRAENI',
    NAMA_PANGGILAN: 'Aulia',
    JENIS_KELAMIN: 'P',
    TEMPAT_LAHIR: 'Bandung',
    TANGGAL_LAHIR: '2011-09-25',
    AGAMA: 'Islam',
    KEWARGANEGARAAN: 'WNI',
    ANAK_KE: 2,
    JUMLAH_SAUDARA_KANDUNG: 1,
    JUMLAH_SAUDARA_TIRI: 0,
    JUMLAH_SAUDARA_ANGKAT: 0,
    STATUS_KELUARGA: 'Anak Kandung',
    BAHASA_IBU: 'Bahasa Sunda',
    ALAMAT_JALAN: 'Perumahan Griya Asri Blok C2 No. 12',
    RT: '05',
    RW: '08',
    KELURAHAN_DESA: 'Mekarsari',
    KECAMATAN: 'Cimanggis',
    KABUPATEN_KOTA: 'Kota Depok',
    PROVINSI: 'Jawa Barat',
    KODE_POS: '16452',
    TINGGAL_DENGAN: 'Orang Tua',
    JARAK_KE_SEKOLAH_KM: 2.0,
    TRANSPORTASI: 'Angkutan Umum',
    NO_HP_SISWA: '085712345678',
    EMAIL_SISWA: 'aulia.anggraeni@gmail.com',
    GOLONGAN_DARAH: 'A',
    PENYAKIT_DIDERITA: 'Tidak Ada',
    KELAINAN_JASMANI: 'Tidak Ada',
    TINGGI_BADAN_CM: 148,
    BERAT_BADAN_KG: 39,
    ASAL_SEKOLAH_TK_SD: 'SD Islam Terpadu Nurul Fikri',
    NO_IJAZAH_SEBELUMNYA: 'DN-01/D-SD/13/0012346',
    TANGGAL_DITERIMA: '2024-07-15',
    DITERIMA_DI_KELAS: '7',
    KELAS_SEKARANG: '7B',
    STATUS_SISWA: 'Aktif',
    TAHUN_MASUK: '2024',
    NAMA_AYAH: 'Drs. Hendra Kusuma',
    NIK_AYAH: '3201011203750005',
    AGAMA_AYAH: 'Islam',
    PEKERJAAN_AYAH: 'PNS / ASN',
    PENGHASILAN_AYAH: 'Rp 5.000.000 - Rp 8.000.000',
    PENDIDIKAN_AYAH: 'S2',
    NO_HP_AYAH: '081211223344',
    STATUS_HIDUP_AYAH: 'Masih Hidup',
    NAMA_IBU: 'Dewi Kartika, S.Pd.',
    NIK_IBU: '3201015507770006',
    AGAMA_IBU: 'Islam',
    PEKERJAAN_IBU: 'Ibu Rumah Tangga',
    PENGHASILAN_IBU: 'Tidak Ada',
    PENDIDIKAN_IBU: 'S1',
    NO_HP_IBU: '081299887766',
    STATUS_HIDUP_IBU: 'Masih Hidup',
    NAMA_WALI: '',
    NIK_WALI: '',
    HUBUNGAN_WALI: '',
    PEKERJAAN_WALI: '',
    NO_HP_WALI: '',
  },
];

// Instructions Sheet Data
export const TEMPLATE_INSTRUCTIONS = [
  { KOLOM: 'NO_INDUK', KETERANGAN: 'Nomor Induk Siswa (NIS) lokal sekolah. Wajib diisi & unik.', CONTOH: '2024001' },
  { KOLOM: 'NISN', KETERANGAN: 'Nomor Induk Siswa Nasional (10 digit angka resmi Kemdikbud). Wajib diisi.', CONTOH: '0081234567' },
  { KOLOM: 'NIK_SISWA', KETERANGAN: 'Nomor Induk Kependudukan siswa (16 digit dari KK/Akta).', CONTOH: '3201015205110001' },
  { KOLOM: 'NAMA_LENGKAP', KETERANGAN: 'Nama lengkap peserta didik sesuai ijazah/akta kelahiran. Wajib diisi.', CONTOH: 'MUHAMMAD RIZKY PRATAMA' },
  { KOLOM: 'JENIS_KELAMIN', KETERANGAN: 'Huruf "L" untuk Laki-laki atau "P" untuk Perempuan. Wajib diisi.', CONTOH: 'L atau P' },
  { KOLOM: 'TEMPAT_LAHIR', KETERANGAN: 'Kota / Kabupaten tempat kelahiran siswa.', CONTOH: 'Jakarta' },
  { KOLOM: 'TANGGAL_LAHIR', KETERANGAN: 'Format tanggal: YYYY-MM-DD (Tahun-Bulan-Tanggal) atau DD/MM/YYYY.', CONTOH: '2011-05-12' },
  { KOLOM: 'AGAMA', KETERANGAN: 'Pilihan: Islam, Kristen Protestan, Katolik, Hindu, Buddha, Konghucu, Lainnya.', CONTOH: 'Islam' },
  { KOLOM: 'KELAS_SEKARANG', KETERANGAN: 'Rombel / kelas saat ini. Contoh: 7A, 8B, 9C, 1A, 2B, X IPA 1, dst.', CONTOH: '7A' },
  { KOLOM: 'STATUS_SISWA', KETERANGAN: 'Status siswa: Aktif, Lulus, Mutasi Keluar, Drop Out, Meninggal.', CONTOH: 'Aktif' },
  { KOLOM: 'ALAMAT_JALAN', KETERANGAN: 'Alamat tempat tinggal lengkap siswa beserta RT dan RW.', CONTOH: 'Jl. Merdeka No. 45' },
  { KOLOM: 'NAMA_AYAH', KETERANGAN: 'Nama lengkap ayah kandung / tiri.', CONTOH: 'Budi Santoso' },
  { KOLOM: 'PEKERJAAN_AYAH', KETERANGAN: 'Pekerjaan ayah: PNS, Karyawan Swasta, Wiraswasta, Buruh, Petani, dll.', CONTOH: 'Karyawan Swasta' },
  { KOLOM: 'NO_HP_AYAH', KETERANGAN: 'Nomor telepon / WhatsApp ayah yang dapat dihubungi.', CONTOH: '081398765432' },
  { KOLOM: 'NAMA_IBU', KETERANGAN: 'Nama lengkap ibu kandung.', CONTOH: 'Siti Rahmawati' },
  { KOLOM: 'PEKERJAAN_IBU', KETERANGAN: 'Pekerjaan ibu / Ibu Rumah Tangga.', CONTOH: 'Guru / Wiraswasta' },
  { KOLOM: 'NO_HP_IBU', KETERANGAN: 'Nomor telepon / WhatsApp ibu yang dapat dihubungi.', CONTOH: '081387654321' },
];

/**
 * Generate and download formatted Excel Template (.xlsx)
 */
export const downloadExcelTemplate = (schoolName: string = 'Sekolah') => {
  const wb = XLSX.utils.book_new();

  // Sheet 1: DATA_SISWA
  const wsData = XLSX.utils.json_to_sheet(SAMPLE_TEMPLATE_ROWS);

  // Set column widths for comfortable editing
  const colWidths = [
    { wch: 14 }, // NO_INDUK
    { wch: 14 }, // NISN
    { wch: 20 }, // NIK_SISWA
    { wch: 20 }, // NO_KK
    { wch: 30 }, // NAMA_LENGKAP
    { wch: 16 }, // NAMA_PANGGILAN
    { wch: 14 }, // JENIS_KELAMIN
    { wch: 18 }, // TEMPAT_LAHIR
    { wch: 15 }, // TANGGAL_LAHIR
    { wch: 14 }, // AGAMA
    { wch: 16 }, // KEWARGANEGARAAN
    { wch: 10 }, // ANAK_KE
    { wch: 12 }, // JUMLAH_SAUDARA_KANDUNG
    { wch: 10 }, // JUMLAH_SAUDARA_TIRI
    { wch: 10 }, // JUMLAH_SAUDARA_ANGKAT
    { wch: 16 }, // STATUS_KELUARGA
    { wch: 18 }, // BAHASA_IBU
    { wch: 35 }, // ALAMAT_JALAN
    { wch: 6 },  // RT
    { wch: 6 },  // RW
    { wch: 18 }, // KELURAHAN_DESA
    { wch: 18 }, // KECAMATAN
    { wch: 18 }, // KABUPATEN_KOTA
    { wch: 18 }, // PROVINSI
    { wch: 10 }, // KODE_POS
    { wch: 16 }, // TINGGAL_DENGAN
    { wch: 12 }, // JARAK_KE_SEKOLAH_KM
    { wch: 18 }, // TRANSPORTASI
    { wch: 16 }, // NO_HP_SISWA
    { wch: 26 }, // EMAIL_SISWA
    { wch: 16 }, // GOLONGAN_DARAH
    { wch: 20 }, // PENYAKIT_DIDERITA
    { wch: 18 }, // KELAINAN_JASMANI
    { wch: 16 }, // TINGGI_BADAN_CM
    { wch: 16 }, // BERAT_BADAN_KG
    { wch: 26 }, // ASAL_SEKOLAH_TK_SD
    { wch: 24 }, // NO_IJAZAH_SEBELUMNYA
    { wch: 16 }, // TANGGAL_DITERIMA
    { wch: 16 }, // DITERIMA_DI_KELAS
    { wch: 14 }, // KELAS_SEKARANG
    { wch: 14 }, // STATUS_SISWA
    { wch: 14 }, // TAHUN_MASUK
    { wch: 24 }, // NAMA_AYAH
    { wch: 20 }, // NIK_AYAH
    { wch: 14 }, // AGAMA_AYAH
    { wch: 20 }, // PEKERJAAN_AYAH
    { wch: 26 }, // PENGHASILAN_AYAH
    { wch: 14 }, // PENDIDIKAN_AYAH
    { wch: 16 }, // NO_HP_AYAH
    { wch: 16 }, // STATUS_HIDUP_AYAH
    { wch: 24 }, // NAMA_IBU
    { wch: 20 }, // NIK_IBU
    { wch: 14 }, // AGAMA_IBU
    { wch: 20 }, // PEKERJAAN_IBU
    { wch: 26 }, // PENGHASILAN_IBU
    { wch: 14 }, // PENDIDIKAN_IBU
    { wch: 16 }, // NO_HP_IBU
    { wch: 16 }, // STATUS_HIDUP_IBU
    { wch: 24 }, // NAMA_WALI
    { wch: 20 }, // NIK_WALI
    { wch: 18 }, // HUBUNGAN_WALI
    { wch: 20 }, // PEKERJAAN_WALI
    { wch: 16 }, // NO_HP_WALI
  ];
  wsData['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, wsData, 'DATA_SISWA');

  // Sheet 2: PETUNJUK_PENGISIAN
  const wsGuide = XLSX.utils.json_to_sheet(TEMPLATE_INSTRUCTIONS);
  wsGuide['!cols'] = [{ wch: 24 }, { wch: 60 }, { wch: 28 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'PETUNJUK_PENGISIAN');

  // File Name
  const cleanSchool = schoolName.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `TEMPLATE_IMPORT_BUKU_INDUK_${cleanSchool}.xlsx`;

  // Trigger download
  XLSX.writeFile(wb, fileName);
};

/**
 * Format string into standard date YYYY-MM-DD
 */
function normalizeDate(val: any): string {
  if (!val) return '2011-01-01';
  
  if (typeof val === 'number') {
    // Excel date serial number
    const date = new Date(Math.round((val - 25569) * 86400 * 1000));
    return date.toISOString().split('T')[0];
  }

  const str = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) {
    const [, d, m, y] = dmyMatch;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  return str;
}

/**
 * Standardize religion string
 */
function normalizeReligion(val: any): Religion {
  if (!val) return 'Islam';
  const str = String(val).trim().toLowerCase();
  if (str.includes('kristen') || str.includes('protestan')) return 'Kristen Protestan';
  if (str.includes('katolik')) return 'Katolik';
  if (str.includes('hindu')) return 'Hindu';
  if (str.includes('buddha') || str.includes('budha')) return 'Buddha';
  if (str.includes('konghucu') || str.includes('khonghucu')) return 'Konghucu';
  if (str.includes('lain')) return 'Lainnya';
  return 'Islam';
}

/**
 * Standardize gender string (L/P)
 */
function normalizeGender(val: any): Gender {
  if (!val) return 'L';
  const str = String(val).trim().toUpperCase();
  if (str.startsWith('P') || str.includes('PEREMPUAN') || str.includes('WANITA')) {
    return 'P';
  }
  return 'L';
}

/**
 * Standardize status string
 */
function normalizeStatus(val: any): StudentStatus {
  if (!val) return 'Aktif';
  const str = String(val).trim().toLowerCase();
  if (str.includes('lulus')) return 'Lulus';
  if (str.includes('mutasi') || str.includes('pindah')) return 'Mutasi Keluar';
  if (str.includes('drop') || str.includes('keluar')) return 'Drop Out';
  if (str.includes('meninggal')) return 'Meninggal';
  return 'Aktif';
}

/**
 * Fuzzy getter for row object (handles case variations and underscores/spaces)
 */
function getCol(row: any, ...keys: string[]): any {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
      return row[k];
    }
  }

  // Case-insensitive lookup
  const rowKeys = Object.keys(row);
  for (const targetKey of keys) {
    const cleanedTarget = targetKey.toLowerCase().replace(/[\s_\-\.\/]/g, '');
    for (const rk of rowKeys) {
      const cleanedRk = rk.toLowerCase().replace(/[\s_\-\.\/]/g, '');
      if (cleanedRk === cleanedTarget) {
        if (row[rk] !== undefined && row[rk] !== null && String(row[rk]).trim() !== '') {
          return row[rk];
        }
      }
    }
  }

  return undefined;
}

/**
 * Parse an Excel or CSV file buffer into structured student records
 */
export async function parseExcelOrCsvFile(file: File): Promise<ImportParseSummary> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        // Find primary sheet
        const sheetName = workbook.SheetNames.find(
          (s) => !s.toLowerCase().includes('petunjuk') && !s.toLowerCase().includes('guide') && !s.toLowerCase().includes('instruksi')
        ) || workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          throw new Error('Lembar kerja data tidak ditemukan.');
        }

        const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (rawJson.length === 0) {
          resolve({
            totalRows: 0,
            validRows: 0,
            invalidRows: 0,
            results: [],
          });
          return;
        }

        const results: ParsedRowResult[] = [];
        let validCount = 0;
        let invalidCount = 0;

        rawJson.forEach((row, index) => {
          const rowNumber = index + 2; // header is row 1
          const errors: string[] = [];
          const warnings: string[] = [];

          const namaLengkap = getCol(row, 'NAMA_LENGKAP', 'NAMA', 'NAMA_SISWA', 'NAMA LENGKAP', 'Nama Siswa');
          const noInduk = getCol(row, 'NO_INDUK', 'NIS', 'NO INDUK', 'NOMOR_INDUK', 'No Induk');
          const nisn = getCol(row, 'NISN', 'NISN_SISWA', 'NOMOR_NISN');

          if (!namaLengkap) {
            errors.push('Kolom Nama Lengkap wajib diisi.');
          }

          if (!noInduk && !nisn) {
            warnings.push('Nomor Induk / NISN kosong, sistem akan menghasilkan No Induk otomatis.');
          }

          const rawGender = getCol(row, 'JENIS_KELAMIN', 'JK', 'GENDER', 'L_P');
          const jenisKelamin = normalizeGender(rawGender);

          const rawReligion = getCol(row, 'AGAMA', 'AGAMA_SISWA');
          const agama = normalizeReligion(rawReligion);

          const rawStatus = getCol(row, 'STATUS_SISWA', 'STATUS');
          const status = normalizeStatus(rawStatus);

          const studentData: Partial<Student> = {
            noInduk: noInduk ? String(noInduk).trim() : '',
            nisn: nisn ? String(nisn).trim() : '',
            nik: String(getCol(row, 'NIK_SISWA', 'NIK') || '').trim(),
            noKk: String(getCol(row, 'NO_KK', 'KK') || '').trim(),
            namaLengkap: String(namaLengkap || '').trim().toUpperCase(),
            namaPanggilan: String(getCol(row, 'NAMA_PANGGILAN', 'PANGGILAN') || '').trim(),
            jenisKelamin,
            tempatLahir: String(getCol(row, 'TEMPAT_LAHIR', 'TEMPAT LAHIR', 'TMP_LAHIR') || 'Depok').trim(),
            tanggalLahir: normalizeDate(getCol(row, 'TANGGAL_LAHIR', 'TGL_LAHIR', 'TGL LAHIR')),
            agama,
            kewarganegaraan: String(getCol(row, 'KEWARGANEGARAAN', 'WARGA_NEGARA') || 'WNI').trim(),
            anakKe: Number(getCol(row, 'ANAK_KE', 'ANAK KE') || 1),
            jumlahSaudaraKandung: Number(getCol(row, 'JUMLAH_SAUDARA_KANDUNG', 'SAUDARA_KANDUNG', 'JML_SAUDARA') || 1),
            jumlahSaudaraTiri: Number(getCol(row, 'JUMLAH_SAUDARA_TIRI') || 0),
            jumlahSaudaraAngkat: Number(getCol(row, 'JUMLAH_SAUDARA_ANGKAT') || 0),
            statusKeluarga: (getCol(row, 'STATUS_KELUARGA') || 'Anak Kandung') as any,
            bahasaIbu: String(getCol(row, 'BAHASA_IBU', 'BAHASA') || 'Bahasa Indonesia').trim(),

            // Alamat
            alamat: String(getCol(row, 'ALAMAT_JALAN', 'ALAMAT', 'ALAMAT_RUMAH') || 'Jl. Raya Pendidikan').trim(),
            rt: String(getCol(row, 'RT') || '01').trim(),
            rw: String(getCol(row, 'RW') || '01').trim(),
            dusun: String(getCol(row, 'DUSUN') || '').trim(),
            kelurahanDesa: String(getCol(row, 'KELURAHAN_DESA', 'KELURAHAN', 'DESA') || '').trim(),
            kecamatan: String(getCol(row, 'KECAMATAN') || '').trim(),
            kabupatenKota: String(getCol(row, 'KABUPATEN_KOTA', 'KOTA', 'KABUPATEN') || '').trim(),
            provinsi: String(getCol(row, 'PROVINSI') || 'Jawa Barat').trim(),
            kodePos: String(getCol(row, 'KODE_POS', 'KODEPOS') || '').trim(),
            tinggalDengan: (getCol(row, 'TINGGAL_DENGAN', 'TINGGAL_BERSAMA') || 'Orang Tua') as any,
            jarakKeSekolahKm: Number(getCol(row, 'JARAK_KE_SEKOLAH_KM', 'JARAK_KM') || 1),
            transportasi: (getCol(row, 'TRANSPORTASI') || 'Jalan Kaki') as any,
            noHpSiswa: String(getCol(row, 'NO_HP_SISWA', 'HP_SISWA') || '').trim(),
            emailSiswa: String(getCol(row, 'EMAIL_SISWA', 'EMAIL') || '').trim(),

            // Kesehatan
            kesehatan: {
              golonganDarah: (getCol(row, 'GOLONGAN_DARAH', 'GOL_DARAH') || 'Tidak Tahu') as any,
              penyakitPernahDiderita: String(getCol(row, 'PENYAKIT_DIDERITA', 'RIWAYAT_PENYAKIT') || 'Tidak Ada').trim(),
              kelainanJasmani: String(getCol(row, 'KELAINAN_JASMANI') || 'Tidak Ada').trim(),
              tinggiBadanCm: Number(getCol(row, 'TINGGI_BADAN_CM', 'TINGGI_BADAN') || 150),
              beratBadanKg: Number(getCol(row, 'BERAT_BADAN_KG', 'BERAT_BADAN') || 40),
            },

            // Orang Tua
            ayah: {
              nama: String(getCol(row, 'NAMA_AYAH', 'AYAH') || '-').trim(),
              nik: String(getCol(row, 'NIK_AYAH') || '').trim(),
              agama: normalizeReligion(getCol(row, 'AGAMA_AYAH')),
              kewarganegaraan: 'WNI',
              pendidikan: String(getCol(row, 'PENDIDIKAN_AYAH') || 'SMA').trim(),
              pekerjaan: String(getCol(row, 'PEKERJAAN_AYAH') || 'Wiraswasta').trim(),
              penghasilanBulanan: String(getCol(row, 'PENGHASILAN_AYAH') || 'Rp 3.000.000 - Rp 5.000.000').trim(),
              noHp: String(getCol(row, 'NO_HP_AYAH', 'HP_AYAH') || '').trim(),
              statusHidup: (getCol(row, 'STATUS_HIDUP_AYAH') || 'Masih Hidup') as any,
            },

            ibu: {
              nama: String(getCol(row, 'NAMA_IBU', 'IBU') || '-').trim(),
              nik: String(getCol(row, 'NIK_IBU') || '').trim(),
              agama: normalizeReligion(getCol(row, 'AGAMA_IBU')),
              kewarganegaraan: 'WNI',
              pendidikan: String(getCol(row, 'PENDIDIKAN_IBU') || 'SMA').trim(),
              pekerjaan: String(getCol(row, 'PEKERJAAN_IBU') || 'Ibu Rumah Tangga').trim(),
              penghasilanBulanan: String(getCol(row, 'PENGHASILAN_IBU') || 'Tidak Ada').trim(),
              noHp: String(getCol(row, 'NO_HP_IBU', 'HP_IBU') || '').trim(),
              statusHidup: (getCol(row, 'STATUS_HIDUP_IBU') || 'Masih Hidup') as any,
            },

            wali: getCol(row, 'NAMA_WALI') ? {
              nama: String(getCol(row, 'NAMA_WALI')).trim(),
              nik: String(getCol(row, 'NIK_WALI') || '').trim(),
              hubungan: String(getCol(row, 'HUBUNGAN_WALI') || 'Keluarga').trim(),
              pekerjaan: String(getCol(row, 'PEKERJAAN_WALI') || '').trim(),
              noHp: String(getCol(row, 'NO_HP_WALI') || '').trim(),
            } : undefined,

            // Sekolah
            sekolahAsalTK: String(getCol(row, 'ASAL_SEKOLAH_TK_SD', 'ASAL_SEKOLAH', 'SEKOLAH_ASAL') || '-').trim(),
            noIjazahTK: String(getCol(row, 'NO_IJAZAH_SEBELUMNYA', 'NO_IJAZAH_ASAL') || '').trim(),
            tanggalDiterima: normalizeDate(getCol(row, 'TANGGAL_DITERIMA', 'TGL_DITERIMA')),
            diterimaDiKelas: String(getCol(row, 'DITERIMA_DI_KELAS') || '7').trim(),
            kelasSekarang: String(getCol(row, 'KELAS_SEKARANG', 'KELAS', 'ROMBEL') || '7A').trim(),
            status,
            tahunMasuk: String(getCol(row, 'TAHUN_MASUK') || new Date().getFullYear().toString()).trim(),
            raport: [],
          };

          const isValid = errors.length === 0;
          if (isValid) {
            validCount++;
          } else {
            invalidCount++;
          }

          results.push({
            rowNumber,
            data: studentData,
            isValid,
            errors,
            warnings,
          });
        });

        resolve({
          totalRows: rawJson.length,
          validRows: validCount,
          invalidRows: invalidCount,
          results,
        });
      } catch (err: any) {
        reject(new Error(err?.message || 'Gagal membaca berkas Excel / CSV.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file berkas.'));
    };

    reader.readAsArrayBuffer(file);
  });
}
