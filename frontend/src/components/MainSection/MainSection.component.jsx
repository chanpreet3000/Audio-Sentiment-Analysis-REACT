import './MainSection.styles.css'
import Lottie from 'react-lottie';
import animationData from '../../animations/temp2.json'

const MainSection = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderer: 'svg'
    };
    return (
        <section className='main-section'>
            <div className='main-section-title-container'>
                <span className='main-section__title highlighted'>Unleash the Power of Audio Sentiment Analysis</span>
                <span className='main-section__title'> - Transform the Way You Listen</span>
                <div className='main-section-items'>
                    <div className='main-section-item left-section'>
                        <p className='main-section__description'>Discover the emotions hidden in audio with our powerful sentiment analysis technology.
                            Gain valuable insights and improve communication like never before.</p>
                        <div className='main-section__button'><a href='#record-section'>Start using Sentivibe</a></div>
                    </div>
                    <div className='main-section-item'>
                        <Lottie options={defaultOptions} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;