const h1 = (text) => `# ${text}\n`;
const h2 = (text) => `## ${text}\n`;
const h3 = (text) => `### ${text}\n`;
const h4 = (text) => `#### ${text}\n`;
const h5 = (text) => `##### ${text}\n`;
const p = (text) => `${text}\n\n`;
const b = (text) => `__${text}__`;
const i = (text) => `_${text}_`;
const dl = (entries) => `<dl>${entries.map(entry => `<dt>${entry.t}</dt><dd>${entry.d}</dd>`).join("\n")}</dl>\n`;

const codeBlockStart = language => `\`\`\`${language}\n`;
const codeBlockEnd = () => "\n```\n";

module.exports = {
  h1, h2, h3, h4, h5,
  p, i, b, dl,
  codeBlockStart, codeBlockEnd
}