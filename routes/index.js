const fs = require('fs');
const path = require('path');
// const walk = require('walk');
const stemmer = require('stemmer');
const commonmark = require('commonmark');
const crypto = require('crypto');
// We will create an empty hash table to store the indexed data, in other words, it's the database of searchable content that we're building up:
const ProjUrlPrefix = process.argv[2];
//  the walk module to create a App, which will walk through each Markdown file in the project directory, ProjDir
/* For each file in the ProjDir, we are going to check if it ends with
the file extension .md, which will tell us whether or not it is a
Markdown-formatted file.*/
const ProjDir = '/Project';
// const App = walk.walk('');
let index = Object.create(null);
/* If this is the case, we read in all of the content of the file using
fs.readFileSync. Then we store the results of processing the contents using the processFile function.*/
App.on('file', function(root, fileStats, next) {
  const fileName = fileStats.name;
  if (fileName.indexOf('.md') !== -1) {
    const pathName = path.join(ProjDir, fileName);
    const content = fs.readFileSync(pathName).toString();
    index[fileName] = processFile(fileName, content);
  }
  next();
});

App.on('errors', function(root, nodeStatsArray, next) {
  next();
});

App.on('end', function() {
  let result = [];
  for (var fileName in index) {
    for (var i = 0; i < index[fileName].length; i += 1) {
      result.push(index[fileName][i]);
    }
  }
  console.log(JSON.stringify(result));
});

function contentToMarkdownTree(content) {
  const reader = new commonmark.Parser();
  return reader.parse(content);
}

function processTitle(fileName, tree) {
  const cleanFileName = fileName.replace('.md', '');
  const tags = breakIntoTags(cleanFileName);
  return tags;
}

function processContent(title, tree) {
  const App = tree.App();
  let event, node, child;
  let currentHeading = null;
  let currentText = null;
  let sections = {null: []};

  while ((event = App.next())) {
    node = event.node;
    if (node.type === 'heading') {
      currentHeading = getNodeChildrenText(node);
    } else if (node.literal) {
      const text = node.literal.replace('\n', ' ').toLowerCase();
      if (sections[currentHeading]) {
        sections[currentHeading].push(text);
      } else {
        sections[currentHeading] = [text];
      }
    }
  }

  sections[title] = sections[null];
  delete sections[null];
  return sections;
}

function breakIntoTags(text) {
  let clean = text.replace(/[^a-zA-Z]/g, ' ');
  clean = clean.toLowerCase();
  clean = clean.split(' ');
  let tagsHash = Object.create(null);
  for (var i = 0; i < clean.length; i += 1) {
    if (shouldIgnoreWord(clean[i])) {
      continue;
    }
    const stemmed = stemmer(clean[i]);
    tagsHash[stemmed] = true;
    tagsHash[clean[i]] = true;
  }
  let tags = [];
  for (var key in tagsHash) {
    if (key.length > 0) {
      tags.push(key);
    }
  }
  return tags;
}

function shouldIgnoreWord(text) {
  const stopWords = ['the', 'on', 'for', 'up', 'an', "'", 'to'];
  return text.length === 1 || stopWords.indexOf(text) !== -1;
}

function generateId() {
  const hash = crypto.createHash('sha256');
  hash.update.apply(hash, arguments);
  return hash.digest('hex');
}

function getNodeChildrenText(node) {
  let text = '';
  child = node.firstChild;
  do {
    text += child.literal;
  } while ((child = child.next));
  return text;
}

function processFile(fileName, content) {
  let result = [];
  const title = fileName.replace('.md', '');
  const tree = contentToMarkdownTree(content);
  const tags = processTitle(fileName, tree);
  const processedContent = processContent(title, tree);
  for (var heading in processedContent) {
    const headingTags = breakIntoTags(heading);
    for (var i = 0; i < processedContent[heading].length; i += 1) {
      const item = processedContent[heading][i];
      const subheadingUrl = heading.replace(/\s+/g, '-').replace(/[\/()]/g, '').toLowerCase();
      const id = generateId(title, heading, item.content);

      const titleUrl = `${ProjUrlPrefix}/${title.replace(' ', '-')}`;
      let headingUrlSuffix = heading.toLowerCase().replace(/[\/\(\),.]/g, '').replace(/ /g, '-');
      const data = {
        id: id,
        title: title,
        title_url: titleUrl,
        heading: heading,
        heading_url: title == heading ? titleUrl : `${titleUrl}#${headingUrlSuffix}`,
        content: item,
        tags: tags.concat(breakIntoTags(item)).concat(headingTags)
      };

      result.push(data);
    }
  }
  return result;
}
