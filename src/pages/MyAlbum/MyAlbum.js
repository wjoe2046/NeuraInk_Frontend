import React from 'react';
import './MyAlbum.scss';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

const imgUrls = ['https://patch.com/img/cdn20/users/22965231/20190314/022839/styles/raw/public/processed_images/ny_credit_lukas_kloeppel-1552588036-4396.jpg','https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500','https://source.unsplash.com/lVmR1YaBGG4/800x600','https://source.unsplash.com/5KvPQc1Uklk/800x600','https://source.unsplash.com/GtYFwFrFbMA/800x600','https://source.unsplash.com/Igct8iZucFI/800x600','https://source.unsplash.com/M01DfkOqz7I/800x600','https://source.unsplash.com/MoI_cHNcSK8/800x600','https://source.unsplash.com/M0WbGFRTXqU/800x600','https://source.unsplash.com/s48nn4NtlZ4/800x600','https://source.unsplash.com/E4944K_4SvI/800x600','https://source.unsplash.com/F5Dxy9i8bxc/800x600','https://source.unsplash.com/iPum7Ket2jo/800x600'
];

class MyAlbum extends React.Component {
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
    console.log(index)
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
        <text className="gallery-title">{this.state.user.username}'s album</text>
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
export default withAuthenticator(MyAlbum)