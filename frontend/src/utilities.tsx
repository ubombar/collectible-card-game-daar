import { useEffect, useMemo, useRef, useState } from 'react'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import * as cardmanager from '@/lib/cardmanager'

import { NavigateFunction } from 'react-router-dom';

type Canceler = () => void
const useAffect = (
    asyncEffect: () => Promise<Canceler | void>,
    dependencies: any[] = []
  ) => {
    const cancelerRef = useRef<Canceler | void>()
    useEffect(() => {
      asyncEffect()
        .then(canceler => (cancelerRef.current = canceler))
        .catch(error => console.warn('Uncatched error', error))
      return () => {
        if (cancelerRef.current) {
          cancelerRef.current()
          cancelerRef.current = undefined
        }
      }
    }, dependencies)
  }

export const useWallet = () => {
    const [details, setDetails] = useState<ethereum.Details>()
    const [mainContract, setMainContract] = useState<main.Main>()
    const [cardmanagerContract, setCardManagerContract] = useState<cardmanager.CardManager>()
    useAffect(async () => {
      const details_ = await ethereum.connect('metamask')
      if (!details_) return
      setDetails(details_)
      const mainContract_ = await main.init(details_)
      const cardmanagerContract_ = await cardmanager.init(details_)
      if (!mainContract_) return
      setMainContract(mainContract_)
      if (!cardmanagerContract_) return
      setCardManagerContract(cardmanagerContract_)
    }, [])
    return useMemo(() => {
      if (!details || !mainContract || !cardmanagerContract) return
      return { details, mainContract, cardmanagerContract }
    }, [details, mainContract, cardmanagerContract])
  }

export const checkAccount=(navigate: NavigateFunction)=>{
  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      
      const accountInUse = accounts[0].toLowerCase();
      console.log('Account Ethereum in', {a: accountInUse});
      const adminAccount = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
      if (accountInUse === adminAccount){
            navigate('/AdminPage');
            console.log("A in use")
      } else if (accountInUse){
            navigate('/UserPage')
            console.log("U in use")
            }
    } else {
      navigate('/LoginPage')
      console.log('NO account available.');
    }
  }
  ethereum.accountsChanged(handleAccountsChanged);
}