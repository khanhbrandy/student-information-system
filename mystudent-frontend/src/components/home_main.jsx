import React from 'react';

const HomeMain = () => {
    return (
        <>
            <section id="main">
                <article id="overview">
                    <img src={require("../images/logo_datapot.png")} alt="Datapot" />
                    <h1>ABOUT US</h1>
                    <p>After years working with data, we do realize that data is becoming an ever-increasing part of the knowledge-based economy, yet the talent to extract information and value from complicated data is scarce. We established Datapot with the learners' perspective in mind since 2018. </p>
                    <h1>CONTACT US</h1>
                    <ul>
                        <li className="jobs"><strong>Website</strong>: <a href="http://datapot.vn">http://datapot.vn</a></li>
                        <li className="jobs"><strong>Fanpage</strong>: <a href="https://www.facebook.com/DatapotAnalytics">https://www.facebook.com/DatapotAnalytics</a></li>
                        <li className="jobs"><strong>Email</strong>: <a href="mailto:contact@datapot.vn">contact@datapot.vn</a></li>
                        <li className="jobs"><strong>Hotline</strong>: (+84) 762 266 990</li>
                        <li className="jobs"><strong>Address</strong>: 9th floor, Capital building, 36 Giang Van Minh, Ba Dinh Dist, Hanoi</li>

                    </ul>
                </article>
            </section>
        </>
    );
}

export default HomeMain;