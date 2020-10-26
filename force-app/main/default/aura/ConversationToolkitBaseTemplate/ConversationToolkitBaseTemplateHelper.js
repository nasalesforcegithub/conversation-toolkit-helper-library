({
    subscribeToVoiceToolkit: function(cmp) { 
        cmp._conversationEventListener = $A.getCallback(this.voiceConversationEventListener.bind(this, cmp));
        cmp.find('voiceToolkitApi').addConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },
    
    unsubscribeFromVoiceToolkit: function(cmp) {
        cmp.find('voiceToolkitApi').removeConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },
    
    // Voice Transcripts (Customer and Agent)
    voiceConversationEventListener: function(cmp, transcript) {
        var transcriptText = transcript.detail.content.text;
        var speaker = transcript.detail.sender.role;            
        var recordId = cmp.get("v.recordId");
        //Confirm that the component is on a Voice Call Record page
        if (recordId.startsWith("0LQ")){
            this.runCustomFuntion(cmp, transcriptText, speaker);
        }
    },
    // Chat/Messaging Transcripts (Customer and Agent)
    chatConversationEventListener: function(cmp, evt, speaker) {
        var transcriptText = evt.getParam('content');
        var recordId = cmp.get("v.recordId");
        var chatRecordId = evt.getParam("recordId");       
        //Confirm that the Event came from the Chat that the component is on
        if (recordId.includes(chatRecordId)){
            this.runCustomFuntion(cmp, transcriptText, speaker);        
        }
    },
    
    // Example function for invoking Next Best Action
    invokeNBA: function(cmp, transcriptText) {
        var transcriptVariable = {ConversationKey: transcriptText};
        cmp.find('voiceToolkitApi').updateNextBestActions(cmp.get('v.recordId'), transcriptVariable);
    },

    // Example placeholder function invoked when a Voice or Chat/Message event is received
    runCustomFuntion: function(cmp, transcriptText, speaker){
        ////////////////////////////
        //INSERT CUSTOMER LOGIC HERE
        ////////////////////////////
    }
})