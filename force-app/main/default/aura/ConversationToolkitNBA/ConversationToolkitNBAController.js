({
    doInit: function(cmp, event, helper) {
        helper.loadHelperData(cmp, helper);
    },
    
    // Voice Transcripts (Customer and Agent)
    onVoiceTranscript: function(cmp, transcript, helper) { 
        if (transcript) {
            try {
                var transcriptText = transcript.getParams().content.staticContent.text;
                var speaker = transcript.getParams().sender.role;
                var recordId = cmp.get("v.recordId");
                //Confirm that the component is on a Voice Call Record page
                if (recordId.startsWith("0LQ")){
                    helper.checkHelperList(cmp, helper, transcriptText, speaker);
                }
            } catch(error) {
            }
        }
    },
    
    // Chat Transcript Customer
    onChatTranscriptCustomer: function(cmp, evt, helper){
        var transcriptText = evt.getParam('content');
        var recordId = cmp.get("v.recordId");        
        var chatRecordId = evt.getParam("recordId");
        //Confirm that the Event came from the Chat that the component is on
        if (recordId.includes(chatRecordId)){
            helper.checkHelperList(cmp, helper, transcriptText, 'EndUser');            
        }
    },
    
    // Chat Transcript Agent
    onChatTranscriptAgent: function(cmp, evt, helper){
        var transcriptText = evt.getParam('content');
        var recordId = cmp.get("v.recordId");
        var chatRecordId = evt.getParam("recordId");       
        //Confirm that the Event came from the Chat that the component is on
        if (recordId.includes(chatRecordId)){
            helper.checkHelperList(cmp, helper, transcriptText, 'Agent');        
        }
    }
})