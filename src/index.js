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

        const dbo = client.db(process.env.DATABASE_DB);

        const result = await dbo.collection(process.env.COLLECTION).find({}, {
            projection: {
                _id: 0,
            }
        }).toArray();

        console.log(result);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);



console.log('Hello World!');
