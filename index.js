import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const markCommit = (x, y) => {
  const date = moment()
    .subtract(2, "y") // Subtract 2 years from the current date
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  jsonfile.writeFile(path, data, () => {
    git.add([path])
      .commit(date, { "--date": date })
      .push("origin", "main"); // Push to the main branch
  });
};

const makeCommits = (n) => {
  if (n === 0) return git.push("origin", "main");

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(2, "y") // Ensure starting point is 2 years back
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };
  console.log(`Creating commit for date: ${date}`);
  jsonfile.writeFile(path, data, () => {
    git.add([path])
      .commit(date, { "--date": date }, () => makeCommits(n - 1));
  });
};

makeCommits(100);
