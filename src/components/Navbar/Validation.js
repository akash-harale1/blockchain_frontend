import { Network, Alchemy } from "alchemy-sdk";
import { useContext, useState } from "react";
import ValidateCard from "./ValidateCard";
import "./Validation.css";
import { PopContext } from "../context/popupcontext";
import { ThreeDots } from "react-loader-spinner";

export default function Validation() {
  const [nft, setNft] = useState();
  const [showNft, setShow] = useState();
  const [spinner, setSpinner] = useState();

  const { wallet, setPop } = useContext(PopContext);

  //   const { contractAddress } = useContext(PopContext);

  async function fetchNft() {
    if (!wallet) {
      setPop(true);
      return;
    }
    setSpinner(true);

    const settings = {
      apiKey: "TY_MMVMlTD2UytOW900Dm7Q-OsU8ftRF",
      network: Network.ETH_SEPOLIA,
    };

    const alchemy = new Alchemy(settings);
    const nfts = alchemy.nft.getNftsForOwner(`${wallet}`);
    const url = (await nfts).ownedNfts;
    if (url) {
      setSpinner(false);
    }
    console.log(url);

    setNft(url);
    setShow(true);
  }
  return (
    <>
      <div className="validation_page">
        <div className="valid_btn_area">
          <button
            style={{ marginBottom: "2rem" }}
            onClick={fetchNft}
            className="btn btn-secondary nft_btn"
          >
            Get Nft
          </button>
        </div>
        <div className="nft_area">
          {spinner ? (
            <div className="loader">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#2a265f"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : showNft ? (
            nft.map((obj) => {
              return (
                <ValidateCard
                  img={obj.rawMetadata.url}
                  eventName={obj.rawMetadata.event}
                  token={obj.rawMetadata.token}
                  id={obj.rawMetadata.id}
                ></ValidateCard>
              );
            })
          ) : (
            <span></span>
          )}

          {/* {showNft ? (
            nft.map((obj) => {
              return (
                <ValidateCard
                  img={obj.rawMetadata.url}
                  eventName={obj.rawMetadata.event}
                  token={obj.rawMetadata.token}
                  id={obj.rawMetadata.id}
                ></ValidateCard>
              );
            })
          ) : (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#2a265f"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          )} */}
        </div>
      </div>
    </>
  );
}
