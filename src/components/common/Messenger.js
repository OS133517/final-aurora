
import messengerCSS from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Messenger() {

    return (
        <Link to="/aurora/messenger" className={messengerCSS.buttonBox}>
            <button>
                <FontAwesomeIcon icon="comment" />
            </button>
        </Link>
    )
}

export default Messenger;