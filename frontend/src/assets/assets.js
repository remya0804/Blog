import p_1 from '../assets/p_1.jpg'
import p_2 from '../assets/p_2.jpeg'
import p_3 from '../assets/p_3.jpg'

import auth_1 from '../assets/auth_1.jpeg'
import auth_2 from '../assets/auth_2.jpeg'
import auth_3 from '../assets/auth_3.jpeg'

export const postArray = [
    {

        _id:1,
        thumbnail:p_1,
        category:"Food",
        title:"The Delightful World of Fruits: Nature's Sweet Treats",
        desc:"Fruits are not only a feast for the eyes with their vibrant colors and attractive shapes but also an essential part of a healthy diet. Packed with vitamins, minerals, fiber, and antioxidants, fruits offer a natural way to nourish the body while satisfying our taste buds. From the sweet juiciness of berries to the tropical allure of pineapples, the variety of fruits available worldwide is endless.",
        authorId:2,
        author:'Sarah Johnson',
        author_img: auth_1
    },
    {

        _id:2,
        thumbnail:p_2,
        category:"Lifestyle",
        title:"The Importance of Exercise: A Pathway to Health and Wellness",
        desc:"Exercise is often referred to as the cornerstone of a healthy lifestyle. It's a fundamental component of physical fitness and plays an essential role in maintaining overall well-being. Whether it's a brisk walk, a vigorous gym session, or a calming yoga flow, exercise can have a transformative effect on both the body and the mind. But beyond the immediate benefits of fitness, exercise is also a preventive measure against a variety of chronic conditions.",
        authorId:2,
        author:"Daniel Wilson",
        author_img: auth_2
    },
    
    {

        _id:3,
        thumbnail:p_3,
        category:"Weather",
        title:"The Fascinating Science of Weather: How Nature Shapes Our World",
        desc:"Weather is one of the most dynamic and ever-changing aspects of our planet, influencing everything from our daily routines to our mood. It's a topic that affects everyone, every day, whether we're planning our outfits, deciding on outdoor activities, or preparing for an impending storm. But weather is more than just rain or sunshine—it’s a complex system shaped by a multitude of factors, including temperature, humidity, wind patterns, and air pressure. Understanding how weather works can help us make better decisions, protect ourselves from extreme conditions, and appreciate the natural world around us.",
        authorId:3,
        author:'Sarah Johnson',
        author_img: auth_1
    },
   
]

export const authArray = [
    {

        _id:1,
        author:'Sarah Johnson',
        auth_img: auth_1,
        posts: 2

    },
    {

        _id:2,
        author:'Daniel Wilson',
        auth_img: auth_2,
        posts: 2

    },
    {

        _id:3,
        author:'Alex Harper',
        auth_img: auth_3,
        posts: 2

    },
]