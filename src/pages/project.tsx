import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import useWallet from '../hooks/useWallet';
import { CONFIG } from '../utils/config';
import { withdrawBalance, startClaimPeriod, startMintPeriod, endMintPeriod, changeBaseURI, changePrice, changeMasterAddress, getIsClaimPeriod } from '../utils/web3';
import StatusModal from "../components/Modal"

const Project: React.FC<{}> = () => {
    const { wallet, connect, setChain, connectedChain } = useWallet()
    const params = useParams()

    const [withdrawalSuccess, setWithdrawalSuccess] = useState<any>(null);
    const [claimPeriodStart, setClaimPeriodStart] = useState<any>(null);
    const [mintPeriodStart, setMintPeriodStart] = useState<any>(null);
    const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
    const [statusModalMessage, setStatusModalMessage] = useState<string>();
    const contractaddress = params.contractaddress as string;

    const localenv = CONFIG.DEV;

    const openModal = () => {
        setShowStatusModal(true)
      }
    
    const closeModal = () => {
        setShowStatusModal(false)
    }
    
    const readyToTransact = async (): Promise<boolean> => {
        if (!wallet) {
            const walletSelected = await connect({});
            if (!wallet) return false
        }
        await setChain({ chainId: localenv.network.id })
        return true;
    }

    const onWithdraw = async () => {
        const ready = await readyToTransact();
        if (ready) {
            try {
                await withdrawBalance(wallet, contractaddress);
                setWithdrawalSuccess(true);
                setStatusModalMessage("Withdrawal success!")
                openModal();
            } catch {
                setWithdrawalSuccess(false);
                setStatusModalMessage("Withdrawal error!")
                openModal();
            }
        }
    }

    const onClaim = async () => {
        const ready = await readyToTransact();
        if (ready) {
            try {
                await startClaimPeriod(wallet, contractaddress)
                setClaimPeriodStart(true);
                setStatusModalMessage("Claim period started")
                openModal();
            } catch {
                setClaimPeriodStart(false);
                setStatusModalMessage("Claim period start error")
                openModal();
            }
        }
    }

    const onMint = async () => {
        const ready = await readyToTransact();
        if (ready && claimPeriodStart) {
            try {
                await startMintPeriod(wallet, contractaddress)
                setClaimPeriodStart(false);
                setMintPeriodStart(true);
                setStatusModalMessage("Mint period started")
                openModal();
            } catch {
                setClaimPeriodStart(false);
                setStatusModalMessage("Mint period start error")
                openModal();
            }
        }
    }

    const onGetStatus = async () => {
        const ready = await readyToTransact();
        if (ready) {
            const result = await getIsClaimPeriod(wallet, contractaddress);
            console.log(result);
        }
    
    }

    return (
    <div className="w-full m-auto flex flex-col items-center justify-between py-10 px-10">
        <h1 className="text-1xl">{contractaddress}</h1>
        <div className="grid grid-cols-2 gap-10 py-4">
        <button className="bg-medici-purple px-2 py-2 rounded-2xl" onClick={onWithdraw}>Withdraw</button>
        <button className="bg-medici-purple px-2 py-2 rounded-2xl" onClick={onClaim}>Start Claim Period</button>
        <button className="bg-medici-purple px-2 py-2 rounded-2xl" onClick={onMint}>Start Mint Period</button>
        <button className="bg-medici-purple px-2 py-2 rounded-2xl" onClick={onGetStatus}>Transfer Ownership</button>
        <button className="bg-medici-purple px-2 py-2 rounded-2xl" >Change Price</button>
        <button className="bg-medici-purple px-2 py-2 rounded-2xl" >Change Base URI</button>
        </div>
        { showStatusModal && ( 
        <StatusModal
        closeModal={closeModal}
        content={statusModalMessage!}/>)
        }
    </div>
    );
}

export default Project