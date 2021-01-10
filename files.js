const fs = require("fs");
const path = require("path");
const tess = require("tesseract.js");
const chalk = require("chalk");

async function extractImages() {
  console.log(chalk.blueBright("Extracting from images..."));
  try {
    var passage = "";
    var questions = "";
    const pathToPassage = path.join(__dirname, "/input/passage");
    const pathToQuestions = path.join(__dirname, "/input/questions");

    var passageFiles = fs.readdirSync(pathToPassage, { encoding: "utf-8" });
    var questionFiles = fs.readdirSync(pathToQuestions, { encoding: "utf-8" });

    console.log(chalk.blueBright("Extracting text from images..."));
    for (f of passageFiles) {
      try {
        if (path.extname(f) == ".jpg") {
          tess
            .recognize(`${pathToPassage}/${f}`, "eng", {
              logger: (m) => console.log(chalk.blueBright("p: " + m.toJSON())),
            })
            .then(({ data: { text } }) => {
              passage.concat(text);
            });
        }
      } catch (e) {
        console.error(e);
      }
    }

    for (f of questionFiles) {
      try {
        if (path.extname(f) == ".jpg") {
          tess
            .recognize(`${pathToQuestions}/${f}`, "eng", {
              logger: (m) => console.log(chalk.blueBright("q: " + m.toJSON())),
            })
            .then(({ data: { text } }) => {
              questions.concat(text);
            });
        }
      } catch (e) {
        console.error(e);
      }
    }

    return { passage: passage, questions: questions };
  } catch (e) {
    console.error(e);
  }
}

function extract() {
  const { questions, passage } = extractImages();

  var str = questions.toString();
  const strArray = str.split(/\(0-9)+./);
  console.log(chalk.cyan("Questions: " + strArray.toString()));

  console.log(chalk.cyan("Passage: " + passage));

  return { questions: strArray, passage: passage };
}

module.exports = extract;
