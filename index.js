require("dotenv").config();
const mongoose = require('mongoose');
const URI=process.env.MONGO_URI;
mongoose.connect(URI);
const admin = require('./admin');
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const student = require('./student');
const applystudent = require('./applyStu')

app.post('/adminlogin', async (req, res) => {
    if (req.body.username && req.body.password) {
        let data = await admin.find(req.body);
        if (data.length > 0) {
            res.send(data);
        } else {
            res.send({ Status: "Username password not matched" });
        }

    }
    else {
        res.send({ Status: "invailid syntax" });
    }
});

app.post('/addstudent', async (req, res) => {
    if (req.body.name && req.body.email && req.body.contact && req.body.college && req.body.course && req.body.totalfee && req.body.paidfee && req.body.leftfee && req.body.city && req.body.joindate) {
        let data = new student(req.body);
        data = await data.save();
        res.send({ Status: "Data Saved Successfully" });
    } else {

    }

});
app.post('/applystudent', async (req, res) => {
    if (req.body.name && req.body.email && req.body.contact && req.body.course && req.body.city) {
        let data = new applystudent(req.body);
        data = await data.save();
        res.send({ Status: "Successfully Applied" });
    } else {
        res.send({ Required: "All Fields are Required" });
    }
})
app.get('/getstudent', async (req, res) => {
    let data = await student.find();
    res.send(data);
})

app.delete('/deletedata/:id', async (req, res) => {
    let data = await student.deleteOne({ _id: req.params.id });
    res.send(data);
})

app.get('/studentdata/:id', async (req, res) => {
    let data = await student.findOne({ _id: req.params.id });
    res.send(data);
})

app.put('/updatestudent/:id', async (req, res) => {
    try {
        let data = await student.updateOne({ _id: req.params.id },
            { $set: req.body }
        );
        res.send({ Success: "Data Updated Successfully" });
    }
    catch {
        res.send({ Status: "Unable to update date" });
    }
});

app.get('/searchdata/:key', async (req, res) => {
    let result = await student.find(
        {
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { college: { $regex: req.params.key, $options: 'i' } },
                { joindate: { $regex: req.params.key, $options: 'i' } }
            ]
        }
    );
    res.send(result);
});
app.get('/searchcourse/:key', async (req, res) => {
    let result = await student.find(
        {
            "$or": [
                { course: { $regex: req.params.key, $options: 'i' } }
            ]
        }
    );
    res.send(result);
});


app.get('/getapplystudent', async (req, res) => {
    let data = await applystudent.find();
    res.send(data);
})

app.delete('/deleteapplieddata/:id', async (req, res) => {
    let data = await applystudent.deleteOne({ _id: req.params.id });
    res.send(data);
})

app.get('/studentapplieddata/:id', async (req, res) => {
    let data = await applystudent.findOne({ _id: req.params.id });
    res.send(data);
})

app.put('/updateapplystudent/:id', async (req, res) => {
    try {
        let data = await applystudent.updateOne({ _id: req.params.id },
            { $set: req.body }
        );
        res.send({ Success: "Data Updated Successfully" });
    }
    catch {
        res.send({ Status: "Unable to update date" });
    }
});

app.get('/searchapplieddata/:key', async (req, res) => {
    let result = await applystudent.find(
        {
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { college: { $regex: req.params.key, $options: 'i' } },
                { joindate: { $regex: req.params.key, $options: 'i' } }
            ]
        }
    );
    res.send(result);
});
app.get('/searchappliedcourse/:key', async (req, res) => {
    let result = await applystudent.find(
        {
            "$or": [
                { course: { $regex: req.params.key, $options: 'i' } }
            ]
        }
    );
    res.send(result);
});


app.listen(4500);