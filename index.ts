import inquirer from "inquirer";
class student {
  id: string;
  name: string;
  courseEnrolled: string[];
  feesAmount: number;

  constructor(
    id: string,
    name: string,
    courseEnrolled: string[],
    feesAmount: number
  ) {
    this.id = id;
    this.name = name;
    this.courseEnrolled = courseEnrolled;
    this.feesAmount = feesAmount;
  }
}

let baseId = 10000;
let studentId: string = "";
let continueEnrollment = true;

let students: student[] = [];

do {
  let action = await inquirer.prompt({
    type: "list",
    name: "ans",
    message: "please select an option:\n",
    choices: ["Enrolled a student", "Show student status"],
  });

  if (action.ans === "Enrolled a student") {
    let studentName = await inquirer.prompt({
      type: "input",
      name: "ans",
      message: "please Enter your name:",
    });
    let trimedStudentName = studentName.ans.trim().toLowerCase();
    let studentNameCheck = students.map((obj) => obj.name);

    if (studentNameCheck.includes(trimedStudentName) === false) {
      if (trimedStudentName !== "") {
        baseId++;
        studentId = "STID" + baseId;

        console.log("\n\tYour account has been created");
        console.log(`Welcome, ${trimedStudentName}!`);

        let course = await inquirer.prompt({
          type: "list",
          name: "ans",
          message: "Please select a course",
          choices: ["IT", "English", "Computer"],
        });
        let courseFees = 0;
        switch (course.ans) {
          case "IT":
            courseFees = 5000;
            break;

          case "English":
            courseFees = 1000;
            break;

          case "Computer":
            courseFees = 2000;
            break;
        }
        let courseConfirm = await inquirer.prompt({
          type: "confirm",
          name: "ans",
          message: "Do you want to enroll in this course",
        });
        if (courseConfirm.ans === true) {
          let Student = new student(
            studentId,
            trimedStudentName,
            [course.ans],
            courseFees
          );
          students.push(Student);

          console.log("You have enrolled in this course");
        }
      } else {
        console.log("invalid Name");
      }
    } else {
      console.log("This name is already available exists");
    }
  } else if (action.ans === "Show student status") {
    if (students.length !== 0) {
      let studentNamesCheck = students.map((e) => e.name);

      let selectedStudent = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "please select name",
        choices: studentNamesCheck,
      });

      let foundStudent = students.find(
        (student) => student.name === selectedStudent.ans
      );

      console.log("Students information"), console.log(foundStudent);
      console.log("\n");
    } else {
      console.log("Record is empty");
    }
  }
  let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "ans",
    message: "Do you want you continue?",
  });
  if (userConfirm.ans === false) {
    continueEnrollment = false;
  }
} while (continueEnrollment);
