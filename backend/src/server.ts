import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Import Routes
import authRoutes from './routes/authRoutes';
import assetRoutes from './routes/assetRoutes';
import purchaseRoutes from './routes/purchaseRoutes';
import transferRoutes from './routes/transferRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
