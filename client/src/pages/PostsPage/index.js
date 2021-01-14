import React, { Component } from 'react';
import axios from 'axios';
import Notification from '../../components/Notification/Notification';
import PostForm from '../../components/PostForm/PostForm'
import { Card } from 'antd';
import {IMAGES_SERVER, POST_SERVER, HOST_SERVER} from '../../config';
import PostsList from './PostsList';

class PostsPage extends Component {
    state = {
        image: null,
        postForm: {
            score: 0,
            comment: ''
        },
        notification: {
            type: '',
            description: ''
        }
    };

    componentDidMount(){
        //GET image random
        this.retrieveImage();
    }

    onChangeNotification = (type, description, newObj = null) => {
        this.setState({
            ...this.state,
            ...newObj,
            notification: {
                type,
                description
            }
        });
    };

    retrieveImage = () => {
        axios.get(`${IMAGES_SERVER}/random`)
        .then((response) => {
            
            this.setState({
                ...this.state,
                image: response.data.data,
            });

        }).catch((error) => {
            this.onChangeNotification('error', "Error retrieving Image");
        });
    };

    onFormSubmit = values => {
        //Add image ID to the body params
        values = { ...values, imageId: this.state.image.id };
        
        //Submit image to the server
        axios.post(`${POST_SERVER}/new`, values)
            .then((response) => {
                this.onChangeNotification(
                    'success', 
                    "The post was successfully created",
                    { image: null }
                );

                //Reload posts
                this.props.history.go(0);
            }).catch((error) => {
                this.onChangeNotification('error', "Error creating the post");
        });
    }

    render() {
        const { image } = this.state;
        return (
            <>

            {

                this.state.image ? 
                    (
        <               Card title="Post of the Day" style={{ marginBottom: 80 }}>
                            <div className="center">
                                <React.Fragment>
                                    <img
                                        width={400}
                                        alt={`img-day`}
                                        src={HOST_SERVER + image.name}
                                    />

                                    <PostForm 
                                        initVal={this.state.postForm} 
                                        onHandleSubmit={this.onFormSubmit}
                                    />  
                                </React.Fragment>
                            </div>
                        </Card>
                    ): null
            }


            <Card title="Last Posts">
                <PostsList/>
            </Card>

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

export default PostsPage;