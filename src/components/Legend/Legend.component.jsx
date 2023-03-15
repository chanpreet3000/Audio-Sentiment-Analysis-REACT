import './Legend.styles.css'
const Legend = () => {
    return (
        <div className='main-legend'>
            <div className='main-legend__item'>
                <div className='main-legend__item-color'></div>
                <h1 className='main-legend__item-title'>Positive</h1>
            </div>
            <div className='main-legend__item'>
                <div className='main-legend__item-color'></div>
                <h1 className='main-legend__item-title'>Neutral</h1>
            </div>
            <div className='main-legend__item'>
                <div className='main-legend__item-color'></div>
                <h1 className='main-legend__item-title'>Negative</h1>
            </div>
        </div>
    );
};
export default Legend;