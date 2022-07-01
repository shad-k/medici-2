import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useReservedNFTs from '../hooks/useReservedNFTs';
import { getThumbnails } from '../utils/reservations';
import useWallet from '../hooks/useWallet';

import NFTCard from '../components/reservations/NFTCard';
import NFTPopup from '../components/reservations/NFTPopup';

const Reservation: React.FC<{}> = () => {
  const { wallet, connect, connectedChain, setChain } = useWallet();

  const { name: contractName } = useParams();
  const { data, error } = useReservedNFTs(contractName as string);
  const [allImages, setAllImages] = useState<Array<number>>();
  const [allThumbnails, setAllThumbnails] = useState<Array<string>>();
  const [selectedNFT, setSelectedNFT] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    (async () => {
      if (data) console.log('Got all images');
      setAllImages(data.open);
      if (contractName) {
        console.log('Getting thumbnails');
        const thumbnails = await getThumbnails('cryptopups');
        setAllThumbnails(thumbnails);
      }
    })();
  }, [data]);

  useEffect(() => {
    if (showModal && document.getElementById('modal-container') !== null) {
      document.getElementById('modal-container')!.style.display = 'relative';
    } else if (
      !showModal &&
      document.getElementById('modal-container') !== null
    ) {
      document.getElementById('modal-container')!.style.display = 'none';
    } else {
      return;
    }
  }, [showModal]);

  useEffect(() => {
    var lazyImages = [].slice.call(
      document.querySelectorAll('.lazy-loaded-image.lazy')
    );

    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target as HTMLMediaElement;
          if (lazyImage) {
            lazyImage.src = lazyImage.dataset.src!;
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  });

  if (!data && !error) {
    return null;
  }

  if (!data) {
    return null;
  }

  const handleSelectNFT = (index: number) => {
    setSelectedNFT(index);
    console.log(selectedNFT);
    handleOpen();
  };

  return (
    <div className="w-full flex flex-col p-5 items-center">
      <h1 className="text-lg text-center m-3">
        Bitchcoin holders will be airdropped first Cryptopup of their choice
      </h1>
      <div className="grid grid-cols-3">
        {contractName &&
          allImages &&
          allThumbnails &&
          allImages.map((i) => (
            // <NFTCard collection={contractName} index={i} onSelect={handleSelectNFT}/>)
            <div className="p-2">
              {/* <img className="lazy-loaded-image lazy" src="https://placeholder.pics/svg/300" data-src={process.env.PUBLIC_URL + `/assets/${contractName}/${i}.png`} alt={`${i}`} onClick={event => handleSelectNFT(i)}/> */}
              <img
                key={`${contractName}-${i}`}
                className="lazy-loaded-image lazy"
                src="https://placeholder.pics/svg/300"
                data-src={allThumbnails[i]}
                alt={`${i}`}
                onClick={(event) => handleSelectNFT(i)}
              />
            </div>
          ))}
      </div>
      <div
        id="modal-container"
        className="hidden items-center justify-center text-center h-screen"
      >
        {contractName && selectedNFT && (
          <NFTPopup
            showModal={showModal}
            handleClose={handleClose}
            collection={contractName}
            selected={selectedNFT}
          />
        )}
      </div>
    </div>
  );
};

export default Reservation;
