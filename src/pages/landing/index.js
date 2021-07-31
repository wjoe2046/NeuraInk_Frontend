import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import teamMember1Url from 'assets/images/team_member_1.jpg';
import ReactPlayer from 'react-player/youtube';
import { AuthModal } from 'components/auth';
import { setActiveComponent, openModal } from 'components/auth/slice';
import { UI_COMPONENTS } from 'components/auth/constants';
import galleryImage1Url from 'assets/images/gallery_image_1.jpg';
import galleryImage2Url from 'assets/images/gallery_image_2.jpg';
import galleryImage3Url from 'assets/images/gallery_image_3.jpg';
import galleryImage4Url from 'assets/images/gallery_image_4.jpg';
import styles from './style.module.css';
import headerVideo from '../../assets/videos/ink_wash.mp4';

const Landing = () => {
  const dispatch = useDispatch();

  const openSigninModal = () => {
    dispatch(setActiveComponent(UI_COMPONENTS.SIGNIN));
    dispatch(openModal());
  };

  const openSignupModal = () => {
    dispatch(setActiveComponent(UI_COMPONENTS.SIGNUP));
    dispatch(openModal());
  };

  return (
    <>
      {/* Auth Modal */}
      <AuthModal />
      {/* ***** Header Section ***** */}
      <section className='relative bg-gray-200'>
        {/* App bar */}
        <nav className='w-full h-13 block absolute top-13 left-0 z-40'>
          <div className='h-full w-3/5 float-left text-right'>
            <div className='bg-appYellow-700 w-auto inline-block h-full'>
              <ul className='flex h-full items-center'>
                <li>
                  <Link
                    to='/'
                    className='block px-4 text-0.9 uppercase text-appDark-700 font-bold'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='block px-4 text-0.9 uppercase text-appDark-700 font-bold'
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='block px-4 text-0.9 uppercase text-appDark-700 font-bold'
                  >
                    Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='h-full w-2/5 float-left text-left'>
            <div className='bg-appDark-700 w-auto inline-block h-full text-appYellow-700'>
              <ul className='flex h-full items-center'>
                <li>
                  <Link
                    to='/'
                    className='block px-4 text-0.9 uppercase text-appYellow-700 font-bold'
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <button
                    to='/'
                    className='bg-transparent outline-none border-none block px-4 text-0.9 uppercase text-appYellow-700 font-bold'
                    onClick={openSigninModal}
                  >
                    log in
                  </button>
                </li>
                <li>
                  <button
                    to='/'
                    className='bg-transparent outline-none border-none block px-4 text-0.9 uppercase text-appYellow-700 font-bold'
                    onClick={openSignupModal}
                  >
                    Signup
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Logo */}
        <div className='absolute w-full h-26 top-0 left-0 z-30'>
          <div className='max-w-7xl px-4 h-full pt-13 mx-auto'>
            <div className='flex justify-between h-full relative'>
              <Link
                to='/'
                className='block text-white text-2xl font-bold uppercase'
              >
                <span className={styles.headerLogo}>Neuraink</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className={styles.headerMain}>
          {/* <div className={styles.headerImage} /> */}
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={headerVideo} type='video/mp4' />
          </video>

          <div className='absolute top-0 left-0 w-full h-full z-10'>
            <div className='absolute top-0 left-0 h-full w-3/5 bg-appDark-700 opacity-80 z-20' />
            <div
              className='absolute top-0 h-full w-2/5 bg-appYellow-700 opacity-80 z-20'
              style={{ left: '60%' }}
            />
          </div>

          <div className='w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-30'>
            <div className='w-3/5 text-white float-left'>
              <div className='float-right pr-3 pl-8 border-l-8 border-appYellow-700 text-appYellow-700 font-normal'>
                <h1 className='font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8.5xl uppercase'>
                  Inkwash
                </h1>
                <h4 className='mt-3 text-lg sm:mt-4 sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold'>
                  Style Transfer
                </h4>
              </div>
            </div>
            <div className='w-2/5 float-right text-appDark-700'>
              <div className='float-left pl-5'>
                <h1 className='font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8.5xl uppercase'>
                  AI
                </h1>
              </div>
            </div>
          </div>
        </header>
      </section>

      {/* ***** How It Works Section ***** */}
      <section className='py-28 text-center' id='howItWorks'>
        <p className='font-bold text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl uppercase'>
          how it works
        </p>
        {/* Divider */}
        <div className='flex justify-center'>
          <div className='my-12 w-56 h-0.25 bg-appYellow-700 relative'>
            <div className='w-16 h-2 bg-appYellow-700 absolute top-0 left-1/2 transform -translate-x-1/2' />
          </div>
        </div>

        <p className='text-base text-gray-700'>
          Create inspiring visual content in a collaboration with our AI enabled
          tools
        </p>

        {/* Grid */}
        <div className='mt-20 max-w-7xl mx-auto px-4'>
          <div className='flex -my-6'>
            <div className='w-4/12 p-6'>
              <p className='mb-2 font-bold text-xl text-gray-900'>Step 1</p>
              <p className='text-sm text-gray-700'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                dignissim consequat tortor. Pellentesque habitant morbi
                tristique senectus et netus et.
              </p>
            </div>
            <div className='w-4/12 p-6 '>
              <p className='mb-2 font-bold text-xl text-gray-900'>Step 2</p>
              <p className='text-sm text-gray-700'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                dignissim consequat tortor. Pellentesque habitant morbi
                tristique senectus et netus et.
              </p>
            </div>
            <div className='w-4/12 p-6'>
              <p className='mb-2 font-bold text-xl text-gray-900'>Step 3</p>
              <p className='text-sm text-gray-700'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                dignissim consequat tortor. Pellentesque habitant morbi
                tristique senectus et netus et.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-20'>
          <button className='py-3 px-7 border-none bg-appYellow-900 text-white font-bold text-sm uppercase'>
            get started
          </button>
        </div>

        <p className='text-base text-gray-700 mt-12'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          condimentum.
        </p>
        {/* Youtube video */}
        <div className='mt-12 px-4 max-w-lg mx-auto'>
          <div className={styles.playerWrapper}>
            <ReactPlayer
              url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
              width='100%'
              height='100%'
              className={styles.reactPlayer}
            />
          </div>
        </div>
      </section>

      {/* ***** Team Section ***** */}
      <section className={styles.teamMembersSection}>
        <div className='h-full w-full bg-appDark-700 opacity-80 absolute top-0 left-0 z-10' />
        <div className='relative z-20'>
          <div className='max-w-7xl px-4 py-28 mx-auto text-center text-white'>
            <p className='font-bold text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl uppercase'>
              team members
            </p>
            {/* Divider */}
            <div className='flex justify-center'>
              <div className='mt-12 w-56 h-0.25 bg-appYellow-700 relative'>
                <div className='w-16 h-2 bg-appYellow-700 absolute top-0 left-1/2 transform -translate-x-1/2' />
              </div>
            </div>

            {/* Grid */}
            <div className='mx-auto max-w-7xl px-4 mt-20'>
              <div className='flex -mx-3 -my-3'>
                <div className='p-3 w-4/12'>
                  <div className='bg-appDark-700 opacity-80 flex flex-col justify-center items-center p-12 rounded-lg'>
                    <div
                      className={styles.teamMemberAvatar}
                      style={{
                        backgroundImage: `url(${teamMember1Url})`,
                      }}
                    />
                    <div className='my-6 w-7 h-1 bg-appYellow-700 inline-block' />
                    <p>Google's computers are making thousands as artists</p>
                  </div>
                </div>

                <div className='p-3 w-4/12'>
                  <div className='bg-appDark-700 opacity-80 flex flex-col justify-center items-center p-12 rounded-lg'>
                    <div
                      className={styles.teamMemberAvatar}
                      style={{
                        backgroundImage: `url(${teamMember1Url})`,
                      }}
                    />
                    <div className='my-6 w-7 h-1 bg-appYellow-700 inline-block' />
                    <p>Google's computers are making thousands as artists</p>
                  </div>
                </div>

                <div className='p-3 w-4/12'>
                  <div className='bg-appDark-700 opacity-80 flex flex-col justify-center items-center p-12 rounded-lg'>
                    <div
                      className={styles.teamMemberAvatar}
                      style={{
                        backgroundImage: `url(${teamMember1Url})`,
                      }}
                    />
                    <div className='my-6 w-7 h-1 bg-appYellow-700 inline-block' />
                    <p>Google's computers are making thousands as artists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ***** Gallery Section ***** */}
      <section className='py-28 text-center'>
        <p className='font-bold text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl uppercase'>
          our gallery
        </p>
        {/* Divider */}
        <div className='flex justify-center'>
          <div className='mt-12 w-56 h-0.25 bg-appYellow-700 relative'>
            <div className='w-16 h-2 bg-appYellow-700 absolute top-0 left-1/2 transform -translate-x-1/2' />
          </div>
        </div>

        <div className='px-4 max-w-7xl mx-auto'>
          <div className='mt-20 flex flex-wrap'>
            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage1Url}
                alt='gallery'
                className='block w-full h-full'
              />
            </div>
            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage2Url}
                alt='gallery'
                className='block w-full h-full'
              />
            </div>
            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage1Url}
                alt='gallery'
                className='block w-full h-auto'
              />
            </div>
            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage2Url}
                alt='gallery'
                className='block w-full h-full'
              />
            </div>

            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage3Url}
                alt='gallery'
                className='block w-full h-full'
              />
            </div>

            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage4Url}
                alt='gallery'
                className='block w-full h-full'
              />
            </div>

            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage3Url}
                alt='gallery'
                className='block w-full h-full'
              />
            </div>

            <div className='w-full sm:w-1/2 md:w-4/12 lg:w-3/12'>
              <img
                src={galleryImage4Url}
                alt='gallery'
                className='block w-full h-full'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact us section */}
      <section className={styles.contactUsSection}>
        <div className='h-full w-full bg-appDark-700 opacity-80 absolute top-0 left-0 z-10' />
        <div className='py-28 relative text-white z-20'>
          <p className='font-bold text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl uppercase'>
            Contact Us
          </p>
          {/* Divider */}
          <div className='flex justify-center'>
            <div className='mt-12 w-56 h-0.25 bg-appYellow-700 relative'>
              <div className='w-16 h-2 bg-appYellow-700 absolute top-0 left-1/2 transform -translate-x-1/2' />
            </div>
          </div>

          <p className='mt-12 text-base'>Anything you'd like to discuss?</p>
          <p className='mt-20 text-4xl'>expample@mail.com</p>
        </div>
      </section>
      {/* About section */}
      <section className='bg-appDark-700'>
        <div className='text-center text-white py-28'>
          <p className='font-bold text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl uppercase'>
            About us
          </p>
          {/* Divider */}
          <div className='flex justify-center'>
            <div className='mt-12 w-56 h-0.25 bg-appYellow-700 relative'>
              <div className='w-16 h-2 bg-appYellow-700 absolute top-0 left-1/2 transform -translate-x-1/2' />
            </div>
          </div>

          <div className='mt-12 px-4 max-w-2xl mx-auto'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              condimentum sed nibh ut bibendum. Nunc lacinia facilisis justo, ac
              tristique ipsum vestibulum a. Phasellus non odio nec arcu aliquet
              volutpat elementum quis lacus Donec.
            </p>

            <p className='mt-2'>
              Donec ullamcorper neque a vulputate elementum. Nulla vestibulum
              pellentesque facilisis. Etiam quis arcu tincidunt, volutpat purus
              vitae,
            </p>
          </div>
        </div>
      </section>

      <footer className='bg-black py-12'>
        <p className='text-sm text-white text-center'>
          &copy; 2021 All rights rserved by neuralnk
        </p>
      </footer>
    </>
  );
};

export default Landing;
