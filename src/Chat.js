import React, { useState, useEffect, useReducer } from 'react';
import "./Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom";
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';
//import axios from './axios';

function Chat( ) {

    const [seed , setSeed] = useState('');
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();


    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId)
        .onSnapshot( (snapshot) => (
                setRoomName(snapshot.data().name)
            )
        )
        db.collection('rooms').doc(roomId)
        .collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot =>(
            setMessages(snapshot.docs.map((doc) => 
            doc.data()
            ))
        ))
        }
    },[roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);

    const sendMessage = async (e) =>{
        e.preventDefault();

        db.collection('rooms').doc(roomId)
        .collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue
            .serverTimestamp(),
        });
        setInput("");
    }
    return (
        <div className="chat">
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat_headerInfo'>
                    <h2>{roomName}</h2>
    <p> Last seen {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() }</p>
                </div>
                <div className='chat_headerRight'>
                <IconButton>
                    <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='chat_body'>
            {messages.map((message) => (
                <p className={`chat_message ${
                    user.displayName === message.name && 'chat_receiver'}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className='chat_timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
            </div>
            <div className="chat_footer">
                <IconButton >
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        type="text" placeholder="Type a message" />

                    <button onClick={sendMessage} type='submit' >Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
