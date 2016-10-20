var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:unnamed1@localhost/assessbox";

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var massiveCon = massive.connect({
        connectionString: connString
    },
    function(err, localdb) {
        db = localdb;
        // app.set('db', db);
        //
        // db.user_create_seed(function(){
        //   console.log("User Table Init");
        // });
        // db.vehicle_create_seed(function(){
        //   console.log("Vehicle Table Init")
        // });
    });

app.set('db', massiveCon);

var db = app.get('db');

// console.log(db);

app.get('/api/users', function(req, res, next) {
  if (db) {
    console.log("We have a database");
  }
  else {
    console.log("No database! AAAAAA");
  }
    db.get_all_users(function(err, response) {
        if (err) {
            res.set(500).json(err);
        }
        res.set(200).json(response);
    });
});

app.get('/api/vehicles', function(req, res, next) {
    db.get_all_vehicles(function(err, response) {
        if (err) {
            res.set(500).json(err);
        }
        res.set(200).json(response);
    });
});

app.post('/api/users', function(req, res, next) {
    db.create_user([req.body.firstname, req.body.lastname, req.body.email], function(err, response) {
        if (err) {
            res.set(500).json(err);
        }
        res.set(200).json(response);
    });
});

app.post('/api/vehicles', function(req, res, next) {
    db.create_vehicle([req.body.make, req.body.model, Number(req.body.year), Number(req.body.ownerId)], function(err, response) {
        if (err) {
            res.set(500).json(err);
        }
        res.set(200).json(response);
    });
});

app.get('/api/user/:userId/vehiclecount', function(req, res, next) {
    db.get_vehicles_count_by_user_id(req.params.userId, function(err, response) {
        if (err) {
            res.set(500).json(err);
        } else {
            res.set(200).json(response);
        }
    });
});

app.get('/api/user/:userId/vehicle', function(req, res, next) {
    db.get_vehicles_by_user_id(req.params.userId, function(error, response) {
        if (error) {
            res.set(500).json(err);
        }
        res.set(200).json(response);
    });
});

app.get('/api/vehicle', function(req, res, next) {
    if (req.query.email) {
        db.get_vehicles_by_email(req.query.email, function(error, response) {
            if (error) {
                res.set(500).json(err);
            }
            res.set(200).json(response);
        });
    } else if (req.query.userFirstStart) {
        db.get_vehicles_by_letters(req.query.userFirstStart, function(error, response) {
            if (error) {
                res.set(500).json(err);
            }
            res.set(200).json(response);
        });
    }
});

app.get('/api/newervehiclesbyyear', function(req, res, next) {
  db.get_newer_vehicles(function(err, response) {
    if (err) {
      res.set(500).json(err);
    }
    else {
      res.set(200).json(response);
    }
  });
});

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next) {
  db.update_vehicle_owner([req.params.vehicleId, req.params.userId], function(err, response) {
    if (err) {
      res.set(500).json(err);
    }
    else {
      res.set(200).json(response);
    }
  });
});

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next) {
  db.remove_vehicle_ownership([req.params.vehicleId, req.params.userId], function(err, response) {
    if (err) {
      res.set(500).json(err);
    }
    else {
      res.set(200).json(response);
    }
  });
});

app.delete('/api/vehicle/:vehicleId', function(req, res, next) {
  db.delete_vehicle(req.params.vehicleId, function(err, response) {
    if (err) {
      res.set(500).json(err);
    }
    else {
      res.set(200).json(response);
    }
  });
});




app.listen('3000', function() {
    console.log("Successfully listening on : 3000");
});

// module.exports = app;
