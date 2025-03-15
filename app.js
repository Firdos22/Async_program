const fs = require("fs");
const yargs = require("yargs");
const path = require("path");

const getFilenames = () => {
  try {
    const data = fs.readFileSync("filenames.txt", "utf8");
    return data.split("\n").filter(Boolean); // Clean up empty lines
  } catch (error) {
    return [];
  }
};

const saveFilename = (filename) => {
  fs.appendFileSync("filenames.txt", filename + "\n", "utf8");
};

// Create a new file and write the text 'You are awesome'
const createFile = (filename) => {
  fs.writeFileSync(filename, "You are awesome", "utf8");
  console.log(`File "${filename}" has been created successfully!`);
};

const argv = yargs.option("filename", {
  alias: "f",
  description: "Enter the filename to create",
  type: "string",
  demandOption: true,
}).argv;

const filenames = getFilenames();

if (filenames.includes(argv.filename)) {
  console.log("The filename already exists. Please provide a new one.");
} else {
  // Create the file and save the filename
  createFile(argv.filename);
  saveFilename(argv.filename);
}
