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

        const myObj = [
            { _id: 157, name: 'Chocolate Heaven'},
            { _id: 158, name: 'Tasty Lemon'},
            { _id: 159, name: 'Vanilla Dream'}
        ];

        const result = await dbo.collection('products').insertMany(myObj);

        console.log(`Number of documents inserted: ${result.insertedCount}`);
        console.log(result);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);



console.log('Hello World!');
