import * as dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_DB}?${process.env.DATABASE_OPTIONS}`;

// console.log(uri);

// const client = new MongoClient(process.env.DATABASE_URL, {
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const dbo = client.db("mydb");

        await dbo.createCollection("customers");

        // await dbo.createCollection("customers", function(err, res) {
        //     if (err) {
        //         throw err;
        //     }
        //
        //     console.log("Collection created!");
        // });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);



console.log('Hello World!');
