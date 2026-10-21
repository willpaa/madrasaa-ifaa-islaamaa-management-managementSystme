package com.madrasaa.ifaaislaamaa

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.madrasaa.ifaaislaamaa.model.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFF6366F1),
                    onPrimary = Color.White,
                    primaryContainer = Color(0xFF312E81),
                    onPrimaryContainer = Color(0xFFE0E7FF),
                    secondary = Color(0xFF10B981),
                    onSecondary = Color.White,
                    secondaryContainer = Color(0xFF064E3B),
                    onSecondaryContainer = Color(0xFFA7F3D0),
                    background = Color(0xFF020617),
                    surface = Color(0xFF0F172A),
                    surfaceVariant = Color(0xFF1E293B),
                    onSurface = Color(0xFFF8FAFC),
                    onSurfaceVariant = Color(0xFF94A3B8)
                )
            ) {
                MadrasaaIfaaIslaamaaApp()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MadrasaaIfaaIslaamaaApp() {
    var selectedRole by remember { mutableStateOf(UserRole.STUDENT) }
    var currentBottomTab by remember { mutableStateOf("dashboard") }

    // Emergency alert state
    var emergencyAlert by remember { mutableStateOf<String?>(null) }

    // Seed mock students
    val students = remember {
        mutableStateListOf(
            Student("STU-101", "Sophia Chen", 10, "A", "10-A-14", "David & Elena Chen", "+1 (555) 234-8901", 97.2f, 3.92f, "Route 4B", "In Transit"),
            Student("STU-104", "Aisha Patel", 10, "A", "10-A-03", "Rajesh Patel", "+1 (555) 456-7890", 99.1f, 4.00f, "Route 4B", "In Transit"),
            Student("STU-107", "Fatima Zahra Noor", 10, "A", "10-A-09", "Tariq Noor", "+1 (555) 789-0123", 98.4f, 3.95f, "Route 2A", "Boarded"),
            Student("STU-106", "Bilal Adams", 10, "A", "10-A-07", "Yusuf Adams", "+1 (555) 678-9012", 96.0f, 3.78f, "Route 4B", "In Transit"),
            Student("STU-103", "Marcus Miller", 10, "A", "10-A-21", "Sarah Miller", "+1 (555) 345-6789", 91.5f, 3.45f, "Route 2A", "Dropped Off"),
            Student("STU-102", "Leo Chen", 3, "B", "03-B-08", "David & Elena Chen", "+1 (555) 234-8901", 98.8f, 4.00f, "Route 4B", "Boarded")
        )
    }

    // Seed initial teacher profiles
    val teachers = remember {
        listOf(
            TeacherProfile("TCH-01", "Ustaz Ahmad Al-Hadi", "QRN-10", "Quran & Tajweed", "Islamic Studies"),
            TeacherProfile("TCH-02", "Ustaza Fatima Zahra", "ARB-10", "Arabic Language", "Languages"),
            TeacherProfile("TCH-03", "Ustaz Dawud Ibrahim", "MTH-10", "Mathematics", "STEM"),
            TeacherProfile("TCH-04", "Ustaz Bilal Nur", "ISL-10", "Islamic Studies & Fiqh", "Islamic Studies"),
            TeacherProfile("TCH-05", "Dr. Evelyn Vance", "SCI-10", "Biology & Science", "Natural Sciences"),
            TeacherProfile("TCH-06", "Ustaza Maryam Ali", "ENG-10", "English Literature", "Languages")
        )
    }

    // Seed mock subject grades for Sophia Chen
    val grades = remember {
        mutableStateListOf(
            SubjectGrade("Quran Recitation & Tajweed", "QRN-10", "Ustaz Ahmad Al-Hadi", 98, "A+", 4.0f, "Masha'Allah, flawless recitation with immaculate ghunnah and makharij."),
            SubjectGrade("Pre-Calculus Honors", "MTH-10", "Ustaz Dawud Ibrahim", 94, "A", 4.0f, "Excellent grasp of trigonometric identities and proof structures."),
            SubjectGrade("Arabic Language & Nahw", "ARB-10", "Ustaza Fatima Zahra", 92, "A", 3.0f, "Very strong grammatical analysis and vocabulary retention."),
            SubjectGrade("AP Biology & Lab", "SCI-10", "Dr. Evelyn Vance", 95, "A", 4.0f, "Exceptional cellular respiration lab prep and analytical rigor."),
            SubjectGrade("Islamic History & Fiqh", "ISL-10", "Ustaz Bilal Nur", 96, "A", 3.0f, "High engagement in jurisprudence discussions and classical texts.")
        )
    }

    // Seed mock assignments
    val assignments = remember {
        mutableStateListOf(
            Assignment("ASN-01", "Surah Al-Kahf Ayah 1-30 Tajweed", "Quran Recitation", 10, "Ustaz Ahmad Al-Hadi", "2026-10-24", "pending", 50, null, "Record oral recitation focusing on ikhfaa and qalqalah rules.", "08:00 PM"),
            Assignment("ASN-02", "Trigonometric Proof Problem Set", "Pre-Calculus", 10, "Ustaz Dawud Ibrahim", "2026-10-25", "pending", 40, null, "Complete textbook questions 14 through 28 on double-angle formulas.", "11:59 PM"),
            Assignment("ASN-03", "Cellular Respiration Lab Synthesis", "AP Biology", 10, "Dr. Evelyn Vance", "2026-10-20", "submitted", 50, 48, "Write complete scientific lab report with graph data.", "11:59 PM"),
            Assignment("ASN-04", "Arabic Verb Conjugation Drill", "Arabic Language", 10, "Ustaza Fatima Zahra", "2026-10-18", "submitted", 30, 29, "Conjugate 10 Form I verbs into past and present tenses.", "05:00 PM")
        )
    }

    // Seed mock invoices
    val invoices = remember {
        mutableStateListOf(
            FeeInvoice("INV-2026-001", "Sophia Chen", "Fall Semester 2026", 1450.00, "2026-11-15", false, "Tuition, Quranic Curriculum & Lab Supplies"),
            FeeInvoice("INV-2026-002", "Sophia Chen", "Bus Transit Pass Term 1", 320.00, "2026-10-10", true, "Express Campus Bus Route 4B Door-to-Door", "REC-8921", "Apple Pay")
        )
    }

    // Seed mock timetable
    val timetable = remember {
        listOf(
            TimetableSlot("TS-1", "Monday", "08:00 - 09:15 AM", "Quran Recitation & Tajweed", "Ustaz Ahmad Al-Hadi", "Audio Lab 201"),
            TimetableSlot("TS-2", "Monday", "09:30 - 10:45 AM", "Pre-Calculus Honors", "Ustaz Dawud Ibrahim", "Room 204"),
            TimetableSlot("TS-3", "Monday", "11:00 - 12:15 PM", "Arabic Language & Grammar", "Ustaza Fatima Zahra", "Room 108"),
            TimetableSlot("TS-4", "Monday", "01:00 - 02:15 PM", "AP Biology & Lab Session", "Dr. Evelyn Vance", "Science Lab 3"),
            TimetableSlot("TS-5", "Monday", "02:30 - 03:30 PM", "Islamic History & Fiqh", "Ustaz Bilal Nur", "Lecture Hall A")
        )
    }

    // Seed mock multi-channel chat messages
    val chatMessages = remember {
        mutableStateListOf(
            ChatMessage("MSG-01", UserRole.TEACHER, "Ustaz Ahmad Al-Hadi", "Wa alaikum assalam Sophia! Remember to hold the ghunnah for 2 counts on Ayah 22.", "10:28 AM", ChatChannel.TEACHER_STUDENT, "Sophia Chen", "TCH-01", "STU-101"),
            ChatMessage("MSG-02", UserRole.STUDENT, "Sophia Chen", "Assalamu alaikum Ustaz Ahmad! For Surah Al-Kahf recitation homework, do we apply ikhfaa on the noon sakinah?", "10:15 AM", ChatChannel.TEACHER_STUDENT, "Ustaz Ahmad Al-Hadi", "TCH-01", "STU-101"),
            ChatMessage("MSG-03", UserRole.ADMIN, "Principal Ustaz Ibrahim", "Assalamu alaikum Ustaz Ahmad. Please verify room allocations for the oral Tajweed exam.", "09:10 AM", ChatChannel.TEACHER_ADMIN, "Ustaz Ahmad Al-Hadi", "TCH-01"),
            ChatMessage("MSG-04", UserRole.TEACHER, "Ustaz Ahmad Al-Hadi", "Wa alaikum assalam Sheikh. Room 104 and Audio Lab 2 are confirmed. Rubrics are staged.", "09:32 AM", ChatChannel.TEACHER_ADMIN, "Principal Ustaz Ibrahim", "TCH-01"),
            ChatMessage("MSG-05", UserRole.ADMIN, "Principal Ustaz Ibrahim", "Dr. Vance, science laboratory glassware order has arrived at the bursar storage.", "Yesterday 1:15 PM", ChatChannel.TEACHER_ADMIN, "Dr. Evelyn Vance", "TCH-05")
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Text(
                                text = "Madrasaa Ifaa Islaamaa",
                                fontWeight = FontWeight.Bold,
                                fontSize = 16.sp
                            )
                            Badge(containerColor = MaterialTheme.colorScheme.primaryContainer) {
                                Text("Android", fontSize = 9.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                            }
                        }
                        Text(
                            text = "K-12 School System • ${selectedRole.name}",
                            fontSize = 11.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                actions = {
                    // Role Switcher in Top Bar
                    AssistChip(
                        onClick = {
                            selectedRole = when (selectedRole) {
                                UserRole.STUDENT -> UserRole.TEACHER
                                UserRole.TEACHER -> UserRole.PARENT
                                UserRole.PARENT -> UserRole.ADMIN
                                UserRole.ADMIN -> UserRole.STUDENT
                            }
                            currentBottomTab = when (selectedRole) {
                                UserRole.STUDENT -> "dashboard"
                                UserRole.TEACHER -> "gradebook"
                                UserRole.PARENT -> "children"
                                UserRole.ADMIN -> "dashboard"
                            }
                        },
                        label = { Text(selectedRole.name, fontSize = 11.sp, fontWeight = FontWeight.SemiBold) },
                        leadingIcon = {
                            Icon(Icons.Default.AccountCircle, contentDescription = "Role", modifier = Modifier.size(16.dp))
                        }
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        bottomBar = {
            NavigationBar {
                when (selectedRole) {
                    UserRole.STUDENT -> {
                        NavigationBarItem(
                            selected = currentBottomTab == "dashboard",
                            onClick = { currentBottomTab = "dashboard" },
                            icon = { Icon(Icons.Default.Dashboard, contentDescription = "Dashboard") },
                            label = { Text("Dashboard") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "academics",
                            onClick = { currentBottomTab = "academics" },
                            icon = { Icon(Icons.Default.School, contentDescription = "Grades") },
                            label = { Text("Grades") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "chat",
                            onClick = { currentBottomTab = "chat" },
                            icon = { Icon(Icons.Default.Email, contentDescription = "Ask Teacher") },
                            label = { Text("Ask Teacher") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "schedule",
                            onClick = { currentBottomTab = "schedule" },
                            icon = { Icon(Icons.Default.Schedule, contentDescription = "Timetable") },
                            label = { Text("Timetable") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "idpass",
                            onClick = { currentBottomTab = "idpass" },
                            icon = { Icon(Icons.Default.QrCode, contentDescription = "ID Pass") },
                            label = { Text("ID Pass") }
                        )
                    }
                    UserRole.TEACHER -> {
                        NavigationBarItem(
                            selected = currentBottomTab == "gradebook",
                            onClick = { currentBottomTab = "gradebook" },
                            icon = { Icon(Icons.Default.Assessment, contentDescription = "Gradebook") },
                            label = { Text("Gradebook") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "attendance",
                            onClick = { currentBottomTab = "attendance" },
                            icon = { Icon(Icons.Default.CheckCircle, contentDescription = "Attendance") },
                            label = { Text("Attendance") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "tasks",
                            onClick = { currentBottomTab = "tasks" },
                            icon = { Icon(Icons.Default.Assignment, contentDescription = "Homework") },
                            label = { Text("Homework") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "chat",
                            onClick = { currentBottomTab = "chat" },
                            icon = { Icon(Icons.Default.Email, contentDescription = "Messages") },
                            label = { Text("Messages") }
                        )
                    }
                    UserRole.PARENT -> {
                        NavigationBarItem(
                            selected = currentBottomTab == "children",
                            onClick = { currentBottomTab = "children" },
                            icon = { Icon(Icons.Default.Person, contentDescription = "Child") },
                            label = { Text("Child") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "fees",
                            onClick = { currentBottomTab = "fees" },
                            icon = { Icon(Icons.Default.AttachMoney, contentDescription = "Tuition") },
                            label = { Text("Tuition") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "chat",
                            onClick = { currentBottomTab = "chat" },
                            icon = { Icon(Icons.Default.Email, contentDescription = "Teacher") },
                            label = { Text("Teacher") }
                        )
                    }
                    UserRole.ADMIN -> {
                        NavigationBarItem(
                            selected = currentBottomTab == "dashboard",
                            onClick = { currentBottomTab = "dashboard" },
                            icon = { Icon(Icons.Default.Dashboard, contentDescription = "KPIs") },
                            label = { Text("KPIs") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "reports",
                            onClick = { currentBottomTab = "reports" },
                            icon = { Icon(Icons.Default.Print, contentDescription = "Master Ledger") },
                            label = { Text("Master Ledger") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "chat",
                            onClick = { currentBottomTab = "chat" },
                            icon = { Icon(Icons.Default.Email, contentDescription = "Staff Chat") },
                            label = { Text("Staff Chat") }
                        )
                    }
                }
            }
        }
    ) { padding ->
        Column(modifier = Modifier.padding(padding).fillMaxSize()) {
            // Emergency Alert Banner if Active
            if (emergencyAlert != null) {
                Card(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFDC2626))
                ) {
                    Row(
                        modifier = Modifier.padding(10.dp).fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(Icons.Default.Warning, contentDescription = "Alert", tint = Color.White)
                            Text(emergencyAlert ?: "", color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                        IconButton(onClick = { emergencyAlert = null }) {
                            Icon(Icons.Default.Close, contentDescription = "Dismiss", tint = Color.White)
                        }
                    }
                }
            }

            Box(modifier = Modifier.fillMaxSize().padding(12.dp)) {
                when (selectedRole) {
                    UserRole.STUDENT -> StudentScreen(
                        student = students.first(),
                        teachers = teachers,
                        grades = grades,
                        assignments = assignments,
                        timetable = timetable,
                        currentBottomTab = currentBottomTab,
                        chatMessages = chatMessages,
                        onTabChange = { currentBottomTab = it }
                    )
                    UserRole.TEACHER -> TeacherScreen(
                        students = students.filter { it.grade == 10 },
                        teachers = teachers,
                        assignments = assignments,
                        currentBottomTab = currentBottomTab,
                        chatMessages = chatMessages
                    )
                    UserRole.PARENT -> ParentScreen(
                        student = students.first(),
                        invoices = invoices,
                        chatMessages = chatMessages,
                        currentBottomTab = currentBottomTab
                    )
                    UserRole.ADMIN -> AdminScreen(
                        students = students,
                        teachers = teachers,
                        currentBottomTab = currentBottomTab,
                        chatMessages = chatMessages,
                        onBroadcastAlert = { emergencyAlert = it }
                    )
                }
            }
        }
    }
}

// =========================================================================
// 1. STUDENT SCREEN & FULL STUDENT DASHBOARD
// =========================================================================

@Composable
fun StudentScreen(
    student: Student,
    teachers: List<TeacherProfile>,
    grades: List<SubjectGrade>,
    assignments: MutableList<Assignment>,
    timetable: List<TimetableSlot>,
    currentBottomTab: String,
    chatMessages: MutableList<ChatMessage>,
    onTabChange: (String) -> Unit
) {
    when (currentBottomTab) {
        "dashboard" -> StudentDashboardView(
            student = student,
            teachers = teachers,
            grades = grades,
            assignments = assignments,
            chatMessages = chatMessages,
            onNavigateToAcademics = { onTabChange("academics") },
            onNavigateToChat = { onTabChange("chat") }
        )
        "academics" -> StudentAcademicsFullView(student, grades, assignments)
        "chat" -> StudentChatView(student, teachers, chatMessages)
        "schedule" -> StudentTimetableView(timetable)
        "idpass" -> StudentIdPassView(student)
        else -> StudentDashboardView(student, teachers, grades, assignments, chatMessages, { onTabChange("academics") }, { onTabChange("chat") })
    }
}

/**
 * Native Jetpack Compose equivalent of StudentDashboard component
 */
@Composable
fun StudentDashboardView(
    student: Student,
    teachers: List<TeacherProfile>,
    grades: List<SubjectGrade>,
    assignments: MutableList<Assignment>,
    chatMessages: MutableList<ChatMessage>,
    onNavigateToAcademics: () -> Unit,
    onNavigateToChat: () -> Unit
) {
    var assignmentFilter by remember { mutableStateOf("pending") }
    var selectedTeacherIndex by remember { mutableStateOf(0) }
    var quickChatInput by remember { mutableStateOf("") }
    var actionToast by remember { mutableStateOf<String?>(null) }

    val activeTeacher = teachers.getOrNull(selectedTeacherIndex) ?: teachers.first()
    val pendingCount = assignments.count { it.status == "pending" }
    val submittedCount = assignments.count { it.status != "pending" }
    val avgScore = if (grades.isNotEmpty()) grades.map { it.score }.average().toInt() else 95

    val filteredAssignments = when (assignmentFilter) {
        "pending" -> assignments.filter { it.status == "pending" }
        "submitted" -> assignments.filter { it.status != "pending" }
        else -> assignments
    }

    LazyColumn(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        // Feedback Toast
        if (actionToast != null) {
            item {
                Card(colors = CardDefaults.cardColors(containerColor = Color(0xFF065F46))) {
                    Text(
                        actionToast ?: "",
                        color = Color.White,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        modifier = Modifier.padding(10.dp)
                    )
                }
            }
        }

        // Student Profile Header & KPI Strip
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
            ) {
                Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(student.name, fontWeight = FontWeight.ExtraBold, fontSize = 18.sp, color = Color.White)
                            Text("Grade ${student.grade}-${student.section} • Roll #${student.rollNumber}", fontSize = 12.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                        }
                        SuggestionChip(
                            onClick = {},
                            label = { Text("Honors Roster", fontSize = 10.sp, fontWeight = FontWeight.Bold) }
                        )
                    }

                    Divider(color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.2f))

                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Column {
                            Text("Cumulative GPA", fontSize = 10.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                            Text("${student.currentGpa} / 4.0", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        }
                        Column {
                            Text("Attendance", fontSize = 10.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                            Text("${student.attendanceRate}%", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color(0xFF34D399))
                        }
                        Column {
                            Text("Avg Score", fontSize = 10.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                            Text("$avgScore%", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        }
                    }
                }
            }
        }

        // SECTION 1: CURRENT ASSIGNMENTS SUMMARY
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Icon(Icons.Default.Assignment, contentDescription = "Homework", tint = MaterialTheme.colorScheme.primary)
                            Text("Current Assignments", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        }
                        TextButton(onClick = onNavigateToAcademics) {
                            Text("View All", fontSize = 11.sp)
                        }
                    }

                    // Segmented Filter
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        FilterChip(
                            selected = assignmentFilter == "pending",
                            onClick = { assignmentFilter = "pending" },
                            label = { Text("Pending ($pendingCount)", fontSize = 11.sp) },
                            modifier = Modifier.weight(1f)
                        )
                        FilterChip(
                            selected = assignmentFilter == "submitted",
                            onClick = { assignmentFilter = "submitted" },
                            label = { Text("Completed ($submittedCount)", fontSize = 11.sp) },
                            modifier = Modifier.weight(1f)
                        )
                        FilterChip(
                            selected = assignmentFilter == "all",
                            onClick = { assignmentFilter = "all" },
                            label = { Text("All (${assignments.size})", fontSize = 11.sp) },
                            modifier = Modifier.weight(1f)
                        )
                    }

                    // Homework Cards
                    filteredAssignments.take(3).forEach { asn ->
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                        ) {
                            Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Column {
                                        Text(asn.subject, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                                        Text(asn.title, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                                    }
                                    Column(horizontalAlignment = Alignment.End) {
                                        Text("${asn.totalScore} pts", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                        Text(
                                            if (asn.status == "pending") "Due: ${asn.dueDate}" else "Graded",
                                            fontSize = 10.sp,
                                            color = if (asn.status == "pending") Color(0xFFF59E0B) else Color(0xFF10B981)
                                        )
                                    }
                                }

                                if (asn.status == "pending") {
                                    Button(
                                        onClick = {
                                            val idx = assignments.indexOfFirst { it.id == asn.id }
                                            if (idx != -1) {
                                                assignments[idx] = asn.copy(status = "submitted", obtainedScore = asn.totalScore)
                                                actionToast = "✓ Turned in '${asn.title}' to teacher gradebook!"
                                            }
                                        },
                                        modifier = Modifier.fillMaxWidth(),
                                        contentPadding = PaddingValues(vertical = 4.dp)
                                    ) {
                                        Icon(Icons.Default.Upload, contentDescription = "Turn In", modifier = Modifier.size(14.dp))
                                        Spacer(modifier = Modifier.width(4.dp))
                                        Text("Turn In Work", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // SECTION 2: RECENT SUBJECT GRADES
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Icon(Icons.Default.School, contentDescription = "Grades", tint = Color(0xFF10B981))
                            Text("Recent Subject Grades", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        }
                        TextButton(onClick = onNavigateToAcademics) {
                            Text("Full Report", fontSize = 11.sp)
                        }
                    }

                    grades.take(3).forEach { gr ->
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                        ) {
                            Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Column {
                                        Text(gr.subject, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                        Text("${gr.teacher} • ${gr.code}", fontSize = 10.sp, color = Color.Gray)
                                    }
                                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                        Text("${gr.score}%", fontWeight = FontWeight.ExtraBold, fontSize = 14.sp)
                                        Badge(containerColor = MaterialTheme.colorScheme.primaryContainer) {
                                            Text(gr.letterGrade, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onPrimaryContainer)
                                        }
                                    }
                                }

                                // Linear Progress Indicator for Grade
                                LinearProgressIndicator(
                                    progress = { gr.score / 100f },
                                    modifier = Modifier.fillMaxWidth().height(4.dp).clip(RoundedCornerShape(2.dp)),
                                    color = if (gr.score >= 90) Color(0xFF10B981) else Color(0xFF6366F1)
                                )

                                Text(
                                    text = "“${gr.comments}”",
                                    fontSize = 11.sp,
                                    fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }
        }

        // SECTION 3: QUICK-CHAT INTERFACE WITH TEACHERS
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Icon(Icons.Default.Email, contentDescription = "Chat", tint = Color(0xFFF59E0B))
                            Text("Quick Teacher Q&A", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        }
                        TextButton(onClick = onNavigateToChat) {
                            Text("Full Chat", fontSize = 11.sp)
                        }
                    }

                    // Teacher Selector
                    Row(modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        teachers.forEachIndexed { idx, tch ->
                            FilterChip(
                                selected = selectedTeacherIndex == idx,
                                onClick = { selectedTeacherIndex = idx },
                                label = { Text("${tch.name.split(" ")[0]} (${tch.subjectCode})", fontSize = 11.sp) }
                            )
                        }
                    }

                    // Chat Stream snippet
                    val filteredMessages = chatMessages.filter { it.channel == ChatChannel.TEACHER_STUDENT }
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                    ) {
                        Column(modifier = Modifier.padding(8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Text(
                                "Live thread with ${activeTeacher.name}:",
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.primary
                            )

                            filteredMessages.takeLast(2).forEach { msg ->
                                val isStudent = msg.senderRole == UserRole.STUDENT
                                Column(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalAlignment = if (isStudent) Alignment.End else Alignment.Start
                                ) {
                                    Card(
                                        colors = CardDefaults.cardColors(
                                            containerColor = if (isStudent) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant
                                        )
                                    ) {
                                        Text(
                                            text = msg.text,
                                            fontSize = 11.sp,
                                            color = if (isStudent) Color.White else MaterialTheme.colorScheme.onSurface,
                                            modifier = Modifier.padding(8.dp)
                                        )
                                    }
                                    Text(msg.timestamp, fontSize = 9.sp, color = Color.Gray)
                                }
                            }

                            // Quick Inquiry Chips
                            Row(modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                                SuggestionChip(
                                    onClick = {
                                        chatMessages.add(
                                            ChatMessage(
                                                id = "MSG-${System.currentTimeMillis()}",
                                                senderRole = UserRole.STUDENT,
                                                senderName = student.name,
                                                text = "Assalamu alaikum teacher! Could you clarify the homework instructions?",
                                                timestamp = "Just now",
                                                channel = ChatChannel.TEACHER_STUDENT,
                                                recipientName = activeTeacher.name,
                                                teacherId = activeTeacher.id,
                                                studentId = student.id
                                            )
                                        )
                                        actionToast = "Message sent to ${activeTeacher.name}!"
                                    },
                                    label = { Text("📖 Clarify homework", fontSize = 10.sp) }
                                )
                                SuggestionChip(
                                    onClick = {
                                        chatMessages.add(
                                            ChatMessage(
                                                id = "MSG-${System.currentTimeMillis()}",
                                                senderRole = UserRole.STUDENT,
                                                senderName = student.name,
                                                text = "Can I review my recent grade comments with you?",
                                                timestamp = "Just now",
                                                channel = ChatChannel.TEACHER_STUDENT,
                                                recipientName = activeTeacher.name,
                                                teacherId = activeTeacher.id,
                                                studentId = student.id
                                            )
                                        )
                                        actionToast = "Message sent to ${activeTeacher.name}!"
                                    },
                                    label = { Text("📝 Review grade", fontSize = 10.sp) }
                                )
                            }

                            // Message Input
                            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
                                OutlinedTextField(
                                    value = quickChatInput,
                                    onValueChange = { quickChatInput = it },
                                    placeholder = { Text("Ask a question...", fontSize = 11.sp) },
                                    modifier = Modifier.weight(1f)
                                )
                                IconButton(
                                    onClick = {
                                        if (quickChatInput.isNotBlank()) {
                                            chatMessages.add(
                                                ChatMessage(
                                                    id = "MSG-${System.currentTimeMillis()}",
                                                    senderRole = UserRole.STUDENT,
                                                    senderName = student.name,
                                                    text = quickChatInput,
                                                    timestamp = "Just now",
                                                    channel = ChatChannel.TEACHER_STUDENT,
                                                    recipientName = activeTeacher.name,
                                                    teacherId = activeTeacher.id,
                                                    studentId = student.id
                                                )
                                            )
                                            quickChatInput = ""
                                            actionToast = "Message sent to ${activeTeacher.name}!"
                                        }
                                    }
                                ) {
                                    Icon(Icons.Default.Send, contentDescription = "Send", tint = MaterialTheme.colorScheme.primary)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun StudentAcademicsFullView(
    student: Student,
    grades: List<SubjectGrade>,
    assignments: List<Assignment>
) {
    LazyColumn(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text("Fall Term Gradebook & Transcript", fontWeight = FontWeight.ExtraBold, fontSize = 16.sp)
                    Text("Official Record • Grade ${student.grade}-${student.section}", fontSize = 12.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Cumulative GPA: ${student.currentGpa} / 4.0", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
            }
        }

        item {
            Text("Enrolled Subject Standings", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        }

        items(grades) { gr ->
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(gr.subject, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text("Educator: ${gr.teacher} • ${gr.credits} Credits", fontSize = 11.sp, color = Color.Gray)
                        }
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Text("${gr.score}%", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Badge {
                                Text(gr.letterGrade, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                    Text("“${gr.comments}”", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

@Composable
fun StudentTimetableView(timetable: List<TimetableSlot>) {
    LazyColumn(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        item {
            Text("Daily Class Schedule (Bell Schedule A)", fontWeight = FontWeight.Bold, fontSize = 16.sp)
        }
        items(timetable) { slot ->
            Card(modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.padding(12.dp).fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(slot.time, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        Text(slot.subject, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                        Text(slot.teacher, fontSize = 11.sp, color = Color.Gray)
                    }
                    SuggestionChip(
                        onClick = {},
                        label = { Text(slot.room, fontSize = 11.sp, fontWeight = FontWeight.SemiBold) }
                    )
                }
            }
        }
    }
}

@Composable
fun StudentIdPassView(student: Student) {
    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Madrasaa Ifaa Islaamaa", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    Badge(containerColor = Color(0xFF10B981)) {
                        Text("ACTIVE PASS", color = Color.White, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                    }
                }

                Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier.size(64.dp).background(MaterialTheme.colorScheme.surface, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Person, contentDescription = "Student", modifier = Modifier.size(36.dp))
                    }
                    Column {
                        Text(student.name, fontWeight = FontWeight.ExtraBold, fontSize = 17.sp, color = Color.White)
                        Text("Grade ${student.grade}-${student.section} • Roll #${student.rollNumber}", fontSize = 12.sp)
                        Text("DOB: ${student.dob} • Blood: ${student.bloodGroup}", fontSize = 11.sp, color = MaterialTheme.colorScheme.onPrimaryContainer)
                    }
                }

                Divider(color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.2f))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("NFC RFID TOKEN", fontSize = 9.sp, color = Color.LightGray)
                        Text("STU-2026-894-CC", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    }
                    Icon(Icons.Default.QrCode, contentDescription = "QR Code", modifier = Modifier.size(36.dp))
                }
            }
        }

        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text("Campus Transit & Emergency", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text("Bus Route: ${student.busRoute} (${student.busStatus})", fontSize = 12.sp)
                Text("Parent Hotline: ${student.parentPhone}", fontSize = 12.sp, color = MaterialTheme.colorScheme.primary)
            }
        }
    }
}

// =========================================================================
// 2. TEACHER SCREEN: SCORE ENTRY, MASTER LEDGER, ATTENDANCE & CHAT
// =========================================================================

@Composable
fun TeacherScreen(
    students: List<Student>,
    teachers: List<TeacherProfile>,
    assignments: MutableList<Assignment>,
    currentBottomTab: String = "gradebook",
    chatMessages: MutableList<ChatMessage> = mutableListOf()
) {
    if (currentBottomTab == "chat") {
        TeacherChatView(students, teachers, chatMessages)
        return
    }

    var teacherSubTab by remember { mutableStateOf("entry") }
    var selectedTeacherIndex by remember { mutableStateOf(0) }
    val activeTeacher = teachers[selectedTeacherIndex]

    // Score state: Map of studentId -> (subjectCode -> StudentSubjectScore)
    val scoreMap = remember {
        mutableStateMapOf<String, MutableMap<String, StudentSubjectScore>>().apply {
            students.forEach { st ->
                val subjectsMap = mutableMapOf<String, StudentSubjectScore>()
                teachers.forEachIndexed { tIdx, tch ->
                    val defaultAssign = 18 + (tIdx % 3)
                    val defaultQuiz = 18 + ((tIdx + 1) % 3)
                    val defaultMid = 18 + ((tIdx + 2) % 3)
                    val defaultFinal = 36 + (tIdx % 4)
                    subjectsMap[tch.subjectCode] = StudentSubjectScore(
                        studentId = st.id,
                        studentName = st.name,
                        rollNumber = st.rollNumber,
                        subjectCode = tch.subjectCode,
                        assignmentScore = defaultAssign.coerceIn(0, 20),
                        quizScore = defaultQuiz.coerceIn(0, 20),
                        midtermScore = defaultMid.coerceIn(0, 20),
                        finalExamScore = defaultFinal.coerceIn(0, 40),
                        remarks = "Evaluated by ${tch.name}: active participation & consistent Tajweed/academics."
                    )
                }
                put(st.id, subjectsMap)
            }
        }
    }

    var saveToast by remember { mutableStateOf<String?>(null) }

    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        
        // Mode Selector: Teacher Score Entry vs Master Ledger
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            Button(
                onClick = { teacherSubTab = "entry" },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (teacherSubTab == "entry") MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Text(
                    text = "Score Entry",
                    color = if (teacherSubTab == "entry") MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            Button(
                onClick = { teacherSubTab = "master_ledger" },
                modifier = Modifier.weight(1.2f),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (teacherSubTab == "master_ledger") MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Text(
                    text = "Master Ledger (All)",
                    color = if (teacherSubTab == "master_ledger") MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        if (saveToast != null) {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1B5E20)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = saveToast ?: "",
                    color = Color.White,
                    modifier = Modifier.padding(10.dp),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }

        // VIEW 1: INDIVIDUAL TEACHER SCORE ENTRY
        if (teacherSubTab == "entry") {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
            ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(activeTeacher.name, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                            Text("${activeTeacher.subjectName} (${activeTeacher.subjectCode}) • Grade 10-A", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSecondaryContainer)
                        }
                        FilledTonalButton(
                            onClick = {
                                selectedTeacherIndex = (selectedTeacherIndex + 1) % teachers.size
                                saveToast = "Switched to ${teachers[selectedTeacherIndex].name}"
                            }
                        ) {
                            Text("Next Teacher", fontSize = 11.sp)
                        }
                    }

                    // Horizontal Teacher Chips
                    Row(
                        modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        teachers.forEachIndexed { index, tch ->
                            FilterChip(
                                selected = selectedTeacherIndex == index,
                                onClick = { selectedTeacherIndex = index },
                                label = { Text(tch.subjectCode.replace("-10", ""), fontSize = 11.sp) }
                            )
                        }
                    }
                }
            }

            // Student Roster Score Inputs
            Text("Students in Grade 10-A (${students.size})", fontWeight = FontWeight.Bold, fontSize = 13.sp)

            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(students) { st ->
                    val studentScores = scoreMap[st.id]
                    val currentScore = studentScores?.get(activeTeacher.subjectCode) ?: StudentSubjectScore(
                        st.id, st.name, st.rollNumber, activeTeacher.subjectCode
                    )

                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(st.name, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                    Text("Roll #${st.rollNumber}", fontSize = 11.sp, color = Color.Gray)
                                }

                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                    Text(
                                        text = "${currentScore.totalScore}/100",
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 15.sp,
                                        color = MaterialTheme.colorScheme.primary
                                    )
                                    SuggestionChip(
                                        onClick = {},
                                        label = { Text(currentScore.letterGrade, fontWeight = FontWeight.Bold, fontSize = 11.sp) }
                                    )
                                }
                            }

                            // Stepper Controls for 4 assessment components
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                ScoreComponentBox("Assign (20)", currentScore.assignmentScore) {
                                    currentScore.assignmentScore = (currentScore.assignmentScore + 1).takeIf { it <= 20 } ?: 15
                                    scoreMap[st.id]?.put(activeTeacher.subjectCode, currentScore)
                                }
                                ScoreComponentBox("Quiz (20)", currentScore.quizScore) {
                                    currentScore.quizScore = (currentScore.quizScore + 1).takeIf { it <= 20 } ?: 15
                                    scoreMap[st.id]?.put(activeTeacher.subjectCode, currentScore)
                                }
                                ScoreComponentBox("Mid (20)", currentScore.midtermScore) {
                                    currentScore.midtermScore = (currentScore.midtermScore + 1).takeIf { it <= 20 } ?: 15
                                    scoreMap[st.id]?.put(activeTeacher.subjectCode, currentScore)
                                }
                                ScoreComponentBox("Final (40)", currentScore.finalExamScore) {
                                    currentScore.finalExamScore = (currentScore.finalExamScore + 1).takeIf { it <= 40 } ?: 30
                                    scoreMap[st.id]?.put(activeTeacher.subjectCode, currentScore)
                                }
                            }
                        }
                    }
                }
            }

            Button(
                onClick = {
                    saveToast = "Saved & Published ${activeTeacher.subjectName} scores to Master Ledger!"
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Save ${activeTeacher.subjectCode} Grades to Master Ledger")
            }
        }

        // VIEW 2: MASTER CONSOLIDATED LEDGER
        if (teacherSubTab == "master_ledger") {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("Madrasaa Ifaa Islaamaa", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                    Text("Master Consolidated Grade Ledger", fontSize = 16.sp, fontWeight = FontWeight.ExtraBold)
                    Text("Grade 10-A • All 6 Subject Teachers Collected", fontSize = 12.sp, color = Color.DarkGray)
                }
            }

            Text("Class Roster Ranked by Aggregate Score", fontWeight = FontWeight.Bold, fontSize = 13.sp)

            val rankedStudents = students.map { st ->
                val subs = scoreMap[st.id] ?: emptyMap()
                var sumMarks = 0
                subs.values.forEach { sumMarks += it.totalScore }
                val avgPct = if (teachers.isNotEmpty()) sumMarks.toFloat() / teachers.size else 0f
                Triple(st, sumMarks, avgPct)
            }.sortedByDescending { it.second }

            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(rankedStudents.size) { index ->
                    val (st, totalScore, avgPct) = rankedStudents[index]
                    val studentSubs = scoreMap[st.id] ?: emptyMap()

                    Card(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Badge(containerColor = if (index == 0) Color(0xFFFFB300) else Color.Gray) {
                                        Text("#${index + 1}", color = Color.White, fontWeight = FontWeight.Bold)
                                    }
                                    Column {
                                        Text(st.name, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                        Text("Roll #${st.rollNumber} • ${if (index == 0) "Top of Class" else "Promoted"}", fontSize = 11.sp, color = Color.Gray)
                                    }
                                }

                                Column(horizontalAlignment = Alignment.End) {
                                    Text(
                                        text = "$totalScore / 600",
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 14.sp,
                                        color = MaterialTheme.colorScheme.primary
                                    )
                                    Text(
                                        text = "Avg: %.1f%%".format(avgPct),
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.SemiBold,
                                        color = Color(0xFF2E7D32)
                                    )
                                }
                            }

                            Divider(modifier = Modifier.padding(vertical = 2.dp))

                            // Grid of all 6 teachers' scores side by side
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                teachers.forEach { tch ->
                                    val subScore = studentSubs[tch.subjectCode]?.totalScore ?: 0
                                    Column(horizontalAlignment = Alignment.CenterVertically) {
                                        Text(tch.subjectCode.replace("-10", ""), fontSize = 9.sp, fontWeight = FontWeight.Bold, color = Color.Gray)
                                        Text(subScore.toString(), fontSize = 11.sp, fontWeight = FontWeight.ExtraBold)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ScoreComponentBox(label: String, score: Int, onClick: () -> Unit) {
    FilledTonalButton(
        onClick = onClick,
        contentPadding = PaddingValues(horizontal = 6.dp, vertical = 2.dp),
        shape = RoundedCornerShape(8.dp)
    ) {
        Column(horizontalAlignment = Alignment.CenterVertically) {
            Text(label, fontSize = 8.sp, color = Color.Gray)
            Text(score.toString(), fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }
    }
}

// =========================================================================
// 3. PARENT SCREEN: BUS TRACKER, TUITION PAYMENTS, TEACHER CONTACT
// =========================================================================

@Composable
fun ParentScreen(
    student: Student,
    invoices: MutableList<FeeInvoice>,
    chatMessages: MutableList<ChatMessage>,
    currentBottomTab: String
) {
    var paidToast by remember { mutableStateOf<String?>(null) }

    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        if (paidToast != null) {
            Card(colors = CardDefaults.cardColors(containerColor = Color(0xFF065F46))) {
                Text(paidToast ?: "", color = Color.White, fontSize = 12.sp, modifier = Modifier.padding(10.dp))
            }
        }

        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Guardian Portal: David & Elena Chen", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text("Student: ${student.name} (Grade ${student.grade}-${student.section})", fontSize = 13.sp, color = Color.Gray)
                Spacer(modifier = Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    Icon(Icons.Default.DirectionsBus, contentDescription = "Bus", tint = Color(0xFFF59E0B))
                    Text("School Bus: ${student.busRoute} (${student.busStatus})", fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                }
                Text("Estimated Arrival: 4 mins away", color = Color(0xFFF57C00), fontWeight = FontWeight.Bold, fontSize = 12.sp)
            }
        }

        Text("Madrasaa Tuition & Fee Invoices", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        invoices.forEach { inv ->
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(inv.term, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text(inv.description, fontSize = 11.sp, color = Color.Gray)
                        }
                        Text("$${"%.2f".format(inv.amount)}", fontSize = 16.sp, fontWeight = FontWeight.ExtraBold, color = MaterialTheme.colorScheme.primary)
                    }

                    if (!inv.isPaid) {
                        Button(
                            onClick = {
                                val idx = invoices.indexOfFirst { it.id == inv.id }
                                if (idx != -1) {
                                    invoices[idx] = inv.copy(isPaid = true, receiptNumber = "REC-2026-9021", paymentMethod = "Google Pay (Verified)")
                                    paidToast = "✓ Paid $${inv.amount} via Google Pay! Receipt generated."
                                }
                            },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("Pay with 1-Tap (Google Pay)")
                        }
                    } else {
                        Badge(containerColor = Color(0xFF10B981)) {
                            Text("PAID • ${inv.paymentMethod ?: "Processed"}", color = Color.White, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}

// =========================================================================
// 4. ADMIN SCREEN: KPIS, EMERGENCY BROADCASTS, ROSTER
// =========================================================================

@Composable
fun AdminScreen(
    students: List<Student>,
    teachers: List<TeacherProfile>,
    currentBottomTab: String = "dashboard",
    chatMessages: MutableList<ChatMessage> = mutableListOf(),
    onBroadcastAlert: (String) -> Unit
) {
    if (currentBottomTab == "chat") {
        AdminChatView(teachers, chatMessages)
        return
    }

    var broadcastText by remember { mutableStateOf("") }
    var showDialog by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Principal & Directorate Command", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            Button(
                onClick = { showDialog = true },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFDC2626))
            ) {
                Icon(Icons.Default.Warning, contentDescription = "Alert", modifier = Modifier.size(14.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Emergency Alert", fontSize = 11.sp)
            }
        }

        if (showDialog) {
            AlertDialog(
                onDismissRequest = { showDialog = false },
                title = { Text("Campus Emergency Broadcast") },
                text = {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text("Broadcast priority notification across all student, parent, and faculty devices:")
                        OutlinedTextField(
                            value = broadcastText,
                            onValueChange = { broadcastText = it },
                            placeholder = { Text("e.g. Inclement weather protocol in effect...") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                },
                confirmButton = {
                    Button(
                        onClick = {
                            if (broadcastText.isNotBlank()) {
                                onBroadcastAlert("URGENT NOTICE: $broadcastText")
                                broadcastText = ""
                                showDialog = false
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFDC2626))
                    ) {
                        Text("Broadcast Now")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showDialog = false }) { Text("Cancel") }
                }
            )
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
            Card(modifier = Modifier.weight(1f)) {
                Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterVertically) {
                    Text("Total Enrolled", fontSize = 11.sp, color = Color.Gray)
                    Text("1,248", fontSize = 20.sp, fontWeight = FontWeight.Bold)
                }
            }
            Card(modifier = Modifier.weight(1f)) {
                Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterVertically) {
                    Text("Attendance", fontSize = 11.sp, color = Color.Gray)
                    Text("96.8%", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFF2E7D32))
                }
            }
            Card(modifier = Modifier.weight(1f)) {
                Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterVertically) {
                    Text("Active Faculty", fontSize = 11.sp, color = Color.Gray)
                    Text("42", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                }
            }
        }

        Text("Madrasaa Ifaa Islaamaa Student Roster", fontWeight = FontWeight.Bold, fontSize = 14.sp)
        LazyColumn(verticalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.weight(1f)) {
            items(students) { st ->
                Card(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier.padding(10.dp).fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(st.name, fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                            Text("Grade ${st.grade}-${st.section} • Roll #${st.rollNumber} • GPA: ${st.currentGpa}", fontSize = 12.sp, color = Color.Gray)
                        }
                        SuggestionChip(
                            onClick = {},
                            label = { Text("Active", fontSize = 10.sp) }
                        )
                    }
                }
            }
        }
    }
}

// =========================================================================
// 5. NATIVE COMPOSE CHAT VIEWS
// =========================================================================

@Composable
fun TeacherChatView(
    students: List<Student>,
    teachers: List<TeacherProfile>,
    chatMessages: MutableList<ChatMessage>
) {
    var channelMode by remember { mutableStateOf("student") }
    var selectedStudentId by remember { mutableStateOf(students.firstOrNull()?.id ?: "") }
    var chatInput by remember { mutableStateOf("") }
    val activeStudent = students.find { it.id == selectedStudentId } ?: students.firstOrNull()

    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Teacher Communication Center", fontWeight = FontWeight.Bold, fontSize = 16.sp)

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                onClick = { channelMode = "student" },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (channelMode == "student") MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Text(
                    "Student Inquiries",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (channelMode == "student") MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Button(
                onClick = { channelMode = "admin" },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (channelMode == "admin") MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Text(
                    "Admin / Principal",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (channelMode == "admin") MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        if (channelMode == "student") {
            Row(modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                students.forEach { st ->
                    FilterChip(
                        selected = selectedStudentId == st.id,
                        onClick = { selectedStudentId = st.id },
                        label = { Text("${st.name.split(" ")[0]} (#${st.rollNumber})", fontSize = 11.sp) }
                    )
                }
            }

            val filtered = chatMessages.filter { it.channel == ChatChannel.TEACHER_STUDENT }

            LazyColumn(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                items(filtered) { msg ->
                    val isTeacher = msg.senderRole == UserRole.TEACHER
                    Card(
                        modifier = Modifier.fillMaxWidth().padding(start = if (isTeacher) 40.dp else 0.dp, end = if (isTeacher) 0.dp else 40.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isTeacher) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant
                        )
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text(msg.senderName, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                            Text(msg.text, fontSize = 12.sp)
                            Text(msg.timestamp, fontSize = 9.sp, color = Color.Gray, modifier = Modifier.align(Alignment.End))
                        }
                    }
                }
            }

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
                OutlinedTextField(
                    value = chatInput,
                    onValueChange = { chatInput = it },
                    placeholder = { Text("Reply to student...", fontSize = 12.sp) },
                    modifier = Modifier.weight(1f)
                )
                Button(
                    onClick = {
                        if (chatInput.isNotBlank()) {
                            chatMessages.add(
                                ChatMessage(
                                    id = "MSG-${System.currentTimeMillis()}",
                                    senderRole = UserRole.TEACHER,
                                    senderName = "Ustaz Ahmad Al-Hadi",
                                    text = chatInput,
                                    timestamp = "Just now",
                                    channel = ChatChannel.TEACHER_STUDENT,
                                    recipientName = activeStudent?.name ?: "Student",
                                    teacherId = "TCH-01",
                                    studentId = activeStudent?.id ?: ""
                                )
                            )
                            chatInput = ""
                        }
                    }
                ) {
                    Text("Send")
                }
            }
        } else {
            val filtered = chatMessages.filter { it.channel == ChatChannel.TEACHER_ADMIN }

            LazyColumn(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                items(filtered) { msg ->
                    val isTeacher = msg.senderRole == UserRole.TEACHER
                    Card(
                        modifier = Modifier.fillMaxWidth().padding(start = if (isTeacher) 40.dp else 0.dp, end = if (isTeacher) 0.dp else 40.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isTeacher) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant
                        )
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text(msg.senderName, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                            Text(msg.text, fontSize = 12.sp)
                            Text(msg.timestamp, fontSize = 9.sp, color = Color.Gray, modifier = Modifier.align(Alignment.End))
                        }
                    }
                }
            }

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
                OutlinedTextField(
                    value = chatInput,
                    onValueChange = { chatInput = it },
                    placeholder = { Text("Message Principal...", fontSize = 12.sp) },
                    modifier = Modifier.weight(1f)
                )
                Button(
                    onClick = {
                        if (chatInput.isNotBlank()) {
                            chatMessages.add(
                                ChatMessage(
                                    id = "MSG-${System.currentTimeMillis()}",
                                    senderRole = UserRole.TEACHER,
                                    senderName = "Ustaz Ahmad Al-Hadi",
                                    text = chatInput,
                                    timestamp = "Just now",
                                    channel = ChatChannel.TEACHER_ADMIN,
                                    recipientName = "Principal Ustaz Ibrahim",
                                    teacherId = "TCH-01"
                                )
                            )
                            chatInput = ""
                        }
                    }
                ) {
                    Text("Send")
                }
            }
        }
    }
}

@Composable
fun StudentChatView(
    student: Student,
    teachers: List<TeacherProfile>,
    chatMessages: MutableList<ChatMessage>
) {
    var selectedTeacherIndex by remember { mutableStateOf(0) }
    var chatInput by remember { mutableStateOf("") }
    val activeTeacher = teachers.getOrNull(selectedTeacherIndex) ?: teachers.firstOrNull()

    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Ask Subject Teacher", fontWeight = FontWeight.Bold, fontSize = 16.sp)

        Row(modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            teachers.forEachIndexed { idx, tch ->
                FilterChip(
                    selected = selectedTeacherIndex == idx,
                    onClick = { selectedTeacherIndex = idx },
                    label = { Text("${tch.name.split(" ")[0]} (${tch.subjectCode})", fontSize = 11.sp) }
                )
            }
        }

        val filtered = chatMessages.filter { it.channel == ChatChannel.TEACHER_STUDENT }

        LazyColumn(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            items(filtered) { msg ->
                val isStudent = msg.senderRole == UserRole.STUDENT
                Card(
                    modifier = Modifier.fillMaxWidth().padding(start = if (isStudent) 40.dp else 0.dp, end = if (isStudent) 0.dp else 40.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = if (isStudent) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant
                    )
                ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                        Text(msg.senderName, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        Text(msg.text, fontSize = 12.sp)
                        Text(msg.timestamp, fontSize = 9.sp, color = Color.Gray, modifier = Modifier.align(Alignment.End))
                    }
                }
            }
        }

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(
                value = chatInput,
                onValueChange = { chatInput = it },
                placeholder = { Text("Ask ${activeTeacher?.name?.split(" ")?.firstOrNull() ?: "Teacher"}...", fontSize = 12.sp) },
                modifier = Modifier.weight(1f)
            )
            Button(
                onClick = {
                    if (chatInput.isNotBlank()) {
                        chatMessages.add(
                            ChatMessage(
                                id = "MSG-${System.currentTimeMillis()}",
                                senderRole = UserRole.STUDENT,
                                senderName = student.name,
                                text = chatInput,
                                timestamp = "Just now",
                                channel = ChatChannel.TEACHER_STUDENT,
                                recipientName = activeTeacher?.name ?: "Teacher",
                                teacherId = activeTeacher?.id ?: "TCH-01",
                                studentId = student.id
                            )
                        )
                        chatInput = ""
                    }
                }
            ) {
                Text("Send")
            }
        }
    }
}

@Composable
fun AdminChatView(
    teachers: List<TeacherProfile>,
    chatMessages: MutableList<ChatMessage>
) {
    var selectedTeacherIndex by remember { mutableStateOf(0) }
    var chatInput by remember { mutableStateOf("") }
    val activeTeacher = teachers.getOrNull(selectedTeacherIndex) ?: teachers.firstOrNull()

    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Principal Direct Comms with Faculty", fontWeight = FontWeight.Bold, fontSize = 16.sp)

        Row(modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            teachers.forEachIndexed { idx, tch ->
                FilterChip(
                    selected = selectedTeacherIndex == idx,
                    onClick = { selectedTeacherIndex = idx },
                    label = { Text("${tch.name} (${tch.subjectCode})", fontSize = 11.sp) }
                )
            }
        }

        val filtered = chatMessages.filter { it.channel == ChatChannel.TEACHER_ADMIN }

        LazyColumn(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            items(filtered) { msg ->
                val isAdmin = msg.senderRole == UserRole.ADMIN
                Card(
                    modifier = Modifier.fillMaxWidth().padding(start = if (isAdmin) 40.dp else 0.dp, end = if (isAdmin) 0.dp else 40.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = if (isAdmin) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant
                    )
                ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                        Text(msg.senderName, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        Text(msg.text, fontSize = 12.sp)
                        Text(msg.timestamp, fontSize = 9.sp, color = Color.Gray, modifier = Modifier.align(Alignment.End))
                    }
                }
            }
        }

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(
                value = chatInput,
                onValueChange = { chatInput = it },
                placeholder = { Text("Direct administrative instruction...", fontSize = 12.sp) },
                modifier = Modifier.weight(1f)
            )
            Button(
                onClick = {
                    if (chatInput.isNotBlank()) {
                        chatMessages.add(
                            ChatMessage(
                                id = "MSG-${System.currentTimeMillis()}",
                                senderRole = UserRole.ADMIN,
                                senderName = "Principal Ustaz Ibrahim",
                                text = chatInput,
                                timestamp = "Just now",
                                channel = ChatChannel.TEACHER_ADMIN,
                                recipientName = activeTeacher?.name ?: "Teacher",
                                teacherId = activeTeacher?.id ?: "TCH-01"
                            )
                        )
                        chatInput = ""
                    }
                }
            ) {
                Text("Send")
            }
        }
    }
}
