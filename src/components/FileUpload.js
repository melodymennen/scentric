import React, { Component } from 'react'
// import request from 'superagent';
import Dropzone from 'react-dropzone'

class FileUpload extends Component {


    render(){
        return(
            <div>
                <Dropzone onDrop={ this.props.onDrop } multiple={ false } className="dropzone input big-input" >
                    <div className="droptext">Drop a file here, or click to select a file to upload.</div>
                </Dropzone>
            </div>
        )
    }
}

export default FileUpload;