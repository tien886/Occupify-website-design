**Prompt 1:**

**Role:** Expert Frontend Developer (React + Tailwind CSS).
**Task:** Build the **Project Management (Quản lý dự án)** and **Contract Management (Danh sách hợp đồng)** admin views for "Occupify", featuring data tables, modal inspections, and consistent design system tokens.

---

### Part 1: Project Management Page (Quản lý dự án)

**1. Layout & Toolbar**

* **Container:** Standard admin workspace container inside the fixed-sidebar layout (`p-8 bg-[#F4F2EE] min-h-screen`).
* **Header:** Title "Quản lý dự án" (`text-[24px] font-semibold text-[rgba(0,0,0,0.90)]`) with a subtitle displaying total project counts.
* **Filter Bar (`bg-white p-4 rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] mb-6 flex gap-4 items-center`):**
* Search Bar: Input (`bg-[#EAF1FA] rounded-[4px] px-3 py-2 text-[14px] w-80 outline-none`) to search by project title or owner.


* Dropdown Filters: Category/Field, Budget range, and Status (Đang tuyển, Đang thực hiện, Đã đóng).





**2. Projects Data Table**

* **Container:** `bg-white rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden`.
* **Columns (`bg-[#FAFAF8] text-[12px] font-semibold uppercase text-[rgba(0,0,0,0.60)] px-6 py-3`):**
* Tên dự án (Title & Created date).
* Người đăng (Owner name & avatar).
* Ngân sách (Budget & timeframe).
* Ứng viên (Applicant count).
* Trạng thái (Pill status badges).
* Thao tác (Actions).


* **Row Actions:**
* "Xem chi tiết" button: `text-[#0A66C2] font-semibold text-[13px] hover:underline mr-4`. Triggers the Project Details Modal.
* "Xóa dự án" button: `text-[#C03A2B] hover:bg-[#FBE2E2] px-3 py-1 rounded-full text-[13px] font-semibold transition-colors`. Triggers the Universal Destructive Modal (requiring reason input before notifying applicants and owner).

**3. Project Detail Modal**

* **Overlay & Surface:** `fixed inset-0 bg-[rgba(0,0,0,0.55)] z-50 flex items-center justify-center p-4`. Modal card `bg-white rounded-[12px] shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col`.
* **Modal Header (`p-6 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center`):**
* Title: Project name with status badge.


* Close Button: Phosphor icon `X` (`text-[rgba(0,0,0,0.60)] hover:text-black`).


* **Modal Body (`p-6 overflow-y-auto space-y-6 text-[14px]`):**
* **Overview Grid:** 2-column layout showing Ngân sách (Budget), Thời hạn (Timeline), Lĩnh vực (Industry), and Thông tin liên hệ người đăng (Contact Info).


* **Mô tả dự án (Description):** Block `bg-[#FAFAF8] p-4 rounded-[6px] text-[rgba(0,0,0,0.90)] leading-relaxed`.
* **Kỹ năng yêu cầu (Skills):** Flex wrap of chips (`bg-[#EAF1FA] text-[#0A66C2] px-2.5 py-1 rounded-[4px] text-[12px] font-semibold`).
* **Danh sách ứng viên (Applicants):** Card list showing applicant avatar, name, applied date, and bid proposal.

* **Modal Footer (`p-4 border-t border-[rgba(0,0,0,0.08)] bg-[#FAFAF8] flex justify-end gap-3 rounded-b-[12px]`):**
* Close button: Pill-shaped `rounded-full border border-[rgba(0,0,0,0.15)] px-5 py-2 font-semibold text-[14px] text-[rgba(0,0,0,0.60)] hover:bg-white`.

---

### Part 2: Contract Management Page (Danh sách hợp đồng)

**1. Layout & Filters**

* **Header:** Title "Danh sách hợp đồng" (`text-[24px] font-semibold text-[rgba(0,0,0,0.90)]`).
* **Toolbar (`bg-white p-4 rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] mb-6 flex gap-4 items-center`):**
* Search Bar: Input to search by Contract ID, Project Name, or Party names.


* **Status Filter Dropdown:** Select dropdown with options: "Tất cả trạng thái", "Đang thực hiện", "Hoàn thành thành công" (Success), "Đã hủy / Thất bại" (Failed).

**2. Contracts Data Table**

* **Container:** `bg-white rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden`.
* **Columns (`bg-[#FAFAF8] text-[12px] font-semibold uppercase text-[rgba(0,0,0,0.60)] px-6 py-3`):**
1. **Mã hợp đồng:** Monospace text tag (e.g., `#HD-8921`).

