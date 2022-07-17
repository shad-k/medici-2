import React, { useState, useEffect } from 'react';
import { StepperFormProps } from '../../model/types';
import validator from 'validator';
import { getNameAvailability } from '../../utils/retrieve';
import { uploadCoverImage } from '../../utils/upload';
import { readyToTransact } from '../../utils/web3';
import useWallet from '../../hooks/useWallet';

const PageTwo: React.FC<StepperFormProps> = ({
  nextStep,
  handleInputData,
  data,
}) => {
  const { currentChain } = useWallet();
  const [nameChecked, setNameChecked] = useState<boolean>(false);
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [timer, setTimer] = useState<any>(null);

  const [CoverImage, setCoverImage] = useState<File>();
  const [ImageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (CoverImage) {
      setImageUrl(URL.createObjectURL(CoverImage));
    }
  }, [CoverImage]);

  const onSubmit = async () => {
    if (CoverImage && !(validator.isEmpty(data.name)) && !(validator.isEmpty(data.symbol)) ) {
      const res = await uploadCoverImage(data.name, CoverImage);
      nextStep();
    } else {
      alert("A name, cover image, and symbol are required!")
    }
  };

  const nameCheck = async (name: string) => {
    // await readyToTransact(wallet, connect, setChain);

    if (name === '') {
      setNameChecked(false);
      setIsNameAvailable(false);
      return;
    } else {
      setNameChecked(true);
      try {
        clearTimeout(timer);

        const newTimer = setTimeout(async () => {
          const isNameAvailable = await getNameAvailability(
            name,
            currentChain!.hexId
          );
          if (isNameAvailable) {
            await handleInputData('name', name);
            setIsNameAvailable(true);
            return;
          } else {
            setIsNameAvailable(false);
            return;
          }
        }, 500);

        setTimer(newTimer);
      } catch {
        alert('There was an error');
      }
    }
  };

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-2">
      <div className="w-full md:bg-fixed md:h-screen h-2/5">
        <input
          type="file"
          name="CoverImage"
          accept="image/png, image/gif, image/jpeg"
          id="CoverImageField"
          style={{ display: 'none' }}
          onChange={(event) => setCoverImage(event.target.files![0])}
        />
        <label htmlFor="CoverImageField">
          {ImageUrl && CoverImage ? (
            <img
              className="w-full aspect-video md:h-screen object-cover"
              src={ImageUrl}
            />
          ) : (
            <div className="flex w-full aspect-video md:h-screen items-center bg-black">
              <span className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center whitespace-nowrap">
                Upload Cover
              </span>
            </div>
          )}
        </label>
      </div>
      <div className="text-center p-10 md:mt-[20%] m-10">
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl bg-transparent inline w-fit text-center tracking-wide text-transparent bg-clip-text text-[#9403fc] font-semibold">
            What will you name your project?
          </h1>
          <h2 className="text-zinc-400 text-md md:text-lg font-light">
            The name of your project must be unique and currently cannot be
            changed, but we plan on removing that restriction in the near
            future.
          </h2>
          <div className="text-left">
            <label
              htmlFor="input-name"
              className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold"
            >
              Project Title
            </label>
            <input
              id="input-name"
              type="text"
              className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none"
              onChange={(event) => nameCheck(event.target.value)}
            />
          </div>
          {nameChecked &&
            (isNameAvailable ? (
              <p className="text-green-500">Name is available!</p>
            ) : (
              <p className="text-[#F47174]">
                This name is not available, please try another name!
              </p>
            ))}
          <div className="text-left">
            <label
              htmlFor="input-symbol"
              className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold"
            >
              Project Symbol
            </label>
            <input
              id="input-symbol"
              type="text"
              className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none"
              onChange={(event) =>
                handleInputData('symbol', event.target.value)
              }
            />
          </div>
        </div>
        <button
          className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center w-[100px] mt-10"
          onClick={onSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageTwo;
