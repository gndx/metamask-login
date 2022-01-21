import { useEffect, useCallback } from "react";
import Head from "next/head";
import { useWeb3React } from "@web3-react/core";
import { connector } from '../config/web3/';
import { ellipseAddress } from '../utils/ellipseAddress';
import styles from "../styles/Home.module.css";

export default function Home() {
  const { active, activate, deactivate, account, error, chainId } =
    useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  return (
    <div className={styles.container}>
      <Head>
        <title>MetaMask App</title>
      </Head>
      <div>
        <h1>Metamask</h1>
        {!active ? (
          <button onClick={connect}>Conectar Wallet</button>
        ) : (
          <>
            <button onClick={disconnect}>Desconectar Wallet</button>
            <p>Network: {chainId === 1 && "Ethereum Mainnet"}</p>
            <p>Wallet: {ellipseAddress(account)} </p>
          </>
        )}
      </div>
    </div>
  );
}
