import React, { useState,useEffect } from "react";
import Faqheader from "../../components/faqheader";

const FAQannexes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Qu'est-ce que les annexes d'un service ?",
          questions: ["Qu'entend-on par annexes dans le cadre d'un service ?"],
          answers: [
            "Les annexes d'un service sont des documents ou des informations supplémentaires qui accompagnent votre service principal. Elles peuvent inclure :",
            "- Des contrats ou accords spécifiques.",
            "- Des conditions supplémentaires pour l'exécution du service.",
            "- Des instructions ou manuels d'utilisation.",
            "- Des politiques de confidentialité et de sécurité.",
            "Ces annexes sont importantes car elles détaillent les engagements et responsabilités des deux parties dans le cadre de l'accord de service.",
          ],
        },
        {
          title: "Comment accéder aux annexes d'un service ?",
          questions: ["Comment consulter les annexes liées à mon service ?"],
          answers: [
            "Pour accéder aux annexes d'un service, voici les étapes à suivre :",
            "- Allez dans la section 'Mes services' ou 'Mes commandes' sur votre compte.",
            "- Sélectionnez le service auquel les annexes sont associées.",
            "- Vous trouverez les annexes sous forme de liens ou de fichiers téléchargeables dans les détails du service.",
            "- Vous pouvez également les recevoir par e-mail ou les consulter via l'interface de l'application, selon les conditions du service.",
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
          07
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Annexes
        </p>
        <p className="text-lg font-bold text-[25px] text-[#475489] mb-6 mt-4 text-center">
          2 Articles
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

export default FAQannexes;
