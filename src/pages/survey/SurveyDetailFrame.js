

function SurveyDetailFrame({surveyCode, convertedNos}) {

    return (
        <>
        {/* <iframe src={`http://localhost:5601/app/dashboards#/view/df6444a0-dacb-11ed-9fd0-c5829ff6b554?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:df,filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:a0ff2c80-daca-11ed-9fd0-c5829ff6b554,name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:a0ff2c80-daca-11ed-9fd0-c5829ff6b554,name:indexpattern-datasource-layer-77b89b4b-fc67-4c65-bf10-b41ee29e23a9,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('77b89b4b-fc67-4c65-bf10-b41ee29e23a9':(columnOrder:!('76b8a781-708d-47f6-b1ee-9fd069a5d8e6','03454d52-6f1a-434c-b9d8-75c274007810'),columns:('03454d52-6f1a-434c-b9d8-75c274007810':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records),'76b8a781-708d-47f6-b1ee-9fd069a5d8e6':(dataType:string,isBucketed:!t,label:'Top%20values%20of%20answer_body.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'03454d52-6f1a-434c-b9d8-75c274007810',type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:answer_body.keyword)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:'survey_code : ${surveyCode}'),visualization:(layers:!((categoryDisplay:default,groups:!('76b8a781-708d-47f6-b1ee-9fd069a5d8e6'),layerId:'77b89b4b-fc67-4c65-bf10-b41ee29e23a9',layerType:data,legendDisplay:show,metric:'03454d52-6f1a-434c-b9d8-75c274007810',nestedLegend:!f,numberDisplay:percent)),shape:pie)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:dc7e8479-3ed0-4de5-8322-233d941a772b,w:24,x:0,y:0),panelIndex:dc7e8479-3ed0-4de5-8322-233d941a772b,type:lens,version:'7.17.5')),query:(language:kuery,query:'survey_code : ${surveyCode} and (question_no : '),tags:!(),timeRestore:!f,title:fdf,viewMode:view)&hide-filter-bar=true`} height="600" width="800"></iframe> */}
        {/* <iframe src={`http://localhost:5601/app/dashboards#/view/df6444a0-dacb-11ed-9fd0-c5829ff6b554?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:df,filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:a0ff2c80-daca-11ed-9fd0-c5829ff6b554,name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:a0ff2c80-daca-11ed-9fd0-c5829ff6b554,name:indexpattern-datasource-layer-77b89b4b-fc67-4c65-bf10-b41ee29e23a9,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('77b89b4b-fc67-4c65-bf10-b41ee29e23a9':(columnOrder:!('76b8a781-708d-47f6-b1ee-9fd069a5d8e6','03454d52-6f1a-434c-b9d8-75c274007810'),columns:('03454d52-6f1a-434c-b9d8-75c274007810':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records),'76b8a781-708d-47f6-b1ee-9fd069a5d8e6':(dataType:string,isBucketed:!t,label:'Top%20values%20of%20answer_body.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'03454d52-6f1a-434c-b9d8-75c274007810',type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:answer_body.keyword)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!('76b8a781-708d-47f6-b1ee-9fd069a5d8e6'),layerId:'77b89b4b-fc67-4c65-bf10-b41ee29e23a9',layerType:data,legendDisplay:show,metric:'03454d52-6f1a-434c-b9d8-75c274007810',nestedLegend:!f,numberDisplay:percent)),shape:pie)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:dc7e8479-3ed0-4de5-8322-233d941a772b,w:24,x:0,y:0),panelIndex:dc7e8479-3ed0-4de5-8322-233d941a772b,type:lens,version:'7.17.5')),query:(language:kuery,query:'survey_code : ${surveyCode} ${convertedNos}'),tags:!(),timeRestore:!f,title:fdf,viewMode:view)&hide-filter-bar=true`} height="600" width="800"></iframe> */}
        </>
    )
}

export default SurveyDetailFrame;