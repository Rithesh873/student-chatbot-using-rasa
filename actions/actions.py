# actions.py
from rasa_sdk import Action
from rasa_sdk.executor import CollectingDispatcher

class ActionSraapLogin(Action):
    def name(self) -> str:
        return "sraap_login"

    def run(self, dispatcher, tracker, domain):
        # Implement the logic for the sraap login action
        dispatcher.utter_message(text="You have been logged into SRAAP successfully!")
        return []

class ActionKiranInfo(Action):
    def name(self) -> str:
        return "kiran_info"

    def run(self, dispatcher, tracker, domain):
        # Implement the logic for fetching Kiran info
        dispatcher.utter_message(text="Information about Kiran sir...")
        return []
