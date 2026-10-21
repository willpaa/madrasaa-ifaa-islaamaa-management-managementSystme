# Madrasaa Ifaa Islaamaa - Native Android Studio Project (Kotlin)

This directory contains the **100% native Kotlin and Jetpack Compose** source code for **Madrasaa Ifaa Islaamaa**.

---

## 📱 How to Open and Run in Android Studio

1. **Launch Android Studio** on your computer.
2. Select **Open** (or `File -> Open`).
3. Browse to and select the **`android`** folder inside this repository:
   ```
   .../madrasaa-ifaa-islaamaa-management-managementSystme/android
   ```
4. Wait for Gradle Sync to finish downloading dependencies:
   * **Language**: Kotlin 2.0+
   * **UI Framework**: Android Jetpack Compose (Material 3)
   * **Target SDK**: Android 15 (API 35) / Minimum SDK: Android 8.0 (API 26)
5. Select your Emulator or connected physical phone and click **Run (▶)**!

---

## 📂 Source Code Structure

* `app/src/main/java/com/madrasaa/ifaaislaamaa/MainActivity.kt`: Master Activity with Jetpack Compose TopBar, Bottom Navigation, and Role views.
* `app/src/main/java/com/madrasaa/ifaaislaamaa/model/Models.kt`: Domain data classes (`Student`, `AttendanceRecord`, `SubjectGrade`, `Assignment`, `FeeInvoice`).
* `app/src/main/AndroidManifest.xml`: Android application manifest with permissions and launcher activity.
* `app/build.gradle.kts`: Gradle build configuration using Kotlin DSL.
