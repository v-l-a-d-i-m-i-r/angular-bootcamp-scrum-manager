# Sample backend server for the Angular Bootcamp

First of all copy `config.js.dist` to `config.js` file

`cp ./server/config.js.dist ./server/config.js`

To set up this application you should go to [MongoLab](https://mlab.com/) sign up a new account
and create a new free tier database with the name `scrum`. Then go to [Account users page](https://mlab.com/account-details/) choose your user
copy API key and paste it into `server/config.js` file `apiKey` value. Also don't forget to enable Data API Access at the bottom of [Account users page](https://mlab.com/account-details/)

Now you should run following command (assuming you have installed node.js on your machine, if not then plese visit [node.js official website](https://nodejs.org/en/)
and install the latest node version):

1. `$ cd ./server`
2. `$ npm install`
3. `$ npm start`

## What does this server do? Actually this backend provides the next capabilities:

1. User signing in / signing out / signing up
2. Proxying your MongoLab database through [MongoLab REST API](http://docs.mlab.com/data-api/).
3. Serve all the static files in the directory `../client/dist`

## User auth API

1. `POST /api/signin { "email": "admin@admin.com", "password": "password" }` - Sign-in new user
2. `POST /api/signout {}` - Sign-out current user (if you've successfully signed in before)
3. `POST /api/signup { "email": "admin@admin.com", "password": "password", "firstName": "Admin", "lastName": "System" }` - Sign up new user
4. `GET /api/current-user` - get currently signed in user from server session

## RESTful API (proxying MongoLab database)

Actually at the moment you have 2 entity types in your database:

1. User - Document structure is:
```
{
    "_id": {
        "$oid": "572fccb1f8c2e76df19c652e"
    },
    "email": "admin@admin.com",
    "password": "password",
    "admin": true,
    "firstName": "Admin",
    "lastName": "System"
}
```

2. Project - Document structure is:
```
{
    "_id": {
        "$oid": "572fce2ff8c2e76df19c72ee"
    },
    "teamMembers": [
        "572fcdbb0a00b26ba172c2a2"              // <-- user._id.$oid
    ],
    "name": "Test Project",
    "desc": "The first project",
    "productOwner": "572fccb1f8c2e76df19c652e", // <-- user._id.$oid
    "scrumMaster": "572fcdbb0a00b26ba172c2a2"   // <-- user._id.$oid
}
```

All the requests for the urls

`/api/collections/__COLLECTION_NAME__/*`

are proxied to

`https://api.mongolab.com/api/1/databases/__DB_NAME__/collections/__COLLECTION_NAME__/`

### Example 1:

`GET /api/collections/users/572fccb1f8c2e76df19c652e` 
    
Is proxied to

`GET https://api.mongolab.com/api/1/databases/scrum/collections/users/572fccb1f8c2e76df19c652e`

### Example 2:

`PUT /api/collections/projects/572fce2ff8c2e76df19c72ee {"name": "Real Project"}` 

Is proxied to

`PUT https://api.mongolab.com/api/1/databases/scrum/collections/projects/572fccb1f8c2e76df19c652e {"name": "Real Project"}` 

Please read more details regarding [MongoLab Data API](http://docs.mlab.com/data-api/) here. In fact this is classic RESTful API.

To check that backend server works you should go to http://localhost:8000/api/health-check
I should return following response:

```
)]}',
{
  "status": true
}
```

## Frontend setting up

All you need to do to set up the front end application is:

1. `cd ./client`
2. `npm install && bower install`
3. `gulp serve`
