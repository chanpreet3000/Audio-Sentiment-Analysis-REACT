import DevItem from '../DevItem/DevItem.component';
import './Footer.styles.css'

const Footer = () => {
    const developers_list = [
        {
            student_name: "Kushagra Vohra",
            image_url: "../../images/chanpreet.jpg",
            roll_no: "A2305220451",
            batch: "B.Tech CSE-4",
            semester: "7",
            word_done: "Frontend UI-UX",
        },
        {
            student_name: "Samaksh Mittal",
            image_url: "../../images/chanpreet.jpg",
            roll_no: "A2305220253",
            batch: "B.Tech CSE-4",
            semester: "7",
            word_done: "API Integeration and model training",
        },
        {
            student_name: "Achint Khanuja",
            image_url: "../../images/chanpreet.jpg",
            roll_no: "A2305220258",
            batch: "B.Tech CSE-4",
            semester: "7",
            word_done: "Frontend and API",
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