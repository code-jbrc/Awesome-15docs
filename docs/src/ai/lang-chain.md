---
title: LangChain 学习
---

## Demo（向量搜索）

```ts
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { HuggingFaceTransformersEmbeddings } from 'langchain/embeddings/hf_transformers'
import { env } from '@xenova/transformers'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'

env.localModelPath = 'src/models';

(async function () {
  const loader = new DirectoryLoader('E:/myself/new-project--------------------t/langchain/text', {
    '.txt': path => new TextLoader(path),
  })

  const docs = await loader.load()

  const textSplitter = new CharacterTextSplitter({ chunkSize: 10, chunkOverlap: 0, separator: '\r\n' })

  const splitDocs = await textSplitter.splitDocuments(docs)
  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: 'shibing624/text2vec-base-chinese',
  })

  const docSearch = await MemoryVectorStore.fromDocuments(splitDocs, embeddings)

  const resultOne = await docSearch.similaritySearch('你好', 1)
  console.log(resultOne)
}())

```

## 格式化输出

```ts
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    cmd: z.string().describe('the command need to run'),
    description: z.string().describe('explain the purpose of this cmd'),
    execute: z.boolean().default(true),
  }),
)
parser.getFormatInstructions()
```

输出：

You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.   

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
```json
{"type":"object","properties":{"cmd":{"type":"string","description":"the command need to run"},"description":{"type":"string","description":"explain the purpose of this cmd"},"execute":{"type":"boolean","default":true}},"required":["cmd","description"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}
```

## promptTemplate

```ts
new PromptTemplate({
  template: 'I want you to act as a terminal, analyze the question I pose, and format your response as a JSON object.\n\nMy question:\n{question}.\n\nOutput format:\n{parse}',
  inputVariables: ['question', 'parse'],
}).format({
  parse: parser.getFormatInstructions(),
  question: '查看全部分支',
})
```

输出：

I want you to act as a terminal, analyze the question I pose, and format your response as a JSON object.

My question:
查看全部分支.

Output format: 上面的格式化输出
