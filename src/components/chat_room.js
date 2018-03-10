import React, {Component} from "react";
import {connect} from "react-redux";
import {db} from "../firebase"
import {getRoomData, getChatLog, sendNewMessage} from "../actions";

class ChatRoom extends Component {
    constructor (props){
        super(props);
        this.state = {
            message: ''
        }
    }
    componentDidMount(){
        console.log("before destructure", this.props.match)
        const {roomId, logId} = this.props.match.params;
        this.props.getRoomData(roomId, logId);
        console.log("after get room data", roomId, logId);
        db.ref(`/chat-logs/${logId}`).on("value", snapshot => {
            console.log("SNAPSHOT DID MOUNT", snapshot.val());
            this.props.getChatLog(snapshot.val());
        })
    }
    componentWillUnmount(){
        db.ref(`/chat-logs/${this.props.match.params.logId}`).off();
    }
    sendMessage(e){
        e.preventDefault();
        // console.log("sending message");

        this.props.sendNewMessage(this.props.roomInfo.chatLogId, this.state.message);
        this.setState({
            message: ""
        });
    }
    render(){
        console.log("Chat Info: ", this.props);

        const {name} = this.props.roomInfo;
        const {chatLog} = this.props;
        // console.log("This is the chat log", this.props);
        const messages = Object.keys(chatLog).reverse().map((key) => {
            return <li key={key} className="collection-item">{chatLog[key]}</li>
        });

        return(
            <div>
                <h3>{name ? name : "Loading..."}</h3>
                <form onSubmit={this.sendMessage.bind(this)}>
                    <label>Enter Message:</label>
                    <input type="text" value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                    <button>Send Message</button>
                </form>

                <ul className="collection">{messages}</ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        roomInfo: state.chatReducer.currentRoom,
        chatLog: state.chatReducer.chatLog
    }
}

export default connect(mapStateToProps, {getRoomData, getChatLog, sendNewMessage})(ChatRoom);