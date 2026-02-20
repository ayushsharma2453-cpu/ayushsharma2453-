const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ⚠ apna password yahan daalo
const uri = "mongodb+srv://ayushsharma2453_db_user:Ayushsh@cluster0.rk68c4o.mongodb.net/biggboynewsDB?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ MongoDB Connection Error:", err);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("🚀 Server Running Successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

