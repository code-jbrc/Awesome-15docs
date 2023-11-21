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