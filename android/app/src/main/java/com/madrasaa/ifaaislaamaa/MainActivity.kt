package com.madrasaa.ifaaislaamaa

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.madrasaa.ifaaislaamaa.model.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MadrasaaIfaaIslaamaaApp()
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MadrasaaIfaaIslaamaaApp() {
    var selectedRole by remember { mutableStateOf(UserRole.TEACHER) }
    var currentBottomTab by remember { mutableStateOf("gradebook") }

    // Seed mock students
    val students = remember {
        listOf(
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

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Madrasaa Ifaa Islaamaa",
                            fontWeight = FontWeight.Bold,
                            fontSize = 17.sp
                        )
                        Text(
                            text = "K-12 School Management System",
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
                                UserRole.STUDENT -> UserRole.PARENT
                                UserRole.PARENT -> UserRole.TEACHER
                                UserRole.TEACHER -> UserRole.ADMIN
                                UserRole.ADMIN -> UserRole.STUDENT
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
                    }
                    UserRole.STUDENT -> {
                        NavigationBarItem(
                            selected = currentBottomTab == "home",
                            onClick = { currentBottomTab = "home" },
                            icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                            label = { Text("Home") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "academics",
                            onClick = { currentBottomTab = "academics" },
                            icon = { Icon(Icons.Default.School, contentDescription = "Academics") },
                            label = { Text("Grades") }
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
                            icon = { Icon(Icons.Default.AttachMoney, contentDescription = "Fees") },
                            label = { Text("Tuition") }
                        )
                    }
                    UserRole.ADMIN -> {
                        NavigationBarItem(
                            selected = currentBottomTab == "dashboard",
                            onClick = { currentBottomTab = "dashboard" },
                            icon = { Icon(Icons.Default.Dashboard, contentDescription = "Dashboard") },
                            label = { Text("KPIs") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "reports",
                            onClick = { currentBottomTab = "reports" },
                            icon = { Icon(Icons.Default.Print, contentDescription = "Master Ledger") },
                            label = { Text("Master Ledger") }
                        )
                    }
                }
            }
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding).fillMaxSize().padding(12.dp)) {
            when (selectedRole) {
                UserRole.TEACHER -> TeacherScreen(students.filter { it.grade == 10 }, teachers)
                UserRole.STUDENT -> StudentScreen(students.first())
                UserRole.PARENT -> ParentScreen(students.first())
                UserRole.ADMIN -> AdminScreen(students)
            }
        }
    }
}

@Composable
fun TeacherScreen(students: List<Student>, teachers: List<TeacherProfile>) {
    var teacherSubTab by remember { mutableStateOf("entry") } // "entry" vs "master_ledger" vs "attendance"
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

        // VIEW 2: MASTER CONSOLIDATED LEDGER (ALL TEACHERS' SCORES AT ONE PLACE)
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

            // Calculate aggregate across all teachers for each student
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

@Composable
fun StudentScreen(student: Student) {
    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(student.name, fontWeight = FontWeight.Bold, fontSize = 20.sp)
                Text("Grade ${student.grade}-${student.section} • Roll #${student.rollNumber}", fontSize = 13.sp)
                Spacer(modifier = Modifier.height(10.dp))
                Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                    Text("GPA: ${student.currentGpa} / 4.0", fontWeight = FontWeight.SemiBold)
                    Text("Attendance: ${student.attendanceRate}%", fontWeight = FontWeight.SemiBold, color = Color(0xFF2E7D32))
                }
            }
        }

        Text("Today's Quran & Academic Classes", fontWeight = FontWeight.Bold, fontSize = 16.sp)
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text("Quran Recitation & Tajweed • Room 302", fontWeight = FontWeight.SemiBold)
                Text("08:00 - 09:15 AM • Ustaz Ahmad Al-Hadi", fontSize = 12.sp, color = Color.Gray)
            }
        }
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text("Arabic Grammar (Nahw) • Room 204", fontWeight = FontWeight.SemiBold)
                Text("09:30 - 10:45 AM • Ustaza Fatima Zahra", fontSize = 12.sp, color = Color.Gray)
            }
        }
    }
}

@Composable
fun ParentScreen(student: Student) {
    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Guardian Portal: David & Elena Chen", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text("Student: ${student.name} (Grade ${student.grade}-${student.section})", fontSize = 13.sp, color = Color.Gray)
                Spacer(modifier = Modifier.height(8.dp))
                Text("School Bus: ${student.busRoute} (${student.busStatus})", fontSize = 13.sp)
                Text("Estimated Arrival: 4 mins away", color = Color(0xFFF57C00), fontWeight = FontWeight.Bold)
            }
        }

        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Madrasaa Term Tuition Invoice", fontWeight = FontWeight.Bold)
                Text("Amount Due: $1,450.00", fontSize = 18.sp, color = MaterialTheme.colorScheme.primary)
                Spacer(modifier = Modifier.height(8.dp))
                Button(onClick = { /* Pay */ }, modifier = Modifier.fillMaxWidth()) {
                    Text("Pay with 1-Tap (Google Pay)")
                }
            }
        }
    }
}

@Composable
fun AdminScreen(students: List<Student>) {
    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Principal & Administrator Command", fontWeight = FontWeight.Bold, fontSize = 18.sp)

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
        }

        Text("Madrasaa Ifaa Islaamaa Roster (Grades 1-12)", fontWeight = FontWeight.Bold, fontSize = 15.sp)
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
                            Text("Grade ${st.grade}-${st.section} • GPA: ${st.currentGpa}", fontSize = 12.sp, color = Color.Gray)
                        }
                        TextButton(onClick = { }) {
                            Text("Master Ledger", fontSize = 11.sp)
                        }
                    }
                }
            }
        }
    }
}
