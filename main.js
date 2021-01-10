require("@tensorflow/tfjs-node");
const qna = require("@tensorflow-models/qna");
const chalk = require("chalk");
const extract = require("./files");
const use = require("@tensorflow-models/universal-sentence-encoder");
const findClosest = require("./calc");
const fs = require("fs");

async function main() {
  // getting answers
  const passage =
    "The Chicago Bears are a professional American football team based in Chicago. The Bears compete in the National Football League as a member club of the league's National Football Conference North division. The Bears have won nine NFL Championships, including one Super Bowl, and hold the NFL record";
  const questions = ["Who are the Chicago Bears?", "Did the Bears win the NFL Championship?"];
  var answers = []
  try {
    const model = await qna.load();
    for (question of questions) {
      const ans = await model.findAnswers(question, passage);
      answers.push(ans[0])
    }
    console.log(answers);
  } catch (e) {
    console.error(e);
  }

  // var passage = "";
  // fs.readFile("passage.txt", (err, data) => {
  //   if (err) throw err;

  //   passage = data.toString();
  //   console.log(passage);
  // });
  // const sentences = passage.split(". ");

  // console.log(chalk.blue("Running universal sentence encoder"));
  // use
  //   .load()
  //   .then((model) => {
  //     model.embed(sentences).then((embeddings) => {
  //       console.log(chalk.blueBright("Embeddings: " + embeddings));
  //     });
  //   })
  //   .then((res) => {
  //     const avg = res.reduce((r, c) => r + c, 0) / res.length;
  //     const number = process.argv[2] || 20;
  //     var embeddings = res;

  //     var indices = [];
  //     for (i of number) {
  //       const index = findClosest(embeddings, avg);
  //       indices.push(index);
  //       embeddings.splice(index, 1);
  //     }
  //     console.log(indices);

  //     var notes = "";
  //     for (var i = 0; i < indices.length; i++) {
  //       notes.concat(sentences[i]);
  //     }

  //     fs.writeFile("output/answers.txt", notes, (err) => {
  //       if (err) throw err;

  //       console.log(chalk.green("Notes: "));
  //       console.log(chalk.green(notes.slice(0, 200) + "..."));
  //     });

  //     console.log(chalk.green("Done"));
  //   });
}

main();
