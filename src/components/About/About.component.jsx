import Navbar from '../Navbar/Navbar.component';
import Footer from '../Footer/Footer.component';
import './About.styles.css'
import animationData from '../../animations/temp3.json'
import animationData2 from '../../animations/temp4.json'
import Lottie from 'react-lottie';

const About = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderer: 'svg'
    };
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        renderer: 'svg'
    };
    return (
        <section className='about-section'>
            <Navbar />
            <section className='about-main-section'>
                <span className='about-section__title highlighted'>
                    Welcome to Sentivibe
                </span>
                <span className='about-section__title'> - the ultimate destination for unlocking emotions in audio.
                </span>
                <div className='lottie-animation-background'>
                    <Lottie options={defaultOptions} />
                </div>
            </section>
            <section className='work-section'>
                <div class="custom-shape-divider-top-1678956511">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z" class="shape-fill"></path>
                    </svg>
                </div>
                <h1 className='work-section-heading'>Our SNA Project</h1>
                <div className='work-section-container'>
                    <div className='container-content'>
                        <div className='container-content-row'>
                            <div className='container-content-item'>
                                <div className='item-title'>Upload audio content</div>
                                <div className='item-description'>Start by uploading the audio content you want to analyze to our platform. We support a wide range of audio formats, including MP3, WAV, and more.</div>
                            </div>
                            <div className='container-content-item'>
                                <div className='item-title'>Analyze sentiment</div>
                                <div className='item-description'>Our powerful sentiment analysis algorithms will analyze the audio content and identify the emotions expressed within it. We use machine learning and natural language processing techniques to achieve accurate and reliable results.</div>
                            </div>
                        </div>
                        <div className='container-content-row'>
                            <div className='container-content-item'>
                                <div className='item-title'>Receive detailed insights</div>
                                <div className='item-description'>Once the analysis is complete, you'll receive a detailed report that breaks down the sentiment of the audio content. You'll be able to see the overall sentiment (positive, negative, or neutral) as well as a breakdown of the emotions expressed throughout the audio content.</div>
                            </div>
                            <div className='container-content-item'>
                                <div className='item-title'>Improve communication</div>
                                <div className='item-description'>Armed with this information, you can improve communication with your audience by tailoring your message to the emotional context of the audio content. You can also use the insights to make data-driven decisions that drive better outcomes.</div>
                            </div>
                        </div>
                    </div>
                    <div className='container-image'>
                        <Lottie options={defaultOptions2} />
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    );
}
export default About;