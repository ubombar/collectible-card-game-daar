import { Router } from 'express';
import contracts from './contracts.json'

export const index = Router();

index.get('/', (req, res) => {
  // let mainContractAbi = contracts.contracts.Main.abi
  let contractAddress = contracts.contracts.Main.address
  
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "X-Requested-With")
  //res.header("Access-Control-Allow-Headers", "Content-Type")

  return res.json({ message: 'Success', contractAddress: contractAddress});
});
