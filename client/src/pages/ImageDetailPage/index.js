import React, { Component } from 'react';
import axios from 'axios';
import { Card, Empty } from 'antd';
import {POST_SERVER, HOST_SERVER} from '../../config';
import CommentList from '../../components/CommentList/CommentList';

class ImageDetailPage extends Component {
    state = {
        image: null
    };

    componentDidMount(){
        //GET details of ImgId
        this.retrieveDetailsImg();
    }

    retrieveDetailsImg = () => {
        const imgId = this.props.match.params.imgId;

        axios.get(`${POST_SERVER}/image/${imgId}`)
        .then((response) => {
            
            this.setState({
                ...this.state,
                image: response.data.data
            });

        }).catch((error) => {
            this.onChangeNotification('error', "Error retrieving Image Details");
        });
    };

    render() {
        const { image } = this.state;

        return (
            <>
            {
                image ?
                (
                    <Card title="Image Details">
                            <div className="center">
                                <React.Fragment>
                                    <img
                                        width={400}
                                        alt={`img`}
                                        src={HOST_SERVER + image.name}
                                    />

                                    <CommentList data={image.comments} totalScore={image.avgScore} /> 
                                </React.Fragment>
                            </div>
                    </Card>
                ) : <Empty/>
            }
            </>
        )
    }
}

export default ImageDetailPage;