({
    invokeNBA: function(cmp, transcriptText) {
        var transcriptVariable = {ConversationKey: transcriptText};
        cmp.find('nbaRefresh').publish({ messageBody: transcriptVariable });
    },
    
    loadHelperData: function(cmp, helper) {
        var action = cmp.get("c.getConversationHelperList");
        action.setCallback(this, function(res){
            let state = res.getState();
            let retVal = res.getReturnValue();
            
            if(state === 'SUCCESS'){
                if(retVal){
                    cmp.set('v.helperList', retVal);
                }
            }            
        })
        
        $A.enqueueAction(action);
    },
    
    checkHelperList: function(cmp, helper, transcriptText, speaker){
        var helperList = cmp.get("v.helperList");
        for (var i=0; i < helperList.length; i++){
            var helperItem = helperList[i];            
            var transcriptLower = transcriptText.toLowerCase();
            var helperItemLower = helperItem.Value__c.toLowerCase();            
            if (transcriptLower.includes(helperItemLower)){
                if ((speaker == 'EndUser' && helperItem.Customer__c == true) || (speaker == 'Agent' && helperItem.Agent__c == true)){
                    helper.invokeNBA(cmp, helperItem.Recommended_Action__c);
                    break;
                }               
            }
        }
    }
})