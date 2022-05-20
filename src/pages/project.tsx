import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import useWallet from '../hooks/useWallet';
import { withdrawBalance } from '../utils/web3';

const Project: React.FC<{}> = () => {
    const { wallet, connect } = useWallet()
    const params = useParams()

    const [withdrawalSuccess, setWithdrawalSuccess] = useState<any>(null);

    const contractaddress = params.contractaddress;

    const onWithdraw = async () => {
        try {
            const result = await withdrawBalance(wallet, contractaddress);
            console.log(result)
            setWithdrawalSuccess(true);
        } catch {
            setWithdrawalSuccess(false);
        }
    }

    useEffect(() => {
        if (withdrawalSuccess !== null) {
            document.getElementById("WithdrawalStatus")!.style.display = 'block'
        } else {
            document.getElementById("WithdrawalStatus")!.style.display = 'none'
        }
    })
    
    return (
    <div className="w-full m-auto flex flex-col items-center justify-between py-10 px-10">
        <h1 className="text-2xl">{contractaddress}</h1>
        <button className="bg-medici-purple px-2 py-2 rounded-2xl" onClick={onWithdraw}>Withdraw</button>
        <div id="WithdrawalStatus">
        { 
            withdrawalSuccess ? <p>Your withdrawal was successful</p> : <p>Your withdrawal has failed</p>
        }
        </div>
    </div>
    );
}

export default Project