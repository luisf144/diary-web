import React, { Component } from 'react';
import axios from 'axios';
import Notification from '../../components/Notification/Notification';
import { Empty } from 'antd';
import {POST_SERVER, HOST_SERVER} from '../../config';
import ImageList from '../../components/ImageList/ImageList';

class PostsList extends Component {
    state = {
        posts: [],
        notification: {
            type: '',
            description: ''
        }
    };

    componentDidMount(){
        this.retrievePosts();
    }

    onChangeNotification = (type, description) => {
        this.setState({
            ...this.state,
            notification: {
                type,
                description
            }
        });
    };

    retrievePosts = () => {
        axios.get(`${POST_SERVER}/`)
        .then((response) => {
            response.data.data.map((post) => {
                post.imgPath = HOST_SERVER + post.image.name;
            });
            
            this.setState({
                ...this.state,
                posts: response.data.data,
            });

        }).catch((error) => {
            this.onChangeNotification('error', "Error retrieving Posts");
        });
    };

    render() {
        return (
            <>
               
               {
                        this.state.posts.length ? 
                        (
                            <ImageList listData={this.state.posts} />            
                        ) : <Empty/>
                } 
               
               {
                   this.state.notification.type ?
                    (
                        <Notification type={this.state.notification.type} description={this.state.notification.description}/>
                    ): null
               }
    
            </>
        )
    }
}

export default PostsList;