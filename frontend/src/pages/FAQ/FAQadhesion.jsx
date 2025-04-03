import React, { useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQadhesion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Comment adhérer au programme Manzo ?",
          questions: ["Quelles sont les étapes pour rejoindre le programme ?"],
          answers: [
            "Pour adhérer au programme Manzo, il vous suffit de suivre ces étapes :",
            "- Créez un compte client ou connectez-vous si vous en avez déjà un.",
            "- Allez dans la section 'Programme Manzo' et cliquez sur 'Adhérer'.",
            "- Complétez les informations demandées et acceptez les conditions d'utilisation.",
            "- Vous recevrez un message de confirmation par e-mail ou SMS.",
            "Une fois votre adhésion validée, vous pourrez commencer à profiter des avantages du programme Manzo.",
          ],
        },
        {
          title: "Quels sont les avantages du programme Manzo ?",
          questions: ["Que puis-je gagner en adhérant au programme Manzo ?"],
          answers: [
            "Le programme Manzo vous offre plusieurs avantages, dont :",
            "- Des réductions exclusives sur vos achats.",
            "- L'accès à des offres spéciales et des événements privés.",
            "- Des points fidélité que vous pouvez échanger contre des récompenses.",
            "- Des notifications personnalisées sur les promotions et nouveautés.",
            "- Un service client prioritaire pour les membres.",
          ],
        },
        {
          title: "Est-ce que l'adhésion au programme Manzo est gratuite ?",
          questions: ["Faut-il payer pour adhérer au programme ?"],
          answers: [
            "Oui, l'adhésion au programme Manzo est totalement gratuite.",
            "Il vous suffit de suivre les étapes mentionnées précédemment pour rejoindre le programme et commencer à en bénéficier sans frais supplémentaires.",
          ],
        },
        {
          title: "Puis-je adhérer au programme Manzo en tant que professionnel ?",
          questions: ["Le programme est-il réservé aux particuliers ou les professionnels peuvent-ils y adhérer ?"],
          answers: [
            "Le programme Manzo est ouvert à la fois aux particuliers et aux professionnels.",
            "Si vous êtes un professionnel, vous pouvez rejoindre le programme pour bénéficier d'offres adaptées à vos besoins spécifiques.",
          ],
        },
        {
          title: "Comment gérer mon abonnement au programme Manzo ?",
          questions: ["Puis-je gérer mon adhésion depuis mon compte ?"],
          answers: [
            "Oui, vous pouvez gérer votre abonnement directement depuis l'application Manzo.",
            "Allez dans 'Mon compte' > 'Mes abonnements' pour voir les détails de votre adhésion et effectuer des modifications si nécessaire.",
            "Vous pouvez également mettre à jour vos préférences ou annuler votre adhésion à tout moment.",
          ],
        },
        {
          title: "Combien de temps dure l'adhésion au programme Manzo ?",
          questions: ["L'adhésion au programme a-t-elle une durée limitée ?"],
          answers: [
            "L'adhésion au programme Manzo est valable pour une durée indéterminée.",
            "Tant que vous n'annulez pas votre adhésion ou que vous ne recevez pas de notification indiquant le contraire, vous resterez membre du programme et continuerez à profiter des avantages.",
          ],
        },
        {
          title: "Est-ce que je peux transférer mon adhésion à une autre personne ?",
          questions: ["Puis-je donner ou transférer mon adhésion à un autre membre ?"],
          answers: [
            "L'adhésion au programme Manzo est strictement personnelle et ne peut pas être transférée à une autre personne.",
            "Si vous souhaitez offrir les avantages du programme, vous pouvez recommander à quelqu'un de s'inscrire au programme directement.",
          ],
        },
        {
          title: "Puis-je bénéficier des avantages du programme à l'international ?",
          questions: ["Le programme est-il disponible en dehors du pays ?"],
          answers: [
            "Oui, vous pouvez bénéficier des avantages du programme Manzo à l'international, mais certaines offres peuvent être limitées en fonction de votre pays de résidence.",
            "Assurez-vous de vérifier les offres disponibles dans votre région via l'application.",
          ],
        },
        {
          title: "Que faire si je rencontre un problème avec mon adhésion ?",
          questions: ["Je rencontre un problème avec mon adhésion, comment le résoudre ?"],
          answers: [
            "Si vous rencontrez un problème avec votre adhésion, voici les étapes à suivre :",
            "- Vérifiez les informations de votre compte et assurez-vous que tout est à jour.",
            "- Si le problème persiste, contactez notre support client via l'application ou par e-mail.",
            "- Un agent se chargera de résoudre votre problème dans les plus brefs délais.",
          ],
        },
        {
          title: "Quels sont les critères d'éligibilité pour adhérer au programme ?",
          questions: ["Est-ce que tout le monde peut rejoindre le programme ?"],
          answers: [
            "L'adhésion au programme Manzo est ouverte à toute personne majeure disposant d'un compte Manzo.",
            "Il n'y a pas de critères stricts d'éligibilité autres que de posséder un compte actif sur la plateforme.",
          ],
        },
        {
          title: "Comment recevoir les notifications du programme Manzo ?",
          questions: ["Comment puis-je recevoir des notifications pour les offres et promotions du programme ?"],
          answers: [
            "Vous pouvez activer les notifications dans les paramètres de votre application Manzo.",
            "Cela vous permettra de recevoir des alertes concernant les nouvelles offres, les promotions spéciales et les événements réservés aux membres.",
          ],
        },
        {
          title: "Puis-je désactiver les notifications du programme Manzo ?",
          questions: ["Puis-je arrêter de recevoir les notifications du programme ?"],
          answers: [
            "Oui, vous pouvez désactiver les notifications du programme Manzo à tout moment.",
            "Allez dans les paramètres de l'application et modifiez vos préférences de notifications pour les offres du programme.",
          ],
        },
        {
          title: "Comment annuler mon adhésion au programme Manzo ?",
          questions: ["Que faire si je souhaite annuler mon adhésion au programme ?"],
          answers: [
            "Si vous souhaitez annuler votre adhésion au programme Manzo, suivez ces étapes :",
            "- Allez dans 'Mon compte' > 'Abonnement' > 'Annuler l'adhésion'.",
            "- Suivez les instructions pour confirmer l'annulation.",
            "L'annulation prendra effet immédiatement et vous ne pourrez plus bénéficier des avantages du programme.",
          ],
        },
        {
          title: "Est-ce que je peux réactiver mon adhésion après l'annulation ?",
          questions: ["Puis-je réactiver mon adhésion après l'avoir annulée ?"],
          answers: [
            "Oui, vous pouvez réactiver votre adhésion à tout moment en suivant le processus d'adhésion normal.",
            "Toutefois, il est important de noter que certaines offres ou avantages spécifiques peuvent avoir changé depuis l'annulation.",
          ],
        },
        {
          title: "Quelles sont les conditions générales d'adhésion au programme Manzo ?",
          questions: ["Où puis-je lire les conditions générales du programme Manzo ?"],
          answers: [
            "Les conditions générales du programme Manzo sont disponibles directement sur notre site web ou dans l'application Manzo.",
            "Il est conseillé de lire ces conditions avant de vous inscrire au programme afin de bien comprendre vos droits et obligations.",
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
          01
        </p>
        <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
          Adhésion au programme Manzo
        </p>
        <p className="text-lg font-bold text-[25px] text-[#475489] mb-6 mt-4 text-center">
          16 Articles
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

export default FAQadhesion;
