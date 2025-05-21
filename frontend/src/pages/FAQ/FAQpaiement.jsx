import React, { useEffect, useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQpaiement = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Modes de paiement disponibles",
          questions: ["Quels sont les modes de paiement disponibles ?"],
          answers: [
            "Nous acceptons plusieurs modes de paiement, dont :",
            "- Cartes bancaires (Visa, MasterCard)",
            "- Paiement via PayPal",
            "- Virement bancaire",
            "- Paiement mobile (si disponible dans votre région)",
          ],
        },
        {
          title: "Sécurisation des paiements",
          questions: ["Comment mes paiements sont-ils sécurisés ?"],
          answers: [
            "Tous les paiements sont traités via des connexions sécurisées et cryptées. Nous utilisons des protocoles de sécurité de pointe, tels que la technologie SSL, pour protéger vos informations financières.",
            "En outre, nous ne stockons pas vos informations de paiement, elles sont gérées uniquement par notre partenaire de paiement sécurisé.",
          ],
        },
        {
          title: "Problèmes avec le paiement",
          questions: ["Que faire si mon paiement échoue ?"],
          answers: [
            "Si votre paiement échoue, nous vous recommandons de vérifier les informations suivantes :",
            "- Assurez-vous que votre carte bancaire est valide et que les informations de paiement sont correctes.",
            "- Vérifiez que votre compte bancaire ou PayPal dispose de fonds suffisants.",
            "- Essayez d'utiliser un autre mode de paiement si le problème persiste.",
            "Si le problème persiste, contactez notre support technique à support@votresite.com.",
          ],
        },
        {
          title: "Facturation et reçus",
          questions: ["Comment puis-je obtenir ma facture ?"],
          answers: [
            "Une fois votre paiement confirmé, une facture électronique sera générée et envoyée à votre adresse e-mail.",
            "Vous pouvez également accéder à vos factures dans la section 'Historique des paiements' de votre compte.",
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
          03
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Paiement
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

export default FAQpaiement;
