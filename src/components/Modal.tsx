import React from 'react'

interface IStatusModalProps {
    closeModal: () => void
    content: string
  }
  
  const StatusModal: React.FC<IStatusModalProps> = ({
    closeModal,
    content
  }) => {
    return (
        <div className="rounded-2xl w-[300px] h-40 text-center p-4 drop-shadow-lg">
        <h1 className="mt-2 text-2xl">{content}</h1>
        <br></br>
        <button
            className="text-1xl ml-4 bg-medici-purple p-2 rounded-2xl "
            onClick={closeModal}
        >
        close
        </button>
        </div>
    );
  }

export default StatusModal