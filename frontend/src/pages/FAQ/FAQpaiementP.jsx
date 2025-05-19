import React, { useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQpaiementP = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Comment recevoir le paiement pour mes services sur Manzo ?",
          questions: ["Quand vais-je recevoir mon paiement pour les services rendus ?"],
          answers: [
            "Le paiement pour vos services sera effectué après que le client ait confirmé la réception du service.",
            "Le processus de paiement prend généralement entre 5 et 7 jours ouvrables.",
            "Assurez-vous que votre compte bancaire est correctement configuré pour éviter tout retard.",
          ],
        },
        {
          title: "Quels sont les frais de service pour les prestataires sur Manzo ?",
          questions: ["Quels frais Manzo prélève-t-il sur mes paiements ?"],
          answers: [
            "Manzo prélève une commission de 10% sur chaque transaction effectuée sur la plateforme.",
            "Cette commission couvre les frais de gestion et le support client.",
            "Les frais peuvent varier en fonction des promotions et des conditions spécifiques.",
          ],
        },
        {
          title: "Comment puis-je consulter mes paiements sur Manzo ?",
          questions: ["Où puis-je voir l'historique de mes paiements ?"],
          answers: [
            "Vous pouvez consulter l'historique de vos paiements directement depuis votre tableau de bord prestataire.",
            "Allez dans la section 'Mes paiements' pour voir les détails de vos transactions passées.",
          ],
        },
        {
          title: "Est-ce que je peux choisir mon mode de paiement sur Manzo ?",
          questions: ["Puis-je choisir la méthode par laquelle je suis payé ?"],
          answers: [
            "Oui, vous pouvez choisir parmi plusieurs méthodes de paiement, telles que le virement bancaire, PayPal ou un autre moyen de paiement disponible dans votre région.",
            "Rendez-vous dans les paramètres de votre compte pour sélectionner votre mode de paiement préféré.",
          ],
        },
        {
          title: "Est-ce que Manzo propose un paiement immédiat ?",
          questions: ["Puis-je être payé immédiatement après avoir rendu un service ?"],
          answers: [
            "Non, Manzo effectue généralement des paiements sur une base hebdomadaire ou mensuelle.",
            "Cependant, certaines options de paiement instantané peuvent être disponibles sous certaines conditions.",
          ],
        },
        {
          title: "Puis-je facturer un service en plusieurs paiements ?",
          questions: ["Est-ce que je peux fractionner le paiement pour un service ?"],
          answers: [
            "Oui, vous pouvez proposer des paiements échelonnés pour certains services.",
            "Pour ce faire, vous devez spécifier les modalités de paiement lors de l'offre du service sur la plateforme.",
          ],
        },
        {
          title: "Que faire si je ne reçois pas mon paiement à temps ?",
          questions: ["Que faire si mon paiement est en retard ?"],
          answers: [
            "Si votre paiement est en retard, voici les étapes à suivre :",
            "- Vérifiez les détails de votre compte pour vous assurer que tout est à jour.",
            "- Contactez le support client de Manzo via l'application ou par e-mail.",
            "- Un agent examinera la situation et vous fournira une solution dans les plus brefs délais.",
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
          03
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Questions relatives au paiement Manzo
        </p>
        <p className="text-lg font-bold text-[25px] text-[#475489] mb-6 mt-4 text-center">
          7 Articles
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

export default FAQpaiementP;
