import React, { useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQabsenceAnnulation = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Comment annuler un service ?",
          questions: ["Comment annuler une commande ou un service réservé ?"],
          answers: [
            "Pour annuler un service ou une commande, suivez ces étapes :",
            "- Allez dans la section 'Mes commandes' ou 'Mes services'.",
            "- Sélectionnez le service que vous souhaitez annuler.",
            "- Cliquez sur l'option 'Annuler la commande' ou 'Annuler le service'.",
            "- Vous recevrez une confirmation par e-mail ou SMS.",
            "Note : Certaines annulations peuvent être soumises à des conditions spécifiques, selon la politique du service.",
          ],
        },
        {
          title: "Que faire si je ne peux pas être présent au rendez-vous ?",
          questions: ["Que faire si je suis absent à un rendez-vous prévu ?"],
          answers: [
            "Si vous êtes dans l'impossibilité d'assister à un rendez-vous, voici ce que vous pouvez faire :",
            "- Contactez immédiatement le service client ou le prestataire du service pour les informer de votre absence.",
            "- Vous pouvez également annuler ou reprogrammer le rendez-vous directement depuis l'application ou le site web.",
            "- Si l'annulation est effectuée suffisamment à l'avance, vous pourrez peut-être obtenir un remboursement ou une reprogrammation gratuite.",
          ],
        },
        {
          title: "Quelles sont les conséquences d'une annulation tardive ?",
          questions: ["Est-ce que je suis pénalisé si j'annule trop tardivement ?"],
          answers: [
            "Oui, une annulation tardive peut entraîner des conséquences selon les politiques du service :",
            "- Une annulation effectuée moins de 24 heures avant le service peut entraîner des frais supplémentaires.",
            "- Certains services peuvent appliquer une politique stricte qui ne permet pas de remboursement en cas d'annulation tardive.",
            "Nous vous conseillons de consulter les conditions générales du service pour connaître les détails exacts.",
          ],
        },
        {
          title: "Puis-je obtenir un remboursement après une annulation ?",
          questions: ["Puis-je être remboursé après l'annulation d'un service ?"],
          answers: [
            "Les remboursements dépendent des conditions spécifiques du service et de l'annulation :",
            "- Si l'annulation est effectuée dans un délai raisonnable, vous pouvez obtenir un remboursement complet ou partiel.",
            "- Certaines annulations peuvent être non remboursables, selon la politique de l'entreprise.",
            "- Si vous avez des questions ou des préoccupations concernant un remboursement, contactez notre support client.",
            "Pour connaître les conditions précises de remboursement, consultez la politique d'annulation associée à chaque service.",
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
                FAQ CLIENT
              </h2>
              <p className="text-6xl text-[#6977AF] font-modak">MANZO M3AK</p>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto py-8 px-6">
        <p className="text-lg font-bold text-[120px] text-[#6977AF]/70 mb-9 mt-6 text-center">
          06
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Absence et Annulation
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

export default FAQabsenceAnnulation;