2. **Tên dự án:** Primary bold link `font-semibold text-[rgba(0,0,0,0.90)]`.

3. **Bên thuê (Client):** User name + small avatar.

4. **Freelancer:** User name + small avatar.


5. **Hình thức trả lương:** Text format (e.g., `12.000.000 ₫ / tháng` or `500.000 ₫ / giờ`).
6. **Thời gian:** `DD/MM/YYYY - DD/MM/YYYY` (`text-[13px] text-[rgba(0,0,0,0.60)]`).
7. **Trạng thái:** Status Pill Badge:
* Hoàn thành: `bg-[#E6F4EA] text-[#137333]`.


* Đang thực hiện: `bg-[#EAF1FA] text-[#0A66C2]`.
* Đã hủy / Thất bại: `bg-[#FCE8E6] text-[#C03A2B]`.




8. **Thao tác:** Action button "Chi tiết" (`text-[#0A66C2] font-semibold text-[13px] hover:underline`). Opens contract summary sheet/modal.


* **Pagination:** Standard bottom pagination bar with rows-per-page selector.






**Prompt 2**

**Role:** Expert Frontend Developer (React + Tailwind CSS).
**Task:** Build the **Violation Reports (Báo cáo vi phạm)** and **Disputes & Appeals (Khiếu nại)** admin views for "Occupify", featuring evidence inspection modals, dispute review dialogs, rating restoration triggers, and consistent design system tokens.

---

### Part 1: Violation Reports Page (Báo cáo vi phạm)

**1. Layout & Filters**

* **Container:** Standard admin workspace container inside the fixed-sidebar layout (`p-8 bg-[#F4F2EE] min-h-screen`).
* **Header:** Title "Báo cáo vi phạm" (`text-[24px] font-semibold text-[rgba(0,0,0,0.90)]`) with a subtitle showing unresolved count.
* **Toolbar (`bg-white p-4 rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] mb-6 flex gap-4 items-center`):**
* Search Bar: Input (`bg-[#EAF1FA] rounded-[4px] px-3 py-2 text-[14px] w-80 outline-none`) to search by reporter, target, or report ID.
* **Dropdown Filter - Loại vi phạm:** `<select>` dropdown menu with options: "Tất cả loại vi phạm", "Bài viết (Post)", "Tài khoản (User)", "Dự án / Hợp đồng".
* **Dropdown Filter - Trạng thái:** "Chờ xử lý" (Pending), "Đã xử lý" (Resolved), "Đã bác bỏ" (Dismissed).



**2. Reports Data Table**

* **Container:** `bg-white rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden`.
* **Columns (`bg-[#FAFAF8] text-[12px] font-semibold uppercase text-[rgba(0,0,0,0.60)] px-6 py-3`):**
1. **Mã báo cáo:** Monospace text (e.g., `#RP-1042`).
2. **Người báo cáo:** User avatar + name.
3. **Đối tượng bị báo cáo:** Target label (e.g., "Bài viết: Thiết kế UI App" or "User: @johndoe").
4. **Phân loại:** Badge (`bg-[#FAFAF8] text-[rgba(0,0,0,0.90)] px-2.5 py-1 rounded-[4px] border border-[rgba(0,0,0,0.08)] text-[12px] font-semibold`).
5. **Thời gian gửi:** Timestamp (`text-[13px] text-[rgba(0,0,0,0.60)]`).
6. **Trạng thái:** Status Pill Badge:
* Chờ xử lý: `bg-[#FEF7E0] text-[#B06000]`.
* Đã giải quyết: `bg-[#E6F4EA] text-[#137333]`.
* Đã từ chối: `bg-[#FCE8E6] text-[#C03A2B]`.


7. **Thao tác:** Action button "Xem bằng chứng" (`text-[#0A66C2] font-semibold text-[13px] hover:underline`).



**3. Evidence Modal (Bằng chứng vi phạm)**

* **Overlay & Surface:** `fixed inset-0 bg-[rgba(0,0,0,0.55)] z-50 flex items-center justify-center p-4`. Card `bg-white rounded-[12px] shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col`.
* **Header (`p-6 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center`):**
* Title: "Chi tiết báo cáo vi phạm" (`text-[18px] font-semibold text-[rgba(0,0,0,0.90)]`).
* Close icon `X` (`text-[rgba(0,0,0,0.60)] hover:text-black`).


