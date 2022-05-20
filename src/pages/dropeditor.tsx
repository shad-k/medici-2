import React, {useState, useEffect} from 'react'
import '../css/dropeditor.css'

const DropEditor: React.FC<{}> = () => {
    const [CollectionSize, setCollectionSize] = useState<number>()
    const [isUnique, setIsUnique] = useState<boolean>()
    const [CollectionMedium, setCollectionMedium] = useState<string>()

    const handleChange = (e: any) => {
        const html = e.target.textContent;
        setCollectionSize(html);
        console.log(CollectionSize)
      };
    
    
    return (
        <div className="w-full mx-auto h-full flex flex-col">
            <h1 className="text-5xl align-middle text-center mt-[20%] inline-flex">Are you ready to get started?</h1>
        </div>
    );
}

export default DropEditor