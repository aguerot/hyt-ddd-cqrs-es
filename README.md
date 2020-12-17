# hyt-ddd-cqrs-es

## Objectif

Cette formation permet aux participants d’acquérir des bases pratiques pour implémenter un système avec CQRS (Command And Query Responsibility Segregation) et ES (Event Sourcing), en s’appuyant sur le DDD (Domain Driven Design) pour donner du sens à cette implémentation.

Depuis la conception en Event Storming jusqu’à l’implémentation, nous créerons ensemble un système évènementiel, dans votre langage de prédilection.

- comprendre et implémenter CQRS
- comprendre et implémenter ES
- mise en place d'une architecture DDD like
- comprendre quand mettre en place ce type d'architecture

## Acquis à l’issue de la formation

Le participant à cette formation aura acquis des bases solides pour l’implémentation d’un système évènementiel et réactif et en particulier:

- Conception
  - Comprendre et effectuer un Event Storming
  - Analyser le métier avec une approche évènementielle
  - Organiser le code avec une architecture hexagonale
- Notions de Domain Driven Design
  - Découvrir et appliquer Ubiquitous Language dans le code
  - Identifier et définir les Bounded Context
  - Désigner et implémenter les Agregates, Entities et Value Object
  - Comprendre les autres patterns stratégiques et tactiques
- Implémentation
  - Créer et maintenir une classe Event Sourcing
  - Créer et maintenir un système CQRS
  - Mise en place d'une base de données évènementielle NoSQL
  - Transmettre les évènements via un système Publisher/Subscriber basique
  - Comprendre les modes de communication intra et inter contextes

## Programme

En partant de rien et sur un sujet commun, nous construisons petit à petit les bases d’un système CQRS/ES en utilisant des pratiques issues du DDD.

- 1ère demi-journée
  - Event Storming, sujet site e-Commerce
  - Notion d’Aggregate/Command/Events et Bounded Contexts
- 2ème demi-journée
  constructeur
- 3 possibilités d’implémentation des Events dans un Aggregate
  - EventBus
  - Persistence via les événements dans SQLite
- 3ème demi-journée
  - Reprendre le concept d’EventBus
  - Query et Projection
- 4ème demi-journée
  - Event Sourcing : stockage des événements avec implémentation d’un Store
  - Etat via les événements

Une branche par jour agu/dayXYZ
