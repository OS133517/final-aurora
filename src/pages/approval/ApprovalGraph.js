import { decodeJwt } from "../../utils/tokenUtils";

const ApprovalGraph = () => {

    const loginMember = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberCode = loginMember.memberCode;
    console.log('memberCode', memberCode);

    return (
        <div style={{width : '100%'}}>
            <h3>통계 그래프</h3>
            <div >
                <iframe src={`http://localhost:5601/app/dashboards#/view/837fcdd0-dcf6-11ed-9e83-3966b4486111?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-7d,to:now))&_a=(description:'',expandedPanelId:a3b38e27-96e7-46ce-b998-12b8b662cf56,filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'13db7b50-dcf6-11ed-9e83-3966b4486111',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'13db7b50-dcf6-11ed-9e83-3966b4486111',name:indexpattern-datasource-layer-fc8b41f3-661c-4a25-9f85-877ac8faf303,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:(fc8b41f3-661c-4a25-9f85-877ac8faf303:(columnOrder:!(e4de57f1-19d3-44f9-93f7-33c901d65437,'0240e76b-9d84-4002-a636-d9546a4ac94c'),columns:('0240e76b-9d84-4002-a636-d9546a4ac94c':(customLabel:!t,dataType:number,isBucketed:!f,label:'%EC%83%9D%EC%84%B1%ED%95%9C%20%EB%AC%B8%EC%84%9C%20%EA%B0%AF%EC%88%98',operationType:count,scale:ratio,sourceField:Records),e4de57f1-19d3-44f9-93f7-33c901d65437:(customLabel:!t,dataType:date,isBucketed:!t,label:'%EC%83%9D%EC%84%B1%EC%9D%BC%20',operationType:date_histogram,params:(interval:'1d'),scale:interval,sourceField:app_date)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('0240e76b-9d84-4002-a636-d9546a4ac94c'),layerId:fc8b41f3-661c-4a25-9f85-877ac8faf303,layerType:data,position:top,seriesType:bar_stacked,showGridlines:!f,xAccessor:e4de57f1-19d3-44f9-93f7-33c901d65437)),legend:(isVisible:!t,position:right),preferredSeriesType:bar_stacked,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:()),gridData:(h:15,i:a3b38e27-96e7-46ce-b998-12b8b662cf56,w:24,x:0,y:0),panelIndex:a3b38e27-96e7-46ce-b998-12b8b662cf56,type:lens,version:'7.17.5')),query:(language:kuery,query:'member_code:${memberCode}'),tags:!(),timeRestore:!f,title:approval,viewMode:view)&hide-filter-bar=true`} height="600" width="100%"></iframe>
            </div>
        </div >

    )
}

export default ApprovalGraph;