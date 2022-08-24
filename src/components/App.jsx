import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import FirstPage from './FirstPage/FirstPage';

export const App = () => {
  const [imgName, setImgName] = useState('');

  return (
    <div className={s.App}>
      {!imgName && <FirstPage setImgName={setImgName} imgName={imgName} />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable
      />

      {imgName && <Searchbar setImgName={setImgName} imgName={imgName} />}
      <ImageGallery imgName={imgName} />
    </div>
  );
};
