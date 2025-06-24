import React, { useEffect, useState } from "react";
import Faqheader from "../../components/faqheader";

const FAQpostAdhesion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    {
      articles: [
        {
          title: "Comment utiliser les avantages du programme après l'adhésion ?",
          questions: ["Comment profiter des réductions et offres après avoir adhéré ?"],
          answers: [
            "Une fois membre, vous pouvez profiter des avantages du programme directement via l'application Manzo ou en vous présentant dans nos magasins partenaires.",
            "Les réductions et offres sont automatiquement appliquées à votre panier lors de vos achats en ligne ou à la caisse dans les magasins physiques.",
          ],
        },
        {
          title: "Où puis-je consulter mon solde de points fidélité ?",
          questions: ["Comment vérifier mes points fidélité après l'adhésion ?"],
          answers: [
            "Vous pouvez consulter votre solde de points fidélité dans la section 'Mon compte' de l'application Manzo.",
            "Les points sont mis à jour après chaque achat et vous pouvez les échanger contre des récompenses ou des bons de réduction.",
          ],
        },
        {
          title: "Comment échanger mes points fidélité ?",
          questions: ["Que faire pour utiliser mes points fidélité ?"],
          answers: [
            "Allez dans la section 'Récompenses' de l'application Manzo pour échanger vos points contre des produits ou des réductions.",
            "Les récompenses disponibles varient en fonction de votre solde de points.",
          ],
        },
        {
          title: "Est-ce que je peux cumuler des points fidélité avec des promotions ?",
          questions: ["Les points fidélité sont-ils cumulables avec les promotions en cours ?"],
          answers: [
            "Oui, vous pouvez cumuler vos points fidélité avec des offres promotionnelles, à moins que les conditions de l'offre spécifient le contraire.",
            "Cela vous permet de bénéficier de réductions sur des produits tout en accumulant des points pour vos achats futurs.",
          ],
        },
        {
          title: "Comment changer mes préférences de notification ?",
          questions: ["Puis-je personnaliser les notifications que je reçois ?"],
          answers: [
            "Oui, vous pouvez personnaliser vos préférences de notification directement dans les paramètres de votre compte Manzo.",
            "Cela vous permettra de choisir les types de notifications que vous souhaitez recevoir (offres, promotions, événements).",
          ],
        },
        {
          title: "Puis-je annuler une commande passée après l'adhésion ?",
          questions: ["Est-il possible d'annuler une commande une fois qu'elle est confirmée ?"],
          answers: [
            "Les annulations de commandes dépendent de la politique de l'entreprise partenaire avec laquelle vous avez effectué votre achat.",
            "En général, vous pouvez annuler une commande dans les 24 heures suivant l'achat, à condition qu'elle n'ait pas encore été expédiée.",
          ],
        },
        {
          title: "Comment gérer mes informations de paiement ?",
          questions: ["Puis-je modifier mes informations de paiement après avoir adhéré ?"],
          answers: [
            "Vous pouvez modifier vos informations de paiement dans la section 'Mon compte' de l'application Manzo.",
            "Cela inclut la possibilité de mettre à jour votre carte bancaire ou de choisir un autre mode de paiement pour vos futurs achats.",
          ],
        },
        {
          title: "Est-ce que l'adhésion me permet de bénéficier d'une garantie prolongée ?",
          questions: ["L'adhésion au programme offre-t-elle des garanties supplémentaires sur les produits ?"],
          answers: [
            "Certains produits achetés par le biais du programme Manzo peuvent bénéficier d'une garantie prolongée, selon l'offre en cours.",
            "Vérifiez les conditions de chaque produit avant de l'acheter pour savoir si une garantie prolongée est incluse.",
          ],
        },
        {
          title: "Comment suivre mes commandes après l'adhésion ?",
          questions: ["Puis-je suivre mes commandes dans l'application ?"],
          answers: [
            "Oui, vous pouvez suivre l'état de vos commandes directement depuis l'application Manzo, dans la section 'Mes commandes'.",
            "Cela inclut des informations sur l'expédition, la livraison estimée et la possibilité de suivre votre colis en temps réel.",
          ],
        },
        {
          title: "Puis-je offrir des points fidélité à un autre membre ?",
          questions: ["Est-il possible de transférer mes points fidélité à quelqu'un d'autre ?"],
          answers: [
            "Non, les points fidélité sont non transférables et sont associés à votre compte Manzo.",
            "Cependant, vous pouvez recommander le programme à vos amis et les inviter à s'inscrire pour qu'ils puissent eux aussi profiter des avantages.",
          ],
        },
        {
          title: "Comment modifier mon adresse de livraison ?",
          questions: ["Puis-je changer mon adresse de livraison après l'adhésion ?"],
          answers: [
            "Oui, vous pouvez modifier votre adresse de livraison à tout moment via l'application Manzo, dans la section 'Mes informations'.",
            "Assurez-vous que votre nouvelle adresse soit mise à jour avant de passer une commande pour éviter tout retard de livraison.",
          ],
        },
        {
          title: "Puis-je annuler mon adhésion au programme après l'avoir activée ?",
          questions: ["Est-il possible de se désinscrire du programme Manzo ?"],
          answers: [
            "Oui, vous pouvez annuler votre adhésion à tout moment depuis l'application Manzo, dans la section 'Mon compte'.",
            "Une fois votre adhésion annulée, vous ne pourrez plus profiter des avantages du programme, mais vous garderez vos points fidélité jusqu'à leur expiration.",
          ],
        },
        {
          title: "Que faire si je perds l'accès à mon compte Manzo ?",
          questions: ["Que faire si je ne peux plus me connecter à mon compte ?"],
          answers: [
            "Si vous avez oublié votre mot de passe ou si vous rencontrez des problèmes de connexion, vous pouvez réinitialiser votre mot de passe depuis l'application.",
            "Si vous avez des problèmes persistants, contactez notre support technique pour récupérer l'accès à votre compte.",
          ],
        },
        { title: "Les avantages sont-ils valables toute l'année ?",
          questions: ["Les avantages sont-ils valables toute l'année ?"],
            answers: [
              "Oui, les avantages du programme Manzo sont disponibles toute l'année, sauf si une promotion spécifique mentionne des dates limitées.",
              "Vous pouvez profiter des réductions et des offres tout au long de l'année, en fonction des disponibilités et des promotions en cours.",
            ],
          },
          {
            title: "Est-ce que je peux partager mon compte avec d'autres personnes ?",
            questions: ["Puis-je partager mes informations de compte avec quelqu'un d'autre ?"],
            answers: [
              "Non, il est conseillé de garder votre compte Manzo privé et sécurisé. Le partage des informations de compte peut entraîner la suspension de l'adhésion.",
              "Chaque membre doit avoir son propre compte pour bénéficier des avantages du programme et des points fidélité.",
            ],
          },
          {
            title: "Comment modifier mes informations personnelles ?",
            questions: ["Puis-je mettre à jour mes informations personnelles après l'adhésion ?"],
            answers: [
              "Oui, vous pouvez modifier vos informations personnelles, y compris votre adresse, numéro de téléphone et email, dans la section 'Mon compte' de l'application Manzo.",
              "Ces informations peuvent être mises à jour à tout moment pour assurer une communication fluide et l'envoi correct de vos commandes.",
            ],
          },
          {
            title: "Les avantages sont-ils valables sur tous les produits ?",
            questions: ["Puis-je utiliser mes avantages sur tous les produits ?"],
            answers: [
              "Les avantages du programme peuvent être valables sur une large gamme de produits, mais certains articles peuvent être exclus en fonction des conditions des offres en cours.",
              "Assurez-vous de vérifier les détails de l'offre avant d'effectuer un achat pour savoir si des exclusions s'appliquent.",
            ],
          },
          {
            title: "Quels sont les moyens de paiement acceptés ?",
            questions: ["Quels modes de paiement puis-je utiliser après l'adhésion ?"],
            answers: [
              "Manzo accepte divers moyens de paiement, y compris les cartes de crédit/débit, les portefeuilles électroniques, et parfois même les virements bancaires, selon le type de transaction.",
              "Vous pouvez sélectionner votre mode de paiement préféré dans la section 'Paiement' lors de la commande.",
            ],
          },
          {
            title: "Puis-je cumuler des points fidélité sur des achats en magasin ?",
            questions: ["Les achats en magasin permettent-ils de cumuler des points fidélité ?"],
            answers: [
              "Oui, vous pouvez cumuler des points fidélité sur les achats effectués en magasin, à condition de présenter votre compte Manzo ou votre code lors du paiement.",
              "Les points seront crédités sur votre compte une fois la transaction finalisée.",
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
              02
            </p>
            <p className="text-lg font-bold text-[35px] text-[#1B1F2A] mb-6 mt-[7%] text-center">
            Post Adhésion au programme             </p>
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
    
  
  export default FAQpostAdhesion;
  