import { faker } from "@faker-js/faker";

// for grades
export const allSubjects = [
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
    gradeHistory: allSubjects.map((item) => {
      return {
        subject: item,
        grade: faker.mersenne.rand(6, 11),
        dateExam: faker.date
          .between("2010-01-01T00:00:00.000Z", "2020-01-01T00:00:00.000Z")
          .toLocaleDateString("en-US"),
      };
    }),
  };
};

// all students list...
let allStudents = [];
export const getStudents = (query) => {
  return new Promise((resolve, reject) => {
    if (allStudents.length === 0) {
      for (let i = 0; i < 20; i++) {
        allStudents.push(createStudent());
      }
    }
    const filteredStudents = allStudents.filter(
      (item) =>
        item.firstName
          .toString()
          .toLowerCase()
          .includes(query.toString().toLowerCase()) ||
        item.lastName
          .toString()
          .toLowerCase()
          .includes(query.toString().toLowerCase()) ||
        item.indexNumber
          .toString()
          .toLowerCase()
          .includes(query.toString().toLowerCase()) ||
        item.email
          .toString()
          .toLowerCase()
          .includes(query.toString().toLowerCase()) ||
        item.phone
          .toString()
          .toLowerCase()
          .includes(query.toString().toLowerCase())
    );

    if (allStudents) {
      resolve(!query ? allStudents : filteredStudents);
    } else {
      reject("Something Went Wrong!!! Loading Students Data...");
    }
  });
};

// for finding unique student
export const getUniqueStudent = (query) => {
  return new Promise((resolve, reject) => {
    const uniqueStudent = allStudents.find(
      (item) => item.indexNumber === query
    );

    if (uniqueStudent) {
      resolve(uniqueStudent);
    } else {
      reject("Something Went Wrong!!! Loading Unique Student...");
    }
  });
};

// for adding new student
export const getNewStudent = (newStudent) => {
  return new Promise((resolve, reject) => {
    allStudents = [
      ...allStudents,
      {
        ...newStudent,
        gradeHistory: allSubjects.map((item) => {
          return {
            subject: item,
            grade: "",
            dateExam: "",
          };
        }),
      },
    ];

    if (allStudents) {
      resolve(allStudents);
    } else {
      reject("Something Went Wrong!!! Adding New Student...");
    }
  });
};

//for deleting unigue student
export const getStudentsAfterDelete = (query) => {
  return new Promise((resolve, reject) => {
    allStudents = allStudents.filter((item) => item.indexNumber !== query);

    if (allStudents) {
      resolve(allStudents);
    } else {
      reject("Something Went Wrong!!! Deleting Unique Student...");
    }
  });
};

//for editing unigue student
export const getEditedStudent = (query, newItem) => {
  return new Promise((resolve, reject) => {
    allStudents = allStudents.map((item) =>
      item.indexNumber !== query ? item : newItem
    );

    if (allStudents) {
      resolve(allStudents);
    } else {
      reject("Something Went Wrong!!! Editing Unique Student...");
    }
  });
};

//for editing student's grades
export const getEditedGrades = (query, newGrades) => {
  return new Promise((resolve, reject) => {
    allStudents = allStudents.map((item) =>
      item.indexNumber !== query ? item : { ...item, gradeHistory: newGrades }
    );

    if (allStudents) {
      resolve(allStudents);
    } else {
      reject("Something Went Wrong!!! Editing Grades...");
    }
  });
};
