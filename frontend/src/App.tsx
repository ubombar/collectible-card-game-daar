import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import { BigNumber, utils } from 'ethers'

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

const useWallet = () => {
  const [details, setDetails] = useState<ethereum.Details>()
  const [contract, setContract] = useState<main.Main>()
  useAffect(async () => {
    const details_ = await ethereum.connect('metamask')
    if (!details_) return
    setDetails(details_)
    const contract_ = await main.init(details_)
    if (!contract_) return
    setContract(contract_)
  }, [])
  return useMemo(() => {
    if (!details || !contract) return
    return { details, contract }
  }, [details, contract])
}

export const App = () => {
  const wallet = useWallet()
  const [balance, setBalance] = useState<string>("0")
  const [info, setInfo] = useState<string>("connecting")
  const [contractAddress, setContractAddress] = useState<string>("")

  wallet?.contract.listeners().push(() => {
    setInfo("njdwwj")
  })

  async function depositEth() {
    wallet?.contract.Deposit({ value: utils.parseEther("1") }).then((trx) => {
      console.log(trx)
    })
  }

  useAffect(() => {
    setInfo(String(wallet?.details.account))
    wallet?.contract.seeBalance().then((num: BigNumber) => {
      setBalance(utils.formatEther(num))
    })
    setContractAddress(String(wallet?.contract.address))

    return Promise.resolve()
  }, [wallet])

  return (
    <div className={styles.body}>
      
      <button onClick={depositEth}>Deposit 1 ETH</button>
      <p>Account {info}</p>
      <p>Contract {contractAddress}</p>
      <p>Balance on the contract {balance} ETH</p>
    </div>
  )
}
