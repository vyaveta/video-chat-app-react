import React, { useContext } from 'react'
import { socketContext } from '../SocketContext'
import MeetingPlaceIndividual from './MeetingPlaceIndividual/MeetingPlaceIndividual'

const VideoPlayer = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(socketContext)
  console.log(myVideo.current ,'is the report from the video player component over over!!!')

  return (
    <div className='video-player'>
      {
        stream && (
          <MeetingPlaceIndividual>
            <div className="video-player__name-div">{name || 'Name'}</div>
            <video playsInline muted ref={myVideo} autoPlay className='video' />
          </MeetingPlaceIndividual>
        )
      }
      {
        callAccepted && !callEnded && (
          <MeetingPlaceIndividual>
            <div className="video-player__name-div">{call.name || 'Name'}</div>
            <video playsInline muted ref={userVideo} autoPlay className='video' />
          </MeetingPlaceIndividual>
        )
      }
    </div>
  )
}

export default VideoPlayer