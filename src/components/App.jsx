import { useState, useEffect } from 'react';
import { apiData } from '../Services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export const App = () => {

  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState('1');
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if (query === '') {
      return;
    }
    getApi (query, page)
  }, [query, page]);
  
  const getApi = async (query, page) => {
    setLoader(true);
    try {
      const data = await apiData(query, page);
      
      if (page === 1) {
        setImages([...data.hits]);
        setTotalHits(data.totalHits);
      }
    
      if (page !== 1) {
        setImages(prev => [...prev, ...data.hits]);
      }

    } catch (error) {
      console.log(error)
      return alert(`Something went wrong. ${error}.`);
    } finally {
      setLoader(false);
    }
  };

  const handleFormSubmit = inputValue => {
    setPage(1);
    setQuery(inputValue);
    setImages([]);
  };

  const showSelectedImg = selectedImage => {
    setSelectedImageData(selectedImage);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
      <div className={css.container}>
        <Searchbar onSearchSubmit={handleFormSubmit} />
        {images.length !== 0 && (
          <ImageGallery imagesArray={images} hadleClick={showSelectedImg} />
        )}  
        {images.length !== 0 && totalHits > 12 && (
          <Button handleClick={() => setPage(prevState => prevState + 1)} />
        )}
         {totalHits === 0 && (
          <h2 className={css.noMatchMsg}>Ooops... Nothing found, try something else.</h2>
        )}
        <Loader
          height={150}
          width={150}
          color="#5876c6"
          active={loader}
        />
        {showModal && (<Modal largeImageURL={selectedImageData.largeImageURL} tags={selectedImageData.tags} closeModal={toggleModal} />)}
      </div>
    );
}