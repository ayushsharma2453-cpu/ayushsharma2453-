const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://ayushsharma2453_db_user:Ayushsh@cluster0.rk68c4o.mongodb.net/biggboynewsDB?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let contactCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("biggboynewsDB");
    contactCollection = db.collection("contacts");
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ MongoDB Connection Error:", err);
  }
}

connectDB();


// ===== CONTACT FORM API =====
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const result = await contactCollection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });

    res.status(200).json({ message: "Message saved successfully", id: result.insertedId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server Running Successfully");
});


app.listen(PORT, () => {
  console.log("🚀 Server running...");
});