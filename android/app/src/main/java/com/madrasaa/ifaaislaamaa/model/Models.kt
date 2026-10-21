package com.madrasaa.ifaaislaamaa.model

enum class UserRole {
    STUDENT, PARENT, TEACHER, ADMIN
}

enum class AttendanceStatus {
    PRESENT, LATE, ABSENT, EXCUSED
}

data class Student(
    val id: String,
    val name: String,
    val grade: Int,
    val section: String,
    val rollNumber: String,
    val parentName: String,
    val parentPhone: String,
    val attendanceRate: Float,
    val currentGpa: Float,
    val busRoute: String,
    val busStatus: String
)

data class AttendanceRecord(
    val id: String,
    val studentId: String,
    val studentName: String,
    val grade: Int,
    val section: String,
    val date: String,
    val status: AttendanceStatus,
    val recordedBy: String,
    val time: String,
    val remark: String? = null
)

data class SubjectGrade(
    val subject: String,
    val code: String,
    val teacher: String,
    val score: Int,
    val letterGrade: String,
    val credits: Float,
    val comments: String
)

data class Assignment(
    val id: String,
    val title: String,
    val subject: String,
    val grade: Int,
    val teacherName: String,
    val dueDate: String,
    val status: String,
    val totalScore: Int,
    val obtainedScore: Int? = null,
    val description: String
)

data class FeeInvoice(
    val id: String,
    val studentName: String,
    val term: String,
    val amount: Double,
    val dueDate: String,
    val isPaid: Boolean
)
