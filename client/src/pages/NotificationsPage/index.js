import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Card, Empty } from 'antd';
import {NOTIFICATION_SERVER} from '../../config';
import NotificationList from '../../components/NotificationList/NotificationList';

class NotificationsPage extends Component {
    state = {
        notifications: []
    };

    componentDidMount(){
        //GET all notifications
        this.retrieveNotifications();
    }

    retrieveNotifications = () => {
        axios.get(`${NOTIFICATION_SERVER}/`)
        .then((response) => {
            
            this.setState({
                ...this.state,
                notifications: response.data.data
            });

        }).catch((error) => {
            this.onChangeNotification('error', "Error retrieving Notifications");
        });
    };

    onNotificationClick = notification => {
        switch (notification.type) {
            case 'image_score':
              this.props.history.push(`/images/${notification.refId}`);
              break;
            
            default:
              console.log(`Unknow notification`);
          }
    };

    render() {
        const { notifications } = this.state;

        return (
            <>
            {
                notifications.length ?
                (
                    <Card title="Notifications">
                        <NotificationList data={notifications} handleClickAction={this.onNotificationClick} /> 
                    </Card>
                ) : <Empty/>
            }
            </>
        )
    }
}

export default withRouter(NotificationsPage);