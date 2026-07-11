# 🦷 Dr. Ahmed Ibrahim Wahba - Professional Dental Portfolio

A modern, premium, and highly interactive personal portfolio website designed specifically for a dental professional. Built with cutting-edge web technologies to deliver a seamless user experience, stunning visual aesthetics, and robust functionality.

![Portfolio Preview](https://via.placeholder.com/1200x600.png?text=Dr.+Wahba+Premium+Portfolio)

## ✨ Key Features

### 🎨 Premium Aesthetics & UI/UX
- **Glassmorphism Design:** Modern glass-like UI components and cards.
- **Dynamic Gradients:** Carefully crafted gradients mapping from Deep Blue (`#1E5FA8`) to Gold (`#C9A84C`) across titles, buttons, and decorative elements.
- **Fluid Animations:** Scroll-triggered fade-ins and slide-ups powered by Framer Motion.
- **Glowing Blobs:** Subtle ambient background lighting effects for depth and premium feel.

### 📱 Fully Responsive Layout
- **Desktop:** Expansive layout with a clean top navigation bar.
- **Mobile/Tablet:** Adapted layouts ensuring no text or element overlaps. Features a custom **Floating Bottom Navigation Bar** on mobile devices for easy thumb reach, mimicking native mobile apps.

### 🗂️ Comprehensive Sections
1. **Hero Section:** High-impact introduction with dynamic badges and dual CTA (Call to Action) buttons.
2. **About Me:** Professional biography paired with dynamic responsive images.
3. **Education:** Timeline-based academic history.
4. **Courses & Certifications:** Grid layout highlighting continuous learning.
5. **Skills:** Badge-based visual representation of technical and clinical skills.
6. **Scientific Events (Conferences):** Detailed cards listing attended events and roles.
7. **Contact Section:** Advanced interactive communication hub.

### 📧 Advanced Contact & Communication
- **Dual Communication Methods:** Users can choose to reach out via Email or WhatsApp.
- **EmailJS Integration:** Sends emails directly from the browser without needing a backend server, complete with loading spinners and success/error states.
- **WhatsApp Integration:** Generates a pre-formatted, organized WhatsApp message utilizing the user's provided form details.
- **Direct Calling:** One-click calling functionality for mobile users.

### 📸 Dedicated Portfolio Showcase
- **Case Gallery:** A dedicated `/portfolio` route to display clinical cases.
- **Categorization:** Cases grouped by specialties (e.g., Cosmetic Dentistry, Restorative, Surgical).

---

## 🛠️ Technologies & Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom configured utility classes)
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email Service:** EmailJS

---

## 📂 Project Structure

```text
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── components/         # Reusable UI components (Hero, Navbar, Footer, SectionTitle, etc.)
│   ├── pages/              # Route pages (HomePage, PortfolioPage, CasePage, etc.)
│   ├── App.jsx             # Main router configuration
│   ├── index.css           # Global Tailwind CSS and custom animations
│   └── main.jsx            # React application entry point
├── .env                    # Environment variables (Ignored by Git)
├── EMAILJS_SETUP.md        # Documentation for configuring EmailJS
├── tailwind.config.js      # Custom Tailwind theme and plugins
└── package.json            # Project dependencies and scripts
```

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Dentist_Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your EmailJS keys:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   *(For full instructions on obtaining these keys, refer to the included `EMAILJS_SETUP.md` file).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔒 Security
- Environment variables (`.env`) containing API keys are strictly added to `.gitignore` to prevent exposure.
- Safe external link routing (`rel="noreferrer"`) for WhatsApp and external resources.

---

*Designed and Developed for Excellence in Dentistry.*
