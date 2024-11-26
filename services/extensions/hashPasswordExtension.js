const { Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");

module.exports = Prisma.defineExtension({
    query: {
        users: {
            create: async ({ args, query }) => {
                try {
                    if (args.data.password) {
                        const hash = await bcrypt.hash(args.data.password, 10);
                        args.data.password = hash;
                    }
                    return query(args);
                } catch (error) {
                    throw error;
                }
            }, 
            update: async ({ args, query }) => {
                try {
                    if (args.data.password !== undefined && args.data.password !== null && args.data.password.trim() !== "") {
                        const hash = await bcrypt.hash(args.data.password, 10);
                        args.data.password = hash;
                    } else {
                        delete args.data.password;
                    }
                    return query(args);
                } catch (error) {
                    throw error;
                }
            }
        },
    }
});
