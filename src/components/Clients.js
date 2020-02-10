import React from 'react';
import { MDBContainer } from 'mdbreact';
import Text from './Text';
import client1 from '../assets/images/clients/partners1-educanada@2x.png';
import client2 from '../assets/images/clients/partners1-Aus@2x.png';
import client3 from '../assets/images/clients/partners1-enz@2x.png';
import client4 from '../assets/images/clients/partners2-bc@2x.png';
import client5 from '../assets/images/clients/partners2-cican@2x.png';
import client6 from '../assets/images/clients/partners3-idp@2x.png';
import client7 from '../assets/images/clients/partners3-fortrust@2x.png';
import client8 from '../assets/images/clients/partners3-eca@2x.png';
import client9 from '../assets/images/clients/partners3-ielts@2x.png';
import client10 from '../assets/images/clients/partners4-scotiabank@2x.png';
import client11 from '../assets/images/clients/partners4-alberta@2x.png';
import client12 from '../assets/images/clients/partners4-brandwatch@2x.png';
import client13 from '../assets/images/clients/partners4-aircanada@2x.png';
import client14 from '../assets/images/clients/partners4-PAL@2x.png';
import client15 from '../assets/images/clients/partners4-qantas@2x.png';
import client16 from '../assets/images/clients/partners4-pldt@2x.png';
import client17 from '../assets/images/clients/partners4-laybare@2x.png';
import client18 from '../assets/images/clients/partners4-anz@2x.png';
import client19 from '../assets/images/clients/partners2-studyperth@2x.png';
import client20 from '../assets/images/clients/partners2-cbie@2x.png';
import client21 from '../assets/images/clients/partners2-edunova@2x.png';

const Clients = () => {
  return (
    <MDBContainer style={style.client} className='w-100 m-0 clients'>
      <Text style={style.clientTitle} className='mb-2'>
        OUR CLIENTS
      </Text>
      <hr style={style.tabTitleHeaderHr} />
      <MDBContainer className='clients text-center mt-5'>
        <img src={client1} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client2} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client3} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client21} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client4} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client5} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client6} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client7} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client8} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client9} style={style.clientImg} className='clientImg' alt='client' />
      </MDBContainer>
      <MDBContainer className='clients text-center'>
        <img src={client10} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client11} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client12} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client13} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client14} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client15} style={style.clientImg} className='clientImg' alt='client' />
      </MDBContainer>
      <MDBContainer className='clients text-center'>
        <img src={client16} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client17} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client18} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client19} style={style.clientImg} className='clientImg' alt='client' />
        <img src={client20} style={style.clientImg} className='clientImg' alt='client' />
      </MDBContainer>
    </MDBContainer>
  );
};

export default Clients;

const style = {
  client: {
    backgroundColor: '#37424B',
    paddingTop: '4em',
    paddingBottom: '4em'
  },
  clientTitle: {
    fontSize: 39,
    letterSpacing: 4,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Harabara',
    textAlign: 'center',
    height: 35
  },
  clientImg: {
    height: 68,
    width: 'auto'
  },
  rowClient: {
    justifyContent: 'center'
  },
  tabTitleHeaderHr: {
    borderBottom: '3.2px solid #8ec63f',
    width: '5.5em',
    position: 'relative',
    margin: 'auto',
    top: '1em'
  }
};
