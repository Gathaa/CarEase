require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(express.json())
app.use(cors());
const serverport = process.env.serverport;
const jwt = require('jsonwebtoken');
const db = mysql.createConnection({
  user: process.env.user,
  host: process.env.host,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
});

app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;
  const mecorcar = req.body.mecorcar;
  db.query('SELECT * FROM user WHERE useremail = ?', [email], (err, result) => {
    if (result && result.length > 0) {
      res.send('Email already exists, please choose another one');
    } else {
      db.query('INSERT INTO user(username, useremail, phonenumber, password, mecorcar) VALUES (?, ?, ?, ?, ?)',
        [name, email, phonenumber, password, mecorcar],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send('Error inserting user data');
          } else {
            res.send('All the attributes were inserted into our tables!');
          }
        }
      );
    }
  });
});
app.get('/id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM user WHERE iduser = ?', [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.send('Error retrieving user data');
    } else {
      if (result && result.length > 0) {
        const user = result[0];
        res.send(user);
      } else {
        res.send('User not found');
      }
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    res.send("No Token Found !")
  } else {
    jwt.verify(token, "jwtSecretKey", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You Failed To Authenticate" })
      }
      else {
        req.Id = decoded.Id;
        next();
      }
    })
  }
}
app.get('/getownername', (req, res) => {
  const token1 = req.headers.authorization;
  if (!token1) {
    return res.status(401).send('Missing authorization header');
  }
  const token = token1.split(' ')[1];
  const decodedToken = jwt.verify(token, 'jwtSecretKey');
  const userId = decodedToken.id;
  db.query("SELECT username from user where user_id = ?", [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error Occurred While Adding !");
    } else {
      if (result.length > 0) {
        const username = result[0].username;
        return res.send(username);
      } else {
        return res.status(404).send("Username not found");
      }
    }
  });
});

app.get('/getcardata', (req, res) => {
  const token1 = req.headers.authorization;
  if (!token1) {
    return res.status(401).send('Missing authorization header');
  }
  const token = token1.split(' ')[1];
  const decodedToken = jwt.verify(token, 'jwtSecretKey');
  const userId = decodedToken.id;
  db.query("SELECT * FROM car WHERE user_id = ?", [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error Occurred While Adding !");
    } else {
      if (result.length > 0) {
        const carData = result.map(car => ({
          Brand: car.Brand,
          Type: car.Type,
          Kilo: car.Kilo,
          Age: car.Age,
          Insurance: car.Insurance,
          Empty: car.Empty,
          Visit: car.Visit
        }));
        return res.send(carData);
      } else {
        return res.status(404).send("No cars found");
      }
    }
  });
});

app.get('/getscheduele', (req, res) => {
  const token1 = req.headers.authorization;

  if (!token1) {
    return res.status(401).send('Missing authorization header');
  }
  const token = token1.split(' ')[1];
  const decodedToken = jwt.verify(token, 'jwtSecretKey');
  const userId = decodedToken.id;
  db.query("SELECT * from Agenda WHERE owner_id =?", [userId], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      if (result.length > 0) {
        const schedueleinfo = result.map(val => ({
          EventTxt :val.EventTxt,
          Event_Date : val.selectedDay

        }));
        return res.send(schedueleinfo);
      } else {
        return res.status(404).send("No cars found");
      }
    }
  })
})
app.get('/auth', verifyJWT, (req, res) => {
  res.send("You Are Authenticated !!")
})
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query('SELECT * FROM user WHERE useremail = ? AND password = ?', [email, password], (err, result) => {
    if (result.length > 0) {
      const user = result[0];
      const payload = {
        id: user.user_id,
        mecorcar: user.mecorcar,

      };
      console.log('User Type in back-end:', payload.mecorcar);
      console.log("user id is ", payload.id)
      const token = jwt.sign(payload, "jwtSecretKey", { expiresIn: 300 });
      res.json({ Login: true, token, result })
    } else {
      res.json({ Login: false, result })

    }
  });
});
app.post('/addcar', (req, res) => {
  const token1 = req.headers.authorization;
  if (!token1) {
    return res.status(401).send('Missing authorization header');
  }
  const token = token1.split(' ')[1];
  const decodedToken = jwt.verify(token, 'jwtSecretKey');
  const userId = decodedToken.id;
  const Brand = req.body.Brand;
  const Type = req.body.Type;
  const Kilo = req.body.Kilo;
  const Age = req.body.Age;
  const Insurance = req.body.Insurance;
  const Empty = req.body.Empty;
  const Visit = req.body.Visit;

  db.query('INSERT INTO car(Brand, Type, Kilo, Age, Insurance, Emptying, Visit, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [Brand, Type, Kilo, Age, Insurance, Empty, Visit, userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error Occured While Adding !");
    }
    else {
      res.send("All Attributes Were Inserted Into The Table Car");
    }
  });
}
);
app.post('/Schedule', (req, res) => {
  const token1 = req.headers.authorization;
  if (!token1) {
    return res.status(401).send('Missing authorization header');
  }
  const token = token1.split(' ')[1];
  const decodedToken = jwt.verify(token, 'jwtSecretKey');
  const userId = decodedToken.id;
  const EventTxt = req.body.EventTxt
  const Event_Date = req.body.selectedDay
  db.query("INSERT INTO agenda (EventTxt, Event_Date, user_id) VALUES (?,?,?) ", [EventTxt, Event_Date, userId], (err, result) => {
    if (err) { console.log(err) }
    else { res.send('Great Success') }
  });
})


app.post('/location', (req, res) => {
  const store_name = req.body.store_name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const categories = req.body.categories;
  const description = req.body.description;
  db.query(
    "INSERT INTO mechanicalstore (user_id, store_name, latitude, longitude, categories, description) VALUES (1, ?, ?, ?, ?, ?)",
    [store_name, latitude, longitude, categories, description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Great Success');
      }
    }
  );
});

app.listen(serverport, () => {
  console.log(`Server Is Runnning On Your Port ${serverport}`);
});
