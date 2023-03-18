import DevItem from '../DevItem/DevItem.component';
import './Footer.styles.css'

const Footer = () => {
    const developers_list = [
        {
            student_name: "Chanpreet Singh",
            image_url: "../../images/chanpreet.jpg",
            roll_no: "2020UCB6038",
            batch: "B.Tech CSDA",
            semester: "6",
            word_done: "Frontend UI-UX",
        },
        {
            student_name: "Aryan Singh",
            image_url: "../../images/chanpreet.jpg",
            roll_no: "2020UCB6053",
            batch: "B.Tech CSDA",
            semester: "6",
            word_done: "API Integeration and model training",
        },
        {
            student_name: "Ankit Singh",
            image_url: "../../images/chanpreet.jpg",
            roll_no: "2020UCB6039",
            batch: "B.Tech CSDA",
            semester: "6",
            word_done: "Frontend and API",
        },
        {
            student_name: "Aashish Garg",
            image_url: "../../images/chanpreet.jpg",
            roll_no: "2020UCB6029",
            batch: "B.Tech CSDA",
            semester: "6",
            word_done: "Model Training and Testing dataset",
        },
    ]
    return (
        <section className='main-footer' id="main-footer">
            <h1>Developers of Sentivibe</h1>
            <div className='main-footer__items'>
                {
                    developers_list.map((item, key) => {
                        return (
                            <DevItem dev_info={item} key={key} />
                        );
                    })
                }
            </div>
        </section>
    );
}
export default Footer;