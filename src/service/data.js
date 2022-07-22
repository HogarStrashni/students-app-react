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
    for (let i = 0; i < 150; i++) {
      allStudents.push(createStudent());
    }
  }
  return allStudents;
};

export const getUniqeStudent = (index) => {
  return allStudents.find((item) => item.indexNumber === index);
};
