const mongoose = require('mongoose');
const dbName = 'Projet2CP';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB Connected');
        await createRoles(); // Call the createRoles function after database connection
    } catch (err) {
        console.error(err);
        console.log('MongoDB connection failed');
        process.exit(1);
    }
};

const createRoles = async () => {
    try {
        const database = mongoose.connection.db;

        // Define roles
        const roles = [
            {
                role: 'parentRole',
                privileges: [
                    {
                        resource: { db: dbName, collection: 'users' },
                        actions: ['find', 'insert', 'update', 'remove'],
                        filter: { _id: '$_id' },
                    },
                    {
                        resource: { db: dbName, collection: 'Avis' },
                        actions: ['find', 'insert', 'update', 'remove'],
                        filter: { IdUser: '$_id' },
                    },
                    {
                        resource: { db: dbName, collection: 'enfants' },
                        actions: ['find', 'insert', 'update', 'remove'],
                        filter: { Parent: '$_id' },
                    },
                    {
                        resource: { db: dbName, collection: 'creches' },
                        actions: ['find'],
                    },
                    {
                        resource: { db: dbName, collection: 'Avis' },
                        actions: ['find'],
                    },
                ],
                roles: [],
            },
            {
                role: 'proprietorRole',
                privileges: [
                    {
                        resource: { db: dbName, collection: 'users' },
                        actions: ['find', 'insert', 'update', 'remove'],
                        filter: { _id: '$_id' },
                    },
                    {
                        resource: { db: dbName, collection: 'Avis' },
                        actions: ['find', 'insert', 'update', 'remove'],
                        filter: { IdUser: '$_id' },
                    },
                    {
                        resource: { db: dbName, collection: 'enfants' },
                        actions: ['find', 'insert', 'update', 'remove'],
                        filter: { Parent: '$_id' },
                    },
                    {
                        resource: { db: dbName, collection: 'creches' },
                        actions: ['find'],
                    },
                    {
                        resource: { db: dbName, collection: 'Avis' },
                        actions: ['find'],
                    },
                    {
                        resource: { db: dbName, collection: 'creches' },
                        actions: ['find', 'insert', 'update', 'remove'],
                        filter: { Proprietaire: '$_id' },
                    },
                    {
                        resource: { db: dbName, collection: 'enfants' },
                        actions: ['find'],
                    },
                ],
                roles: [],
            },
        ];

        // Create roles
        for (const role of roles) {
            await database.command({ createRole: role.role, privileges: role.privileges, roles: role.roles });
            console.log(`Role "${role.role}" created.`);
        }

        console.log('Roles created successfully.');
    } catch (error) {
        console.error('Error creating roles:', error);
    }
};

module.exports = connectDB;


// to grant the roles to the users when they register
// Path: Projet2CP_EQ38\server\controllers\userController.js
// we add this code to the register function
/*
let userRole;
if(role === 'parent'){
    userRole = 'parentRole';
}
else if(role === 'proprietor'){
    userRole = 'proprietorRole';
}

// Grant the role to the user
await database.command({ grantRolesToUser: email, roles: [role : userRole , db: dbName] });

 */