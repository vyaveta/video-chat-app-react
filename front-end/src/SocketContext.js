import React, {createContext , useState , useRef, useEffect } from 'react'
import {io} from 'socket.io-client'
import Peer from 'simple-peer'

const socketContext = createContext()

const socket = io('http://localhost:7000')

const ContextProvider = ({children}) => {
    const [count,setCount] = useState(0)
    const [stream , setStream] = useState(null)
    const [me , setMe] = useState('')
    const [call , setCall] = useState({})
    const [callAccepted , setCallAccepted] = useState(false)
    const [callEnded , setCallEnded] = useState(false)
    const [name , setName] = useState('')

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    const settingUpStream = async () => {
        await navigator.mediaDevices.getUserMedia({video: true , audio: true}).then( async(currentStream) => {
            await setStream(currentStream)
            console.log(myVideo)
            console.log(myVideo.current,'is the my video shit')
            myVideo.current.srcObject = await currentStream
        }).catch((err) => {
            console.log(err,'is the error that occured while setting up the camera!!')
        })

        socket.on('me' , (id) => setMe(id) )

        socket.on('callUser' , ({from , name: callerName , signal}) => {
            setCall({ isReceivedCall: true, from , name: callerName , signal})
        })
       }

    useEffect(() => {
       settingUpStream()
    },[])

    useEffect(() => {
        setTimeout(() => {
            setCount(count+1)
        })
    },[])

    useEffect(() => {
        settingUpStream()
    },[count])

    const  answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false , trickle: false , stream })

        peer.on('signal' , (data) => {
            socket.emit('answerCall' , {signal: data , to: call.from})
        })  
        peer.on('stream' , (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        peer.signal(call.signal)

        connectionRef.current = peer
    }
    const callUser = (id) => {
        const peer = new Peer({ initiator: false , trickle: false , stream })

        peer.on('signal' , (data) => {
            socket.emit('callUser' , { userToCall: id , signalData: data , from: me , name })
        })  
        peer.on('stream' , (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        
        socket.on("callAccepted" , (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }
    const leavecall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()

        window.location.reload()
    }
    return(
        <socketContext.Provider value={{call, callAccepted,myVideo,userVideo,stream,name,setName,callEnded,me,callUser,leavecall,answerCall,}}>
            {children}
        </socketContext.Provider>
    )
}

export {ContextProvider , socketContext}