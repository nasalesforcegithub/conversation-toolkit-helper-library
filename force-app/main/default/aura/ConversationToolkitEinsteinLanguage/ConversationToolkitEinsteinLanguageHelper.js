({
    subscribeToVoiceToolkit: function(cmp) {
        cmp._telephonyEventListener = $A.getCallback(this.telephonyEventListener.bind(this, cmp));
        cmp.find('voiceToolkitApi').addTelephonyEventListener('CALL_ENDED', cmp._telephonyEventListener);      

        cmp._conversationEventListener = $A.getCallback(this.voiceConversationEventListener.bind(this, cmp));
        cmp.find('voiceToolkitApi').addConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },
    
    unsubscribeFromVoiceToolkit: function(cmp) {
        cmp.find('voiceToolkitApi').removeTelephonyEventListener('CALL_ENDED', cmp._telephonyEventListener);
        cmp.find('voiceToolkitApi').removeConversationEventListener('TRANSCRIPT', cmp._conversationEventListener);
    },
    
    // Voice Transcripts (Customer and Agent)
    voiceConversationEventListener: function(cmp, transcript) {
        var transcriptText = transcript.detail.content.text;
        var speaker = transcript.detail.sender.role;            
        var recordId = cmp.get("v.recordId");
        //Confirm that the component is on a Voice Call Record page
        if (recordId.startsWith("0LQ")){
            this.generateEinsteinInsights(cmp, transcriptText, 'Chat', chatRecordId);
        }
    },
    // Chat/Messaging Transcripts (Customer and Agent)
    chatConversationEventListener: function(cmp, evt, speaker) {
        var transcriptText = evt.getParam('content');
        var recordId = cmp.get("v.recordId");
        var chatRecordId = evt.getParam("recordId");       
        //Confirm that the Event came from the Chat that the component is on
        if (recordId.includes(chatRecordId)){
            this.generateEinsteinInsights(cmp, transcriptText, 'Chat', chatRecordId);
        }
    },

    // Voice events (Hold, End Call, etc.)
    telephonyEventListener: function(cmp, evt){
        var recordId = cmp.get("v.recordId");
        this.updateEinsteinInsights(cmp, 'Voice', recordId);
    },
    
    // Chat events (End chat, etc.)
    chatEventListener: function(cmp, evt){
        var recordId = cmp.get("v.recordId");
        this.updateEinsteinInsights(cmp, 'Chat', recordId);        
    },

    
    // Example function for invoking Next Best Action
    invokeNBA: function(cmp, transcriptText) {
        var transcriptVariable = {ConversationKey: transcriptText};
        cmp.find('voiceToolkitApi').updateNextBestActions(cmp.get('v.recordId'), transcriptVariable);
    },

    generateEinsteinInsights: function(cmp, transcriptText, channelType, recordId){     	
        var action = cmp.get("c.generateEinsteinInsights");
        var aggregatedSentiment = cmp.get("v.aggregatedSentiment");
        console.log('Invoking Einstein Sentiment with values' + transcriptText + channelType + recordId + aggregatedSentiment);
        action.setParams({ transcriptText : transcriptText, channelType : channelType, recordId : recordId, aggregatedSentiment : aggregatedSentiment });        
        action.setCallback(this, function(res){
            let state = res.getState();
            let retVal = res.getReturnValue();
            console.log('State off action is ' + state);
            if(state === 'SUCCESS'){
                if(retVal){
                    cmp.set('v.aggregatedSentiment', retVal);
                    console.log('retVal of action is ' + retVal);
                }
            }            
        })
        
        $A.enqueueAction(action);
    },
    
    updateEinsteinInsights: function(cmp, channelType, recordId){
        var action = cmp.get("c.updateEinsteinInsightsOnCompletion");
        action.setParams({channelType : channelType, recordId : recordId });        
        action.setCallback(this, function(res){
            let state = res.getState();
            let retVal = res.getReturnValue();
            console.log('State off action is ' + state);           
        })        
        $A.enqueueAction(action);
    }
})