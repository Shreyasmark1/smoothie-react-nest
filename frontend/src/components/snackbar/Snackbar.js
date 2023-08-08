import './snackbar.css'
const Snackbar = ({ mesaage }) => {

    return (
            <div className="snackbar" id='snackbar'>
                <div className="icon">
                    x
                </div>
                <div className="content">
                    <div className="title">
                        Failed
                    </div>
                    <div className="message">
                        {mesaage}
                    </div>
                </div>
                <div className="close-icon">
                    x
                </div>
            </div>
    );
}

export default Snackbar;