import React from 'react';

const Home = ({ accountAddress, accountBalance }) => {
    return (
      <div class="container">
        <div className=" ">
          <br />
          <h1 className="display-5">欢迎来到NFT拍卖平台</h1>
          <h2 className="display-6">您可以在导航栏中选择需要进行的操作:</h2>
          <p>拍卖市场：查看当前可以竞价的NFT</p>
          <p>铸造NFT：在当前账户下上传文件铸造NFT</p>
          <p>我的NFT：查看当前账户名下的NFT</p>
          <p>查询:查询NFT流转信息</p>
          <hr className="my-4" />
          <p class="text-right">当前账户:{accountAddress}</p>
          <p class="text-right">账户余额:{accountBalance}ETH</p>
        </div>
      </div>
    );
  };

export default Home;