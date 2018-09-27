db = db.getSiblingDB('TEAMDB');
filedb = db.getSiblingDB('TEAMFILEDB');
db.createUser(
    {
        user: "USER",
        pwd: "PASSWORD",
        roles: [
        	{ role: "dbOwner", db: "TEAMDB"},
            { role: "dbOwner", db: "TEAMFILEDB"}
        ]
    }
);
db.createCollection("newCollection");
filedb.createCollection("newCollection");