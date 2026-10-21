# Madrasaa Ifaa Islaamaa - Complete Native Android Studio Project (Kotlin & Jetpack Compose)

This directory contains the **100% native Android Studio project** written in **Kotlin** and **Jetpack Compose (Material 3)** for **Madrasaa Ifaa Islaamaa K-12 Management System**.

---

## 🚀 Key Modules & Features Implemented in Kotlin

### 1. 🎒 Student Portal & Interactive Student Dashboard
- **Academic Performance Strip**: Real-time Cumulative GPA (4.0 scale), attendance rate %, and average score across all subjects.
- **Current Coursework & Assignments**:
  - Filter by `Pending`, `Completed / Graded`, or `All`.
  - Point weight and due date displays.
  - Interactive **"Turn In Work"** button that immediately records submission into the teacher gradebook with success feedback.
- **Recent Subject Grades**:
  - Subject name, instructor, credit hours, and numerical percentage.
  - Letter grade badges (`A+`, `A`, `B+`) with dynamic score progress bars.
  - Qualitative educator feedback quotes.
- **Quick-Chat Interface with Teachers**:
  - Horizontal instructor carousel to choose between Quran, Mathematics, Arabic, Biology, and Islamic Studies teachers.
  - Live conversation history preview.
  - One-tap inquiry chips: *"📖 Clarify homework"*, *"📝 Review grade feedback"*, *"🎯 Midterm preparation"*.
  - Inline message input with instant `Send` action.
- **Daily Timetable / Bell Schedule**: Period times, course subjects, instructor names, and room numbers.
- **Digital ID & RFID Pass**: Official Madrasaa ID with active verification badge, student details, emergency contacts, transit bus route, and QR/RFID token.

### 2. 👩‍🏫 Teacher Portal & Consolidated Multi-Teacher Master Ledger
- **Individual Subject Score Entry**:
  - Teacher selector to evaluate Grade 10-A students.
  - Modular steppers for 4 assessment components: **Assignment (20)**, **Quiz (20)**, **Midterm (20)**, and **Final Exam (40)**.
  - Live total score out of 100, letter grade calculation, and GPA point mapping.
  - **"Save & Publish Grades"** action.
- **Master Consolidated Grade Ledger**:
  - Collects and aggregates all 6 subject teachers' scores in one place.
  - Ranks the entire class by aggregate score out of 600.
  - Displays side-by-side grid of all subject scores for each student.
- **Multi-Channel Communication**:
  - Switch between student questions and administrative directives from the Principal.

### 3. 👨‍👩‍👧 Parent / Guardian Portal
- **Transit & Safety Tracking**: Live bus route monitoring (e.g. Route 4B) with status (`In Transit`, `Boarded`, `Dropped Off`) and estimated arrival time.
- **Tuition & Quranic Fee Payment**:
  - Invoice breakdown for term fees and bus transit.
  - **1-Tap Google Pay** interactive button that settles invoices, updates status to `PAID`, and generates digital receipt numbers.

### 4. 🏫 Admin & Principal Directorate
- **Campus Executive KPIs**: Live counters for total enrolled students (1,248), attendance rate (96.8%), and active faculty (42).
- **Campus Emergency Broadcast**:
  - Interactive alert dialog to broadcast urgent weather, safety, or closure announcements.
  - Displays a high-priority red alert banner across all active role screens with one-tap dismissal.
### 5. 🔐 Biometric Authentication & Launch Protection (Fingerprint & Face Unlock)
- **Native `androidx.biometric` Integration**: Hardware-backed biometric authentication (`BIOMETRIC_STRONG` or `DEVICE_CREDENTIAL`) powered by `BiometricPrompt`.
- **Manifest Permissions**: Configured with `android.permission.USE_BIOMETRIC` (Android 9+) and `android.permission.USE_FINGERPRINT` (Android 6–8.1 legacy support).
- **Auto-Prompt on Launch**: Securely locks the application immediately on launch until valid biometric verification succeeds.
- **Biometric Security Shield UI**: Dedicated dark-mode lock screen displaying biometric status, school crest, "Unlock with Fingerprint / Face" prompt, and retry handling.
- **Passcode / PIN Fallback**: Integrated 4-digit PIN fallback dialog for emulators or devices without hardware biometrics enrolled.
- **1-Tap Lock Button**: TopAppBar lock action allows users to instantly re-lock the application and test biometric unlock at any time.

---

## 📱 How to Open and Run in Android Studio

### Prerequisites
- **Android Studio** (Koala, Ladybug, or Hedgehog / Jellyfish)
- **JDK 17 or 21** (bundled with Android Studio)
- **Android SDK API 35 (Android 15)** or API 26+

### Step-by-Step Instructions
1. Open **Android Studio**.
2. Click **Open** (or `File -> Open`).
3. Select the **`android`** folder inside this repository:
   ```text
   .../madrasaa-ifaa-islaamaa-management-managementSystme/android
   ```
4. Allow Gradle to sync dependencies automatically:
   - **Kotlin Version**: 2.0.21
   - **Android Gradle Plugin (AGP)**: 8.7.2
   - **Jetpack Compose BOM**: 2024.10.01
   - **Material Design**: Material 3
5. Connect your physical Android phone (with USB debugging enabled) or start an Android Virtual Device (AVD).
6. Press the green **Run (▶)** button or press `Shift + F10`.

---

## 🛠️ Building via Command Line (Terminal)

From inside the `android` folder:

### On macOS / Linux:
```bash
./gradlew assembleDebug
```

### On Windows:
```cmd
gradlew.bat assembleDebug
```

The compiled APK will be generated at:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📂 Architecture and Code Structure

```text
android/
├── build.gradle.kts                      # Root Gradle configuration (Kotlin DSL)
├── settings.gradle.kts                   # Project repositories and module include
├── gradle/
│   └── wrapper/
│       └── gradle-wrapper.properties     # Gradle 8.9 distribution
└── app/
    ├── build.gradle.kts                  # App-level build file with Jetpack Compose dependencies
    ├── proguard-rules.pro               # ProGuard code optimization rules
    └── src/
        └── main/
            ├── AndroidManifest.xml       # Permissions (INTERNET, BIOMETRIC) & Launcher Activity
            └── java/com/madrasaa/ifaaislaamaa/
                ├── MainActivity.kt       # Complete Jetpack Compose UI (All 4 Portals & Dashboards)
                └── model/
                    └── Models.kt         # Domain data classes (Student, Assignment, Grade, Invoice, Chat)
```
