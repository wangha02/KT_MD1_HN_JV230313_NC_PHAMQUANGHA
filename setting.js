const form = document.querySelector(".container");
const studentList = document.querySelector("#student-list");
const searchInput = document.querySelector("#search");
const students = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const gender = document.querySelector("#gender").value;
  const hometown = document.querySelector("#hometown").value;

  const student = {
    name,
    email,
    phone,
    gender,
    hometown,
  };

  students.push(student);

  displayStudents();
});

function displayStudents() {
  let tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  students.forEach(function (student, index) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.hometown}</td>
      <td>${student.gender}</td>
      <td>
        <button class="btn-edit btn1"><u>Edit</u></button>
        /
        <button class="btn-delete btn2"><u>Delete</u></button>
      </td>
    `;
    tbody.appendChild(tr);

    //sắp xếp
    const sortButton = document.querySelector("#sort-btn");
    sortButton.addEventListener("click", sortStudentsByName);
    // edit
    const editButton = tr.querySelector(".btn-edit");
    editButton.addEventListener("click", function () {
      editStudent(index);
    });
    //delete
    const deleteButton = tr.querySelector(".btn-delete");
    deleteButton.addEventListener("click", function () {
      students.splice(index, 1);
      displayStudents();
    });
  });
}
function editStudent(index) {
  let student = students[index];
  let nameInput = document.querySelector("#name");
  let emailInput = document.querySelector("#email");
  let phoneInput = document.querySelector("#phone");
  let genderInput = document.querySelector("#gender");
  let hometownInput = document.querySelector("#hometown");
  let submitButton = document.querySelector("#submit-btn");

  nameInput.value = student.name;
  emailInput.value = student.email;
  phoneInput.value = student.phone;
  genderInput.value = student.gender;
  hometownInput.value = student.hometown;
  submitButton.innerText = "save";

  submitButton.onclick = function () {
    students[index] = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      gender: genderInput.value,
      hometown: hometownInput.value,
    };
    displayStudents();
    submitButton.innerText = "Add";
    submitButton.onclick = function () {
      addStudent();
    };
  };
}

function sortStudentsByName() {
  students.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  displayStudents();
}
