import { faker } from "@faker-js/faker";

const createStudent = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    indexNumber: faker.unique(
      () =>
        `${faker.random.numeric(2, {
          allowLeadingZeros: true,
        })}-${faker.mersenne.rand(1998, 2020)}`
    ),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number("+387 6# ### ###"),
  };
};

let allStudents = [];

export const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    if (allStudents.length === 0) {
      for (let i = 0; i < 10; i++) {
        allStudents.push(createStudent());
      }
    }

    if (allStudents) {
      resolve(allStudents);
    } else {
      reject("Something Went Wrong!!! Loading Students Data...");
    }
  });
};

// for finding unique student
export const getUniqeStudent = (index) => {
  return new Promise((resolve, reject) => {
    const uniqueStudent = allStudents.find(
      (item) => item.indexNumber === index
    );

    if (uniqueStudent) {
      resolve(uniqueStudent);
    } else {
      reject("Something Went Wrong!!! Loading Unique Student...");
    }
  });
};

// for adding new student
//checking unique index number
const isTheSameValue = (value) => {
  return allStudents.some((item) => item.indexNumber === value)
    ? value + " SAME INDEX NUMBER"
    : value;
};

export const getNewStudent = (newStudent) => {
  return new Promise((resolve, reject) => {
    isTheSameValue(newStudent.indexNumber);
    allStudents = [...allStudents, newStudent];

    if (allStudents) {
      resolve(allStudents);
    } else {
      reject("Something Went Wrong!!! Adding New Student...");
    }
  });
};

//for deleting unigue student
export const getStudentsAfterDelete = (index) => {
  return new Promise((resolve, reject) => {
    allStudents = allStudents.filter((item) => item.indexNumber !== index);

    if (allStudents) {
      resolve(allStudents);
    } else {
      reject("Something Went Wrong!!! Deleting Unique Student...");
    }
  });
};

//for search students
export const getFilteredStudents = (value) => {
  return new Promise((resolve, reject) => {
    const filterAllStudents = allStudents.filter(
      (item) =>
        item.firstName
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        item.lastName
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        item.indexNumber
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        item.email
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        item.phone
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
    );

    if (filterAllStudents) {
      resolve(filterAllStudents);
    } else {
      reject("Something Went Wrong!!! Applying Search Form...");
    }
  });
};

// for grades
const allSubjects = [
  "Introduction to Civil Engineering",
  "Statics and Mechanics of Solids",
  "Computational Methods for Civil Engineering",
  "Engineering Graphics and Visualization",
  "Civil Engineering Materials",
  "Structural Analysis",
  "Geotechnical Engineering",
  "Transportation Engineering",
  "Environmental Engineering",
  "Water Resources Engineering",
  "Systems Applications in Civil Engineering",
  "Civil Engineering Design",
  "Civil Engineering Distribution Electives",
  "Engineering, Science and Mathematics Elective",
];

export const getAllGradeHistory = () => {
  return new Promise((resolve, reject) => {
    const allGrades = allSubjects.map((item) => {
      return {
        subject: item,
        grade: faker.mersenne.rand(6, 11),
        dateExam: faker.date
          .between("2010-01-01T00:00:00.000Z", "2020-01-01T00:00:00.000Z")
          .toLocaleDateString("en-US"),
      };
    });

    if (allGrades) {
      resolve(allGrades);
    } else {
      reject("Something Went Wrong!!! Applying Grade History...");
    }
  });
};
