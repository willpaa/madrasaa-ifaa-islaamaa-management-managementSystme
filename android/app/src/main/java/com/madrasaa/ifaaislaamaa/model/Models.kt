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

data class TeacherProfile(
    val id: String,
    val name: String,
    val subjectCode: String,
    val subjectName: String,
    val department: String
)

data class StudentSubjectScore(
    val studentId: String,
    val studentName: String,
    val rollNumber: String,
    val subjectCode: String,
    var assignmentScore: Int = 18,
    var quizScore: Int = 18,
    var midtermScore: Int = 18,
    var finalExamScore: Int = 36,
    var remarks: String = ""
) {
    val totalScore: Int get() = assignmentScore + quizScore + midtermScore + finalExamScore
    val letterGrade: String get() = when {
        totalScore >= 95 -> "A+"
        totalScore >= 90 -> "A"
        totalScore >= 85 -> "B+"
        totalScore >= 80 -> "B"
        totalScore >= 75 -> "C+"
        totalScore >= 65 -> "C"
        totalScore >= 50 -> "D"
        else -> "F"
    }
    val gpaPoint: Float get() = when {
        totalScore >= 95 -> 4.0f
        totalScore >= 90 -> 3.9f
        totalScore >= 85 -> 3.5f
        totalScore >= 80 -> 3.0f
        totalScore >= 75 -> 2.5f
        totalScore >= 65 -> 2.0f
        totalScore >= 50 -> 1.0f
        else -> 0.0f
    }
}

enum class ChatChannel {
    PARENT_TEACHER, TEACHER_STUDENT, TEACHER_ADMIN
}

data class ChatMessage(
    val id: String,
    val senderRole: UserRole,
    val senderName: String,
    val text: String,
    val timestamp: String,
    val channel: ChatChannel = ChatChannel.TEACHER_STUDENT,
    val recipientName: String = "",
    val teacherId: String = "",
    val studentId: String = ""
)
