/**
*
* Video
*
*/

import React from 'react';


class Video extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className='container'>
        <div className='row'>
            <div className='row' id='putVidsHere'>
              <div 
                className='col s12 m9'
                style={{position: 'relative'}}>
                <video
                  style={{'maxHeight': window.innerHeight * .60 + 'px',
                    'maxWidth': '95%',
                    display: 'inline',
                    'zIndex': 1,
                    position: 'absolute' }}
                  controls
                  className="responsive-video"
                  id="remoteVideo"
                  poster="/static/video.jpg"
                  autoPlay>
                </video>
                <video
                  style={{'maxWidth': window.innerWidth * .10 + 'px', 
                          display: 'inline', 
                          'minWidth': '5%',
                          float: 'left',
                          'zIndex': 10,
                          position: 'absolute'}}
                  className='responsive-video' 
                  id='localVideo'
                  poster="/static/video.jpg"
                  autoPlay>
                </video>
              </div>
            </div>  
        </div>
        <div className='row'>

        </div>
      </div>
    );
  }
}


export default Video;
