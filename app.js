const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitze = require('express-mongo-sanitize');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const resepRouter = require('./routes/resepRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errController');

const app = express();
// global middleware

// set security http headers
app.use(helmet());

// cors
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

// limit requests from same API
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization against NoSQL query injection
app.use(mongoSanitze());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the server side!',
    app: 'Natours',
  });
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', resepRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
