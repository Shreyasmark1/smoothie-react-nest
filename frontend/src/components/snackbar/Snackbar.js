import './snackbar.css'
const Snackbar = () => {
    return ( 
        <div className="snackbar">
            <div className="icon">
                x
            </div>
            <div className="content">
                <div className="title">
                    Failed
                </div>
                <div className="message">
                    There was an error
                </div>
            </div>
            <div className="close-icon">
                x
            </div>
        </div>
     );
}
 
export default Snackbar;