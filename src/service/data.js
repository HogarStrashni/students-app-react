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

const allStudents = [];

export const getAllStudents = () => {
  if (allStudents.length === 0) {
    for (let i = 0; i < 100; i++) {
      allStudents.push(createStudent());
    }
  }
  return allStudents;
};

export const getUniqeStudent = (index) => {
  return allStudents.find((item) => item.indexNumber === index);
};

//for search
export const getFilteredStudents = (value) => {
  return allStudents.filter(
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
};
