const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


  let destinations = [
    {
        _id: 1,
        title: "Chicago",
        location: "Illinois, USA",
        category: "City & Culture",
        duration: "3–4 days",
        budget: "$$",
        img_name: "images/chicagohome.png",
        blurb: "Architecture, lakefront paths, world-class museums, and a legendary food scene.",
        detail_link: "chicago.html"
      },
      {
        _id: 2,
        title: "Queens",
        location: "New York, USA",
        category: "City & Culture",
        duration: "Weekend trip",
        budget: "$$",
        img_name: "images/queens2.png",
        blurb: "Flushing food courts, LIC skyline parks, Citi Field, and global neighborhoods.",
        detail_link: "blog-queens.html"
      },
      {
        _id: 3,
        title: "London",
        location: "England, UK",
        category: "City & Culture",
        duration: "4–5 days",
        budget: "$$$",
        img_name: "images/london1.jpeg",
        blurb: "Royal landmarks, museums, markets, and Thames river walks.",
        detail_link: "blog-london.html"
      },
      {
        _id: 4,
        title: "Tokyo",
        location: "Japan",
        category: "City & Culture",
        duration: "5–7 days",
        budget: "$$$",
        img_name: "images/tokyo.jpeg",
        blurb: "Temples, neon districts, amazing street food, and spotless transit.",
        detail_link: "blog-tokyo.html"
      },
      {
        _id: 5,
        title: "Coastal Town",
        location: "Dominican Republic",
        category: "Beach & Relax",
        duration: "1 week",
        budget: "$$",
        img_name: "images/coastaltown.jpeg",
        blurb: "Turquoise water, palm-lined beaches, and lazy afternoons.",
        detail_link: "activities.html"
      },
      {
        _id: 6,
        title: "Mountain Village",
        location: "Smoky Mountains, USA",
        category: "Mountains & Trails",
        duration: "3–4 days",
        budget: "$",
        img_name: "images/mountvilage.jpeg",
        blurb: "Scenic hikes, overlooks, and cozy family-friendly trails.",
        detail_link: "activities.html"
      },
      {
        _id: 7,
        title: "Historic City",
        location: "South Carolina",
        category: "City & Culture",
        duration: "2–3 days",
        budget: "$$",
        img_name: "images/oldtown.jpeg",
        blurb: "Old squares, cobblestones, café culture, and preserved landmarks.",
        detail_link: "destinations.html"
      },
      {
        _id: 8,
        title: "The Louvre",
        location: "Paris, France",
        category: "Culture",
        duration: "Half day",
        budget: "$",
        img_name: "images/louvrefr.jpeg",
        blurb: "An iconic collection of art and history in a striking building.",
        detail_link: "activities.html"
      }
    ];
  
    app.get("/api/destinations", (req, res) => {
        res.json(destinations);
      });
      
      app.get("/api/destinations/:id", (req, res) => {
        const item = destinations.find(d => d._id === parseInt(req.params.id, 10));
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
      });
      
      
      app.listen(3001, () => {
        console.log("Server is up and running");
      });