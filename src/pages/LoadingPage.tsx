import React from 'react';
import ReactLoading from 'react-loading';

interface LoadingProps {
    type: "spin";
    color: string;
  }

const LoadingPage : React.FC<LoadingProps> = ({type, color}) => {
  return (
    <ReactLoading type={type} color={color} height={'5%'} width={'5%'}/>
  )
}

export default LoadingPage