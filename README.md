<h1 align="center">Microhard</h1>
<p align="center">
    <img src="logo.png" alt="logo" width="200"/>
</p>

Microhard is a COMP30022 capstone project that delivers a solution to the following problem statement:
> The ePortfolio system must be capable of allowing you to submit individual guest lecture reports and end-of subject individual reflections that are requirements in COMP30022, as well as a team report. You will be assigned a client in addition, either a staff member or a group of Masters students studying SWEN90016.

To tackle this problem, we have chosen to build a MERN stack application. The frontend is written in ReactJS / Redux. The backend is written in Node.js and Express. MongoDB Atlas is used to store our documents and files. Our CI/CD pipeline is through Github Actions where unit testing occurs. Finally, after testing is successfuly, the application is deployed to Heroku. 
The React UI framework used was Material-UI, providing a consistent theme and palette to the application. 

## Installation requirements
### Prerequisites
This tutorial will cover the process of setting up the development environment on your local computer for this application.
#### npm
npm is our chosen package manager for Node.js packages.
#### MongoDB Atlas
MongoDB Atlas is a database service that is fully managed by MongoDB and is a NoSQL database. To learn more about MongoDB Atlas, read more here: (https://www.mongodb.com/cloud/atlas)

### Packages
Once all the prerequisites have been satisfied, we can focus on the two packages: one for the client-side (`/client`) and another for the server-side (`/server`). These two packages have its own `package.json` files that stores their own dependencies.
- **Client packages**: this package is focused on the frontend development. To install the dependencies, make sure to `cd` to the `client` directory before `npm install`. 
- **Backend packages**: this package keeps all its necessary files in the root directory and the `server` directory. To install the necessary dependencies, we can `npm install` them to the root directory. 

### Package Installation
1. Install Node.js and npm through this link (https://nodejs.org/en/download/) 

2. Open the terminal window, from the root folder 
```
> npm install
> cd client
> npm install
```
3. Copy contents of .env.example and put it in a file called .env in both main folder and client folder
4. Up to this point, this should be sufficient enough to run the local development environment. Open a new terminal and type in the following command.
```
> npm run dev
```
### Setting up the environmental variables
This `.env` configuration is located in the root directory:
```
NODE_ENV=development
DATABASE="mongodb+srv://macro:12345@cluster0-gbsk9.mongodb.net/micro?retryWrites=true&w=majority"
SECRET="web-it"
SENDGRID_API_KEY="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"
FROM_EMAIL="luuh@student.unimelb.edu.au"
```
This particular `.env` configuration should be located in the client directory:
```
REACT_APP_API_ENDPOINT = http://localhost:3000/api
API_MIDDLEWARE = http://localhost:5000/
SHARE_LINK = http://localhost:3000
```

## Test

Running Mocha tests

```
> npm run test
```

## RESTful routes & HTTP verbs

| CORE FUNCTIONALITY | ACTION  | PATH                | MONGOOSE                     | HTTP VERB | PURPOSE                        |
|--------------------|---------|---------------------|------------------------------|-----------|--------------------------------|
| User               | Read    | /api/user           | User.findById()              | GET       | Get logged in user             |
| User               | Create  | /api/user           | passport.authenticate()      | POST      | Sign up a new user             |
| User               | Create  | /api/user/sign-in   | passport.authenticate()      | POST      | Sign in a user                 |
| User               | Update  | /api/user/          | User.save()                  | PUT       | Edit logged in user            |
| User               | Delete  | /api/user           | User.findByIdAndRemove()     | DELETE    | Delete logged in user          |     | View dashboard                 |
| Image              | Read    | /api/image          | Image.find()                 | GET       | View all existing images       |
| Image              | Read    | /api/image/:filename| Image.findOne()              | GET       | View an existing image         |
| Image              | Create  | /api/image/upload   | Image.save()                 | POST      | Post a new image to server     |
| Image              | Delete  | /api/image/:id      | Image.deleteOne()            | DELETE    | Delete an existing image                   |
| PDF                | Read    | /api/pdf            | Pdf.find()                   | GET       | View all existing pdfs         |
| PDF                | Read    | /api/pdf/:filename  | Pdf.findOne()                | GET       | View an existing pdf           |
| PDF                | Create  | /api/pdf/upload     | Pdf.save()                   | POST      | Post a new pdf to server       |  
| PDF                | Delete  | /api/pdf/:id        | Pdf.deleteOne()              | DELETE    | Delete an existing pdf         |

## MongoDB schemas

```
User {
    `ID`: User ID;
    `Username`: Name of user;
    `Email`: Email address;
    `Headline`: Short description of user;
    `Image`: Profile picture;
    `Password`: Secure authentication;
    `Lastname`: Lastname of user;
    `Firstname`: Firstname of user;
    `Major`: Major of user;
    `aboutSection`: About Me section;
    `Location`: Where the user is based in at the current time;
    `Website`: (Optional) Website contact;
    `Linkedin`: (Optional) Linkedin contact;
}

Image {
    'fileId': Image ID;
    'user': Ownership of images;
}

Pdf {
    'fileId': Pdf ID;
    'user': Ownership of pdfs;
}
```

## List of important files
```
.github
    - workflows
        node.js.yml
client
    - public
    - src
        - actions
        - components
        - helpers
        - img
        - reducers
        index.js
        setupProxy.js
        store.js
        styles.css
    package.json
    .env
server
    - config
        index.js
        passport.js
    - controller
    - models
    - routes
test
    - file
    course.js
    experience.js
    image.js
    project.js
    system_test.js
    user.js  
.env
package.json
README.md
server.js
```
## Components in the client directory
| Account            | Dashboard      | Home                | Navigation       | Sign Up               | View                | About     |
|--------------------|----------------|---------------------|------------------|-----------------------|---------------------|-----------|
| Account.jsx        | /Course        | Functionalities.jsx | Appbar.jsx       | AboutSectionStep.jsx  | view.jsx            | About.jsx |
| ForgotPassword.jsx | /Document      | Hero.jsx            | NoMatch.jsx      | AddProfileContent.jsx | ViewCourse.jsx      |           |
| ResetPassword.jsx  | /Photos        | HomePage.jsx        | PrimaryNav.js    | BasicDetailsStep.jsx  | ViewDocument.jsx    |           |
| SignIn.jsx         | /Profile       |                     | PrivateHome.jsx  | ContactStep.jsx       | ViewExperience.jsx  |           |
|                    | /Project       |                     | PrivateRoute.jsx | Review.jsx            | ViewImage.jsx       |           |
|                    | Experience.jsx |                     |                  |                       | ViewProject.jsx     |           |
|                    |                |                     |                  |                       | ViewProjectItem.jsx |           |

## Controllers, models and routes in the server directory
| Controllers             | Models             | Routes                            |
|-------------------------|--------------------|-----------------------------------|
| courseController.js     | courseModel.js     | courseRouter.js                   |
| experienceController.js | experienceModel.js | experienceRouter.js               |
| fileController.js       |                    | fileRouter.js                     |
| imageController.js      | imageModel.js      | imageRouter.js                    |
| passwordController.js   |                    | authRouter.js                     |
| pdfController.js        | pdfModel.js        | pdfRouter.js                      |
| projectController.js    | projectModel.js    | projectRouter.js                  |
| userController.js       | userModel.js       | avatarRouter.js userController.js |
|                         |                    | viewRouter.js                     |
