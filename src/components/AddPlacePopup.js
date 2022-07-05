import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const {isOpen : isAddPlacePopupOpen, onClose: closeAllPopups, isLoading} = props;

  const [name, setName] = React.useState('');
  const [href, setHref] = React.useState(''); 

  React.useEffect(() => {
    setName('');
    setHref('');
  }, [isAddPlacePopupOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeHref(e) {
    setHref(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name,
      link: href,
    });
  } 

  return (
    <PopupWithForm
      name="card"
      formTitle="Новое место"
      formButtonText="Создать"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >  
      <input 
        type="text" 
        className="form__input form__input_field_card-name" 
        id="card-name"            
        name="name" 
        placeholder="Название" 
        minLength="2" 
        maxLength="30" 
        required
        value={name}
        onChange={handleChangeName}        
      />
      <span className="form__input-error  form__input-error_field_card-name"></span>
      <input 
        type="url" 
        className="form__input form__input_field_card-href" 
        id="card-href"
        name="link" 
        placeholder="Ссылка на картинку" 
        required
        value={href}
        onChange={handleChangeHref}        
      />
      <span className="form__input-error  form__input-error_field_card-href"></span>
    </PopupWithForm>          
  )  
}  