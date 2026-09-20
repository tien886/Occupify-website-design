import React, { useState, useRef, useEffect } from "react"
import {
  House,
  UsersThree,
  BriefcaseMetal,
  ChatCircleDots,
  Bell,
  MagnifyingGlass,
  Image,
  Video,
  Article,
  ThumbsUp,
  ChatCircle,
  ArrowsClockwise,
  PaperPlaneTilt,
  Globe,
  DotsThreeVertical,
  X,
  CaretDown,
  Plus,
  Bookmark,
  SealCheck,
  Buildings,
  UserCircle,
  LinkSimple,
  Users,
  UserPlus,
  ArrowRight,
  Lightbulb,
  Megaphone,
  Handshake,
  FileText,
  Clock,
  CheckCircle,
  Warning,
  CalendarBlank,
  User,
  CaretLeft,
  CaretRight,
  Envelope,
  Phone,
  Briefcase,
  GraduationCap,
  Certificate,
  ChatDots,
  MapPin,
  NotePencil,
  Paperclip,
  Image as ImageIcon,
  Smiley,
  FolderPlus,
  ClipboardText,
  Star,
  UserPlus as UserPlusIcon,
  Lock,
  Eye,
  EyeSlash,
  ArrowLeft,
  CheckFat,
  Sparkle,
  GraduationCap as GraduationCapIcon,
  Code,
  ChartLine,
  PaintBrush,
  Cpu,
  Storefront,
  Wallet,
  Translate,
  Robot,
  ShieldCheck,
  Globe as GlobeIcon,
  TrendUp,
  TrendDown,
  ArrowUpRight,
  ArrowDownRight,
  Funnel,
  Bank,
  Copy,
  Check,
  QrCode,
  ArrowDownLeft,
} from "@phosphor-icons/react"

function nameToGmail(name: string): string {
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLowerCase()
      .replace(/\s+/g, "") + "@gmail.com"
  )
}

const ME = {
  name: "Nguyễn Minh Khoa",
  headline: "nguyeminhkhoa@gmail.com",
  location: "Hà Nội, Việt Nam",
  connections: 534,
}

function HeaderBackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.30)",
        borderRadius: 9999,
        padding: "4px 14px",
        color: "#fff",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 16,
        transition: "background 150ms ease",
      }}
      onMouseEnter={(e) =>
      ((e.currentTarget as HTMLElement).style.background =
        "rgba(255,255,255,0.25)")
      }
      onMouseLeave={(e) =>
      ((e.currentTarget as HTMLElement).style.background =
        "rgba(255,255,255,0.15)")
      }
    >
      <ArrowRight size={13} style={{ transform: "rotate(180deg)" }} />
      Quay lại
    </button>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  name,
  size = 48,
  border = false,
}: {
  name: string
  size?: number
  border?: boolean
}) {
  const palette = [
    "#0A66C2",
    "#06407F",
    "#057642",
    "#915907",
    "#44712E",
    "#C03A2B",
    "#3675BD",
  ]
  const color = palette[name.charCodeAt(0) % palette.length]
  const initials = name
    .split(" ")
    .slice(-2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: "9999px",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: Math.round(size * 0.36),
        fontWeight: 700,
        border: border ? "3px solid #fff" : "none",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  )
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 9999,
        fontSize: 14,
        fontWeight: 600,
        zIndex: 600,
        display: "flex",
        alignItems: "center",
        gap: 8,
        animation: "toastIn 250ms ease",
        whiteSpace: "nowrap",
      }}
    >
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
      <SealCheck size={18} color="#57C36D" weight="fill" />
      {message}
    </div>
  )
}

// ─── Shared Navbar ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home", label: "Trang chủ", Icon: House },
  { id: "projects", label: "Quản lý dự án", Icon: BriefcaseMetal },
  { id: "saved", label: "Mục đã lưu", Icon: Bookmark },
  { id: "notifications", label: "Thông báo", Icon: Bell, badge: 3 },
]

function Navbar({
  active,
  setActive,
  onOpenMyProfile,
  onLogout,
  onOpenFinancialHistory,
  onOpenWallet,
}: {
  active: string
  setActive: (v: string) => void
  onOpenMyProfile?: () => void
  onLogout?: () => void
  onOpenFinancialHistory?: () => void
  onOpenWallet?: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
        background: "#fff",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        height: 52,
      }}
    >
      <div
        style={{
          maxWidth: 1128,
          margin: "0 auto",
          padding: "0 16px",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "#0A66C2",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "-0.04em",
            }}
          >
            O
          </div>
        </div>

        {/* Nav items */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            height: "100%",
            gap: 2,
          }}
        >
          {NAV_ITEMS.map(({ id, label, Icon, badge }) => {
            const isActive = active === id
            const activeColor = isActive
              ? "rgba(0,0,0,0.90)"
              : "rgba(0,0,0,0.60)"
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  padding: "0 14px",
                  background: "none",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: isActive
                    ? "2px solid rgba(0,0,0,0.90)"
                    : "2px solid transparent",
                  cursor: "pointer",
                  color: activeColor,
                  position: "relative",
                  transition: "color 150ms ease",
                  minWidth: 60,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "#F4F2EE"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "none"
                }}
              >
                {badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 10,
                      background: "#C03A2B",
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                      lineHeight: 1,
                      padding: "2px 4px",
                      borderRadius: 9999,
                      minWidth: 14,
                      textAlign: "center",
                    }}
                  >
                    {badge}
                  </span>
                )}
                <Icon size={20} weight={isActive ? "fill" : "regular"} />
                <span style={{ fontSize: 11, fontWeight: 600, lineHeight: 1 }}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Me — with dropdown */}
        <div
          ref={menuRef}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "stretch",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 1,
              background: "rgba(0,0,0,0.08)",
              margin: "10px 0",
              alignSelf: "center",
              height: 28,
            }}
          />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              padding: "0 12px",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: menuOpen
                ? "2px solid rgba(0,0,0,0.90)"
                : "2px solid transparent",
              cursor: "pointer",
              color: "rgba(0,0,0,0.60)",
            }}
            onMouseEnter={(e) => {
              if (!menuOpen)
                (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "none"
            }}
          >
            <Avatar name={ME.name} size={22} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Tôi{" "}
              <CaretDown
                size={10}
                weight="bold"
                style={{
                  transform: menuOpen ? "rotate(180deg)" : "none",
                  transition: "transform 150ms",
                }}
              />
            </span>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                right: 0,
                background: "#fff",
                borderRadius: 8,
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
                minWidth: 220,
                zIndex: 300,
                overflow: "hidden",
              }}
            >
              {/* Profile header in dropdown */}
              <div
                style={{
                  padding: "16px 16px 12px",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={ME.name} size={44} />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: "rgba(0,0,0,0.90)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ME.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(0,0,0,0.55)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: 1.4,
                      }}
                    >
                      {ME.headline}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              {[
                {
                  label: "Hồ sơ của tôi",
                  action: () => {
                    setMenuOpen(false)
                    onOpenMyProfile?.()
                  },
                },
                {
                  label: "Ví của tôi",
                  action: () => {
                    setMenuOpen(false)
                    onOpenWallet?.()
                  },
                },
                {
                  label: "Lịch sử giao dịch",
                  action: () => {
                    setMenuOpen(false)
                    onOpenFinancialHistory?.()
                  },
                },
                {
                  label: "Đăng xuất",
                  action: () => {
                    setMenuOpen(false)
                    onLogout?.()
                  },
                },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "11px 16px",
                    background: "none",
                    border: "none",
                    fontSize: 14,
                    color: "rgba(0,0,0,0.80)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 500,
                    transition: "background 150ms",
                  }}
                  onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#F4F2EE")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "none")
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// JOBS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

interface Contract {
  id: number
  title: string
  client: string
  value: string
  deadline: string
  status: "in-progress" | "pending" | "opening" | "overdue"
}

const MY_CONTRACTS: Contract[] = [
  {
    id: 1,
    title: "Redesign hệ thống UI cho ứng dụng Fintech",
    client: "VNPAY Corporation",
    value: "45.000.000 ₫",
    deadline: "30 thg 9, 2026",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Xây dựng Design System cho nền tảng SaaS",
    client: "Base.vn",
    value: "28.000.000 ₫",
    deadline: "15 thg 10, 2026",
    status: "in-progress",
  },
  {
    id: 3,
    title: "UX Research & Audit cho mobile app",
    client: "Momo",
    value: "18.500.000 ₫",
    deadline: "5 thg 10, 2026",
    status: "pending",
  },
]

const OTHER_CONTRACTS: Contract[] = [
  {
    id: 4,
    title: "Thiết kế landing page chiến dịch Marketing",
    client: "Shopee Vietnam",
    value: "12.000.000 ₫",
    deadline: "20 thg 8, 2026",
    status: "opening",
  },
  {
    id: 5,
    title: "Prototyping & User Testing Dashboard",
    client: "VinAI Research",
    value: "32.000.000 ₫",
    deadline: "10 thg 7, 2026",
    status: "opening",
  },
  {
    id: 6,
    title: "Brand Identity & Motion Design",
    client: "Startup NextGen VN",
    value: "22.000.000 ₫",
    deadline: "1 thg 9, 2026",
    status: "overdue",
  },
]

const STATUS_CONFIG = {
  "in-progress": {
    label: "Đang thực hiện",
    color: "#0A66C2",
    bg: "#EAF1FA",
    Icon: Clock,
  },
  pending: {
    label: "Chờ xác nhận",
    color: "#915907",
    bg: "#FFF4D6",
    Icon: Warning,
  },
  opening: {
    label: "Đang mở",
    color: "#057642",
    bg: "#E5F6E8",
    Icon: CheckCircle,
  },
  overdue: { label: "Quá hạn", color: "#C03A2B", bg: "#FBE2E2", Icon: Warning },
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Contract["status"] }) {
  const { label, color, bg, Icon } =
    STATUS_CONFIG[status] ?? STATUS_CONFIG["pending"]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: bg,
        color,
        borderRadius: 9999,
        padding: "3px 10px",
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <Icon size={11} weight="fill" />
      {label}
    </span>
  )
}

// ─── Contract List Item ───────────────────────────────────────────────────────

function ContractItem({
  contract,
  showDivider,
  onClick,
}: {
  contract: Contract
  showDivider: boolean
  onClick?: () => void
}) {
  const statusCfg = STATUS_CONFIG[contract.status] ?? STATUS_CONFIG["pending"]
  return (
    <>
      {showDivider && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", margin: "0" }} />
      )}
      <div
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          padding: "14px 20px",
          cursor: "pointer",
          transition: "background 150ms ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "none")
        }
      >
        {/* Icon avatar */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            flexShrink: 0,
            background: statusCfg.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FileText size={20} color={statusCfg.color} weight="regular" />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "rgba(0,0,0,0.90)",
              lineHeight: 1.3,
              marginBottom: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {contract.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(0,0,0,0.60)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <User size={12} weight="regular" />
            {contract.client}
            <span style={{ color: "rgba(0,0,0,0.25)" }}>·</span>
            <CalendarBlank size={12} weight="regular" />
            {contract.deadline}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(0,0,0,0.60)",
              marginTop: 4,
            }}
          >
            {contract.value}
          </div>
        </div>

        {/* Badge */}
        <div style={{ paddingTop: 2 }}>
          <StatusBadge status={contract.status} />
        </div>
      </div>
    </>
  )
}

// ─── Contract List Card ───────────────────────────────────────────────────────

function ContractListCard({
  title,
  contracts,
  emptyText,
  onSelectContract,
}: {
  title: string
  contracts: Contract[]
  emptyText: string
  onSelectContract?: (c: Contract) => void
}) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? contracts : contracts.slice(0, 3)

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 20px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ fontWeight: 700, fontSize: 16, color: "rgba(0,0,0,0.90)" }}
        >
          {title}
        </span>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "#0A66C2",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.textDecoration =
            "underline")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.textDecoration = "none")
          }
        >
          Xem tất cả
        </button>
      </div>

      {/* Items */}
      {contracts.length === 0 ? (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "rgba(0,0,0,0.45)",
            fontSize: 13,
          }}
        >
          {emptyText}
        </div>
      ) : (
        <>
          {visible.map((c, i) => (
            <ContractItem
              key={c.id}
              contract={c}
              showDivider={i > 0}
              onClick={() => onSelectContract?.(c)}
            />
          ))}
          {contracts.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                padding: "12px 20px",
                background: "none",
                border: "none",
                borderTop: "1px solid rgba(0,0,0,0.08)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.60)",
                fontFamily: "inherit",
                transition: "background 150ms ease, color 150ms ease",
              }}
              onMouseEnter={(e) => {
                ; (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
                  ; (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.90)"
              }}
              onMouseLeave={(e) => {
                ; (e.currentTarget as HTMLElement).style.background = "none"
                  ; (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.60)"
              }}
            >
              {showAll ? "Ẩn bớt" : `Xem thêm ${contracts.length - 3} hợp đồng`}
              <ArrowRight
                size={14}
                style={{
                  transform: showAll ? "rotate(90deg)" : "none",
                  transition: "transform 150ms ease",
                }}
              />
            </button>
          )}
        </>
      )}
    </div>
  )
}

// ─── Action Card (2×2 grid cell) ─────────────────────────────────────────────

function ActionCard({
  Icon,
  label,
  description,
  iconColor = "#0A66C2",
  iconBg = "#EAF1FA",
  onClick,
  descriptionMaxWidth = 220,
}: {
  Icon: React.ElementType
  label: string
  description: string
  iconColor?: string
  iconBg?: string
  onClick?: () => void
  descriptionMaxWidth?: number | string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "32px 20px",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        border: "none",
        cursor: "pointer",
        width: "100%",
        textAlign: "center",
        fontFamily: "inherit",
        transition: "background 150ms ease, box-shadow 150ms ease",
      }}
      onMouseEnter={(e) => {
        ; (e.currentTarget as HTMLElement).style.background = "#EAF1FA"
          ; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px #0A66C2"
      }}
      onMouseLeave={(e) => {
        ; (e.currentTarget as HTMLElement).style.background = "#fff"
          ; (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 0 1px rgba(0,0,0,0.08)"
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "9999px",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={36} color={iconColor} weight="regular" />
      </div>

      {/* Text */}
      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "rgba(0,0,0,0.90)",
            marginBottom: 5,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(0,0,0,0.60)",
            lineHeight: 1.45,
            maxWidth: descriptionMaxWidth,
          }}
        >
          {description}
        </div>
      </div>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// JOB SEARCH PAGE
// ═══════════════════════════════════════════════════════════════════════════════

interface JobListing {
  id: number
  title: string
  company: string
  companyInitials: string
  companyColor: string
  location: string
  postedAgo: string
  budget: string
  avgBid: string
  description: string
  skills: string[]
  hiring: boolean
}

const JOB_LISTINGS: JobListing[] = [
  {
    id: 1,
    title: "Senior UI/UX Designer – Fintech App Redesign",
    company: "VNPAY Corporation",
    companyInitials: "VNP",
    companyColor: "#0A66C2",
    location: "Hà Nội · Remote",
    postedAgo: "3 giờ trước",
    budget: "45.000.000 ₫",
    avgBid: "Avg 38.200.000 ₫",
    description:
      "Chúng tôi đang tìm kiếm một Senior UI/UX Designer có kinh nghiệm trong lĩnh vực Fintech để dẫn dắt việc tái thiết kế toàn bộ giao diện ứng dụng thanh toán di động. Ứng viên cần có khả năng phân tích người dùng, xây dựng Design System và làm việc chặt chẽ với đội Engineering.",
    skills: ["Figma", "Design System", "UX Research", "Prototyping", "Fintech"],
    hiring: true,
  },
  {
    id: 2,
    title: "Product Designer – Consumer Super App",
    company: "Zalo / VNG",
    companyInitials: "VNG",
    companyColor: "#06407F",
    location: "TP.HCM · Hybrid",
    postedAgo: "5 giờ trước",
    budget: "55.000.000 ₫",
    avgBid: "Avg 48.000.000 ₫",
    description:
      "Vị trí Product Designer tại Zalo, nền tảng nhắn tin và mạng xã hội hàng đầu Việt Nam với hơn 75 triệu người dùng. Bạn sẽ thiết kế các tính năng mới cho ứng dụng di động, cộng tác với Product Manager và Data Analyst để đưa ra quyết định dựa trên dữ liệu.",
    skills: [
      "Figma",
      "Mobile Design",
      "User Testing",
      "Interaction Design",
      "Zeplin",
    ],
    hiring: true,
  },
  {
    id: 3,
    title: "Lead UX Designer – E-Commerce Platform",
    company: "Tiki Corporation",
    companyInitials: "TKI",
    companyColor: "#C03A2B",
    location: "TP.HCM · Toàn thời gian",
    postedAgo: "1 ngày trước",
    budget: "60.000.000 ₫",
    avgBid: "Avg 52.500.000 ₫",
    description:
      "Tiki đang tìm Lead UX Designer để dẫn dắt đội thiết kế 8 người trong việc nâng cấp trải nghiệm mua sắm trên web và app. Bạn sẽ là người đề ra chiến lược UX, xây dựng quy trình nghiên cứu người dùng và đảm bảo tính nhất quán của sản phẩm trên mọi nền tảng.",
    skills: [
      "Leadership",
      "UX Strategy",
      "Figma",
      "User Research",
      "A/B Testing",
    ],
    hiring: true,
  },
  {
    id: 4,
    title: "UX/UI Designer – Mobile Banking App",
    company: "Techcombank",
    companyInitials: "TCB",
    companyColor: "#915907",
    location: "Hà Nội · Tại văn phòng",
    postedAgo: "2 ngày trước",
    budget: "40.000.000 ₫",
    avgBid: "Avg 35.000.000 ₫",
    description:
      "Techcombank tuyển UX/UI Designer cho dự án nâng cấp ứng dụng ngân hàng di động TCB. Vị trí yêu cầu tư duy thiết kế lấy người dùng làm trung tâm, kinh nghiệm với giao diện tài chính và khả năng làm việc với các tiêu chuẩn bảo mật và compliance trong ngành ngân hàng.",
    skills: ["Mobile UI", "Banking UX", "Figma", "Accessibility", "User Flow"],
    hiring: false,
  },
  {
    id: 5,
    title: "Freelance Product Designer – Startup MVP",
    company: "NextGen Ventures",
    companyInitials: "NGV",
    companyColor: "#44712E",
    location: "Remote · Toàn quốc",
    postedAgo: "3 ngày trước",
    budget: "25.000.000 ₫",
    avgBid: "Avg 20.000.000 ₫",
    description:
      "Startup công nghệ giai đoạn Seed đang tìm Freelance Product Designer để thiết kế MVP cho nền tảng kết nối doanh nghiệp B2B. Dự án kéo dài 2–3 tháng, yêu cầu thiết kế từ wireframe đến high-fidelity prototype và tham gia vào quá trình user testing với khách hàng doanh nghiệp.",
    skills: [
      "MVP Design",
      "Wireframing",
      "Figma",
      "B2B UX",
      "Rapid Prototyping",
    ],
    hiring: true,
  },
  {
    id: 6,
    title: "Design System Engineer – SaaS Platform",
    company: "Base.vn",
    companyInitials: "BSE",
    companyColor: "#3675BD",
    location: "Hà Nội · Remote-first",
    postedAgo: "4 ngày trước",
    budget: "50.000.000 ₫",
    avgBid: "Avg 44.000.000 ₫",
    description:
      "Base.vn tìm Design System Engineer có kinh nghiệm xây dựng và duy trì Design System quy mô lớn cho sản phẩm SaaS phục vụ hơn 10.000 doanh nghiệp. Bạn sẽ cộng tác chặt chẽ với frontend engineers và product designers để đảm bảo tính nhất quán trên toàn hệ thống.",
    skills: [
      "Design System",
      "Figma Variables",
      "Tokens",
      "React",
      "Documentation",
    ],
    hiring: true,
  },
  {
    id: 7,
    title: "Junior Graphic & Banner Designer – Chiến dịch Marketing",
    company: "FPT Telecom",
    companyInitials: "FPT",
    companyColor: "#F59E0B",
    location: "Hà Nội · Hybrid",
    postedAgo: "1 tháng trước",
    budget: "12.000.000 ₫",
    avgBid: "Avg 10.500.000 ₫",
    description:
      "Tuyển thiết kế đồ họa hỗ trợ các chiến dịch truyền thông và marketing số. Yêu cầu thành thạo Photoshop, Illustrator, có gu thẩm mỹ hiện đại và khả năng làm việc theo tiến độ nhanh.",
    skills: ["Photoshop", "Illustrator", "Social Media", "Graphic Design"],
    hiring: true,
  },
  {
    id: 8,
    title: "Content & SEO Copywriter Freelance",
    company: "Sendo Group",
    companyInitials: "SND",
    companyColor: "#C03A2B",
    location: "Remote · Toàn quốc",
    postedAgo: "5 ngày trước",
    budget: "8.500.000 ₫",
    avgBid: "Avg 7.800.000 ₫",
    description:
      "Tìm kiếm Content Writer phụ trách viết bài chuẩn SEO, bài giới thiệu sản phẩm và nội dung fanpage theo chủ đề công nghệ và đời sống số.",
    skills: ["SEO", "Content Writing", "Copywriting", "Creative Writing"],
    hiring: true,
  },
]

const RECENT_SEARCHES = [
  "UI/UX Designer Hà Nội",
  "Product Designer Remote",
  "Figma Freelance",
  "Design System Lead",
]

const SKILL_OPTIONS = [
  "Figma",
  "UX Research",
  "Prototyping",
  "Design System",
  "Mobile Design",
  "Interaction Design",
]

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        paddingTop: 16,
        marginTop: 16,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          padding: 0,
          marginBottom: open ? 12 : 0,
        }}
      >
        <span
          style={{ fontWeight: 700, fontSize: 14, color: "rgba(0,0,0,0.90)" }}
        >
          {title}
        </span>
        <CaretDown
          size={14}
          color="rgba(0,0,0,0.60)"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 200ms ease",
            flexShrink: 0,
          }}
        />
      </button>
      {open && children}
    </div>
  )
}

function JobFilterSidebar({
  filters,
  setFilters,
}: {
  filters: {
    types: string[]
    skills: string[]
    minBudget: string
    maxBudget: string
  }
  setFilters: React.Dispatch<React.SetStateAction<{
    types: string[]
    skills: string[]
    minBudget: string
    maxBudget: string
  }>>
}) {
  const [skillInput, setSkillInput] = useState("")
  const [recentSearches] = useState(RECENT_SEARCHES)

  const JOB_TYPES = [
    { value: "fulltime", label: "Toàn thời gian" },
    { value: "parttime", label: "Bán thời gian" },
    { value: "freelance", label: "Freelance" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
  ]

  const toggleType = (val: string) =>
    setFilters((f) => ({
      ...f,
      types: f.types.includes(val)
        ? f.types.filter((t) => t !== val)
        : [...f.types, val],
    }))

  const toggleSkill = (s: string) =>
    setFilters((f) => ({
      ...f,
      skills: f.skills.includes(s)
        ? f.skills.filter((x) => x !== s)
        : [...f.skills, s],
    }))

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !filters.skills.includes(s)) {
      setFilters((f) => ({ ...f, skills: [...f.skills, s] }))
      setSkillInput("")
    }
  }

  const inputStyle: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 4,
    padding: "7px 10px",
    fontSize: 13,
    color: "rgba(0,0,0,0.90)",
    background: "#fff",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
  }

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        padding: "20px 16px",
        position: "sticky",
        top: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span
          style={{ fontWeight: 700, fontSize: 16, color: "rgba(0,0,0,0.90)" }}
        >
          Bộ lọc
        </span>
        <button
          onClick={() =>
            setFilters({ types: [], skills: [], minBudget: "", maxBudget: "" })
          }
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: "#0A66C2",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.textDecoration =
            "underline")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.textDecoration = "none")
          }
        >
          Xóa tất cả
        </button>
      </div>

      {/* Recent Searches */}
      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: "rgba(0,0,0,0.90)",
            marginBottom: 10,
          }}
        >
          Tìm kiếm gần đây
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {recentSearches.map((s) => (
            <button
              key={s}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "5px 8px",
                borderRadius: 4,
                fontFamily: "inherit",
                fontSize: 13,
                color: "#0A66C2",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "none")
              }
            >
              <MagnifyingGlass size={13} color="#0A66C2" />
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <FilterSection title="Mức lương">
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(0,0,0,0.60)",
                display: "block",
                marginBottom: 4,
              }}
            >
              Tối thiểu
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.minBudget}
              onChange={(e) =>
                setFilters((f) => ({ ...f, minBudget: e.target.value }))
              }
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#0A66C2"
                e.target.style.boxShadow = "0 0 0 1px #0A66C2"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.15)"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(0,0,0,0.60)",
                display: "block",
                marginBottom: 4,
              }}
            >
              Tối đa
            </label>
            <input
              type="number"
              placeholder="100M"
              value={filters.maxBudget}
              onChange={(e) =>
                setFilters((f) => ({ ...f, maxBudget: e.target.value }))
              }
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#0A66C2"
                e.target.style.boxShadow = "0 0 0 1px #0A66C2"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.15)"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>
        </div>
      </FilterSection>

      {/* Skills */}
      <FilterSection title="Kỹ năng">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 10,
          }}
        >
          {SKILL_OPTIONS.map((s) => (
            <label
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={filters.skills.includes(s)}
                onChange={() => toggleSkill(s)}
                style={{
                  width: 16,
                  height: 16,
                  accentColor: "#0A66C2",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, color: "rgba(0,0,0,0.90)" }}>
                {s}
              </span>
            </label>
          ))}
        </div>

        {/* Add skill input */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Hoặc nhập kỹ năng khác..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSkill()
            }}
            style={{ ...inputStyle, paddingRight: 36 }}
            onFocus={(e) => {
              e.target.style.borderColor = "#0A66C2"
              e.target.style.boxShadow = "0 0 0 1px #0A66C2"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(0,0,0,0.15)"
              e.target.style.boxShadow = "none"
            }}
          />
          <button
            onClick={addSkill}
            style={{
              position: "absolute",
              right: 6,
              top: "50%",
              transform: "translateY(-50%)",
              background: "#0A66C2",
              border: "none",
              borderRadius: 9999,
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <Plus size={13} weight="bold" />
          </button>
        </div>

        {/* Added skills pills */}
        {filters.skills.filter((s) => !SKILL_OPTIONS.includes(s)).length >
          0 && (
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}
            >
              {filters.skills
                .filter((s) => !SKILL_OPTIONS.includes(s))
                .map((s) => (
                  <span
                    key={s}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: "#EAF1FA",
                      color: "#0A66C2",
                      borderRadius: 9999,
                      padding: "3px 10px",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {s}
                    <button
                      onClick={() => toggleSkill(s)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: "#0A66C2",
                        display: "flex",
                      }}
                    >
                      <X size={10} weight="bold" />
                    </button>
                  </span>
                ))}
            </div>
          )}
      </FilterSection>
    </div>
  )
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({
  job,
  onClick,
  isSaved,
  onToggleSave,
}: {
  job: JobListing
  onClick?: () => void
  isSaved?: boolean
  onToggleSave?: () => void
}) {
  const [localSaved, setLocalSaved] = useState(false)
  const saved = isSaved !== undefined ? isSaved : localSaved

  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        padding: "18px 20px",
        marginBottom: 8,
        cursor: "pointer",
        transition: "background 150ms ease",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "#FAFAF8")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "#fff")
      }
    >
      {/* Header row */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Company logo */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 4,
            flexShrink: 0,
            background: job.companyColor + "18",
            border: `1px solid ${job.companyColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: job.companyColor,
            letterSpacing: "-0.02em",
          }}
        >
          {job.companyInitials}
        </div>

        {/* Main info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 3,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#0A66C2",
                lineHeight: 1.3,
              }}
            >
              {job.title}
            </span>
            {job.hiring && (
              <span
                style={{
                  background: "#E5F6E8",
                  color: "#057642",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  flexShrink: 0,
                }}
              >
                Đang tuyển
              </span>
            )}
          </div>
          <div
            style={{ fontSize: 14, color: "rgba(0,0,0,0.75)", fontWeight: 600 }}
          >
            {job.company}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(0,0,0,0.60)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 3,
            }}
          >
            <Clock size={13} color="rgba(0,0,0,0.45)" />
            {job.postedAgo}
          </div>
        </div>

        {/* Budget + save */}
        <div
          style={{
            flexShrink: 0,
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "rgba(0,0,0,0.90)",
              }}
            >
              {job.budget}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (onToggleSave) {
                onToggleSave()
              } else {
                setLocalSaved(!localSaved)
              }
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 9999,
              color: saved ? "#0A66C2" : "rgba(0,0,0,0.45)",
              transition: "color 150ms ease, background 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "none")
            }
          >
            <Bookmark size={18} weight={saved ? "fill" : "regular"} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          color: "rgba(0,0,0,0.90)",
          lineHeight: 1.55,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {job.description}
      </p>

      {/* Skills footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          flexWrap: "wrap",
        }}
      >
        {job.skills.map((skill, i) => (
          <span key={skill} style={{ display: "flex", alignItems: "center" }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "#0A66C2",
                fontFamily: "inherit",
                padding: "2px 6px 2px 0",
                fontWeight: 600,
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#084FA0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#0A66C2")
              }
            >
              {skill}
            </button>
            {i < job.skills.length - 1 && (
              <span
                style={{
                  color: "rgba(0,0,0,0.20)",
                  fontSize: 12,
                  marginRight: 6,
                }}
              >
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Job Search Page ──────────────────────────────────────────────────────────

function JobSearchPage({
  onBack,
  onSelectContract,
}: {
  onBack: () => void
  onSelectContract?: (c: Contract) => void
}) {
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [sortBy, setSortBy] = useState("Mới nhất")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    types: [] as string[],
    skills: [] as string[],
    minBudget: "",
    maxBudget: "",
  })
  const TOTAL = JOB_LISTINGS.length
  const PER_PAGE = 6
  const TOTAL_PAGES = Math.ceil(TOTAL / PER_PAGE)

  const UNSPLASH_BANNER =
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1128&h=260&fit=crop&auto=format&q=80"

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      {/* Banner */}
      <div
        style={{
          position: "relative",
          height: 220,
          overflow: "hidden",
          background: "#1B3A5C",
        }}
      >
        <img
          src={UNSPLASH_BANNER}
          alt="Professionals collaborating"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,102,194,0.80) 0%, rgba(6,64,127,0.60) 100%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 1128,
              margin: "0 auto",
              padding: "0 16px",
              width: "100%",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <button
                onClick={onBack}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.30)",
                  borderRadius: 9999,
                  padding: "4px 14px",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 16,
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.25)")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.15)")
                }
              >
                <ArrowRight size={13} style={{ transform: "rotate(180deg)" }} />
                Quay lại
              </button>
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                Tìm công việc phù hợp với bạn
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.80)",
                  lineHeight: 1.55,
                  fontWeight: 400,
                }}
              >
                Hàng ngàn cơ hội đang chờ đón — từ toàn thời gian đến freelance,
                từ Hà Nội đến remote toàn cầu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 1128,
          margin: "0 auto",
          padding: "24px 16px",
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        {/* Filter sidebar */}
        <JobFilterSidebar filters={filters} setFilters={setFilters} />

        {/* Right column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Search card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              padding: "16px",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              {/* Keyword */}
              <div
                style={{
                  flex: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#EAF1FA",
                  borderRadius: 4,
                  padding: "0 12px",
                  height: 40,
                }}
              >
                <MagnifyingGlass size={16} color="rgba(0,0,0,0.45)" />
                <input
                  type="text"
                  placeholder="Từ khóa, kỹ năng, chức danh..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: 14,
                    color: "rgba(0,0,0,0.90)",
                    width: "100%",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              {/* Search button */}
              <button
                style={{
                  background: "#0A66C2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "0 28px",
                  height: 40,
                  flexShrink: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "#084FA0")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "#0A66C2")
                }
              >
                <MagnifyingGlass size={15} weight="bold" />
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              padding: "0 2px",
            }}
          >
            <div style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
              Tìm thấy{" "}
              <span style={{ fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                {TOTAL}
              </span>{" "}
              cơ hội việc làm
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Sort */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
                  Sắp xếp:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.15)",
                    borderRadius: 4,
                    padding: "5px 28px 5px 10px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.90)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    outline: "none",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 8px center",
                  }}
                >
                  {[
                    "Mới nhất",
                    "Phù hợp nhất",
                    "Lương cao nhất",
                    "Sắp hết hạn",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Pagination */}
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9999,
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: currentPage === 1 ? "#F4F2EE" : "#fff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color:
                      currentPage === 1
                        ? "rgba(0,0,0,0.30)"
                        : "rgba(0,0,0,0.60)",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1)
                      (e.currentTarget as HTMLElement).style.background =
                        "#EAF1FA"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background =
                      currentPage === 1 ? "#F4F2EE" : "#fff"
                  }}
                >
                  <ArrowRight
                    size={14}
                    style={{ transform: "rotate(180deg)" }}
                  />
                </button>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(0,0,0,0.60)",
                    padding: "0 4px",
                  }}
                >
                  {currentPage} / {TOTAL_PAGES}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))
                  }
                  disabled={currentPage === TOTAL_PAGES}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9999,
                    border: "1px solid rgba(0,0,0,0.15)",
                    background:
                      currentPage === TOTAL_PAGES ? "#F4F2EE" : "#fff",
                    cursor:
                      currentPage === TOTAL_PAGES ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color:
                      currentPage === TOTAL_PAGES
                        ? "rgba(0,0,0,0.30)"
                        : "rgba(0,0,0,0.60)",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== TOTAL_PAGES)
                      (e.currentTarget as HTMLElement).style.background =
                        "#EAF1FA"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background =
                      currentPage === TOTAL_PAGES ? "#F4F2EE" : "#fff"
                  }}
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Job cards */}
          <div>
            {JOB_LISTINGS.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() =>
                  onSelectContract?.({
                    id: job.id,
                    title: job.title,
                    client: job.company,
                    value: job.budget,
                    deadline: "30 thg 12, 2026",
                    status: "pending",
                  })
                }
              />
            ))}
          </div>

          {/* Bottom pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              padding: "16px 0 8px",
            }}
          >
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9999,
                  border:
                    p === currentPage ? "none" : "1px solid rgba(0,0,0,0.15)",
                  background: p === currentPage ? "#0A66C2" : "#fff",
                  color: p === currentPage ? "#fff" : "rgba(0,0,0,0.60)",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (p !== currentPage)
                    (e.currentTarget as HTMLElement).style.background =
                      "#EAF1FA"
                }}
                onMouseLeave={(e) => {
                  if (p !== currentPage)
                    (e.currentTarget as HTMLElement).style.background = "#fff"
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Jobs Page ────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// FIND IDEAS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

interface Idea {
  id: number
  title: string
  author: string
  category: string
  thumbnail: string
  likes: number
  saves: number
}

const IDEA_CATEGORIES = [
  "Tất cả",
  "UI/UX Design",
  "Phát triển Web",
  "Marketing & Growth",
  "Khởi nghiệp",
  "Thiết kế đồ họa",
  "Phân tích dữ liệu",
  "Viết & Nội dung",
  "Video & Animation",
  "Mobile App",
]

const IDEAS: Idea[] = [
  {
    id: 1,
    title: "Xây dựng Design System từ đầu — quy trình thực chiến 2026",
    author: "Nguyễn Thị Lan Phương",
    category: "UI/UX Design",
    thumbnail:
      "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&h=220&fit=crop&auto=format",
    likes: 342,
    saves: 128,
  },
  {
    id: 2,
    title: "Chiến lược Growth Hacking cho SaaS B2B tại thị trường Việt Nam",
    author: "Trần Đức Minh",
    category: "Marketing & Growth",
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=220&fit=crop&auto=format",
    likes: 218,
    saves: 94,
  },
  {
    id: 3,
    title: "Tối ưu UX cho ứng dụng Fintech — case study từ VNPAY",
    author: "Lê Thị Bảo Châu",
    category: "UI/UX Design",
    thumbnail:
      "https://images.unsplash.com/photo-1587355760421-b9de3226a046?w=400&h=220&fit=crop&auto=format",
    likes: 477,
    saves: 201,
  },
  {
    id: 4,
    title: "Từ ý tưởng đến MVP trong 4 tuần — bài học từ startup thất bại",
    author: "Phạm Quang Hưng",
    category: "Khởi nghiệp",
    thumbnail:
      "https://images.unsplash.com/photo-1576595580361-90a855b84b20?w=400&h=220&fit=crop&auto=format",
    likes: 614,
    saves: 287,
  },
  {
    id: 5,
    title: "Thiết kế Dashboard phân tích dữ liệu — nguyên tắc và ví dụ thực tế",
    author: "Đỗ Thị Minh Tâm",
    category: "Phân tích dữ liệu",
    thumbnail:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=220&fit=crop&auto=format",
    likes: 389,
    saves: 167,
  },
  {
    id: 6,
    title: "Motion Design cho Mobile App — từ Figma đến prototype chuyển động",
    author: "Vũ Ngọc Khánh",
    category: "Mobile App",
    thumbnail:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=220&fit=crop&auto=format",
    likes: 256,
    saves: 110,
  },
  {
    id: 7,
    title: "Xây dựng brand identity mạnh cho startup với ngân sách nhỏ",
    author: "Hoàng Đức Minh",
    category: "Thiết kế đồ họa",
    thumbnail:
      "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=400&h=220&fit=crop&auto=format",
    likes: 431,
    saves: 192,
  },
  {
    id: 8,
    title: "SEO Content Strategy 2026 — tối ưu cho AI search engine",
    author: "Nguyễn Bảo Châu",
    category: "Viết & Nội dung",
    thumbnail:
      "https://images.unsplash.com/photo-1586296835409-fe3fe6b35b56?w=400&h=220&fit=crop&auto=format",
    likes: 185,
    saves: 73,
  },
  {
    id: 9,
    title: "React Performance tối ưu — từ 3 giây xuống 0.4 giây load time",
    author: "Bùi Quang Huy",
    category: "Phát triển Web",
    thumbnail:
      "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=400&h=220&fit=crop&auto=format",
    likes: 523,
    saves: 234,
  },
  {
    id: 10,
    title: "Nghệ thuật kể chuyện bằng video ngắn — công thức 60 giây viral",
    author: "Đinh Thế Anh",
    category: "Video & Animation",
    thumbnail:
      "https://images.unsplash.com/photo-1745847768382-816bfc32e1bb?w=400&h=220&fit=crop&auto=format",
    likes: 302,
    saves: 138,
  },
  {
    id: 11,
    title: "User Research 0 ngân sách — 5 phương pháp hiệu quả cho startup",
    author: "Lê Thị Bảo Châu",
    category: "UI/UX Design",
    thumbnail:
      "https://images.unsplash.com/photo-1787647559700-529fab8e431c?w=400&h=220&fit=crop&auto=format",
    likes: 398,
    saves: 175,
  },
  {
    id: 12,
    title: "Gọi vốn Series A tại Việt Nam — những điều nhà sáng lập cần biết",
    author: "Vũ Thành Long",
    category: "Khởi nghiệp",
    thumbnail:
      "https://images.unsplash.com/photo-1787647559180-a26acde70c2e?w=400&h=220&fit=crop&auto=format",
    likes: 671,
    saves: 319,
  },
]

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  "UI/UX Design": { bg: "#EAF1FA", color: "#0A66C2" },
  "Phát triển Web": { bg: "#EAF1FA", color: "#06407F" },
  "Marketing & Growth": { bg: "#FFF4D6", color: "#915907" },
  "Khởi nghiệp": { bg: "#E5F6E8", color: "#057642" },
  "Thiết kế đồ họa": { bg: "#FBE2E2", color: "#C03A2B" },
  "Phân tích dữ liệu": { bg: "#EAF1FA", color: "#3675BD" },
  "Viết & Nội dung": { bg: "#FFF4D6", color: "#B07F00" },
  "Video & Animation": { bg: "#FBE2E2", color: "#C03A2B" },
  "Mobile App": { bg: "#E5F6E8", color: "#44712E" },
}

// ─── Idea Card ────────────────────────────────────────────────────────────────

function IdeaCard({ idea, onClick }: { idea: Idea; onClick?: () => void }) {
  const [saved, setSaved] = useState(false)
  const cat = CATEGORY_COLORS[idea.category] ?? {
    bg: "#EAF1FA",
    color: "#0A66C2",
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: 260,
        cursor: "pointer",
        transition: "background 150ms ease",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "#FAFAF8")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "#fff")
      }
    >
      {/* Thumbnail */}
      <div
        style={{
          height: 148,
          background: "#ddd",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={idea.thumbnail}
          alt={idea.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Category chip overlay */}
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <span
            style={{
              background: cat.bg,
              color: cat.color,
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 4,
              padding: "2px 7px",
              backdropFilter: "blur(4px)",
            }}
          >
            {idea.category}
          </span>
        </div>
        {/* Save button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSaved(!saved)
          }}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            background: "rgba(255,255,255,0.88)",
            border: "none",
            borderRadius: 9999,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: saved ? "#0A66C2" : "rgba(0,0,0,0.50)",
            transition: "color 150ms ease, background 150ms ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#fff")
          }
          onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.88)")
          }
        >
          <Bookmark size={14} weight={saved ? "fill" : "regular"} />
        </button>
      </div>

      {/* Text body */}
      <div
        style={{
          padding: "10px 12px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(0,0,0,0.90)",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {idea.title}
        </div>
        <div style={{ fontSize: 11, color: "rgba(0,0,0,0.55)", marginTop: 6 }}>
          Bởi {idea.author}
        </div>
      </div>
    </div>
  )
}

// ─── Filter Drawer ────────────────────────────────────────────────────────────

function FilterDrawer({
  open,
  onClose,
  selected,
  onApply,
}: {
  open: boolean
  onClose: () => void
  selected: string[]
  onApply: (cats: string[]) => void
}) {
  const [draft, setDraft] = useState<string[]>(selected)

  // Sync draft when drawer opens
  useEffect(() => {
    if (open) setDraft(selected)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose()
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [open, onClose])

  const toggle = (cat: string) =>
    setDraft((d) =>
      d.includes(cat) ? d.filter((c) => c !== cat) : [...d, cat],
    )

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 400,
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 320,
          background: "#fff",
          boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
          zIndex: 500,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 250ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span
            style={{ fontSize: 20, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}
          >
            Lọc theo lĩnh vực
          </span>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9999,
              background: "none",
              border: "1px solid rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(0,0,0,0.55)",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#F4F2EE")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "none")
            }
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          <div
            style={{
              fontSize: 13,
              color: "rgba(0,0,0,0.45)",
              marginBottom: 14,
            }}
          >
            Chọn một hoặc nhiều lĩnh vực để lọc ý tưởng
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {IDEA_CATEGORIES.filter((c) => c !== "Tất cả").map((cat) => {
              const isChecked = draft.includes(cat)
              const col = CATEGORY_COLORS[cat] ?? {
                bg: "#EAF1FA",
                color: "#0A66C2",
              }
              return (
                <label
                  key={cat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: isChecked ? col.bg : "none",
                    border: `1px solid ${isChecked ? col.color + "40" : "rgba(0,0,0,0.06)"
                      }`,
                    transition:
                      "background 150ms ease, border-color 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isChecked)
                      (e.currentTarget as HTMLElement).style.background =
                        "#F4F2EE"
                  }}
                  onMouseLeave={(e) => {
                    if (!isChecked)
                      (e.currentTarget as HTMLElement).style.background = "none"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(cat)}
                    style={{
                      width: 16,
                      height: 16,
                      accentColor: "#0A66C2",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      color: isChecked ? col.color : "rgba(0,0,0,0.90)",
                      fontWeight: isChecked ? 600 : 400,
                    }}
                  >
                    {cat}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      fontWeight: 700,
                      background: isChecked
                        ? col.color + "20"
                        : "rgba(0,0,0,0.05)",
                      color: isChecked ? col.color : "rgba(0,0,0,0.45)",
                      borderRadius: 9999,
                      padding: "1px 7px",
                    }}
                  >
                    {IDEAS.filter((i) => i.category === cat).length}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setDraft([])}
            style={{
              flex: 1,
              borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.20)",
              background: "none",
              color: "rgba(0,0,0,0.60)",
              padding: "10px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#F4F2EE")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "none")
            }
          >
            Xóa bộ lọc
          </button>
          <button
            onClick={() => {
              onApply(draft)
              onClose()
            }}
            style={{
              flex: 1.4,
              borderRadius: 9999,
              border: "none",
              background: "#0A66C2",
              color: "#fff",
              padding: "10px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#084FA0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#0A66C2")
            }
          >
            Áp dụng
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Find Ideas Page ──────────────────────────────────────────────────────────

// ─── Idea Details Page ────────────────────────────────────────────────────────

const IDEA_CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=900&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1586296835409-fe3fe6b35b56?w=900&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&h=500&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&h=500&fit=crop&auto=format",
]

const IDEA_DESCRIPTIONS: Record<number, string> = {
  1: `Trong môi trường phát triển sản phẩm hiện đại, việc xây dựng một Design System bài bản từ đầu là nền tảng quan trọng giúp team thiết kế và phát triển phối hợp hiệu quả, nhất quán và có thể mở rộng theo thời gian.

Ý tưởng này trình bày một quy trình thực chiến gồm 5 giai đoạn:

1. Audit & Discovery — Phân tích giao diện hiện tại, xác định các pattern lặp lại và sự không nhất quán
2. Design Token — Định nghĩa hệ thống token cho màu sắc, typography, spacing, shadows và radius
3. Component Library — Xây dựng thư viện component theo nguyên tắc Atomic Design
4. Documentation — Viết tài liệu hướng dẫn sử dụng rõ ràng cho designer và developer
5. Adoption & Maintenance — Lên kế hoạch triển khai và duy trì Design System theo thời gian

Bài viết đặc biệt phù hợp với các team startup đang scale lên, hoặc các tổ chức lớn muốn chuẩn hóa lại hệ thống thiết kế của mình.`,
}

function IdeaDetailsPage({ idea, onBack }: { idea: Idea; onBack: () => void }) {
  const [activeImg, setActiveImg] = useState(0)
  const [connected, setConnected] = useState(false)
  const cat = CATEGORY_COLORS[idea.category] ?? {
    bg: "#EAF1FA",
    color: "#0A66C2",
  }

  const images = IDEA_CAROUSEL_IMAGES
  const description =
    IDEA_DESCRIPTIONS[idea.id] ??
    `Đây là mô tả chi tiết cho ý tưởng "${idea.title}". Tác giả chia sẻ những kinh nghiệm thực chiến, phương pháp tiếp cận sáng tạo và các bài học rút ra từ quá trình triển khai dự án thực tế trong lĩnh vực ${idea.category}.

Nội dung bao gồm các phân tích chuyên sâu, ví dụ minh hoạ cụ thể và hướng dẫn từng bước để bạn có thể áp dụng ngay vào công việc của mình. Đây là tài nguyên hữu ích cho bất kỳ chuyên gia nào muốn nâng cao năng lực và tìm kiếm cảm hứng trong lĩnh vực ${idea.category}.`

  const AUTHOR_RATING = 4.9
  const AUTHOR_REVIEWS = 50
  const AUTHOR_IDEAS = 18
  const AUTHOR_JOINED = "T3/2024"
  const AUTHOR_BIO = `Chuyên gia ${idea.category} với hơn 8 năm kinh nghiệm thực chiến tại các công ty công nghệ hàng đầu Việt Nam và Đông Nam Á. Đam mê chia sẻ kiến thức và xây dựng cộng đồng sáng tạo.`

  const prev = () =>
    setActiveImg((i) => (i - 1 + images.length) % images.length)
  const next = () => setActiveImg((i) => (i + 1) % images.length)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [])

  const arrowBtn: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: 9999,
    background: "rgba(255,255,255,0.88)",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "rgba(0,0,0,0.80)",
    transition: "background 150ms ease, box-shadow 150ms ease",
    zIndex: 2,
  }

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      {/* ── Full-width blue banner ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          background: "#06407F",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1128&h=240&fit=crop&auto=format&q=80"
          alt="banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(10,102,194,0.90) 0%, rgba(6,64,127,0.80) 100%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 1128,
              margin: "0 auto",
              padding: "0 16px",
              width: "100%",
            }}
          >
            {/* Back button */}
            <button
              onClick={onBack}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 9999,
                padding: "4px 14px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 14,
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.22)")
              }
              onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.12)")
              }
            >
              <CaretLeft size={13} weight="bold" /> Danh sách ý tưởng
            </button>
            {/* Category chip */}
            <span
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 4,
                padding: "3px 9px",
                display: "inline-block",
                marginBottom: 10,
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {idea.category}
            </span>
            {/* Hook headline */}
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {idea.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div
        style={{ maxWidth: 1128, margin: "0 auto", padding: "24px 16px 40px" }}
      >
        {/* Main idea card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Section 1 — Title & Author */}
          <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ padding: "24px 24px 0" }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  lineHeight: 1.35,
                }}
              >
                {idea.title}
              </h2>
            </div>

            <div
              style={{
                padding: "12px 24px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              {/* Left — avatar + name + rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={idea.author} size={48} />
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "rgba(0,0,0,0.90)",
                    }}
                  >
                    {idea.author}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 3,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "#B07F00" }}>⭐</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "rgba(0,0,0,0.80)",
                      }}
                    >
                      {AUTHOR_RATING}
                    </span>
                    <span style={{ fontSize: 13, color: "rgba(0,0,0,0.50)" }}>
                      ({AUTHOR_REVIEWS} đánh giá)
                    </span>
                    <span style={{ color: "rgba(0,0,0,0.20)" }}>·</span>
                    <span style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                      {idea.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — action buttons */}
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <button
                  onClick={() => setConnected((v) => !v)}
                  style={{
                    border: `1px solid ${connected ? "#057642" : "#0A66C2"}`,
                    borderRadius: 9999,
                    background: connected ? "#E5F6E8" : "none",
                    color: connected ? "#057642" : "#0A66C2",
                    padding: "7px 18px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 150ms ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onMouseEnter={(e) => {
                    if (!connected)
                      (e.currentTarget as HTMLElement).style.background =
                        "#EAF1FA"
                  }}
                  onMouseLeave={(e) => {
                    if (!connected)
                      (e.currentTarget as HTMLElement).style.background =
                        connected ? "#E5F6E8" : "none"
                  }}
                >
                  {connected ? (
                    <CheckCircle size={15} weight="fill" />
                  ) : (
                    <UserPlus size={15} />
                  )}
                  {connected ? "Đã kết nối" : "Kết nối"}
                </button>
                <button
                  style={{
                    background: "#0A66C2",
                    border: "none",
                    borderRadius: 9999,
                    color: "#fff",
                    padding: "7px 18px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 150ms ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#084FA0")
                  }
                  onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#0A66C2")
                  }
                >
                  <PaperPlaneTilt size={15} /> Liên hệ
                </button>
              </div>
            </div>
          </div>

          {/* Section 2 — Image Carousel */}
          <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div
              style={{
                position: "relative",
                height: 400,
                background: "#F4F2EE",
                overflow: "hidden",
              }}
            >
              <img
                key={activeImg}
                src={images[activeImg]}
                alt={`Slide ${activeImg + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <button
                onClick={prev}
                style={{ ...arrowBtn, left: 16 }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "#fff"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.88)"
                }}
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <button
                onClick={next}
                style={{ ...arrowBtn, right: 16 }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "#fff"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.88)"
                }}
              >
                <CaretRight size={18} weight="bold" />
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 16,
                  background: "rgba(0,0,0,0.50)",
                  color: "#fff",
                  borderRadius: 9999,
                  padding: "3px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {activeImg + 1} / {images.length}
              </div>
            </div>
            {/* Thumbnails */}
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                gap: 8,
                overflowX: "auto",
              }}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: 64,
                    height: 64,
                    flexShrink: 0,
                    padding: 0,
                    border: `2px solid ${i === activeImg ? "#0A66C2" : "transparent"
                      }`,
                    borderRadius: 6,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow:
                      i === activeImg
                        ? "0 0 0 1px #0A66C2"
                        : "0 0 0 1px rgba(0,0,0,0.10)",
                    transition:
                      "border-color 150ms ease, box-shadow 150ms ease",
                    background: "none",
                  }}
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Section 3 — Description */}
          <div style={{ padding: 24 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 14,
              }}
            >
              Mô tả và các thông tin liên quan
            </div>
            <p
              style={{
                fontSize: 15,
                color: "rgba(0,0,0,0.85)",
                lineHeight: 1.85,
                whiteSpace: "pre-wrap",
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* ── Owner Information Block ─────────────────────────────────────── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            marginTop: 16,
            padding: 24,
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          {/* Large avatar */}
          <Avatar name={idea.author} size={72} />

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 4,
              }}
            >
              {idea.author}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.60)",
                lineHeight: 1.6,
                marginBottom: 14,
              }}
            >
              {AUTHOR_BIO}
            </div>
            {/* Rating & stats row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 14, color: "#B07F00" }}>⭐</span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.80)",
                  }}
                >
                  {AUTHOR_RATING}
                </span>
                <span style={{ fontSize: 13, color: "rgba(0,0,0,0.50)" }}>
                  ({AUTHOR_REVIEWS} đánh giá)
                </span>
              </div>
              <div
                style={{ width: 1, height: 14, background: "rgba(0,0,0,0.15)" }}
              />
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(0,0,0,0.55)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Lightbulb size={14} color="rgba(0,0,0,0.40)" />
                {AUTHOR_IDEAS} ý tưởng đã đăng
              </div>
              <div
                style={{ width: 1, height: 14, background: "rgba(0,0,0,0.15)" }}
              />
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(0,0,0,0.55)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <CalendarBlank size={14} color="rgba(0,0,0,0.40)" />
                Tham gia: {AUTHOR_JOINED}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Find Ideas Page (list) ───────────────────────────────────────────────────

function FindIdeasPage({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [showCategoryTabs, setShowCategoryTabs] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  if (selectedIdea) {
    return (
      <IdeaDetailsPage
        idea={selectedIdea}
        onBack={() => setSelectedIdea(null)}
      />
    )
  }

  const BANNER_IMG =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1128&h=240&fit=crop&auto=format&q=80"

  const filtered = IDEAS.filter((idea) => {
    const matchSearch =
      !search ||
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.author.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      activeCategory === "Tất cả" || idea.category === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      {/* Banner — blue */}
      <div
        style={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          background: "#06407F",
        }}
      >
        <img
          src={BANNER_IMG}
          alt="Creative ideas"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(10,102,194,0.90) 0%, rgba(6,64,127,0.80) 100%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 1128,
              margin: "0 auto",
              padding: "0 16px",
              width: "100%",
            }}
          >
            <button
              onClick={onBack}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 9999,
                padding: "4px 14px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 14,
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.22)")
              }
              onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.12)")
              }
            >
              <ArrowRight size={13} style={{ transform: "rotate(180deg)" }} />
              Quay lại
            </button>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: 6,
                letterSpacing: "-0.02em",
              }}
            >
              Khám phá Ý tưởng Sáng tạo
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.80)",
                lineHeight: 1.5,
              }}
            >
              Hàng trăm ý tưởng từ các chuyên gia hàng đầu — lọc theo lĩnh vực
              và tìm cảm hứng cho dự án tiếp theo.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1128, margin: "0 auto", padding: "24px 16px" }}>
        {/* Search & Filter bar */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            padding: "14px 16px",
            marginBottom: showCategoryTabs ? 0 : 20,
            borderBottomLeftRadius: showCategoryTabs ? 0 : 8,
            borderBottomRightRadius: showCategoryTabs ? 0 : 8,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          {/* Search input */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#EAF1FA",
              borderRadius: 4,
              padding: "0 12px",
              height: 40,
            }}
          >
            <MagnifyingGlass size={16} color="rgba(0,0,0,0.45)" />
            <input
              type="text"
              placeholder="Tìm kiếm ý tưởng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "rgba(0,0,0,0.90)",
                width: "100%",
                fontFamily: "inherit",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(0,0,0,0.40)",
                  display: "flex",
                  padding: 0,
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setShowCategoryTabs((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              border: "1px solid #0A66C2",
              borderRadius: 9999,
              padding: "0 18px",
              height: 40,
              flexShrink: 0,
              background:
                showCategoryTabs || activeCategory !== "Tất cả"
                  ? "#EAF1FA"
                  : "none",
              color: "#0A66C2",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
            }
            onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background =
              showCategoryTabs || activeCategory !== "Tất cả"
                ? "#EAF1FA"
                : "none")
            }
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Bộ lọc
            {activeCategory !== "Tất cả" && (
              <span
                style={{
                  background: "#0A66C2",
                  color: "#fff",
                  borderRadius: 9999,
                  width: 8,
                  height: 8,
                  display: "inline-block",
                }}
              />
            )}
          </button>
        </div>

        {/* Category tabs — shown only when filter is open */}
        {showCategoryTabs && (
          <div
            style={{
              background: "#fff",
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              padding: "12px 16px 14px",
              marginBottom: 20,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {IDEA_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    if (cat !== "Tất cả") setShowCategoryTabs(false)
                  }}
                  style={{
                    border: isActive
                      ? "1px solid #0A66C2"
                      : "1px solid rgba(0,0,0,0.15)",
                    background: isActive ? "#0A66C2" : "#fff",
                    color: isActive ? "#fff" : "rgba(0,0,0,0.60)",
                    borderRadius: 9999,
                    padding: "6px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      ; (e.currentTarget as HTMLElement).style.background =
                        "#EAF1FA"
                        ; (e.currentTarget as HTMLElement).style.color = "#0A66C2"
                        ; (e.currentTarget as HTMLElement).style.borderColor =
                          "#0A66C2"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      ; (e.currentTarget as HTMLElement).style.background =
                        "#fff"
                        ; (e.currentTarget as HTMLElement).style.color =
                          "rgba(0,0,0,0.60)"
                        ; (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(0,0,0,0.15)"
                    }
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        )}

        {/* Active category chip */}
        {activeCategory !== "Tất cả" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            {(() => {
              const col = CATEGORY_COLORS[activeCategory] ?? {
                bg: "#EAF1FA",
                color: "#0A66C2",
              }
              return (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: col.bg,
                    color: col.color,
                    borderRadius: 9999,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {activeCategory}
                  <button
                    onClick={() => setActiveCategory("Tất cả")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: col.color,
                      display: "flex",
                    }}
                  >
                    <X size={10} weight="bold" />
                  </button>
                </span>
              )
            })()}
          </div>
        )}

        {/* 4-column idea grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {filtered.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onClick={() => setSelectedIdea(idea)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "rgba(0,0,0,0.45)",
            }}
          >
            <Lightbulb
              size={48}
              color="rgba(0,0,0,0.20)"
              weight="regular"
              style={{ marginBottom: 12 }}
            />
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "rgba(0,0,0,0.70)",
                marginBottom: 6,
              }}
            >
              Không tìm thấy ý tưởng nào
            </div>
            <div style={{ fontSize: 14 }}>
              Thử thay đổi từ khóa hoặc bộ lọc của bạn.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Post Idea Page ───────────────────────────────────────────────────────────

const POST_IDEA_CATEGORIES = [
  "UI/UX Design",
  "Phát triển Web",
  "Marketing & Growth",
  "Khởi nghiệp",
  "Thiết kế đồ họa",
  "Phân tích dữ liệu",
  "Viết & Nội dung",
  "Video & Animation",
  "Mobile App",
]

function PostIdeaPage({
  onBack,
  onSubmit,
}: {
  onBack: () => void
  onSubmit: () => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => setUploadedImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  // Close category dropdown on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setCategoryOpen(false)
      }
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const canSubmit = title.trim().length > 0

  const inputBase: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 4,
    padding: "10px 12px",
    width: "100%",
    fontSize: 14,
    color: "rgba(0,0,0,0.90)",
    fontFamily: "inherit",
    background: "#fff",
    outline: "none",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
  }

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      {/* Banner — blue, matching FindIdeasPage */}
      <div
        style={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          background: "#06407F",
          marginBottom: 24,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1128&h=240&fit=crop&auto=format&q=80"
          alt="Post idea"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2,
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(10,102,194,0.90) 0%, rgba(6,64,127,0.80) 100%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 1128,
              margin: "0 auto",
              padding: "0 16px",
              width: "100%",
            }}
          >
            <button
              onClick={onBack}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 9999,
                padding: "4px 14px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 14,
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.22)")
              }
              onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.12)")
              }
            >
              <ArrowRight size={13} style={{ transform: "rotate(180deg)" }} />
              Quay lại
            </button>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: 6,
                letterSpacing: "-0.02em",
              }}
            >
              Đăng ý tưởng của bạn
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.80)",
                lineHeight: 1.5,
              }}
            >
              Chia sẻ ý tưởng sáng tạo và nhận phản hồi từ cộng đồng chuyên gia
              Occupify.
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px 40px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Section 1 — Title & Author */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <input
              type="text"
              placeholder="Tiêu đề ý tưởng..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: 22,
                fontWeight: 600,
                color: "rgba(0,0,0,0.90)",
                fontFamily: "inherit",
                background: "none",
              }}
              onFocus={(e) =>
                ((e.target as HTMLInputElement).style.caretColor = "#0A66C2")
              }
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 16,
              }}
            >
              <Avatar name={ME.name} size={40} />
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.90)",
                  }}
                >
                  {ME.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(0,0,0,0.60)",
                    marginTop: 1,
                  }}
                >
                  Tác giả · {ME.headline}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 — Image Upload */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.70)",
                marginBottom: 10,
              }}
            >
              Ảnh bìa ý tưởng
            </div>
            {uploadedImage ? (
              <div
                style={{
                  position: "relative",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(0,0,0,0.60)",
                    border: "none",
                    borderRadius: 9999,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#fff",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "rgba(0,0,0,0.80)")
                  }
                  onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "rgba(0,0,0,0.60)")
                  }
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${isDragOver ? "#0A66C2" : "rgba(0,0,0,0.15)"
                    }`,
                  borderRadius: 8,
                  background: isDragOver ? "#EAF1FA" : "#FAFAF8",
                  padding: "64px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "border-color 150ms ease, background 150ms ease",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor =
                    "#0A66C2"
                    ; (e.currentTarget as HTMLElement).style.background = "#EAF1FA"
                }}
                onMouseLeave={(e) => {
                  if (!isDragOver) {
                    ; (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,0,0,0.15)"
                      ; (e.currentTarget as HTMLElement).style.background =
                        "#FAFAF8"
                  }
                }}
              >
                <Image size={48} color="rgba(0,0,0,0.30)" weight="regular" />
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.60)",
                    marginTop: 14,
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  Kéo thả ảnh vào đây hoặc{" "}
                  <span style={{ color: "#0A66C2", fontWeight: 600 }}>
                    nhấn để tải lên
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(0,0,0,0.40)",
                    marginTop: 6,
                  }}
                >
                  PNG, JPG, GIF · Tối đa 10 MB
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
              }}
            />
          </div>

          {/* Section 3 — Description & Category */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {/* Description */}
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.70)",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Mô tả chi tiết
              </label>
              <textarea
                placeholder="Mô tả ý tưởng của bạn — vấn đề nó giải quyết, cách tiếp cận, và tiềm năng ứng dụng..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                style={{
                  ...inputBase,
                  resize: "vertical",
                  minHeight: 150,
                  lineHeight: 1.6,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0A66C2"
                  e.target.style.boxShadow = "0 0 0 1px #0A66C2"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,0,0,0.15)"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>

            {/* Category multi-select */}
            <div ref={dropRef} style={{ position: "relative" }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.70)",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Lĩnh vực
              </label>

              {/* Trigger */}
              <div
                onClick={() => setCategoryOpen((v) => !v)}
                style={{
                  ...inputBase,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 6,
                  minHeight: 42,
                  borderColor: categoryOpen ? "#0A66C2" : "rgba(0,0,0,0.15)",
                  boxShadow: categoryOpen ? "0 0 0 1px #0A66C2" : "none",
                  padding: "8px 12px",
                }}
              >
                {selectedCategories.length === 0 ? (
                  <span style={{ color: "rgba(0,0,0,0.40)", fontSize: 14 }}>
                    Chọn lĩnh vực...
                  </span>
                ) : (
                  selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      style={{
                        background: "#EAF1FA",
                        color: "#0A66C2",
                        borderRadius: 4,
                        padding: "3px 8px",
                        fontSize: 12,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {cat}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCategory(cat)
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          color: "#0A66C2",
                          display: "flex",
                          lineHeight: 1,
                        }}
                      >
                        <X size={10} weight="bold" />
                      </button>
                    </span>
                  ))
                )}
                <CaretDown
                  size={14}
                  color="rgba(0,0,0,0.45)"
                  weight="bold"
                  style={{
                    marginLeft: "auto",
                    transform: categoryOpen ? "rotate(180deg)" : "none",
                    transition: "transform 150ms ease",
                  }}
                />
              </div>

              {/* Dropdown */}
              {categoryOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow:
                      "0 4px 16px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.08)",
                    zIndex: 50,
                    overflow: "hidden",
                    maxHeight: 280,
                    overflowY: "auto",
                  }}
                >
                  {POST_IDEA_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat)
                    const isDisabled =
                      !isSelected && selectedCategories.length >= 3
                    return (
                      <div
                        key={cat}
                        onClick={() => {
                          if (!isDisabled) toggleCategory(cat)
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 14px",
                          cursor: isDisabled ? "default" : "pointer",
                          background: isSelected ? "#EAF1FA" : "none",
                          opacity: isDisabled ? 0.45 : 1,
                          transition: "background 120ms ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isDisabled && !isSelected)
                            (e.currentTarget as HTMLElement).style.background =
                              "#F4F2EE"
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected)
                            (e.currentTarget as HTMLElement).style.background =
                              "none"
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            flexShrink: 0,
                            border: `2px solid ${isSelected ? "#0A66C2" : "rgba(0,0,0,0.25)"
                              }`,
                            background: isSelected ? "#0A66C2" : "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 120ms ease",
                          }}
                        >
                          {isSelected && (
                            <svg
                              width="9"
                              height="7"
                              viewBox="0 0 9 7"
                              fill="none"
                            >
                              <path
                                d="M1 3.5L3.5 6L8 1"
                                stroke="#fff"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: 14,
                            color: isSelected ? "#0A66C2" : "rgba(0,0,0,0.90)",
                            fontWeight: isSelected ? 600 : 400,
                          }}
                        >
                          {cat}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Section 4 — Footer / Submit */}
          <div
            style={{
              padding: "16px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <button
              onClick={onBack}
              style={{
                borderRadius: 9999,
                border: "1px solid rgba(0,0,0,0.20)",
                background: "none",
                color: "rgba(0,0,0,0.60)",
                padding: "9px 22px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#F4F2EE")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "none")
              }
            >
              Hủy
            </button>
            <button
              onClick={() => {
                if (canSubmit) onSubmit()
              }}
              style={{
                borderRadius: 9999,
                border: "none",
                background: canSubmit ? "#0A66C2" : "rgba(0,0,0,0.12)",
                color: canSubmit ? "#fff" : "rgba(0,0,0,0.35)",
                padding: "9px 26px",
                fontSize: 14,
                fontWeight: 700,
                cursor: canSubmit ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (canSubmit)
                  (e.currentTarget as HTMLElement).style.background = "#084FA0"
              }}
              onMouseLeave={(e) => {
                if (canSubmit)
                  (e.currentTarget as HTMLElement).style.background = "#0A66C2"
              }}
            >
              Đăng ý tưởng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Jobs Page ────────────────────────────────────────────────────────────────

// ─── Project / Contract shared types & data ───────────────────────────────────

const CY_PERIODS = ["Hàng tuần", "Hàng tháng", "Hàng quý", "Cố định"]

interface ProjectMember {
  name: string
  email: string
  price: string
  dueDate?: string
}
interface PendingProject {
  id: number
  name: string
  owner: string
  price: string
  period: string
}
interface MyProject {
  id: number
  name: string
  members: ProjectMember[]
  dueDate: string
  period: string
}

const MY_PROJECTS_DATA: MyProject[] = [
  {
    id: 1,
    name: "Redesign Mobile App",
    period: "Hàng tháng",
    dueDate: "2026-12-31",
    members: [
      {
        name: "Lê Văn Hùng",
        email: "hung.le@gmail.com",
        price: "12.000.000 ₫",
        dueDate: "2026-12-31",
      },
      {
        name: "Nguyễn Thị Thu",
        email: "thu.nguyen@gmail.com",
        price: "10.000.000 ₫",
        dueDate: "2026-11-30",
      },
    ],
  },
  {
    id: 2,
    name: "Xây dựng Design System SaaS",
    period: "Hàng quý",
    dueDate: "2027-03-31",
    members: [
      {
        name: "Phạm Đức Anh",
        email: "duc.anh@gmail.com",
        price: "15.000.000 ₫",
        dueDate: "2027-03-31",
      },
    ],
  },
]

const EMPLOYEE_PROJECTS_DATA: MyProject[] = [
  {
    id: 10,
    name: "Thiết kế landing page chiến dịch Marketing",
    period: "Cố định",
    dueDate: "2026-08-20",
    members: [
      {
        name: "Nguyễn Minh Khoa",
        email: "khoa@gmail.com",
        price: "12.000.000 ₫",
      },
    ],
  },
  {
    id: 11,
    name: "Prototyping & User Testing Dashboard",
    period: "Hàng tháng",
    dueDate: "2026-07-10",
    members: [
      {
        name: "Nguyễn Minh Khoa",
        email: "khoa@gmail.com",
        price: "32.000.000 ₫",
      },
    ],
  },
]

const PENDING_PROJECTS_DATA: PendingProject[] = [
  {
    id: 1,
    name: "Thiết kế UI cho app Fintech",
    owner: "Trần Minh Khoa",
    price: "25.000.000 ₫",
    period: "Hàng tháng",
  },
  {
    id: 2,
    name: "Xây dựng API REST cho hệ thống ERP",
    owner: "Lê Thị Hoa",
    price: "40.000.000 ₫",
    period: "Cố định",
  },
  {
    id: 3,
    name: "Phân tích dữ liệu người dùng Q4",
    owner: "Phạm Văn Dũng",
    price: "18.000.000 ₫",
    period: "Hàng quý",
  },
]

// ─── Shared cancel modal ───────────────────────────────────────────────────────

function CancelModal({
  title,
  subtitle,
  onClose,
  onConfirm,
}: {
  title: string
  subtitle: string
  onClose: () => void
  onConfirm: () => void
}) {
  const [reason, setReason] = useState("")
  const [fileName, setFileName] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    color: "rgba(0,0,0,0.90)",
    background: "#fff",
    boxSizing: "border-box",
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: 480,
          padding: "28px 32px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "rgba(0,0,0,0.90)",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", marginBottom: 20 }}
        >
          {subtitle}
        </div>
        <label
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(0,0,0,0.70)",
            display: "block",
            marginBottom: 6,
          }}
        >
          Lý do *
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do..."
          style={{
            ...inputStyle,
            minHeight: 96,
            resize: "vertical",
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        />
        <label
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(0,0,0,0.70)",
            display: "block",
            marginBottom: 6,
          }}
        >
          Upload ảnh liên quan (tuỳ chọn)
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <button
            onClick={() => fileRef.current?.click()}
            style={{
              padding: "9px 16px",
              borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.20)",
              background: "none",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              color: "rgba(0,0,0,0.65)",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "none"
            }}
          >
            Chọn ảnh từ thiết bị
          </button>
          <span
            style={{
              fontSize: 13,
              color: fileName ? "rgba(0,0,0,0.70)" : "rgba(0,0,0,0.35)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {fileName || "Chưa chọn tệp"}
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              padding: "9px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.20)",
              background: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              color: "rgba(0,0,0,0.65)",
              fontFamily: "inherit",
            }}
          >
            Đóng
          </button>
          <button
            onClick={() => {
              if (reason.trim()) onConfirm()
            }}
            disabled={!reason.trim()}
            style={{
              padding: "9px 24px",
              borderRadius: 9999,
              border: "none",
              background: reason.trim() ? "#C03A2B" : "rgba(0,0,0,0.12)",
              color: reason.trim() ? "#fff" : "rgba(0,0,0,0.35)",
              fontSize: 14,
              fontWeight: 700,
              cursor: reason.trim() ? "pointer" : "default",
              fontFamily: "inherit",
            }}
          >
            Xác nhận hủy
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Star rating input ────────────────────────────────────────────────────────

function StarRatingInput({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            display: "flex",
          }}
        >
          <Star
            size={24}
            weight={(hovered || value) >= n ? "fill" : "regular"}
            color={(hovered || value) >= n ? "#F5C518" : "rgba(0,0,0,0.25)"}
          />
        </button>
      ))}
    </div>
  )
}

// ─── Freelancer review block ──────────────────────────────────────────────────

interface FreelancerReview {
  rating: number
  onTime: boolean
  comment: string
}

function FreelancerReviewBlock({
  member,
  review,
  onChange,
}: {
  member: ProjectMember
  review: FreelancerReview
  onChange: (r: FreelancerReview) => void
}) {
  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    color: "rgba(0,0,0,0.90)",
    background: "#fff",
    minHeight: 80,
    resize: "vertical",
    lineHeight: 1.6,
    marginTop: 12,
    boxSizing: "border-box",
    transition: "border-color 150ms",
  }
  return (
    <div
      style={{
        padding: 16,
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 8,
        marginBottom: 12,
        background: "#FAFAF8",
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "rgba(0,0,0,0.90)",
          marginBottom: 10,
        }}
      >
        {member.name}
      </div>
      <div style={{ fontSize: 12, color: "rgba(0,0,0,0.50)", marginBottom: 8 }}>
        {member.price}
      </div>
      <StarRatingInput
        value={review.rating}
        onChange={(v) => onChange({ ...review, rating: v })}
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 12,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={review.onTime}
          onChange={(e) => onChange({ ...review, onTime: e.target.checked })}
          style={{
            width: 16,
            height: 16,
            accentColor: "#0A66C2",
            cursor: "pointer",
          }}
        />
        <span
          style={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.90)" }}
        >
          Hoàn thành đúng thời hạn
        </span>
      </label>
      <textarea
        value={review.comment}
        onChange={(e) => onChange({ ...review, comment: e.target.value })}
        placeholder="Nhận xét về freelancer này..."
        style={textareaStyle}
        onFocus={(e) =>
          ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")
        }
        onBlur={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor =
          "rgba(0,0,0,0.15)")
        }
      />
    </div>
  )
}

// ─── Rating modal (single or multi freelancer) ────────────────────────────────

function RatingModal({
  title,
  members,
  onClose,
  onSubmit,
}: {
  title: string
  members: ProjectMember[]
  onClose: () => void
  onSubmit: () => void
}) {
  const [reviews, setReviews] = useState<FreelancerReview[]>(
    members.map(() => ({ rating: 0, onTime: false, comment: "" })),
  )
  const updateReview = (idx: number, r: FreelancerReview) =>
    setReviews((prev) => prev.map((v, i) => (i === idx ? r : v)))

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: 640,
          padding: 24,
          boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div
            style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}
          >
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              color: "rgba(0,0,0,0.50)",
              padding: 4,
            }}
          >
            <X size={20} weight="bold" />
          </button>
        </div>
        {/* Review blocks */}
        {members.map((m, i) => (
          <FreelancerReviewBlock
            key={m.email}
            member={m}
            review={reviews[i]}
            onChange={(r) => updateReview(i, r)}
          />
        ))}
        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.20)",
              background: "none",
              cursor: "pointer",
              fontSize: 14,
              color: "rgba(0,0,0,0.65)",
              fontFamily: "inherit",
              fontWeight: 600,
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "none"
            }}
          >
            Hủy
          </button>
          <button
            onClick={onSubmit}
            style={{
              padding: "8px 24px",
              borderRadius: 9999,
              border: "none",
              background: "#0A66C2",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#084FA0"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#0A66C2"
            }}
          >
            Xác nhận đánh giá
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── My-Project detail page (owner view) ─────────────────────────────────────

function MyProjectDetailPage({
  project,
  onBack,
  onCreateContract,
}: {
  project: MyProject
  onBack: () => void
  onCreateContract?: () => void
}) {
  const [members, setMembers] = useState(project.members)
  // cancelTarget: "project" | member email
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)
  // ratingModal: "project-cancel" | member email (per-member complete)
  const [ratingModal, setRatingModal] =
    useState<"project-cancel" | string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [cancelInviteTarget, setCancelInviteTarget] = useState<string | null>(null)
  const [closeRecruitConfirm, setCloseRecruitConfirm] = useState(false)
  const [recruitmentClosed, setRecruitmentClosed] = useState(false)
  const [contractDetailMember, setContractDetailMember] = useState<ProjectMember | null>(null)
  const [isEditingContract, setIsEditingContract] = useState(false)

  const cancelMember =
    cancelTarget && cancelTarget !== "project"
      ? members.find((m) => m.email === cancelTarget)
      : null

  const handleConfirmCancel = () => {
    if (cancelTarget === "project") {
      onBack()
      return
    }
    setMembers((p) => p.filter((m) => m.email !== cancelTarget))
    setCancelTarget(null)
    setToast("Đã hủy hợp đồng thành công.")
  }

  const isProjectCancel = ratingModal === "project-cancel"
  const ratingMembers = isProjectCancel
    ? members
    : members.filter((m) => m.email === ratingModal)
  const ratingTitle = isProjectCancel
    ? "Đánh giá trước khi hủy dự án"
    : `Hoàn thành hợp đồng — ${ratingMembers[0]?.name ?? ""}`

  return (
    <div
      style={{
        background: "#F4F2EE",
        minHeight: "100%",
        padding: "28px 16px 48px",
      }}
    >
      <div style={{ maxWidth: 1128, margin: "0 auto" }}>
        {/* Back */}
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(0,0,0,0.60)",
            fontFamily: "inherit",
            marginBottom: 20,
            padding: "4px 0",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.90)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")
          }
        >
          <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Quay
          lại
        </button>

        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                {project.name}
              </div>
              <div style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
                {members.length} thành viên · {project.period}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>

              <button
                onClick={() => setCloseRecruitConfirm(true)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "1px solid #C03A2B",
                  background: "none",
                  color: "#C03A2B",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "#FBE2E2"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "none"
                }}
              >
                {recruitmentClosed ? "Đã đóng tuyển dụng" : "Đóng tuyển dụng"}
              </button>

              <button
                onClick={() => setRatingModal("project-cancel")}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "1px solid #C03A2B",
                  background: "none",
                  color: "#C03A2B",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "#FBE2E2"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "none"
                }}
              >
                Hủy dự án
              </button>
            </div>
          </div>

          {/* Member list */}
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                }}
              >
                Danh sách thành viên
              </span>
              <button
                onClick={onCreateContract}
                style={{
                  padding: "6px 16px",
                  borderRadius: 9999,
                  border: "1px solid #0A66C2",
                  background: "none",
                  color: "#0A66C2",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "#EAF1FA"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "none"
                }}
              >
                <UserPlusIcon size={15} /> Mời thành viên
              </button>
            </div>

            {members.length === 0 ? (
              <p style={{ fontSize: 13, color: "rgba(0,0,0,0.40)" }}>
                Không còn thành viên nào.
              </p>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {members.map((m) => (
                  <div
                    key={m.email}
                    style={{
                      padding: "18px 20px",
                      background: "#FAFAF8",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Name row */}
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "rgba(0,0,0,0.90)",
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {m.name}
                      {(() => {
                        const cs = (m as any).contractStatus ?? "Đang làm";
                        const csStyle = cs === "Chờ phản hồi"
                          ? { background: "#FEF7E0", color: "#B06000" }
                          : cs === "Hoàn thành"
                            ? { background: "#E6F4EA", color: "#137333" }
                            : { background: "#EAF1FA", color: "#0A66C2" };
                        return <span style={{ ...csStyle, borderRadius: 99, padding: "2px 10px", fontSize: 12, fontWeight: 600, marginLeft: 8 }}>{cs}</span>;
                      })()}
                    </div>
                    {/* Info grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 8,
                        marginBottom: 14,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "rgba(0,0,0,0.40)",
                            textTransform: "uppercase",
                            letterSpacing: 0.4,
                            marginBottom: 3,
                          }}
                        >
                          Giá trị HĐ
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "rgba(0,0,0,0.85)",
                          }}
                        >
                          {m.price}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "rgba(0,0,0,0.40)",
                            textTransform: "uppercase",
                            letterSpacing: 0.4,
                            marginBottom: 3,
                          }}
                        >
                          Chu kỳ
                        </div>
                        <div
                          style={{ fontSize: 14, color: "rgba(0,0,0,0.75)" }}
                        >
                          {project.period}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "rgba(0,0,0,0.40)",
                            textTransform: "uppercase",
                            letterSpacing: 0.4,
                            marginBottom: 3,
                          }}
                        >
                          Hạn
                        </div>
                        <div
                          style={{ fontSize: 14, color: "rgba(0,0,0,0.75)" }}
                        >
                          {m.dueDate ?? project.dueDate ?? "—"}
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        onClick={() =>
                          setToast(`Đã gửi yêu cầu thanh toán cho ${m.name}.`)
                        }
                        style={{
                          padding: "6px 18px",
                          borderRadius: 9999,
                          border: "none",
                          background: "#0A66C2",
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "background 150ms",
                        }}
                        onMouseEnter={(e) => {
                          ; (e.currentTarget as HTMLElement).style.background =
                            "#084FA0"
                        }}
                        onMouseLeave={(e) => {
                          ; (e.currentTarget as HTMLElement).style.background =
                            "#0A66C2"
                        }}
                      >
                        Thanh toán
                      </button>
                      <button
                        onClick={() => setRatingModal(m.email)}
                        style={{
                          padding: "6px 18px",
                          borderRadius: 9999,
                          border: "1px solid #44712E",
                          background: "none",
                          color: "#44712E",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "background 150ms",
                        }}
                        onMouseEnter={(e) => {
                          ; (e.currentTarget as HTMLElement).style.background =
                            "#E5F6E8"
                        }}
                        onMouseLeave={(e) => {
                          ; (e.currentTarget as HTMLElement).style.background =
                            "none"
                        }}
                      >
                        Hoàn thành dự án
                      </button>
                      {(m as any).contractStatus === "Chờ phản hồi" ? (
                        <button
                          onClick={() => setCancelInviteTarget(m.email)}
                          style={{
                            padding: "6px 16px",
                            borderRadius: 9999,
                            border: "1px solid #C03A2B",
                            background: "none",
                            color: "#C03A2B",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background 150ms",
                          }}
                        >
                          Hủy lời mời
                        </button>
                      ) : (
                        <button
                          onClick={() => setCancelTarget(m.email)}
                          style={{
                            padding: "6px 16px",
                            borderRadius: 9999,
                            border: "1px solid #C03A2B",
                            background: "none",
                            color: "#C03A2B",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background 150ms",
                          }}
                          onMouseEnter={(e) => {
                            ; (e.currentTarget as HTMLElement).style.background =
                              "#FBE2E2"
                          }}
                          onMouseLeave={(e) => {
                            ; (e.currentTarget as HTMLElement).style.background =
                              "none"
                          }}
                        >
                          Hủy hợp đồng
                        </button>
                      )}
                      <button
                        onClick={() => setContractDetailMember(m)}
                        style={{
                          padding: "6px 16px",
                          borderRadius: 9999,
                          border: "1px solid #0A66C2",
                          background: "none",
                          color: "#0A66C2",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        Xem chi tiết hợp đồng
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Danh sách ứng viên */}
          <div style={{ padding: "24px 28px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                }}
              >
                Danh sách ứng viên
              </span>
              <span style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                {CONTRACT_PROPOSALS.length} đề xuất
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {CONTRACT_PROPOSALS.map((proposal, idx) => (
                <div
                  key={proposal.id}
                  style={{
                    padding: "16px 0",
                    borderBottom:
                      idx < CONTRACT_PROPOSALS.length - 1
                        ? "1px solid rgba(0,0,0,0.06)"
                        : "none",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <Avatar name={proposal.name} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "rgba(0,0,0,0.90)",
                        }}
                      >
                        {proposal.name}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#0A66C2",
                          flexShrink: 0,
                        }}
                      >
                        {proposal.bid}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(0,0,0,0.55)",
                        marginBottom: 4,
                      }}
                    >
                      {proposal.occupation}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 6,
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          style={{
                            color:
                              s <= Math.round(proposal.rating)
                                ? "#F5A623"
                                : "#D1D5DB",
                            fontSize: 12,
                          }}
                        >
                          ★
                        </span>
                      ))}
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(0,0,0,0.55)",
                          marginLeft: 2,
                        }}
                      >
                        {proposal.rating} ({proposal.ratingCount} đánh giá)
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(0,0,0,0.60)",
                        lineHeight: 1.6,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {proposal.comment}
                    </p>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: 12,
                        color: "#0A66C2",
                        fontFamily: "inherit",
                        marginTop: 4,
                        fontWeight: 600,
                      }}
                      onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.textDecoration =
                        "underline")
                      }
                      onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.textDecoration =
                        "none")
                      }
                    >
                      Xem thêm →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel invite modal */}
      {cancelInviteTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, maxWidth: 400, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Hủy lời mời</p>
            <p style={{ color: "#555", marginBottom: 24 }}>Bạn có chắc muốn hủy lời mời với <b>{cancelInviteTarget}</b>?</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setCancelInviteTarget(null)} style={{ padding: "8px 20px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.20)", background: "#fff", color: "rgba(0,0,0,0.70)", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Quay lại</button>
              <button onClick={() => setCancelInviteTarget(null)} style={{ padding: "8px 20px", borderRadius: 9999, border: "none", background: "#C03A2B", color: "#fff", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Hủy lời mời</button>
            </div>
          </div>
        </div>
      )}

      {/* Close recruitment confirm modal */}
      {closeRecruitConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, maxWidth: 420, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Xác nhận đóng tuyển dụng</p>
            <p style={{ color: "#555", marginBottom: 24 }}>Sau khi đóng tuyển dụng, dự án sẽ không nhận thêm ứng viên mới.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setCloseRecruitConfirm(false)} style={{ padding: "8px 20px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.20)", background: "#fff", color: "rgba(0,0,0,0.70)", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Quay lại</button>
              <button onClick={() => { setCloseRecruitConfirm(false); setRecruitmentClosed(true); }} style={{ padding: "8px 20px", borderRadius: 9999, border: "none", background: "#0A66C2", color: "#fff", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Xác nhận đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Contract detail modal */}
      {contractDetailMember && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { setContractDetailMember(null); setIsEditingContract(false) }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, maxWidth: 520, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <p style={{ fontWeight: 700, fontSize: 20, marginBottom: 20 }}>Chi tiết hợp đồng</p>
            {isEditingContract ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ marginBottom: 4 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.70)", display: "block", marginBottom: 6 }}>Tiêu đề hợp đồng *</label>
                  <input
                    defaultValue={`Hợp đồng thiết kế - ${project.name}`}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 4, fontSize: 14, fontFamily: "inherit", outline: "none", color: "rgba(0,0,0,0.90)", background: "#fff", transition: "border-color 150ms", boxSizing: "border-box" }}
                    onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")}
                    onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)")}
                  />
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 4 }}>
                  <div style={{ flex: 2 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.70)", display: "block", marginBottom: 6 }}>Giá trị hợp đồng (VNĐ) *</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.45)", pointerEvents: "none" }}>
                        ₫
                      </span>
                      <input
                        type="text"
                        defaultValue={contractDetailMember.price.replace(/[^0-9]/g, '')}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 4, fontSize: 14, fontFamily: "inherit", outline: "none", color: "rgba(0,0,0,0.90)", background: "#fff", transition: "border-color 150ms", boxSizing: "border-box", paddingLeft: 28 }}
                        onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")}
                        onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)")}
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.70)", display: "block", marginBottom: 6 }}>Chu kỳ</label>
                    <select
                      defaultValue="Dự án"
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 4, fontSize: 14, fontFamily: "inherit", outline: "none", color: "rgba(0,0,0,0.90)", background: "#fff", transition: "border-color 150ms", boxSizing: "border-box", cursor: "pointer", appearance: "auto" }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)")}
                    >
                      <option value="Giờ">Giờ</option>
                      <option value="Ngày">Ngày</option>
                      <option value="Tuần">Tuần</option>
                      <option value="Tháng">Tháng</option>
                      <option value="Dự án">Dự án</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 4 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.70)", display: "block", marginBottom: 6 }}>Ngày bắt đầu</label>
                    <input
                      type="date"
                      defaultValue="2026-10-01"
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 4, fontSize: 14, fontFamily: "inherit", outline: "none", color: "rgba(0,0,0,0.90)", background: "#fff", transition: "border-color 150ms", boxSizing: "border-box" }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)")}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.70)", display: "block", marginBottom: 6 }}>Ngày kết thúc</label>
                    <input
                      type="date"
                      defaultValue={contractDetailMember.dueDate ? "2026-12-30" : ""}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 4, fontSize: 14, fontFamily: "inherit", outline: "none", color: "rgba(0,0,0,0.90)", background: "#fff", transition: "border-color 150ms", boxSizing: "border-box" }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)")}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 4 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.70)", display: "block", marginBottom: 6 }}>Chi tiết & Điều khoản đính kèm *</label>
                  <label
                    style={{
                      border: "1.5px dashed rgba(0,0,0,0.18)",
                      borderRadius: 6,
                      padding: "20px 16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      background: "#FAFAF8",
                      transition: "border-color 150ms, background 150ms",
                      minHeight: 100,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.18)")}
                  >
                    <input type="file" style={{ display: "none" }} />
                    <Paperclip size={22} color="rgba(0,0,0,0.40)" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.60)" }}>Tải lên file tài liệu đính kèm</span>
                    <span style={{ fontSize: 12, color: "rgba(0,0,0,0.40)" }}>PDF, DOC, DOCX, TXT (tối đa 10MB)</span>
                  </label>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15 }}>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Tiêu đề hợp đồng: </span>Hợp đồng thiết kế - {project.name}</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Giá trị hợp đồng: </span>{contractDetailMember.price}</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Chu kỳ: </span>Theo dự án (1 lần)</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Ngày bắt đầu: </span>01/10/2026</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Ngày kết thúc: </span>{contractDetailMember.dueDate ?? project.dueDate ?? "—"}</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Chi tiết & Điều khoản: </span>Các bên tuân thủ đúng tiến độ đề ra...</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Tài liệu điều khoản: </span><a href="#" style={{ color: "#0A66C2", textDecoration: "none" }}>DieuKhoan_HopDong.pdf</a></div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Thông tin Freelancer: </span>{contractDetailMember.name} ({contractDetailMember.email})</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Trạng thái hợp đồng: </span><span style={{ padding: "2px 8px", borderRadius: 4, background: "#F4F2EE", fontWeight: 700, color: "#0A66C2" }}>{(contractDetailMember as any).contractStatus ?? "Đang làm"}</span></div>
              </div>
            )}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>
              <button onClick={() => { setContractDetailMember(null); setIsEditingContract(false); }} style={{ padding: "9px 22px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.20)", background: "#fff", color: "rgba(0,0,0,0.70)", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Đóng</button>
              {isEditingContract ? (
                <button onClick={() => { setIsEditingContract(false); setToast("Đã cập nhật hợp đồng"); }} style={{ padding: "9px 22px", borderRadius: 9999, border: "none", background: "#0A66C2", color: "#fff", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Lưu thay đổi</button>
              ) : (
                <button onClick={() => setIsEditingContract(true)} style={{ padding: "9px 22px", borderRadius: 9999, border: "none", background: "#0A66C2", color: "#fff", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Chỉnh sửa</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel modal — individual member contract or whole project */}
      {cancelTarget && (
        <CancelModal
          title={cancelTarget === "project" ? "Hủy dự án" : "Hủy hợp đồng"}
          subtitle={
            cancelTarget === "project"
              ? `Dự án: ${project.name}`
              : `Thành viên: ${cancelMember?.name ?? cancelTarget}`
          }
          onClose={() => setCancelTarget(null)}
          onConfirm={handleConfirmCancel}
        />
      )}

      {/* Rating modal — project cancel or per-member complete */}
      {ratingModal && ratingMembers.length > 0 && (
        <RatingModal
          title={ratingTitle}
          members={ratingMembers}
          onClose={() => setRatingModal(null)}
          onSubmit={() => {
            if (isProjectCancel) {
              onBack()
            } else {
              setMembers((p) => p.filter((m) => m.email !== ratingModal))
              setRatingModal(null)
              setToast(
                `Hợp đồng với ${ratingMembers[0]?.name} đã hoàn thành. Cảm ơn bạn đã đánh giá!`,
              )
            }
          }}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

// ─── Employee-Project detail page (worker view) ───────────────────────────────

function EmployeeProjectDetailPage({
  project,
  onBack,
}: {
  project: MyProject
  onBack: () => void
}) {
  const [showCancel, setShowCancel] = useState(false)
  const myContract = project.members[0]

  return (
    <div
      style={{
        background: "#F4F2EE",
        minHeight: "100%",
        padding: "28px 16px 48px",
      }}
    >
      <div style={{ maxWidth: 768, margin: "0 auto" }}>
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(0,0,0,0.60)",
            fontFamily: "inherit",
            marginBottom: 20,
            padding: "4px 0",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#0A66C2")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")
          }
        >
          <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Quay
          lại
        </button>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
              }}
            >
              {project.name}
            </div>
            <div
              style={{ fontSize: 12, color: "rgba(0,0,0,0.50)", marginTop: 3 }}
            >
              {project.period}
              {project.dueDate ? ` · Hạn: ${project.dueDate}` : ""}
            </div>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "rgba(0,0,0,0.60)",
                marginBottom: 12,
              }}
            >
              Hợp đồng của tôi
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "#F4F2EE",
                borderRadius: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                  }}
                >
                  {myContract?.price ?? "—"}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 2,
                  }}
                >
                  Chu kỳ: {project.period}
                </div>
              </div>
              <button
                onClick={() => setShowCancel(true)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 9999,
                  border: "1px solid #C03A2B",
                  background: "none",
                  color: "#C03A2B",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "#FBE2E2"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "none"
                }}
              >
                Hủy hợp đồng
              </button>
            </div>

            {/* Chi tiết hợp đồng chi tiết */}
            <div style={{ marginTop: 16, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "rgba(0,0,0,0.90)", marginBottom: 12 }}>Chi tiết hợp đồng</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Tiêu đề hợp đồng: </span>Hợp đồng {project.name}</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Giá trị hợp đồng: </span>{myContract?.price ?? "—"}</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Chu kỳ: </span>{project.period}</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Ngày bắt đầu: </span>01/10/2026</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Ngày kết thúc: </span>{project.dueDate ?? "—"}</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Chi tiết & Điều khoản: </span>Tuân thủ đúng yêu cầu chất lượng</div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Tài liệu điều khoản: </span><a href="#" style={{ color: "#0A66C2", textDecoration: "none" }}>HopDong_{project.id}.pdf</a></div>
                <div><span style={{ fontWeight: 600, color: "rgba(0,0,0,0.65)", width: 160, display: "inline-block" }}>Trạng thái hợp đồng: </span><span style={{ padding: "2px 8px", borderRadius: 4, background: "#F4F2EE", fontWeight: 700, color: "#0A66C2" }}>{myContract?.status ?? "Đang làm"}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCancel && (
        <CancelModal
          title="Hủy hợp đồng"
          subtitle={`Dự án: ${project.name}`}
          onClose={() => setShowCancel(false)}
          onConfirm={() => {
            setShowCancel(false)
            onBack()
          }}
        />
      )}
    </div>
  )
}

// ─── Project list card (reusable for main page) ────────────────────────────────

function ProjectListCard({
  title,
  projects,
  emptyText,
  onSelect,
}: {
  title: string
  projects: MyProject[]
  emptyText: string
  onSelect: (p: MyProject) => void
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          padding: "16px 20px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ fontWeight: 700, fontSize: 15, color: "rgba(0,0,0,0.90)" }}
        >
          {title}
        </span>
        <span
          style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", fontWeight: 600 }}
        >
          {projects.length}
        </span>
      </div>
      {projects.length === 0 ? (
        <div
          style={{
            padding: "12px 20px 16px",
            fontSize: 13,
            color: "rgba(0,0,0,0.45)",
          }}
        >
          {emptyText}
        </div>
      ) : (
        projects.map((proj, idx) => (
          <div key={proj.id}>
            {idx > 0 && (
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }} />
            )}
            <div
              onClick={() => onSelect(proj)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 20px",
                cursor: "pointer",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "none")
              }
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "#EAF1FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FolderPlus size={18} color="#0A66C2" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "rgba(0,0,0,0.90)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {proj.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 2,
                  }}
                >
                  {proj.members.length} thành viên · {proj.period}
                </div>
              </div>
              <ArrowRight
                size={15}
                color="rgba(0,0,0,0.30)"
                style={{ flexShrink: 0, marginTop: 4 }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// ─── Pending project queue card ───────────────────────────────────────────────

function PendingProjectCard({
  pending,
  setPending,
}: {
  pending: PendingProject[]
  setPending: React.Dispatch<React.SetStateAction<PendingProject[]>>
}) {
  if (pending.length === 0) return null
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          padding: "16px 20px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ fontWeight: 700, fontSize: 15, color: "rgba(0,0,0,0.90)" }}
        >
          Dự án trong hàng chờ
        </span>
        <span
          style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", fontWeight: 600 }}
        >
          {pending.length}
        </span>
      </div>
      {pending.map((proj, idx) => (
        <div key={proj.id}>
          {idx > 0 && (
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }} />
          )}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "12px 20px",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: "#FFF4D6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Clock size={18} color="#915907" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "rgba(0,0,0,0.90)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {proj.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.55)",
                  marginTop: 2,
                }}
              >
                Người đăng: {proj.owner}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.55)",
                  marginTop: 1,
                }}
              >
                {proj.price} · {proj.period}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={() =>
                    setPending((p) => p.filter((x) => x.id !== proj.id))
                  }
                  style={{
                    padding: "6px 16px",
                    borderRadius: 9999,
                    border: "1px solid rgba(0,0,0,0.20)",
                    background: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    color: "rgba(0,0,0,0.60)",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background =
                      "#F4F2EE"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background = "none"
                  }}
                >
                  Từ chối
                </button>
                <button
                  onClick={() =>
                    setPending((p) => p.filter((x) => x.id !== proj.id))
                  }
                  style={{
                    padding: "6px 16px",
                    borderRadius: 9999,
                    border: "none",
                    background: "#0A66C2",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    color: "#fff",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background =
                      "#084FA0"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background =
                      "#0A66C2"
                  }}
                >
                  Chấp nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Create Project Page ──────────────────────────────────────────────────────

function CreateProjectPage({
  onBack,
  onSubmit,
}: {
  onBack: () => void
  onSubmit: () => void
}) {
  const [rTitle, setRTitle] = useState("")
  const [rDesc, setRDesc] = useState("")
  const [rStartPrice, setRStartPrice] = useState("")
  const [rPeriod, setRPeriod] = useState(CY_PERIODS[1])
  const [rDueDate, setRDueDate] = useState("")
  const [rBidClose, setRBidClose] = useState("")
  const [rPublish, setRPublish] = useState<"co" | "khong">("co")

  const canSubmit = rTitle.trim() && rDesc.trim()

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    color: "rgba(0,0,0,0.90)",
    background: "#fff",
    transition: "border-color 150ms",
    boxSizing: "border-box",
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: "rgba(0,0,0,0.70)",
    display: "block",
    marginBottom: 6,
  }
  const sec: React.CSSProperties = {
    padding: "20px 24px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  }
  const focus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => ((e.currentTarget as HTMLElement).style.borderColor = "#0A66C2")
  const blur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)")

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      <div style={{ background: "linear-gradient(135deg, #0A66C2 0%, #084FA0 100%)", padding: "32px 0" }}>
        <div style={{ maxWidth: 1128, margin: "0 auto", padding: "0 24px" }}>
          <HeaderBackButton onClick={onBack} />
          <h1 style={{ color: "#fff", fontWeight: 700, fontSize: 28, margin: 0 }}>Tạo dự án mới</h1>
          <p style={{ color: "rgba(255,255,255,0.80)", marginTop: 8, fontSize: 15 }}>Điền thông tin để tạo dự án và tìm kiếm freelancer phù hợp</p>
        </div>
      </div>
      <div
        style={{
          padding: "32px 16px 48px",
        }}
      >
        <div style={{ maxWidth: 768, margin: "0 auto" }}>
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(0,0,0,0.60)",
              fontFamily: "inherit",
              marginBottom: 20,
              padding: "4px 0",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#0A66C2")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")
            }
          >
            <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Quay
            lại
          </button>

          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "#EAF1FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FolderPlus size={22} color="#0A66C2" />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                    lineHeight: 1.2,
                  }}
                >
                  Tạo dự án mới
                </h1>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 2,
                  }}
                >
                  Đăng dự án để tìm freelancer phù hợp
                </p>
              </div>
            </div>

            {/* Fields */}
            <div style={sec}>
              <label style={labelStyle}>Tên dự án *</label>
              <input
                value={rTitle}
                onChange={(e) => setRTitle(e.target.value)}
                placeholder="VD: Xây dựng hệ thống quản lý kho hàng"
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>

            <div style={sec}>
              <label style={labelStyle}>Mô tả *</label>
              <textarea
                value={rDesc}
                onChange={(e) => setRDesc(e.target.value)}
                placeholder="Mô tả chi tiết dự án, kỹ năng yêu cầu và kết quả kỳ vọng..."
                style={{
                  ...inputStyle,
                  minHeight: 120,
                  resize: "vertical",
                  lineHeight: 1.65,
                }}
                onFocus={focus}
                onBlur={blur}
              />
            </div>

            <div style={{ ...sec, display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Giá khởi điểm (VNĐ)</label>
                <input
                  type="number"
                  value={rStartPrice}
                  onChange={(e) => setRStartPrice(e.target.value)}
                  placeholder="VD: 10000000"
                  style={inputStyle}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Chu kỳ</label>
                <select
                  value={rPeriod}
                  onChange={(e) => setRPeriod(e.target.value)}
                  style={inputStyle}
                  onFocus={focus}
                  onBlur={blur}
                >
                  {CY_PERIODS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ ...sec, display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Due date</label>
                <input
                  type="date"
                  value={rDueDate}
                  onChange={(e) => setRDueDate(e.target.value)}
                  style={inputStyle}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Hạn đóng chào mời</label>
                <input
                  type="date"
                  value={rBidClose}
                  onChange={(e) => setRBidClose(e.target.value)}
                  style={inputStyle}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>
            </div>

            <div style={sec}>
              <label style={labelStyle}>Đăng tải tuyển dụng</label>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(0,0,0,0.50)",
                  marginBottom: 10,
                }}
              >
                Dự án sẽ được hiển thị công khai để freelancer có thể đề xuất hợp
                tác.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {(["co", "khong"] as const).map((v) => {
                  const active = rPublish === v
                  return (
                    <button
                      key={v}
                      onClick={() => setRPublish(v)}
                      style={{
                        padding: "8px 28px",
                        borderRadius: 9999,
                        border: `1.5px solid ${active ? "#0A66C2" : "rgba(0,0,0,0.18)"
                          }`,
                        background: active ? "#EAF1FA" : "#fff",
                        color: active ? "#0A66C2" : "rgba(0,0,0,0.65)",
                        fontSize: 14,
                        fontWeight: active ? 700 : 500,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 150ms",
                      }}
                    >
                      {v === "co" ? "Có" : "Không"}
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button
                onClick={onBack}
                style={{
                  padding: "9px 20px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.25)",
                  background: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "rgba(0,0,0,0.65)",
                  fontFamily: "inherit",
                }}
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (canSubmit) onSubmit()
                }}
                disabled={!canSubmit}
                style={{
                  padding: "9px 28px",
                  borderRadius: 9999,
                  border: "none",
                  background: canSubmit ? "#0A66C2" : "rgba(0,0,0,0.12)",
                  color: canSubmit ? "#fff" : "rgba(0,0,0,0.35)",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: canSubmit ? "pointer" : "default",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ClipboardText size={15} weight="fill" /> Đăng dự án
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Create Contract Page ─────────────────────────────────────────────────────

function CreateContractPage({
  onBack,
  onSubmit,
}: {
  onBack: () => void
  onSubmit: () => void
}) {
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")
  const [period, setPeriod] = useState(CY_PERIODS[1])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [termsFileName, setTermsFileName] = useState("")
  const [freelancerEmail, setFreelancerEmail] = useState("")
  const [inviteMsg, setInviteMsg] = useState("")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const termsFileRef = useRef<HTMLInputElement>(null)

  const canSubmit =
    title.trim() &&
    value.trim() &&
    freelancerEmail.trim() &&
    termsFileName.trim()

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    color: "rgba(0,0,0,0.90)",
    background: "#fff",
    transition: "border-color 150ms",
    boxSizing: "border-box",
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: "rgba(0,0,0,0.70)",
    display: "block",
    marginBottom: 6,
  }
  const sec: React.CSSProperties = {
    padding: "24px 28px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  }

  const projectNames = MY_PROJECTS_DATA.map((p) => p.name)

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      <div style={{ background: "linear-gradient(135deg, #0A66C2 0%, #084FA0 100%)", padding: "32px 0" }}>
        <div style={{ maxWidth: 1128, margin: "0 auto", padding: "0 24px" }}>
          <HeaderBackButton onClick={onBack} />
          <h1 style={{ color: "#fff", fontWeight: 700, fontSize: 28, margin: 0 }}>Tạo hợp đồng mới</h1>
          <p style={{ color: "rgba(255,255,255,0.80)", marginTop: 8, fontSize: 15 }}>Điền thông tin để tạo hợp đồng với freelancer</p>
        </div>
      </div>
      <div
        style={{
          padding: "32px 16px 48px",
        }}
      >
        <div style={{ maxWidth: 768, margin: "0 auto" }}>
          {/* Back */}
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(0,0,0,0.60)",
              fontFamily: "inherit",
              marginBottom: 20,
              padding: "4px 0",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#0A66C2")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")
            }
          >
            <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Quay
            lại
          </button>

          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                ...sec,
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "#EAF1FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FileText size={22} color="#0A66C2" />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                    lineHeight: 1.2,
                  }}
                >
                  Tạo hợp đồng mới
                </h1>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 2,
                  }}
                >
                  Điền thông tin và mời freelancer tham gia hợp đồng
                </p>
              </div>
            </div>

            {/* Section 1 — Project selection */}
            <div style={sec}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  marginBottom: 16,
                }}
              >
                Hợp đồng này dành cho dự án nào?
              </div>
              {selectedProject && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 14,
                    padding: "10px 14px",
                    background: "#EAF1FA",
                    borderRadius: 6,
                  }}
                >
                  <FolderPlus size={16} color="#0A66C2" />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0A66C2",
                      flex: 1,
                    }}
                  >
                    {selectedProject}
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(0,0,0,0.40)",
                      display: "flex",
                      padding: 2,
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#C03A2B")
                    }
                    onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(0,0,0,0.40)")
                    }
                  >
                    <X size={14} weight="bold" />
                  </button>
                </div>
              )}
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setShowProjectModal(true)}
                  style={{
                    borderRadius: 9999,
                    border: "1px solid #0A66C2",
                    background: "none",
                    color: "#0A66C2",
                    padding: "8px 24px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 150ms",
                  }}
                  onMouseEnter={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background = "#EAF1FA"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background = "none"
                  }}
                >
                  Chọn dự án
                </button>
              </div>
            </div>

            {/* Section 2 — Contract details */}
            <div style={sec}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  marginBottom: 18,
                }}
              >
                Chi tiết hợp đồng
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Tiêu đề hợp đồng *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Thiết kế UI/UX cho ứng dụng mobile Fintech"
                  style={inputStyle}
                  onFocus={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "#0A66C2")
                  }
                  onBlur={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,0,0,0.15)")
                  }
                />
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 2 }}>
                  <label style={labelStyle}>Giá trị hợp đồng (VNĐ) *</label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "rgba(0,0,0,0.45)",
                        pointerEvents: "none",
                      }}
                    >
                      ₫
                    </span>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="VD: 45000000"
                      style={{ ...inputStyle, paddingLeft: 28 }}
                      onFocus={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor =
                        "#0A66C2")
                      }
                      onBlur={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(0,0,0,0.15)")
                      }
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Chu kỳ</label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      appearance: "auto",
                    }}
                    onFocus={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "#0A66C2")
                    }
                    onBlur={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,0,0,0.15)")
                    }
                  >
                    {CY_PERIODS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "#0A66C2")
                    }
                    onBlur={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,0,0,0.15)")
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Ngày kết thúc</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "#0A66C2")
                    }
                    onBlur={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,0,0,0.15)")
                    }
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Chi tiết & Điều khoản *</label>
                <input
                  ref={termsFileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) setTermsFileName(f.name)
                  }}
                />
                <div
                  onClick={() => termsFileRef.current?.click()}
                  style={{
                    border: "1.5px dashed rgba(0,0,0,0.18)",
                    borderRadius: 6,
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    background: termsFileName ? "#EAF1FA" : "#FAFAF8",
                    transition: "border-color 150ms, background 150ms",
                    minHeight: 100,
                  }}
                  onMouseEnter={(e) => {
                    ; (e.currentTarget as HTMLElement).style.borderColor =
                      "#0A66C2"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,0,0,0.18)"
                  }}
                >
                  {termsFileName ? (
                    <>
                      <FileText size={22} color="#0A66C2" />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0A66C2",
                        }}
                      >
                        {termsFileName}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>
                        Nhấn để thay thế tài liệu
                      </span>
                    </>
                  ) : (
                    <>
                      <Paperclip size={22} color="rgba(0,0,0,0.40)" />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "rgba(0,0,0,0.65)",
                        }}
                      >
                        Tải lên tài liệu điều khoản
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(0,0,0,0.40)" }}>
                        PDF, DOC, DOCX, TXT
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3 — Invite freelancer */}
            <div style={sec}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  marginBottom: 4,
                }}
              >
                Mời Freelancer
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.60)",
                  marginBottom: 16,
                }}
              >
                Nhập email của freelancer để gửi lời mời tham gia hợp đồng này
              </p>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email Freelancer *</label>
                <input
                  type="email"
                  value={freelancerEmail}
                  onChange={(e) => setFreelancerEmail(e.target.value)}
                  placeholder="freelancer@example.com"
                  style={inputStyle}
                  onFocus={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "#0A66C2")
                  }
                  onBlur={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,0,0,0.15)")
                  }
                />
              </div>

              <div>
                <label style={{ ...labelStyle }}>
                  Tin nhắn mời{" "}
                  <span style={{ fontWeight: 400, color: "rgba(0,0,0,0.40)" }}>
                    (tuỳ chọn)
                  </span>
                </label>
                <textarea
                  value={inviteMsg}
                  onChange={(e) => setInviteMsg(e.target.value)}
                  placeholder="Viết tin nhắn giới thiệu về dự án và lý do bạn muốn hợp tác..."
                  style={{
                    ...inputStyle,
                    minHeight: 88,
                    resize: "vertical",
                    lineHeight: 1.65,
                  }}
                  onFocus={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "#0A66C2")
                  }
                  onBlur={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,0,0,0.15)")
                  }
                />
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "20px 28px",
                background: "#FAFAF8",
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
            >
              <button
                onClick={onBack}
                style={{
                  padding: "9px 20px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.25)",
                  background: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "rgba(0,0,0,0.65)",
                  fontFamily: "inherit",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.background = "none"
                }}
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (canSubmit) onSubmit()
                }}
                disabled={!canSubmit}
                style={{
                  padding: "8px 32px",
                  borderRadius: 9999,
                  border: "none",
                  background: canSubmit ? "#0A66C2" : "rgba(0,0,0,0.12)",
                  color: canSubmit ? "#fff" : "rgba(0,0,0,0.35)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: canSubmit ? "pointer" : "default",
                  fontFamily: "inherit",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  if (canSubmit)
                    (e.currentTarget as HTMLElement).style.background = "#084FA0"
                }}
                onMouseLeave={(e) => {
                  if (canSubmit)
                    (e.currentTarget as HTMLElement).style.background = "#0A66C2"
                }}
              >
                Tạo & Gửi lời mời
              </button>
            </div>
          </div>
        </div>

        {/* Project selection modal */}
        {showProjectModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowProjectModal(false)
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                width: 480,
                boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                  }}
                >
                  Chọn dự án
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    color: "rgba(0,0,0,0.50)",
                    padding: 4,
                  }}
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
              <div style={{ padding: "8px 0 16px" }}>
                {projectNames.map((name) => (
                  <div
                    key={name}
                    onClick={() => {
                      setSelectedProject(name)
                      setShowProjectModal(false)
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 24px",
                      cursor: "pointer",
                      transition: "background 150ms",
                    }}
                    onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#EAF1FA")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "none")
                    }
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 6,
                        background: "#EAF1FA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <FolderPlus size={18} color="#0A66C2" />
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "rgba(0,0,0,0.90)",
                      }}
                    >
                      {name}
                    </span>
                    {selectedProject === name && (
                      <CheckCircle
                        size={18}
                        color="#057642"
                        weight="fill"
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </div>
                ))}
                {projectNames.length === 0 && (
                  <div
                    style={{
                      padding: "16px 24px",
                      fontSize: 13,
                      color: "rgba(0,0,0,0.45)",
                    }}
                  >
                    Bạn chưa có dự án nào.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEW HOME PAGE (Freelance & Job Marketplace Hub)
// ═══════════════════════════════════════════════════════════════════════════════

function NewHomePage({
  onSelectContract,
  onViewProfile,
  onOpenFinancialHistory,
  onNavigateProjects,
  savedJobIds = [],
  onToggleSaveJob,
  onOpenWallet,
}: {
  onSelectContract?: (c: Contract) => void
  onViewProfile?: (name?: string) => void
  onOpenFinancialHistory?: () => void
  onNavigateProjects?: () => void
  savedJobIds?: number[]
  onToggleSaveJob?: (id: number) => void
  onOpenWallet?: () => void
}) {
  const [subPage, setSubPage] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [activeTab, setActiveTab] = useState<"jobs" | "contracts">("jobs")
  const [sortBy, setSortBy] = useState<"latest" | "recommended" | "budget-desc">("latest")
  const [timeFilter, setTimeFilter] = useState<"all" | "this-month" | "last-month" | "last-30-days">("all")
  const [salaryRange, setSalaryRange] = useState<"all" | "under-15" | "15-30" | "30-50" | "above-50">("all")

  if (subPage === "search")
    return (
      <JobSearchPage
        onBack={() => setSubPage(null)}
        onSelectContract={onSelectContract}
      />
    )
  if (subPage === "create-project")
    return (
      <CreateProjectPage
        onBack={() => setSubPage(null)}
        onSubmit={() => {
          setSubPage(null)
          setToast("Dự án đã được tạo thành công!")
        }}
      />
    )
  if (subPage === "create-contract")
    return (
      <CreateContractPage
        onBack={() => setSubPage(null)}
        onSubmit={() => {
          setSubPage(null)
          setToast("Hợp đồng đã được tạo và gửi lời mời!")
        }}
      />
    )

  const parseBudgetNum = (bStr: string) => {
    const num = parseInt(bStr.replace(/[^0-9]/g, ""), 10)
    return isNaN(num) ? 0 : num
  }

  // Filter jobs
  const filteredJobs = JOB_LISTINGS.filter((job) => {
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase()
      const matchTitle = job.title.toLowerCase().includes(q)
      const matchCompany = job.company.toLowerCase().includes(q)
      const matchDesc = job.description.toLowerCase().includes(q)
      const matchSkills = job.skills.some((s) => s.toLowerCase().includes(q))
      if (!matchTitle && !matchCompany && !matchDesc && !matchSkills) return false
    }

    const budgetVal = parseBudgetNum(job.budget)
    if (salaryRange === "under-15" && budgetVal >= 15000000) return false
    if (salaryRange === "15-30" && (budgetVal < 15000000 || budgetVal > 30000000)) return false
    if (salaryRange === "30-50" && (budgetVal < 30000000 || budgetVal > 50000000)) return false
    if (salaryRange === "above-50" && budgetVal <= 50000000) return false

    if (timeFilter === "this-month" || timeFilter === "last-30-days") {
      if (job.postedAgo.includes("1 tháng") || job.postedAgo.includes("tháng trước")) return false
    } else if (timeFilter === "last-month") {
      if (!job.postedAgo.includes("tháng") && !job.postedAgo.includes("tháng trước")) return false
    }

    return true
  })

  // Sort jobs
  const displayJobs = [...filteredJobs]
  if (sortBy === "latest") {
    displayJobs.sort((a, b) => b.id - a.id)
  } else if (sortBy === "budget-desc") {
    displayJobs.sort((a, b) => parseBudgetNum(b.budget) - parseBudgetNum(a.budget))
  }

  // Filter contracts
  const filteredContracts = OTHER_CONTRACTS.filter((contract) => {
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase()
      const matchTitle = contract.title.toLowerCase().includes(q)
      const matchClient = contract.client.toLowerCase().includes(q)
      if (!matchTitle && !matchClient) return false
    }
    const budgetVal = parseBudgetNum(contract.value)
    if (salaryRange === "under-15" && budgetVal >= 15000000) return false
    if (salaryRange === "15-30" && (budgetVal < 15000000 || budgetVal > 30000000)) return false
    if (salaryRange === "30-50" && (budgetVal < 30000000 || budgetVal > 50000000)) return false
    if (salaryRange === "above-50" && budgetVal <= 50000000) return false
    return true
  })

  const hasActiveFilters = sortBy !== "latest" || timeFilter !== "all" || salaryRange !== "all" || searchKeyword !== ""

  const handleResetFilters = () => {
    setSortBy("latest")
    setTimeFilter("all")
    setSalaryRange("all")
    setSearchKeyword("")
  }

  return (
    <div style={{ maxWidth: 1128, margin: "0 auto", padding: "24px 16px" }}>
      {/* ─── Hero Banner ─── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
          borderRadius: 12,
          padding: "32px 32px 28px",
          color: "#fff",
          marginBottom: 24,
          boxShadow: "0 4px 20px rgba(10,102,194,0.18)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative circles */}
        <div
          style={{
            position: "absolute",
            right: -30,
            top: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 140,
            bottom: -50,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(4px)",
              borderRadius: 9999,
              padding: "4px 14px",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 12,
              letterSpacing: "0.01em",
            }}
          >
            <Sparkle size={14} weight="fill" color="#FFD700" />
            <span>Nền tảng Việc làm & Hợp đồng Freelance Occupify</span>
          </div>

          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            Chào mừng trở lại, {ME.name}! 👋
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.85)",
              marginBottom: 20,
              maxWidth: 650,
              lineHeight: 1.5,
            }}
          >
            Khám phá hàng ngàn dự án freelance hấp dẫn, kết nối trực tiếp với đối tác uy tín và bảo đảm thanh toán minh bạch, an toàn.
          </p>

          {/* Quick Search Box inside Hero */}
          <div
            style={{
              background: "#fff",
              borderRadius: 9999,
              padding: "4px 6px 4px 18px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
              maxWidth: 720,
            }}
          >
            <MagnifyingGlass size={20} color="#0A66C2" weight="bold" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm dự án, công việc theo kỹ năng, chức danh hoặc công ty..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "10px 12px",
                fontSize: 14,
                color: "rgba(0,0,0,0.85)",
                fontFamily: "inherit",
              }}
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 6,
                  color: "rgba(0,0,0,0.40)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={16} />
              </button>
            )}
            <button
              style={{
                background: "#0A66C2",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                padding: "9px 24px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 150ms",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#084fa0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#0A66C2")
              }
            >
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main 2-Column Marketplace Layout ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 340px",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* Left Column: Job & Contract Feed */}
        <div>
          {/* ── Filter Toolbar ────────────────────────────────────────── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              padding: "12px 16px",
              marginBottom: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Top row: Tab Switcher (Việc làm & Dự án vs Hợp đồng mở tuyển) + Reset */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                paddingBottom: 10,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setActiveTab("jobs")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 9999,
                    border: "none",
                    background: activeTab === "jobs" ? "#0A66C2" : "transparent",
                    color: activeTab === "jobs" ? "#fff" : "rgba(0,0,0,0.65)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 120ms",
                  }}
                >
                  <BriefcaseMetal size={15} weight={activeTab === "jobs" ? "fill" : "bold"} />
                  <span>Việc làm & Dự án</span>
                  <span
                    style={{
                      background: activeTab === "jobs" ? "rgba(255,255,255,0.25)" : "#F4F2EE",
                      color: activeTab === "jobs" ? "#fff" : "rgba(0,0,0,0.65)",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 8,
                    }}
                  >
                    {filteredJobs.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("contracts")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 9999,
                    border: "none",
                    background: activeTab === "contracts" ? "#0A66C2" : "transparent",
                    color: activeTab === "contracts" ? "#fff" : "rgba(0,0,0,0.65)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 120ms",
                  }}
                >
                  <FileText size={15} weight={activeTab === "contracts" ? "fill" : "bold"} />
                  <span>Hợp đồng mở tuyển</span>
                  <span
                    style={{
                      background: activeTab === "contracts" ? "rgba(255,255,255,0.25)" : "#F4F2EE",
                      color: activeTab === "contracts" ? "#fff" : "rgba(0,0,0,0.65)",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 8,
                    }}
                  >
                    {filteredContracts.length}
                  </span>
                </button>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#C03A2B",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <X size={14} />
                  <span>Đặt lại bộ lọc</span>
                </button>
              )}
            </div>

            {/* Bottom row: Filter Select Dropdowns */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {/* 1. Sắp xếp: Mới nhất */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={15} color="#0A66C2" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.60)" }}>Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.15)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    background: "#fff",
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.85)",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="latest">Mới nhất</option>
                  <option value="recommended">Phù hợp nhất</option>
                  <option value="budget-desc">Ngân sách cao nhất</option>
                </select>
              </div>

              {/* 2. Tháng / Thời gian */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CalendarBlank size={15} color="#057642" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.60)" }}>Thời gian:</span>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as any)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.15)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    background: "#fff",
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.85)",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="all">Tất cả thời gian</option>
                  <option value="this-month">Tháng này (Tháng 9/2026)</option>
                  <option value="last-month">Tháng trước (Tháng 8/2026)</option>
                  <option value="last-30-days">30 ngày qua</option>
                </select>
              </div>

              {/* 3. Range Lương */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Wallet size={15} color="#B06000" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.60)" }}>Mức lương:</span>
                <select
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value as any)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.15)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    background: "#fff",
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.85)",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="all">Tất cả mức lương</option>
                  <option value="under-15">Dưới 15 triệu</option>
                  <option value="15-30">15 - 30 triệu</option>
                  <option value="30-50">30 - 50 triệu</option>
                  <option value="above-50">Trên 50 triệu</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              padding: "0 4px",
            }}
          >
            <div style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
              {activeTab === "contracts" ? (
                <>
                  Tìm thấy{" "}
                  <strong style={{ color: "rgba(0,0,0,0.90)" }}>
                    {filteredContracts.length}
                  </strong>{" "}
                  hợp đồng mở tuyển
                </>
              ) : (
                <>
                  Tìm thấy{" "}
                  <strong style={{ color: "rgba(0,0,0,0.90)" }}>
                    {displayJobs.length}
                  </strong>{" "}
                  cơ hội phù hợp
                </>
              )}
              {searchKeyword && (
                <span
                  style={{
                    marginLeft: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "#EAF1FA",
                    color: "#0A66C2",
                    padding: "2px 8px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  "{searchKeyword}"
                  <X
                    size={12}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSearchKeyword("")}
                  />
                </span>
              )}
              {salaryRange !== "all" && (
                <span
                  style={{
                    marginLeft: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "#FEF7E0",
                    color: "#B06000",
                    padding: "2px 8px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {salaryRange === "under-15"
                    ? "< 15 triệu"
                    : salaryRange === "15-30"
                    ? "15 - 30 triệu"
                    : salaryRange === "30-50"
                    ? "30 - 50 triệu"
                    : "> 50 triệu"}
                  <X
                    size={12}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSalaryRange("all")}
                  />
                </span>
              )}
              {timeFilter !== "all" && (
                <span
                  style={{
                    marginLeft: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "#E6F4EA",
                    color: "#137333",
                    padding: "2px 8px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {timeFilter === "this-month"
                    ? "Tháng này"
                    : timeFilter === "last-month"
                    ? "Tháng trước"
                    : "30 ngày qua"}
                  <X
                    size={12}
                    style={{ cursor: "pointer" }}
                    onClick={() => setTimeFilter("all")}
                  />
                </span>
              )}
            </div>
          </div>

          {/* Tab = 'contracts' Content */}
          {activeTab === "contracts" && (
            <div>
              {filteredContracts.length === 0 ? (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                    padding: "48px 24px",
                    textAlign: "center",
                  }}
                >
                  <FileText size={40} color="rgba(0,0,0,0.25)" style={{ margin: "0 auto 12px" }} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(0,0,0,0.90)", marginBottom: 6 }}>
                    Không tìm thấy hợp đồng phù hợp
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)", maxWidth: 380, margin: "0 auto 16px" }}>
                    Hãy thử điều chỉnh lại mức ngân sách hoặc từ khóa tìm kiếm.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    style={{
                      background: "#0A66C2",
                      color: "#fff",
                      border: "none",
                      borderRadius: 9999,
                      padding: "8px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              ) : (
                filteredContracts.map((contract) => (
                  <div
                    key={contract.id}
                    onClick={() => onSelectContract?.(contract)}
                    style={{
                      background: "#fff",
                      borderRadius: 8,
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                      padding: "18px 20px",
                      marginBottom: 10,
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "#FAFAF8"
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#fff"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 8,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "rgba(0,0,0,0.90)",
                            marginBottom: 4,
                          }}
                        >
                          {contract.title}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "rgba(0,0,0,0.60)",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Buildings size={14} />
                          <span>{contract.client}</span>
                          <span>•</span>
                          <Clock size={14} />
                          <span>Hạn chót: {contract.deadline}</span>
                        </div>
                      </div>
                      <div
                        style={{
                          background: "#E5F6E8",
                          color: "#057642",
                          fontWeight: 800,
                          fontSize: 15,
                          padding: "6px 14px",
                          borderRadius: 6,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {contract.value}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 10,
                        borderTop: "1px solid rgba(0,0,0,0.05)",
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          color: "#057642",
                          fontWeight: 600,
                        }}
                      >
                        <SealCheck size={16} weight="fill" />
                        <span>Bảo đảm thanh toán 100% bởi Occupify</span>
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0A66C2",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        Xem chi tiết hợp đồng
                        <ArrowRight size={13} weight="bold" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab = 'jobs' Content */}
          {activeTab === "jobs" && (
            <div>
              {displayJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobIds.includes(job.id)}
                  onToggleSave={() => onToggleSaveJob?.(job.id)}
                  onApply={() =>
                    onSelectContract?.({
                      id: job.id,
                      title: job.title,
                      client: job.company,
                      value: job.budget,
                      deadline: "30 thg 12, 2026",
                      status: "pending",
                    })
                  }
                />
              ))}

              {displayJobs.length === 0 && (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                    padding: "48px 24px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "rgba(0,0,0,0.90)",
                      marginBottom: 6,
                    }}
                  >
                    Không tìm thấy công việc phù hợp
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(0,0,0,0.60)",
                      maxWidth: 380,
                      margin: "0 auto 16px",
                    }}
                  >
                    Hãy thử từ khóa chung hơn hoặc điều chỉnh lại bộ lọc để khám phá thêm nhiều cơ hội hấp dẫn.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    style={{
                      background: "#0A66C2",
                      color: "#fff",
                      border: "none",
                      borderRadius: 9999,
                      padding: "8px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Right Column: Widgets */}
        <div>
          {/* Quick Actions Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              padding: "18px 20px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Sparkle size={16} color="#0A66C2" weight="fill" />
              <span>Hành động nhanh</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => setSubPage("create-project")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "1px solid #0A66C2",
                  background: "#0A66C2",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#084fa0")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#0A66C2")
                }
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FolderPlus size={18} color="#fff" />
                </div>
                <div>
                  <div>+ Đăng tin tuyển dụng / Dự án</div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    Tìm nhân sự hoặc quản trị team
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSubPage("create-contract")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.10)",
                  background: "#fff",
                  color: "rgba(0,0,0,0.85)",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#fff"
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: "#E5F6E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FileText size={18} color="#057642" />
                </div>
                <div>
                  <div style={{ color: "#057642" }}>+ Soạn thảo hợp đồng</div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 400,
                      color: "rgba(0,0,0,0.55)",
                    }}
                  >
                    Mời ứng viên & thiết lập mốc thanh toán
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Projects Management Status Widget */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              padding: "18px 20px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Quản lý dự án</span>
              <span
                style={{
                  fontSize: 11,
                  background: "#EAF1FA",
                  color: "#0A66C2",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 9999,
                }}
              >
                Active
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "#FAFAF8",
                  borderRadius: 6,
                }}
              >
                <span style={{ fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
                  Dự án bạn quản lý
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                  }}
                >
                  2 dự án
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "#FAFAF8",
                  borderRadius: 6,
                }}
              >
                <span style={{ fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
                  Dự án đang thực hiện
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#057642",
                  }}
                >
                  2 hợp đồng
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "#FAFAF8",
                  borderRadius: 6,
                }}
              >
                <span style={{ fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
                  Đề xuất / Lời mời chờ
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#F59E0B",
                  }}
                >
                  2 chờ duyệt
                </span>
              </div>
            </div>

            <button
              onClick={onNavigateProjects}
              style={{
                width: "100%",
                marginTop: 14,
                background: "none",
                border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: 9999,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "#0A66C2",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#EAF1FA"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#0A66C2"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "none"
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(0,0,0,0.15)"
              }}
            >
              <span>Vào trang Quản lý dự án</span>
              <ArrowRight size={13} weight="bold" />
            </button>
          </div>

          {/* Occupify Wallet Widget */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              padding: "18px 20px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 12,
              }}
            >
              Ví tài khoản Occupify
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #1B3A5C 0%, #0A66C2 100%)",
                borderRadius: 8,
                padding: "16px",
                color: "#fff",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: 4,
                }}
              >
                Số dư khả dụng
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                12.500.000 ₫
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={onOpenWallet}
                style={{
                  flex: 1,
                  background: "#0A66C2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "8px 12px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#084fa0")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#0A66C2")
                }
              >
                <Wallet size={14} weight="bold" />
                <span>Ví của tôi</span>
              </button>
              <button
                onClick={onOpenFinancialHistory}
                style={{
                  flex: 1,
                  background: "#EAF1FA",
                  color: "#0A66C2",
                  border: "none",
                  borderRadius: 9999,
                  padding: "8px 12px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#d3e5f8")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
                }
              >
                <span>Thu chi</span>
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS MANAGEMENT PAGE (Dedicated Workspace)
// ═══════════════════════════════════════════════════════════════════════════════

function ProjectsManagementPage({
  onSelectContract,
  onViewProfile,
}: {
  onSelectContract?: (c: Contract) => void
  onViewProfile?: () => void
}) {
  const [toast, setToast] = useState<string | null>(null)
  const [subPage, setSubPage] = useState<string | null>(null)
  const [myProjects, setMyProjects] = useState<MyProject[]>(MY_PROJECTS_DATA)
  const [employeeProjects] = useState<MyProject[]>(EMPLOYEE_PROJECTS_DATA)
  const [pending, setPending] = useState<PendingProject[]>(
    PENDING_PROJECTS_DATA,
  )
  const [viewingMyProject, setViewingMyProject] = useState<MyProject | null>(
    null,
  )
  const [viewingEmpProject, setViewingEmpProject] = useState<MyProject | null>(
    null,
  )
  const [activeTab, setActiveTab] = useState<
    "all" | "owner" | "participant" | "pending"
  >("all")

  if (subPage === "search")
    return (
      <JobSearchPage
        onBack={() => setSubPage(null)}
        onSelectContract={onSelectContract}
      />
    )
  if (subPage === "create-project")
    return (
      <CreateProjectPage
        onBack={() => setSubPage(null)}
        onSubmit={() => {
          setSubPage(null)
          setToast("Dự án đã được tạo thành công!")
        }}
      />
    )
  if (subPage === "create-contract")
    return (
      <CreateContractPage
        onBack={() => setSubPage(null)}
        onSubmit={() => {
          setSubPage(null)
          setToast("Hợp đồng đã được tạo và gửi lời mời!")
        }}
      />
    )
  if (viewingMyProject)
    return (
      <MyProjectDetailPage
        project={viewingMyProject}
        onBack={() => setViewingMyProject(null)}
        onCreateContract={() => {
          setViewingMyProject(null)
          setSubPage("create-contract")
        }}
      />
    )
  if (viewingEmpProject)
    return (
      <EmployeeProjectDetailPage
        project={viewingEmpProject}
        onBack={() => setViewingEmpProject(null)}
      />
    )
  void setMyProjects

  const totalAll = myProjects.length + employeeProjects.length + pending.length

  return (
    <div style={{ maxWidth: 1128, margin: "0 auto", padding: "28px 16px" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "rgba(0,0,0,0.90)",
              marginBottom: 4,
              letterSpacing: "-0.02em",
            }}
          >
            Quản lý dự án & Hợp đồng
          </h1>
          <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
            Theo dõi tiến độ bàn giao, kiểm soát các mốc thanh toán và điều phối nhân sự
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setSubPage("create-contract")}
            style={{
              background: "#fff",
              color: "#057642",
              border: "1px solid #057642",
              borderRadius: 9999,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#E5F6E8"
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#fff"
            }}
          >
            <FileText size={16} weight="bold" />
            <span>+ Soạn hợp đồng</span>
          </button>

          <button
            onClick={() => setSubPage("create-project")}
            style={{
              background: "#0A66C2",
              color: "#fff",
              border: "none",
              borderRadius: 9999,
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 8px rgba(10,102,194,0.25)",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#084fa0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#0A66C2")
            }
          >
            <FolderPlus size={16} weight="bold" />
            <span>+ Tạo dự án mới</span>
          </button>
        </div>
      </div>

      {/* 3 Metrics Top Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Metric 1 */}
        <div
          onClick={() => setActiveTab(activeTab === "owner" ? "all" : "owner")}
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow:
              activeTab === "owner"
                ? "0 0 0 2px #0A66C2"
                : "0 0 0 1px rgba(0,0,0,0.08)",
            padding: "18px 20px",
            cursor: "pointer",
            transition: "all 150ms",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "owner")
              (e.currentTarget as HTMLElement).style.background = "#FAFAF8"
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "owner")
              (e.currentTarget as HTMLElement).style.background = "#fff"
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "#EAF1FA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FolderPlus size={24} color="#0A66C2" />
          </div>
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
              }}
            >
              {myProjects.length}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              Dự án tôi quản lý
            </div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.50)" }}>
              Đang làm chủ & điều phối
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() =>
            setActiveTab(activeTab === "participant" ? "all" : "participant")
          }
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow:
              activeTab === "participant"
                ? "0 0 0 2px #057642"
                : "0 0 0 1px rgba(0,0,0,0.08)",
            padding: "18px 20px",
            cursor: "pointer",
            transition: "all 150ms",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "participant")
              (e.currentTarget as HTMLElement).style.background = "#FAFAF8"
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "participant")
              (e.currentTarget as HTMLElement).style.background = "#fff"
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "#E5F6E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BriefcaseMetal size={24} color="#057642" />
          </div>
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
              }}
            >
              {employeeProjects.length}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              Dự án tôi tham gia
            </div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.50)" }}>
              Thực hiện theo hợp đồng
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() =>
            setActiveTab(activeTab === "pending" ? "all" : "pending")
          }
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow:
              activeTab === "pending"
                ? "0 0 0 2px #F59E0B"
                : "0 0 0 1px rgba(0,0,0,0.08)",
            padding: "18px 20px",
            cursor: "pointer",
            transition: "all 150ms",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "pending")
              (e.currentTarget as HTMLElement).style.background = "#FAFAF8"
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "pending")
              (e.currentTarget as HTMLElement).style.background = "#fff"
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "#FEF3C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Clock size={24} color="#D97706" />
          </div>
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
              }}
            >
              {pending.length}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.85)",
              }}
            >
              Chờ xác nhận
            </div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.50)" }}>
              Đề xuất & lời mời cần duyệt
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          paddingBottom: 10,
        }}
      >
        {[
          { id: "all", label: `Tất cả (${totalAll})` },
          { id: "owner", label: `Dự án của tôi (${myProjects.length})` },
          {
            id: "participant",
            label: `Dự án tham gia (${employeeProjects.length})`,
          },
          { id: "pending", label: `Chờ xử lý (${pending.length})` },
        ].map(({ id, label }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              style={{
                padding: "6px 16px",
                borderRadius: 9999,
                border: "none",
                background: isActive ? "#0A66C2" : "transparent",
                color: isActive ? "#fff" : "rgba(0,0,0,0.65)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent"
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Tab Content Display */}
      {activeTab === "all" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* Left Column: Projects */}
          <div>
            <ProjectListCard
              title="Các dự án của tôi"
              projects={myProjects}
              emptyText="Bạn chưa có dự án nào do bạn làm chủ."
              onSelect={setViewingMyProject}
            />
            <ProjectListCard
              title="Các dự án tôi đang thực hiện"
              projects={employeeProjects}
              emptyText="Bạn chưa tham gia dự án nào."
              onSelect={setViewingEmpProject}
            />
          </div>

          {/* Right Column: Pending & Quick shortcuts */}
          <div>
            <PendingProjectCard pending={pending} setPending={setPending} />

            {/* Quick Action Shortcuts Card */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                padding: "18px 20px",
                marginTop: 12,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  marginBottom: 10,
                }}
              >
                Mở rộng dự án của bạn
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={() => setSubPage("search")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "10px 14px",
                    background: "#FAFAF8",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.85)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <MagnifyingGlass size={16} />
                  <span>Tìm kiếm cơ hội việc làm mới</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "owner" && (
        <div style={{ maxWidth: 800 }}>
          <ProjectListCard
            title="Các dự án của tôi"
            projects={myProjects}
            emptyText="Bạn chưa có dự án nào."
            onSelect={setViewingMyProject}
          />
        </div>
      )}

      {activeTab === "participant" && (
        <div style={{ maxWidth: 800 }}>
          <ProjectListCard
            title="Các dự án tôi đang thực hiện"
            projects={employeeProjects}
            emptyText="Bạn chưa tham gia dự án nào."
            onSelect={setViewingEmpProject}
          />
        </div>
      )}

      {activeTab === "pending" && (
        <div style={{ maxWidth: 800 }}>
          <PendingProjectCard pending={pending} setPending={setPending} />
          {pending.length === 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                padding: "36px 20px",
                textAlign: "center",
                color: "rgba(0,0,0,0.50)",
                fontSize: 14,
              }}
            >
              Hiện tại không có lời mời hoặc đề xuất nào đang chờ duyệt.
            </div>
          )}
        </div>
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

const JobsPage = ProjectsManagementPage

// ═══════════════════════════════════════════════════════════════════════════════
// SAVED ITEMS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

function SavedItemsPage({
  savedJobIds,
  onToggleSave,
  onSelectContract,
  onExploreJobs,
}: {
  savedJobIds: number[]
  onToggleSave: (id: number) => void
  onSelectContract?: (c: Contract) => void
  onExploreJobs?: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const savedJobs = JOB_LISTINGS.filter((j) => savedJobIds.includes(j.id))

  const displayJobs = savedJobs.filter((job) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      job.skills.some((s) => s.toLowerCase().includes(q))
    )
  })

  return (
    <div style={{ maxWidth: 1128, margin: "0 auto", padding: "28px 16px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#EAF1FA",
              color: "#0A66C2",
              padding: "4px 12px",
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            <Bookmark size={14} weight="fill" />
            <span>Mục đã lưu của bạn</span>
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "rgba(0,0,0,0.90)",
              marginBottom: 4,
              letterSpacing: "-0.02em",
            }}
          >
            Việc làm đã lưu
          </h1>
          <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
            Danh sách các cơ hội việc làm và dự án freelance bạn đã đánh dấu để ứng tuyển sau
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onExploreJobs}
            style={{
              background: "#0A66C2",
              color: "#fff",
              border: "none",
              borderRadius: 9999,
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "background 150ms",
              boxShadow: "0 2px 8px rgba(10,102,194,0.25)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#084fa0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#0A66C2")
            }
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>Khám phá thêm việc làm</span>
          </button>
        </div>
      </div>

      {/* Main Layout 2-Column */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 340px",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* Left: Saved list */}
        <div>
          {/* Summary / Search inside saved */}
          {savedJobs.length > 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                padding: "12px 16px",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
                Đang lưu{" "}
                <strong style={{ color: "rgba(0,0,0,0.90)" }}>
                  {savedJobs.length}
                </strong>{" "}
                công việc
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#F4F2EE",
                  borderRadius: 9999,
                  padding: "6px 14px",
                  maxWidth: 280,
                  flex: 1,
                }}
              >
                <MagnifyingGlass size={14} color="rgba(0,0,0,0.50)" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Lọc trong mục đã lưu..."
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 13,
                    width: "100%",
                    color: "rgba(0,0,0,0.90)",
                  }}
                />
                {searchQuery && (
                  <X
                    size={13}
                    style={{ cursor: "pointer", color: "rgba(0,0,0,0.40)" }}
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
            </div>
          )}

          {/* List of saved jobs */}
          {displayJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onToggleSave={() => onToggleSave(job.id)}
              onClick={() =>
                onSelectContract?.({
                  id: job.id,
                  title: job.title,
                  client: job.company,
                  value: job.budget,
                  deadline: "30 thg 12, 2026",
                  status: "pending",
                })
              }
            />
          ))}

          {/* Empty State */}
          {savedJobs.length === 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#EAF1FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "#0A66C2",
                }}
              >
                <Bookmark size={30} weight="fill" />
              </div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  marginBottom: 6,
                }}
              >
                Bạn chưa lưu việc làm nào
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.60)",
                  maxWidth: 420,
                  margin: "0 auto 20px",
                  lineHeight: 1.5,
                }}
              >
                Khi bạn bắt gặp các cơ hội việc làm hoặc dự án phù hợp trên Trang chủ, hãy bấm biểu tượng Lưu để gom vào danh sách này và ứng tuyển bất cứ lúc nào.
              </p>
              <button
                onClick={onExploreJobs}
                style={{
                  background: "#0A66C2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "9px 24px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Khám phá việc làm ngay
              </button>
            </div>
          )}

          {/* Search query empty within saved */}
          {savedJobs.length > 0 && displayJobs.length === 0 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                padding: "36px 20px",
                textAlign: "center",
                color: "rgba(0,0,0,0.60)",
                fontSize: 14,
              }}
            >
              Không tìm thấy việc làm đã lưu nào khớp với từ khóa "{searchQuery}".
              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "#EAF1FA",
                    color: "#0A66C2",
                    border: "none",
                    borderRadius: 9999,
                    padding: "6px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Xóa tìm kiếm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Widgets */}
        <div>
          {/* Quick Stats Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 10,
              }}
            >
              Hành động nhanh
            </div>
            <button
              onClick={onExploreJobs}
              style={{
                width: "100%",
                background: "#F4F2EE",
                border: "none",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.85)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#F4F2EE")
              }
            >
              <span>Tìm kiếm cơ hội mới</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTRACT DETAILS PAGE + APPLY MODAL
// ═══════════════════════════════════════════════════════════════════════════════

const CONTRACT_PROPOSALS = [
  {
    id: 1,
    name: "Trần Minh Khoa",
    bid: "38.000.000 ₫",
    rating: 4.9,
    ratingCount: 27,
    occupation: "UI/UX Designer · Fintech Specialist",
    comment:
      "Tôi có hơn 5 năm kinh nghiệm trong lĩnh vực UI/UX Design cho các sản phẩm Fintech. Đã từng làm việc với VNPAY và Momo, tôi hiểu rõ các yêu cầu đặc thù của ngành...",
  },
  {
    id: 2,
    name: "Lê Thị Bảo Châu",
    bid: "42.000.000 ₫",
    rating: 4.7,
    ratingCount: 19,
    occupation: "Product Designer · Mobile App Expert",
    comment:
      "Portfolio của tôi bao gồm hơn 30 dự án redesign cho các ứng dụng tài chính tại Đông Nam Á. Tôi chú trọng vào trải nghiệm người dùng và accessibility...",
  },
  {
    id: 3,
    name: "Nguyễn Đức Hùng",
    bid: "35.500.000 ₫",
    rating: 4.5,
    ratingCount: 11,
    occupation: "UX Researcher · Design System",
    comment:
      "Chào anh/chị! Tôi đang tìm kiếm dự án thú vị để phát triển kỹ năng. Với nền tảng UX Research tại VNG Corporation, tôi tự tin đảm nhận dự án này...",
  },
]

// ─── Apply Modal ──────────────────────────────────────────────────────────────

function ApplyModal({
  contract,
  onClose,
  onSubmit,
}: {
  contract: Contract
  onClose: () => void
  onSubmit: () => void
}) {
  const [bidAmount, setBidAmount] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [onClose])

  const inputStyle: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 4,
    padding: "10px 12px",
    fontSize: 14,
    color: "rgba(0,0,0,0.90)",
    fontFamily: "inherit",
    width: "100%",
    outline: "none",
    background: "#fff",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
  }

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 500,
        }}
        onClick={onClose}
      />
      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translateY(-50%) translateX(-50%)",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
          width: 500,
          zIndex: 501,
          animation: "modalIn 200ms cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        <style>{`@keyframes modalIn { from { opacity:0; transform:translateX(-50%) translateY(calc(-50% + 16px)) scale(0.97); } to { opacity:1; transform:translateX(-50%) translateY(-50%) scale(1); } }`}</style>

        {/* Header */}
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
              }}
            >
              Ứng tuyển hợp đồng
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(0,0,0,0.50)",
                marginTop: 2,
                maxWidth: 360,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {contract.title}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(0,0,0,0.55)",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#F4F2EE")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "none")
            }
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* User context row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              background: "#F4F2EE",
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            <Avatar name="Nguyễn Minh Khoa" size={40} />
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.90)",
                }}
              >
                Nguyễn Minh Khoa
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.55)",
                  marginTop: 1,
                }}
              >
                minhkhoa@occupify.vn
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.70)",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Báo giá của bạn
              </label>
              <input
                type="text"
                placeholder="VD: 38.000.000 ₫"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0A66C2"
                  e.target.style.boxShadow = "0 0 0 1px #0A66C2"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,0,0,0.15)"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.70)",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Lời nhắn
              </label>
              <textarea
                placeholder="Giới thiệu bản thân và kinh nghiệm liên quan đến hợp đồng này..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 120,
                  lineHeight: 1.6,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0A66C2"
                  e.target.style.boxShadow = "0 0 0 1px #0A66C2"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,0,0,0.15)"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px 20px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.20)",
              background: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(0,0,0,0.65)",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#F4F2EE")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "none")
            }
          >
            Hủy
          </button>
          <button
            onClick={() => {
              if (bidAmount.trim()) onSubmit()
            }}
            style={{
              background: bidAmount.trim() ? "#0A66C2" : "rgba(0,0,0,0.12)",
              color: bidAmount.trim() ? "#fff" : "rgba(0,0,0,0.35)",
              border: "none",
              borderRadius: 9999,
              padding: "9px 24px",
              fontSize: 14,
              fontWeight: 700,
              cursor: bidAmount.trim() ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => {
              if (bidAmount.trim())
                (e.currentTarget as HTMLElement).style.background = "#084FA0"
            }}
            onMouseLeave={(e) => {
              if (bidAmount.trim())
                (e.currentTarget as HTMLElement).style.background = "#0A66C2"
            }}
          >
            Gửi báo giá
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Contract Details Page ────────────────────────────────────────────────────

function ContractDetailsPage({
  contract,
  onBack,
}: {
  contract: Contract
  onBack: () => void
}) {
  const [applyOpen, setApplyOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [reportJob, setReportJob] = useState(false)
  const [reportJobReason, setReportJobReason] = useState("")
  const [reportJobImg, setReportJobImg] = useState("")

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
  }

  const status = STATUS_CONFIG[contract.status] ?? STATUS_CONFIG["pending"]

  const FIELDS = [
    "UI/UX Design",
    "Figma",
    "Design System",
    "Fintech",
    "Mobile App",
  ]

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      <div
        style={{ maxWidth: 1128, margin: "0 auto", padding: "24px 16px 40px" }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(0,0,0,0.60)",
            fontFamily: "inherit",
            marginBottom: 16,
            padding: "4px 0",
            transition: "color 150ms ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#0A66C2")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")
          }
        >
          <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
          Quay lại danh sách hợp đồng
        </button>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN */}
          <div>
            {/* Card 1 — Contract Info */}
            <div style={cardStyle}>
              {/* Header */}
              <div
                style={{
                  padding: 24,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        background: "#16A34A",
                        color: "#fff",
                        borderRadius: 9999,
                        padding: "3px 10px",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      Còn mở trong 6 ngày
                    </span>
                  </div>
                  <h1
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "rgba(0,0,0,0.90)",
                      lineHeight: 1.3,
                    }}
                  >
                    {contract.title}
                  </h1>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(0,0,0,0.60)",
                      marginTop: 8,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <Clock size={13} color="rgba(0,0,0,0.40)" />
                      Đăng vào thg 9, 2026
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{ fontSize: 22, fontWeight: 700, color: "#0A66C2" }}
                  >
                    {contract.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(0,0,0,0.50)",
                      marginTop: 2,
                    }}
                  >
                    Giá hợp đồng
                  </div>
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: "20px 24px",
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.90)",
                    marginBottom: 12,
                  }}
                >
                  Mô tả hợp đồng
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.80)",
                    lineHeight: 1.7,
                    marginBottom: 14,
                  }}
                >
                  Chúng tôi đang tìm kiếm một UI/UX Designer có kinh nghiệm để
                  thiết kế lại toàn bộ giao diện người dùng cho hệ thống ứng
                  dụng Fintech của chúng tôi. Dự án bao gồm việc nghiên cứu
                  người dùng, xây dựng luồng trải nghiệm mới và thiết kế
                  prototype hoàn chỉnh.
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.80)",
                    lineHeight: 1.7,
                    marginBottom: 14,
                  }}
                >
                  Ứng viên cần có khả năng làm việc độc lập, giao tiếp tốt bằng
                  tiếng Việt và tiếng Anh, đồng thời có kinh nghiệm thực tế với
                  các sản phẩm tài chính số. Chúng tôi đặc biệt coi trọng tư duy
                  thiết kế lấy người dùng làm trung tâm.
                </p>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.90)",
                    marginBottom: 10,
                  }}
                >
                  Yêu cầu cụ thể:
                </div>
                <ul
                  style={{
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  {[
                    "Thiết kế lại toàn bộ UI cho ứng dụng iOS và Android",
                    "Xây dựng Design System và component library trong Figma",
                    "Thực hiện UX audit và đề xuất cải tiến trải nghiệm người dùng",
                    "Tạo prototype tương tác với Figma để test với người dùng thực",
                    "Bàn giao file Figma có cấu trúc rõ ràng cho team developer",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 14,
                        color: "rgba(0,0,0,0.80)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer — tags */}
              <div
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.70)",
                    marginBottom: 10,
                  }}
                >
                  Lĩnh vực
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {FIELDS.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#EAF1FA",
                        color: "#0A66C2",
                        borderRadius: 4,
                        padding: "4px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 — Apply action */}
            <div
              style={{
                ...cardStyle,
                marginTop: 12,
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.90)",
                  }}
                >
                  Bạn phù hợp với hợp đồng này?
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 2,
                  }}
                >
                  Gửi đề xuất của bạn ngay hôm nay.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexShrink: 0,
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "rgba(0,0,0,0.50)",
                    fontFamily: "inherit",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#C03A2B")
                  }
                  onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.50)")
                  }
                  onClick={() => setReportJob(true)}
                >
                  Báo cáo vi phạm
                </button>
                <button
                  onClick={() => setApplyOpen(true)}
                  style={{
                    background: "#0A66C2",
                    border: "none",
                    borderRadius: 9999,
                    color: "#fff",
                    padding: "10px 28px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 150ms ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#084FA0")
                  }
                  onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#0A66C2")
                  }
                >
                  <PaperPlaneTilt size={16} weight="bold" />
                  Ứng tuyển
                </button>
              </div>
            </div>

            {/* Card 3 — Proposals */}
            <div style={{ ...cardStyle, marginTop: 12 }}>
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                  }}
                >
                  Các lời đề nghị
                </span>
                <span style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                  {CONTRACT_PROPOSALS.length} đề xuất
                </span>
              </div>
              {CONTRACT_PROPOSALS.map((proposal, idx) => (
                <div
                  key={proposal.id}
                  style={{
                    padding: "18px 24px",
                    borderBottom:
                      idx < CONTRACT_PROPOSALS.length - 1
                        ? "1px solid rgba(0,0,0,0.06)"
                        : "none",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <Avatar name={proposal.name} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "rgba(0,0,0,0.90)",
                        }}
                      >
                        {proposal.name}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#0A66C2",
                          flexShrink: 0,
                        }}
                      >
                        {proposal.bid}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(0,0,0,0.55)",
                        marginBottom: 3,
                      }}
                    >
                      {proposal.occupation}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 6,
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          style={{
                            color:
                              s <= Math.round(proposal.rating)
                                ? "#F5A623"
                                : "#D1D5DB",
                            fontSize: 12,
                          }}
                        >
                          ★
                        </span>
                      ))}
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(0,0,0,0.55)",
                          marginLeft: 2,
                        }}
                      >
                        {proposal.rating} ({proposal.ratingCount} đánh giá)
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(0,0,0,0.60)",
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {proposal.comment}
                    </p>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: 12,
                        color: "#0A66C2",
                        fontFamily: "inherit",
                        marginTop: 4,
                        fontWeight: 600,
                      }}
                      onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.textDecoration =
                        "underline")
                      }
                      onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.textDecoration =
                        "none")
                      }
                    >
                      Xem thêm →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div style={{ ...cardStyle, padding: 20 }}>
              {/* Client avatar + name */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: 16,
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <Avatar name={contract.client} size={64} />
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {contract.client}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(0,0,0,0.50)",
                    marginTop: 3,
                  }}
                >
                  Khách hàng đã xác minh
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  { label: "Đánh giá", value: "⭐ 4.8 (12 đánh giá)" },
                  { label: "Tham gia", value: "T8/2023" },
                  { label: "Đã đăng", value: "15 dự án" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "rgba(0,0,0,0.90)",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contract meta */}
              <div
                style={{
                  padding: "14px 0 4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  { Icon: FileText, text: `Giá trị: ${contract.value}` },
                  {
                    Icon: CalendarBlank,
                    text: `Hạn chót: ${contract.deadline}`,
                  },
                ].map(({ Icon, text }) => (
                  <div
                    key={text}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Icon size={14} color="rgba(0,0,0,0.45)" weight="regular" />
                    <span style={{ fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
                      {text}
                    </span>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Envelope size={14} color="rgba(0,0,0,0.45)" />
                  <span style={{ fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
                    lienhe@techcorp.vn
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Phone size={14} color="rgba(0,0,0,0.45)" />
                  <span style={{ fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
                    +84 90 123 4567
                  </span>
                </div>
              </div>

              {/* Message button */}
              <button
                style={{
                  width: "100%",
                  marginTop: 16,
                  border: "1px solid #0A66C2",
                  borderRadius: 9999,
                  background: "none",
                  color: "#0A66C2",
                  padding: "10px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "#EAF1FA")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "none")
                }
              >
                <PaperPlaneTilt size={15} />
                Nhắn tin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report job modal */}
      {reportJob && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Báo cáo việc làm</p>
            <label style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Lý do báo cáo <span style={{ color: "#C03A2B" }}>*</span></label>
            <textarea value={reportJobReason} onChange={e => setReportJobReason(e.target.value)} rows={4} style={{ width: "100%", borderRadius: 8, border: "1px solid #ccc", padding: "10px 12px", fontSize: 14, resize: "vertical", boxSizing: "border-box" }} placeholder="Mô tả lý do..." />
            <div style={{ marginTop: 14 }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Hình ảnh (tùy chọn)</label>
              <input type="file" accept="image/*" onChange={e => setReportJobImg(e.target.files?.[0]?.name ?? "")} />
              {reportJobImg && <span style={{ fontSize: 12, color: "#555", marginLeft: 8 }}>{reportJobImg}</span>}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={() => setReportJob(false)} style={{ padding: "9px 22px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.20)", background: "#fff", color: "rgba(0,0,0,0.70)", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Hủy</button>
              <button disabled={!reportJobReason.trim()} onClick={() => { setReportJobReason(""); setReportJobImg(""); setReportJob(false); setToast("Đã gửi báo cáo vi phạm."); }} style={{ padding: "9px 22px", borderRadius: 9999, border: "none", background: reportJobReason.trim() ? "#0A66C2" : "#b0c4d8", color: "#fff", cursor: reportJobReason.trim() ? "pointer" : "not-allowed", fontWeight: 600, fontFamily: "inherit" }}>Gửi báo cáo</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply modal */}
      {applyOpen && (
        <ApplyModal
          contract={contract}
          onClose={() => setApplyOpen(false)}
          onSubmit={() => {
            setApplyOpen(false)
            setToast("Đã gửi đề xuất thành công!")
          }}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

type NotifCategory = "all" | "contracts" | "jobs" | "system"

interface Notif {
  id: number
  category: Exclude<NotifCategory, "all">
  actor: string
  text: string
  time: string
  read: boolean
  badgeIcon: "thumb" | "briefcase" | "bell" | "comment" | "star"
  isCompany?: boolean
}

const NOTIFICATIONS: Notif[] = [
  {
    id: 1,
    category: "contracts",
    actor: "VNPAY Corporation",
    text: 'đã xem đề xuất của bạn cho hợp đồng "Redesign hệ thống UI cho ứng dụng Fintech".',
    time: "30 phút trước",
    read: false,
    badgeIcon: "briefcase",
    isCompany: true,
  },
  {
    id: 2,
    category: "jobs",
    actor: "Trần Đức Anh",
    text: 'đã mời bạn ứng tuyển vào dự án "Thiết kế Landing Page SaaS Chuyển đổi cao".',
    time: "1 giờ trước",
    read: false,
    badgeIcon: "briefcase",
  },
  {
    id: 3,
    category: "jobs",
    actor: "Shopee Vietnam",
    text: 'vừa đăng công việc mới phù hợp với kĩ năng của bạn: "Senior Product Designer".',
    time: "2 giờ trước",
    read: false,
    badgeIcon: "briefcase",
    isCompany: true,
  },
  {
    id: 4,
    category: "contracts",
    actor: "Lê Thị Bảo Châu",
    text: 'đã xác nhận mốc nghiệm thu giai đoạn 1 cho hợp đồng "Mobile Banking UI".',
    time: "3 giờ trước",
    read: true,
    badgeIcon: "briefcase",
  },
  {
    id: 5,
    category: "system",
    actor: "Occupify",
    text: "Hồ sơ của bạn đã được xem bởi 24 người trong tuần này. Cập nhật hồ sơ để tăng khả năng hiển thị.",
    time: "5 giờ trước",
    read: true,
    badgeIcon: "bell",
  },
  {
    id: 6,
    category: "contracts",
    actor: "Nguyễn Đức Hùng",
    text: 'đã gửi một đề xuất mới cho hợp đồng "UX Research & Audit cho mobile app" của bạn.',
    time: "Hôm qua",
    read: true,
    badgeIcon: "briefcase",
  },
  {
    id: 7,
    category: "jobs",
    actor: "Tiki",
    text: "có 3 vị trí Design mới phù hợp với bạn. Xem ngay trước khi hết hạn!",
    time: "Hôm qua",
    read: true,
    badgeIcon: "briefcase",
    isCompany: true,
  },
  {
    id: 8,
    category: "contracts",
    actor: "Phạm Quang Hưng",
    text: 'đã để lại đánh giá 5 sao cho bạn sau khi hoàn thành hợp đồng "Brand Identity & Guidelines".',
    time: "2 ngày trước",
    read: true,
    badgeIcon: "star",
  },
  {
    id: 9,
    category: "system",
    actor: "Occupify",
    text: "Chứng chỉ Figma Advanced Design của bạn sắp hết hạn sau 30 ngày. Gia hạn ngay để giữ uy tín.",
    time: "3 ngày trước",
    read: true,
    badgeIcon: "bell",
  },
  {
    id: 10,
    category: "contracts",
    actor: "Base.vn",
    text: 'đã chấp nhận đề xuất của bạn. Hợp đồng "Xây dựng Design System" sẽ bắt đầu vào tuần tới.',
    time: "T7",
    read: true,
    badgeIcon: "briefcase",
    isCompany: true,
  },
]

const NOTIF_TABS: { id: NotifCategory; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "contracts", label: "Hợp đồng gần đây" },
  { id: "jobs", label: "Công việc của tôi" },
  { id: "system", label: "Hệ thống" },
]

function NotifBadge({ type }: { type: Notif["badgeIcon"] }) {
  const map: Record<Notif["badgeIcon"], { icon: React.ReactNode; bg: string }> =
  {
    thumb: {
      icon: <ThumbsUp size={10} weight="fill" color="#fff" />,
      bg: "#0A66C2",
    },
    briefcase: {
      icon: <BriefcaseMetal size={10} weight="fill" color="#fff" />,
      bg: "#057642",
    },
    bell: {
      icon: <Bell size={10} weight="fill" color="#fff" />,
      bg: "#915907",
    },
    comment: {
      icon: <ChatCircle size={10} weight="fill" color="#fff" />,
      bg: "#0A66C2",
    },
    star: {
      icon: <ArrowsClockwise size={10} weight="fill" color="#fff" />,
      bg: "#C03A2B",
    },
  }
  const { icon, bg } = map[type]
  return (
    <div
      style={{
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: 9999,
        background: bg,
        border: "2px solid #fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
  )
}

function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<NotifCategory>("all")
  const [notifs, setNotifs] = useState<Notif[]>(NOTIFICATIONS)

  const visible =
    activeTab === "all"
      ? notifs
      : notifs.filter((n) => n.category === activeTab)
  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))

  return (
    <div
      style={{
        background: "#F4F2EE",
        minHeight: "100%",
        padding: "24px 16px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1128,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* ── LEFT TABS ── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              fontSize: 16,
              fontWeight: 700,
              color: "rgba(0,0,0,0.90)",
            }}
          >
            Quản lý thông báo
          </div>
          {NOTIF_TABS.map((tab) => {
            const isActive = tab.id === activeTab
            const count =
              tab.id === "all"
                ? notifs.filter((n) => !n.read).length
                : notifs.filter((n) => n.category === tab.id && !n.read).length
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  background: isActive ? "#EAF1FA" : "none",
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: isActive
                    ? "4px solid #0A66C2"
                    : "4px solid transparent",
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                  color: isActive ? "#0A66C2" : "rgba(0,0,0,0.65)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "#FAFAF8"
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background = "none"
                }}
              >
                <span>{tab.label}</span>
                {count > 0 && (
                  <span
                    style={{
                      background: "#0A66C2",
                      color: "#fff",
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "1px 7px",
                      minWidth: 18,
                      textAlign: "center",
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── RIGHT FEED ── */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <button
              onClick={markAllRead}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.60)",
                fontFamily: "inherit",
                padding: "6px 12px",
                borderRadius: 9999,
                transition: "background 150ms",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#EAF1FA")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "none")
              }
            >
              Đánh dấu tất cả là đã đọc
            </button>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {visible.length === 0 && (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "rgba(0,0,0,0.45)",
                  fontSize: 14,
                }}
              >
                Không có thông báo nào.
              </div>
            )}
            {visible.map((notif, idx) => (
              <div
                key={notif.id}
                onClick={() =>
                  setNotifs((prev) =>
                    prev.map((n) =>
                      n.id === notif.id ? { ...n, read: true } : n,
                    ),
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "14px 18px",
                  background: notif.read ? "#fff" : "#EAF1FA",
                  borderBottom:
                    idx < visible.length - 1
                      ? "1px solid rgba(0,0,0,0.06)"
                      : "none",
                  cursor: "pointer",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  notif.read ? "#FAFAF8" : "#dceeff")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  notif.read ? "#fff" : "#EAF1FA")
                }
              >
                {/* Avatar with badge */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {notif.actor === "Occupify" ? (
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 9999,
                        background: "#0A66C2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Bell size={22} color="#fff" weight="fill" />
                    </div>
                  ) : notif.isCompany ? (
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 6,
                        background: "#F4F2EE",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#0A66C2",
                        border: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {notif.actor
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  ) : (
                    <Avatar name={notif.actor} size={48} />
                  )}
                  <NotifBadge type={notif.badgeIcon} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(0,0,0,0.90)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    <strong>{notif.actor}</strong> {notif.text}
                  </p>
                  <div
                    style={{
                      fontSize: 12,
                      color: notif.read ? "rgba(0,0,0,0.50)" : "#0A66C2",
                      fontWeight: notif.read ? 400 : 600,
                      marginTop: 5,
                    }}
                  >
                    {notif.time}
                  </div>
                </div>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 8,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {!notif.read && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 9999,
                        background: "#0A66C2",
                      }}
                    />
                  )}
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: 9999,
                      padding: 4,
                      color: "rgba(0,0,0,0.45)",
                      display: "flex",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#EAF1FA")
                    }
                    onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "none")
                    }
                  >
                    <DotsThreeVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MY PROFILE PAGE
// ═══════════════════════════════════════════════════════════════════════════════

const MY_PROFILE_DATA = {
  name: ME.name,
  headline: ME.headline,
  location: ME.location,
  connections: ME.connections,
  intro:
    "Product Designer với 6 năm kinh nghiệm trong lĩnh vực thiết kế sản phẩm số, chuyên sâu về Fintech và SaaS. Tôi có niềm đam mê với việc xây dựng trải nghiệm người dùng đơn giản, hiệu quả và có tác động thực sự. Đã dẫn dắt và đóng góp vào hơn 20 dự án thực tế từ giai đoạn nghiên cứu đến bàn giao.",
  onTimeRate: 96,
  successRate: 94,
  creditScore: 92,
  education: [{ school: "Đại học Bách Khoa Hà Nội", period: "2015 – 2020" }],
  certificates: [
    {
      name: "Google UX Design Professional Certificate",
      issuer: "Google · Coursera",
      year: "2021",
    },
    {
      name: "Figma Advanced Design & Prototyping",
      issuer: "Figma",
      year: "2022",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2023",
    },
    {
      name: "Agile & Scrum Foundation",
      issuer: "Scrum Alliance",
      year: "2022",
    },
  ],
  reviews: [
    {
      id: 1,
      reviewer: "Nguyễn Văn Bình",
      rating: 5,
      project: "Redesign hệ thống UI cho ứng dụng Fintech",
      comment:
        "Anh Khoa làm việc rất chuyên nghiệp, giao sản phẩm đúng hạn và chất lượng vượt kỳ vọng. Design System được xây dựng cực kỳ chi tiết, team dev triển khai rất dễ.",
      tags: ["UI Design", "Figma", "Design System"],
      price: "45.000.000 ₫",
      time: "3 tháng",
    },
    {
      id: 2,
      reviewer: "Lê Thị Hồng Nhung",
      rating: 5,
      project: "UX Research & Audit cho mobile app",
      comment:
        "Phân tích người dùng rất sâu, đưa ra insight có giá trị. Báo cáo UX Audit rõ ràng, dễ hiểu cho cả team kỹ thuật và business.",
      tags: ["UX Research", "User Testing", "Mobile"],
      price: "18.500.000 ₫",
      time: "6 tuần",
    },
    {
      id: 3,
      reviewer: "Trần Quốc Tuấn",
      rating: 4,
      project: "Xây dựng Design System cho nền tảng SaaS",
      comment:
        "Công việc tốt, có một vài vòng revision nhưng kết quả cuối cùng rất hài lòng. Sẽ hợp tác lại trong dự án tiếp theo.",
      tags: ["Design System", "Component Library", "Figma"],
      price: "28.000.000 ₫",
      time: "2 tháng",
    },
  ],
  projects: [
    {
      id: 1,
      owner: "VNPAY Corporation",
      name: "Redesign hệ thống UI cho ứng dụng Fintech",
      detail:
        "Thiết kế lại toàn bộ giao diện ứng dụng thanh toán, xây dựng design system và prototype hoàn chỉnh cho iOS & Android.",
      rating: 5,
    },
    {
      id: 2,
      owner: "Base.vn",
      name: "Xây dựng Design System cho nền tảng SaaS",
      detail:
        "Tạo thư viện component chuẩn hóa giúp tăng tốc phát triển giao diện, bao gồm hơn 120 component và token hệ thống.",
      rating: 4,
    },
    {
      id: 3,
      owner: "Momo",
      name: "UX Research & Audit cho mobile app",
      detail:
        "Thực hiện phỏng vấn người dùng, phân tích hành vi và đề xuất cải tiến luồng trải nghiệm cho ứng dụng ví điện tử.",
      rating: 5,
    },
    {
      id: 4,
      owner: "Shopee Vietnam",
      name: "Thiết kế landing page chiến dịch Marketing",
      detail:
        "Thiết kế giao diện landing page cho campaign 11.11, tối ưu conversion với A/B testing trên 3 biến thể design.",
      rating: 5,
    },
  ],
}

const MY_PROFILE_SUGGESTIONS: { name: string; gmail: string }[] = [
  { name: "Đặng Thị Minh Phương", gmail: nameToGmail("Đặng Thị Minh Phương") },
  { name: "Cao Xuân Hùng", gmail: nameToGmail("Cao Xuân Hùng") },
  { name: "Bùi Thị Lan Anh", gmail: nameToGmail("Bùi Thị Lan Anh") },
  { name: "Vũ Tiến Dũng", gmail: nameToGmail("Vũ Tiến Dũng") },
]

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            fontSize: size,
            color: s <= rating ? "#F5A623" : "#D1D5DB",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function MyProfilePage({
  onBack,
  isOwnProfile = true,
}: {
  onBack: () => void
  isOwnProfile?: boolean
}) {
  const p = MY_PROFILE_DATA
  const [connectedSet, setConnectedSet] = useState<Set<string>>(new Set())
  const [starFilter, setStarFilter] = useState<number | null>(null)
  const [cvFileName, setCvFileName] = useState("")
  const cvFileRef = useRef<HTMLInputElement>(null)
  const [reportProfile, setReportProfile] = React.useState(false)
  const [reportProfileReason, setReportProfileReason] = React.useState("")
  const [reportProfileImg, setReportProfileImg] = React.useState<string>("")

  const card: React.CSSProperties = {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
    marginBottom: 16,
  }
  const sectionHead = (title: string) => (
    <div
      style={{
        fontSize: 18,
        fontWeight: 700,
        color: "rgba(0,0,0,0.90)",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {title}
    </div>
  )

  const avgRating = +(
    p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
  ).toFixed(1)
  const filteredReviews = starFilter
    ? p.reviews.filter((r) => r.rating === starFilter)
    : p.reviews
  const gmail = nameToGmail(p.name)

  const MainContent = () => (
    <div>
      {/* Header card */}
      <div style={{ ...card, overflow: "hidden" }}>
        {/* Cover image */}
        <div
          style={{
            height: 200,
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(120deg,#04305E 0%,#0A66C2 60%,#1e88e5 100%)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=200&fit=crop&auto=format&q=80"
            alt="cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
        <div style={{ padding: "0 28px 24px" }}>
          {/* Avatar */}
          <div style={{ marginTop: -56, marginBottom: 12 }}>
            <div
              style={{
                width: 104,
                height: 104,
                borderRadius: 9999,
                border: "4px solid #fff",
                background: "#0A66C2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 800,
                color: "#fff",
                userSelect: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
              }}
            >
              {p.name
                .split(" ")
                .slice(-2)
                .map((w: string) => w[0])
                .join("")}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              {/* Name + gmail */}
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "rgba(0,0,0,0.90)",
                  lineHeight: 1.2,
                }}
              >
                {p.name}
              </div>
              <div
                style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", marginTop: 4 }}
              >
                {gmail}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(0,0,0,0.50)",
                  marginTop: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <MapPin size={13} color="rgba(0,0,0,0.35)" /> {p.location}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#0A66C2",
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                {p.connections} kết nối
              </div>
            </div>

            {!isOwnProfile && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 4 }}>
                <button
                  style={{
                    background: connectedSet.has(p.name) ? "#E5F6E8" : "#0A66C2",
                    border: connectedSet.has(p.name) ? "1px solid rgba(0,0,0,0.15)" : "none",
                    borderRadius: 9999,
                    color: connectedSet.has(p.name) ? "#057642" : "#fff",
                    padding: "8px 18px",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 150ms ease"
                  }}
                  onClick={() => setConnectedSet(prev => { const n = new Set(prev); if (n.has(p.name)) n.delete(p.name); else n.add(p.name); return n; })}
                  onMouseEnter={(e) => {
                    if (!connectedSet.has(p.name))
                      (e.currentTarget as HTMLElement).style.background = "#084FA0"
                  }}
                  onMouseLeave={(e) => {
                    if (!connectedSet.has(p.name))
                      (e.currentTarget as HTMLElement).style.background = "#0A66C2"
                    else
                      (e.currentTarget as HTMLElement).style.background = "#E5F6E8"
                  }}
                >
                  {connectedSet.has(p.name) ? <CheckCircle size={16} weight="fill" /> : <UserPlus size={16} />}
                  {connectedSet.has(p.name) ? "Đã kết nối" : "Kết nối"}
                </button>
                <button
                  onClick={() => setReportProfile(true)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 9999,
                    border: "1px solid rgba(0,0,0,0.20)",
                    background: "#fff",
                    color: "rgba(0,0,0,0.65)",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 14,
                    fontFamily: "inherit",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background = "#F4F2EE"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.background = "#fff"
                  }}
                >
                  Báo cáo
                </button>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 10,
              marginTop: 18,
            }}
          >
            {[
              {
                label: "Tỷ lệ đúng tiến độ",
                value: `${p.onTimeRate}%`,
                color: "#057642",
                bg: "#E5F6E8",
              },
              {
                label: "Tỷ lệ dự án thành công",
                value: `${p.successRate}%`,
                color: "#0A66C2",
                bg: "#EAF1FA",
              },
              {
                label: "Đánh giá trung bình",
                value: `⭐ ${avgRating}/5`,
                color: "#915907",
                bg: "#FFF4D6",
              },
              {
                label: "Độ uy tín",
                value: `${p.creditScore}/100`,
                color: "#6B3FA0",
                bg: "#F3EEFF",
              },
            ].map(({ label, value, color, bg }) => (
              <div
                key={label}
                style={{
                  background: bg,
                  borderRadius: 8,
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color,
                    lineHeight: 1.1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 3,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {reportProfile && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Báo cáo người dùng</p>
            <label style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Lý do báo cáo <span style={{ color: "#C03A2B" }}>*</span></label>
            <textarea value={reportProfileReason} onChange={e => setReportProfileReason(e.target.value)} rows={4} style={{ width: "100%", borderRadius: 8, border: "1px solid #ccc", padding: "10px 12px", fontSize: 14, resize: "vertical", boxSizing: "border-box" }} placeholder="Mô tả lý do..." />
            <div style={{ marginTop: 14 }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Hình ảnh (tùy chọn)</label>
              <input type="file" accept="image/*" onChange={e => setReportProfileImg(e.target.files?.[0]?.name ?? "")} />
              {reportProfileImg && <span style={{ fontSize: 12, color: "#555", marginLeft: 8 }}>{reportProfileImg}</span>}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={() => setReportProfile(false)} style={{ padding: "9px 22px", borderRadius: 9999, border: "1px solid rgba(0,0,0,0.20)", background: "#fff", color: "rgba(0,0,0,0.70)", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Hủy</button>
              <button disabled={!reportProfileReason.trim()} onClick={() => { setReportProfileReason(""); setReportProfileImg(""); setReportProfile(false); }} style={{ padding: "9px 22px", borderRadius: 9999, border: "none", background: reportProfileReason.trim() ? "#0A66C2" : "#b0c4d8", color: "#fff", cursor: reportProfileReason.trim() ? "pointer" : "not-allowed", fontWeight: 600, fontFamily: "inherit" }}>Gửi báo cáo</button>
            </div>
          </div>
        </div>
      )}

      {/* Giới thiệu */}
      <div style={{ ...card, padding: 24 }}>
        {sectionHead("Giới thiệu")}
        <p
          style={{ fontSize: 14, color: "rgba(0,0,0,0.80)", lineHeight: 1.75 }}
        >
          {p.intro}
        </p>
      </div>

      {/* CV */}
      <div style={{ ...card, padding: 24 }}>
        {sectionHead("CV")}
        {isOwnProfile ? (
          <>
            <input
              ref={cvFileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) setCvFileName(f.name)
              }}
            />
            {cvFileName ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  background: "#EAF1FA",
                  borderRadius: 8,
                  border: "1px solid rgba(10,102,194,0.20)",
                }}
              >
                <FileText size={24} color="#0A66C2" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#0A66C2",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cvFileName}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(0,0,0,0.45)",
                      marginTop: 2,
                    }}
                  >
                    CV đã tải lên
                  </div>
                </div>
                <button
                  onClick={() => cvFileRef.current?.click()}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 9999,
                    border: "1px solid #0A66C2",
                    background: "none",
                    color: "#0A66C2",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    flexShrink: 0,
                  }}
                >
                  Thay thế
                </button>
              </div>
            ) : (
              <div
                onClick={() => cvFileRef.current?.click()}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "28px 20px",
                  border: "1.5px dashed rgba(0,0,0,0.18)",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: "#FAFAF8",
                  transition: "border-color 150ms",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor =
                    "#0A66C2"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,0,0,0.18)"
                }}
              >
                <Paperclip size={24} color="rgba(0,0,0,0.35)" />
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.60)",
                  }}
                >
                  Tải lên CV của bạn
                </div>
                <div style={{ fontSize: 12, color: "rgba(0,0,0,0.40)" }}>
                  PDF, DOC, DOCX
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 18px",
              background: "#EAF1FA",
              borderRadius: 8,
              border: "1px solid rgba(10,102,194,0.20)",
            }}
          >
            <FileText size={24} color="#0A66C2" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0A66C2" }}>
                CV_{p.name.replace(/\s+/g, "_")}.pdf
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.45)",
                  marginTop: 2,
                }}
              >
                Nhấn để tải xuống
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Học vấn */}
      <div style={{ ...card, padding: 24 }}>
        {sectionHead("Học vấn")}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {p.education.map(
            (e: { school: string; period: string }, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "#F9F9F7",
                  borderRadius: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "#EAF1FA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <GraduationCap size={20} color="#0A66C2" />
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "rgba(0,0,0,0.90)",
                    }}
                  >
                    {e.school}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(0,0,0,0.50)",
                    flexShrink: 0,
                  }}
                >
                  {e.period}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Bằng cấp */}
      <div style={{ ...card, padding: 24 }}>
        {sectionHead("Bằng cấp")}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {p.certificates.map(
            (c: { name: string; issuer: string; year: string }, i: number) => (
              <div
                key={i}
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 8,
                    background: "#FFF4D6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Certificate size={20} color="#915907" />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "rgba(0,0,0,0.90)",
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(0,0,0,0.55)",
                      marginTop: 2,
                    }}
                  >
                    {c.issuer} · {c.year}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Đánh giá */}
      <div style={{ ...card, padding: 24 }}>
        {sectionHead("Đánh giá")}
        {/* Summary */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 20,
            padding: 16,
            background: "#F9F9F7",
            borderRadius: 8,
          }}
        >
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
                lineHeight: 1,
              }}
            >
              {avgRating}
            </div>
            <StarRating rating={Math.round(avgRating)} size={18} />
            <div
              style={{ fontSize: 12, color: "rgba(0,0,0,0.50)", marginTop: 4 }}
            >
              {p.reviews.length} đánh giá
            </div>
          </div>
          <div
            style={{
              width: 1,
              background: "rgba(0,0,0,0.08)",
              alignSelf: "stretch",
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[5, 4, 3, 2, 1].map((star) => {
              const count = p.reviews.filter((r) => r.rating === star).length
              const pct =
                p.reviews.length > 0
                  ? Math.round((count / p.reviews.length) * 100)
                  : 0
              return (
                <button
                  key={star}
                  onClick={() =>
                    setStarFilter(starFilter === star ? null : star)
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px 0",
                    borderRadius: 4,
                    outline: starFilter === star ? "2px solid #0A66C2" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(0,0,0,0.55)",
                      minWidth: 14,
                      textAlign: "right",
                    }}
                  >
                    {star}★
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 7,
                      background: "#E5E7EB",
                      borderRadius: 9999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "#F5A623",
                        borderRadius: 9999,
                        transition: "width 300ms",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(0,0,0,0.45)",
                      minWidth: 20,
                      textAlign: "left",
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        {starFilter && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
              Đang lọc: {starFilter} sao · {filteredReviews.length} đánh giá
            </span>
            <button
              onClick={() => setStarFilter(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                color: "#0A66C2",
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
        {/* Reviews */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              style={{
                padding: 16,
                background: "#FAFAF8",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <Avatar name={r.reviewer} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "rgba(0,0,0,0.90)",
                    }}
                  >
                    {r.reviewer}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(0,0,0,0.45)",
                      marginBottom: 4,
                    }}
                  >
                    {nameToGmail(r.reviewer)}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <StarRating rating={r.rating} />
                    <span style={{ fontSize: 12, color: "rgba(0,0,0,0.50)" }}>
                      · {r.project}
                    </span>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(0,0,0,0.75)",
                  lineHeight: 1.65,
                  marginBottom: 10,
                }}
              >
                {r.comment}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                {r.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "#EAF1FA",
                      color: "#0A66C2",
                      borderRadius: 4,
                      padding: "3px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  fontSize: 12,
                  color: "rgba(0,0,0,0.50)",
                }}
              >
                <span>💰 {r.price}</span>
                <span>⏱ {r.time}</span>
              </div>
            </div>
          ))}
          {filteredReviews.length === 0 && (
            <p
              style={{
                fontSize: 13,
                color: "rgba(0,0,0,0.40)",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              Không có đánh giá nào cho mức {starFilter} sao.
            </p>
          )}
        </div>
      </div>

      {/* Dự án đã tham gia */}
      <div style={{ ...card, padding: 24 }}>
        {sectionHead("Danh sách các dự án đã tham gia")}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {p.projects.map(
            (proj: {
              id: number
              owner: string
              name: string
              detail: string
              rating: number
            }) => (
              <div
                key={proj.id}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: 16,
                  background: "#FAFAF8",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: "#EAF1FA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 17,
                    fontWeight: 800,
                    color: "#0A66C2",
                  }}
                >
                  {proj.owner
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "rgba(0,0,0,0.90)",
                      marginBottom: 4,
                    }}
                  >
                    {proj.name}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(0,0,0,0.65)",
                      lineHeight: 1.6,
                      marginBottom: 8,
                    }}
                  >
                    {proj.detail}
                  </p>
                  <StarRating rating={proj.rating} size={14} />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100%" }}>
      <div
        style={{
          maxWidth: isOwnProfile ? 760 : 1128,
          margin: "0 auto",
          padding: "24px 16px 48px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(0,0,0,0.60)",
            fontFamily: "inherit",
            marginBottom: 16,
            padding: "4px 0",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#0A66C2")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")
          }
        >
          <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Quay
          lại
        </button>

        {isOwnProfile ? (
          <MainContent />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: 20,
              alignItems: "start",
            }}
          >
            <MainContent />
            <div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.90)",
                    marginBottom: 14,
                  }}
                >
                  Danh sách các connection có thể biết
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {MY_PROFILE_SUGGESTIONS.map((s) => (
                    <div
                      key={s.name}
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Avatar name={s.name} size={44} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 13,
                            color: "rgba(0,0,0,0.90)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {s.name}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(0,0,0,0.50)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {s.gmail}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setConnectedSet((prev) => {
                            const next = new Set(prev)
                            next.has(s.name)
                              ? next.delete(s.name)
                              : next.add(s.name)
                            return next
                          })
                        }
                        style={{
                          borderRadius: 9999,
                          flexShrink: 0,
                          border: `1px solid ${connectedSet.has(s.name) ? "#057642" : "#0A66C2"}`,
                          background: connectedSet.has(s.name) ? "#E5F6E8" : "none",
                          color: connectedSet.has(s.name)
                            ? "#057642"
                            : "#0A66C2",
                          padding: "4px 12px",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          transition: "all 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!connectedSet.has(s.name))
                            (e.currentTarget as HTMLElement).style.background = "#EAF1FA"
                        }}
                        onMouseLeave={(e) => {
                          if (!connectedSet.has(s.name))
                            (e.currentTarget as HTMLElement).style.background = "none"
                        }}
                      >
                        {connectedSet.has(s.name) ? (
                          <>
                            <CheckCircle size={13} weight="fill" />
                            Đã kết nối
                          </>
                        ) : (
                          <>
                            <UserPlus size={13} />
                            Kết nối
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Auth Components ─────────────────────────────────────────────────────────

const INTEREST_OPTIONS = [
  { key: "ai", label: "Trí tuệ nhân tạo", Icon: Robot },
  { key: "frontend", label: "Lập trình Frontend", Icon: Code },
  { key: "backend", label: "Lập trình Backend", Icon: Cpu },
  { key: "data", label: "Phân tích dữ liệu", Icon: ChartLine },
  { key: "design", label: "UI/UX Design", Icon: PaintBrush },
  { key: "security", label: "An ninh mạng", Icon: ShieldCheck },
  { key: "marketing", label: "Digital Marketing", Icon: Megaphone },
  { key: "finance", label: "Tài chính & Đầu tư", Icon: Wallet },
  { key: "ecommerce", label: "Thương mại điện tử", Icon: Storefront },
  { key: "language", label: "Ngoại ngữ & Dịch thuật", Icon: Translate },
  { key: "career", label: "Phát triển sự nghiệp", Icon: Sparkle },
  { key: "global", label: "Hợp tác quốc tế", Icon: GlobeIcon },
]

const PROFESSION_OPTIONS = [
  "Sinh viên",
  "Kỹ sư phần mềm",
  "Product Designer / UI/UX",
  "Data Scientist / Analyst",
  "Product Manager",
  "Marketing Specialist",
  "Backend Developer",
  "Frontend Developer",
  "DevOps / Cloud Engineer",
  "Nhà nghiên cứu",
  "Doanh nhân / Startup",
  "Freelancer",
  "Khác",
]

const SCHOOL_OPTIONS = [
  "Đại học Bách Khoa Hà Nội (HUST)",
  "Đại học Quốc gia Hà Nội (VNU)",
  "Đại học Quốc gia TP.HCM (VNUHCM)",
  "Đại học FPT",
  "Đại học Kinh tế Quốc dân (NEU)",
  "Đại học Ngoại thương",
  "Đại học Bách Khoa TP.HCM",
  "Đại học Công nghệ TP.HCM (HUTECH)",
  "Học viện Công nghệ Bưu chính Viễn thông",
  "Đại học Tôn Đức Thắng",
  "Đại học RMIT Việt Nam",
  "Trường khác",
]

function GoogleButton({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 9999,
        border: "1px solid rgba(0,0,0,0.20)",
        background: hov ? "#F5F5F5" : "#fff",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 15,
        fontWeight: 600,
        color: "rgba(0,0,0,0.80)",
        transition: "background 150ms",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Google "G" SVG */}
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
      {label}
    </button>
  )
}

function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)
  const isPassword = type === "password"
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(0,0,0,0.65)",
          display: "block",
          marginBottom: 5,
        }}
      >
        {label}
        {required && <span style={{ color: "#C03A2B", marginLeft: 2 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: isPassword ? "9px 36px 9px 12px" : "9px 12px",
            border: `1.5px solid ${focused ? "#0A66C2" : "rgba(0,0,0,0.18)"}`,
            borderRadius: 6,
            fontSize: 14,
            fontFamily: "inherit",
            outline: "none",
            color: "rgba(0,0,0,0.90)",
            background: "#fff",
            boxSizing: "border-box",
            transition: "border-color 150ms",
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(0,0,0,0.40)",
              padding: 2,
              display: "flex",
            }}
          >
            {show ? <EyeSlash size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  )
}

function AuthCard({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 20px rgba(0,0,0,0.10)",
        padding: "36px 40px",
        width: "100%",
        maxWidth: 440,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function OccupifyLogo({ size = 32 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: "#0A66C2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BriefcaseMetal size={size * 0.6} color="#fff" weight="fill" />
      </div>
      <span
        style={{
          fontSize: size * 0.75,
          fontWeight: 800,
          color: "#0A66C2",
          letterSpacing: "-0.5px",
        }}
      >
        Occupify
      </span>
    </div>
  )
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F2EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <OccupifyLogo size={36} />
      </div>
      {children}
      <p
        style={{
          marginTop: 24,
          fontSize: 12,
          color: "rgba(0,0,0,0.40)",
          textAlign: "center",
          maxWidth: 380,
        }}
      >
        Bằng cách tiếp tục, bạn đồng ý với{" "}
        <span style={{ color: "#0A66C2", cursor: "pointer" }}>
          Điều khoản dịch vụ
        </span>{" "}
        và{" "}
        <span style={{ color: "#0A66C2", cursor: "pointer" }}>
          Chính sách quyền riêng tư
        </span>{" "}
        của Occupify.
      </p>
    </div>
  )
}

// Landing Page
function LandingPage({
  onLogin,
  onSignUp,
  onGoogle,
  onAdmin,
}: {
  onLogin: () => void
  onSignUp: () => void
  onGoogle: () => void
  onAdmin: () => void
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#F4F2EE", display: "flex" }}>
      {/* Left — brand panel */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(145deg, #0A66C2 0%, #084FA0 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 64px",
          minHeight: "100vh",
        }}
      >
        <OccupifyLogo size={40} />
        <div style={{ marginTop: "auto", paddingBottom: 8 }}>
          <p
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.25,
              maxWidth: 420,
            }}
          >
            Mạng lưới chuyên nghiệp dành cho người Việt
          </p>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.72)",
              marginTop: 14,
              maxWidth: 380,
              lineHeight: 1.6,
            }}
          >
            Kết nối, hợp tác và phát triển sự nghiệp cùng cộng đồng chuyên gia
            hàng đầu Việt Nam.
          </p>
        </div>
        {/* Feature highlights */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 40,
          }}
        >
          {[
            { Icon: UsersThree, text: "Kết nối với hơn 500.000 chuyên gia" },
            {
              Icon: BriefcaseMetal,
              text: "Tìm việc & hợp đồng freelance phù hợp",
            },
            { Icon: Lightbulb, text: "Chia sẻ ý tưởng và phát triển bản thân" },
          ].map(({ Icon, text }) => (
            <div
              key={text}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color="#fff" weight="fill" />
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 500,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — auth options */}
      <div
        style={{
          width: 480,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 48px",
          background: "#fff",
        }}
      >
        <div style={{ width: "100%", maxWidth: 360 }}>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "rgba(0,0,0,0.90)",
              marginBottom: 6,
            }}
          >
            Chào mừng trở lại
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(0,0,0,0.55)",
              marginBottom: 32,
            }}
          >
            Đăng nhập hoặc tạo tài khoản mới để bắt đầu.
          </p>

          <button
            onClick={onLogin}
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: 9999,
              border: "none",
              background: "#0A66C2",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              marginBottom: 12,
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#084FA0"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#0A66C2"
            }}
          >
            Đăng nhập
          </button>

          <button
            onClick={onSignUp}
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: 9999,
              border: "1.5px solid #0A66C2",
              background: "none",
              color: "#0A66C2",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              marginBottom: 24,
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#EAF1FA"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "none"
            }}
          >
            Đăng ký
          </button>


          <p
            style={{
              marginTop: 32,
              fontSize: 12,
              color: "rgba(0,0,0,0.40)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Bằng cách tiếp tục, bạn đồng ý với{" "}
            <span style={{ color: "#0A66C2", cursor: "pointer" }}>
              Điều khoản dịch vụ
            </span>{" "}
            và{" "}
            <span style={{ color: "#0A66C2", cursor: "pointer" }}>
              Chính sách quyền riêng tư
            </span>{" "}
            của Occupify.
          </p>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <button
              onClick={onAdmin}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                color: "rgba(0,0,0,0.35)",
                fontFamily: "inherit",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                ; (e.currentTarget as HTMLElement).style.color = "#0A66C2"
              }}
              onMouseLeave={(e) => {
                ; (e.currentTarget as HTMLElement).style.color =
                  "rgba(0,0,0,0.35)"
              }}
            >
              Truy cập Admin Portal →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Login Page
function LoginPage({
  onBack,
  onSuccess,
  onGoogle,
  onSignUp,
}: {
  onBack: () => void
  onSuccess: () => void
  onGoogle: () => void
  onSignUp?: () => void
}) {
  const [username, setUsername] = useState("nguyeminhkhoa@gmail.com")
  const [password, setPassword] = useState("123456")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    onSuccess()
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F2EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        position: "relative",
      }}
    >
      {/* Back button — absolute top-left, outside card */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 600,
          color: "rgba(0,0,0,0.60)",
          fontFamily: "inherit",
          padding: "4px 0",
        }}
        onMouseEnter={(e) => {
          ; (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.90)"
        }}
        onMouseLeave={(e) => {
          ; (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)"
        }}
      >
        <ArrowLeft size={14} weight="bold" /> Quay lại
      </button>

      {/* Logo centered above card */}
      <div style={{ marginBottom: 28 }}>
        <OccupifyLogo size={36} />
      </div>

      {/* Main card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
          padding: "32px",
          width: "100%",
          maxWidth: 448,
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(0,0,0,0.90)",
            marginBottom: 4,
          }}
        >
          Đăng nhập
        </h2>
        <p
          style={{ fontSize: 14, color: "rgba(0,0,0,0.60)", marginBottom: 24 }}
        >
          Chào mừng bạn trở lại Occupify!
        </p>

        <form onSubmit={handleSubmit}>
          <AuthInput
            label="Tên đăng nhập"
            value={username}
            onChange={setUsername}
            placeholder="Nhập tên đăng nhập"
            required
          />
          <AuthInput
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Nhập mật khẩu"
            required
          />

          {/* Remember me + Forgot password row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
              marginBottom: 24,
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                fontSize: 13,
                color: "rgba(0,0,0,0.90)",
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  accentColor: "#0A66C2",
                  width: 14,
                  height: 14,
                  cursor: "pointer",
                }}
              />
              Ghi nhớ đăng nhập
            </label>
            <button
              type="button"
              onClick={() => { }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: "#0A66C2",
                fontFamily: "inherit",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                ; (e.currentTarget as HTMLElement).style.textDecoration =
                  "underline"
              }}
              onMouseLeave={(e) => {
                ; (e.currentTarget as HTMLElement).style.textDecoration = "none"
              }}
            >
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: 9999,
              border: "none",
              background: "#0A66C2",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              marginBottom: 24,
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#084FA0"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.background = "#0A66C2"
            }}
          >
            Đăng nhập
          </button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.12)" }} />
          <span style={{ fontSize: 12, color: "rgba(0,0,0,0.60)" }}>hoặc</span>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.12)" }} />
        </div>

        <GoogleButton onClick={onGoogle} label="Tiếp tục với Google" />

        {/* Sign-up link */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(0,0,0,0.60)",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Chưa có tài khoản?{" "}
          <button
            onClick={onSignUp}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#0A66C2",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLElement).style.textDecoration =
                "underline"
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLElement).style.textDecoration = "none"
            }}
          >
            Đăng ký ngay
          </button>
        </p>
      </div>

      {/* Legal text — outside card, on beige */}
      <p
        style={{
          marginTop: 24,
          fontSize: 12,
          color: "rgba(0,0,0,0.60)",
          textAlign: "center",
          maxWidth: 384,
        }}
      >
        Bằng cách tiếp tục, bạn đồng ý với{" "}
        <span style={{ color: "#0A66C2", cursor: "pointer" }}>
          Điều khoản dịch vụ
        </span>{" "}
        và{" "}
        <span style={{ color: "#0A66C2", cursor: "pointer" }}>
          Chính sách quyền riêng tư
        </span>{" "}
        của Occupify.
      </p>
    </div>
  )
}

// Sign-up steps progress indicator
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 28,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 4,
            flex: 1,
            borderRadius: 9999,
            background:
              i < current
                ? "#0A66C2"
                : i === current
                  ? "#0A66C2"
                  : "rgba(0,0,0,0.12)",
            opacity: i === current ? 1 : i < current ? 0.85 : 1,
            transition: "background 300ms",
          }}
        />
      ))}
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "rgba(0,0,0,0.40)",
          whiteSpace: "nowrap",
          marginLeft: 4,
        }}
      >
        {current + 1}/{total}
      </span>
    </div>
  )
}

// Sign Up Flow
function SignUpFlow({
  onBack,
  onSuccess,
  onGoogle,
}: {
  onBack: () => void
  onSuccess: () => void
  onGoogle: () => void
}) {
  const [step, setStep] = useState(0)
  // Step 0: credentials
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pwError, setPwError] = useState("")
  // Step 1: OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpError, setOtpError] = useState("")
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  // Step 2: school
  const [school, setSchool] = useState("")
  const [schoolSearch, setSchoolSearch] = useState("")
  // Step 3: interests
  const [interests, setInterests] = useState<string[]>([])
  // Step 4: profession
  const [profession, setProfession] = useState("")

  const TOTAL_STEPS = 6

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[idx] = val
    setOtp(next)
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus()
  }

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0)
      otpRefs.current[idx - 1]?.focus()
  }

  const filteredSchools = SCHOOL_OPTIONS.filter((s) =>
    s.toLowerCase().includes(schoolSearch.toLowerCase()),
  )

  const primaryBtn = (
    label: string,
    onClick: () => void,
    disabled?: boolean,
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "11px 20px",
        borderRadius: 9999,
        border: "none",
        background: disabled ? "rgba(0,0,0,0.12)" : "#0A66C2",
        color: disabled ? "rgba(0,0,0,0.35)" : "#fff",
        fontSize: 15,
        fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "inherit",
        transition: "background 150ms",
        marginTop: 8,
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.background = "#084FA0"
      }}
      onMouseLeave={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.background = "#0A66C2"
      }}
    >
      {label}
    </button>
  )

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid rgba(0,0,0,0.18)",
    borderRadius: 6,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    color: "rgba(0,0,0,0.90)",
    boxSizing: "border-box",
    transition: "border-color 150ms",
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F2EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        position: "relative",
      }}
    >
      {/* Back button — absolute top-left, outside card */}
      <button
        onClick={step === 0 ? onBack : () => setStep((s) => s - 1)}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 600,
          color: "rgba(0,0,0,0.60)",
          fontFamily: "inherit",
          padding: "4px 0",
        }}
        onMouseEnter={(e) => {
          ; (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.90)"
        }}
        onMouseLeave={(e) => {
          ; (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)"
        }}
      >
        <ArrowLeft size={14} weight="bold" />{" "}
        {step === 0 ? "Quay lại" : "Bước trước"}
      </button>

      {/* Logo centered above card */}
      <div style={{ marginBottom: 28 }}>
        <OccupifyLogo size={36} />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
          padding: "32px",
          width: "100%",
          maxWidth: 448,
        }}
      >
        <StepIndicator current={step} total={TOTAL_STEPS} />

        {/* Step 0: Credentials */}
        {step === 0 && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 4,
              }}
            >
              Tạo tài khoản
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.55)",
                marginBottom: 22,
              }}
            >
              Điền thông tin để bắt đầu hành trình của bạn.
            </p>
            <AuthInput
              label="Tên đăng nhập"
              value={username}
              onChange={setUsername}
              placeholder="Nhập tên đăng nhập"
              required
            />
            <AuthInput
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Nhập địa chỉ email"
              required
            />
            <AuthInput
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Tối thiểu 8 ký tự"
              required
            />
            <AuthInput
              label="Xác nhận mật khẩu"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Nhập lại mật khẩu"
              required
            />
            {pwError && (
              <p style={{ fontSize: 13, color: "#C03A2B", marginBottom: 10 }}>
                {pwError}
              </p>
            )}
            {primaryBtn(
              "Tiếp tục",
              () => {
                if (
                  !username.trim() ||
                  !email.trim() ||
                  !password.trim() ||
                  !confirmPassword.trim()
                ) {
                  setPwError("Vui lòng điền đầy đủ thông tin.")
                  return
                }
                if (password !== confirmPassword) {
                  setPwError("Mật khẩu không khớp.")
                  return
                }
                if (password.length < 8) {
                  setPwError("Mật khẩu phải có ít nhất 8 ký tự.")
                  return
                }
                setPwError("")
                setStep(1)
              },
              !(
                username.trim() &&
                email.trim() &&
                password.trim() &&
                confirmPassword.trim()
              ),
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "20px 0",
              }}
            >
              <div
                style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.12)" }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.40)",
                  fontWeight: 600,
                }}
              >
                hoặc
              </span>
              <div
                style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.12)" }}
              />
            </div>
            <GoogleButton onClick={onGoogle} label="Đăng ký với Google" />
          </>
        )}

        {/* Step 1: OTP */}
        {step === 1 && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 4,
              }}
            >
              Xác thực OTP
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.55)",
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              Chúng tôi đã gửi mã 6 chữ số đến email của bạn. Vui lòng nhập mã
              để xác thực.
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpRefs.current[idx] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  style={{
                    width: 46,
                    height: 54,
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: 700,
                    border: `2px solid ${digit ? "#0A66C2" : "rgba(0,0,0,0.18)"
                      }`,
                    borderRadius: 8,
                    outline: "none",
                    fontFamily: "inherit",
                    color: "rgba(0,0,0,0.90)",
                    transition: "border-color 150ms",
                  }}
                  onFocus={(e) => {
                    ; (e.currentTarget as HTMLElement).style.borderColor =
                      "#0A66C2"
                  }}
                  onBlur={(e) => {
                    if (!digit)
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(0,0,0,0.18)"
                  }}
                />
              ))}
            </div>
            {otpError && (
              <p
                style={{
                  fontSize: 13,
                  color: "#C03A2B",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {otpError}
              </p>
            )}
            <p
              style={{
                fontSize: 13,
                color: "rgba(0,0,0,0.50)",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Không nhận được mã?{" "}
              <span
                style={{ color: "#0A66C2", cursor: "pointer", fontWeight: 600 }}
                onClick={() => setOtp(["", "", "", "", "", ""])}
              >
                Gửi lại
              </span>
            </p>
            {primaryBtn(
              "Xác thực",
              () => {
                const code = otp.join("")
                if (code.length < 6) {
                  setOtpError("Vui lòng nhập đủ 6 chữ số.")
                  return
                }
                // Accept any 6-digit code as valid
                setOtpError("")
                setStep(2)
              },
              otp.join("").length < 6,
            )}
          </>
        )}

        {/* Step 2: School */}
        {step === 2 && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 4,
              }}
            >
              Trường học hiện tại
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.55)",
                marginBottom: 22,
              }}
            >
              Chọn hoặc nhập tên trường đại học / trường bạn đang theo học.
            </p>
            <div style={{ marginBottom: 12 }}>
              <input
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                placeholder="Tìm kiếm trường..."
                style={{ ...inputStyle, marginBottom: 8 }}
                onFocus={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor =
                    "#0A66C2"
                }}
                onBlur={(e) => {
                  ; (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,0,0,0.18)"
                }}
              />
              <div
                style={{
                  maxHeight: 220,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {filteredSchools.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSchool(s)
                      setSchoolSearch(s)
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: `1.5px solid ${school === s ? "#0A66C2" : "rgba(0,0,0,0.10)"
                        }`,
                      background: school === s ? "#EAF1FA" : "#FAFAF8",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: 14,
                      color: school === s ? "#0A66C2" : "rgba(0,0,0,0.80)",
                      fontFamily: "inherit",
                      fontWeight: school === s ? 700 : 400,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 150ms",
                    }}
                  >
                    {s}
                    {school === s && (
                      <CheckFat size={15} color="#0A66C2" weight="fill" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
                gap: 12,
              }}
            >
              <button
                onClick={() => setStep(3)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "rgba(0,0,0,0.55)",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  padding: "10px 0",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.90)"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.55)"
                }}
              >
                Bỏ qua
              </button>
              <div style={{ flex: 1 }}>
                {primaryBtn("Tiếp tục", () => setStep(3), !school)}
              </div>
            </div>
          </>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 4,
              }}
            >
              Sở thích của bạn
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.55)",
                marginBottom: 22,
              }}
            >
              Chọn các lĩnh vực bạn quan tâm để Occupify gợi ý nội dung phù hợp.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 16,
              }}
            >
              {INTEREST_OPTIONS.map(({ key, label, Icon }) => {
                const active = interests.includes(key)
                return (
                  <button
                    key={key}
                    onClick={() =>
                      setInterests((prev) =>
                        active ? prev.filter((k) => k !== key) : [...prev, key],
                      )
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 14px",
                      borderRadius: 9999,
                      border: `1.5px solid ${active ? "#0A66C2" : "rgba(0,0,0,0.15)"
                        }`,
                      background: active ? "#EAF1FA" : "#fff",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 13,
                      fontWeight: active ? 700 : 500,
                      color: active ? "#0A66C2" : "rgba(0,0,0,0.75)",
                      transition: "all 150ms",
                    }}
                  >
                    <Icon size={14} weight={active ? "fill" : "regular"} />
                    {label}
                  </button>
                )
              })}
            </div>
            <p
              style={{
                fontSize: 12,
                color: "rgba(0,0,0,0.40)",
                marginBottom: 4,
              }}
            >
              Đã chọn: {interests.length} lĩnh vực
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
                gap: 12,
              }}
            >
              <button
                onClick={() => setStep(4)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "rgba(0,0,0,0.55)",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  padding: "10px 0",
                }}
                onMouseEnter={(e) => {
                  ; (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.90)"
                }}
                onMouseLeave={(e) => {
                  ; (e.currentTarget as HTMLElement).style.color =
                    "rgba(0,0,0,0.55)"
                }}
              >
                Bỏ qua
              </button>
              <div style={{ flex: 1 }}>
                {primaryBtn(
                  "Tiếp tục",
                  () => setStep(4),
                  interests.length === 0,
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 4: Profession */}
        {step === 4 && (
          <>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 4,
              }}
            >
              Ngành nghề hiện tại
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.55)",
                marginBottom: 22,
              }}
            >
              Chọn ngành nghề hoặc lĩnh vực bạn đang làm việc / học tập.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                maxHeight: 300,
                overflowY: "auto",
                marginBottom: 12,
              }}
            >
              {PROFESSION_OPTIONS.map((p) => (
                <button
                  key={p}
                  onClick={() => setProfession(p)}
                  style={{
                    padding: "11px 14px",
                    borderRadius: 8,
                    border: `1.5px solid ${profession === p ? "#0A66C2" : "rgba(0,0,0,0.10)"
                      }`,
                    background: profession === p ? "#EAF1FA" : "#FAFAF8",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: 14,
                    color: profession === p ? "#0A66C2" : "rgba(0,0,0,0.80)",
                    fontFamily: "inherit",
                    fontWeight: profession === p ? 700 : 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 150ms",
                  }}
                >
                  {p}
                  {profession === p && (
                    <CheckFat size={15} color="#0A66C2" weight="fill" />
                  )}
                </button>
              ))}
            </div>
            {primaryBtn("Tiếp tục", () => setStep(5), !profession)}
          </>
        )}

        {/* Step 5: Complete */}
        {step === 5 && (
          <>
            <div style={{ textAlign: "center", paddingTop: 8 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "#EAF1FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <CheckFat size={36} color="#0A66C2" weight="fill" />
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "rgba(0,0,0,0.90)",
                  marginBottom: 10,
                }}
              >
                Hoàn thành!
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.55)",
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                Tài khoản của bạn đã được tạo thành công. Chào mừng bạn đến với
                Occupify — nơi kết nối và phát triển sự nghiệp chuyên nghiệp.
              </p>
              <div
                style={{
                  background: "#F4F2EE",
                  borderRadius: 10,
                  padding: "16px 20px",
                  textAlign: "left",
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.45)",
                    marginBottom: 10,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Thông tin của bạn
                </div>
                {[
                  { label: "Tên đăng nhập", value: username },
                  { label: "Trường", value: school },
                  { label: "Ngành nghề", value: profession },
                  { label: "Sở thích", value: `${interests.length} lĩnh vực` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "rgba(0,0,0,0.50)" }}>{label}</span>
                    <span
                      style={{ fontWeight: 600, color: "rgba(0,0,0,0.80)" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              {primaryBtn("Vào Occupify", onSuccess)}
            </div>
          </>
        )}
      </div>

      {/* Legal text */}
      <p
        style={{
          marginTop: 24,
          fontSize: 12,
          color: "rgba(0,0,0,0.60)",
          textAlign: "center",
          maxWidth: 384,
        }}
      >
        Bằng cách tiếp tục, bạn đồng ý với{" "}
        <span style={{ color: "#0A66C2", cursor: "pointer" }}>
          Điều khoản dịch vụ
        </span>{" "}
        và{" "}
        <span style={{ color: "#0A66C2", cursor: "pointer" }}>
          Chính sách quyền riêng tư
        </span>{" "}
        của Occupify.
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FINANCIAL HISTORY & CASHFLOW PAGE
// ═══════════════════════════════════════════════════════════════════════════════

interface FinancialTransaction {
  id: string
  contractCode: string
  contractName: string
  category: string
  type: "in" | "out"
  amount: number
  date: string
  timestamp: string
}

const INITIAL_FINANCIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: "tx-1",
    contractCode: "#HD-9821",
    contractName: "Thiết kế UI App FinTech cho Ngân hàng Số",
    category: "Product Design",
    type: "in",
    amount: 12000000,
    date: "2026-09-18",
    timestamp: "14:30 - 18/09/2026",
  },
  {
    id: "tx-2",
    contractCode: "#HD-9815",
    contractName: "Thuê Senior Backend Golang (Module Thanh toán)",
    category: "Software Development",
    type: "out",
    amount: 8500000,
    date: "2026-09-17",
    timestamp: "09:15 - 17/09/2026",
  },
  {
    id: "tx-3",
    contractCode: "#HD-9784",
    contractName: "Phát triển Landing Page Marketing Sự kiện Tech Summit",
    category: "Frontend Web",
    type: "in",
    amount: 6800000,
    date: "2026-09-15",
    timestamp: "16:45 - 15/09/2026",
  },
  {
    id: "tx-4",
    contractCode: "#HD-9762",
    contractName: "Phí dịch vụ nền tảng & Bảo lãnh hợp đồng Quý 3",
    category: "Hạ tầng & Nền tảng",
    type: "out",
    amount: 2000000,
    date: "2026-09-12",
    timestamp: "11:00 - 12/09/2026",
  },
  {
    id: "tx-5",
    contractCode: "#HD-9740",
    contractName: "Audit An ninh mạng & Smart Contract NFT Platform",
    category: "Blockchain & Security",
    type: "in",
    amount: 15500000,
    date: "2026-09-08",
    timestamp: "10:20 - 08/09/2026",
  },
  {
    id: "tx-6",
    contractCode: "#HD-9711",
    contractName: "Tối ưu hóa Database PostgreSQL & DevOps Pipeline",
    category: "Cloud & DevOps",
    type: "in",
    amount: 10900000,
    date: "2026-09-05",
    timestamp: "15:30 - 05/09/2026",
  },
  {
    id: "tx-7",
    contractCode: "#HD-9689",
    contractName: "Mua License Figma Enterprise & Asset 3D Team",
    category: "Chi phí công cụ",
    type: "out",
    amount: 4200000,
    date: "2026-09-01",
    timestamp: "08:45 - 01/09/2026",
  },
  {
    id: "tx-8",
    contractCode: "#HD-9650",
    contractName: "Thiết kế Design System Đa nền tảng cho SaaS",
    category: "Product Design",
    type: "in",
    amount: 8200000,
    date: "2026-08-28",
    timestamp: "17:10 - 28/08/2026",
  },
  {
    id: "tx-9",
    contractCode: "#HD-9622",
    contractName: "Thuê Freelance QA / Manual Tester Kiểm thử UAT",
    category: "Kiểm thử phần mềm",
    type: "out",
    amount: 3800000,
    date: "2026-08-25",
    timestamp: "13:00 - 25/08/2026",
  },
  {
    id: "tx-10",
    contractCode: "#HD-9590",
    contractName: "Tư vấn Kiến trúc Microservices & High-load Cache",
    category: "System Design",
    type: "in",
    amount: 9500000,
    date: "2026-08-20",
    timestamp: "10:00 - 20/08/2026",
  },
]

const CASHFLOW_CHART_MONTHS = [
  { month: "Tháng 4", inVal: 24.5, outVal: 12.0, formattedIn: "+24.500.000 ₫", formattedOut: "-12.000.000 ₫", net: "+12.500.000 ₫" },
  { month: "Tháng 5", inVal: 29.0, outVal: 15.4, formattedIn: "+29.000.000 ₫", formattedOut: "-15.400.000 ₫", net: "+13.600.000 ₫" },
  { month: "Tháng 6", inVal: 34.2, outVal: 11.8, formattedIn: "+34.200.000 ₫", formattedOut: "-11.800.000 ₫", net: "+22.400.000 ₫" },
  { month: "Tháng 7", inVal: 31.0, outVal: 16.5, formattedIn: "+31.000.000 ₫", formattedOut: "-16.500.000 ₫", net: "+14.500.000 ₫" },
  { month: "Tháng 8", inVal: 39.8, outVal: 14.2, formattedIn: "+39.800.000 ₫", formattedOut: "-14.200.000 ₫", net: "+25.600.000 ₫" },
  { month: "Tháng 9", inVal: 45.2, outVal: 18.5, formattedIn: "+45.200.000 ₫", formattedOut: "-18.500.000 ₫", net: "+26.700.000 ₫" },
]

function CashflowLineChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(5)
  const chartW = 760
  const chartH = 220
  const padLeft = 60
  const padRight = 40
  const padTop = 20
  const padBottom = 35
  const plotW = chartW - padLeft - padRight
  const plotH = chartH - padTop - padBottom
  const maxY = 50

  const pointsIn = CASHFLOW_CHART_MONTHS.map((d, i) => {
    const x = padLeft + (i / (CASHFLOW_CHART_MONTHS.length - 1)) * plotW
    const y = padTop + plotH - (d.inVal / maxY) * plotH
    return { x, y }
  })

  const pointsOut = CASHFLOW_CHART_MONTHS.map((d, i) => {
    const x = padLeft + (i / (CASHFLOW_CHART_MONTHS.length - 1)) * plotW
    const y = padTop + plotH - (d.outVal / maxY) * plotH
    return { x, y }
  })

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return ""
    let path = `M ${pts[0].x},${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i]
      const p1 = pts[i + 1]
      const cp1x = p0.x + (p1.x - p0.x) / 2
      const cp1y = p0.y
      const cp2x = p0.x + (p1.x - p0.x) / 2
      const cp2y = p1.y
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`
    }
    return path
  }

  const pathIn = createSmoothPath(pointsIn)
  const pathOut = createSmoothPath(pointsOut)
  const areaIn = `${pathIn} L ${pointsIn[pointsIn.length - 1].x},${padTop + plotH} L ${pointsIn[0].x},${padTop + plotH} Z`
  const areaOut = `${pathOut} L ${pointsOut[pointsOut.length - 1].x},${padTop + plotH} L ${pointsOut[0].x},${padTop + plotH} Z`

  const activeData = hoveredIndex !== null ? CASHFLOW_CHART_MONTHS[hoveredIndex] : null
  const activePtIn = hoveredIndex !== null ? pointsIn[hoveredIndex] : null
  const activePtOut = hoveredIndex !== null ? pointsOut[hoveredIndex] : null

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: 24,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "rgba(0,0,0,0.90)",
              marginBottom: 4,
            }}
          >
            Biến động thu chi
          </h3>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
            Biểu đồ trực quan so sánh dòng tiền vào và ra trong 6 tháng gần nhất
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#137333",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.80)" }}>
              Tiền vào
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#C03A2B",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.80)" }}>
              Tiền ra
            </span>
          </div>
        </div>
      </div>

      {/* SVG chart container */}
      <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          style={{ width: "100%", height: "auto", display: "block", minWidth: 600 }}
        >
          <defs>
            <linearGradient id="cfInGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#137333" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#137333" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="cfOutGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C03A2B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#C03A2B" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {[0, 10, 20, 30, 40, 50].map((val) => {
            const y = padTop + plotH - (val / maxY) * plotH
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={chartW - padRight}
                  y2={y}
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="rgba(0,0,0,0.45)"
                  fontSize="11"
                  fontFamily="'Source Sans 3', sans-serif"
                >
                  {val === 0 ? "0 ₫" : `${val} tr`}
                </text>
              </g>
            )
          })}

          {/* Area fills */}
          <path d={areaIn} fill="url(#cfInGrad)" />
          <path d={areaOut} fill="url(#cfOutGrad)" />

          {/* Lines */}
          <path
            d={pathIn}
            fill="none"
            stroke="#137333"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathOut}
            fill="none"
            stroke="#C03A2B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertical guideline & dots for hovered point */}
          {activePtIn && activePtOut && hoveredIndex !== null && (
            <g>
              <line
                x1={activePtIn.x}
                y1={padTop}
                x2={activePtIn.x}
                y2={padTop + plotH}
                stroke="rgba(0,0,0,0.18)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <circle
                cx={activePtIn.x}
                cy={activePtIn.y}
                r="6"
                fill="#137333"
                stroke="#fff"
                strokeWidth="2.5"
              />
              <circle
                cx={activePtOut.x}
                cy={activePtOut.y}
                r="6"
                fill="#C03A2B"
                stroke="#fff"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* X-axis labels and hover hit areas */}
          {CASHFLOW_CHART_MONTHS.map((d, i) => {
            const x = padLeft + (i / (CASHFLOW_CHART_MONTHS.length - 1)) * plotW
            const isHovered = hoveredIndex === i
            return (
              <g
                key={d.month}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                {/* Transparent hit area */}
                <rect
                  x={x - (plotW / (CASHFLOW_CHART_MONTHS.length - 1)) / 2}
                  y={padTop}
                  width={plotW / (CASHFLOW_CHART_MONTHS.length - 1)}
                  height={plotH + padBottom}
                  fill="transparent"
                />
                <circle
                  cx={pointsIn[i].x}
                  cy={pointsIn[i].y}
                  r="3.5"
                  fill="#137333"
                  opacity={isHovered ? 1 : 0.6}
                />
                <circle
                  cx={pointsOut[i].x}
                  cy={pointsOut[i].y}
                  r="3.5"
                  fill="#C03A2B"
                  opacity={isHovered ? 1 : 0.6}
                />
                <text
                  x={x}
                  y={chartH - 8}
                  textAnchor="middle"
                  fill={isHovered ? "#0A66C2" : "rgba(0,0,0,0.60)"}
                  fontWeight={isHovered ? "700" : "500"}
                  fontSize="12"
                  fontFamily="'Source Sans 3', sans-serif"
                >
                  {d.month}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Floating Tooltip Card */}
        {activeData && activePtIn && hoveredIndex !== null && (
          <div
            style={{
              position: "absolute",
              left: `${(activePtIn.x / chartW) * 100}%`,
              top: 10,
              transform: "translate(-50%, 0)",
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              border: "1px solid rgba(0,0,0,0.08)",
              padding: "10px 14px",
              pointerEvents: "none",
              zIndex: 10,
              minWidth: 170,
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                paddingBottom: 4,
                marginBottom: 6,
              }}
            >
              {activeData.month} / 2026
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                fontSize: 12,
                marginBottom: 3,
              }}
            >
              <span style={{ color: "rgba(0,0,0,0.60)", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#137333" }} />
                Tiền vào:
              </span>
              <span style={{ fontWeight: 700, color: "#137333" }}>{activeData.formattedIn}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              <span style={{ color: "rgba(0,0,0,0.60)", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C03A2B" }} />
                Tiền ra:
              </span>
              <span style={{ fontWeight: 700, color: "#C03A2B" }}>{activeData.formattedOut}</span>
            </div>
            <div
              style={{
                borderTop: "1px dashed rgba(0,0,0,0.08)",
                paddingTop: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <span style={{ color: "rgba(0,0,0,0.60)" }}>Thặng dư ròng:</span>
              <span style={{ color: "#0A66C2" }}>{activeData.net}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FinancialHistoryPage({ onBack }: { onBack: () => void }) {
  const [filterType, setFilterType] = useState<"all" | "in" | "out">("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [appliedFilterType, setAppliedFilterType] = useState<"all" | "in" | "out">("all")
  const [appliedStartDate, setAppliedStartDate] = useState("")
  const [appliedEndDate, setAppliedEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleApplyFilter = () => {
    setAppliedFilterType(filterType)
    setAppliedStartDate(startDate)
    setAppliedEndDate(endDate)
    setCurrentPage(1)
  }

  const handleResetFilter = () => {
    setFilterType("all")
    setStartDate("")
    setEndDate("")
    setAppliedFilterType("all")
    setAppliedStartDate("")
    setAppliedEndDate("")
    setCurrentPage(1)
  }

  const filteredTransactions = INITIAL_FINANCIAL_TRANSACTIONS.filter((item) => {
    if (appliedFilterType !== "all" && item.type !== appliedFilterType) {
      return false
    }
    if (appliedStartDate && item.date < appliedStartDate) {
      return false
    }
    if (appliedEndDate && item.date > appliedEndDate) {
      return false
    }
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div style={{ minHeight: "100%", background: "#F4F2EE", paddingBottom: 48 }}>
      <div style={{ maxWidth: 1128, margin: "0 auto", padding: "24px 16px" }}>
        {/* Navigation & Header */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(0,0,0,0.60)",
              fontFamily: "inherit",
              padding: "4px 0",
              marginBottom: 12,
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.90)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")}
          >
            <ArrowLeft size={16} weight="bold" /> Quay lại
          </button>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(0,0,0,0.90)",
              marginBottom: 4,
              letterSpacing: "-0.015em",
            }}
          >
            Quản lý dòng tiền
          </h1>
          <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
            Theo dõi lịch sử thu nhập và chi phí phát sinh từ các dự án, hợp đồng
          </p>
        </div>

        {/* Page Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0A66C2 0%, #06407F 100%)",
            borderRadius: 8,
            padding: "24px 28px",
            marginBottom: 24,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(10,102,194,0.18)",
            position: "relative",
            overflow: "hidden",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ maxWidth: 640, position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.18)",
                padding: "4px 10px",
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              <Sparkle size={13} weight="fill" color="#FFD700" />
              Occupify Cashflow Management
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.35,
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              Nắm bắt dòng tiền thông minh — Tối ưu hóa thu nhập từ hợp đồng freelance
            </h2>
            <p
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.5,
              }}
            >
              Mọi khoản tiền vào và tiền ra đều được ghi nhận minh bạch theo thời gian thực. Giúp bạn kiểm soát chi phí dự án và xây dựng kế hoạch tài chính vững vàng.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.20)",
                borderRadius: 8,
                padding: "12px 18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.80)", fontWeight: 600 }}>
                Thặng dư ròng tháng 9
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 2 }}>
                +26.700.000 ₫
              </div>
            </div>
          </div>

          {/* Decorative background circle */}
          <div
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* 2. Summary Metric Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {/* Card 1: Tổng tiền vào */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 24,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.60)",
                  marginBottom: 6,
                }}
              >
                Tổng tiền vào
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#137333",
                  letterSpacing: "-0.01em",
                }}
              >
                +45.200.000 ₫
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#137333",
                  background: "#E6F4EA",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                <TrendUp size={14} weight="bold" />
                +18.5% so với tháng trước
              </div>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#E6F4EA",
                color: "#137333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrendUp size={26} weight="bold" />
            </div>
          </div>

          {/* Card 2: Tổng tiền ra */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 24,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.60)",
                  marginBottom: 6,
                }}
              >
                Tổng tiền ra
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#C03A2B",
                  letterSpacing: "-0.01em",
                }}
              >
                -18.500.000 ₫
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#C03A2B",
                  background: "#FCE8E6",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                <TrendDown size={14} weight="bold" />
                -6.2% so với tháng trước
              </div>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#FCE8E6",
                color: "#C03A2B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrendDown size={26} weight="bold" />
            </div>
          </div>
        </div>

        {/* 3. Interactive Line Chart Section */}
        <CashflowLineChart />

        {/* 4. Filter & Search Toolbar */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            padding: "16px 20px",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {/* Transaction Type Select */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.70)" }}>
                Loại giao dịch:
              </span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "in" | "out")}
                style={{
                  background: "#FAFAF8",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 4,
                  padding: "8px 12px",
                  fontSize: 14,
                  fontFamily: "inherit",
                  color: "rgba(0,0,0,0.90)",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">Tất cả giao dịch</option>
                <option value="in">Tiền vào (+)</option>
                <option value="out">Tiền ra (-)</option>
              </select>
            </div>

            {/* Date Pickers */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.70)" }}>
                Từ ngày:
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  background: "#FAFAF8",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 4,
                  padding: "7px 10px",
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "rgba(0,0,0,0.85)",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.70)" }}>
                Đến ngày:
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  background: "#FAFAF8",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 4,
                  padding: "7px 10px",
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "rgba(0,0,0,0.85)",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {(appliedFilterType !== "all" || appliedStartDate || appliedEndDate) && (
              <button
                onClick={handleResetFilter}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.60)",
                  fontFamily: "inherit",
                  padding: "6px 12px",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
              >
                Đặt lại
              </button>
            )}
            <button
              onClick={handleApplyFilter}
              style={{
                borderRadius: 9999,
                background: "#0A66C2",
                color: "#fff",
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#084FA0")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#0A66C2")}
            >
              <Funnel size={14} weight="bold" />
              Lọc dữ liệu
            </button>
          </div>
        </div>

        {/* 5. Transactions Data Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr
                  style={{
                    background: "#FAFAF8",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.60)",
                    letterSpacing: "0.03em",
                  }}
                >
                  <th style={{ padding: "14px 20px" }}>Mã hợp đồng</th>
                  <th style={{ padding: "14px 20px" }}>Tên hợp đồng</th>
                  <th style={{ padding: "14px 20px" }}>Loại giao dịch</th>
                  <th style={{ padding: "14px 20px" }}>Số tiền</th>
                  <th style={{ padding: "14px 20px" }}>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: "36px 20px",
                        textAlign: "center",
                        color: "rgba(0,0,0,0.50)",
                        fontSize: 14,
                      }}
                    >
                      Không tìm thấy giao dịch nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.04)",
                        fontSize: 14,
                        transition: "background 150ms ease",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFAF8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 20px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            color: "#0A66C2",
                            background: "#EAF1FA",
                            padding: "3px 8px",
                            borderRadius: 4,
                            fontWeight: 600,
                            fontSize: 13,
                          }}
                        >
                          {item.contractCode}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontWeight: 600, color: "rgba(0,0,0,0.90)" }}>
                          {item.contractName}
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", marginTop: 2 }}>
                          {item.category}
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            color: item.type === "in" ? "#137333" : "#C03A2B",
                            background: item.type === "in" ? "#E6F4EA" : "#FCE8E6",
                            padding: "2px 8px",
                            borderRadius: 9999,
                          }}
                        >
                          {item.type === "in" ? (
                            <>
                              <ArrowUpRight size={12} weight="bold" /> Tiền vào (+)
                            </>
                          ) : (
                            <>
                              <ArrowDownRight size={12} weight="bold" /> Tiền ra (-)
                            </>
                          )}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 15,
                            color: item.type === "in" ? "#137333" : "#C03A2B",
                          }}
                        >
                          {item.type === "in"
                            ? `+${item.amount.toLocaleString("vi-VN")} ₫`
                            : `-${item.amount.toLocaleString("vi-VN")} ₫`}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", color: "rgba(0,0,0,0.60)", fontSize: 13 }}>
                        {item.timestamp}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              background: "#FAFAF8",
            }}
          >
            <div style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
              {filteredTransactions.length === 0 ? (
                "0 giao dịch"
              ) : (
                <>
                  Hiển thị{" "}
                  <strong style={{ color: "rgba(0,0,0,0.85)" }}>
                    {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}
                  </strong>{" "}
                  trên tổng số{" "}
                  <strong style={{ color: "rgba(0,0,0,0.85)" }}>
                    {filteredTransactions.length}
                  </strong>{" "}
                  giao dịch
                </>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                style={{
                  padding: "6px 12px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  color: currentPage <= 1 ? "rgba(0,0,0,0.30)" : "rgba(0,0,0,0.70)",
                  cursor: currentPage <= 1 ? "default" : "pointer",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <CaretLeft size={12} weight="bold" /> Trước
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1
                const isActive = pageNum === currentPage
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "none",
                      background: isActive ? "#0A66C2" : "transparent",
                      color: isActive ? "#fff" : "rgba(0,0,0,0.70)",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                style={{
                  padding: "6px 12px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  color: currentPage >= totalPages ? "rgba(0,0,0,0.30)" : "rgba(0,0,0,0.70)",
                  cursor: currentPage >= totalPages ? "default" : "pointer",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Sau <CaretRight size={12} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── My Wallet & SePay Integration ─────────────────────────────────────────────

interface WalletTransaction {
  id: string
  type: "deposit" | "withdraw" | "income"
  title: string
  subtitle: string
  amount: number
  date: string
  time: string
  status: "success" | "pending" | "failed"
  code: string
  bankInfo?: string
}

const VIETNAM_BANKS = [
  { code: "VCB", shortName: "Vietcombank", fullName: "Ngân hàng TMCP Ngoại thương Việt Nam" },
  { code: "MB", shortName: "MB Bank", fullName: "Ngân hàng TMCP Quân Đội" },
  { code: "TCB", shortName: "Techcombank", fullName: "Ngân hàng TMCP Kỹ Thương Việt Nam" },
  { code: "ACB", shortName: "ACB", fullName: "Ngân hàng TMCP Á Châu" },
  { code: "BIDV", shortName: "BIDV", fullName: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam" },
  { code: "CTG", shortName: "VietinBank", fullName: "Ngân hàng TMCP Công Thương Việt Nam" },
  { code: "VPB", shortName: "VPBank", fullName: "Ngân hàng TMCP Việt Nam Thịnh Vượng" },
  { code: "TPB", shortName: "TPBank", fullName: "Ngân hàng TMCP Tiên Phong" },
  { code: "STB", shortName: "Sacombank", fullName: "Ngân hàng TMCP Sài Gòn Thương Tín" },
  { code: "VIB", shortName: "VIB", fullName: "Ngân hàng TMCP Quốc Tế Việt Nam" },
  { code: "HDB", shortName: "HDBank", fullName: "Ngân hàng TMCP Phát triển TP.HCM" },
]

const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "tx-1",
    type: "deposit",
    title: "Nạp tiền vào ví",
    subtitle: "Chuyển khoản VietQR tự động 24/7 (Đơn hàng OPF-88912)",
    amount: 10000000,
    date: "18/09/2026",
    time: "15:45",
    status: "success",
    code: "SEPAY-88912",
  },
  {
    id: "tx-3",
    type: "withdraw",
    title: "Rút tiền về Vietcombank",
    subtitle: "STK: 1029384756 • NGUYEN MINH KHOA",
    amount: -5000000,
    date: "14/09/2026",
    time: "18:20",
    status: "success",
    code: "WD-881923",
    bankInfo: "Vietcombank - 1029384756",
  },
  {
    id: "tx-4",
    type: "deposit",
    title: "Nạp tiền vào ví",
    subtitle: "Chuyển khoản VietQR tự động 24/7 (Đơn hàng OPF-76291)",
    amount: 2500000,
    date: "10/09/2026",
    time: "09:12",
    status: "success",
    code: "SEPAY-76291",
  },
  {
    id: "tx-5",
    type: "withdraw",
    title: "Rút tiền về MB Bank",
    subtitle: "STK: 0988776655 • NGUYEN MINH KHOA",
    amount: -3000000,
    date: "05/09/2026",
    time: "14:05",
    status: "success",
    code: "WD-661209",
    bankInfo: "MB Bank - 0988776655",
  },
]

function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(Math.abs(amount)) + " ₫"
}

// ─── Deposit Modal ─────────────────────────────────────────────────────────────

function DepositModal({
  balance,
  onClose,
  onProceedToSepay,
}: {
  balance: number
  onClose: () => void
  onProceedToSepay: (amount: number) => void
}) {
  const [depositAmount, setDepositAmount] = useState<string>("1000000")
  const [customError, setCustomError] = useState<string | null>(null)

  const quickAmounts = [100000, 200000, 500000, 1000000, 2000000, 5000000]
  const numericAmount = parseInt(depositAmount.replace(/\D/g, ""), 10) || 0

  const handleQuickAdd = (val: number) => {
    setDepositAmount(val.toString())
    setCustomError(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "")
    setDepositAmount(rawVal)
    if (customError) setCustomError(null)
  }

  const handleProceed = () => {
    if (numericAmount < 10000) {
      setCustomError("Số tiền nạp tối thiểu là 10.000 ₫")
      return
    }
    onProceedToSepay(numericAmount)
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0,0,0,0.60)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          maxWidth: 480,
          width: "100%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#EAF1FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0A66C2",
              }}
            >
              <Wallet size={22} weight="bold" />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                Nạp tiền vào ví
              </h3>
              <p style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                Nhập số tiền bạn muốn nạp vào tài khoản
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(0,0,0,0.50)",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Current balance reminder */}
          <div
            style={{
              background: "#F8FAFC",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 13, color: "rgba(0,0,0,0.60)", fontWeight: 500 }}>
              Số dư khả dụng hiện tại:
            </span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#0A66C2" }}>
              {formatVND(balance)}
            </span>
          </div>

          {/* Amount input */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.80)",
                marginBottom: 8,
              }}
            >
              Nhập số tiền muốn nạp <span style={{ color: "#C03A2B" }}>*</span>
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={numericAmount > 0 ? new Intl.NumberFormat("vi-VN").format(numericAmount) : ""}
                placeholder="0"
                onChange={handleInputChange}
                autoFocus
                style={{
                  width: "100%",
                  height: 48,
                  padding: "0 40px 0 16px",
                  borderRadius: 8,
                  border: customError
                    ? "2px solid #C03A2B"
                    : "1px solid rgba(0,0,0,0.20)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  outline: "none",
                }}
                onFocus={(e) => {
                  if (!customError) e.target.style.borderColor = "#0A66C2"
                }}
                onBlur={(e) => {
                  if (!customError) e.target.style.borderColor = "rgba(0,0,0,0.20)"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: 16,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.45)",
                  pointerEvents: "none",
                }}
              >
                ₫
              </span>
            </div>
            {customError && (
              <div style={{ fontSize: 12, color: "#C03A2B", marginTop: 6, fontWeight: 500 }}>
                {customError}
              </div>
            )}
          </div>

          {/* Quick choices */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.60)", marginBottom: 8 }}>
              Chọn nhanh số tiền:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {quickAmounts.map((q) => {
                const isSelected = numericAmount === q
                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuickAdd(q)}
                    style={{
                      padding: "9px 8px",
                      borderRadius: 6,
                      border: isSelected ? "1.5px solid #0A66C2" : "1px solid rgba(0,0,0,0.12)",
                      background: isSelected ? "#EAF1FA" : "#fff",
                      color: isSelected ? "#0A66C2" : "rgba(0,0,0,0.80)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 120ms ease",
                    }}
                  >
                    +{new Intl.NumberFormat("vi-VN").format(q)}đ
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            background: "#FAFAF9",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "#fff",
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(0,0,0,0.70)",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
          <button
            onClick={handleProceed}
            disabled={numericAmount < 10000}
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              border: "none",
              background: numericAmount >= 10000 ? "#0A66C2" : "#94B4DE",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              cursor: numericAmount >= 10000 ? "pointer" : "not-allowed",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              boxShadow: numericAmount >= 10000 ? "0 2px 6px rgba(10,102,194,0.3)" : "none",
            }}
          >
            Đến trang giao dịch <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Withdraw Modal ────────────────────────────────────────────────────────────

function WithdrawModal({
  balance,
  onClose,
  onConfirmWithdraw,
}: {
  balance: number
  onClose: () => void
  onConfirmWithdraw: (bank: string, accountNumber: string, amount: number, accountName: string) => void
}) {
  const [selectedBank, setSelectedBank] = useState(VIETNAM_BANKS[0].shortName)
  const [accountNumber, setAccountNumber] = useState("1029384756")
  const [accountName] = useState("NGUYEN MINH KHOA")
  const [withdrawAmount, setWithdrawAmount] = useState<string>("5000000")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const numericAmount = parseInt(withdrawAmount.replace(/\D/g, ""), 10) || 0

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "")
    setWithdrawAmount(rawVal)
    if (errorMsg) setErrorMsg(null)
  }

  const handleWithdrawAll = () => {
    setWithdrawAmount(balance.toString())
    if (errorMsg) setErrorMsg(null)
  }

  const handleSubmit = () => {
    if (!accountNumber.trim()) {
      setErrorMsg("Vui lòng nhập số tài khoản ngân hàng")
      return
    }
    if (numericAmount < 50000) {
      setErrorMsg("Số tiền rút tối thiểu là 50.000 ₫")
      return
    }
    if (numericAmount > balance) {
      setErrorMsg(`Số tiền rút vượt quá số dư khả dụng (${formatVND(balance)})`)
      return
    }
    onConfirmWithdraw(selectedBank, accountNumber.trim(), numericAmount, accountName)
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0,0,0,0.60)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C03A2B",
              }}
            >
              <Bank size={22} weight="bold" />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                Rút tiền về tài khoản ngân hàng
              </h3>
              <p style={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                Chuyển khoản liên ngân hàng 24/7 tức thì
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(0,0,0,0.50)",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Balance card */}
          <div
            style={{
              background: "#F8FAFC",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 13, color: "rgba(0,0,0,0.60)", fontWeight: 500 }}>
              Số dư khả dụng để rút:
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#137333" }}>
              {formatVND(balance)}
            </span>
          </div>

          {/* Bank selector */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.80)",
                marginBottom: 6,
              }}
            >
              Chọn ngân hàng nhận tiền <span style={{ color: "#C03A2B" }}>*</span>
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.20)",
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(0,0,0,0.90)",
                background: "#fff",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {VIETNAM_BANKS.map((b) => (
                <option key={b.code} value={b.shortName}>
                  [{b.code}] {b.shortName} - {b.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Account number */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(0,0,0,0.80)",
                marginBottom: 6,
              }}
            >
              Số tài khoản thụ hưởng <span style={{ color: "#C03A2B" }}>*</span>
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value)
                if (errorMsg) setErrorMsg(null)
              }}
              placeholder="Nhập số tài khoản ngân hàng"
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.20)",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(0,0,0,0.90)",
                outline: "none",
              }}
            />
            <div
              style={{
                fontSize: 12,
                color: "rgba(0,0,0,0.55)",
                marginTop: 5,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <CheckCircle size={13} color="#137333" weight="fill" />
              Tên người thụ hưởng: <strong style={{ color: "rgba(0,0,0,0.85)" }}>{accountName}</strong>
            </div>
          </div>

          {/* Amount input */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.80)",
                }}
              >
                Số tiền muốn rút <span style={{ color: "#C03A2B" }}>*</span>
              </label>
              <button
                type="button"
                onClick={handleWithdrawAll}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0A66C2",
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Rút toàn bộ
              </button>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="text"
                value={numericAmount > 0 ? new Intl.NumberFormat("vi-VN").format(numericAmount) : ""}
                placeholder="0"
                onChange={handleAmountChange}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 40px 0 14px",
                  borderRadius: 8,
                  border: errorMsg ? "2px solid #C03A2B" : "1px solid rgba(0,0,0,0.20)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  outline: "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: 14,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.45)",
                  pointerEvents: "none",
                }}
              >
                ₫
              </span>
            </div>
            {errorMsg && (
              <div style={{ fontSize: 12, color: "#C03A2B", marginTop: 6, fontWeight: 500 }}>
                {errorMsg}
              </div>
            )}
          </div>

          {/* Summary */}
          <div
            style={{
              background: "#FAFAF9",
              border: "1px dashed rgba(0,0,0,0.12)",
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 12.5,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(0,0,0,0.60)" }}>
              <span>Phí giao dịch:</span>
              <span style={{ color: "#137333", fontWeight: 700 }}>Miễn phí (0 ₫)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(0,0,0,0.60)" }}>
              <span>Thời gian xử lý:</span>
              <span>Khoảng 5 - 15 phút</span>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
                paddingTop: 6,
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                fontSize: 13.5,
              }}
            >
              <span>Số tiền thực nhận:</span>
              <span style={{ color: "#C03A2B" }}>{formatVND(numericAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            background: "#FAFAF9",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "#fff",
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(0,0,0,0.70)",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={numericAmount <= 0 || numericAmount > balance}
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              border: "none",
              background: numericAmount > 0 && numericAmount <= balance ? "#0A66C2" : "#94B4DE",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              cursor: numericAmount > 0 && numericAmount <= balance ? "pointer" : "not-allowed",
              boxShadow: numericAmount > 0 && numericAmount <= balance ? "0 2px 6px rgba(10,102,194,0.3)" : "none",
            }}
          >
            Xác nhận Rút tiền
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── SePay Checkout Sandbox View ───────────────────────────────────────────────

function SepayCheckoutSandbox({
  order,
  onSuccess,
  onCancel,
}: {
  order: { orderCode: string; amount: number; date: string }
  onSuccess: (amount: number, orderCode: string) => void
  onCancel: () => void
}) {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedItem(label)
    setTimeout(() => setCopiedItem(null), 1800)
  }

  const handleSimulatePaymentSuccess = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess(order.amount, order.orderCode)
    }, 700)
  }

  const qrImageUrl = `https://img.vietqr.io/image/MB-0988888888-compact2.png?amount=${order.amount}&addInfo=OPF${order.orderCode}&accountName=CONG%20TY%20CP%20OCCUPIFY`

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", color: "#F8FAFC", fontFamily: "sans-serif" }}>
      {/* Simulated Browser Address Bar */}
      <div
        style={{
          background: "#1E293B",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#F59E0B" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#10B981" }} />
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 680,
            margin: "0 auto",
            background: "#0F172A",
            borderRadius: 6,
            padding: "6px 14px",
            fontSize: 12.5,
            color: "#94A3B8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#E2E8F0" }}>
            <Lock size={13} color="#10B981" weight="bold" />
            https://sandbox.sepay.vn/checkout/order-OPF{order.orderCode}
          </span>
          <span
            style={{
              background: "rgba(245, 158, 11, 0.15)",
              color: "#FBBF24",
              fontSize: 10.5,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 4,
              letterSpacing: "0.03em",
            }}
          >
            SEPAY SANDBOX GATEWAY
          </span>
        </div>
      </div>

      {/* Main Sandbox Checkout Canvas */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 16px 48px" }}>
        {/* Gateway Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
                width: 44,
                height: 44,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 22,
                color: "#fff",
                letterSpacing: "-0.03em",
                boxShadow: "0 4px 12px rgba(2,132,199,0.35)",
              }}
            >
              S
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", color: "#F8FAFC" }}>
                  SePay Checkout
                </h1>
                <span
                  style={{
                    background: "#0369A1",
                    color: "#E0F2FE",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 9999,
                  }}
                >
                  Sandbox Mode
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#94A3B8" }}>
                Cổng thanh toán liên ngân hàng VietQR Napas 24/7 tự động
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#1E293B",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 8,
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Clock size={16} color="#38BDF8" weight="bold" />
            <span style={{ fontSize: 13, color: "#94A3B8" }}>Hết hạn sau:</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#38BDF8", fontFamily: "monospace" }}>
              {timeFormatted}
            </span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {/* Order info card */}
          <div
            style={{
              background: "#1E293B",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.10)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#38BDF8", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
                Thông tin đơn hàng nạp ví
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#F8FAFC", marginBottom: 6 }}>
                {formatVND(order.amount)}
              </div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>
                Nạp tiền tài khoản Occupify: Nguyễn Minh Khoa
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  fontSize: 13,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Mã đơn hàng:</span>
                  <span style={{ fontWeight: 700, color: "#F1F5F9" }}>OPF-{order.orderCode}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Đơn vị thụ hưởng:</span>
                  <span style={{ fontWeight: 600, color: "#F1F5F9" }}>Occupify Platform Vietnam</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Thời gian tạo:</span>
                  <span style={{ color: "#F1F5F9" }}>{order.date}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94A3B8" }}>Trạng thái:</span>
                  <span style={{ color: "#FBBF24", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FBBF24" }} />
                    Chờ thanh toán
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                background: "rgba(2,132,199,0.12)",
                border: "1px solid rgba(2,132,199,0.30)",
                borderRadius: 8,
                padding: "14px",
                fontSize: 12.5,
                color: "#BAE6FD",
                lineHeight: 1.45,
              }}
            >
              ℹ️ Đây là trang thanh toán độc lập do <strong>SePay Checkout Sandbox</strong> vận hành. Sau khi xác nhận thanh toán, SePay sẽ tự động bắn webhook và chuyển hướng trở về Ví Occupify của bạn.
            </div>
          </div>

          {/* VietQR & Transfer Card */}
          <div
            style={{
              background: "#1E293B",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.10)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* VietQR Code Box */}
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "14px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 240,
                width: "100%",
                marginBottom: 16,
              }}
            >
              <img
                src={qrImageUrl}
                alt="SePay VietQR"
                style={{ width: "100%", height: "auto", borderRadius: 6, display: "block" }}
                onError={(e) => {
                  // Fallback if VietQR API is not reachable
                  (e.currentTarget as HTMLElement).style.display = "none"
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0284C7",
                  textAlign: "center",
                  letterSpacing: "0.02em",
                }}
              >
                QUÉT MÃ VIETQR QUA APP NGÂN HÀNG
              </div>
            </div>

            {/* Bank details with copy */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Ngân hàng", value: "MB Bank (Quân Đội)", copyVal: "MB Bank" },
                { label: "Số tài khoản", value: "0988 888 888", copyVal: "0988888888" },
                { label: "Tên tài khoản", value: "CONG TY CP OCCUPIFY", copyVal: "CONG TY CP OCCUPIFY" },
                { label: "Số tiền", value: formatVND(order.amount), copyVal: order.amount.toString() },
                { label: "Nội dung CK", value: `OPF${order.orderCode}`, copyVal: `OPF${order.orderCode}`, highlight: true },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    borderRadius: 6,
                    background: row.highlight ? "rgba(245, 158, 11, 0.12)" : "rgba(255,255,255,0.04)",
                    border: row.highlight ? "1px solid rgba(245, 158, 11, 0.35)" : "1px solid rgba(255,255,255,0.06)",
                    fontSize: 13,
                  }}
                >
                  <div>
                    <span style={{ color: "#94A3B8", marginRight: 8, fontSize: 12 }}>{row.label}:</span>
                    <strong style={{ color: row.highlight ? "#FCD34D" : "#F8FAFC" }}>{row.value}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard(row.copyVal, row.label)}
                    style={{
                      background: copiedItem === row.label ? "#10B981" : "rgba(255,255,255,0.12)",
                      border: "none",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {copiedItem === row.label ? (
                      <>
                        <Check size={12} weight="bold" /> Đã chép
                      </>
                    ) : (
                      <>
                        <Copy size={12} weight="bold" /> Sao chép
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sandbox Test Action Panel */}
        <div
          style={{
            background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
            border: "2px dashed #0284C7",
            borderRadius: 12,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Sparkle size={20} color="#38BDF8" weight="fill" />
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#F8FAFC" }}>
                Bảng điều khiển Sandbox (Testing Sandbox Controls)
              </h3>
              <p style={{ fontSize: 12.5, color: "#94A3B8" }}>
                Vì đây là môi trường sandbox SePay, bạn có thể click nút bên dưới để mô phỏng quét mã thanh toán thành công và tự động điều hướng về Occupify với số dư được cộng ngay lập tức.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={handleSimulatePaymentSuccess}
              disabled={isProcessing}
              style={{
                flex: 1,
                minWidth: 260,
                padding: "14px 24px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: isProcessing ? "wait" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
              }}
            >
              {isProcessing ? (
                <>
                  <ArrowsClockwise size={18} className="animate-spin" /> Đang truyền tín hiệu SePay webhook...
                </>
              ) : (
                <>
                  <CheckCircle size={18} weight="fill" /> Mô phỏng Quét mã & Thanh toán thành công
                </>
              )}
            </button>

            <button
              onClick={onCancel}
              style={{
                padding: "14px 20px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.20)",
                background: "rgba(255,255,255,0.06)",
                color: "#CBD5E1",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✕ Hủy giao dịch & Quay về Occupify
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── My Wallet Page ────────────────────────────────────────────────────────────

function MyWalletPage({
  balance,
  transactions,
  onOpenDeposit,
  onOpenWithdraw,
  onBack,
  onOpenFinancialHistory,
}: {
  balance: number
  transactions: WalletTransaction[]
  onOpenDeposit: () => void
  onOpenWithdraw: () => void
  onBack: () => void
  onOpenFinancialHistory?: () => void
}) {
  const [showBalance, setShowBalance] = useState(true)
  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdraw">("all")

  const filteredList = transactions.filter((t) => {
    if (filterType === "all") return true
    return t.type === filterType
  })

  return (
    <div style={{ minHeight: "100%", background: "#F4F2EE", paddingBottom: 48 }}>
      <div style={{ maxWidth: 1128, margin: "0 auto", padding: "24px 16px" }}>
        {/* Navigation & Header */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(0,0,0,0.60)",
              fontFamily: "inherit",
              padding: "4px 0",
              marginBottom: 12,
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.90)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.60)")}
          >
            <ArrowLeft size={16} weight="bold" /> Quay lại
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  marginBottom: 4,
                  letterSpacing: "-0.015em",
                }}
              >
                Ví của tôi
              </h1>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
                Quản lý số dư, nạp tiền vào ví và rút tiền về tài khoản ngân hàng
              </p>
            </div>
            {onOpenFinancialHistory && (
              <button
                onClick={onOpenFinancialHistory}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.75)",
                  cursor: "pointer",
                }}
              >
                <ChartLine size={16} color="#0A66C2" weight="bold" /> Xem lịch sử thu chi
              </button>
            )}
          </div>
        </div>

        {/* Hero Balance Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #0A66C2 0%, #06407F 100%)",
            borderRadius: 12,
            padding: "28px 32px",
            marginBottom: 20,
            color: "#fff",
            boxShadow: "0 8px 24px rgba(10,102,194,0.22)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Top balance info */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.80)",
                  textTransform: "uppercase",
                }}
              >
                Số dư khả dụng
              </span>
              <button
                onClick={() => setShowBalance((v) => !v)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: 9999,
                  color: "#fff",
                  padding: "3px 8px",
                  fontSize: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                }}
              >
                {showBalance ? <EyeSlash size={14} weight="bold" /> : <Eye size={14} weight="bold" />}
                <span>{showBalance ? "Ẩn số dư" : "Hiện số dư"}</span>
              </button>
            </div>

            {/* Main Balance Display */}
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#fff",
                marginBottom: 24,
              }}
            >
              {showBalance ? formatVND(balance) : "•••••••• ₫"}
            </div>

            {/* Action Buttons: Nạp tiền vào ví & Rút tiền */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                onClick={onOpenDeposit}
                style={{
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: "#fff",
                  color: "#0A66C2",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <Plus size={18} weight="bold" color="#0A66C2" /> Nạp tiền vào ví
              </button>

              <button
                onClick={onOpenWithdraw}
                style={{
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "1.5px solid rgba(255,255,255,0.40)",
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backdropFilter: "blur(6px)",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.20)"
                  e.currentTarget.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)"
                  e.currentTarget.style.transform = "none"
                }}
              >
                <ArrowUpRight size={18} weight="bold" /> Rút tiền
              </button>
            </div>
          </div>

          {/* Decorative background shape */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Transactions Table Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Section Header & Filters */}
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                Lịch sử nạp và rút tiền
              </h2>
              <p style={{ fontSize: 12.5, color: "rgba(0,0,0,0.55)", marginTop: 2 }}>
                Ghi nhận chi tiết các lần nạp tiền vào ví và rút tiền về tài khoản ngân hàng
              </p>
            </div>

            {/* Filter Chips */}
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { id: "all", label: `Tất cả (${transactions.length})` },
                { id: "deposit", label: `Nạp tiền (${transactions.filter((t) => t.type === "deposit").length})` },
                { id: "withdraw", label: `Rút tiền (${transactions.filter((t) => t.type === "withdraw").length})` },
              ].map((tab) => {
                const isActive = filterType === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterType(tab.id as any)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 9999,
                      border: isActive ? "1px solid #0A66C2" : "1px solid rgba(0,0,0,0.12)",
                      background: isActive ? "#EAF1FA" : "transparent",
                      color: isActive ? "#0A66C2" : "rgba(0,0,0,0.70)",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 120ms ease",
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredList.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "rgba(0,0,0,0.45)", fontSize: 14 }}>
                Không có giao dịch nào trong danh mục này.
              </div>
            ) : (
              filteredList.map((tx, idx) => {
                const isDeposit = tx.type === "deposit"

                return (
                  <div
                    key={tx.id}
                    style={{
                      padding: "16px 24px",
                      borderBottom:
                        idx === filteredList.length - 1 ? "none" : "1px solid rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      transition: "background 150ms ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Left Icon + Text */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: isDeposit ? "#E5F6E8" : "#FBE2E2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: isDeposit ? "#057642" : "#C03A2B",
                        }}
                      >
                        {isDeposit ? (
                          <ArrowDownLeft size={20} weight="bold" />
                        ) : (
                          <ArrowUpRight size={20} weight="bold" />
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "rgba(0,0,0,0.90)",
                            marginBottom: 2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {tx.title}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(0,0,0,0.55)",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span>{tx.subtitle}</span>
                          <span>•</span>
                          <span>{tx.time} {tx.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Amount + Status */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: tx.amount > 0 ? "#137333" : "#C03A2B",
                          letterSpacing: "-0.01em",
                          marginBottom: 4,
                        }}
                      >
                        {tx.amount > 0 ? `+${formatVND(tx.amount)}` : `-${formatVND(tx.amount)}`}
                      </div>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 9999,
                          background: "#E5F6E8",
                          color: "#057642",
                        }}
                      >
                        Thành công
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


function MainApp({ onLogout }: { onLogout?: () => void }) {
  const [activeNav, setActiveNav] = useState("home")
  const [savedJobIds, setSavedJobIds] = useState<number[]>([1, 3])
  const [toast, setToast] = useState<string | null>(null)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  )
  const [myProfileOpen, setMyProfileOpen] = useState(false)
  const [financialHistoryOpen, setFinancialHistoryOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [walletBalance, setWalletBalance] = useState(52450000)
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_WALLET_TRANSACTIONS)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [sepaySandboxOrder, setSepaySandboxOrder] = useState<{
    orderCode: string
    amount: number
    date: string
  } | null>(null)
  const [viewingUser, setViewingUser] = useState<string | null>(null)

  const toggleSaveJob = (id: number) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const openMyProfile = () => {
    setViewingUser(null)
    setFinancialHistoryOpen(false)
    setWalletOpen(false)
    setSelectedContract(null)
    setMyProfileOpen(true)
  }
  const openOtherProfile = (name?: string) => {
    setViewingUser(name ?? null)
    setFinancialHistoryOpen(false)
    setWalletOpen(false)
    setSelectedContract(null)
    setMyProfileOpen(true)
  }
  const closeMyProfile = () => {
    setMyProfileOpen(false)
    setViewingUser(null)
  }

  const openWallet = () => {
    setFinancialHistoryOpen(false)
    closeMyProfile()
    setSelectedContract(null)
    setWalletOpen(true)
  }

  const handleOpenSepaySandbox = (amount: number) => {
    const randomCode = Math.floor(10000 + Math.random() * 90000).toString()
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`
    setSepaySandboxOrder({
      orderCode: randomCode,
      amount,
      date: `${dateStr} ${timeStr}`,
    })
  }

  const handleCompleteSepayPayment = (amount: number, orderCode: string) => {
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`

    setWalletBalance((prev) => prev + amount)
    const newTx: WalletTransaction = {
      id: `tx-dep-${Date.now()}`,
      type: "deposit",
      title: "Nạp tiền vào ví",
      subtitle: `Chuyển khoản VietQR tự động 24/7 (Đơn hàng OPF-${orderCode})`,
      amount: amount,
      date: dateStr,
      time: timeStr,
      status: "success",
      code: `SEPAY-${orderCode}`,
    }
    setWalletTransactions((prev) => [newTx, ...prev])
    setSepaySandboxOrder(null)
    setToast(`Nạp tiền thành công! Đã cộng +${formatVND(amount)} vào ví.`)
  }

  const handleWithdraw = (bank: string, accountNumber: string, amount: number, accountName: string) => {
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`

    setWalletBalance((prev) => prev - amount)
    const newTx: WalletTransaction = {
      id: `tx-wd-${Date.now()}`,
      type: "withdraw",
      title: `Rút tiền về ${bank}`,
      subtitle: `STK: ${accountNumber} • ${accountName}`,
      amount: -amount,
      date: dateStr,
      time: timeStr,
      status: "success",
      code: `WD-${Math.floor(100000 + Math.random() * 900000)}`,
      bankInfo: `${bank} - ${accountNumber}`,
    }
    setWalletTransactions((prev) => [newTx, ...prev])
    setToast(`Đã tạo lệnh rút ${formatVND(amount)} về ${bank} thành công!`)
  }

  if (sepaySandboxOrder) {
    return (
      <SepayCheckoutSandbox
        order={sepaySandboxOrder}
        onSuccess={(amount, orderCode) => {
          handleCompleteSepayPayment(amount, orderCode)
        }}
        onCancel={() => {
          setSepaySandboxOrder(null)
        }}
      />
    )
  }

  if (walletOpen) {
    return (
      <>
        <Navbar
          active={activeNav}
          setActive={(v) => {
            setWalletOpen(false)
            setActiveNav(v)
          }}
          onOpenMyProfile={openMyProfile}
          onOpenWallet={openWallet}
          onOpenFinancialHistory={() => {
            setWalletOpen(false)
            setFinancialHistoryOpen(true)
          }}
          onLogout={onLogout}
        />
        <MyWalletPage
          balance={walletBalance}
          transactions={walletTransactions}
          onOpenDeposit={() => setDepositModalOpen(true)}
          onOpenWithdraw={() => setWithdrawModalOpen(true)}
          onBack={() => setWalletOpen(false)}
          onOpenFinancialHistory={() => {
            setWalletOpen(false)
            setFinancialHistoryOpen(true)
          }}
        />
        {depositModalOpen && (
          <DepositModal
            balance={walletBalance}
            onClose={() => setDepositModalOpen(false)}
            onProceedToSepay={(amount) => {
              setDepositModalOpen(false)
              handleOpenSepaySandbox(amount)
            }}
          />
        )}
        {withdrawModalOpen && (
          <WithdrawModal
            balance={walletBalance}
            onClose={() => setWithdrawModalOpen(false)}
            onConfirmWithdraw={(bank, accountNumber, amount, accountName) => {
              handleWithdraw(bank, accountNumber, amount, accountName)
              setWithdrawModalOpen(false)
            }}
          />
        )}
        {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      </>
    )
  }

  if (financialHistoryOpen) {
    return (
      <>
        <Navbar
          active={activeNav}
          setActive={(v) => {
            setFinancialHistoryOpen(false)
            setActiveNav(v)
          }}
          onOpenMyProfile={openMyProfile}
          onOpenWallet={() => {
            setFinancialHistoryOpen(false)
            openWallet()
          }}
          onOpenFinancialHistory={() => setFinancialHistoryOpen(true)}
          onLogout={onLogout}
        />
        <FinancialHistoryPage onBack={() => setFinancialHistoryOpen(false)} />
      </>
    )
  }

  if (myProfileOpen) {
    return (
      <>
        <Navbar
          active={activeNav}
          setActive={(v) => {
            closeMyProfile()
            setActiveNav(v)
          }}
          onOpenMyProfile={openMyProfile}
          onOpenWallet={() => {
            closeMyProfile()
            openWallet()
          }}
          onOpenFinancialHistory={() => setFinancialHistoryOpen(true)}
          onLogout={onLogout}
        />
        <MyProfilePage onBack={closeMyProfile} isOwnProfile={!viewingUser} />
      </>
    )
  }

  if (selectedContract) {
    return (
      <>
        <Navbar
          active={activeNav}
          setActive={(v) => {
            setSelectedContract(null)
            setActiveNav(v)
          }}
          onOpenMyProfile={openMyProfile}
          onOpenWallet={() => {
            setSelectedContract(null)
            openWallet()
          }}
          onOpenFinancialHistory={() => setFinancialHistoryOpen(true)}
          onLogout={onLogout}
        />
        <ContractDetailsPage
          contract={selectedContract}
          onBack={() => setSelectedContract(null)}
        />
      </>
    )
  }

  return (
    <div style={{ minHeight: "100%", background: "#F4F2EE" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button, input, textarea, select { font-family: 'Source Sans 3', sans-serif; }
        @media (max-width: 1000px) {
          .three-col { grid-template-columns: 226px 1fr !important; }
          .three-col > *:last-child { display: none !important; }
        }
        @media (max-width: 680px) {
          .three-col { grid-template-columns: 1fr !important; }
          .three-col > *:first-child { display: none !important; }
          .net-layout { flex-direction: column !important; }
          .net-layout > *:first-child { width: 100% !important; }
          .recommend-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <Navbar
        active={activeNav}
        setActive={setActiveNav}
        onOpenMyProfile={openMyProfile}
        onOpenWallet={openWallet}
        onOpenFinancialHistory={() => setFinancialHistoryOpen(true)}
        onLogout={onLogout}
      />

      {activeNav === "home" && (
        <NewHomePage
          savedJobIds={savedJobIds}
          onToggleSaveJob={toggleSaveJob}
          onSelectContract={setSelectedContract}
          onViewProfile={openOtherProfile}
          onOpenFinancialHistory={() => setFinancialHistoryOpen(true)}
          onOpenWallet={openWallet}
          onNavigateProjects={() => setActiveNav("projects")}
        />
      )}

      {activeNav === "projects" && (
        <ProjectsManagementPage
          onSelectContract={setSelectedContract}
          onViewProfile={openOtherProfile}
        />
      )}

      {activeNav === "saved" && (
        <SavedItemsPage
          savedJobIds={savedJobIds}
          onToggleSave={toggleSaveJob}
          onSelectContract={setSelectedContract}
          onExploreJobs={() => setActiveNav("home")}
        />
      )}

      {activeNav === "notifications" && <NotificationsPage />}

      {!["home", "projects", "saved", "notifications"].includes(activeNav) && (
        <NewHomePage
          savedJobIds={savedJobIds}
          onToggleSaveJob={toggleSaveJob}
          onSelectContract={setSelectedContract}
          onViewProfile={openOtherProfile}
          onOpenFinancialHistory={() => setFinancialHistoryOpen(true)}
          onNavigateProjects={() => setActiveNav("projects")}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

// ─── Admin Management Portal ──────────────────────────────────────────────────

const ADMIN_USERS_DATA = [
  {
    id: 1,
    name: "Nguyễn Minh Khoa",
    email: "minhkhoa@gmail.com",
    role: "Freelancer",
    status: "Hoạt động",
    joined: "12/01/2024",
    initials: "NK",
    color: "#0A66C2",
  },
  {
    id: 2,
    name: "Trần Thị Hương",
    email: "thuong.tran@tiki.vn",
    role: "Client",
    status: "Hoạt động",
    joined: "08/03/2024",
    initials: "TH",
    color: "#057642",
  },
  {
    id: 3,
    name: "Lê Văn Đức",
    email: "leduc.dev@gmail.com",
    role: "Freelancer",
    status: "Bị gắn cờ",
    joined: "22/11/2023",
    initials: "LĐ",
    color: "#B06000",
  },
  {
    id: 4,
    name: "Phạm Quỳnh Anh",
    email: "quynhanh@shopee.com",
    role: "Client",
    status: "Hoạt động",
    joined: "05/06/2024",
    initials: "QA",
    color: "#8B5CF6",
  },
  {
    id: 5,
    name: "Vũ Tiến Dũng",
    email: "tiendung.vu@vnpay.vn",
    role: "Freelancer",
    status: "Bị khóa",
    joined: "17/09/2023",
    initials: "VD",
    color: "#C03A2B",
  },
  {
    id: 6,
    name: "Đỗ Thị Lan Anh",
    email: "lananh.do@momo.vn",
    role: "Client",
    status: "Hoạt động",
    joined: "30/04/2024",
    initials: "LA",
    color: "#0891B2",
  },
  {
    id: 7,
    name: "Hoàng Minh Tuấn",
    email: "hoangtuan.dev@gmail.com",
    role: "Freelancer",
    status: "Bị gắn cờ",
    joined: "14/02/2024",
    initials: "MT",
    color: "#D97706",
  },
  {
    id: 8,
    name: "Bùi Thị Ngọc",
    email: "buingoc@fpt.edu.vn",
    role: "Client",
    status: "Hoạt động",
    joined: "20/07/2024",
    initials: "BN",
    color: "#059669",
  },
  {
    id: 9,
    name: "Ngô Đức Hải",
    email: "duchaiseo@gmail.com",
    role: "Freelancer",
    status: "Hoạt động",
    joined: "03/12/2023",
    initials: "NH",
    color: "#6366F1",
  },
  {
    id: 10,
    name: "Đinh Thị Thu",
    email: "dinhthithu@vingroup.net",
    role: "Client",
    status: "Bị khóa",
    joined: "28/08/2023",
    initials: "DT",
    color: "#EC4899",
  },
  {
    id: 11,
    name: "Cao Trung Kiên",
    email: "kienct@grab.com",
    role: "Freelancer",
    status: "Hoạt động",
    joined: "11/05/2024",
    initials: "CK",
    color: "#16A34A",
  },
  {
    id: 12,
    name: "Lý Thanh Hà",
    email: "thanhha.ly@vinai.io",
    role: "Client",
    status: "Bị gắn cờ",
    joined: "07/10/2023",
    initials: "LH",
    color: "#9333EA",
  },
]

type AdminUser = typeof ADMIN_USERS_DATA[0]

const ADMIN_PROJECTS = [
  {
    id: 1,
    title: "Thiết kế UI/UX cho ứng dụng quản lý nội bộ",
    owner: { name: "Phạm Quỳnh Anh", initials: "QA", color: "#8B5CF6" },
    budget: "15.000.000 ₫",
    budgetType: "Cố định",
    field: "Thiết kế",
    applicants: 12,
    status: "Đang tuyển",
    date: "10/09/2026",
    description:
      "Cần designer có kinh nghiệm thiết kế hệ thống quản lý nội bộ cho doanh nghiệp vừa và nhỏ. Hệ thống bao gồm dashboard, báo cáo, và quản lý nhân sự.",
    skills: ["Figma", "UI/UX", "Design System", "Prototyping"],
    applicantList: [
      {
        name: "Lê Văn Đức",
        initials: "LĐ",
        color: "#B06000",
        date: "11/09/2026",
        bid: "14.500.000 ₫",
      },
      {
        name: "Hoàng Minh Tuấn",
        initials: "MT",
        color: "#D97706",
        date: "12/09/2026",
        bid: "15.000.000 ₫",
      },
    ],
  },
  {
    id: 2,
    title: "Phát triển backend API cho hệ thống thương mại điện tử",
    owner: { name: "Trần Thị Hương", initials: "TH", color: "#057642" },
    budget: "25.000.000 ₫",
    budgetType: "Hàng tháng",
    field: "Lập trình",
    applicants: 8,
    status: "Đang thực hiện",
    date: "05/08/2026",
    description:
      "Cần backend developer với kinh nghiệm Node.js hoặc Golang để xây dựng hệ thống API RESTful, tích hợp cổng thanh toán, và xử lý đơn hàng.",
    skills: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    applicantList: [
      {
        name: "Ngô Đức Hải",
        initials: "NH",
        color: "#6366F1",
        date: "06/08/2026",
        bid: "24.000.000 ₫",
      },
    ],
  },
  {
    id: 3,
    title: "Marketing content cho chiến dịch ra mắt sản phẩm Q4",
    owner: { name: "Đỗ Thị Lan Anh", initials: "LA", color: "#0891B2" },
    budget: "8.000.000 ₫",
    budgetType: "Cố định",
    field: "Marketing",
    applicants: 20,
    status: "Đã đóng",
    date: "01/07/2026",
    description:
      "Cần content writer và marketer để xây dựng chiến lược nội dung, viết bài blog, email marketing và quản lý mạng xã hội cho chiến dịch Q4.",
    skills: ["Content Writing", "SEO", "Social Media", "Email Marketing"],
    applicantList: [
      {
        name: "Bùi Thị Ngọc",
        initials: "BN",
        color: "#059669",
        date: "02/07/2026",
        bid: "7.800.000 ₫",
      },
      {
        name: "Lý Thanh Hà",
        initials: "LH",
        color: "#9333EA",
        date: "03/07/2026",
        bid: "8.200.000 ₫",
      },
    ],
  },
  {
    id: 4,
    title: "Xây dựng hệ thống CRM cho doanh nghiệp bảo hiểm",
    owner: { name: "Cao Trung Kiên", initials: "CK", color: "#16A34A" },
    budget: "40.000.000 ₫",
    budgetType: "Hàng tháng",
    field: "Lập trình",
    applicants: 5,
    status: "Đang tuyển",
    date: "14/09/2026",
    description:
      "Cần team full-stack xây dựng CRM tích hợp với hệ thống bảo hiểm hiện có, bao gồm quản lý khách hàng, hợp đồng, và tự động hóa quy trình.",
    skills: ["React", "Django", "PostgreSQL", "AWS"],
    applicantList: [],
  },
  {
    id: 5,
    title: "Thiết kế logo và bộ nhận diện thương hiệu startup fintech",
    owner: { name: "Đinh Thị Thu", initials: "DT", color: "#EC4899" },
    budget: "6.000.000 ₫",
    budgetType: "Cố định",
    field: "Thiết kế",
    applicants: 31,
    status: "Đang thực hiện",
    date: "20/08/2026",
    description:
      "Cần graphic designer thiết kế logo, bảng màu, typography, và các tài liệu truyền thông cơ bản cho startup fintech mới thành lập.",
    skills: ["Illustrator", "Branding", "Logo Design", "Typography"],
    applicantList: [
      {
        name: "Nguyễn Minh Khoa",
        initials: "NK",
        color: "#0A66C2",
        date: "21/08/2026",
        bid: "5.900.000 ₫",
      },
    ],
  },
  {
    id: 6,
    title: "Data Analytics dashboard cho hệ thống logistics",
    owner: { name: "Vũ Tiến Dũng", initials: "VD", color: "#C03A2B" },
    budget: "20.000.000 ₫",
    budgetType: "Cố định",
    field: "Data / AI",
    applicants: 9,
    status: "Đang tuyển",
    date: "08/09/2026",
    description:
      "Cần data analyst xây dựng dashboard theo dõi hiệu suất vận chuyển, phân tích tuyến đường, và dự báo nhu cầu bằng Power BI hoặc Tableau.",
    skills: ["Power BI", "SQL", "Python", "Data Visualization"],
    applicantList: [
      {
        name: "Cao Trung Kiên",
        initials: "CK",
        color: "#16A34A",
        date: "09/09/2026",
        bid: "19.500.000 ₫",
      },
    ],
  },
]

const ADMIN_CONTRACTS = [
  {
    id: "#HD-8921",
    project: "Phát triển backend API thương mại điện tử",
    client: { name: "Trần Thị Hương", initials: "TH", color: "#057642" },
    freelancer: { name: "Ngô Đức Hải", initials: "NH", color: "#6366F1" },
    payment: "24.000.000 ₫ / tháng",
    dateRange: "01/08/2026 - 01/02/2027",
    status: "Đang thực hiện",
  },
  {
    id: "#HD-8754",
    project: "Thiết kế logo startup fintech",
    client: { name: "Đinh Thị Thu", initials: "DT", color: "#EC4899" },
    freelancer: { name: "Nguyễn Minh Khoa", initials: "NK", color: "#0A66C2" },
    payment: "5.900.000 ₫ (Cố định)",
    dateRange: "22/08/2026 - 15/09/2026",
    status: "Đang thực hiện",
  },
  {
    id: "#HD-8612",
    project: "Marketing content chiến dịch Q3",
    client: { name: "Đỗ Thị Lan Anh", initials: "LA", color: "#0891B2" },
    freelancer: { name: "Bùi Thị Ngọc", initials: "BN", color: "#059669" },
    payment: "7.800.000 ₫ (Cố định)",
    dateRange: "05/06/2026 - 31/08/2026",
    status: "Hoàn thành",
  },
  {
    id: "#HD-8431",
    project: "Phát triển app iOS cho startup y tế",
    client: { name: "Lý Thanh Hà", initials: "LH", color: "#9333EA" },
    freelancer: { name: "Hoàng Minh Tuấn", initials: "MT", color: "#D97706" },
    payment: "18.000.000 ₫ / tháng",
    dateRange: "10/04/2026 - 10/07/2026",
    status: "Đã hủy / Thất bại",
  },
  {
    id: "#HD-8300",
    project: "SEO & content website tài chính",
    client: { name: "Cao Trung Kiên", initials: "CK", color: "#16A34A" },
    freelancer: { name: "Lê Văn Đức", initials: "LĐ", color: "#B06000" },
    payment: "500.000 ₫ / giờ",
    dateRange: "15/03/2026 - 15/09/2026",
    status: "Đang thực hiện",
  },
  {
    id: "#HD-8189",
    project: "Xây dựng chatbot tư vấn bán hàng",
    client: { name: "Phạm Quỳnh Anh", initials: "QA", color: "#8B5CF6" },
    freelancer: { name: "Ngô Đức Hải", initials: "NH", color: "#6366F1" },
    payment: "12.000.000 ₫ (Cố định)",
    dateRange: "01/02/2026 - 31/03/2026",
    status: "Hoàn thành",
  },
  {
    id: "#HD-8044",
    project: "Dịch thuật tài liệu kỹ thuật Anh-Việt",
    client: { name: "Bùi Thị Ngọc", initials: "BN", color: "#059669" },
    freelancer: { name: "Đinh Thị Thu", initials: "DT", color: "#EC4899" },
    payment: "200.000 ₫ / giờ",
    dateRange: "01/01/2026 - 28/02/2026",
    status: "Hoàn thành",
  },
  {
    id: "#HD-7902",
    project: "Kiểm thử bảo mật hệ thống ngân hàng",
    client: { name: "Vũ Tiến Dũng", initials: "VD", color: "#C03A2B" },
    freelancer: { name: "Lý Thanh Hà", initials: "LH", color: "#9333EA" },
    payment: "30.000.000 ₫ (Cố định)",
    dateRange: "01/11/2025 - 28/02/2026",
    status: "Đã hủy / Thất bại",
  },
]

const ADMIN_VIOLATIONS = [
  {
    id: "#RP-1041",
    reporter: { name: "Trần Thị Hương", initials: "TH", color: "#057642" },
    target: "Tài khoản: @tiendung_vn",
    category: "Tài khoản",
    time: "14/09/2026 14:15",
    status: "Chờ xử lý",
    reason:
      "Tài khoản liên tục spam tin nhắn quảng cáo không liên quan vào các dự án và nhóm.",
    evidence:
      "Tài khoản @tiendung_vn đã gửi 150+ tin nhắn spam trong 48 giờ cho nhiều freelancer và client. Nội dung là quảng cáo dịch vụ bên ngoài platform.",
  },
  {
    id: "#RP-1039",
    reporter: { name: "Hoàng Minh Tuấn", initials: "MT", color: "#D97706" },
    target: "Dự án: #HD-8431",
    category: "Dự án",
    time: "13/09/2026 11:00",
    status: "Đã giải quyết",
    reason:
      "Client từ chối thanh toán sau khi nhận kết quả, vi phạm điều khoản hợp đồng.",
    evidence:
      "Hợp đồng #HD-8431 đã bị hủy đơn phương bởi client sau khi freelancer giao sản phẩm hoàn chỉnh. Client không cung cấp lý do hợp lệ.",
  },
  {
    id: "#RP-1035",
    reporter: { name: "Ngô Đức Hải", initials: "NH", color: "#6366F1" },
    target: "Tài khoản: @lananh_designer",
    category: "Tài khoản",
    time: "10/09/2026 16:30",
    status: "Chờ xử lý",
    reason:
      "Tài khoản sử dụng portfolio người khác để đăng ký dự án, vi phạm bản quyền.",
    evidence:
      "Người dùng @lananh_designer đã tải lên 12 ảnh thiết kế của Dribbble user khác và tuyên bố là sản phẩm của mình khi nộp hồ sơ cho 5 dự án thiết kế khác nhau.",
  },
]

type AdminProject = typeof ADMIN_PROJECTS[0]
type AdminContract = typeof ADMIN_CONTRACTS[0]
type AdminViolation = typeof ADMIN_VIOLATIONS[0]

function AdminPortal({ onBack }: { onBack: () => void }) {
  const [activeNav, setActiveNav] = useState<"users" | "projects" | "contracts" | "violations">("users")
  const [toast, setToast] = useState<string | null>(null)

  // ── 1. USERS STATE ────────────────────────────────────────────────────────
  const [users, setUsers] = useState(ADMIN_USERS_DATA)
  const [userSearch, setUserSearch] = useState("")
  const [userStatusFilter, setUserStatusFilter] = useState("Tất cả")
  const [userRoleFilter, setUserRoleFilter] = useState("Tất cả")
  const [userCurrentPage, setUserCurrentPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null)
  const [deleteReason, setDeleteReason] = useState("")
  const [userDetailModal, setUserDetailModal] = useState<AdminUser | null>(null)
  const ROWS_PER_PAGE = 8

  // ── 2. PROJECTS STATE ─────────────────────────────────────────────────────
  const [projects, setProjects] = useState(ADMIN_PROJECTS)
  const [projectSearch, setProjectSearch] = useState("")
  const [projectStatusFilter, setProjectStatusFilter] = useState("Tất cả")
  const [projectDetail, setProjectDetail] = useState<AdminProject | null>(null)
  const [projectDeleteTarget, setProjectDeleteTarget] = useState<AdminProject | null>(null)
  const [projectDeleteReason, setProjectDeleteReason] = useState("")

  // ── 3. CONTRACTS STATE ────────────────────────────────────────────────────
  const [contracts] = useState(ADMIN_CONTRACTS)
  const [contractSearch, setContractSearch] = useState("")
  const [contractStatusFilter, setContractStatusFilter] = useState("Tất cả")
  const [selectedContractDetail, setSelectedContractDetail] = useState<AdminContract | null>(null)

  // ── 4. VIOLATIONS STATE ───────────────────────────────────────────────────
  const [violations, setViolations] = useState(ADMIN_VIOLATIONS)
  const [violationSearch, setViolationSearch] = useState("")
  const [violationCategoryFilter, setViolationCategoryFilter] = useState("Tất cả")
  const [violationStatusFilter, setViolationStatusFilter] = useState("Tất cả")
  const [evidenceTarget, setEvidenceTarget] = useState<AdminViolation | null>(null)

  // Counts for Badges & Sub-filters
  const flaggedUsersCount = users.filter((u) => u.status === "Bị gắn cờ").length
  const lockedUsersCount = users.filter((u) => u.status === "Bị khóa").length
  const activeUsersCount = users.filter((u) => u.status === "Hoạt động").length

  const hiringProjectsCount = projects.filter((p) => p.status === "Đang tuyển").length
  const inProgressProjectsCount = projects.filter((p) => p.status === "Đang thực hiện").length
  const closedProjectsCount = projects.filter((p) => p.status === "Đã đóng").length

  const pendingViolationsCount = violations.filter((v) => v.status === "Chờ xử lý").length

  // Helper toggle handlers
  const handleToggleFlag = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Bị gắn cờ" ? "Hoạt động" : "Bị gắn cờ" }
          : u
      )
    )
    if (userDetailModal && userDetailModal.id === id) {
      setUserDetailModal((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "Bị gắn cờ" ? "Hoạt động" : "Bị gắn cờ",
            }
          : null
      )
    }
    setToast("Đã cập nhật trạng thái cờ người dùng!")
  }

  const handleToggleLock = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Bị khóa" ? "Hoạt động" : "Bị khóa" }
          : u
      )
    )
    if (userDetailModal && userDetailModal.id === id) {
      setUserDetailModal((prev) =>
        prev
          ? { ...prev, status: prev.status === "Bị khóa" ? "Hoạt động" : "Bị khóa" }
          : null
      )
    }
    setToast("Đã cập nhật trạng thái khóa tài khoản!")
  }

  // ── FILTERED DATA ─────────────────────────────────────────────────────────

  // Users filtered
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      !userSearch ||
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    const matchStatus =
      userStatusFilter === "Tất cả" || u.status === userStatusFilter
    const matchRole =
      userRoleFilter === "Tất cả" || u.role === userRoleFilter
    return matchSearch && matchStatus && matchRole
  })

  const userTotalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ROWS_PER_PAGE)
  )
  const paginatedUsers = filteredUsers.slice(
    (userCurrentPage - 1) * ROWS_PER_PAGE,
    userCurrentPage * ROWS_PER_PAGE
  )

  // Projects filtered
  const filteredProjects = projects.filter((p) => {
    const q = projectSearch.toLowerCase()
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.owner.name.toLowerCase().includes(q)
    const matchS =
      projectStatusFilter === "Tất cả" || p.status === projectStatusFilter
    return matchQ && matchS
  })

  // Contracts filtered
  const filteredContracts = contracts.filter((c) => {
    const q = contractSearch.toLowerCase()
    const matchQ =
      !q ||
      c.id.toLowerCase().includes(q) ||
      c.project.toLowerCase().includes(q) ||
      c.client.name.toLowerCase().includes(q) ||
      c.freelancer.name.toLowerCase().includes(q)
    const matchS =
      contractStatusFilter === "Tất cả" || c.status === contractStatusFilter
    return matchQ && matchS
  })

  // Violations filtered (Không có "Bài viết")
  const filteredViolations = violations.filter((v) => {
    const q = violationSearch.toLowerCase()
    const matchQ =
      !q ||
      v.id.toLowerCase().includes(q) ||
      v.reporter.name.toLowerCase().includes(q) ||
      v.target.toLowerCase().includes(q)
    const matchCat =
      violationCategoryFilter === "Tất cả" || v.category === violationCategoryFilter
    const matchStatus =
      violationStatusFilter === "Tất cả" || v.status === violationStatusFilter
    return matchQ && matchCat && matchStatus
  })

  // Semantic Status Badges
  const renderStatusBadge = (status: string) => {
    const map: Record<string, { bg: string; fg: string }> = {
      "Hoạt động": { bg: "#E6F4EA", fg: "#137333" },
      "Đang tuyển": { bg: "#EAF1FA", fg: "#0A66C2" },
      "Đang thực hiện": { bg: "#EAF1FA", fg: "#0A66C2" },
      "Hoàn thành": { bg: "#E6F4EA", fg: "#137333" },
      "Đã giải quyết": { bg: "#E6F4EA", fg: "#137333" },
      "Bị gắn cờ": { bg: "#FEF7E0", fg: "#B06000" },
      "Chờ xử lý": { bg: "#FEF7E0", fg: "#B06000" },
      "Bị khóa": { bg: "#FCE8E6", fg: "#C03A2B" },
      "Đã hủy / Thất bại": { bg: "#FCE8E6", fg: "#C03A2B" },
      "Đã bác bỏ": { bg: "#FCE8E6", fg: "#C03A2B" },
      "Đã đóng": { bg: "#F4F2EE", fg: "rgba(0,0,0,0.50)" },
    }
    const c = map[status] ?? { bg: "#F4F2EE", fg: "rgba(0,0,0,0.65)" }
    return (
      <span
        style={{
          background: c.bg,
          color: c.fg,
          fontSize: 12,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 9999,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          whiteSpace: "nowrap",
        }}
      >
        {status}
      </span>
    )
  }

  // ── 4 CORE NAV ITEMS ──────────────────────────────────────────────────────
  const NAV_ITEMS = [
    {
      id: "users" as const,
      label: "Quản lý tài khoản",
      Icon: UsersThree,
      badge: flaggedUsersCount > 0 ? flaggedUsersCount : null,
      badgeColor: "#B06000",
      badgeBg: "#FEF7E0",
    },
    {
      id: "projects" as const,
      label: "Quản lý dự án",
      Icon: BriefcaseMetal,
      badge: null,
      badgeColor: "#0A66C2",
      badgeBg: "#EAF1FA",
    },
    {
      id: "contracts" as const,
      label: "Quản lý hợp đồng",
      Icon: FileText,
      badge: null,
      badgeColor: "#0A66C2",
      badgeBg: "#EAF1FA",
    },
    {
      id: "violations" as const,
      label: "Báo cáo vi phạm",
      Icon: ShieldCheck,
      badge: pendingViolationsCount > 0 ? pendingViolationsCount : null,
      badgeColor: "#C03A2B",
      badgeBg: "#FCE8E6",
    },
  ]

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F2EE" }}>
      {/* ── Fixed Sidebar ───────────────────────────────────────────────── */}
      <aside
        style={{
          width: 260,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          background: "#fff",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          zIndex: 30,
        }}
      >
        {/* Brand header */}
        <div
          style={{
            height: 64,
            padding: "0 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#0A66C2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BriefcaseMetal size={18} color="#fff" weight="fill" />
          </div>
          <span
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#0A66C2",
              letterSpacing: "-0.4px",
            }}
          >
            Occupify
          </span>
          <span
            style={{
              background: "#EAF1FA",
              color: "#0A66C2",
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 4,
              flexShrink: 0,
            }}
          >
            Admin Portal
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "18px 12px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              color: "rgba(0,0,0,0.40)",
              padding: "0 10px 8px",
            }}
          >
            Bảng điều khiển cốt lõi
          </div>

          {NAV_ITEMS.map(({ id, label, Icon, badge, badgeColor, badgeBg }) => {
            const isActive = activeNav === id
            return (
              <button
                key={id}
                onClick={() => {
                  setActiveNav(id)
                  setUserCurrentPage(1)
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: isActive ? "#EAF1FA" : "transparent",
                  color: isActive ? "#0A66C2" : "rgba(0,0,0,0.70)",
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.background = "#FAFAF8"
                    ;(e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.90)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.background = "transparent"
                    ;(e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.70)"
                  }
                }}
              >
                <Icon
                  size={18}
                  weight={isActive ? "fill" : "regular"}
                  style={{ flexShrink: 0 }}
                />
                <span style={{ flex: 1 }}>{label}</span>
                {badge !== null && badge > 0 && (
                  <span
                    style={{
                      background: badgeBg,
                      color: badgeColor,
                      fontSize: 11,
                      fontWeight: 700,
                      minWidth: 20,
                      height: 18,
                      borderRadius: 9,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 6px",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer Admin info + Back button */}
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            padding: "16px",
            background: "#FAFAF8",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#0A66C2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#fff",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              AD
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.90)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Quản trị viên
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(0,0,0,0.45)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                admin@occupify.vn
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 9999,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "#fff",
              color: "rgba(0,0,0,0.75)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#EAF1FA"
              ;(e.currentTarget as HTMLElement).style.color = "#0A66C2"
              ;(e.currentTarget as HTMLElement).style.borderColor = "#0A66C2"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#fff"
              ;(e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.75)"
              ;(e.currentTarget as HTMLElement).style.borderColor =
                "rgba(0,0,0,0.15)"
            }}
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Quay lại Occupify</span>
          </button>
        </div>
      </aside>

      {/* ── Main Workspace ──────────────────────────────────────────────── */}
      <main style={{ marginLeft: 260, flex: 1, minHeight: "100vh", padding: "32px 40px" }}>
        {/* ═══════════════════════════════════════════════════════════════════
            TAB 1: QUẢN LÝ TÀI KHOẢN (ACCOUNTS MANAGEMENT)
           ═══════════════════════════════════════════════════════════════════ */}
        {activeNav === "users" && (
          <div>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "rgba(0,0,0,0.90)",
                    letterSpacing: "-0.02em",
                    marginBottom: 4,
                  }}
                >
                  Quản lý tài khoản
                </h1>
                <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
                  Kiểm soát người dùng, phân loại đối tượng, xử lý vi phạm và bảo vệ an toàn nền tảng
                </p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                {flaggedUsersCount > 0 && (
                  <div
                    style={{
                      background: "#FEF7E0",
                      color: "#B06000",
                      padding: "6px 14px",
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Warning size={15} weight="fill" />
                    <span>{flaggedUsersCount} tài khoản cần xem xét</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Status Filter Tabs */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 16,
                flexWrap: "wrap",
              }}
            >
              {[
                { key: "Tất cả", label: "Tất cả", count: users.length },
                { key: "Hoạt động", label: "Hoạt động", count: activeUsersCount },
                { key: "Bị gắn cờ", label: "Bị gắn cờ", count: flaggedUsersCount, highlight: true },
                { key: "Bị khóa", label: "Bị khóa", count: lockedUsersCount },
              ].map((tab) => {
                const isSelected = userStatusFilter === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setUserStatusFilter(tab.key)
                      setUserCurrentPage(1)
                    }}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 9999,
                      border: isSelected ? "none" : "1px solid rgba(0,0,0,0.12)",
                      background: isSelected ? "#0A66C2" : "#fff",
                      color: isSelected ? "#fff" : "rgba(0,0,0,0.70)",
                      fontSize: 13,
                      fontWeight: isSelected ? 700 : 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 120ms",
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      style={{
                        background: isSelected
                          ? "rgba(255,255,255,0.25)"
                          : tab.highlight && tab.count > 0
                          ? "#FEF7E0"
                          : "#F4F2EE",
                        color: isSelected
                          ? "#fff"
                          : tab.highlight && tab.count > 0
                          ? "#B06000"
                          : "rgba(0,0,0,0.60)",
                        padding: "1px 6px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search & Role Filter Bar */}
            <div
              style={{
                background: "#fff",
                padding: "12px 16px",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                marginBottom: 16,
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 400 }}>
                <MagnifyingGlass
                  size={15}
                  color="rgba(0,0,0,0.40)"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  value={userSearch}
                  onChange={(e) => {
                    setUserSearch(e.target.value)
                    setUserCurrentPage(1)
                  }}
                  placeholder="Tìm theo họ tên hoặc email..."
                  style={{
                    width: "100%",
                    background: "#F4F2EE",
                    border: "1px solid transparent",
                    borderRadius: 6,
                    padding: "8px 12px 8px 34px",
                    fontSize: 13.5,
                    outline: "none",
                    color: "rgba(0,0,0,0.90)",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = "#0A66C2"
                  }}
                  onBlur={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = "transparent"
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", fontWeight: 600 }}>
                  Vai trò:
                </span>
                <select
                  value={userRoleFilter}
                  onChange={(e) => {
                    setUserRoleFilter(e.target.value)
                    setUserCurrentPage(1)
                  }}
                  style={{
                    padding: "7px 12px",
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.15)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    color: "rgba(0,0,0,0.80)",
                    background: "#fff",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option>Tất cả</option>
                  <option>Client</option>
                  <option>Freelancer</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFAF8", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    {[
                      "Người dùng",
                      "Email",
                      "Vai trò",
                      "Trạng thái",
                      "Ngày tham gia",
                      "Thao tác",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 18px",
                          textAlign: "left",
                          fontSize: 11.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.6,
                          color: "rgba(0,0,0,0.50)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: "50px 20px",
                          textAlign: "center",
                          color: "rgba(0,0,0,0.40)",
                          fontSize: 14,
                        }}
                      >
                        Không tìm thấy người dùng nào phù hợp.
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((u) => (
                      <tr
                        key={u.id}
                        style={{
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          transition: "background 120ms",
                        }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.background = "#FAFAF8"
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.background = "transparent"
                        }}
                      >
                        <td style={{ padding: "12px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                background: u.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                color: "#fff",
                                fontSize: 11.5,
                                fontWeight: 800,
                              }}
                            >
                              {u.initials}
                            </div>
                            <span
                              onClick={() => setUserDetailModal(u)}
                              style={{
                                fontSize: 13.5,
                                fontWeight: 700,
                                color: "rgba(0,0,0,0.90)",
                                cursor: "pointer",
                              }}
                            >
                              {u.name}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "12px 18px", fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
                          {u.email}
                        </td>
                        <td style={{ padding: "12px 18px" }}>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: u.role === "Freelancer" ? "#0A66C2" : "#057642",
                              background: u.role === "Freelancer" ? "#EAF1FA" : "#E6F4EA",
                              padding: "3px 10px",
                              borderRadius: 9999,
                            }}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: "12px 18px" }}>
                          {renderStatusBadge(u.status)}
                        </td>
                        <td style={{ padding: "12px 18px", fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                          {u.joined}
                        </td>
                        <td style={{ padding: "12px 18px" }}>
                          <button
                            onClick={() => setUserDetailModal(u)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#0A66C2",
                              padding: "4px 8px",
                              borderRadius: 4,
                            }}
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {userTotalPages > 1 && (
                <div
                  style={{
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    background: "#FAFAF8",
                  }}
                >
                  <span style={{ fontSize: 13, color: "rgba(0,0,0,0.60)" }}>
                    Trang {userCurrentPage} / {userTotalPages} ({filteredUsers.length} tài khoản)
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      disabled={userCurrentPage <= 1}
                      onClick={() => setUserCurrentPage((p) => Math.max(1, p - 1))}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 6,
                        border: "1px solid rgba(0,0,0,0.15)",
                        background: "#fff",
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: userCurrentPage <= 1 ? "default" : "pointer",
                        opacity: userCurrentPage <= 1 ? 0.4 : 1,
                      }}
                    >
                      Trước
                    </button>
                    <button
                      disabled={userCurrentPage >= userTotalPages}
                      onClick={() => setUserCurrentPage((p) => Math.min(userTotalPages, p + 1))}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 6,
                        border: "1px solid rgba(0,0,0,0.15)",
                        background: "#fff",
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: userCurrentPage >= userTotalPages ? "default" : "pointer",
                        opacity: userCurrentPage >= userTotalPages ? 0.4 : 1,
                      }}
                    >
                      Tiếp theo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 2: QUẢN LÝ DỰ ÁN (PROJECTS MANAGEMENT)
           ═══════════════════════════════════════════════════════════════════ */}
        {activeNav === "projects" && (
          <div>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "rgba(0,0,0,0.90)",
                    letterSpacing: "-0.02em",
                    marginBottom: 4,
                  }}
                >
                  Quản lý dự án
                </h1>
                <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
                  Kiểm duyệt dự án đăng tuyển, kiểm tra danh sách người tham gia và loại bỏ các dự án vi phạm chính sách
                </p>
              </div>
            </div>

            {/* Quick Filter Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[
                { key: "Tất cả", label: "Tất cả", count: projects.length },
                { key: "Đang tuyển", label: "Đang tuyển", count: hiringProjectsCount },
                { key: "Đang thực hiện", label: "Đang thực hiện", count: inProgressProjectsCount },
                { key: "Đã đóng", label: "Đã đóng", count: closedProjectsCount },
              ].map((tab) => {
                const isSelected = projectStatusFilter === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setProjectStatusFilter(tab.key)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 9999,
                      border: isSelected ? "none" : "1px solid rgba(0,0,0,0.12)",
                      background: isSelected ? "#0A66C2" : "#fff",
                      color: isSelected ? "#fff" : "rgba(0,0,0,0.70)",
                      fontSize: 13,
                      fontWeight: isSelected ? 700 : 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      style={{
                        background: isSelected ? "rgba(255,255,255,0.25)" : "#F4F2EE",
                        color: isSelected ? "#fff" : "rgba(0,0,0,0.60)",
                        padding: "1px 6px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search Bar */}
            <div
              style={{
                background: "#fff",
                padding: "12px 16px",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                marginBottom: 16,
              }}
            >
              <div style={{ position: "relative", maxWidth: 440 }}>
                <MagnifyingGlass
                  size={15}
                  color="rgba(0,0,0,0.40)"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Tìm theo tên dự án hoặc chủ dự án..."
                  style={{
                    width: "100%",
                    background: "#F4F2EE",
                    border: "1px solid transparent",
                    borderRadius: 6,
                    padding: "8px 12px 8px 34px",
                    fontSize: 13.5,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Table */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFAF8", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    {[
                      "Tên dự án",
                      "Chủ dự án",
                      "Ngân sách",
                      "Lĩnh vực",
                      "Người tham gia",
                      "Trạng thái",
                      "Ngày đăng",
                      "Thao tác",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 18px",
                          textAlign: "left",
                          fontSize: 11.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.6,
                          color: "rgba(0,0,0,0.50)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p) => (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                        transition: "background 120ms",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "#FAFAF8"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "transparent"
                      }}
                    >
                      <td style={{ padding: "12px 18px", maxWidth: 280 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 13.5,
                            color: "rgba(0,0,0,0.90)",
                            lineHeight: 1.4,
                          }}
                        >
                          {p.title}
                        </div>
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: p.owner.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: 10.5,
                              fontWeight: 800,
                            }}
                          >
                            {p.owner.initials}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{p.owner.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ fontWeight: 700, fontSize: 13.5, color: "#057642" }}>
                          {p.budget}
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)" }}>
                          {p.budgetType}
                        </div>
                      </td>
                      <td style={{ padding: "12px 18px", fontSize: 13, color: "rgba(0,0,0,0.70)" }}>
                        {p.field}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <span
                          style={{
                            background: "#EAF1FA",
                            color: "#0A66C2",
                            padding: "3px 8px",
                            borderRadius: 6,
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        >
                          {p.applicants} người
                        </span>
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        {renderStatusBadge(p.status)}
                      </td>
                      <td style={{ padding: "12px 18px", fontSize: 13, color: "rgba(0,0,0,0.50)" }}>
                        {p.date}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        {/* Only 'Chi tiết' button in table, 'Gỡ bỏ' is moved inside popup */}
                        <button
                          onClick={() => setProjectDetail(p)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0A66C2",
                            padding: "4px 8px",
                            borderRadius: 4,
                          }}
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 3: QUẢN LÝ HỢP ĐỒNG (CONTRACTS MANAGEMENT)
           ═══════════════════════════════════════════════════════════════════ */}
        {activeNav === "contracts" && (
          <div>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "rgba(0,0,0,0.90)",
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                Quản lý hợp đồng
              </h1>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
                Giám sát hợp đồng điện tử pháp lý và tiến độ bàn giao giữa các bên
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(0,0,0,0.50)", textTransform: "uppercase" }}>
                  Tổng số hợp đồng
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#0A66C2", marginTop: 4 }}>
                  {contracts.length}
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(0,0,0,0.50)", textTransform: "uppercase" }}>
                  Đang thực hiện
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#057642", marginTop: 4 }}>
                  {contracts.filter((c) => c.status === "Đang thực hiện").length}
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(0,0,0,0.50)", textTransform: "uppercase" }}>
                  Hoàn thành giải ngân
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#137333", marginTop: 4 }}>
                  {contracts.filter((c) => c.status === "Hoàn thành").length}
                </div>
              </div>
            </div>

            {/* Quick Status Filter Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["Tất cả", "Đang thực hiện", "Hoàn thành", "Đã hủy / Thất bại"].map((st) => {
                const isSelected = contractStatusFilter === st
                return (
                  <button
                    key={st}
                    onClick={() => setContractStatusFilter(st)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 9999,
                      border: isSelected ? "none" : "1px solid rgba(0,0,0,0.12)",
                      background: isSelected ? "#0A66C2" : "#fff",
                      color: isSelected ? "#fff" : "rgba(0,0,0,0.70)",
                      fontSize: 13,
                      fontWeight: isSelected ? 700 : 600,
                      cursor: "pointer",
                    }}
                  >
                    {st}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div
              style={{
                background: "#fff",
                padding: "12px 16px",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                marginBottom: 16,
              }}
            >
              <div style={{ position: "relative", maxWidth: 440 }}>
                <MagnifyingGlass
                  size={15}
                  color="rgba(0,0,0,0.40)"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  value={contractSearch}
                  onChange={(e) => setContractSearch(e.target.value)}
                  placeholder="Tìm theo mã HĐ, tên dự án, Client hoặc Freelancer..."
                  style={{
                    width: "100%",
                    background: "#F4F2EE",
                    border: "1px solid transparent",
                    borderRadius: 6,
                    padding: "8px 12px 8px 34px",
                    fontSize: 13.5,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Table */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFAF8", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    {[
                      "Mã HĐ & Dự án",
                      "Bên thuê (Client)",
                      "Freelancer thực hiện",
                      "Giá trị hợp đồng",
                      "Thời hạn",
                      "Trạng thái",
                      "Thao tác",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 18px",
                          textAlign: "left",
                          fontSize: 11.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.6,
                          color: "rgba(0,0,0,0.50)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((c) => (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                        transition: "background 120ms",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "#FAFAF8"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "transparent"
                      }}
                    >
                      <td style={{ padding: "12px 18px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "#0A66C2",
                            background: "#EAF1FA",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontSize: 12,
                          }}
                        >
                          {c.id}
                        </span>
                        <div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 4 }}>
                          {c.project}
                        </div>
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: "50%",
                              background: c.client.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: 10,
                              fontWeight: 800,
                            }}
                          >
                            {c.client.initials}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{c.client.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: "50%",
                              background: c.freelancer.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: 10,
                              fontWeight: 800,
                            }}
                          >
                            {c.freelancer.initials}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{c.freelancer.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 18px", fontWeight: 700, fontSize: 13.5, color: "#057642" }}>
                        {c.payment}
                      </td>
                      <td style={{ padding: "12px 18px", fontSize: 12.5, color: "rgba(0,0,0,0.55)" }}>
                        {c.dateRange}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        {renderStatusBadge(c.status)}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <button
                          onClick={() => setSelectedContractDetail(c)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0A66C2",
                          }}
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 4: BÁO CÁO VI PHẠM (VIOLATION REPORTS)
           ═══════════════════════════════════════════════════════════════════ */}
        {activeNav === "violations" && (
          <div>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "rgba(0,0,0,0.90)",
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                Báo cáo vi phạm
              </h1>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.60)" }}>
                Kiểm duyệt báo cáo vi phạm chính sách cộng đồng và bảo đảm tính minh bạch trên nền tảng
              </p>
            </div>

            {/* Search & Filters */}
            <div
              style={{
                background: "#fff",
                padding: "12px 16px",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                marginBottom: 16,
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 360 }}>
                <MagnifyingGlass
                  size={15}
                  color="rgba(0,0,0,0.40)"
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  value={violationSearch}
                  onChange={(e) => setViolationSearch(e.target.value)}
                  placeholder="Tìm theo người báo cáo, đối tượng..."
                  style={{
                    width: "100%",
                    background: "#F4F2EE",
                    border: "1px solid transparent",
                    borderRadius: 6,
                    padding: "8px 12px 8px 34px",
                    fontSize: 13.5,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              {/* Category filter: Không có 'Bài viết' */}
              <select
                value={violationCategoryFilter}
                onChange={(e) => setViolationCategoryFilter(e.target.value)}
                style={{
                  padding: "7px 12px",
                  borderRadius: 6,
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: 13,
                  fontFamily: "inherit",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <option>Tất cả</option>
                <option>Tài khoản</option>
                <option>Dự án</option>
              </select>

              <select
                value={violationStatusFilter}
                onChange={(e) => setViolationStatusFilter(e.target.value)}
                style={{
                  padding: "7px 12px",
                  borderRadius: 6,
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: 13,
                  fontFamily: "inherit",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <option>Tất cả</option>
                <option>Chờ xử lý</option>
                <option>Đã giải quyết</option>
                <option>Đã bác bỏ</option>
              </select>
            </div>

            {/* Table */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFAF8", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    {[
                      "Mã báo cáo",
                      "Người báo cáo",
                      "Đối tượng bị báo cáo",
                      "Phân loại",
                      "Thời gian",
                      "Trạng thái",
                      "Thao tác",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 18px",
                          textAlign: "left",
                          fontSize: 11.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.6,
                          color: "rgba(0,0,0,0.50)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredViolations.map((v) => (
                    <tr
                      key={v.id}
                      style={{
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                        transition: "background 120ms",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "#FAFAF8"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "transparent"
                      }}
                    >
                      <td style={{ padding: "12px 18px" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            background: "#F4F2EE",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontSize: 12,
                          }}
                        >
                          {v.id}
                        </span>
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: v.reporter.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: 10,
                              fontWeight: 800,
                            }}
                          >
                            {v.reporter.initials}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{v.reporter.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 18px", fontSize: 13.5, fontWeight: 600, maxWidth: 220 }}>
                        {v.target}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        <span
                          style={{
                            background: "#FAFAF8",
                            border: "1px solid rgba(0,0,0,0.08)",
                            color: "rgba(0,0,0,0.80)",
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "3px 8px",
                            borderRadius: 4,
                          }}
                        >
                          {v.category}
                        </span>
                      </td>
                      <td style={{ padding: "12px 18px", fontSize: 12.5, color: "rgba(0,0,0,0.55)" }}>
                        {v.time}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        {renderStatusBadge(v.status)}
                      </td>
                      <td style={{ padding: "12px 18px" }}>
                        {/* Đổi tên từ 'Xem bằng chứng' thành 'Chi tiết' theo yêu cầu */}
                        <button
                          onClick={() => setEvidenceTarget(v)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0A66C2",
                          }}
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          MODALS
         ═══════════════════════════════════════════════════════════════════ */}

      {/* ── User Detail Modal ────────────────────────────────────────────── */}
      {userDetailModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setUserDetailModal(null)
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
              width: "100%",
              maxWidth: 520,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                Hồ sơ người dùng
              </span>
              <button
                onClick={() => setUserDetailModal(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.50)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: userDetailModal.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {userDetailModal.initials}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                  {userDetailModal.name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", marginTop: 2 }}>
                  {userDetailModal.email}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                background: "#FAFAF8",
                padding: 16,
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase" }}>
                  Vai trò
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>
                  {userDetailModal.role}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase" }}>
                  Trạng thái
                </div>
                <div style={{ marginTop: 4 }}>{renderStatusBadge(userDetailModal.status)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase" }}>
                  Ngày tham gia
                </div>
                <div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 4 }}>
                  {userDetailModal.joined}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: 700, textTransform: "uppercase" }}>
                  Mã tài khoản
                </div>
                <div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 4, fontFamily: "monospace" }}>
                  #USR-{userDetailModal.id.toString().padStart(4, "0")}
                </div>
              </div>
            </div>

            {/* Actions in User Detail */}
            <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => {
                  setDeleteTarget(userDetailModal)
                  setDeleteReason("")
                  setUserDetailModal(null)
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: 9999,
                  border: "1px solid #FCE8E6",
                  background: "#FCE8E6",
                  color: "#C03A2B",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Xóa tài khoản
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => handleToggleFlag(userDetailModal.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 9999,
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {userDetailModal.status === "Bị gắn cờ" ? "Gỡ cờ cảnh báo" : "Gắn cờ cảnh báo"}
                </button>
                <button
                  onClick={() => handleToggleLock(userDetailModal.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 9999,
                    border: "none",
                    background: userDetailModal.status === "Bị khóa" ? "#057642" : "#B06000",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {userDetailModal.status === "Bị khóa" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── User Delete Modal ────────────────────────────────────────────── */}
      {deleteTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteTarget(null)
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
              width: "100%",
              maxWidth: 448,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#FCE8E6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Warning size={22} color="#C03A2B" weight="fill" />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.90)", marginBottom: 4 }}>
                  Xác nhận xóa tài khoản
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(0,0,0,0.60)", lineHeight: 1.5 }}>
                  Bạn đang xóa vĩnh viễn tài khoản của{" "}
                  <strong style={{ color: "rgba(0,0,0,0.90)" }}>{deleteTarget.name}</strong>. Hành động này không thể hoàn tác.
                </p>
              </div>
            </div>

            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 6,
              }}
            >
              Lý do xóa vi phạm chính sách <span style={{ color: "#C03A2B" }}>*</span>
            </label>
            <textarea
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Nhập lý do cụ thể..."
              style={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: 6,
                padding: 10,
                fontSize: 13.5,
                minHeight: 80,
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
                marginBottom: 16,
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Hủy bỏ
              </button>
              <button
                disabled={!deleteReason.trim()}
                onClick={() => {
                  setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id))
                  setDeleteTarget(null)
                  setDeleteReason("")
                  setToast("Đã xóa tài khoản thành công!")
                }}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "none",
                  background: deleteReason.trim() ? "#C03A2B" : "rgba(192,58,43,0.35)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: deleteReason.trim() ? "pointer" : "default",
                }}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Project Detail Modal ─────────────────────────────────────────── */}
      {projectDetail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setProjectDetail(null)
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
              width: "100%",
              maxWidth: 640,
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                Chi tiết dự án
              </span>
              <button
                onClick={() => setProjectDetail(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.50)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "rgba(0,0,0,0.90)", marginBottom: 6 }}>
                  {projectDetail.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {renderStatusBadge(projectDetail.status)}
                  <span style={{ fontSize: 13, color: "rgba(0,0,0,0.50)" }}>Đăng ngày {projectDetail.date}</span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  background: "#FAFAF8",
                  padding: 16,
                  borderRadius: 8,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>
                    Chủ dự án
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>
                    {projectDetail.owner.name}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>
                    Ngân sách
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#057642", marginTop: 4 }}>
                    {projectDetail.budget} ({projectDetail.budgetType})
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 6 }}>
                  Mô tả dự án
                </div>
                <p style={{ fontSize: 14, color: "rgba(0,0,0,0.80)", lineHeight: 1.6 }}>
                  {projectDetail.description}
                </p>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 8 }}>
                  Kỹ năng yêu cầu
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {projectDetail.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        background: "#EAF1FA",
                        color: "#0A66C2",
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Đổi tên từ 'Danh sách ứng viên nộp hồ sơ' thành 'Người tham gia' theo yêu cầu */}
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 8 }}>
                  Người tham gia ({projectDetail.applicantList.length})
                </div>
                {projectDetail.applicantList.length === 0 ? (
                  <div style={{ fontSize: 13, color: "rgba(0,0,0,0.40)", fontStyle: "italic" }}>
                    Chưa có người tham gia chào giá.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {projectDetail.applicantList.map((app) => (
                      <div
                        key={app.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "#FAFAF8",
                          padding: "10px 14px",
                          borderRadius: 6,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              background: app.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: 10.5,
                              fontWeight: 800,
                            }}
                          >
                            {app.initials}
                          </div>
                          <span style={{ fontSize: 13.5, fontWeight: 700 }}>{app.name}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#057642" }}>
                          {app.bid}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer with 'Gỡ bỏ dự án' moved inside popup, next to 'Đóng' */}
            <div
              style={{
                padding: "14px 24px",
                borderTop: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => {
                  setProjectDeleteTarget(projectDetail)
                  setProjectDeleteReason("")
                  setProjectDetail(null)
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid #FCE8E6",
                  background: "#FCE8E6",
                  color: "#C03A2B",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = "#fad2cf"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = "#FCE8E6"
                }}
              >
                Gỡ bỏ dự án
              </button>

              <button
                onClick={() => setProjectDetail(null)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Project Delete Modal ─────────────────────────────────────────── */}
      {projectDeleteTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setProjectDeleteTarget(null)
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
              width: "100%",
              maxWidth: 448,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#FCE8E6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Warning size={22} color="#C03A2B" weight="fill" />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(0,0,0,0.90)", marginBottom: 4 }}>
                  Xác nhận gỡ bỏ dự án
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(0,0,0,0.60)", lineHeight: 1.5 }}>
                  Bạn đang gỡ dự án{" "}
                  <strong style={{ color: "rgba(0,0,0,0.90)" }}>"{projectDeleteTarget.title}"</strong> khỏi nền tảng do vi phạm.
                </p>
              </div>
            </div>

            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(0,0,0,0.90)",
                marginBottom: 6,
              }}
            >
              Lý do xử lý dự án <span style={{ color: "#C03A2B" }}>*</span>
            </label>
            <textarea
              value={projectDeleteReason}
              onChange={(e) => setProjectDeleteReason(e.target.value)}
              placeholder="Nhập lý do cụ thể..."
              style={{
                width: "100%",
                border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: 6,
                padding: 10,
                fontSize: 13.5,
                minHeight: 80,
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
                marginBottom: 16,
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setProjectDeleteTarget(null)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Hủy bỏ
              </button>
              <button
                disabled={!projectDeleteReason.trim()}
                onClick={() => {
                  setProjects((prev) => prev.filter((p) => p.id !== projectDeleteTarget.id))
                  setProjectDeleteTarget(null)
                  setProjectDeleteReason("")
                  setToast("Đã gỡ dự án thành công!")
                }}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "none",
                  background: projectDeleteReason.trim() ? "#C03A2B" : "rgba(192,58,43,0.35)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: projectDeleteReason.trim() ? "pointer" : "default",
                }}
              >
                Xác nhận gỡ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Contract Detail Modal ──────────────────────── */}
      {selectedContractDetail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedContractDetail(null)
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
              width: "100%",
              maxWidth: 580,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <span
                  style={{
                    fontFamily: "monospace",
                    background: "#EAF1FA",
                    color: "#0A66C2",
                    padding: "3px 8px",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {selectedContractDetail.id}
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "rgba(0,0,0,0.90)", marginTop: 6 }}>
                  {selectedContractDetail.project}
                </h3>
              </div>
              <button
                onClick={() => setSelectedContractDetail(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.50)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                background: "#FAFAF8",
                padding: 16,
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>
                  Bên thuê (Client)
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>
                  {selectedContractDetail.client.name}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>
                  Freelancer
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>
                  {selectedContractDetail.freelancer.name}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>
                  Mức phí hợp đồng
                </div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#057642", marginTop: 4 }}>
                  {selectedContractDetail.payment}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>
                  Trạng thái
                </div>
                <div style={{ marginTop: 4 }}>
                  {renderStatusBadge(selectedContractDetail.status)}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedContractDetail(null)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Evidence / Violation Detail Modal ─────────────────────────────── */}
      {evidenceTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEvidenceTarget(null)
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
              width: "100%",
              maxWidth: 560,
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 17, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                Chi tiết báo cáo vi phạm
              </span>
              <button
                onClick={() => setEvidenceTarget(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.50)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: evidenceTarget.reporter.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {evidenceTarget.reporter.initials}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(0,0,0,0.90)" }}>
                    {evidenceTarget.reporter.name}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(0,0,0,0.50)" }}>
                    Gửi lúc {evidenceTarget.time} · Mã: {evidenceTarget.id}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 4 }}>
                  Đối tượng bị báo cáo ({evidenceTarget.category})
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0A66C2" }}>
                  {evidenceTarget.target}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 4 }}>
                  Lý do tố cáo
                </div>
                <div
                  style={{
                    background: "#FFF4D6",
                    color: "#915907",
                    padding: "10px 14px",
                    borderRadius: 6,
                    fontSize: 13.5,
                    lineHeight: 1.5,
                  }}
                >
                  {evidenceTarget.reason}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: 4 }}>
                  Nội dung bằng chứng
                </div>
                <div
                  style={{
                    background: "#FAFAF8",
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: 14,
                    borderRadius: 6,
                    fontSize: 13.5,
                    color: "rgba(0,0,0,0.85)",
                    lineHeight: 1.6,
                  }}
                >
                  {evidenceTarget.evidence}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "14px 24px",
                borderTop: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button
                onClick={() => {
                  setViolations((prev) =>
                    prev.map((v) => (v.id === evidenceTarget.id ? { ...v, status: "Đã bác bỏ" } : v))
                  )
                  setEvidenceTarget(null)
                  setToast("Đã bác bỏ báo cáo vi phạm!")
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Bác bỏ báo cáo
              </button>
              <button
                onClick={() => {
                  setViolations((prev) =>
                    prev.map((v) => (v.id === evidenceTarget.id ? { ...v, status: "Đã giải quyết" } : v))
                  )
                  setEvidenceTarget(null)
                  setToast("Đã xử lý vi phạm thành công!")
                }}
                style={{
                  padding: "8px 20px",
                  borderRadius: 9999,
                  border: "none",
                  background: "#C03A2B",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Xử lý vi phạm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast feedback */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
export default function App() {
  const [authState, setAuthState] =
    useState<"landing" | "login" | "signup" | "app" | "admin">("landing")

  if (authState === "landing")
    return (
      <LandingPage
        onLogin={() => setAuthState("login")}
        onSignUp={() => setAuthState("signup")}
        onGoogle={() => setAuthState("app")}
        onAdmin={() => setAuthState("admin")}
      />
    )
  if (authState === "login")
    return (
      <LoginPage
        onBack={() => setAuthState("landing")}
        onSuccess={() => setAuthState("app")}
        onGoogle={() => setAuthState("app")}
        onSignUp={() => setAuthState("signup")}
      />
    )
  if (authState === "signup")
    return (
      <SignUpFlow
        onBack={() => setAuthState("landing")}
        onSuccess={() => setAuthState("app")}
        onGoogle={() => setAuthState("app")}
      />
    )
  if (authState === "admin")
    return <AdminPortal onBack={() => setAuthState("landing")} />
  return <MainApp onLogout={() => setAuthState("landing")} />
}
