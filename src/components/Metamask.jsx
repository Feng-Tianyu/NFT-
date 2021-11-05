import React from "react";

const Metamask = ({ connectToMetamask }) => {
  return (
    <div>
      <p>
        欢迎使用NFT拍卖平台，在使用该平台前，请先保证连接到metamask
      </p>
      <button onClick={connectToMetamask}>
        连接metamask{" "}
      </button>
    </div>
  );
};

export default Metamask;
