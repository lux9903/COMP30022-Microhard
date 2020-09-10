# COMP30022-Microhard
Student E-portfolio app. Mongo/Express/React/Node.js.

>The ePortfolio system must be capable of allowing you
to submit individual guest lecture reports and end-of subject individual reflections that are requirements in
COMP30022, as well as a team report. You will be
assigned a client in addition, either a staff member or
a group of Masters students studying SWEN90016.

## Heroku deployment link

- **Demo URL**: https://comp30022-microhard.herokuapp.com/`

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
## RESTful routes & HTTP verbs

| CORE FUNCTIONALITY | ACTION  | PATH               | MONGOOSE                     | HTTP VERB | PURPOSE                        |
|--------------------|---------|--------------------|------------------------------|-----------|--------------------------------|
| User               | Read    | /api/user          | User.findById()              | GET       | Get logged in user             |
| User               | Create  | /api/user          | passport.authenticate()      | POST      | Sign up a new user             |
| User               | Create  | /api/user/sign-in  | passport.authenticate()      | POST      | Sign in a user                 |
| User               | Update  | /api/user/         | User.save()                  | PUT       | Edit logged in user            |
| User               | Delete  | /api/user          | User.findByIdAndRemove()     | DELETE    | Delete logged in user          |
