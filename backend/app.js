
const express = require('express');
const app = express();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader("Access-Control-Allow-Methods", 
                  "GET, POST, PATCH, DELETE, OPTIONS"
    );

    next();
});


const PORT = 3000;

var Similarity = require('string-similarity');

app.use(express.json());

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { type } = require('os');

const adapter = lowdb(new FileSync('db.json'));
const db = lowdb(adapter);

const data = require('./Lab3-timetable-data.json');

const courses = [];
for (i = 0; i < data.length; i++) {
    let cur = {
        subject: data[i].subject.toString().toLowerCase(),
        code: data[i].catalog_nbr.toString().toLowerCase(),
        name: data[i].className.toString().toLowerCase(),
        section: data[i].course_info[0].class_section.toString().toLowerCase(),
        component: data[i].course_info[0].ssr_component.toString().toLowerCase(),

        start_time: data[i].course_info[0].start_time.toString().toLowerCase(),
        end_time: data[i].course_info[0].end_time.toString().toLowerCase(),
        days: data[i].course_info[0].days.toString().toLowerCase(), 
        descr: data[i].catalog_description.toString().toLowerCase()
        //info: data[i].course_info, 
    };

    courses.push(cur);

}



//console.log(typeof(courses[0].name));


// any combination of subject + code
app.get('/api/open/courses/:subject/:code', (req, res) => {
    var subject = req.params.subject;
    var code = req.params.code;
    
    for (i = 0; i < courses.length; i++) {
        if (subject.toLowerCase() === courses[i].subject 
                && code.toLowerCase() === courses[i].code) {
                    return res.json(
                        courses[i]);
        }
    }
    
    return res.status(404).send('No results');
    
});


// check if s1 is part of s2 with minor mistakes.
function isSimilar(s1, s2) {
    const n = s1.length;
    for (i = 0; i < s2.length; i++) {
        simi = Similarity.compareTwoStrings(s1, s2.substring(i, i+n));
        if (simi >= 0.6) {
            return true;
        }
    }
    return false;
}


// search keyword
app.get('/api/open/keyword/:key', (req, res) => {
    var key = req.params.key;
    if (key.length < 5) {
        return res.status(404).send('at least 5 characters');
    }

    const ans = [];
    key = key.replace(/\s/g, "").toLowerCase();
   
    for (let c of courses) {
        const simi1 = isSimilar(key, c.name.replace(/\s/g, ""));
        const simi2 = isSimilar(key, c.code.replace(/\s/g, ""));
        if (simi1 || simi2 ) {
            ans.push(c);
        }
    }

    if (ans.length > 0) {
        return res.json(ans);
    }
    else {
        return res.status(404).send('key word search');
    }
    
});



//get 10 public lists (saved as lists in db)
// ealier time first, loop backwards in client side to display.
app.get('/api/open/publiclists', (req, res) => {
    pubLists = db.get('lists')
        .sortBy('timestamp')
        .take(10)
        .value()
    return res.json(pubLists);
    
});

// publish a list
app.post('/api/open/publish', (req, res) => {
    if (!sanitize(JSON.stringify(req.body))) {
        return res.status(403).send(" invalid data receiving ")
    }
    const theList = req.body;
    db.get('lists')
        .push( theList )
        .write();
    
    return res.json({
        success: "True"
    });
    
});


// add a new list
app.post('/api/secure/createList/:user', (req, res) => {
    if (!sanitize(JSON.stringify(req.body))) {
        return res.status(403).send(" invalid data receiving ")
    }
    const newName = req.body.name;
    const description = req.body.description;
    const user = req.params.user;
    temp = db.get('users').find({username:user}).value().myLists;
    if (temp.length >= 20) {
        return res.status(200).send("20 lists is the limit for every user");
    }
    for (i = 0; i < temp.length; i++) {
        if (temp[i].name === newName) {
            return res.status(200).send("name already exists");
        }
    }

    db.get('users').find({username:user}).value().myLists.push({
        name: newName,
        description: description,
        timestamp: Date()
    });
    db.write();
    return res.json({
        success: "yes"
    });

});


//get personal lists
app.get('/api/secure/myLists/:user', (req, res) => {
    user = req.params.user;
    pubLists = db.get('users').find({username:user}).value().myLists;
    return res.json(pubLists);
});




app.post('/api/signup', (req, res, next) => {
    if (!sanitize(JSON.stringify(req.body))) {
        return res.status(403).send(" invalid data receiving ");
    }
    user = req.body;
    if (db.get('users').find({email: user.email}).value()) {
        return res.status(200).send(" email already registed!! ");
    }

    db.get('users').push({
        username: user.username,
        email: user.email,
        password: user.password,
        myLists: []
    }).write();

    return res.json({
        user: user.username,
        signup: "successful"
    });

    next();
});



// CRUD schdule

// add new schedule
app.post('/schedules', (req, res) => {
    if (!sanitize(JSON.stringify(req.body))) {
        return res.status(403).send(" invalid data receiving ")
    }
    const newName = req.body.name;

    if (db.has(newName).value()) {
        return res.status(404).send("already exist");
    }
    else {
        db.set(newName, []).write();
    }

    return res.json(req.body);
});


app.post('/schedules/:name', (req, res) => {
    const nm = req.params.name;
    const subs = req.body.subject;
    const codes = req.body.code;
    if (!db.has(nm).value()) {
        return res.status(404).send("schedule does not exist");
    }
    else {
        db.set(nm, []).write();
        for (i = 0; i < subs.length; i++) {
            db.get(nm)
              .push({
                    subject: subs[i],
                    code: codes[i]
                })
                 .write();
        }
        return res.json(req.body);
    }
    
});


// read schedule
app.get('/schedules/:name', (req, res) => {
    const nm = req.params.name;
    if (!db.has(nm).value()) {
        console.log("wrong");
        return res.status(404).send(`no schedule named ${nm}`);
    } 
    else {
        pairs =  db.get(nm).value();
        return res.json(pairs);
    }
});


// make it easy, just reaplce all
app.put('/schedules/:name', (req, res) => {
    
    if (!sanitize(JSON.stringify(req.body))) {
        return res.status(403).send(" invalid data receiving ")
    }
    const nm = req.params.name;
    const subs= req.body.subject;
    const codes = req.body.code;
    
    if (!db.has(nm).value()) {
        return res.status(404).send("schedule does not exist");
    }
    else {
        db.set(nm, []).write();
        for (i = 0; i < subs.length; i++) {
            db.get(nm)
              .push({
                    subject: subs[i],
                    code: codes[i]
                })
                 .write();
        }
        return res.json(req.body);

    }
       
        
    
});


app.delete('/schedules/:name', (req, res) => {
    const nm = req.params.name;
    if (!db.has(nm)) {
        return res.status(404).send(`no schedule named ${nm} found`);
    }
    else {
        const obj = db.get(nm).value();
        db.unset(nm).write();

        return res.json(obj);
        
    }

});


app.get('/schedulelist', (req, res) => {
    const classes = [];

    const allSchedules = require('./db.json');

    for (var sche in allSchedules) {
        classes.push({
            name: sche,
            numberOfCourses: db.get(sche).size()

        });
    }
    
    return res.json(classes);
});

app.delete('/schedulelist', (req, res) => {
    
    const allSchedules = require('./db.json');

    for (var sche in allSchedules) {
        db.unset(sche).write();
    }
    
    return res.json({
        delete: "success"
    });

});

function sanitize(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



app.listen(PORT, () => console.log("this is my backend running"));
