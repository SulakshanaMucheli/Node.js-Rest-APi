const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userdb',{serverSelectionTimeoutMS: 30000});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
});
const User = mongoose.model('User', userSchema);

// Define the API endpoint
app.get('/users', async (req, res) => {
    const { latitude, longitude, page = 1, limit = 10 } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Missing latitude or longitude' });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const radius = 10; // Radius in kilometers

    // Haversine formula
    const toRad = (value) => (value * Math.PI) / 180;
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    try {
        const users = await User.find();
        const filteredUsers = users
            .map(user => ({
                ...user.toObject(),
                distance: haversineDistance(lat, lon, user.latitude, user.longitude)
            }))
            .filter(user => user.distance <= radius)
            .sort((a, b) => a.distance - b.distance)
            .slice((page - 1) * limit, page * limit);

        res.json(filteredUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
