const app = require("./src/app");
const PORT = 3055;

// Start server
const server = app.listen(PORT, () => {
    console.log(`WSV ecomerce start with ${PORT}`);
});

// Giữ Node process chạy
process.stdin.resume();

process.on('SIGINT', () => {
    server.close(() => {
        console.log("Exit server Express");
        process.exit(0);
    });
});
