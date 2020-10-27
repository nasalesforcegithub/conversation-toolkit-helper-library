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
        if (transcript) {
            try {
                //OG Version of TranscriptText and Speaker from this component
                var transcriptText = transcript.detail.content.text;
                var speaker = transcript.detail.sender.role;
                var recordId = cmp.get("v.recordId");
                //if (recordId.startsWith("0LQ")){       
                    this.checkToggle(cmp, transcriptText, speaker);                
                //}
            } catch(error) {
                console.log('Error getting transcript text. ' + error);
            }
        }       
    },
    
    // Chat/Messaging Transcripts (Customer and Agent)
    chatConversationEventListener: function(cmp, evt, speaker) {
        var transcriptText = evt.getParam('content');
        //var recordId = cmp.get("v.recordId");
        var chatRecordId = evt.getParam("recordId");       
        //Confirm that the Event came from the Chat that the component is on
        //if (recordId.includes(chatRecordId)){
            this.checkToggle(cmp, transcriptText, speaker);                
        //}
    },
    
    checkToggle: function(cmp, transcriptText, speaker) {
        var activeKeyword = cmp.get("v.activeKeyword");
        var inactiveKeyword = cmp.get("v.inactiveKeyword");
        var toggleValue = cmp.get("v.toggleValue");
        if (speaker=='EndUser'){
            if (transcriptText.toLowerCase().includes(activeKeyword.toLowerCase())){
                //var checkCmp = cmp.find("chkbox");
                //checkCmp.set("v.value",true);
                cmp.set("v.toggleValue", true);
                var elements = document.getElementsByClassName("VoiceDetectedAlert");
                elements[0].style.display = 'block';                            
            } else if (transcriptText.toLowerCase().includes(inactiveKeyword.toLowerCase())){
                //var checkCmp = cmp.find("chkbox");
                //checkCmp.set("v.value",false);
                cmp.set("v.toggleValue", false);                        
                var elements = document.getElementsByClassName("VoiceDetectedAlert");
                elements[0].style.display = 'block';    
            }
        }   
    }    
})