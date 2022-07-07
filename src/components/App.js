import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute"; 
import CardRemovePopup from './CardRemovePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isCardRemovePopupOpen, setIsCardRemovePopupOpen] = React.useState(false);
  const [cardRemove, setCardRemove] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);    
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    api.getInitialCards()
      .then(items => {
        setCards(items);
      })
      .catch((err) => {
      console.log(err); 
      });
  }, []);

  React.useEffect(() => {
    api.getProfile()
      .then(user => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err); 
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }    
  const handleUpdateUser = (user) => {
    setIsLoading(true);
    api.saveProfile(user)
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      setIsLoading(false);
    });    
  }
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.saveAvatar(avatar)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => {
        setIsLoading(false);
    });    
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
   
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err); 
    });        
  } 

  function handleCardDelete(card) {
    setCardRemove(card._id);   
    setIsCardRemovePopupOpen(true); 
  } 

  function handleCardDeleteSubmit(cardId) {
    setIsLoading(true);
    api.removeCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      }).catch((err) => {
        console.log(err); 
    })    
    .finally(() => {
      setIsLoading(false);
    });       
  }  

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    }).catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      setIsLoading(false);
    });       
  } 

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardRemovePopupOpen(false);
    setSelectedCard(null);
  }   
  return (
    <div className="page">
      <Header/>
      <Routes>
      <Route 
          index
          element={
            <ProtectedRoute user={isLoggedIn}>
              <CurrentUserContext.Provider value={currentUser}>
                {currentUser && <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />}
              </CurrentUserContext.Provider>  
            </ProtectedRoute>
          }
        />        
        <Route 
          path="sign-in"
          element={<Login />} 
        />
        <Route 
          path="sign-up"
          element={<Register />} 
        />        
      </Routes>    
      <Footer/>
      <CurrentUserContext.Provider value={currentUser}>
        {currentUser && 
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}            
        />}
      </CurrentUserContext.Provider>            
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      /> 
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />       
      <CardRemovePopup 
        isOpen={isCardRemovePopupOpen} 
        cardId={cardRemove}
        onClose={closeAllPopups} 
        onCardRemove={handleCardDeleteSubmit}
        isLoading={isLoading}
      />   
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />            
    </div>
  );
}

export default App;