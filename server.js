const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path"); // ✅ added

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ IMPORTANT — allows ads.txt and HTML files to be accessible
app.use(express.static(__dirname));


// ✅ MongoDB Atlas connection
const uri = "mongodb+srv://ayushsharma2453_db_user:Ayushsh@cluster0.rk68c4o.mongodb.net/biggboynewsDB?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("biggboynewsDB");
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ MongoDB Connection Error:", err);
  }
}

connectDB();


// ✅ CONTACT FORM SAVE
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await db.collection("contacts").insertOne({
      name,
      email,
      subject,
      message,
      date: new Date()
    });

    res.json({ message: "Message saved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});


// ✅ SUBSCRIBE EMAIL SAVE
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    await db.collection("subscribers").insertOne({
      email,
      date: new Date()
    });

    res.json({ message: "Subscribed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});


// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 Server Running Successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});