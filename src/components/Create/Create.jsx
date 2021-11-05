import React from 'react';
import {create} from 'ipfs-http-client';

const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NFTName: "",
            tokenURI: '',
            buffer: null,  //Data to be sent to ipfs
        }
    }

    chooseFile = (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)});
            console.log('buffer', this.state.buffer);
        }
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log("Submitting file to IPFS");
            
        let result = await ipfs.add(this.state.buffer);
        
        console.log('Ipfs result', result);
        let tokenURI = `https://ipfs.infura.io/ipfs/${result.path}`;
        console.log(tokenURI);
        this.setState({tokenURI});
        
        this.props.NFTContract.methods.mintNFT(this.state.NFTName, tokenURI, 0).send({from: this.props.accountAddress, gas: '3000000'});
        console.log("Name:"+this.state.NFTName);
    }

    render() {
        return (
            <div>
                <div class="container">
                    <h1 className="display-5">铸造我的NFT</h1>
                </div>
                <div className="p-4 mt-1 border" class="container">
                    <form onSubmit={this.onSubmit}>
                        <input type="file" onChange={this.chooseFile}/>
                        <input
                          required
                          type="text"
                          value={this.state.NFTName}
                          className="form-inline"
                          placeholder="请输入NFT名"
                          onChange={(e) =>
                            this.setState({ NFTName: e.target.value })
                          }
                        />
                        <br />
                        <button type="submit">
                            铸造
                        </button>
                    </form>
                </div>
            </div>
        )
    };
}

export default Create;