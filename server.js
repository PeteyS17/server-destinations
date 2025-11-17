const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");

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
    blurb:
      "Architecture, lakefront paths, world-class museums, and a legendary food scene.",
    detail_link: "chicago.html",
  },
  {
    _id: 2,
    title: "Queens",
    location: "New York, USA",
    category: "City & Culture",
    duration: "Weekend trip",
    budget: "$$",
    img_name: "images/queens2.png",
    blurb:
      "Flushing food courts, LIC skyline parks, Citi Field, and global neighborhoods.",
    detail_link: "blog-queens.html",
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
    detail_link: "blog-london.html",
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
    detail_link: "blog-tokyo.html",
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
    detail_link: "activities.html",
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
    detail_link: "activities.html",
  },
  {
    _id: 7,
    title: "Historic City",
    location: "South Carolina",
    category: "City & Culture",
    duration: "2–3 days",
    budget: "$$",
    img_name: "images/oldtown.jpeg",
    blurb:
      "Old squares, cobblestones, café culture, and preserved landmarks.",
    detail_link: "destinations.html",
  },
  {
    _id: 8,
    title: "The Louvre",
    location: "Paris, France",
    category: "Culture",
    duration: "Half day",
    budget: "$",
    img_name: "images/louvrefr.jpeg",
    blurb:
      "An iconic collection of art and history in a striking building.",
    detail_link: "activities.html",
  },
];

let blogs = [
  {
    _id: 0,
    title: "Exploring Queens, New York",
    author: "Travel Blogger",
    excerpt:
      "Queens is diverse and full of surprises. I loved exploring different neighborhoods...",
    body:
      "Queens is one of New York City’s most vibrant and diverse boroughs, offering a blend of cultures, cuisines, and experiences unlike anywhere else in the world. From bustling food hubs in Flushing and Jackson Heights to waterfront parks and skyline views in Long Island City, Queens has something for every type of traveler.",
    main_image: "queens.jpeg",
  },
  {
    _id: 1,
    title: "A Weekend in London",
    author: "Petey’s Journal",
    excerpt:
      "London is a city where history meets modern culture. On my first day, I visited...",
    body:
      "London blends royal traditions with a lively modern scene. Start in Westminster for iconic landmarks, then cross the river to South Bank for views and markets.",
    main_image: "london1.jpeg",
  },
  {
    _id: 2,
    title: "Adventures in Tokyo",
    author: "Guest Contributor",
    excerpt:
      "Tokyo blends tradition and modern life seamlessly. I started with temples in Asakusa...",
    body:
      "Begin in Asakusa for temples and street snacks, then explore Akihabara’s tech and pop culture. Head to Shibuya and Shinjuku for neon nights and skyline views.",
    main_image: "tokyo.jpeg",
  },
];

const blogSchema = Joi.object({
  _id: Joi.allow(""),
  title: Joi.string().min(3).required(),
  author: Joi.string().min(2).required(),
  excerpt: Joi.string().min(5).required(),
  body: Joi.string().min(10).required(),
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Beyond Borders API</h1>
    <ul>
      <li><a href="/api/destinations">GET /api/destinations</a></li>
      <li><a href="/api/destinations/1">GET /api/destinations/:id</a></li>
      <li><a href="/api/blogs">GET /api/blogs</a></li>
      <li><a href="/api/blogs/0">GET /api/blogs/:id</a></li>
      <li>POST /api/blogs</li>
    </ul>
  `);
});

app.get("/api/destinations", (req, res) => {
  res.json(destinations);
});

app.get("/api/destinations/:id", (req, res) => {
  const item = destinations.find((d) => d._id === parseInt(req.params.id, 10));
  if (!item) {
    return res
      .status(404)
      .json({ success: false, message: "Destination not found" });
  }
  res.json(item);
});

app.get("/api/blogs", (req, res) => {
  res.send(blogs);
});

app.get("/api/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b._id === parseInt(req.params.id, 10));
  if (!blog) {
    return res
      .status(404)
      .json({ success: false, message: "Blog not found" });
  }
  res.send(blog);
});

app.post("/api/blogs", upload.single("img"), (req, res) => {
  console.log("in blog post request");
  const result = blogSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const blog = {
    _id: blogs.length,
    title: req.body.title,
    author: req.body.author,
    excerpt: req.body.excerpt,
    body: req.body.body,
  };

  if (req.file) {
    blog.main_image = req.file.filename;
  }

  blogs.push(blog);
  res.status(200).send(blog);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
