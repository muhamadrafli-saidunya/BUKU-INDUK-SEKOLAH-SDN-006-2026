import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  Award, 
  UserMinus, 
  GraduationCap, 
  CreditCard, 
  Building2, 
  School,
  SearchCheck, 
  Sparkles, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  UserCircle, 
  Eye, 
  KeyRound, 
  Settings,
  LogOut,
  Image as ImageIcon,
  Camera,
  Stamp,
  Sun,
  Moon
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { cn } from '../../lib/utils';
import { TutWuriHandayaniSDLogo } from '../../utils/logoHelper';
import { EditLogoModal } from '../modals/EditLogoModal';

export type ActiveTab = 
  | 'dashboard'
  | 'students'
  | 'teachers'
  | 'reports'
  | 'school-profile'
  | 'edit-logo'
  | 'admin-settings'
  | 'print-buku-induk'
  | 'print-blank-buku-induk'
  | 'raport'
  | 'mutasi'
  | 'sttb'
  | 'kartu-pelajar'
  | 'public-verify'
  | 'analytics';


interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  onClose?: () => void;
  onOpenEditLogo?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  onClose,
  onOpenEditLogo,
}) => {
  const { schoolProfile, currentRole, students, adminUsers, logout, darkMode, toggleDarkMode } = useSchool();
  const [isEditLogoModalOpen, setIsEditLogoModalOpen] = useState(false);

  const handleOpenEditLogo = () => {
    setIsEditLogoModalOpen(true);
    if (onOpenEditLogo) {
      onOpenEditLogo();
    }
  };

  const handleToggle = (open: boolean) => {
    if (setIsOpen) {
      setIsOpen(open);
    } else if (!open && onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const activeCount = students.filter(s => s.status === 'Aktif').length;
  const teacherCount = adminUsers.length;

  const menuItems: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
    roles?: ('admin' | 'user' | 'umum')[];
    category: string;
    isModalAction?: boolean;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'user', 'umum'],
      category: 'MENU UTAMA',
    },
    {
      id: 'students',
      label: 'Data Siswa',
      icon: Users,
      badge: activeCount,
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
      roles: ['admin', 'user', 'umum'],
      category: 'MENU UTAMA',
    },
    {
      id: 'teachers',
      label: 'Data Guru',
      icon: GraduationCap,
      badge: teacherCount,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      roles: ['admin', 'user', 'umum'],
      category: 'MENU UTAMA',
    },
    {
      id: 'reports',
      label: 'Laporan',
      icon: FileText,
      roles: ['admin', 'user'],
      category: 'MENU UTAMA',
    },
    {
      id: 'public-verify',
      label: 'Cek NISN Siswa',
      icon: SearchCheck,
      roles: ['admin', 'user', 'umum'],
      category: 'LAYANAN',
    },
    {
      id: 'school-profile',
      label: 'Identitas Sekolah',
      icon: School,
      roles: ['admin', 'user'],
      category: 'PENGATURAN',
    },
    {
      id: 'edit-logo',
      label: 'Ubah Logo & Stempel',
      icon: ImageIcon,
      badge: 'Resmi',
      badgeColor: 'bg-amber-400 text-slate-950 font-bold',
      roles: ['admin', 'user'],
      category: 'PENGATURAN',
      isModalAction: true,
    },
    {
      id: 'admin-settings',
      label: 'Hak Akses & Keamanan',
      icon: KeyRound,
      roles: ['admin'],
      category: 'PENGATURAN',
    },
  ];

  // Group menus by category
  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      <aside
        id="sidebar"
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#002b80] text-white border-r border-[#001f5c] transition-all duration-300 ease-in-out shadow-xl",
          isOpen ? "w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between h-16 px-3.5 border-b border-[#003da6] bg-[#002266]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <button
              type="button"
              onClick={handleOpenEditLogo}
              className="relative group w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center text-slate-950 font-black shadow-md shrink-0 border border-white/20 hover:border-amber-400 hover:scale-105 transition-all cursor-pointer overflow-hidden"
              title="Klik untuk Mengubah Logo & Lambang Sekolah"
            >
              {schoolProfile.logoUrl ? (
                <img 
                  src={schoolProfile.logoUrl} 
                  alt="Logo Sekolah" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <TutWuriHandayaniSDLogo className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-slate-950/80 text-[7px] leading-tight text-amber-300 font-black flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-3.5 h-3.5 text-amber-300 mb-0.5" />
                <span>UBAH</span>
              </div>
            </button>
            {isOpen && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm tracking-wide text-white leading-tight truncate">
                  BUKU INDUK
                </span>
                <button
                  type="button"
                  onClick={handleOpenEditLogo}
                  className="text-[11px] font-medium text-amber-300 hover:text-amber-200 hover:underline truncate text-left flex items-center gap-1 group/btn cursor-pointer"
                  title="Klik untuk Ubah Logo & Nama Sekolah"
                >
                  <span className="truncate">{schoolProfile.namaSekolah}</span>
                  <Sparkles className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 text-amber-300 shrink-0 transition-opacity" />
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => handleToggle(!isOpen)}
            className="p-1.5 rounded-md text-blue-200 hover:text-white hover:bg-blue-800/60 hidden lg:flex items-center justify-center transition-colors cursor-pointer"
            title={isOpen ? 'Ciutkan Sidebar' : 'Lebarkan Sidebar'}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* User Role Indicator Banner */}
        <div className="px-3 py-2.5 bg-[#001d52] border-b border-[#003399]">
          <div className="flex items-center gap-2.5">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
              currentRole === 'admin' ? 'bg-amber-500 text-slate-950' : currentRole === 'user' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-slate-900'
            )}>
              {currentRole === 'admin' ? <ShieldCheck className="w-4 h-4" /> : currentRole === 'user' ? <UserCircle className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </div>
            {isOpen && (
              <div className="flex flex-col truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-100 uppercase">
                    {currentRole === 'admin' ? 'Kepsek / Admin TU' : currentRole === 'user' ? 'Guru / Wali Kelas' : 'Tamu / Umum'}
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-blue-200 truncate">
                  NPSN: {schoolProfile.npsn}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {categories.map((category) => {
            const itemsInCategory = menuItems.filter(
              item => item.category === category && (!item.roles || item.roles.includes(currentRole))
            );

            if (itemsInCategory.length === 0) return null;

            return (
              <div key={category} className="space-y-1">
                {isOpen && (
                  <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-blue-300/80">
                    {category}
                  </div>
                )}
                {itemsInCategory.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.isModalAction || item.id === 'edit-logo') {
                          handleOpenEditLogo();
                        } else {
                          setActiveTab(item.id);
                        }
                        if (window.innerWidth < 1024) {
                          handleClose();
                        }
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 relative group cursor-pointer",
                        isActive
                          ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                          : "text-blue-100 hover:bg-[#003da6] hover:text-white"
                      )}
                      title={!isOpen ? item.label : undefined}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-slate-950 font-bold" : "text-blue-200 group-hover:text-white")} />
                      
                      {isOpen && (
                        <span className="truncate flex-1 text-left">
                          {item.label}
                        </span>
                      )}

                      {isOpen && item.badge !== undefined && (
                        <span className={cn("px-1.5 py-0.5 text-[10px] font-bold rounded-md shadow-xs", item.badgeColor || "bg-blue-800 text-white")}>
                          {item.badge}
                        </span>
                      )}

                      {/* Tooltip for collapsed state */}
                      {!isOpen && (
                        <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Toggle Mode Malam / Terang */}
        <div className="p-2 border-t border-[#003399]">
          <button
            id="btn-toggle-dark-mode-sidebar"
            onClick={toggleDarkMode}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all group cursor-pointer",
              darkMode 
                ? "bg-slate-900/70 hover:bg-slate-900 text-amber-300 border border-amber-400/30" 
                : "text-blue-100 hover:text-white hover:bg-white/10",
              !isOpen && "justify-center"
            )}
            title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-blue-200 shrink-0 group-hover:text-white" />
            )}
            {isOpen && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="truncate">{darkMode ? 'Mode Gelap' : 'Mode Terang'}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/15 text-amber-200">
                  {darkMode ? 'Gelap' : 'Terang'}
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Keluar / Ganti Akun */}
        <div className="p-2 border-t border-[#003399]">
          <button
            onClick={() => logout()}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-red-200 hover:text-white hover:bg-red-950/60 transition-colors group cursor-pointer",
              !isOpen && "justify-center"
            )}
            title="Keluar / Ganti Akun"
          >
            <LogOut className="w-4 h-4 text-red-300 group-hover:text-white shrink-0" />
            {isOpen && <span className="truncate">Keluar / Ganti Akun</span>}
          </button>
        </div>

        {/* Footer info */}
        {isOpen && (
          <div className="p-3 bg-[#002266] border-t border-[#003da6] text-center">
            <div className="text-[11px] font-medium text-blue-200">
              Buku Induk Register Kemdikbud
            </div>
            <div className="text-[10px] text-amber-300 font-bold mt-0.5">
              Standar Permendikbud RI
            </div>
          </div>
        )}
      </aside>

      {/* Edit Logo Modal Dialog */}
      <EditLogoModal
        isOpen={isEditLogoModalOpen}
        onClose={() => setIsEditLogoModalOpen(false)}
      />
    </>
  );
};

