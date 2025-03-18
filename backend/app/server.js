const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    });

const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
    purchaseTime: { type: Date, default: Date.now },
});

const Lead = mongoose.model('Lead', leadSchema);

app.post('/api/leads', async (req, res) => {
    const { name, email, address, phoneNumber, purchaseTime } = req.body;
    const newLead = new Lead({
        name,
        email,
        address,
        phoneNumber,
        purchaseTime: purchaseTime || Date.now(),
    });

    try {
        await newLead.save();
        res.status(201).json({ message: 'Lead saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving lead', error });
    }
});

app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
});

app.get('/api/leads/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lead', error });
    }
});

app.put('/api/leads/:id', async (req, res) => {
    const { name, email, address, phoneNumber, purchaseTime } = req.body;
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, {
            name,
            email,
            address,
            phoneNumber,
            purchaseTime,
        }, { new: true });

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Error updating lead', error });
    }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user', error });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
});

app.post('/api/generate-score', async (req, res) => {
    const { leadId } = req.body;
        const webvisit = Math.floor(Math.random() * 10) + 1;

    try {
        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        const prompt = `Generate a score for the lead with the following details: Assume missing parameters from your side and generate a score based on the following details. The score should be between 0 and 100. The higher the score, the more likely the lead is to convert into a customer. The score should be based on the following parameters: Name, Email, Address, Phone Number, Purchase Time, Website_visit, Email_open, Email_click, Social_media_engagement, Company_size, Industry.
                Lead Details:
                Name: ${lead.name},
                Email: ${lead.email},
                Address: ${lead.address},
                Phone Number: ${lead.phoneNumber},
                Purchase Time: ${lead.purchaseTime}
                Website_visit: ${webvisit}
                Email_open: ${Math.floor(Math.random() * 10) + 1}
                Email_click: ${Math.floor(Math.random() * 10) + 1}
                Social_media_engagement: ${Math.floor(Math.random() * 10) + 1}
                Company_size: ${Math.floor(Math.random() * 10) + 1}
                Industry: ${Math.floor(Math.random() * 10) + 1}
                Just respose with number between 1 and 100.`;

        const result = await model.generateContent(prompt);
        const score = result.response.text();

        lead.score = score;
        await lead.save();

        res.status(200).json({ message: 'Score generated and saved successfully', score });
    } catch (error) {
        res.status(500).json({ message: 'Error generating score', error });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
