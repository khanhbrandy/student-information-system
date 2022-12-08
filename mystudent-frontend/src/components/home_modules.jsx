import React from 'react';
const HomeModules = () => {
    const data = [
        {
            title: "Our vision",
            content: "We aim to offer courses specialized in data analytics that would require no coding skills or particular working experience, removing all unnecessary obstacles in the way of our students becoming skilled workers in this field. Last but not least, we are here to develop cutting-edge data science capabilities in a collaborative environment and capture new market opportunities, boost productivity and connect experts."
        },
        {
            title: "Syllabus and Instructors",
            content: "Our training facility in Hanoi, Vietnam offers courses that follow the Microsoft Official Program (MOC) and are taught by our Microsoft Certified Trainers. We ensure our instructors are competent and experienced, thoroughly understanding the material and always have the most up-to-date training. You can count on DATAPOT to help you obtain Microsoft certification."
        },
        {
            title: "Facilities and Resources",
            content: "We offer training both on premises and through live distance learning which enables students to attend courses independent to their location. At DATAPOT, all online courses are conducted on the Microsoft Teams platform with endorsed high quality Microsoft learning documents, resources."
        }
    ];
    const modules = data.map((module, index) => {
        return <article key = {index}><h1>{module.title}</h1><p>{module.content}</p></article>
    })

    return (
        <>
        <section id="modules">{modules}</section>
        </>
    );
}

export default HomeModules;