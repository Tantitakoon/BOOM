'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ENV = undefined;

var _dotenv = require('../../../config/dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENV = exports.ENV = {
    ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    JWT_OL5_SECRET: process.env.JWT_OL5_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_INTERVAL: process.env.JWT_EXPIRATION_MINUTES,
    JWT_DATA_STORAGE: process.env.JWT_DATA_STORAGE,
    SAVE_LOG: process.env.SAVE_LOG === 'true',
    LOGS: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    LOG_PATH: process.env.LOG_PATH,
    LOG_ROTATE_TIME: process.env.LOG_ROTATE_TIME,
    USE_HTTPS: process.env.USE_HTTPS === 'true',
    SSL_KEY: process.env.SSL_KEY,
    SSL_CERT: process.env.SSL_CERT,
    SSL_CA: process.env.SSL_CA,
    BASE_API_MYAIS: process.env.BASE_API_MYAIS,
    BASE_API_AISPLAY: process.env.BASE_API_AISPLAY,
    BASE_IMG_URL: process.env.BASE_IMG_URL,
    BASE_API_AOG: process.env.BASE_API_AOG,
    BASE_URL_LINKING: process.env.BASE_URL_LINKING,
    AIS_PLAY_API_KEY: process.env.AIS_PLAY_API_KEY,
    X_AOG_KEY: process.env.X_AOG_KEY,
    
    PAGE_ACCESS_TOKEN:process.env.PAGE_ACCESS_TOKEN,
    SERVER_URL : process.env.SERVER_URL,
    APP_SECRET : process.env.APP_SECRET,
    APP_ID_1 : process.env.APP_ID_1,
    APP_ID_2 : process.env.APP_ID_2,
    TOKEN : process.env.TOKEN
};