import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import NFTinfo from "./NFTinfo";

const Marketplace = ({
    NFTs,
    accountAddress,
    NFTCount,
    NFTContract,
    Auctions,
}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (NFTs.length !== 0) {
            if (NFTs[0].metaData !== undefined) {
                setLoading(loading);
            }
            else {
                setLoading(false);
            }
        }
    }, [NFTs]);

    return (
        <div>
            <div class="container">
                <div>
                    <h5>当前在售NFT如下：</h5>
                </div>
            </div>
            <div className="d-flex flex-wrap mb-2">
                {NFTs.map((NFT) => {
                    return (
                        <div
                            key={NFT.tokenID}
                            className="w-30 p-2 mt-1 border"
                        >
                            <img src={NFT.tokenURI} id="preview_img" width="100px" height="100px" alt=""/>
                            <NFTinfo
                                NFT={NFT}
                                accountAddress={accountAddress}
                                NFTContract={NFTContract}
                                Auction={Auctions[parseInt(NFT.tokenID)-1]}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Marketplace;