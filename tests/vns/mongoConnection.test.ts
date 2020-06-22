import {
  connectToDb,
  closeDbConnection,
} from "../../src/api/middlewares/mongoConnection";
// TODO: setup dotenv like in Next
// @see https://github.com/VulcanJS/vulcan-next-starter/issues/47
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI =
    "mongodb+srv://johnDoe:T74OcxqL15TRt7Zn@lbke-demo-ara2d.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
}

describe("api/middlewares/mongoConnection", () => {
  afterEach(() => {
    closeDbConnection();
  });
  it("connects to mongo db", async () => {
    const res = await connectToDb(process.env.MONGO_URI); // you can define a .env.test to configure this
    expect(res).toBeTruthy();
  });
  it("connects only one if already connecting", async () => {
    await connectToDb(process.env.MONGO_URI); // you can define a .env.test to configure this
    const newConnection = await connectToDb(process.env.MONGO_URI); // you can define a .env.test to configure this
    expect(newConnection).toBe(false);
  });
});
