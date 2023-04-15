import { decodeJwt } from "../../utils/tokenUtils";

const ApprovalGraph = () => {

    const loginMember = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberCode = loginMember.memberCode;
    console.log('memberCode', memberCode);

    return (
        <>
            <iframe title="Approval Graph" src={`http://localhost:5602/app/dashboards#/view/3d9dde30-da92-11ed-810d-538b174919cc?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,syncTooltips:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'3805da0a-f0e4-419f-b9ea-72adfd26bb86',name:indexpattern-datasource-layer-749d344d-a842-4f07-8071-91691300c9fe,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('749d344d-a842-4f07-8071-91691300c9fe':(columnOrder:!('28bb07c0-fadb-4ffc-ba61-029b470a70c6','5beb3993-8657-40e2-a4e1-b1999a006cb0','5beb3993-8657-40e2-a4e1-b1999a006cb0X0'),columns:('28bb07c0-fadb-4ffc-ba61-029b470a70c6':(customLabel:!t,dataType:date,isBucketed:!t,label:'%EA%B2%B0%EC%9E%AC%20%EC%83%9D%EC%84%B1%EC%9D%BC',operationType:date_histogram,params:(dropPartials:!f,ignoreTimeRange:!f,includeEmptyRows:!f,interval:d),scale:interval,sourceField:app_date),'5beb3993-8657-40e2-a4e1-b1999a006cb0':(customLabel:!t,dataType:number,isBucketed:!f,label:'%EA%B2%B0%EC%9E%AC%EC%84%9C%EB%A5%98%20%EA%B0%AF%EC%88%98',operationType:formula,params:(formula:'count()',isFormulaBroken:!f),references:!('5beb3993-8657-40e2-a4e1-b1999a006cb0X0'),scale:ratio),'5beb3993-8657-40e2-a4e1-b1999a006cb0X0':(customLabel:!t,dataType:number,isBucketed:!f,label:'Part%20of%20%EA%B2%B0%EC%9E%AC%EC%84%9C%EB%A5%98%20%EA%B0%AF%EC%88%98',operationType:count,params:(emptyAsNull:!f),scale:ratio,sourceField:___records___)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('5beb3993-8657-40e2-a4e1-b1999a006cb0'),layerId:'749d344d-a842-4f07-8071-91691300c9fe',layerType:data,position:top,seriesType:bar_stacked,showGridlines:!f,xAccessor:'28bb07c0-fadb-4ffc-ba61-029b470a70c6')),legend:(isVisible:!t,position:right),preferredSeriesType:bar_stacked,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide)),title:'',type:lens,visualizationType:lnsXY),enhancements:()),gridData:(h:15,i:bf2af7d7-af9d-406a-aa07-49b955dcdd64,w:24,x:0,y:0),panelIndex:bf2af7d7-af9d-406a-aa07-49b955dcdd64,type:lens,version:'8.4.2')),query:(language:kuery,query:'member_code%20:${memberCode}'),tags:!(),timeRestore:!f,title:approval,viewMode:view)&hide-filter-bar=true`} height="600" width="800"></iframe>
        </>

    )
}

export default ApprovalGraph;