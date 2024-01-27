import llama_index
from llama_index.llms import Gemini
from dotenv import load_dotenv
import llama_hub
from llama_index import download_loader
import json

WikipediaReader = download_loader("WikipediaReader")
loader = WikipediaReader()
load_dotenv()

class Character:
    def __init__(self):
        # Information about the character
        self.name = None  # Information about the character
        self.personality = None
        self.language_style = None
        self.original_character = False  # If the character is an original character
        self.llm = Gemini(model='gemini-pro')
        self.personal_background = None
        # self.generate_description_from_user(user_prompt)

    def generate_description_from_user(self, user_prompt):
        # self.information = llama_index.get_character_info(user)
        prompt = (
            f"Based on the following description, {user_prompt}, does this character uniquely match a known character from games, novels, movies, or other media? Consider aspects like distinct physical features, unique abilities, specific backstory elements, and any other notable characteristics that are not commonly shared with other characters. Only answer 'yes' if you are certain the description matches a known character with these unique attributes. Otherwise, answer 'no'.")
        is_original_character = self.llm.complete(prompt).text
        print("check original character", is_original_character)
        if is_original_character == "yes":
            is_original_character = False
        else:
            is_original_character = True
        if is_original_character:
            name_prompt = (f"Based on the user's prompt: {user_prompt}, generate a suitable name for the character."
                           f"Only provide one answer The name of the character is:")
        else:
            name_prompt = (f"Based on the user's prompt: {user_prompt},"
                           f"figure out who the character is."
                           f"Only provide one answer. The name of the character in the prompt is:")
        self.name = self.llm.complete(name_prompt).text
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
            # background_prompt = (f"Give me a full description of {self.name}'s background, do not spare any details"
            #                      "provide a rigorous description of at least 500 words. The character's background is:")
            # self.personal_background = self.llm.complete(background_prompt).text

            documents = loader.load_data(pages=['star lord'])
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


if __name__ == "__main__":
    character = Character()
    character.generate_description_from_user(input("Enter a prompt: "))
