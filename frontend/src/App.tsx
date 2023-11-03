import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useWallet } from "./utilities"
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";
import { ErrorPage } from "./pages/ErrorPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { CardInfoPage } from "./pages/CardInfoPage";
import { CollectionInfoPage } from "./pages/CollectionInfoPage";
//import {BigNumber, utils} from 'ethers'

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


export const App = () => {
  const wallet = useWallet()
  const adminAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  

  const isEmptyAccount = !wallet?.details.account;
  const isAdmin = wallet?.details.account ===adminAccount ;
  console.log("app")
  //mie modifiche per poter individuare il login in metamask e se non è stato effettuato lo indirizzo alla pagine di login altrimenti se è un admin vado in admin page e se è uno user vado in user page
  //poi nella login page inserisco uno useAffect che controlli che ci siano state modifiche nell'account e se non ci sono state continua a mostrare please login, mentre se ci sono state rimanda alle due pagine admin e user a seconda dell'utente loggato
  //inserire una default page per indirizzi non validi e poi un aggiornamento della pagina nel caso in cui un utente dovesse cambiare account e per esempio passare da admin a user
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<LoginPage />} />
          <Route path="UserPage" element={<UserPage />} />
          <Route path="AdminPage" element={<AdminPage />} />
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/UserInfoPage/:ID" element={<UserInfoPage />} />
        <Route path="/CardInfoPage/:ID" element={<CardInfoPage />} />
        <Route path="/CollectionInfoPage/:ID" element={<CollectionInfoPage />} />
      </Routes>
    </BrowserRouter>
    
    
  );

}
