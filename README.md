# Madrasaa Ifaa Islaamaa - K-12 Mobile School Management System

![Madrasaa Ifaa Islaamaa](https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80)

An end-to-end, production-grade K-12 School Management System & Mobile Suite for **Madrasaa Ifaa Islaamaa (Grades 1 through 12)**. Built with ISO/IEC/IEEE 29148:2018 SRS requirements engineering, UML architecture models, interactive mobile portals for four user roles, and certified PDF academic performance report generation.

---

## 🌟 Key Features

### 1. 📱 Multi-Role Mobile App Simulator
* **🎒 Student Portal**:
  * Period bell schedule and daily timetable
  * GPA analytics (4.0 scale) and Dean's Honor Roll progress
  * Coursework and homework upload with score tracking
  * Digital NFC gate pass and Student ID badge with scannable QR
* **👨‍👩‍👧 Parent / Guardian Portal**:
  * Multi-child switcher (seamlessly toggle between primary and high school students)
  * Real-time GPS school bus tracking with live stop countdown & ETA
  * One-tap tuition fee invoicing and instant digital tax receipt issuance
  * Direct encrypted messaging channel with homeroom faculty
  * Automated absence push alerts and digital excuse note submission
* **👩‍🏫 Faculty & Teacher Portal**:
  * One-tap period attendance sheet (Present, Late, Absent, Excused)
  * AP & Honors Gradebook with grade distribution bell curve analytics
  * Assignment creator and coursework evaluation rubric
  * Direct class-wide parent notification dispatcher
* **🏫 Principal & Administrator Command Center**:
  * Real-time institutional health metrics (1,248 students, 96.8% attendance, $1.84M fees collected)
  * Student directory with Grade 1–12 stage filtering (Primary Gr 1-5, Middle Gr 6-8, High Gr 9-12)
  * High-priority emergency broadcast system (weather delays, early dismissal)
  * Admissions pipeline management

---

### 2. 🖨️ Certified PDF-Style Performance Dossiers
* **Individual Student Academic Reports**:
  * Official institution letterhead and embossed watermark
  * Subject-by-subject grade breakdown with credit points and faculty remarks
  * Longitudinal attendance history (present days, late arrivals, excused absences, active streak)
  * Coursework completion percentage and recent assignment evaluation log
  * Advisor commentary and Principal's official commendation
  * Cryptographic SHA-256 verification hash, digital signature stamps, and QR authentication
* **School-Wide Master Performance Ledger**:
  * Cohort aggregated analytics across Grades 1–12
  * Comparative student standing and honor roll classification

---

### 3. 📋 Engineering & Architecture Suite
* **Full SRS Specification**: ISO/IEC/IEEE 29148 standard structure with 12 Functional Requirements (FR-01 to FR-12) and 6 Non-Functional Requirements (NFR-01 to NFR-06) covering FERPA, COPPA, and GDPR compliance.
* **UML Use Case Diagrams**: Interactive canvas with 5 system actors (Admin, Teacher, Student, Parent, Bursar) and flow specifications.
* **System Sequence Diagrams**: Step-by-step execution playback for attendance marking, gradebook publication, and fee payments.
* **Software Design Patterns**: Clean Architecture + MVVM, Offline-First Repository Pattern, Observer/Pub-Sub Event Bus, Strategy Pattern for international grading scales, and Factory Pattern for notification channels.
* **Global Grade 1–12 Taxonomy**: Comparative mapping across US K-12, UK Key Stages, IB Continuum, and Asian school curricula.

---

## 🛠️ Technology Stack

* **Web Suite**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
* **Native Android App**: Kotlin 2.0, Jetpack Compose (Material 3), Gradle (Kotlin DSL), Android SDK 35
* **Architecture**: Clean Architecture + MVVM, Repository Pattern, Multi-Channel Communications

---

## 📱 Native Android Studio Project (Kotlin)

The complete native Android app lives in the `/android` directory:

```bash
# Open in Android Studio:
# File -> Open -> Select the 'android' folder

# Or build the debug APK via Gradle:
cd android
./gradlew assembleDebug
```

Features included in native Kotlin & Jetpack Compose:
1. **Student Dashboard**: Assignments turn-in, recent grades & progress bars, direct teacher Q&A quick-chat, timetable, and digital NFC ID pass.
2. **Teacher Gradebook**: Individual component entry (Assignment, Quiz, Midterm, Final Exam) and consolidated Master Ledger across all 6 teachers.
3. **Parent Portal**: Real-time bus tracking and 1-tap Google Pay tuition settlement.
4. **Admin Command**: Emergency broadcast alerts, campus KPIs, and direct staff communication.

---

## 🚀 Web Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📜 License
Apache-2.0 License. Built for **Madrasaa Ifaa Islaamaa**.

