import '../index.css';
import Button from '@material-ui/core/Button';


const Modal=({handleClose,show,children}) =>{
    const showHideClassName=show ? "modal display-block" : "model display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <Button  size="medium" color="primary" edge="end" onClick={handleClose} fullWidth={true} variant="contained"> Kapat</Button>
            </section>
        </div>
    )
}
export default Modal;