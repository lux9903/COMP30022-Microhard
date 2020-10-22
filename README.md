<h1 align="center">Microhard</h1>
<p align="center">
    <img src="logo.png" alt="logo" width="200"/>
</p>

Microhard is a COMP30022 capstone project that delivers a solution to the following problem statement:
> The ePortfolio system must be capable of allowing you to submit individual guest lecture reports and end-of subject individual reflections that are requirements in COMP30022, as well as a team report. You will be assigned a client in addition, either a staff member or a group of Masters students studying SWEN90016.

To tackle this problem, we have chosen to build a MERN stack application. The frontend is written in ReactJS. The backend is written in Node.js and Express. MongoDB Atlas is used to store our documents and files. Our CI/CD pipeline is through Github Actions where unit testing occurs. Finally, after testing is successfuly, the application is deployed to Heroku. 

## Heroku deployment link

- **Demo URL**: https://comp30022-microhard.herokuapp.com/

## Development

1. Install node.js (https://nodejs.org/en/download/)

2. Open the terminal window, from the root folder 
```
> npm install
> cd client
> npm install
```
3. Copy contents of .env.example and put it in a file called .env in both main folder and cilent folder
4. Open another terminal window

```
> npm run dev
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