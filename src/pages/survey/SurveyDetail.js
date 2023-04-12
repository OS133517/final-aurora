import { useParams } from "react-router";


function SurveyDetail() {

    const {surveyCode} = useParams();

    return (
        <>
            <iframe 
                style={{width:'100%', border:'none'}}
                src={`http://localhost:5601/app/dashboards#/view/4fea4bb0-d8f7-11ed-9720-fd4523f2c15f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:10000),time:(from:now%2Fw,to:now))&_a=(description:test,filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!t,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'5cf014c0-d8ed-11ed-9720-fd4523f2c15f',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'5cf014c0-d8ed-11ed-9720-fd4523f2c15f',name:indexpattern-datasource-layer-bdd6a246-2d03-4cef-9859-fe71d0c5b6e3,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:(bdd6a246-2d03-4cef-9859-fe71d0c5b6e3:(columnOrder:!('6b2a624d-049d-41d9-813b-92cdb6704636',ee0779cf-8610-42a4-a33d-fbea915b45ff),columns:('6b2a624d-049d-41d9-813b-92cdb6704636':(dataType:string,isBucketed:!t,label:'Top%20values%20of%20answer_body.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:ee0779cf-8610-42a4-a33d-fbea915b45ff,type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:answer_body.keyword),ee0779cf-8610-42a4-a33d-fbea915b45ff:(dataType:number,isBucketed:!f,label:'Unique%20count%20of%20dept_code.keyword',operationType:unique_count,scale:ratio,sourceField:dept_code.keyword)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((accessors:!(ee0779cf-8610-42a4-a33d-fbea915b45ff),layerId:bdd6a246-2d03-4cef-9859-fe71d0c5b6e3,layerType:data,position:top,seriesType:bar_stacked,showGridlines:!f,xAccessor:'6b2a624d-049d-41d9-813b-92cdb6704636')),legend:(isVisible:!t,position:right),preferredSeriesType:bar_stacked,title:'Empty%20XY%20chart',valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:()),gridData:(h:15,i:'7b6d273b-f899-49b8-a6ec-4c282d07c228',w:24,x:0,y:0),panelIndex:'7b6d273b-f899-49b8-a6ec-4c282d07c228',type:lens,version:'7.17.5')),query:(language:kuery,query:'survey_code%20:%20${surveyCode}'),tags:!('4c8fd610-d8f7-11ed-9720-fd4523f2c15f'),timeRestore:!t,title:test,viewMode:edit)`} height="600" width="800"></iframe>
        </>
    );
}

export default SurveyDetail;