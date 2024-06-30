import fs from "fs/promises";
import path from "path";

const dbPath = path.resolve("data", "db.json"); // Resolving the path to the database file (db.json)

// Function to read data from the database file
export const readDb = async () => {
  const data = await fs.readFile(dbPath, "utf8"); // Reading the file content as a string
  return JSON.parse(data); // Parsing the string content to JSON and returning it
};
