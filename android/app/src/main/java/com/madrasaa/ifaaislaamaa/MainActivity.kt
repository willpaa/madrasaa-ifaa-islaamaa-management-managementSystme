package com.madrasaa.ifaaislaamaa

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
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
    var selectedRole by remember { mutableStateOf(UserRole.STUDENT) }
    var currentBottomTab by remember { mutableStateOf("home") }

    // Seed mock data
    val students = remember {
        listOf(
            Student("STU-101", "Sophia Chen", 10, "A", "10-A-14", "David & Elena Chen", "+1 (555) 234-8901", 97.2f, 3.92f, "Route 4B", "In Transit"),
            Student("STU-102", "Leo Chen", 3, "B", "03-B-08", "David & Elena Chen", "+1 (555) 234-8901", 98.8f, 4.00f, "Route 4B", "Boarded"),
            Student("STU-103", "Marcus Miller", 10, "A", "10-A-21", "Sarah Miller", "+1 (555) 345-6789", 91.5f, 3.45f, "Route 2A", "Dropped Off"),
            Student("STU-104", "Aisha Patel", 10, "A", "10-A-03", "Rajesh Patel", "+1 (555) 456-7890", 99.1f, 4.00f, "Route 4B", "In Transit")
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
                            fontSize = 18.sp
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
                        NavigationBarItem(
                            selected = currentBottomTab == "schedule",
                            onClick = { currentBottomTab = "schedule" },
                            icon = { Icon(Icons.Default.CalendarToday, contentDescription = "Schedule") },
                            label = { Text("Timetable") }
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
                        NavigationBarItem(
                            selected = currentBottomTab == "bus",
                            onClick = { currentBottomTab = "bus" },
                            icon = { Icon(Icons.Default.DirectionsBus, contentDescription = "Bus") },
                            label = { Text("Bus GPS") }
                        )
                    }
                    UserRole.TEACHER -> {
                        NavigationBarItem(
                            selected = currentBottomTab == "attendance",
                            onClick = { currentBottomTab = "attendance" },
                            icon = { Icon(Icons.Default.CheckCircle, contentDescription = "Attendance") },
                            label = { Text("Attendance") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "gradebook",
                            onClick = { currentBottomTab = "gradebook" },
                            icon = { Icon(Icons.Default.Assessment, contentDescription = "Gradebook") },
                            label = { Text("Gradebook") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "tasks",
                            onClick = { currentBottomTab = "tasks" },
                            icon = { Icon(Icons.Default.Assignment, contentDescription = "Homework") },
                            label = { Text("Homework") }
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
                            selected = currentBottomTab == "students",
                            onClick = { currentBottomTab = "students" },
                            icon = { Icon(Icons.Default.People, contentDescription = "Directory") },
                            label = { Text("Students") }
                        )
                        NavigationBarItem(
                            selected = currentBottomTab == "reports",
                            onClick = { currentBottomTab = "reports" },
                            icon = { Icon(Icons.Default.Print, contentDescription = "PDF Reports") },
                            label = { Text("PDF Reports") }
                        )
                    }
                }
            }
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding).fillMaxSize().padding(16.dp)) {
            when (selectedRole) {
                UserRole.STUDENT -> StudentScreen(students.first())
                UserRole.PARENT -> ParentScreen(students.first())
                UserRole.TEACHER -> TeacherScreen(students)
                UserRole.ADMIN -> AdminScreen(students)
            }
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

        Text("Today's Classes", fontWeight = FontWeight.Bold, fontSize = 16.sp)
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text("AP Biology • Room 302", fontWeight = FontWeight.SemiBold)
                Text("08:30 - 09:45 AM • Dr. Evelyn Vance", fontSize = 12.sp, color = Color.Gray)
            }
        }
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text("Pre-Calculus Honors • Room 204", fontWeight = FontWeight.SemiBold)
                Text("10:00 - 11:15 AM • Prof. Thorne", fontSize = 12.sp, color = Color.Gray)
            }
        }
    }
}

@Composable
fun TeacherScreen(students: List<Student>) {
    var attendanceState by remember {
        mutableStateOf(students.associate { it.id to AttendanceStatus.PRESENT }.toMutableMap())
    }

    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Grade 10-A Classroom Attendance", fontWeight = FontWeight.Bold, fontSize = 18.sp)
        Text("Tap student to toggle: Present ➔ Late ➔ Absent ➔ Excused", fontSize = 12.sp, color = Color.Gray)

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.weight(1f)) {
            items(students) { st ->
                val status = attendanceState[st.id] ?: AttendanceStatus.PRESENT
                Card(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier.padding(12.dp).fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(st.name, fontWeight = FontWeight.SemiBold)
                            Text("Roll: #${st.rollNumber}", fontSize = 11.sp, color = Color.Gray)
                        }
                        Button(
                            onClick = {
                                val next = when (status) {
                                    AttendanceStatus.PRESENT -> AttendanceStatus.LATE
                                    AttendanceStatus.LATE -> AttendanceStatus.ABSENT
                                    AttendanceStatus.ABSENT -> AttendanceStatus.EXCUSED
                                    AttendanceStatus.EXCUSED -> AttendanceStatus.PRESENT
                                }
                                attendanceState = HashMap(attendanceState).apply { put(st.id, next) }
                            },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = when (status) {
                                    AttendanceStatus.PRESENT -> Color(0xFF2E7D32)
                                    AttendanceStatus.LATE -> Color(0xFFF57C00)
                                    AttendanceStatus.ABSENT -> Color(0xFFD32F2F)
                                    AttendanceStatus.EXCUSED -> Color(0xFF1976D2)
                                }
                            )
                        ) {
                            Text(status.name, fontSize = 11.sp)
                        }
                    }
                }
            }
        }

        Button(
            onClick = { /* Submit to backend / Room DB */ },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Submit Attendance & Alert Parents")
        }
    }
}

@Composable
fun ParentScreen(student: Student) {
    Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Parent & Guardian Dashboard", fontWeight = FontWeight.Bold, fontSize = 18.sp)
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Today's Status: ${student.name}", fontWeight = FontWeight.SemiBold)
                Text("Attendance: PRESENT (08:05 AM)", color = Color(0xFF2E7D32), fontWeight = FontWeight.Bold)
                Spacer(modifier = Modifier.height(8.dp))
                Text("School Bus: ${student.busRoute} (${student.busStatus})", fontSize = 13.sp)
                Text("Estimated Arrival: 4 mins away", color = Color(0xFFF57C00), fontWeight = FontWeight.Bold)
            }
        }

        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Term 2 Tuition Invoice", fontWeight = FontWeight.Bold)
                Text("Amount Due: $1,450.00", fontSize = 18.sp, color = MaterialTheme.colorScheme.primary)
                Spacer(modifier = Modifier.height(8.dp))
                Button(onClick = { /* Pay with Google Pay */ }, modifier = Modifier.fillMaxWidth()) {
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

        Text("Student Roster (Grades 1-12)", fontWeight = FontWeight.Bold, fontSize = 15.sp)
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
                        TextButton(onClick = { /* Generate PDF Report */ }) {
                            Text("PDF Dossier", fontSize = 11.sp)
                        }
                    }
                }
            }
        }
    }
}
