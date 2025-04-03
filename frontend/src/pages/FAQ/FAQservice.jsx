import React, { useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQdemandeService = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Comment faire une demande de service ?",
          questions: ["Comment soumettre une demande de service ?"],
          answers: [
            "Pour soumettre une demande de service, suivez ces étapes :",
            "- Allez dans la section 'Demande de service' de votre application.",
            "- Sélectionnez le type de service que vous souhaitez.",
            "- Remplissez les détails nécessaires et ajoutez des informations supplémentaires si nécessaire.",
            "- Cliquez sur 'Envoyer' pour finaliser votre demande.",
            "Votre demande sera traitée dans les plus brefs délais.",
          ],
        },
        {
          title: "Quelles informations sont nécessaires pour une demande de service ?",
          questions: ["Quelles informations dois-je fournir pour une demande de service ?"],
          answers: [
            "Lors de la soumission d'une demande de service, il est important de fournir les informations suivantes :",
            "- Votre nom et coordonnées.",
            "- Le type de service requis.",
            "- Une description détaillée du problème ou de la demande.",
            "- Toute information supplémentaire que vous jugerez utile (par exemple, des photos, des documents, etc.).",
            "Plus vous fournissez d'informations, plus nous serons en mesure de traiter votre demande rapidement.",
          ],
        },
        {
          title: "Combien de temps faut-il pour traiter une demande de service ?",
          questions: ["Quel est le délai pour traiter une demande de service ?"],
          answers: [
            "Le délai de traitement d'une demande de service dépend du type de service et de la complexité de la demande.",
            "En général, nous nous efforçons de répondre à toutes les demandes dans un délai de 24 à 48 heures.",
            "Dans le cas de demandes plus complexes, cela peut prendre un peu plus de temps, mais nous vous tiendrons informé de l'avancement de votre demande.",
          ],
        },
        {
          title: "Puis-je modifier ou annuler une demande de service ?",
          questions: ["Puis-je modifier ou annuler ma demande de service après l'avoir soumise ?"],
          answers: [
            "Une fois votre demande de service soumise, vous pouvez la modifier ou l'annuler dans certaines conditions.",
            "Si vous souhaitez apporter des modifications, veuillez nous contacter rapidement pour que nous puissions mettre à jour votre demande.",
            "Pour annuler une demande, vous devez nous en informer avant qu'un technicien ne soit assigné à votre demande.",
            "Passé ce délai, la demande ne pourra pas être annulée.",
          ],
        },
        {
          title: "Que faire si ma demande de service est urgente ?",
          questions: ["Comment soumettre une demande de service urgente ?"],
          answers: [
            "Si votre demande de service est urgente, voici ce que vous pouvez faire :",
            "- Lors de la soumission de votre demande, sélectionnez l'option 'Urgente'.",
            "- Nous vous recommandons également de nous contacter directement par téléphone ou par chat pour nous informer de l'urgence.",
            "Nous traiterons les demandes urgentes en priorité, mais il est important de nous fournir tous les détails nécessaires pour accélérer le traitement.",
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
          04
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Demande de service
        </p>
        <p className="text-lg font-bold text-[25px] text-[#475489] mb-6 mt-4 text-center">
          5 Articles
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

export default FAQdemandeService;
