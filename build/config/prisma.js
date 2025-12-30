"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    adapter: {
        url: process.env.DATABASE_URL,
    },
});
exports.default = prisma;
