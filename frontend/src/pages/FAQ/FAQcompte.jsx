import React, { useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQcompte = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Création d'un compte Manzo",
          questions: ["Comment créer un compte client Manzo ?"],
          answers: [
            "C’est très facile, il suffit de vous inscrire sur l’application Manzo avec votre numéro de téléphone et suivre les instructions ci-dessous :",
            "Cliquez sur l'icône pour « Créer un compte ». ",
            "Intégrez votre nom de famille et votre prénom, puis votre numéro de téléphone.",
            "Créez un mot de passe et confirmez-le.",
            "Vous recevrez un code de vérification par SMS sur votre numéro de téléphone qu’il faudra renseigner.",
            "Après consultation, approuvez les conditions générales d’utilisation.",
            "Votre compte est désormais opérationnel.",
          ],
        },
        {
          title: "Modifier ou compléter mon compte Manzo",
          questions: ["Comment mettre à jour mes informations personnelles ?"],
          answers: [
            "Allez dans 'Mon compte' > 'Paramètres' > 'Informations personnelles' pour effectuer vos modifications.",
            "Vous pouvez changer votre numéro de téléphone dans les paramètres de votre compte, mais cela nécessitera une nouvelle vérification par SMS.",
            "Dans la section 'Profil', cliquez sur votre avatar pour télécharger une nouvelle photo.",
            "Pour mettre à jour votre adresse, allez dans la section 'Adresse' de vos paramètres de compte.",
            "Activez l'authentification à deux facteurs dans les paramètres de sécurité pour renforcer la protection de votre compte.",
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
          01
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Votre compte
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

export default FAQcompte;
