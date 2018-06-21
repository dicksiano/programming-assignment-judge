import AssignmentsModel from "./assignments/model";
import SubmissionsModel from "./submissions/model";
import CoursesModel from "./courses/model";
import CoursesAssocModel from "./courses_assoc/model";
import UsersModel from "./users/model";
import AssignmentsTestsModel from "./assignments_tests/model";

export default async function sync() {
  CoursesModel.hasMany(CoursesAssocModel, {
    foreignKey: "courseId",
    sourceKey: "id"
  });
  CoursesModel.hasMany(AssignmentsTestsModel, {
    foreignKey: "courseId",
    sourceKey: "id"
  });
  UsersModel.hasMany(CoursesAssocModel, {
    foreignKey: "userGid",
    sourceKey: "gid"
  });

  await AssignmentsModel.sync({ force: true });
  await SubmissionsModel.sync({ force: true });
  await CoursesModel.sync({ force: true });
  await CoursesAssocModel.sync({ force: true });
  await UsersModel.sync({ force: true });
  await AssignmentsTestsModel.sync({ force: true });

  console.log("Database schema synced");

  // MOCK DATA
  // Users generated at https://randomuser.me/
  await UsersModel.create({
    gid: "1",
    name: "Professor Paul",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "professor.paul@example.com",
  });
  await UsersModel.create({
    gid: "2",
    name: "Student Steve",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "student.steve@example.com",
  });
  await UsersModel.create({
    gid: "3",
    name: "Student Stephany",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "student.stephany@example.com",
  });
  await UsersModel.create({
    gid: "117441890382622508131",
    name: "Student Placeholder",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    email: "student.placeholder@example.com",
  });

  await CoursesModel.create({
    creatorUserGid: "1",
    name: "CS-101",
    description: "Introduction to Computer Science",
  });

  await AssignmentsModel.create({
    courseId: 1,
    title: "Lab 1 - Printf",
    description: "Create a program that prints a message to the user.",
  });
  await AssignmentsModel.create({
    courseId: 1,
    title: "Lab 2 - Temperature Conversor",
    description: "Create a program that converts temperature between the Celsus and Fahrenheit scales.",
  });

  await CoursesAssocModel.create({
    courseId: 1,
    userGid: "1",
    role: "professor",
  });
  await CoursesAssocModel.create({
    courseId: 1,
    userGid: "2",
    role: "student",
  });
  await CoursesAssocModel.create({
    courseId: 1,
    userGid: "3",
    role: "student",
  });
  await CoursesAssocModel.create({
    courseId: 1,
    userGid: "117441890382622508131",
    role: "student",
  });

  await CoursesModel.create({
    creatorUserGid: "1",
    name: "CS-201",
    description: "Algorithms and Data Structures",
  });

  await AssignmentsModel.create({
    courseId: 2,
    title: "Lab 1 - Bubble, Insertion, Selection",
    description: "Implement simple sorting algorithms.",
  });

  await AssignmentsModel.create({
    courseId: 2,
    title: "Lab 2 - Quicksort, Mergesort",
    description: "Implement efficient sorting algorithms.",
  });

  await CoursesAssocModel.create({
    courseId: 2,
    userGid: "117441890382622508131",
    role: "professor",
  });
  await CoursesAssocModel.create({
    courseId: 2,
    userGid: "2",
    role: "student",
  });
  await CoursesAssocModel.create({
    courseId: 2,
    userGid: "3",
    role: "student",
  });
}