import character
c = character.Character(input("Enter a prompt: "))
q = input("Enter your words: ")
while q != "quit":
    print(character.chat(q))
    q = input("Enter your words: ")
from pathlib import Path
# from llama_index import download_loader
# from llama_index import ServiceContext
# from llama_index import (
#     SimpleDirectoryReader,
#     VectorStoreIndex,
#     StorageContext,
#     load_index_from_storage,
# )
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
#
# embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
# from llama_index.tools import QueryEngineTool, ToolMetadata
# from llama_index.agent import ReActAgent

# JSONReader = download_loader("JSONReader")
#
# loader = JSONReader()


# documents = loader.load_data(Path('./data.json'))
class Chat:
    pass


if __name__ == "__main__":
    character = character.Character()
    # character.generate_description_from_user(input("Enter a prompt for the character: "))
    # documents = SimpleDirectoryReader(
    #     input_files=[f"Characters/{character.name}.txt"]
    # ).load_data()
    # embed_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    # service_context = ServiceContext.from_defaults(embed_model=embed_model, llm=character.llm)
    #
    # index = VectorStoreIndex.from_documents(documents, service_context=service_context)
    #
    # query_engine = index.as_query_engine()
    # response = query_engine.query("Who is Paul Graham.")
    # query_engine_tools = [
    #     QueryEngineTool(
    #         query_engine=query_engine,
    #         metadata=ToolMetadata(
    #             name="character_info",
    #             description=(
    #                 "Get information about a character"
    #             )
    #         )
    #     )
    # ]
    # context = (f"You are roleplaying as {character.name}."
    #            f"Your personality is {character.personality}."
    #            f"You should speak in the style of {character.language_style}.")
    #
    # agent = ReActAgent.from_tools(query_engine_tools, llm=character.llm, verbose=True, context=context)
    # while True:
    #     response = agent.chat(input("Enter your words: "))
    #     print(response)
