const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const crecheRoutes = require('./routes/crecheRoutes');
const avisRoutes = require('./routes/avisRoutes');
const enfantRoutes = require('./routes/enfantRoutes');
const SearchRoute = require('./routes/SearchRoute');
const adminRoutes = require('./routes/adminRoutes')
const ReservationRoutes = require('./routes/ReservationRoutes');
const RendezVousRoutes = require('./routes/RendezVousRoutes');
const cookieParser = require('cookie-parser');
dotenv.config();

//see allowed origins
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(cookieParser());
//start the server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
}
);
//routes
app.use('/api/auth', authRoutes);
app.use('/creche', crecheRoutes);
app.use('/avis', avisRoutes);
app.use('/enfant', enfantRoutes);
app.use('/api/admin', adminRoutes)
app.use('/',SearchRoute)
app.use('/reservation',ReservationRoutes);
app.use('/rdv',RendezVousRoutes);