### Front-End Introduction

### About the Project

This project was developed using the concepts of React, but without using the React library (lib). Instead, I used pure JavaScript to build the entire frontend of the software. The goal of this approach was to challenge myself by building the app without frameworks or libraries, in order to deeply understand how a framework simplifies what can be done with pure language.

---

### Software Objectives

The software is a university platform designed to facilitate academic interaction between students and professors through the centralized management of quizzes and assessments. The platform allows students to view courses, take quizzes, and access their grades and answer keys, while professors can create and manage quizzes. Administrators are responsible for managing students, professors, and courses, ensuring the organization and smooth operation of the platform. The software design aims for future scalability, allowing the addition of new features as needed.

---

### Backend

[Link to Backend repository](https://github.com/CiceroRMG/Back-end-Quizz-Project/)

---

### Wireframe and Screen Flow

[Wireframe and Flow on Figma](https://www.figma.com/design/g0bMmtu1qDt5VRjHaJA7ay/Quiz-LabTIC?node-id=1-15)

---

### Platform Design

[Platform Design on Figma](https://www.figma.com/design/Cjde4ievoeXT9bD2eE9KF8/Quiz-(LabTIC)?t=dhtlvtlimlvszjuL-1)


### Features

**Students**

- View courses for the semester.
- Take quizzes posted by professors.
- View grades and answer keys for quizzes (if provided by professors).
- View grades and answer keys for each attempt in quizzes with multiple attempts.
- Change password.

**Professors**

- Create new quizzes, such as exams, exercises, or mock tests.
- Save quizzes as drafts.
- Edit draft quizzes.
- Delete quizzes.
- View who has answered the quizzes.
- View grades and answer keys of student responses.
- Generate quiz questions using artificial intelligence.
- Change password.

**Administrators**

- Register and manage students, professors, and courses (full CRUD functionality).
- Edit or delete quizzes created by professors.

### Restrictions

- Administrators do not have access to the password set by the student.
- Administrators do not create the initial password for the user; it is automatically generated after registration.
- Once a professor or student is registered, they cannot switch roles (a professor cannot become a student and vice versa).
- If a role change is necessary, a new registration must be created with the desired role.
