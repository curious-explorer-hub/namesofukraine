// JSON for embedding in a <script> block (data or JSON-LD). Escaping "<" means text such as
// "</script>" in content can never close the block early; JSON parsers read < back as "<".
export const jsonForScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
