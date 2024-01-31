import json
from pathlib import Path
from dotenv import load_dotenv
from llama_index.llms import Gemini
from llama_index import download_loader, ServiceContext, SimpleDirectoryReader, VectorStoreIndex
from llama_index.tools import QueryEngineTool, ToolMetadata
from llama_index.agent import ReActAgent
from llama_hub.tools.wikipedia import WikipediaToolSpec
# pip install langchain
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
WikipediaReader = download_loader("WikipediaReader")
loader = WikipediaReader()
wiki_spec = WikipediaToolSpec()
tool = wiki_spec.to_tool_list()[1]

class Character:
    def __init__(self, user_prompt):
        # create character based on user prompt
        self.name = None  # Information about the character
        self.personality = None
        self.language_style = None
        self.original_character = False  # If the character is an original character
        self.llm = Gemini(model='gemini-pro', safety_settings=[
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_NONE",
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_NONE",
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_NONE",
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_NONE",
            }
            ]
        )
        self.personal_background = None
        self.generate_description_from_user(user_prompt)
        self.agent = self.create_agent(user_prompt)

    def chat(self, user_prompt: str) -> str:
        """Gives the character a prompt and returns the response"""
        return str(self.agent.chat(user_prompt))

    def generate_description_from_user(self, user_prompt: str) -> None:
        """Generates a character description based on the user's prompt, and creates a file storing that information"""
        # self.information = llama_index.get_character_info(user)
        prompt = f"Based on the description, ***{user_prompt}***, does this description uniquely match a known character from games, novels, movies, or other media? Only Answer 'yes' if you are certain the description matches a unique known character. Otherwise, answer 'no'."
        is_original_character = self.llm.complete(prompt).text
        print("check original character", is_original_character)
        if is_original_character == "yes":
            is_original_character = False
        else:
            is_original_character = True
        self.original_character = is_original_character
        if is_original_character:
            name_prompt = (f"Based on the user's prompt: {user_prompt}, generate a suitable name for the character."
                           f"Only provide one answer The name of the character is:")
        else:
            name_prompt = (f"Based on the user's prompt: {user_prompt},"
                           f"figure out who the character is."
                           f"Only provide one answer. The name of the character in the prompt is:")
        self.name = self.llm.complete(name_prompt).text
        print("check name", self.name)
        if not Path(f'Characters').exists():
            Path(f'Characters').mkdir()
        if Path(f'Characters/{self.name}.json').exists():
            with open(f'Characters/{self.name}.json', 'r') as f:
                data = json.load(f)
                self.personality = data["personality"]
                self.personal_background = data["personal_background"]
                self.language_style = data["language_style"]
                self.original_character = False
                return
        # print("check name", self.name)
        if is_original_character:
            personality_prompt = (f"Based on the user's prompt: {user_prompt},"
                                  f" describe personality traits that fit the provided information."
                                  f"Only provide descriptive terms."
                                  f"The character's personality is:")
            self.personality = self.llm.complete(personality_prompt).text
            background_prompt = (f"Based on the user's prompt: {user_prompt}, "
                                 f"and the character's personality{self.personality},"
                                 f"Detail the character, {self.name}'s background, including their upbringing,"
                                 f"life experiences, and any pivotal moments that shape their identity."
                                 "provide a rigorous description of 1000 words. The character's background is:")
            self.personal_background = self.llm.complete(background_prompt).text
            language_style_prompt = (f"Based on the user's prompt: {user_prompt},"
                                     f" and the character's personality{self.personality},"
                                     f" develop a language style that reflects the character's personality."
                                     "describe the style in concise terms."
                                     "The character's style is: ")
            self.language_style = self.llm.complete(language_style_prompt).text
        else:
            self.personality = self.llm.complete(f"to the best of your knowledge describe{self.name}'s personality"
                                                 "Only provide descriptive terms."
                                                 "The character's personality is:").text
            # background_prompt = (f"Give me a full description of {self.name}'s background, do not spare any
            # details" "provide a rigorous description of at least 500 words. The character's background is:")
            # self.personal_background = self.llm.complete(background_prompt).text
            print("check wiki search", [self.name])




            #TODO fix wiki loader error
            documents = loader.load_data(pages=[self.name])
            print("found wiki", documents)
            self.personal_background = documents[0].text
            self.language_style = self.llm.complete(f"describe {self.name}'s language style in concise terms."
                                                    "The character's style is:").text

        print(is_original_character, self.name, self.personality, self.personal_background, self.language_style)
        with open(f'Characters/{self.name}.txt', 'w') as f:
            f.write(self.personal_background)
        with open(f'Characters/{self.name}.json', 'w') as f:
            json.dump({"name": self.name, "personality": self.personality,
                       "personal_background": self.personal_background,
                       "language_style": self.language_style}, f)

    def create_agent(self, user_prompt: str):
        """Creates an agent representing the character, and returns it"""
        # character = character.Character()
        # self.generate_description_from_user(input("Enter a prompt for the character: "))
        documents = SimpleDirectoryReader(
            input_files=[f"Characters/{self.name}.txt"]
        ).load_data()
        
        embed_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        
        service_context = ServiceContext.from_defaults(embed_model=embed_model, llm=self.llm)
        index = VectorStoreIndex.from_documents(documents, service_context=service_context)
        query_engine = index.as_query_engine()
        # response = query_engine.query("Who is Paul Graham.")
        query_engine_tools = [
            QueryEngineTool(
                query_engine=query_engine,
                metadata=ToolMetadata(
                    name="character_info",
                    description=(
                        "Get information about a character"
                    )
                )
            )
        ]
        # if not self.original_character:
        #     query_engine_tools = query_engine_tools + (
        #         LoadAndSearchToolSpec.from_defaults(tool).to_tool_list()
        #     )
        context = (f"You are role-playing as {self.name}."
                   f"Your personality is {self.personality}."
                   f"You should speak in the style of {self.language_style}."
                   f"Always speak in first person, and refer to yourself as {self.name}.")
        return ReActAgent.from_tools(query_engine_tools, llm=self.llm, verbose=True, context=context)


if __name__ == "__main__":
    character = Character(input("Enter a prompt: "))
    q = input("Enter your words: ")
    while q != "quit":
        print(character.chat(q))
        q = input("Enter your words: ")