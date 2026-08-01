# Pour une utilisation intelligente de l'IA

## Pourquoi ce manifeste ?

Nous découvrons chaque jour de nouvelles façons de développer des logiciels grâce à l'intelligence artificielle. Son potentiel est immense, mais il ne dispense ni de comprendre le code, ni d'en assumer la responsabilité.

À travers ce manifeste, nous affirmons que la valeur d'un développeur ne réside pas dans la quantité de code qu'il produit, mais dans sa capacité à le comprendre, à le remettre en question et à en répondre. L'IA est un formidable levier ; elle ne doit jamais devenir un substitut au jugement humain.

## Le Manifeste

Nous découvrons une nouvelle manière de développer des logiciels grâce aux modèles de langage.

À travers cette pratique, nous avons appris à valoriser :

- La **compréhension** plutôt que la génération.
- La **responsabilité** plutôt que la délégation au modèle.
- La **simplicité** plutôt que l'accumulation de code.
- La **lisibilité** pour les humains plutôt que la complexité produite par les IA.
- L'**esprit critique** plutôt que la confiance dans les réponses du modèle.

Autrement dit, nous reconnaissons de la valeur dans les éléments de droite, mais privilégions ceux de gauche.

## Charte

L'IA est un accélérateur, pas un remplaçant de la réflexion.

Nous considérons qu'un développeur est responsable de chaque ligne de code qu'il soumet, qu'elle ait été écrite par lui ou générée par un LLM.

Avant toute soumission, un code doit être :

- **relu** : vous ne supposez jamais que le modèle a raison ;
- **compris** : vous êtes capable d'expliquer chaque partie du code produit ;
- **testé** : vous vérifiez que le comportement est correct, pas seulement que les tests passent ;
- **Nettoyé** : vous supprimez tout ce qui est inutile ou surconçu ;
- **Clarifié** : vous veillez à ce que le code puisse être lu, compris et maintenu facilement par des humains.

*Une review de code n'a pas pour vocation de découvrir ce que l'auteur n'a pas pris le temps de vérifier.*

L'IA nous fait gagner du temps. Ce temps doit être réinvesti dans la compréhension, la qualité, les tests et la conception — jamais dans la multiplication de code non maîtrisé.

**Ne déléguez pas votre jugement à un modèle. C'est précisément ce jugement qui fait de vous un développeur.**

## Principes

1. Ne soumettre que du code que l’on peut **défendre**

    Le développeur doit pouvoir expliquer les choix importants du code qu’il propose : sa logique, ses compromis, ses limites et les alternatives écartées.

    L’objectif n’est pas de connaître chaque détail par cœur, mais d’être capable de justifier ce qui entre dans la base de code.

2. Considérer toute génération comme une **proposition**

    Le code produit par un LLM n’est jamais une réponse validée. C’est une hypothèse de travail, au même titre qu’un exemple trouvé en ligne ou une suggestion faite par un collègue.

    Il doit donc être évalué, corrigé ou rejeté avant d’être adopté.

3. Conserver une maîtrise **proportionnelle à l’impact**

    Plus un changement est critique, complexe, difficile à réverser ou coûteux à maintenir, plus le niveau de compréhension et de vérification attendu doit être élevé.

    Toutes les lignes ne présentent pas le même risque, mais aucune ne devient fiable simplement parce qu’elle a été générée avec assurance.

4. Préférer le **code maîtrisé **au code impressionnant

    Une solution simple, comprise et adaptée vaut mieux qu’une solution sophistiquée que personne ne maîtrise vraiment.

    L’IA ne doit pas encourager la surenchère technique, l’abstraction prématurée ou l’introduction de concepts inutiles.

5. **Réduire** avant d’ajouter

    La facilité de génération ne doit pas conduire à produire davantage de code que nécessaire.

    Chaque ajout crée un coût futur : lecture, tests, maintenance, documentation, sécurité et évolution. Générer rapidement ne rend pas ce coût gratuit.

6. Écrire pour le **prochain lecteur**

    Le code ne doit pas seulement fonctionner. Il doit rendre son intention accessible à la personne qui devra le relire, le modifier ou le diagnostiquer plus tard.

    La lisibilité n’est pas une préférence esthétique : c’est une condition de la responsabilité collective.

7. Assumer le **travail de validation** avant la review

    Une soumission (Pull Request) doit présenter un travail déjà compris, relu, testé, nettoyé et clarifié.

    La review sert à confronter des choix, détecter des angles morts et améliorer une proposition — pas à effectuer à la place de l’auteur le premier travail de vérification.

8. Assumer la même **responsabilité**, quelle que soit l’origine du code

    La responsabilité d’une ligne appartient à la personne qui la soumet, et non à l’outil qui l’a générée.

    « C’est l’IA qui l’a écrit » ne constitue ni une explication, ni une justification, ni une atténuation de responsabilité.

9. Utiliser le temps gagné pour **augmenter la qualité**

    Le bénéfice de l’IA ne devrait pas seulement être mesuré en volume produit ou en vitesse d’exécution.

    Le temps économisé doit permettre de mieux comprendre le problème, examiner les cas limites, améliorer les tests, simplifier la conception et documenter les décisions importantes.

10. **Accepter d’écarter** une génération

    Une suggestion difficile à comprendre, à vérifier ou à simplifier doit pouvoir être abandonnée, même si elle semble fonctionner.

    Le coût déjà engagé dans une conversation avec un LLM ne justifie jamais l’intégration d’un code mal maîtrisé.

## Contribution

Les suggestions et les discussions sont les bienvenues.

L'objectif n'est pas d'être anti-IA, mais de promouvoir une ingénierie logicielle responsable avec l'IA.

## Licence

Ce travail est mis à disposition selon les termes de la licence Creative Commons Attribution 4.0 International (CC BY 4.0).

https://creativecommons.org/licenses/by/4.0/
