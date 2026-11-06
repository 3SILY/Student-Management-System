let form = document.getElementById("stduent-form");

// GET INPUTS
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let emailInput = document.getElementById("email");
let courseInput = document.getElementById("course");
let gradeInput = document.getElementById("grade");
let searchInput = document.getElementById("search");
let sumbit = document.getElementById("add-student");
// GET INPUTS //

let tbody = document.getElementById("students");

let students = [];
let nextStudent = 1; // STUDENT ID
let mood = "creat";
let tmp;

// CREAT STUDENTS
form.addEventListener("submit", function (event) {
  event.preventDefault(); // STOP PADGE RELOADING

  // CREAT STUDENT
  let student = {
    id: nextStudent,
    name: nameInput.value,
    age: Number(ageInput.value),
    email: emailInput.value,
    course: courseInput.value,
    grade: Number(gradeInput.value),
  };
  // CREAT STUDENT //

  if (
    nameInput.value != "" &&
    ageInput.value != "" &&
    courseInput.value != "" &&
    gradeInput.value != "" &&
    emailInput.value != ""
  ) {
    if (mood === "creat") {
      student.id = nextStudent;
      students.push(student);
      nextStudent++;
    } else {
      student.id = students[tmp].id;
      students[tmp] = student;
    }

    // ADD STUDENT
    localStorage.setItem("student", JSON.stringify(students));
    displayStudents();
    clearInputs();

    mood = "creat";
    sumbit.innerHTML = "Add Studdent";
  }
});
// CREAT STUDENTS //

// Read
function showData(data) {
  tbody.innerHTML = "";
  data.forEach((student) => {
    tbody.innerHTML += `
   <tr>

    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.age}</td>
    <td>${student.email}</td>
    <td>${student.course}</td>
    <td>${student.grade}</td>
    <td>
    <Button onclick="deleteStudent(${student.id})" id="delete-student">Delete</Button>
    <Button onclick="updateStudent(${student.id})" id="edit-student">Edit</Button>
    </td>
   </tr>
    `;
  });
}
// READ //

// Delete
function deleteStudent(id) {
  let indix = students.findIndex((student) => student.id === id);

  if (indix !== -1) {
    students.splice(indix, 1);

    students.forEach((student, index) => {
      student.id = index + 1;
    });

    nextStudent = students.length + 1;

    localStorage.setItem("student", JSON.stringify(students));
    displayStudents();
  }
}
// DELATE //

// UPDATE
function updateStudent(id) {
  let student = students.find((student) => student.id === id);
  mood = "update";
  nameInput.value = student.name;
  ageInput.value = student.age;
  emailInput.value = student.email;
  courseInput.value = student.course;
  gradeInput.value = student.grade;

  sumbit.innerHTML = "Update";

  tmp = students.findIndex((student) => student.id === id);
}
// UPDATE //

// Clear INPUTS
function clearInputs() {
  nameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";
  courseInput.value = "";
  gradeInput.value = "";
}
// CLEAR INPUTS //

// Search
searchInput.addEventListener("input", displayStudents);

// Search //

function displayStudents() {
  let searchValue = searchInput.value;

  if (searchValue === "") {
    showData(students);
  } else {
    let filtered = students.filter((student) =>
      student.name.includes(searchValue),
    );

    showData(filtered);
  }
}

let data = localStorage.getItem("student");

students = JSON.parse(data) || [];

students.forEach((student) => {
  if (student.id > nextStudent) {
    nextStudent = student.id;
  }
});

nextStudent++;

displayStudents();

// Change padge Mood
let themeToggle = document.getElementById("theme-toggle");

// LOAD THEME
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.innerHTML = "☀️ Light Mode";
}

// CHANGE THEME
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = "🌙 Dark Mode";
  }
});
console.log("Hellow Git")
console.log("Hellow Git")