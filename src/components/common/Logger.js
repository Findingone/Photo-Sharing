
// export default class Logging {
//     static instance = null;
//     static getInstance() {
//         if (this.instance == null) {
//             const winston = require('winston');
//             this.instance = winston.createLogger({
//                 transports: [
//                     new winston.transports.File({ filename: 'app.log' })
//                 ]
//             })
//         }
//         return this.instance;
//     }
// }