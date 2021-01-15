import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import CoverCard from '../../components/CoverCard/CoverCard';
import Notification from '../../components/Notification/Notification';
import { Col, Row, Card } from 'antd';
import {IMAGES_SERVER, HOST_SERVER} from '../../config';

class ImagesPage extends Component {
    state = {
        file: null,
        images: [],
        notification: {
            type: '',
            description: ''
        }
    };

    componentDidMount(){
        //GET all images for the user logged in
        this.retrieveImages();
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

    retrieveImages = () => {
        const userId = localStorage.getItem('userId');
        axios.get(`${IMAGES_SERVER}/user/${userId}`)
        .then((response) => {
            
            //Clean notification every time that refresh when upload an Image
            this.setState({
                ...this.state,
                images: response.data.data,
                notification: { type: '', description: '' }
            });

        }).catch((error) => {
            this.onChangeNotification('error', "Error retrieving Images for this user");
        });
    };

    onDeleteImage = imgId => {
        axios.delete(`${IMAGES_SERVER}/${imgId}`)
            .then((response) => {
                this.onChangeNotification('success', "The image was successfully deleted");

                //Refresh images
                this.retrieveImages();
            }).catch((error) => {
                this.onChangeNotification('error', "Error deleting the image");
        });
    };

    onDetailsImage = imgId => {
        //Go to details page
        this.props.history.push("/images/" + imgId);
    };

    onFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('file',this.state.file);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        //Submit image to the server
        axios.post("/api/images/new",formData,config)
            .then((response) => {
                this.onChangeNotification('success', "The image was successfully uploaded");

                //Refresh images
                this.retrieveImages();
            }).catch((error) => {
                this.onChangeNotification('error', "Error uploading the image");
        });
    }

    onChange = e => {
        this.setState({ ...this.state, file:e.target.files[0] });
    }

    render() {
        return (
            <>
                {

                    this.state.images.length ?
                    (
                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                            {
                                this.state.images.map((image, i) =>{
                                    return(
                                        <Col span={8} key={i}>
                                            <CoverCard 
                                                id={image.id} 
                                                url={HOST_SERVER + image.name} 
                                                handleDeleteClick={this.onDeleteImage}
                                                handleDetailsClick={this.onDetailsImage}
                                            />
                                        </Col>
                                    );
                                })
                            }
                            </Row>
                        </div>
                    ): null

                }
                
                <Card title="Add a new Image">
                    <div className="center">
                        <form onSubmit={this.onFormSubmit}>
                            <input type="file" name="file" onChange= {this.onChange} accept="image/*"/>
                            <button type="submit" disabled={!this.state.file}>Upload</button>
                        </form>
                    </div>
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

export default withRouter(ImagesPage);