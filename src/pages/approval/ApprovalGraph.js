import { decodeJwt } from "../../utils/tokenUtils";

const ApprovalGraph = () => {

    const loginMember = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberCode = loginMember.memberCode;
    console.log('memberCode', memberCode);

    return (
        <div>
            <h3>통계 그래프</h3>
            <div >
                <iframe src={`http://localhost:5602/app/dashboards#/view/3d9dde30-da92-11ed-810d-538b174919cc?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,syncTooltips:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'3805da0a-f0e4-419f-b9ea-72adfd26bb86',name:indexpattern-datasource-layer-749d344d-a842-4f07-8071-91691300c9fe,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('749d344d-a842-4f07-8071-91691300c9fe':(columnOrder:!('28bb07c0-fadb-4ffc-ba61-029b470a70c6','5beb3993-8657-40e2-a4e1-b1999a006cb0','5beb3993-8657-40e2-a4e1-b1999a006cb0X0'),columns:('28bb07c0-fadb-4ffc-ba61-029b470a70c6':(customLabel:!t,dataType:date,isBucketed:!t,label:'%EA%B2%B0%EC%9E%AC%20%EC%83%9D%EC%84%B1%EC%9D%BC',operationType:date_histogram,params:(dropPartials:!f,ignoreTimeRange:!f,includeEmptyRows:!f,interval:d),scale:interval,sourceField:app_date),'5beb3993-8657-40e2-a4e1-b1999a006cb0':(customLabel:!t,dataType:number,isBucketed:!f,label:'%EA%B2%B0%EC%9E%AC%EC%84%9C%EB%A5%98%20%EA%B0%AF%EC%88%98',operationType:formula,params:(formula:'count()',isFormulaBroken:!f),references:!('5beb3993-8657-40e2-a4e1-b1999a006cb0X0'),scale:ratio),'5beb3993-8657-40e2-a4e1-b1999a006cb0X0':(customLabel:!t,dataType:number,isBucketed:!f,label:'Part%20of%20%EA%B2%B0%EC%9E%AC%EC%84%9C%EB%A5%98%20%EA%B0%AF%EC%88%98',operationType:count,params:(emptyAsNull:!f),scale:ratio,sourceField:___records___)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('5beb3993-8657-40e2-a4e1-b1999a006cb0'),layerId:'749d344d-a842-4f07-8071-91691300c9fe',layerType:data,position:top,seriesType:bar_stacked,showGridlines:!f,xAccessor:'28bb07c0-fadb-4ffc-ba61-029b470a70c6')),legend:(isVisible:!t,position:right),preferredSeriesType:bar_stacked,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide)),title:'',type:lens,visualizationType:lnsXY),enhancements:()),gridData:(h:15,i:bf2af7d7-af9d-406a-aa07-49b955dcdd64,w:24,x:0,y:0),panelIndex:bf2af7d7-af9d-406a-aa07-49b955dcdd64,type:lens,version:'8.4.2'),(embeddableConfig:(attributes:(references:!((id:'3805da0a-f0e4-419f-b9ea-72adfd26bb86',name:indexpattern-datasource-layer-859bcebd-dcde-46dd-b04a-3e1ef2d2ead5,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('859bcebd-dcde-46dd-b04a-3e1ef2d2ead5':(columnOrder:!(b5f49564-b3e5-4520-a520-c0490cb95f2c,ab77dce9-6504-4062-bd1e-51849ea96b0e),columns:(ab77dce9-6504-4062-bd1e-51849ea96b0e:(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,params:(emptyAsNull:!t),scale:ratio,sourceField:___records___),b5f49564-b3e5-4520-a520-c0490cb95f2c:(dataType:string,isBucketed:!t,label:'Top%205%20values%20of%20doc_name.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:ab77dce9-6504-4062-bd1e-51849ea96b0e,type:column),orderDirection:desc,otherBucket:!t,parentFormat:(id:terms),size:5),scale:ordinal,sourceField:doc_name.keyword)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!(b5f49564-b3e5-4520-a520-c0490cb95f2c),layerId:'859bcebd-dcde-46dd-b04a-3e1ef2d2ead5',layerType:data,legendDisplay:default,metric:ab77dce9-6504-4062-bd1e-51849ea96b0e,nestedLegend:!f,numberDisplay:percent)),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:'2cfa9c5e-1af8-47d0-9431-fc955888394a',w:24,x:24,y:0),panelIndex:'2cfa9c5e-1af8-47d0-9431-fc955888394a',type:lens,version:'8.4.2')),query:(language:kuery,query:'member_code:${memberCode}'),tags:!(),timeRestore:!f,title:approval,viewMode:view)&hide-filter-bar=true`} height="600" width="1000"></iframe>
            </div>
        </div >

    )
}

export default ApprovalGraph;