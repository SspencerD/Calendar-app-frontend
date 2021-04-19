import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../styles/components/modal.css';
import '../styles/components/Datepicker.css';

import "react-datepicker/dist/react-datepicker.css";

import moment from '../../../node_modules/moment/moment';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventCleanEvent, eventUpdated } from '../../actions/events';

registerLocale('es', es);

export const CalendarModal = () => {


    const dispatch = useDispatch();

    const {modalOpen} = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)


    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:3000,
        timerProgressBar:true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave',Swal.resumeTimer)
        }
    })

    
    


    const now = moment().minutes(0).second(0).add(1, 'hours');

    const endTime = now.clone().add(1, 'hours');


    const initEvent = {
        
        title: '',
        notes: '',
        start: now.toDate(),
        end: endTime.toDate()
    }

    /////los esteis

    const [titleValid, setTitleValid] = useState(true);

    const [dateStart, setDateStart] = useState(now.toDate());

    const [dateEnd, setDateEnd] = useState(endTime.toDate());

    const [formValues, setFormValues] = useState( initEvent );



    useEffect(() => {

        if(activeEvent){

            setFormValues(activeEvent);
        } else{

            setFormValues(initEvent);
        }
        
       
    }, [activeEvent, setFormValues ])





    const customStyles = {

        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    Modal.setAppElement('#root');


    const closeModal = () => {
        console.log('Cerrar Modal')
        dispatch(uiCloseModal());
        dispatch(eventCleanEvent());
        setFormValues( initEvent );
        //TODO: Cerrar Modal



    }

    const { notes, title, start, end } = formValues;

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });

    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {

            return Swal.fire('Error',
             'La fecha fin debe ser mayor a la fecha de inicio',
              'error');
        }

        if(title.trim().length <2 ){

            Toast.fire({
                icon:'error',
                title:'Debe contener un titulo el evento'
            })
            return setTitleValid(false);
            
        }

        // realizar update en bd

        //actualizando
        if( activeEvent){
            dispatch(eventUpdated(formValues));
        }else{

            //creando uno nuevo
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user:{
                    _id: '9221',
                    name:'Santiago Spencer',
                }
            }));


        }
      
        Swal.fire('Guardado','Se a guardado tu nuevo evento','success');
        setTitleValid(true);
        closeModal();
    }




    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={400}
            className="modal"
            overlayClassName="modal-fondo"

        >
            <h1> { (activeEvent)? 'Editar Evento' : 'Nuevo evento'}</h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>

                    <DatePicker
                        locale="es"
                        selected={dateStart}
                        onChange={handleStartDateChange}
                        className="form-control"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={20}
                        timeCaption="time"
                        dateFormat="MMM d, yyyy h:mm aa"
                    />
                </div>

                <div className="form-group">

                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale="es"
                        onChange={handleEndDateChange}
                        selected ={dateEnd}
                        className={`form-control ${ !titleValid && 'is-invalid'} `}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={20}
                        timeCaption="time"
                        dateFormat="MMM d, yyyy h:mm aa"
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
