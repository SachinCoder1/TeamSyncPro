import { ObjectId } from "mongodb";


const data = [
  {
    id: "1",
    name: "name",
    position: "position",
    level: "senior",
  },
  {
    id: "2",
    name: "name2",
    position: "position2",
    level: "senior2",
  },
]


const resolvers = {
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async record(_, { id }, context) {
      return data[id];
    },
    async records(_, __, context) {
      return data || []
    },
  },
//   Mutation: {
//     async createRecord(_, { name, position, level }, context) {
//       let collection = await db.collection("records");
//       const insert = await collection.insertOne({ name, position, level });
//       if (insert.acknowledged)
//         return { name, position, level, id: insert.insertedId };
//       return null;
//     },
//     async updateRecord(_, args, context) {
//       const id = new ObjectId(args.id);
//       let query = { _id: new ObjectId(id) };
//       let collection = await db.collection("records");
//       const update = await collection.updateOne(query, { $set: { ...args } });

//       if (update.acknowledged) return await collection.findOne(query);

//       return null;
//     },
//     async deleteRecord(_, { id }, context) {
//       let collection = await db.collection("records");
//       const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
//       return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
//     },
//   },
};

export default resolvers;
