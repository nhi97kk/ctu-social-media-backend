const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss');
// const hpp = require('hpp');
const cookieParser = require('cookie-parser');
// const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();
// app.use(cors({ origin: 'http://localhost:3000' }));

// 1) global MIDDLEWARES
//serving static file
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));
// set security http headers
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"], // chỉ cho phép tải tài nguyên từ chính trang web của bạn
//       scriptSrc: [
//         "'self'",
//         "'unsafe-inline'",
//         "'unsafe-eval'",
//         'https://cdn.jsdelivr.net',
//         'https://js.stripe.com'
//       ], // cho phép tải script từ trang web của bạn và một số nguồn an toàn khác
//       styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'], // cho phép tải CSS từ trang web của bạn và một số nguồn an toàn khác
//       fontSrc: ["'self'", 'https://fonts.gstatic.com'], // cho phép tải font từ trang web của bạn và một số nguồn an toàn khác
//       imgSrc: ["'self'", 'data:'], // chỉ cho phép hiển thị hình ảnh từ trang web của bạn và dữ liệu base64
//       connectSrc: ["'self'", 'ws://localhost:*'], // chỉ cho phép kết nối đến máy chủ từ chính trang web của bạn
//       objectSrc: ["'none'"], // không cho phép tải các object từ bất kỳ nguồn nào
//       frameSrc: ["'self'", 'https://js.stripe.com']
//     }
//   })
// );

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// //limit requests
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

//body parser, reading  data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

//test middle ware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req);
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

//page not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
