---
description: Principes pour une utilisation responsable de l'IA dans le développement logiciel.
language: fr
section: principles
---

# Principes

1. Ne soumettre que du code que l’on peut **défendre**

    Le développeur doit pouvoir expliquer les choix importants du code qu’il propose : sa logique, ses compromis, ses limites et les alternatives écartées.

    L’objectif n’est pas de connaître chaque détail par cœur, mais d’être capable de justifier ce qui entre dans la base de code.

2. Considérer toute génération comme une **proposition**

    Le code produit par un LLM n’est jamais une réponse validée. C’est une hypothèse de travail, au même titre qu’un exemple trouvé en ligne ou une suggestion faite par un collègue.

    Il doit donc être évalué, corrigé ou rejeté avant d’être adopté.

3. Conserver une maîtrise **proportionnelle à l’impact**

    Plus un changement est critique, complexe, difficile à réverser ou coûteux à maintenir, plus le niveau de compréhension et de vérification attendu doit être élevé.

    Toutes les lignes ne présentent pas le même risque, mais aucune ne devient fiable simplement parce qu’elle a été générée avec assurance.

4. Préférer le **code maîtrisé** au code impressionnant

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
