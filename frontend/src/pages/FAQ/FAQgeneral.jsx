import React, { useEffect, useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQgeneral = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Obtenir de l'aide pour un problème technique",
          questions: ["Comment puis-je obtenir de l'aide en cas de problème technique ?"],
          answers: [
            "Vous pouvez obtenir de l'aide en contactant notre équipe d'assistance via le formulaire de contact sur notre site ou en envoyant un e-mail à notre support technique. Nous offrons également un chat en direct pendant nos heures d'ouverture.",
          ],
        },
        {
          title: "Contacter l'assistance technique",
          questions: ["Comment puis-je contacter votre équipe d'assistance technique ?"],
          answers: [
            "Pour contacter notre équipe d'assistance technique, vous pouvez envoyer un e-mail à support@votresite.com, utiliser notre chat en direct ou remplir le formulaire de contact sur notre site web.",
          ],
        },
        {
          title: "Faire confiance à notre plateforme",
          questions: ["Pourquoi devrais-je faire confiance à votre plateforme ?"],
          answers: [
            "Notre plateforme est conçue avec une sécurité de niveau supérieur, et nous suivons des normes strictes de protection des données. Nous avons des années d'expérience dans l'industrie et offrons un service client réactif pour garantir une expérience optimale.",
          ],
        },
        {
          title: "Politiques de confidentialité et sécurité",
          questions: ["Quelles sont les politiques de confidentialité et de sécurité sur votre site ?"],
          answers: [
            "Nous prenons la confidentialité de vos données très au sérieux. Toutes les informations personnelles sont protégées par des protocoles de cryptage avancés. Pour plus d'informations, vous pouvez consulter notre politique de confidentialité disponible sur notre site.",
          ],
        },
        {
          title: "Horaires du support client",
          questions: ["Quels sont les horaires de votre support client ?"],
          answers: [
            "Notre support client est disponible du lundi au vendredi, de 9h00 à 18h00. En dehors de ces heures, vous pouvez laisser un message, et nous reviendrons vers vous dès que possible.",
          ],
        },
        {
          title: "Faire part de suggestions",
          questions: ["Comment puis-je vous faire part de mes suggestions pour améliorer la plateforme ?"],
          answers: [
            "Nous sommes toujours ouverts aux suggestions de nos utilisateurs. Vous pouvez nous faire part de vos idées via notre formulaire de contact ou en envoyant un e-mail à suggestions@votresite.com.",
          ],
        },
        {
          title: "Langues disponibles sur la plateforme",
          questions: ["Puis-je utiliser votre plateforme dans plusieurs langues ?"],
          answers: [
            "Oui, notre plateforme est disponible en plusieurs langues. Vous pouvez choisir votre langue préférée dans les paramètres de votre compte.",
          ],
        },
        {
          title: "Mises à jour de la plateforme",
          questions: ["Est-ce que des mises à jour régulières de la plateforme sont prévues ?"],
          answers: [
            "Oui, nous mettons régulièrement à jour notre plateforme pour améliorer les fonctionnalités existantes et en ajouter de nouvelles. Vous serez informé des mises à jour via notre newsletter ou directement sur le site.",
          ],
        },
        {
          title: "Fonctionnalités disponibles sur la plateforme",
          questions: ["Quelles sont les fonctionnalités disponibles sur votre plateforme ?"],
          answers: [
            "Notre plateforme offre une variété de fonctionnalités telles que la gestion des commandes, l'accès à des contenus exclusifs, un support client intégré, et des outils personnalisés pour améliorer votre expérience.",
          ],
        },
        {
          title: "Compatibilité avec votre appareil",
          questions: ["Comment savoir si une fonctionnalité est compatible avec mon appareil ?"],
          answers: [
            "Vous pouvez vérifier la compatibilité des fonctionnalités avec votre appareil en consultant notre guide de compatibilité disponible dans la section « Aide » de notre site web. Nous recommandons également de vérifier les spécifications minimales requises pour un fonctionnement optimal.",
          ],
        },
        {
          title: "Accès à la plateforme depuis n'importe quel pays",
          questions: ["Est-ce que je peux accéder à votre service depuis n'importe quel pays ?"],
          answers: [
            "Oui, notre service est accessible depuis presque tous les pays. Cependant, certaines fonctionnalités peuvent être limitées en fonction de la région en raison de contraintes légales ou techniques.",
          ],
        },
        {
          title: "Restrictions d'âge pour utiliser la plateforme",
          questions: ["Y a-t-il des restrictions d'âge pour utiliser la plateforme ?"],
          answers: [
            "Oui, pour des raisons légales et de sécurité, l'accès à notre plateforme est réservé aux utilisateurs de 18 ans et plus. Si vous avez moins de 18 ans, vous devez obtenir l'autorisation d'un parent ou tuteur pour utiliser nos services.",
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
          02
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Questions Générales
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

export default FAQgeneral;
