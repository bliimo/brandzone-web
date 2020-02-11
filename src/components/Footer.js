import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import Text from './Text';
import fb from '../assets/images/fb.png';
import footer from '../assets/images/footer.jpg';

const Footer = ({
  isShow,
  Clients,
  isAuthenticated,
  OnHandleToggle,
  isEvent,
  OnHandleOpenProfile
}) => {
  return (
    <React.Fragment>
      {Clients && <Clients />}
      <MDBContainer
        style={style.main}
        id='footer'
        className={`w-100 footer pl-0 m-0 d-inline-flex ${isEvent ? 'mt-10' : ''}`}
      >
        <div style={style.imgWrapper} id='footer-img'>
          <img src={footer} alt='footer' style={style.img} />
        </div>
        <MDBRow className='pt-5'>
          <MDBCol lg='6' xl='6' sm='12' className='col-footer'>
            <Text className='m-0'>
              <span style={style.brand}>Brandzone Inc.</span>
            </Text>
            <Text className='m-0 mt-2' style={style.address}>
              5388 Curie St., Brgy. Palanan, Makati City, Philippines
            </Text>
            <Text className='m-0 mt-2' style={style.address}>
              Tel. +632 8296 9044
            </Text>
            <a href='https://www.facebook.com/brandzoneinc'>
              <div className='d-flex'>
                <img src={fb} alt='fb' className='mt-2' style={style.fb} />
                <Text className='m-0 mt-2 ml-2' style={style.address}>
                  /brandzoneinc
                </Text>
              </div>
            </a>
            <a href='mailto:admin@brandzone.ph'>
              <Text className='m-0 mt-2' style={style.address}>
                admin@brandzone.ph
              </Text>
            </a>
          </MDBCol>
          <MDBCol lg='5' xl='5' sm='12' className='justify-content-center col-footer'>
            <MDBRow>
              <MDBCol lg='12' xl='12' sm='12'>
                <ul className='d-inline-block footer-link mb-0'>
                  {isAuthenticated && (
                    <li className='d-inline-block'>
                      <NavLink to='#' onClick={() => OnHandleOpenProfile()}>
                        <Text style={style.footerLink}>Edit Profile</Text>
                      </NavLink>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li className='d-inline-block' style={style.myschedLink}>
                      <NavLink
                        to='#'
                        onClick={() => {
                          isShow(false);
                        }}
                      >
                        <Text style={style.footerLink}>My Schedule</Text>
                      </NavLink>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li className='d-inline-block'>
                      <NavLink
                        to='#'
                        onClick={() => {
                          isShow(true);
                        }}
                      >
                        <Text style={style.footerLink}>
                          List of&nbsp;
                          {localStorage.getItem('userType') == 'exhibitor'
                            ? 'Participants'
                            : 'Exhibitors'}
                        </Text>
                      </NavLink>
                    </li>
                  )}
                </ul>
              </MDBCol>
              <MDBCol lg='12' xl='12' sm='12' className='footer-last-link'>
                {isEvent && (
                  <React.Fragment>
                    <ul className='d-inline-block footer-link mt-2 mb-0'>
                      <li className='d-inline-block'>
                        <NavLink to='#' onClick={e => OnHandleToggle('about')}>
                          <Text style={style.footerLink}>About us</Text>
                        </NavLink>
                      </li>
                      <li className='d-inline-block'>
                        <NavLink to='#' onClick={e => OnHandleToggle('contact')}>
                          <Text style={style.footerLink}>Contact us</Text>
                        </NavLink>
                      </li>
                    </ul>
                    <ul className='d-inline-block footer-link mb-0 mt-2'>
                      <li className='d-inline-block'>
                        <NavLink to='#' onClick={e => OnHandleToggle('privacy')}>
                          <Text style={style.footerLink}>Privacy Policy</Text>
                        </NavLink>
                      </li>
                      <li className='d-inline-block'>
                        <NavLink to='#' onClick={e => OnHandleToggle('terms')}>
                          <Text style={style.footerLink}>Terms & Schedule</Text>
                        </NavLink>
                      </li>
                    </ul>
                  </React.Fragment>
                )}
                {!isEvent && (
                  <ul className='d-inline-block footer-link mb-0 mt-2'>
                    <li className='d-inline-block'>
                      <NavLink to='#' onClick={OnHandleToggle('6')}>
                        <Text style={style.footerLink}>About us</Text>
                      </NavLink>
                    </li>
                    <li className='d-inline-block'>
                      <NavLink to='#' onClick={OnHandleToggle('7')}>
                        <Text style={style.footerLink}>Contact us</Text>
                      </NavLink>
                    </li>
                    <li className='d-inline-block'>
                      <NavLink to='#' onClick={OnHandleToggle('4')}>
                        <Text style={style.footerLink}>Privacy Policy</Text>
                      </NavLink>
                    </li>
                    <li className='d-inline-block'>
                      <NavLink to='#' onClick={OnHandleToggle('5')}>
                        <Text style={style.footerLink}>Terms & Conditions</Text>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer className='w-100 footer text-center p-3' style={style.mainBottom}>
        <Text style={style.bottomText}>
          <strong style={style.brandzone}>Brandzone Inc.</strong> &copy; Copyright&nbsp;
          {new Date().getFullYear()} - all rights reserved
        </Text>
      </MDBContainer>
    </React.Fragment>
  );
};

const style = {
  brandzone: {
    fontWeight: 'bold'
  },
  bottomText: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 11,
    position: 'relative',
    margin: 0
  },
  main: {
    background: '#fff'
  },
  mainBottom: {
    background: '#37424B'
  },
  brand: {
    color: '#37424B',
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  address: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: '#37424B'
  },
  footerLink: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: '#37424B',
    margin: 0
  },
  myschedLink: {
    marginLeft: '1.3em'
  },
  img: {
    height: 200,
    position: 'relative',
    left: '4em'
  },
  imgWrapper: {
    padding: '2em 1em',
    background: '#fff'
  },
  fb: {
    height: 20
  }
};
export default Footer;
