const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';  // Path to your data.json file

const makeCommit = (n) => {
  // Stop once we reach the desired number of commits
  if (n === 0) return simpleGit().push();

  // Generate random weeks (x) and days (y) to add to the base date using Math.random()
  const x = Math.floor(Math.random() * 55);  // Random number of weeks between 0 and 54
  const y = Math.floor(Math.random() * 7);   // Random number of days between 0 and 6

  // Start from September 1st and randomly adjust the date
  const DATE = moment()
    .year(2024)               // Set the year (you can change this)
    .month(8)                 // Set the month to September (0-indexed, 8 = September)
    .date(1)                  // Set the starting date to the 1st of September
    .add(x, 'w')              // Add random weeks (x)
    .add(y, 'd')              // Add random days (y)
    .format();                // Format the date as ISO string

  const data = {
    date: DATE
  };

  console.log(`Committing with date: ${DATE}`);  // Output the commit date

  // Write the data to the JSON file
  jsonfile.writeFile(FILE_PATH, data, () => {
    // Add the file, commit, and call makeCommit recursively with decreased n
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n));  // Commit with the generated date
  });
};

// Start committing 100 times
makeCommit(1000);
