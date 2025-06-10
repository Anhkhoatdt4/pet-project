import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPaymentAPI } from '~/api/order';
import Spinner from '~/components/Spinner/Spinner';
import { clearCart } from '~/store/actions/cartAction';
import { setLoading } from '~/store/features/common';

const ConfirmPayment = () => {
    const location = useLocation();
    const dispatch : any = useDispatch();
    const [errorMessage,setErrorMessage] = useState(''); 
    const navigate = useNavigate();
    const isLoading = useSelector((state: { commonState: { loading: boolean } }) => state.commonState.loading);
 
    useEffect(()=> {
        const query = new URLSearchParams(location.search);
        console.log('query : ' , query);
        const clientSecret = query.get('payment_intent_client_secret');
        const redirectStatus = query.get('redirect_status');
        const paymentIntent = query.get('payment_intent');
        if (redirectStatus === 'succeeded'){
            dispatch(setLoading(true));
            console.log('Clear cart');
            
            dispatch(clearCart());
            confirmPaymentAPI({
                paymentIntent: paymentIntent,
                status: redirectStatus
            }).then(res=>{
                const orderId = res?.orderId;
                navigate(`/orderConfirmed?orderId=${orderId}`)
            }).catch(err=>{
                setErrorMessage("Something went wrong!");
            }).finally(()=>{
                dispatch(setLoading(false));
            })
        }
        else{
            setErrorMessage('Payment Failed - '+redirectStatus)
        }
    },[dispatch, location.search, navigate]) 

    return (
    <>
    <div>Processing Payment...</div>
    {isLoading && <Spinner />}
    </>

  )
}

export default ConfirmPayment
