
require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.PORT || 3056;

// Start server
const server = app.listen(PORT, () => {
    console.log(`WSV ecomerce start with ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log("Exit server Express");
        process.exit(0);
    });
});
