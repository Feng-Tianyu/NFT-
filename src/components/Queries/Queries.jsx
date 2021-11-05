import React, { useState } from "react";

const Queries = (props) => {
  const [tokenIdForOwner, setTokenIdForOwner] = useState("");
  const [tokenOwner, setTokenOwner] = useState("");
  const [tokenIdForOwnerNotFound, setTokenIdForOwnerNotFound] = useState(false);

  const [tokenIdForMetadata, setTokenIdForMetadata] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState("");
  const [tokenMetadataLink, setTokenMetadataLink] = useState("");
  const [tokenIdForMetadataNotFound, setTokenIdForMetadataNotFound] = useState(false);

  const getTokenOwner = async (e) => {
    e.preventDefault();
    try {
      const owner = await props.NFTContract.methods.getTokenOwner(tokenIdForOwner).call();
      setTokenOwner(owner);
      setTimeout(() => {
        setTokenOwner("");
        setTokenIdForOwner("");
      }, 5000);
    } catch (e) {
      setTokenIdForOwnerNotFound(true);
      setTokenIdForOwner("");
    }
  };

  const getTokenMetadata = async (e) => {
    e.preventDefault();
    try {
      const metadata = await props.NFTContract.methods.getTokenMetaData(tokenIdForMetadata).call();
      setTokenMetadata(metadata.substr(0, 60) + "..." + metadata.slice(metadata.length - 5));
      setTokenMetadataLink(metadata);
      setTimeout(() => {
        setTokenMetadata("");
        setTokenIdForMetadata("");
      }, 5000);
    } catch (e) {
      setTokenIdForMetadataNotFound(true);
      setTokenIdForMetadata("");
    }
  };

  return (
    <div>
      <div className="p-4 mt-1 border">
        <div className="row">
          <div className="col-md-5">
            <h5>查询NFT所属权流转信息</h5>
            <form onSubmit={getTokenOwner}>
              <div className="form-group">
                <input
                  required
                  type="text"
                  value={tokenIdForOwner}
                  placeholder="请输入要查询的NFT的序号"
                  onChange={(e) => setTokenIdForOwner(e.target.value)}
                />
              </div>
              <button type="submit">
                查询
              </button>
              {tokenIdForOwnerNotFound ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>该序号不存在</strong>
                </div>
              ) : null}
            </form>
            <p className="mt-4">{tokenOwner}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queries;
