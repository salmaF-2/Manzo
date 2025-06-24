import React, { useEffect, useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQnotation = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Comment fonctionne le système de notation sur Manzo ?",
          questions: ["Comment les clients notent-ils les prestataires ?"],
          answers: [
            "Les clients peuvent attribuer une note de 1 à 5 étoiles après avoir utilisé un service.",
            "Les notes sont basées sur différents critères tels que la qualité du service, la ponctualité, et la communication.",
          ],
        },
        {
          title: "Que se passe-t-il si un prestataire reçoit une mauvaise note ?",
          questions: ["Que faire si je reçois une note faible ?"],
          answers: [
            "Si vous recevez une note faible, vous serez informé par l'application pour vous permettre d'améliorer votre service.",
            "Il est important de lire les commentaires laissés par les clients pour comprendre leurs préoccupations et ajuster vos services.",
          ],
        },
        {
          title: "Est-ce que le système de notation peut influencer mes opportunités de travail ?",
          questions: ["Le système de notation affecte-t-il mes chances d'obtenir de nouveaux clients ?"],
          answers: [
            "Oui, un bon système de notation vous permet de vous démarquer auprès des nouveaux clients.",
            "Les clients préfèrent souvent choisir des prestataires ayant de bonnes évaluations, ce qui peut augmenter vos opportunités de travail.",
          ],
        },
        {
          title: "Puis-je répondre aux évaluations laissées par les clients ?",
          questions: ["Puis-je interagir avec les évaluations des clients ?"],
          answers: [
            "Oui, vous pouvez répondre aux commentaires laissés par les clients pour montrer votre professionnalisme et clarifier certains points.",
            "Répondre de manière respectueuse et constructive peut améliorer votre réputation et aider à résoudre des malentendus.",
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
                FAQ PRESTATAIRE
              </h2>
              <p className="text-6xl text-[#6977AF] font-modak">MANZO M3AK</p>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto py-8 px-6">
        <p className="text-lg font-bold text-[120px] text-[#6977AF]/70 mb-9 mt-6 text-center">
          04
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Système de notation Manzo
        </p>
        <p className="text-lg font-bold text-[25px] text-[#475489] mb-6 mt-4 text-center">
          4 Articles
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

export default FAQnotation;
