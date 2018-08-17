# SSIOT Backend (Summer internship 2018 - [AppModule](http://www.appmodule.net/))

**SSIOT Backend** is an application which supports [**SSIOT Frontend**](https://github.com/appmodule/StudentProject2018_Frontend) application and [**SSIOT iOS**](https://github.com/appmodule/StudentProject2018_Mobile) application. It is written in javascript (**node.js**) and **express** framework. Data storage is done in **MongoDB** noSQL database.

## References

  - [Architecture project](https://drive.google.com/open?id=1WVr8KbC6PKtnrh5wBTfyniAzzACREK-E)
  - [User manual](https://drive.google.com/open?id=122N9GOuM6Bzio5tibY7mOl9ZQWlqpxPc)

## Functionality 
  - [Restful API](#restful-api)
  - Data storage

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Installation

**SSIOT Backend** requires:

- [Node.js](https://nodejs.org/) v8+ to run.
- [MongoDB](https://www.mongodb.com/) to store data.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm start
// Starting on port 3000
```

Optionally instead **npm start** use **npm run watch** if you want to build on every change .

```sh
$ npm run watch
```

Edit env.json file to setup enviroment variables.
```
    {
    "app": {
        "port": PORT
    },
    "mqtt": {
        "host": MQTT-BROKER,
        "port": MQTT-BROKER-PORT
    },
    "mongodb": {
        "host": MONGO-DB-HOST,
        "db": DB-NAME
    }
}

```

## Restful API
### *List of API calls:* 
#### Layout:
##### Save layout
**POST** *[server]/layout/save*
```
    input: {
        widgets: Object
        name: String
    }
    output: {
        message: "Saved successfully: [layout.name]"
    }
```
##### Load layout
**POST** *[server]/layout/load*
```
    input: {
        name: String    //  Layout name
    }
    output: {
        Layout: Object
    }
```
##### Load sensors
#### Sensor:
**POST** *[server]/sensor/load*
```
    output: {
        Sensors: Object //  All sensors 
    }
```
##### Sensor manifest
#### Ssiot:
**POST** *[server]/ssiot/mnf/:guid/:sensorid*
```
    input:
        :guid
        :sensorid
    {
        format: Object
    }    
    output: {
        message: "Sensor manifested successfully: [sensor]!" // if doesn't already exist
        ||
     message: "Sensor updated successfully: [sensor]!" // if doesn't already exist   
    }
```
#### User:
##### Create user
**POST** *[server]/user/create*
```
    input: {
        username: String,
        password: String
    }
    output: {
        message: "Succesufully created [username]!"
    }
```
##### User login
**POST** *[server]/user/login*
```
    input: {
        username: String,
        password: String
    }
    output: {
        message: "Successfully logged in!"
    }
```
##### User logout
**POST** *[server]/user/logout*
```
    output: {
        message: "Successfully logged out!"
    }
```

#### Widget:
##### Save widget
**POST** *[server]/widget/save*
```
    input: {
        name: String,
        design: String,
        functions: Object,
        scheme: Object,
        format: Object,
        coords: Ovject
    }
    output: {
        message: "Widget [widget.name] successfully saved!"
    }
```
##### Load widget
**POST** *[server]/widget/load*
```
    output: {
        widgets: [Objects]
    }
```
##### Delete widget (first way)
**POST** *[server]/widget/:id/delete*
```
    input:
        :id
    output: {
        message: "Successfully deleted!"
    }
```
##### Delete widget (second way)
**POST** *[server]/widget/delete*
```
    input: {
        _id: String
    }
    output: {
        message: "Successfully deleted!"
    }
```
**POST** *[server]/widget/deleteall*
```
    output: {
        message: "All widgets successufully deleted!"
    }
```


## Built With

* [Node.js](https://nodejs.org) - Javascript server environment
* [npm](https://www.npmjs.com/) - Dependency Management
* [express](https://www.npmjs.com/package/express) - Web framework for Node.js

## Dependencies
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [chalk](https://www.npmjs.com/package/chalk)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cors](https://www.npmjs.com/package/cors)
- [debug](https://www.npmjs.com/package/debug)
- [ejs](https://www.npmjs.com/package/)
- [express](https://www.npmjs.com/package/)
- [express-session](https://www.npmjs.com/package/express-session)
- [generate-schema](https://www.npmjs.com/package/generate-schema)
- [http-errors](https://www.npmjs.com/package/http-errors)
- [jsonschema](https://www.npmjs.com/package/jsonschema)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [morgan](https://www.npmjs.com/package/morgan)
- [mqtt](https://www.npmjs.com/package/mqtt)
- [rxjs](https://www.npmjs.com/package/rxjs)
- [rxjs-compat](https://www.npmjs.com/package/rxjs-compat)
- [uuid](https://www.npmjs.com/package/uuid)

##### devDependencies
- [nodemon](https://www.npmjs.com/package/nodemon)
- [util](https://www.npmjs.com/package/util)

## Authors

* **Stefan Covic** - [GitHub](https://github.com/scovic)
* **Petar Markovic** - [GitHub](https://github.com/peca993)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.MD) file for details


