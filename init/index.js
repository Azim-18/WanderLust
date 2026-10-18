const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}



const initDB = async () => {
    for (const obj of initData.data) {
        await Listing.updateOne(
            { title: obj.title },
            {
                $set: {
                    image: {
                        filename: obj.image.filename,
                        url: obj.image.url
                    }
                }
            }
        );
    }

    console.log("Photos updated successfully!");
    await mongoose.disconnect();
};

initDB().catch(console.error);