* **Body (`p-6 overflow-y-auto space-y-4 text-[14px]`):**
* **Thông tin người tố cáo:** Avatar, Tên, Email và thời gian tố cáo.
* **Lý do tố cáo:** Block `bg-[#FEF7E0]/40 border border-[#FEF7E0] p-3 rounded-[6px] text-[rgba(0,0,0,0.90)] font-medium`.
* **Nội dung bị báo cáo (Evidence):** Container `bg-[#FAFAF8] p-4 rounded-[6px] border border-[rgba(0,0,0,0.08)]` showcasing the reported content (e.g., flagged text snippet, images, or attached links).


* **Footer Actions (`p-4 border-t border-[rgba(0,0,0,0.08)] bg-[#FAFAF8] flex justify-end gap-3 rounded-b-[12px]`):**
* "Bác bỏ báo cáo" (Dismiss): Secondary pill-shaped button `rounded-full border border-[rgba(0,0,0,0.15)] text-[rgba(0,0,0,0.60)] px-5 py-2 font-semibold hover:bg-white`.
* "Xử lý vi phạm" (Take Action): Destructive pill-shaped button `rounded-full bg-[#C03A2B] text-white px-5 py-2 font-semibold hover:bg-[#A93226]`. Opens the Universal Destructive Modal requiring a reason to soft-delete/ban and notify parties.



---

### Part 2: Review Disputes Page (Danh sách khiếu nại)

**1. Layout & Toolbar**

* **Header:** Title "Danh sách khiếu nại" (`text-[24px] font-semibold text-[rgba(0,0,0,0.90)]`) with subtitle indicating pending appeals.
* **Toolbar (`bg-white p-4 rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] mb-6 flex gap-4 items-center`):**
* Search Bar: Input to search by Complainant Name, Email, or Title.
* Status Dropdown: "Tất cả", "Chờ phân xử", "Đã chấp nhận", "Đã từ chối".



**2. Disputes Table**

* **Container:** `bg-white rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden`.
* **Columns (`bg-[#FAFAF8] text-[12px] font-semibold uppercase text-[rgba(0,0,0,0.60)] px-6 py-3`):**
1. **Người khiếu nại:** User name + small avatar.
2. **Email:** Text `text-[13px] text-[rgba(0,0,0,0.60)]`.
3. **Tiêu đề khiếu nại:** Bold title string `font-semibold text-[rgba(0,0,0,0.90)]`.
4. **Ngày gửi khiếu nại:** Date format `DD/MM/YYYY` (`text-[13px] text-[rgba(0,0,0,0.60)]`).
5. **Trạng thái:** Pill Badge (Chờ xử lý, Đã giải quyết, Đã bác bỏ).
6. **Thao tác:** Action button "Chi tiết" (`text-[#0A66C2] font-semibold text-[13px] hover:underline`). Triggers the Dispute Details Modal.



**3. Dispute Details & Resolution Modal**

* **Overlay & Surface:** `fixed inset-0 bg-[rgba(0,0,0,0.55)] z-50 flex items-center justify-center p-4`. Modal card `bg-white rounded-[12px] shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col`.
* **Header (`p-6 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center`):**
* Title: "Chi tiết khiếu nại" (`text-[18px] font-semibold text-[rgba(0,0,0,0.90)]`).
* Close icon `X`.


* **Body (`p-6 overflow-y-auto space-y-4 text-[14px]`):**
* **Meta Details:** Display Người khiếu nại, Email, Tiêu đề, and Ngày gửi.
* **Nội dung khiếu nại (Appeal Content):** Block `bg-[#FAFAF8] p-4 rounded-[6px] border border-[rgba(0,0,0,0.08)] leading-relaxed text-[rgba(0,0,0,0.90)]`.
* **Rating Restoration Option:** In the resolution options area, include a checkbox component:
* `<input type="checkbox" checked id="restoreRating" className="accent-[#0A66C2] w-4 h-4 rounded">`
* Label: "Tự động tính toán lại điểm trung bình và gỡ bỏ tác động của đánh giá này cho người dùng" (`text-[13px] font-medium text-[rgba(0,0,0,0.90)] ml-2`).




* **Footer Actions (`p-4 border-t border-[rgba(0,0,0,0.08)] bg-[#FAFAF8] flex justify-end gap-3 rounded-b-[12px]`):**
* "Từ chối khiếu nại" (Reject Appeal): Pill-shaped button `rounded-full border border-[rgba(0,0,0,0.15)] text-[rgba(0,0,0,0.60)] px-5 py-2 font-semibold hover:bg-white`.
* "Chấp nhận khiếu nại & Gỡ đánh giá" (Approve Appeal): Pill-shaped primary button `rounded-full bg-[#0A66C2] text-white px-5 py-2 font-semibold hover:bg-[#084FA0]`. Triggers recalculation and notifies both parties.