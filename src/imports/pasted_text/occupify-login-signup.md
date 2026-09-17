* **Sign Up Link (Inside Card Bottom):** Centered text below the Google button. "Chưa có tài khoản? [Đăng ký ngay]". Style the bracketed text as a link: `text-[#0A66C2] font-semibold hover:underline text-[14px] mt-6 block text-center`.
* **Legal Text (Outside Card):** Below the white card, on the beige background, place the terms text: "Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư của Occupify" (`text-[12px] text-[rgba(0,0,0,0.60)] text-center mt-6 max-w-sm mx-auto`). Make the links brand blue.
**Role:** Expert Frontend Developer (React + Tailwind CSS).
**Task:** Improve the **"Login" (Đăng nhập)** Page for "Occupify", incorporating key UX improvements (Remember me, Forgot password, Sign-up link) while strictly adhering to the Occupify Design System.

**1. General Layout & Canvas**

* **Canvas:** Full viewport height (`min-h-screen flex flex-col items-center justify-center`), using the warm beige background `bg-[#F4F2EE]`.
* **Global Navigation:** Place the "Quay lại" (Back) button *outside* the card at the top-left of the screen: `absolute top-6 left-6 flex items-center gap-2 text-[14px] text-[rgba(0,0,0,0.60)] hover:text-[rgba(0,0,0,0.90)] font-semibold`.
* **Logo:** Center the Occupify logo above the main form card.

**2. Main Login Card**

* **Container:** `bg-white`, `rounded-[8px]`, `shadow-[0_0_0_1px_rgba(0,0,0,0.08)]`, `w-full max-w-md p-8`.
* **Header:**
* Title: "Đăng nhập" (`text-[24px] font-semibold text-[rgba(0,0,0,0.90)] mb-1`).
* Subtitle: "Chào mừng bạn trở lại Occupify!" (`text-[14px] text-[rgba(0,0,0,0.60)] mb-6`).



**3. Form Inputs**

* **Styling:** All inputs must have `rounded-[4px] border border-[rgba(0,0,0,0.15)] focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] px-3 py-2.5 w-full outline-none text-[14px]`.
* **Labels:** `text-[12px] font-semibold text-[rgba(0,0,0,0.90)] mb-1.5 flex gap-1` (Include a red asterisk `*` for required fields).
* **Tên đăng nhập (Username):** Standard text input.
* **Mật khẩu (Password):** Password input with an absolute-positioned "Eye" (visibility toggle) icon on the right side (`text-[rgba(0,0,0,0.45)]`).

**4. Utility Row (The UX Improvements)**

* **Layout:** `flex items-center justify-between mt-3 mb-6`.
* **Left (Remember Me):** A flex row with a native checkbox and text "Ghi nhớ đăng nhập" (`text-[13px] text-[rgba(0,0,0,0.90)]`).
* **Right (Forgot Password):** A text link "Quên mật khẩu?" (`text-[13px] font-semibold text-[#0A66C2] hover:underline`).

**5. Action Buttons**

* **Submit Button ("Đăng nhập"):**
* **MUST BE PILL-SHAPED:** `rounded-full w-full py-2.5 font-semibold text-[14px] transition-colors`.
* *Active State:* `bg-[#0A66C2] text-white hover:bg-[#084FA0]`.
* *Disabled State:* Improve contrast using `bg-[#0A66C2]/40 text-white` (do not use muddy gray).


* **Divider:** A horizontal layout `<hr>` with text "hoặc" (or) in the center: `flex items-center gap-3 my-6 text-[12px] text-[rgba(0,0,0,0.60)]`.
* **Google Login Button:** **MUST BE PILL-SHAPED:** `rounded-full border border-[rgba(0,0,0,0.15)] w-full py-2.5 flex items-center justify-center gap-2 hover:bg-[#FAFAF8] text-[14px] font-semibold text-[rgba(0,0,0,0.90)]`. Include the Google G logo.

**6. Footer Navigation & Terms**
Chính đưa cái prompt hộ Trí vào figmake nha Chính
**Role:** Expert Frontend Developer (React + Tailwind CSS).
**Task:** Improve the **Multi-step "Sign Up" (Tạo tài khoản)** flow for "Occupify", strictly adhering to the provided UX constraints and Design System.

**1. Global Layout & Canvas**

* **Canvas:** Full viewport height (`min-h-screen flex flex-col items-center justify-center`), using the warm beige background `bg-[#F4F2EE]`.
* **Global Navigation:** Place the "Quay lại / Bước trước" (Back) button *outside* the white card, fixed at the top-left: `absolute top-6 left-6 flex items-center gap-2 text-[14px] text-[rgba(0,0,0,0.60)] hover:text-[rgba(0,0,0,0.90)] font-semibold`.
* **Main Container:** Center the Occupify logo above the main form card (`bg-white`, `rounded-[8px]`, `shadow-[0_0_0_1px_rgba(0,0,0,0.08)]`, `w-full max-w-md p-8`).

**2. Progress Bar (Inside Top of Card)**

* **Layout:** Flex row with 6 equal segments (`flex-1 h-1.5 rounded-full`) and a step text indicator (e.g., "1/6" `text-[12px] font-semibold text-[rgba(0,0,0,0.60)]`).
* **Active/Completed Segment:** `bg-[#0A66C2]`.
* **Inactive Segment:** `bg-[#EAF1FA]`.

**3. Step-by-Step UI Requirements**

* **Step 1: Account Info**
* **Inputs:** Add 4 fields (Tên đăng nhập, Email, Mật khẩu, Xác nhận mật khẩu). Use standard input styling (`rounded-[4px] border-[rgba(0,0,0,0.15)] focus:border-[#0A66C2]`).
* **Primary Action:** "Tiếp tục" button. **MUST BE PILL-SHAPED:** `rounded-full bg-[#0A66C2] text-white w-full py-2.5 font-semibold`. Include the Google sign-up divider and button below it.

* **Step 2: OTP Verification**
* **Inputs:** A flex row of 6 square input boxes (`w-12 h-12 text-center text-[18px] font-semibold border-2 border-[#0A66C2] rounded-[4px]`).
* **Helper Text:** "Không nhận được mã? [Gửi lại]" centered below inputs.

* **Step 3: Current School (Trường học)**
* **List Item Active State:** When a school is selected, apply `border-[#0A66C2] bg-[#EAF1FA]` and show a blue checkmark icon on the right. Default state is `border border-[rgba(0,0,0,0.08)]`.
* **Action Row:** Flex row `justify-between` at the bottom. Left: A "Bỏ qua" (Skip) text button. Right: Primary "Tiếp tục" pill-shaped button.
* **Step 4: Interests (Sở thích)**
* **Pill Options:** Display fields as wrapping chips. Default: `rounded-full border border-[rgba(0,0,0,0.15)] px-4 py-1.5 text-[14px] cursor-pointer text-[rgba(0,0,0,0.90)]`.
* **Active State:** Change to `bg-[#0A66C2] text-white border-[#0A66C2]`.

* **Step 5: Current Industry (Ngành nghề)**
* **List Styling:** Same list active/inactive state logic as Step 3 (blue border + checkmark).

* **Step 6: Success (Hoàn thành)**
* **Icon:** Large circular checkmark icon (`bg-[#EAF1FA] text-[#0A66C2]`).
* **Summary Box:** A subtle gray box (`bg-[#FAFAF8] p-4 rounded-[8px] border border-[rgba(0,0,0,0.04)]`) listing their Username, School, Industry, and Interest Count.
* **Final Action:** "Vào Occupify" primary pill-shaped button.