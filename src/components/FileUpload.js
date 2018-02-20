import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import FaFileImage from 'react-icons/lib/fa/file-image-o'

class FileUpload extends Component {


    render(){
        return(
            <div>
                <Dropzone onDrop={ this.props.onDrop } multiple={ false } 
                    className="drop_zone_wrapper">
                    <div className="image_icon"><FaFileImage/></div>
                    <div>Drop File Here</div>
                    <div>or</div>
                    <button>Click to select a file to upload</button>
                </Dropzone>
            </div>
        )
    }
}

export default FileUpload;