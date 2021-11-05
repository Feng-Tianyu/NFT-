import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg" role="navigation">
    <div class="container">
    <div class="navbar-header">
        <a class="navbar-brand" href="/">首页</a>
    </div>
    <div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="http://localhost:3000/marketplace#/marketplace">&emsp;拍卖市场</a></li>
            <li class="active"><a href="http://localhost:3000/marketplace#/create">&emsp;铸造NFT</a></li>
            <li class="active"><a href="http://localhost:3000/marketplace#/my-tokens">&emsp;我的NFT</a></li>
            <li class="active"><a href="http://localhost:3000/marketplace#/queries">&emsp;查询</a></li>
        </ul>
    </div>
    </div>
</nav>
  );
};

export default Navbar;
