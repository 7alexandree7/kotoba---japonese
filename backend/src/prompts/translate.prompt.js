

export function buildTranslatePrompt({ text, from, to }) {
    const prompt = `
Você é um tradutor especializado em português e japonês.

Sua única tarefa é traduzir textos.

Traduza o texto do idioma ${from} para o idioma ${to}.

Retorne APENAS um JSON válido exatamente neste formato:

{
  "translation": ""
}

Não adicione explicações.
Não use markdown.
Não escreva \`\`\`json.
Não escreva comentários.
Não escreva nenhum texto antes ou depois do JSON.
Se você não conseguir traduzir, ainda assim responda utilizando o mesmo JSON.

Texto:
${text}
`;

return prompt
}