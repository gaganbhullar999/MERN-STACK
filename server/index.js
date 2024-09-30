const express = require("express");
const app = express();
const mongoose = require("mongoose");
const VehicleModel = require("./models/Vehicles");
const cors = require("cors");
app.use(express.json());
app.use(cors());

try {
  mongoose.connect(
    "mongodb+srv://gagan:bhullar5911@dashboard.jqqox.mongodb.net/test"
  );
  console.log("database connection successful");
} catch (error) {
  console.error("database connection failed" + error);
}

//localhost:4000/vehicles (get)
app.get("/getVehicles", (req, res) => {
  VehicleModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.delete("/vehicles/:id", async (req, res) => {
  try {
    let result = await VehicleModel.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
app.patch("/vehicles/:id", async (req, res) => {
  let vehicle = await VehicleModel.findById(req.params.id);
  if (!vehicle) {
    //
  }

  for (let i in req.body) {
    vehicle[i] = req.body[i];
  }

  try {
    let result = await vehicle.save();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

//localhost:4000/vehicles (post)
app.post("/createVehicle", async (req, res) => {
  const vehicle = req.body;
  const newVehicle = new VehicleModel(vehicle);
  let result = await newVehicle.save();

  res.json(result);
});

app.post("/markAsSold", async (req, res) => {
  const id = req.body.id;
  await VehicleModel.findByIdAndUpdate(id, { status: "Sold" });
  res.json({ success: true });
});

app.get("/getStat", async (req, res) => {
  const liveCount = await VehicleModel.count({ status: "Live" });
  const soldCount = await VehicleModel.count({ status: "Sold" });

  res.json({
    live: liveCount,
    sold: soldCount,
  });
});

app.listen(4000, () => {
  console.log("SERVER RUNS ");
});
