import React, {Component} from "react";
import {connect} from "react-redux";
import {getRoomData} from "../actions";

class ChatRoom extends Component {
    componentDidMount(){
        const {roomId, logId} = this.props.match.params;
        this.props.getRoomData(roomId, logId);
    }

    render(){
        console.log("Chat Info: ", this.props.match.params);
        return(
            <div>
                <h3>Chat Room Name Goes Here</h3>
            </div>
        )
    }
}

export default connect(null, {getRoomData})(ChatRoom);