import React, { useEffect, useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQevaluation = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Comment évaluer un service ?",
          questions: ["Comment donner mon avis sur un service ?"],
          answers: [
            "Pour évaluer un service, suivez ces étapes :",
            "- Allez dans la section 'Historique de mes services' de votre application.",
            "- Sélectionnez le service que vous avez reçu.",
            "- Après avoir vu les détails, vous trouverez une option pour évaluer ce service.",
            "- Vous pouvez choisir un nombre d'étoiles et laisser un commentaire pour partager votre expérience.",
            "Votre évaluation aide à améliorer la qualité des services proposés.",
          ],
        },
        {
          title: "Pourquoi est-il important de laisser une évaluation ?",
          questions: ["Pourquoi devrais-je évaluer les services que j'ai reçus ?"],
          answers: [
            "Les évaluations sont cruciales pour plusieurs raisons :",
            "- Elles permettent d'améliorer la qualité des services en recueillant des retours d'expérience.",
            "- Elles aident d'autres clients à prendre des décisions informées en fonction des évaluations des services.",
            "- Elles encouragent les prestataires de services à maintenir ou à améliorer leurs standards.",
            "En laissant une évaluation honnête, vous contribuez à la transparence et à la qualité du service.",
          ],
        },
        {
          title: "Que faire si je ne suis pas satisfait de l'évaluation ?",
          questions: ["Puis-je modifier ou supprimer mon évaluation ?"],
          answers: [
            "Oui, vous pouvez modifier ou supprimer votre évaluation dans les conditions suivantes :",
            "- Pour modifier une évaluation, allez dans votre historique de services, sélectionnez le service concerné et changez l'évaluation.",
            "- Si vous souhaitez supprimer une évaluation, contactez notre support client. Notez cependant que nous encourageons les évaluations constructives.",
            "Si vous avez des préoccupations concernant un service, nous vous recommandons de contacter notre équipe pour résoudre le problème avant de laisser une évaluation.",
          ],
        },
      ],
    },
  ];
useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <Faqheader />
      <section className="py-16 bg-white relative bg-[#BCD0EA]/[9%]">
        <div className="container mx-auto px-5 max-w-6xl mt-4 mb-4 mr-[5%]">
          <div className="flex flex-col">
            <div className="text-left mb-7 max-w-[600px] mb-[50px] ml-[1%]">
              <h2 className="text-6xl text-[#6977AF] mt-7 mb-5 ml-5">
                FAQ CLIENT
              </h2>
              <p className="text-6xl text-[#6977AF] font-modak">MANZO M3AK</p>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto py-8 px-6">
        <p className="text-lg font-bold text-[120px] text-[#6977AF]/70 mb-9 mt-6 text-center">
          05
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Évaluation
        </p>
        <p className="text-lg font-bold text-[25px] text-[#475489] mb-6 mt-4 text-center">
          3 Articles
        </p>
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <div className="space-y-4 ml-16">
              {category.articles.map((article, artIndex) => {
                const currentIndex = `${catIndex}-${artIndex}`;
                return (
                  <div key={artIndex} className="mb-6">
                    <div
                      className="border border-[#F2F8FF]/80 bg-white bg-[#F2F8FF]/80 flex items-start gap-4 w-full rounded-[20px] px-6 py-4 shadow-md cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => toggleAccordion(currentIndex)}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg text-[25px] font-bold text-[#1B1F2A] ml-0">
                          {article.title}
                        </h3>

                        {activeIndex === currentIndex && (
                          <div className="mt-4 space-y-3 bg-white border rounded-[20px]">
                            {article.questions.map((question, qIndex) => (
                              <div
                                key={qIndex}
                                className="pb-3 border-b border-gray-100 last:border-0"
                              >
                                <h4 className="font-medium text-[#475489]">
                                  {question}
                                </h4>
                                <ul className="list-disc ml-5 text-gray-600 mt-2 text-sm">
                                  {article.answers.map((answer, aIndex) => (
                                    <li key={aIndex} className="mb-2">
                                      {answer}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-[#475489] font-bold text-4xl">
                        {activeIndex === currentIndex ? "Ʌ" : "V"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQevaluation;
