({
    doInit: function(cmp, event, helper) {
        helper.subscribeToVoiceToolkit(cmp);
    },
    
    onDestroy: function(cmp, event, helper) {
        helper.unsubscribeFromVoiceToolkit(cmp);
    },
    
    // Chat Transcript Customer
    onChatTranscriptCustomer: function(cmp, evt, helper){
        helper.chatConversationEventListener(cmp, evt, 'EndUser');        
    },
    
    // Chat Transcript Agent
    onChatTranscriptAgent: function(cmp, evt, helper){
        helper.chatConversationEventListener(cmp, evt,'Agent');
    },

    // Chat Ended Event
    onChatEnded: function(cmp, evt, helper){
        helper.chatEventListener(cmp, evt);
    }    
    
})