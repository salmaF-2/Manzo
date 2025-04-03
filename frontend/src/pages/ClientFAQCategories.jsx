import React from "react";
import { Link } from "react-router-dom";
import Faqheader from "../components/faqheader";
import user1 from "../assets/images/user1.png";
import qmark from "../assets/images/qmark.png";
import pay from "../assets/images/pay.png";
import service from "../assets/images/service.png";
import rate from "../assets/images/rate.png";
import cancel from "../assets/images/cancel.png";
import papier from "../assets/images/papier.png";

const CFAQCategories = () => {
  const categories = [
    {
      title: "Votre compte",
      count: "2 Articles",
      path: "/faq-client/compte",
      image: user1,
    },
    {
      title: "Questions générales",
      count: "12 Articles",
      path: "/faq-client/general",
      image: qmark,
    },
    {
      title: "Paiement",
      count: "4 Articles",
      path: "/faq-client/paiement",
      image: pay,
    },
    {
      title: "Demande de service",
      count: "5 Articles",
      path: "/faq-client/service",
      image: service,
    },
    {
      title: "Evaluation professionnel",
      count: "3 Articles",
      path: "/faq-client/evaluation",
      image: rate,
    },
    {
      title: "Absences et annulations",
      count: "4 Articles",
      path: "/faq-client/absences",
      image: cancel,
    },
    {
      title: "Annexes",
      count: "2 Articles",
      path: "/faq-client/annexes",
      image: papier,
    },
  ];

  return (
    <div>
      <Faqheader />
      <div className="max-w-4xl mx-auto py-8 px-4 -[8%]">
        <div className="space-y-6 flex flex-col items-center">
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
    </div>
  );
};

export default CFAQCategories;