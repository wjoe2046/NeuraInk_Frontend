import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import './MyAlbum.scss';

const imgUrls = ['https://techcrunch.com/wp-content/uploads/2015/10/screen-shot-2015-10-08-at-4-20-16-pm.png?w=730&crop=1','https://lh3.googleusercontent.com/proxy/g8CctYiINyG4oqvdYmckxWRSckd6KM5O0C0oJIF_8WOUFBxQIlR01z3-TJ9wbioJ_tPv3w8RJjJg5F2LpukiSb5XxR60Fnf2xA','https://source.unsplash.com/lVmR1YaBGG4/800x600','https://source.unsplash.com/5KvPQc1Uklk/800x600','https://source.unsplash.com/GtYFwFrFbMA/800x600','https://source.unsplash.com/Igct8iZucFI/800x600','https://source.unsplash.com/M01DfkOqz7I/800x600','https://source.unsplash.com/MoI_cHNcSK8/800x600','https://source.unsplash.com/M0WbGFRTXqU/800x600','https://source.unsplash.com/s48nn4NtlZ4/800x600','https://source.unsplash.com/E4944K_4SvI/800x600','https://source.unsplash.com/F5Dxy9i8bxc/800x600','https://source.unsplash.com/iPum7Ket2jo/800x600'
];

export default class MyAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null, user: {} };
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
  }
  renderImageContent(src, index) {
    return (
      <div onClick={(e) => this.openModal(e, index)}>
        <img src={src} key={src} />
      </div>
    ) 
  }
  openModal(e, index) {
    this.setState ({ currentIndex: index });
  }
  closeModal(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState ({ currentIndex: null });
  }
  findPrev(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex -1
    }));
  }
  findNext(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => this.setState({"user": user}));
  }
  render() {
    return (
      <div className="gallery-container">
        <h2>🔥 {this.state.user.username}'s album 🔥</h2>
        <div className="gallery-grid">
          {imgUrls.map(this.renderImageContent)}
        </div>
        <GalleryModal 
          closeModal={this.closeModal} 
          findPrev={this.findPrev} 
          findNext={this.findNext} 
          hasPrev={this.state.currentIndex > 0} 
          hasNext={this.state.currentIndex + 1 < imgUrls.length} 
          src={imgUrls[this.state.currentIndex]} 
        />
      </div>
    )
  }
}

class GalleryModal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }  
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27)
      this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev)
      this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext)
      this.props.findNext();
  }
  render () {
    const { closeModal, hasNext, hasPrev, findNext, findPrev, src } = this.props;
    if (!src) {
      console.log('whut')
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div isOpen={!!src} className="modal">
          <div className='modal-body'>
            <a href="#" className='modal-close' onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>
            {hasPrev && <a href="#" className='modal-prev' onClick={findPrev} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
            {hasNext && <a href="#" className='modal-next' onClick={findNext} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
            <img className='modal-img' src={src} />
          </div>
        </div>
      </div>
    )
  }
}
