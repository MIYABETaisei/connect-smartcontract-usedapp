import { useContractFunction, useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { abi } from "../constants/abi";

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  const connect = async () => {
    await activateBrowserWallet();
  };
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = new ethers.Contract(contractAddress, abi);

  const { send, state } = useContractFunction(contract, "store", {
    transactionName: "store",
  });

  useEffect(() => {
    console.log(`State: ${state.status}`);
  }, [state]);

  return (
    <div>
      {hasMetamask ? (
        account ? (
          "Connected! "
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

      {account ? <button onClick={() => send(42)}>Execute</button> : ""}
    </div>
  );
};

export default Home;
