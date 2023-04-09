import { useState } from 'react';
import { useDispatch } from 'react-redux';
import messengerCSS from './Messenger.module.css';

function MessengerList() {

    /** disPatch */
    const dispatch = useDispatch()
    /** useState */
    const [form, setForm] = useState({
        messengerDescript: ''
    });

    /** Event */
    const textHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    return (
        <div className={messengerCSS.messengerRoom}>
            <div>

            </div>
            {/* <div className={messengerCSS.inputText}>
                <input type="text" name='messengerDescript' onChange={textHandler} />
            </div> */}
        </div>
    )
}

export default MessengerList;
