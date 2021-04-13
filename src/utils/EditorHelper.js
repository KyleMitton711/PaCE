export function replaceInvalidCharacters(string) {
  let specialCharacters = [`â€“`, `â€™`];
  let normalCharacters = [`-`, `'`];
  let regEx;
  // Loop the array of special and normal characters
  for (let x = 0; x < specialCharacters.length; x++) {
    regEx = new RegExp(specialCharacters[x], "g");
    string = string.replace(regEx, normalCharacters[x]);
  }
  return string;
}

export function cleanHTML(input) {
  // let output = input

  // 1. remove line breaks / Mso classes
  // const stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g
  const stringStripper = /(class=(")?Mso[a-zA-Z]+(")?)/g;
  let output = input.replace(stringStripper, " ");
  // 2. strip Word generated HTML comments
  const commentSripper = new RegExp("<!--(.*?)-->", "g");
  output = output.replace(commentSripper, "");
  let tagStripper = new RegExp(
    "<(/)*(meta|link|span|b|\\?xml:|st1:|o:|font)(.*?)>",
    "gi"
  );
  // 3. remove tags leave content if any
  output = output.replace(tagStripper, "");
  // 4. Remove everything in between and including tags '<style(.)style(.)>'
  const badTags = [
    "style",
    "script",
    "applet",
    "embed",
    "noframes",
    "noscript"
  ];

  for (let i = 0; i < badTags.length; i++) {
    tagStripper = new RegExp(
      "<" + badTags[i] + ".*?" + badTags[i] + "(.*?)>",
      "gi"
    );
    output = output.replace(tagStripper, "");
  }
  // 5. remove attributes ' style="..."'
  const badAttributes = ["style", "start"];
  for (let i = 0; i < badAttributes.length; i++) {
    let attributeStripper = new RegExp(
      " " + badAttributes[i] + '="(.*?)"',
      "gi"
    );
    output = output.replace(attributeStripper, "");
  }
  return output;
}
