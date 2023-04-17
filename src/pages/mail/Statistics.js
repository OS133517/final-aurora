

import MailCSS from './Mail.module.css'

function Statics() {

    return (
        <>
            <div className={MailCSS.container}>
                <div className={MailCSS.titleHeader}>
                    <span> 통계 페이지</span>
                </div>
                <div style={{height: "100%"}}>
                    <iframe src="http://localhost:5601/app/dashboards#/view/2506be10-dcdf-11ed-9512-034efa2d02f3?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:10000),time:(from:now-15d,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:e2510b20-dcca-11ed-9512-034efa2d02f3,name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:e2510b20-dcca-11ed-9512-034efa2d02f3,name:indexpattern-datasource-layer-1eceb1c0-00cd-4f82-aac7-86d5c6e3054d,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('1eceb1c0-00cd-4f82-aac7-86d5c6e3054d':(columnOrder:!(dcc571e4-278b-4291-ba99-652af6701bac,e617f582-e728-4b71-89a6-5cde6bc7f084),columns:(dcc571e4-278b-4291-ba99-652af6701bac:(dataType:string,isBucketed:!t,label:'Top%20values%20of%20size_category.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:e617f582-e728-4b71-89a6-5cde6bc7f084,type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:size_category.keyword),e617f582-e728-4b71-89a6-5cde6bc7f084:(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!(dcc571e4-278b-4291-ba99-652af6701bac),layerId:'1eceb1c0-00cd-4f82-aac7-86d5c6e3054d',layerType:data,legendDisplay:default,metric:e617f582-e728-4b71-89a6-5cde6bc7f084,nestedLegend:!f,numberDisplay:percent)),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:'6bf7cbe0-6722-41be-a14f-7965f9ae3d84',w:24,x:0,y:0),panelIndex:'6bf7cbe0-6722-41be-a14f-7965f9ae3d84',type:lens,version:'7.17.5'),(embeddableConfig:(attributes:(references:!((id:e2510b20-dcca-11ed-9512-034efa2d02f3,name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:e2510b20-dcca-11ed-9512-034efa2d02f3,name:indexpattern-datasource-layer-f1a1665f-508d-4729-801c-1a3fc003d682,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:(f1a1665f-508d-4729-801c-1a3fc003d682:(columnOrder:!('999f468a-9744-487c-b5d7-5890724891c1','13dd3166-cb37-42b7-a644-0b6a1d94ea1e'),columns:('13dd3166-cb37-42b7-a644-0b6a1d94ea1e':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records),'999f468a-9744-487c-b5d7-5890724891c1':(dataType:string,isBucketed:!t,label:'Top%20values%20of%20file_extension.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'13dd3166-cb37-42b7-a644-0b6a1d94ea1e',type:column),orderDirection:desc,otherBucket:!t,size:20),scale:ordinal,sourceField:file_extension.keyword)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!('999f468a-9744-487c-b5d7-5890724891c1'),layerId:f1a1665f-508d-4729-801c-1a3fc003d682,layerType:data,legendDisplay:default,metric:'13dd3166-cb37-42b7-a644-0b6a1d94ea1e',nestedLegend:!f,numberDisplay:percent)),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:'934617b9-7d7a-4927-9db2-26584c9d4ed4',w:24,x:24,y:0),panelIndex:'934617b9-7d7a-4927-9db2-26584c9d4ed4',type:lens,version:'7.17.5')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:FILE,viewMode:view)&hide-filter-bar=true" height="70%" width="100%"></iframe>
                </div>
            </div>
        </>
    )
}

export default Statics;