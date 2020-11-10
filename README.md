# Salesforce App - Conversation Toolkit API Helper

This project provides a library of custom components to allow automation of agent experiences off of Voice Calls, as well as Chat and Messaging Conversations in Salesforce

## Component List
- ConversationToolkitBaseComponent
This is a template component which listens to events from Voice call, Chat, and Messaging sessions, to fire a dummy method. You can use this as a template for building new components by adding in your own method to run when the customer says something.
- ConversationToolkitNextBestAction
This is a component (to be added to Voice Call, Chat Transcript, or Messaging Session page layouts) which listens for keywords/phrases in the transcript and fires an event updating Next Best Action when it detects them.
Keyword to Recommendation mapping is done in a custom object called ConversationHelper
- ConversationToolkitToggle
This is a sample component for a screen flow, which automatically switches on/off a toggle button on the screen when keywords/phrases are detected.
This is also a good template for building other sample screen flow input field components
- ConversationToolkitEinsteinLanguage
This is a component which listens to a transcript and detects Intent/Sentiment. The results are saved to a related custom object called Einstein Insights


License: https://github.com/nasalesforcegithub/conversation-toolkit-helper/blob/master/LICENSE
