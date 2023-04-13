import { useParams } from "react-router";


function SurveyDetail() {

    const {surveyCode} = useParams();

    return (
        <>
            {surveyCode}
        </>
    );
}

export default SurveyDetail;