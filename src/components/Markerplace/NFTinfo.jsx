import React from "react";

class NFTinfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div key={this.props.NFT.tokenID} className="mt-4">
                <p>
                    <span className="font-weight-bold">NFT序号</span> :{" "}
                    {this.props.NFT.tokenID}
                </p>
                <p>
                    <span className="font-weight-bold">代号</span> :{" "}
                    {this.props.NFT.tokenName}
                </p>
                <p>
                    <span className="font-weight-bold">铸造者</span> :{" "}
                    {this.props.NFT.mintedBy}
                </p>
                <p>
                    <span className="font-weight-bold">现持有人</span> :{" "}
                    {this.props.NFT.currentOwner}
                </p>
                <p>
                    <span className="font-weight-bold">当前价格</span> :{" "}
                    {window.web3.utils.fromWei(this.props.NFT.price,"Ether")} ETH
                </p>
                {
                    this.props.accountAddress === this.props.NFT.currentOwner ? (
                        !this.props.NFT.onSale ? (
                            <button
                                onClick={ () => {
                                    let minBid = prompt("起拍价");
                                    let duration = prompt("拍卖时长");
                                    this.props.NFTContract.methods.beginAuction(this.props.NFT.tokenID, minBid, duration).send({ from: this.props.accountAddress, gas: '3000000'}).on("confirmation", () => {
                                        window.location.reload();
                                    });
                                }}
                            >
                                拍卖
                            </button>
                        ) : (
                            <p>
                                <span className="font-weight-bold">结束时间</span> :{" "}
                                {this.props.Auction.endTime}
                            </p>
                        )
                    ) : (
                        this.props.NFT.onSale ? (
                            !this.props.Auction.ended ? (
                                <div>
                                <p>
                                    <span className="font-weight-bold">最高出价</span> :{" "}
                                    {this.props.Auction.highestBid}
                                </p>
                                <botton
                                    onClick={ () => {
                                        let bid = prompt("请输入你的竞拍价");
                                        this.props.NFTContract.methods.increaseBid(this.props.NFT.tokenID, bid).send({ from: this.props.accountAddress, gas: '3000000'});
                                      }}
                                >
                                    出价
                                </botton>
                                </div>
                            ) : (
                                !this.props.Auction.claimed ? (
                                    this.props.accountAddress === this.props.Auction.highestBidder ? (
                                        <botton onClick={ () =>{
                                                this.props.NFTContract.methods.claimNFT(this.props.NFT.tokenID).send({from: this.props.accountAddress, value: this.props.Auction.highestBid, gas: '3000000'});
                                            }}
                                        >
                                            领取
                                        </botton>
                                    ) : (
                                        <botton>
                                            待领取
                                        </botton>
                                    )
                                ) : (
                                    <div></div>
                                )
                            )
        
                        ) : (
                            <botton>
                                待出售
                            </botton>
                        )
                    )
                }
            </div>
        )
    }
}

export default NFTinfo;