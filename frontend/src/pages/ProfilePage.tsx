import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, FormControl } from '@mui/material';
import { IUserResponse } from '../interfaces/responses/IUserResponse';
import { handleApiSubscriptionResponse, handleGetUserResponse } from '../functions/handleApiResponseFunctions';
import { ISubscriptionModel } from '../interfaces/responses/ISubscriptionResponse';
import { getUser, getSubscription, createSubscription } from '../utils/service/UserService';
import NavBar from '../components/NavBarComponent';



export default function ProfilePage() {
    const [user, setUser] = useState<IUserResponse | null>(null);
    const [subscription, setSubscription] = useState<ISubscriptionModel | null>(null);
  
    useEffect(() => {
      getUserInfo();
    }, []);
  
    const getUserInfo = async () => {
      const response = await getUser();
      const userData = handleGetUserResponse<IUserResponse>(response);
      if(userData){
        setUser(userData);
        if (userData.subscription) {
            getSubscriptionInfo(userData.subscription.subscriptionId);
        }
      }
    };
  
    const getSubscriptionInfo = async (subscriptionId: string) => {
      const response = await getSubscription(subscriptionId);
      const subscriptionData = handleApiSubscriptionResponse(response);
      if(subscriptionData)
        setSubscription(subscriptionData);
    };
  
    const handleSubscription = async () => {
      if (subscription === null) {
        const response = await createSubscription({
            returnUrl: "http://localhost:3000/profile",
            cancelUrl: "http://localhost:3000/profile"
          });
        const subscriptionData = handleApiSubscriptionResponse(response);
        if(subscriptionData){
            setSubscription(subscriptionData);
            window.location.href = subscriptionData.links.find(link => link.rel === 'approve')?.href || '';
          } 
        }
        else {
            if(subscription.status === 'ACTIVE'){
                const cancelLink = subscription.links.find(link => link.rel === 'cancel');
                if (cancelLink) {
                window.location.href = cancelLink.href;
                }
            }
            else{
                window.location.href = subscription.links.find(link => link.rel === 'approve')?.href || '';
            }
        }
    };
  
    const renderSubscriptionStatus = () => {
      if (!user?.subscription) {
        return (
            <>
            <Typography variant="body1" color="error">
              No subscription
            </Typography>
            <Button variant="contained" color="success" onClick={handleSubscription}>
              PAY
            </Button>
          </>
        );
      } else if (subscription?.status === 'ACTIVE') {
        const activeUntil = new Date(subscription.status_update_time);
        activeUntil.setDate(activeUntil.getDate() + 30);
        return (
          <>
            <Typography variant="body1">
              Subscription active until: {activeUntil.toDateString()}
            </Typography>
            <Button variant="contained" color="error" onClick={handleSubscription}>
              CANCEL
            </Button>
          </>
        );
      } else {
        return (
            <>
            <Typography variant="body1" color="error">
              No subscription, status:{subscription?.status}
            </Typography>
            <Button variant="contained" color="success" onClick={handleSubscription}>
              PAY
            </Button>
          </>
        );
      }
    };
  
    return (
    <div>
        <NavBar pageName='Profile'/>
        <Box sx={{ width: '50%', ml:'20px', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Profile Information
          </Typography>
          {user && (
            <>
              <Typography variant="body1">Email: {user.email}</Typography>
              <Typography variant="body1">First Name: {user.firstName}</Typography>
              <Typography variant="body1">Last Name: {user.lastName}</Typography>
            </>
          )}
          <Box sx={{ mt: 3 }}>
            {renderSubscriptionStatus()}
          </Box>
        </Paper>
      </Box>
    </div>
    );
  }