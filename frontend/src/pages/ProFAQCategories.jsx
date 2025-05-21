import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Faqheader from "../components/faqheader";
import user from "../assets/images/user.png";
import qmark from "../assets/images/qmark.png";
import card from "../assets/images/card.png";
import quiz from "../assets/images/quiz.png";
import mobile from "../assets/images/mobile.png";

const PFAQCategories = () => {
  const categories = [
    {
      title: "Adhésion au programme Manzo",
      count: "16 Articles",
      path: "/faq-professional/adhesion",
      image: user,
    },
    {
      title: "Questions Post Adhésion au programme Manzo",
      count: "23 Articles",
      path: "/faq-professional/post-adhesion",
      image: qmark,
    },
    {
      title: "Questions relatives au paiement Manzo",
      count: "7 Articles",
      path: "/faq-professional/paiement",
      image: card,
    },
    {
      title: "Questions relatives au système de notation",
      count: "4 Articles",
      path: "/faq-professional/notation",
      image: quiz,
    },
    {
      title: "Evaluation professionnel",
      count: "12 Articles",
      path: "/faq-professional/evaluation",
      image: mobile,
    },
  ];
useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <Faqheader />
      <div className="max-w-4xl mx-auto py-8 px-4 mt-[8%]">
        <div className="space-y-6 flex flex-col items-center mb-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border border-[#F2F8FF]/80 bg-[#F2F8FF]/80 flex items-center gap-4 w-full max-w-[1088px] h-[101px] rounded-[30px] px-6 py-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-[60px] h-[60px] object-contain"
              />
              <Link
                to={category.path}
                className="group flex-1 block transition-colors hover:text-[#3a4574]"
              >
                <h2 className="text-xl font-semibold text-[#475489] group-hover:underline">
                  {category.title}
                </h2>
                <p className="text-gray-600 mt-1">{category.count}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PFAQCategories;
