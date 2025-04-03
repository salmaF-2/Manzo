import React, { useState } from "react";
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
          title: "Comment être évalué en tant que prestataire sur Manzo ?",
          questions: ["Comment le processus d'évaluation fonctionne-t-il ?"],
          answers: [
            "Les clients évaluent votre travail après chaque prestation.",
            "Ils prennent en compte des critères comme la qualité du service, la ponctualité, et la communication.",
          ],
        },
        {
          title: "Que faire pour obtenir une bonne évaluation ?",
          questions: ["Comment améliorer mes évaluations ?"],
          answers: [
            "Fournir un service de qualité et respectueux est essentiel.",
            "Être à l'écoute de vos clients et répondre à leurs attentes augmente vos chances d'obtenir une bonne évaluation.",
          ],
        },
        {
          title: "Les évaluations influencent-elles mes opportunités de travail ?",
          questions: ["Est-ce que de mauvaises évaluations peuvent m'empêcher d'obtenir des missions ?"],
          answers: [
            "Oui, une mauvaise évaluation peut rendre difficile l'obtention de nouvelles missions.",
            "Maintenant, il est conseillé d'améliorer la qualité de votre service pour avoir des évaluations positives.",
          ],
        },
        {
          title: "Les évaluations peuvent-elles être modifiées ?",
          questions: ["Puis-je demander une modification d'une évaluation ?"],
          answers: [
            "Une fois qu'une évaluation est laissée, elle ne peut pas être modifiée.",
            "Cependant, vous pouvez répondre à l'évaluation pour clarifier toute situation ou résoudre un problème.",
          ],
        },
        {
          title: "Que faire si un client laisse un commentaire négatif injustifié ?",
          questions: ["Que faire face à un commentaire injustifié ?"],
          answers: [
            "Répondre de manière professionnelle et expliquer la situation peut aider à clarifier les malentendus.",
            "Si le commentaire enfreint les règles de la plateforme, vous pouvez contacter le support pour le faire examiner.",
          ],
        },
        {
          title: "Les évaluations sont-elles visibles par tous ?",
          questions: ["Les évaluations sont-elles publiques ?"],
          answers: [
            "Oui, toutes les évaluations sont visibles sur votre profil par les futurs clients.",
            "Les clients peuvent ainsi prendre des décisions éclairées en fonction de vos évaluations précédentes.",
          ],
        },
        {
          title: "Quel impact ont les évaluations sur ma réputation ?",
          questions: ["Les évaluations affectent-elles ma réputation en ligne ?"],
          answers: [
            "Les évaluations jouent un rôle clé dans la formation de votre réputation sur la plateforme.",
            "Des évaluations positives renforceront votre image et attireront plus de clients.",
          ],
        },
        {
          title: "Est-ce que le système d'évaluation est équitable ?",
          questions: ["Le système d'évaluation prend-il en compte toutes les facettes du service ?"],
          answers: [
            "Oui, le système évalue plusieurs aspects de votre service, comme la qualité, la ponctualité et la communication.",
            "Il est conçu pour refléter de manière juste l'expérience du client.",
          ],
        },
        {
          title: "Que faire si un client refuse de laisser une évaluation ?",
          questions: ["Que faire si un client ne laisse pas d'évaluation ?"],
          answers: [
            "Si un client choisit de ne pas laisser d'évaluation, cela ne doit pas affecter votre travail.",
            "Cependant, vous pouvez toujours encourager poliment vos clients à laisser un retour après le service.",
          ],
        },
        {
          title: "Comment répondre à une évaluation négative ?",
          questions: ["Que dois-je faire si un client laisse une évaluation négative ?"],
          answers: [
            "Répondez de manière calme et professionnelle, en offrant une solution si nécessaire.",
            "Expliquer les circonstances du service peut parfois aider à améliorer la situation.",
          ],
        },
        {
          title: "Est-ce que les évaluations influencent directement le paiement ?",
          questions: ["Les évaluations affectent-elles le montant de ma rémunération ?"],
          answers: [
            "Non, les évaluations ne changent pas directement le paiement pour un service déjà rendu.",
            "Cependant, des évaluations positives peuvent vous permettre de recevoir plus de missions dans le futur.",
          ],
        },
        {
          title: "Que faire si j'ai des difficultés à comprendre une évaluation ?",
          questions: ["Que faire si je ne comprends pas une évaluation ?"],
          answers: [
            "Essayez de contacter le client pour clarifier le feedback et comprendre les points d'amélioration.",
            "Un retour constructif peut vous aider à améliorer la qualité de vos services à l'avenir.",
          ],
        },
      ],
    },
  ];

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
          05
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          L'évaluation professionnelle 
        </p>
        <p className="text-lg font-bold text-[25px] text-[#475489] mb-6 mt-4 text-center">
          12 Articles
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
