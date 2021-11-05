import React from "react";

class MyTokenInfo extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div className="col-md-6">
                    <div key={this.props.NFT.tokenID} className="mt-4">
                      <p>
                        <span className="font-weight-bold">NFT序号</span> :{" "}
                        {this.props.NFT.tokenID}
                      </p>
                      <p>
                        <span className="font-weight-bold">代号</span> :{" "}
                        {this.props.NFT.tokenName}
                      </p>
                    </div>
                    {this.props.NFT.onSale ? (
                      <div>
                      <p>
                          <span className="font-weight-bold">最高出价</span> :{" "}
                          {this.props.Auction.highestBid}
                      </p>
                      <p>
                          <span className="font-weight-bold">结束时间</span> :{" "}
                          {this.props.Auction.endTime}
                      </p>
                      {this.props.currentTime >= this.props.Auction.endTime ? (
                        !this.props.Auction.ended ? (
                          <button
                          onClick={ () => {
                            this.props.NFTContract.methods.endAuction(this.props.NFT.tokenID).send({ from: this.props.accountAddress, gas: '3000000'}).on("confirmation", () => {
                              window.location.reload();
                            });
                          }}
                          >
                            结束
                          </button>
                        ) : (
                          <botton>
                              待领取
                          </botton>
                        )
                        
                      ) : (
                      <button>
                        拍卖中
                      </button>
                      )}
                      </div>
                    ) : (
                      <button
                        onClick={ () => {
                          let minBid = prompt("请输入起拍价");
                          let duration = prompt("请输入拍卖时间");
                          this.props.NFTContract.methods.beginAuction(this.props.NFT.tokenID, minBid, duration).send({ from: this.props.accountAddress, gas: '3000000'}).on("confirmation", () => {
                            window.location.reload();
                          });
                        }}
                      >
                        拍卖
                      </button>
                    )}
                  </div>
        )
    }
}

export default MyTokenInfo;