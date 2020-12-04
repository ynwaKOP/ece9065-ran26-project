
const express = require('express');
const app = express();
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
for (i = 0; i < 2; i++) {
    let cur = {
        subject: data[i].subject.toString().toLowerCase(),
        code: data[i].catalog_nbr.toString().toLowerCase(),
        name: data[i].className.toString().toLowerCase(),
        section: data[i].course_info[0].class_section.toString().toLowerCase(),
        component: data[i].course_info[0].ssr_component.toString().toLowerCase(),

        start_timm: data[i].course_info[0].start_time.toString().toLowerCase(),
        end_timm: data[i].course_info[0].end_time.toString().toLowerCase(),
        days: data[i].course_info[0].days.toString().toLowerCase(), 
        descr: data[i].course_info[0].descr.toString().toLowerCase()
        //info: data[i].course_info, 
    };

    courses.push(cur);

}



//console.log(typeof(courses[0].name));


// any combination of subject + code
app.get('/api/open/courses/:subject/:code', (req, res) => {
    var subject = req.params.subject;
    var code = req.params.code;
    
    const classes = [];
    for (i = 0; i < courses.length; i++) {
        if (subject.toLowerCase() === courses[i].subject 
                && code.toLowerCase() === courses[i].code) {
                    classes.push({
                        course: courses[i]
            });
        }
    }

    if (classes.length > 0) {
        return res.json(classes);
    }
    else {
        return res.status(404).send('No results');
    }
    
});


// check if s1 is part of s2 with minor mistakes.
function isSimilar(s1, s2) {
    const n = s1.length;
    for (i = 0; i < s2.length-n; i++) {
        simi = Similarity.compareTwoStrings(s1, s2.substring(i, i+n+1));
        if (simi >= 0.8) {
            return true;
        }
    }
    return false;
}



// search keyword
app.get('/api/keyword/:key', (req, res) => {
    var key = req.params.key;
    if (key.length < 5) {
        return res.status(404).send('at least 5 characters');
    }

    const ans = [];
    key = key.replace(/\s/g, "").toLowerCase();
   
    for (let c of courses) {
        const simi1 = isSimilar(key, c.code.replace(/\s/g, ""));
        const simi2 = isSimilar(key, c.name.replace(/\s/g, ""))
        console.log(simi1);
        console.log(simi2);
        if (simi1 || simi2 ) {
            ans.push({
                course: c
            });
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
        .value();
    return res.json(pubLists);
    
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



app.listen(PORT, () => console.log("running"));
