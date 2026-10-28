// Banque de questions : [id, parcours, thème, niveau (d/i), question, [bonne réponse, 3 fausses], explication]
const QS = [
[
"t1",
"tip",
"Matériel",
"d",
"À quoi sert la RAM (mémoire vive) ?",
[
"Garder en mémoire, pour un moment, les programmes et données en cours d'utilisation",
"Stocker les fichiers pour toujours",
"Refroidir le processeur",
"Afficher l'image à l'écran"
],
"La RAM est très rapide mais elle s'efface quand on éteint le PC. Les fichiers, eux, restent sur le SSD ou le disque dur."
],
[
"t2",
"tip",
"Matériel",
"d",
"Quel composant est le « cerveau » qui fait les calculs du PC ?",
[
"Le processeur (CPU)",
"L'alimentation",
"La carte réseau",
"Le disque dur"
],
"Le CPU exécute les instructions des programmes. Les grandes marques sont Intel et AMD."
],
[
"t3",
"tip",
"Matériel",
"d",
"Quel est le gros avantage d'un SSD par rapport à un disque dur classique (HDD) ?",
[
"Il est beaucoup plus rapide et n'a pas de pièce qui tourne",
"Il est toujours moins cher pour la même capacité",
"Il a toujours plus de capacité",
"Il n'a pas besoin d'électricité"
],
"Un SSD utilise de la mémoire flash, sans plateau ni tête de lecture : Windows démarre en quelques secondes."
],
[
"t4",
"tip",
"Matériel",
"d",
"Sur quelle pièce se branchent tous les composants du PC ?",
[
"La carte mère",
"Le boîtier",
"Le ventilateur",
"L'écran"
],
"La carte mère relie le processeur, la RAM, le stockage, la carte graphique et les ports."
],
[
"t5",
"tip",
"Matériel",
"d",
"Que désigne « PSU » dans un PC ?",
[
"L'alimentation électrique",
"La carte graphique",
"La pile du BIOS",
"Un port USB"
],
"PSU = Power Supply Unit. Elle transforme le courant de la prise en tensions utilisables par les composants."
],
[
"t6",
"tip",
"Matériel",
"i",
"Un SSD « M.2 NVMe », c'est…",
[
"Un SSD très rapide qui se branche directement sur la carte mère",
"Une barrette de RAM",
"Un câble pour l'écran",
"Une carte son"
],
"Le NVMe passe par les lignes PCIe : il va plusieurs fois plus vite qu'un SSD SATA classique."
],
[
"t7",
"tip",
"Matériel",
"i",
"Peut-on mettre une barrette de DDR4 dans un emplacement DDR5 ?",
[
"Non, elle ne rentre pas : l'encoche n'est pas au même endroit",
"Oui, et elle ira plus vite",
"Oui, mais elle ira moins vite",
"Oui, le PC la convertit tout seul"
],
"Chaque génération de RAM a une encoche différente pour éviter les erreurs. Il faut le type accepté par la carte mère."
],
[
"t8",
"tip",
"Matériel",
"i",
"À quoi sert la pâte thermique ?",
[
"À mieux faire passer la chaleur du processeur vers le refroidisseur",
"À coller le processeur sur la carte mère",
"À isoler la carte mère de l'électricité",
"À nettoyer les contacts"
],
"Elle remplit les micro-trous entre le processeur et le radiateur. Sans elle, le CPU chauffe beaucoup plus."
],
[
"t9",
"tip",
"Matériel",
"i",
"Le BIOS / UEFI, c'est…",
[
"Le petit programme de la carte mère qui démarre le PC avant Windows",
"Un antivirus",
"Un type de RAM",
"Un dossier de Windows"
],
"On y règle par exemple l'ordre de démarrage (clé USB, SSD…). On y entre souvent avec Suppr, F2 ou F10 au démarrage."
],
[
"t10",
"tip",
"Windows",
"d",
"Quel raccourci ouvre directement le Gestionnaire des tâches ?",
[
"Ctrl + Maj + Échap",
"Ctrl + C",
"Alt + F4",
"Windows + D"
],
"Ctrl + Maj + Échap ouvre le Gestionnaire des tâches sans passer par l'écran Ctrl + Alt + Suppr."
],
[
"t11",
"tip",
"Windows",
"d",
"Quelle est la différence entre un compte administrateur et un compte standard ?",
[
"L'administrateur peut installer des logiciels et changer les réglages du système, le standard est limité",
"Il n'y en a aucune",
"Le compte standard est plus rapide",
"L'administrateur ne peut pas aller sur Internet"
],
"Pour la sécurité, on utilise un compte standard au quotidien : un virus aura moins de pouvoir."
],
[
"t12",
"tip",
"Windows",
"d",
"Pourquoi faut-il faire les mises à jour de Windows ?",
[
"Pour corriger des failles de sécurité et des bugs",
"Pour changer le fond d'écran",
"Pour supprimer ses fichiers",
"Pour ralentir le PC"
],
"Beaucoup d'attaques utilisent des failles déjà corrigées par une mise à jour que la victime n'a pas faite."
],
[
"t13",
"tip",
"Windows",
"d",
"Où voir les programmes qui se lancent au démarrage de Windows 10 / 11 ?",
[
"Dans le Gestionnaire des tâches, partie « Démarrage » (applications de démarrage)",
"Dans la Corbeille",
"Dans le Bloc-notes",
"Dans les réglages de l'imprimante"
],
"On peut y désactiver les programmes inutiles pour que le PC démarre plus vite."
],
[
"t14",
"tip",
"Windows",
"d",
"La fenêtre « Voulez-vous autoriser cette application à apporter des modifications ? », c'est…",
[
"L'UAC : une protection qui demande ton accord avant une action administrateur",
"Un virus",
"Une publicité",
"Une mise à jour automatique"
],
"UAC = Contrôle de compte d'utilisateur. Il faut le laisser activé : il bloque les changements faits en douce."
],
[
"t15",
"tip",
"Windows",
"d",
"Pour installer Windows sur un PC, on utilise le plus souvent…",
[
"Une clé USB d'installation créée avec l'outil officiel de Microsoft",
"Une imprimante",
"Un câble HDMI",
"Le Bluetooth"
],
"L'outil de création de support de Microsoft prépare une clé USB de démarrage (8 Go minimum)."
],
[
"t16",
"tip",
"Windows",
"d",
"Le raccourci Windows + L sert à…",
[
"Verrouiller la session",
"Ouvrir l'Explorateur de fichiers",
"Éteindre le PC",
"Ouvrir le navigateur"
],
"Réflexe pro : on verrouille son poste dès qu'on s'en éloigne."
],
[
"t17",
"tip",
"Windows",
"d",
"Le raccourci Windows + E ouvre…",
[
"L'Explorateur de fichiers",
"Le Gestionnaire des tâches",
"Les Paramètres",
"La loupe"
],
"E comme Explorateur. Windows + I ouvre les Paramètres."
],
[
"t18",
"tip",
"Windows",
"i",
"À quoi sert le mode sans échec ?",
[
"Démarrer Windows avec le minimum de pilotes pour réparer un problème",
"Jouer sans publicité",
"Accélérer Internet",
"Formater le disque"
],
"Si un pilote ou un logiciel fait planter Windows, le mode sans échec permet souvent de démarrer quand même et de le retirer."
],
[
"t19",
"tip",
"Windows",
"i",
"Quelle commande vérifie et répare les fichiers système de Windows ?",
[
"sfc /scannow",
"ipconfig /all",
"ping 8.8.8.8",
"dir"
],
"Elle se lance dans une invite de commandes ouverte en administrateur."
],
[
"t20",
"tip",
"Réseau",
"d",
"Une adresse IP, c'est…",
[
"L'adresse d'un appareil sur un réseau",
"Le mot de passe du Wi-Fi",
"La vitesse d'Internet",
"Le nom du PC"
],
"Comme une adresse postale : elle permet aux données d'arriver au bon appareil."
],
[
"t21",
"tip",
"Réseau",
"d",
"Quel est le rôle du DHCP ?",
[
"Donner automatiquement une adresse IP aux appareils",
"Traduire les noms de sites en adresses IP",
"Bloquer les virus",
"Accélérer le Wi-Fi"
],
"À la maison, c'est en général la box qui fait serveur DHCP."
],
[
"t22",
"tip",
"Réseau",
"d",
"Quel est le rôle du DNS ?",
[
"Traduire un nom de site (ex. google.fr) en adresse IP",
"Donner une adresse IP aux appareils",
"Chiffrer le Wi-Fi",
"Gérer l'imprimante"
],
"C'est l'annuaire d'Internet : on retient des noms, les machines utilisent des numéros."
],
[
"t23",
"tip",
"Réseau",
"d",
"Quelle commande Windows affiche l'adresse IP du PC ?",
[
"ipconfig",
"ping",
"sfc",
"cls"
],
"ipconfig /all donne encore plus de détails : DNS, adresse MAC, DHCP…"
],
[
"t24",
"tip",
"Réseau",
"d",
"À quoi sert la commande ping ?",
[
"Tester si un appareil répond et mesurer le temps de réponse",
"Changer d'adresse IP",
"Supprimer un virus",
"Mettre à jour Windows"
],
"Exemple : ping 8.8.8.8 teste la sortie vers Internet. Le temps est en millisecondes (ms)."
],
[
"t25",
"tip",
"Réseau",
"d",
"Une adresse qui commence par 192.168. est…",
[
"Une adresse privée, utilisée dans le réseau de la maison ou de l'entreprise",
"Une adresse publique d'Internet",
"L'adresse d'un site web",
"Une adresse e-mail"
],
"Les plages privées : 10.x.x.x, 172.16 à 172.31.x.x et 192.168.x.x. Elles ne sortent pas telles quelles sur Internet."
],
[
"t26",
"tip",
"Réseau",
"i",
"Le PC a une adresse en 169.254.x.x. Ça veut dire quoi ?",
[
"Il n'a pas reçu d'adresse du DHCP : souci de connexion avec la box",
"Tout va bien",
"Internet est très rapide",
"C'est une IP fixe bien réglée"
],
"C'est une adresse que Windows se donne tout seul (APIPA) quand personne ne lui répond. On vérifie câble, Wi-Fi et box."
],
[
"t27",
"tip",
"Réseau",
"i",
"La « passerelle par défaut », c'est…",
[
"L'appareil (souvent la box) par où on sort vers Internet",
"Le DNS de Google",
"Le câble Ethernet",
"Le pare-feu de Windows"
],
"On la voit avec ipconfig. Si on ne peut pas la pinger, le problème est entre le PC et la box."
],
[
"t28",
"tip",
"Réseau",
"i",
"Quelle bande Wi-Fi porte le plus loin, mais avec un débit plus faible ?",
[
"2,4 GHz",
"5 GHz",
"6 GHz",
"60 GHz"
],
"Le 2,4 GHz traverse mieux les murs. Le 5 GHz est plus rapide mais porte moins loin."
],
[
"t29",
"tip",
"Réseau",
"i",
"L'adresse 8.8.8.8, c'est…",
[
"Un serveur DNS public de Google",
"L'adresse de la box",
"Une adresse privée",
"Un numéro de port"
],
"Autre DNS public connu : 1.1.1.1 (Cloudflare)."
],
[
"t30",
"tip",
"Réseau",
"i",
"Que fait la commande ipconfig /flushdns ?",
[
"Elle vide le cache DNS du PC",
"Elle supprime la carte réseau",
"Elle change le mot de passe Wi-Fi",
"Elle redémarre la box"
],
"Utile quand un site a changé d'adresse et que le PC garde l'ancienne en mémoire."
],
[
"t31",
"tip",
"Dépannage",
"d",
"Un utilisateur dit « mon PC marche pas ». Tu fais quoi en premier ?",
[
"Je pose des questions pour comprendre le problème exact",
"Je formate le PC",
"Je change la carte mère",
"Je raccroche"
],
"Quoi, depuis quand, message d'erreur, qu'est-ce qui a changé : un bon diagnostic commence par les bonnes questions."
],
[
"t32",
"tip",
"Dépannage",
"d",
"Quel réflexe simple règle beaucoup de pannes ?",
[
"Redémarrer l'appareil",
"Acheter un nouveau PC",
"Démonter le PC",
"Réinstaller Windows tout de suite"
],
"Un redémarrage vide la RAM et relance les services. On commence toujours par le plus simple."
],
[
"t33",
"tip",
"Dépannage",
"d",
"Écran noir, mais le PC tourne (ventilateurs, lumières). Tu vérifies d'abord…",
[
"Que l'écran est allumé et que le câble vidéo est bien branché",
"Le processeur",
"La mise à jour du BIOS",
"Le remplacement de la RAM"
],
"On part du plus simple : alimentation de l'écran, câble, bonne source (HDMI 1, HDMI 2…)."
],
[
"t34",
"tip",
"Dépannage",
"d",
"Un programme ne répond plus. Que faire ?",
[
"Le fermer avec le Gestionnaire des tâches (« Fin de tâche »)",
"Débrancher le PC de la prise",
"Supprimer Windows",
"Attendre une semaine"
],
"Fin de tâche ferme seulement ce programme, sans risque pour le reste du système."
],
[
"t35",
"tip",
"Dépannage",
"d",
"Pourquoi noter ce qu'on a fait pendant une intervention (ticket) ?",
[
"Pour garder une trace utile au suivi et aux collègues",
"Ça ne sert à rien",
"Pour faire payer deux fois",
"Parce que Windows l'exige"
],
"Un ticket bien rempli (problème, actions, solution) fait gagner du temps la prochaine fois."
],
[
"t36",
"tip",
"Dépannage",
"i",
"PC très lent, et le disque est à 100 % dans le Gestionnaire des tâches. Cause probable ?",
[
"Un disque dur mécanique saturé ou fatigué : passer à un SSD règle souvent le problème",
"L'écran est trop grand",
"La souris est usée",
"Le clavier est mal branché"
],
"On peut aussi vérifier la santé du disque (SMART) et ce qui l'utilise dans l'onglet Processus."
],
[
"t37",
"tip",
"Dépannage",
"i",
"Des bips au démarrage et rien à l'écran : c'est souvent…",
[
"La carte mère qui signale un souci, souvent de RAM ou de carte graphique",
"Un virus",
"Le Wi-Fi",
"L'imprimante"
],
"Le nombre de bips a un sens qui dépend du fabricant. Premier test : bien réinsérer la RAM."
],
[
"t38",
"tip",
"Dépannage",
"d",
"Au téléphone, l'utilisateur n'est pas à l'aise avec l'informatique. La bonne attitude ?",
[
"Parler simplement, sans jargon, et vérifier qu'il a compris",
"Parler technique et vite",
"Lui dire qu'il n'y connaît rien",
"Prendre la main sur son PC sans prévenir"
],
"Patience et mots simples : l'utilisateur doit sortir de l'appel rassuré."
],
[
"t39",
"tip",
"Dépannage",
"d",
"Avant de prendre la main à distance sur le PC de quelqu'un, tu dois…",
[
"Demander son accord",
"Rien, tu te connectes",
"Changer son mot de passe",
"Éteindre son PC"
],
"Sans accord, c'est une faute de confiance, et parfois illégal."
],
[
"t40",
"tip",
"Sécurité",
"d",
"Qu'est-ce qu'un bon mot de passe ?",
[
"Long, différent pour chaque site, avec lettres, chiffres et symboles",
"Sa date de naissance",
"123456",
"Le même partout pour ne pas l'oublier"
],
"Une phrase de passe longue est facile à retenir et dure à deviner."
],
[
"t41",
"tip",
"Sécurité",
"d",
"Le phishing (hameçonnage), c'est…",
[
"Un faux message qui imite une vraie entreprise pour voler tes infos",
"Un logiciel de pêche",
"Une mise à jour",
"Un type de câble"
],
"Exemples : faux colis, fausse banque, faux impôts."
],
[
"t42",
"tip",
"Sécurité",
"d",
"Quel signe doit faire penser à un mail de phishing ?",
[
"Un ton urgent et un lien vers une adresse bizarre",
"Un mail que tu attendais",
"Ton prénom bien écrit",
"Une signature normale"
],
"On passe la souris sur le lien sans cliquer pour voir la vraie adresse. Dans le doute, on va sur le site officiel soi-même."
],
[
"t43",
"tip",
"Sécurité",
"i",
"La règle de sauvegarde 3-2-1, c'est…",
[
"3 copies, sur 2 supports différents, dont 1 hors de chez soi",
"3 mots de passe, 2 comptes, 1 PC",
"3 PC, 2 écrans, 1 clé",
"321 fichiers maximum"
],
"Exemple : le PC + un disque externe + un cloud (OneDrive, iCloud…)."
],
[
"t44",
"tip",
"Sécurité",
"d",
"La double authentification (2FA) ajoute…",
[
"Une deuxième preuve (code SMS, appli) en plus du mot de passe",
"Un deuxième mot de passe identique",
"Un deuxième compte",
"Un deuxième antivirus"
],
"Même si ton mot de passe est volé, le pirate n'a pas le deuxième code."
],
[
"t45",
"tip",
"Sécurité",
"d",
"Un rançongiciel (ransomware)…",
[
"Chiffre tes fichiers et demande de l'argent pour les rendre",
"Accélère le PC",
"Est un antivirus",
"Est une sauvegarde"
],
"La meilleure parade : des sauvegardes régulières, dont une débranchée du PC."
],
[
"t46",
"tip",
"Sécurité",
"d",
"Pourquoi ne pas brancher une clé USB trouvée par terre ?",
[
"Elle peut contenir un virus",
"Elle est trop lente",
"Elle casse le port USB",
"Elle est forcément vide"
],
"C'est une vraie technique d'attaque : laisser traîner des clés piégées."
],
[
"t47",
"tip",
"Sécurité",
"i",
"Un gestionnaire de mots de passe…",
[
"Retient pour toi des mots de passe forts et uniques, protégés par un mot de passe principal",
"Est un outil de pirate",
"Change le mot de passe du Wi-Fi",
"Ne sert à rien"
],
"Exemples : Bitwarden, celui de Chrome ou le trousseau iCloud."
],
[
"t48",
"tip",
"Périphériques",
"i",
"L'imprimante n'imprime plus et des documents restent bloqués. Solution courante ?",
[
"Annuler les documents en attente et redémarrer le service « Spouleur d'impression »",
"Changer d'écran",
"Formater le PC",
"Changer la souris"
],
"Le spouleur gère la file d'impression. On le redémarre via services.msc."
],
[
"t49",
"tip",
"Périphériques",
"d",
"Un pilote (driver), c'est…",
[
"Le petit logiciel qui permet à Windows de faire marcher un matériel",
"Un câble",
"Un utilisateur",
"Un virus"
],
"On prend les pilotes chez le fabricant ou via Windows Update."
],
[
"t50",
"tip",
"Périphériques",
"d",
"Quels câbles pour brancher un écran récent ?",
[
"HDMI ou DisplayPort",
"RJ45",
"Câble téléphone",
"Câble d'alimentation seulement"
],
"Le VGA (bleu) existe encore sur les vieux écrans, mais il est analogique et dépassé."
],
[
"t51",
"tip",
"Périphériques",
"d",
"Le câble RJ45 sert à…",
[
"Brancher le réseau Ethernet (câble internet)",
"Brancher l'écran",
"Imprimer seulement",
"Alimenter le PC"
],
"C'est le câble réseau entre le PC et la box ou un switch."
],
[
"t52",
"tip",
"Périphériques",
"i",
"Pour qu'une imprimante réseau garde toujours la même adresse, on lui donne…",
[
"Une IP fixe (ou une réservation DHCP sur la box)",
"Un nouveau nom chaque jour",
"Un câble HDMI",
"Un antivirus"
],
"Si son IP change, les PC ne la retrouvent plus."
],
[
"t53",
"tip",
"Périphériques",
"d",
"Qu'est-ce qui est vrai pour l'USB-C ?",
[
"La prise est réversible : elle se branche dans les deux sens",
"Il sert uniquement à charger",
"Il n'existe que chez Apple",
"Il est toujours plus lent que l'USB 2.0"
],
"L'USB-C est une forme de prise ; la vitesse dépend de la norme (USB 3.2, USB4, Thunderbolt…)."
],
[
"t54",
"tip",
"Périphériques",
"d",
"Une souris Bluetooth ne marche plus. Premier test ?",
[
"Vérifier les piles ou la charge, et que le Bluetooth est activé",
"Changer la carte mère",
"Réinstaller Windows",
"Changer d'écran"
],
"Toujours le plus simple d'abord. Ensuite : supprimer puis réassocier l'appareil."
],
[
"d1",
"dev",
"HTML",
"d",
"À quoi sert le HTML ?",
[
"Décrire la structure et le contenu d'une page web",
"Choisir les couleurs et la mise en page",
"Gérer une base de données",
"Faire tourner un serveur"
],
"HTML = la structure (titres, textes, images, liens). Le CSS gère l'apparence, le JavaScript l'interaction."
],
[
"d2",
"dev",
"HTML",
"d",
"Quelle balise crée un lien cliquable ?",
[
"<a>",
"<link>",
"<href>",
"<url>"
],
"Exemple : <a href=\"https://exemple.fr\">Clique ici</a>. La balise <link> sert à relier un fichier, comme un CSS."
],
[
"d3",
"dev",
"HTML",
"d",
"Quelle balise affiche une image ?",
[
"<img>",
"<pic>",
"<image>",
"<src>"
],
"Exemple : <img src=\"photo.jpg\" alt=\"Description\">. Elle n'a pas de balise fermante."
],
[
"d4",
"dev",
"HTML",
"d",
"Quelle balise est le titre le plus important ?",
[
"<h1>",
"<h6>",
"<title>",
"<head>"
],
"De <h1> (le plus important) à <h6>. La balise <title> donne le nom de l'onglet."
],
[
"d5",
"dev",
"HTML",
"d",
"À quoi sert l'attribut alt d'une image ?",
[
"Donner un texte de remplacement, lu par les lecteurs d'écran et affiché si l'image ne charge pas",
"Choisir la taille",
"Choisir la couleur",
"Ajouter un lien"
],
"C'est important pour l'accessibilité et pour le référencement."
],
[
"d6",
"dev",
"HTML",
"d",
"La balise <ul> crée…",
[
"Une liste à puces",
"Une liste numérotée",
"Un tableau",
"Un lien"
],
"<ul> = liste non ordonnée, <ol> = liste numérotée. Chaque élément est dans un <li>."
],
[
"d7",
"dev",
"HTML",
"d",
"Où met-on le contenu visible de la page ?",
[
"Dans <body>",
"Dans <head>",
"Dans <meta>",
"Dans <title>"
],
"<head> contient les infos sur la page (titre, CSS, encodage), <body> ce que l'on voit."
],
[
"d8",
"dev",
"HTML",
"i",
"Pourquoi utiliser <button> plutôt qu'une <div> pour un bouton ?",
[
"<button> marche au clavier et avec les lecteurs d'écran sans rien ajouter",
"Une <div> est interdite",
"Ça ne change rien",
"<button> est obsolète"
],
"Utiliser la bonne balise, c'est du HTML « sémantique » : plus accessible et plus simple."
],
[
"d9",
"dev",
"CSS",
"d",
"À quoi sert le CSS ?",
[
"Gérer l'apparence : couleurs, tailles, mise en page",
"Créer la structure de la page",
"Programmer le serveur",
"Entraîner une IA"
],
"CSS = Cascading Style Sheets, les feuilles de style."
],
[
"d10",
"dev",
"CSS",
"d",
"Quelle propriété change la couleur du texte ?",
[
"color",
"font-color",
"text-color",
"background"
],
"Exemple : p { color: red; }. background change le fond."
],
[
"d11",
"dev",
"CSS",
"d",
"Le sélecteur .menu cible…",
[
"Les éléments qui ont class=\"menu\"",
"L'élément qui a id=\"menu\"",
"Les balises <menu> seulement",
"Tous les éléments de la page"
],
"Le point = une classe. Le dièse # = un id."
],
[
"d12",
"dev",
"CSS",
"d",
"Le sélecteur #titre cible…",
[
"L'élément qui a id=\"titre\"",
"Les éléments qui ont class=\"titre\"",
"Toutes les balises <h1>",
"Tous les titres de la page"
],
"Un id doit être unique dans la page, une classe peut être utilisée plusieurs fois."
],
[
"d13",
"dev",
"CSS",
"d",
"À quoi sert display: flex ?",
[
"À aligner facilement des éléments en ligne ou en colonne",
"À cacher un élément",
"À lancer une animation",
"À relier un fichier CSS"
],
"Avec justify-content et align-items, on centre et on répartit les éléments facilement."
],
[
"d14",
"dev",
"CSS",
"i",
"Que fait @media (max-width: 600px) { … } ?",
[
"Appliquer des styles seulement sur les écrans de 600 px de large ou moins",
"Ajouter une vidéo",
"Charger une police",
"Imprimer la page"
],
"C'est la base du « responsive » : un site qui s'adapte au téléphone."
],
[
"d15",
"dev",
"CSS",
"i",
"Dans le modèle de boîte, l'ordre de l'intérieur vers l'extérieur est…",
[
"contenu, padding, border, margin",
"margin, border, padding, contenu",
"padding, contenu, margin, border",
"border, contenu, margin, padding"
],
"Le padding est l'espace intérieur, la margin l'espace extérieur, la border est entre les deux."
],
[
"d16",
"dev",
"JavaScript",
"d",
"Comment déclarer une variable qu'on ne va pas réassigner ?",
[
"const",
"let",
"fixed",
"static"
],
"const pour une valeur qu'on ne réassigne pas, let pour une valeur qui change. var est l'ancienne façon."
],
[
"d17",
"dev",
"JavaScript",
"d",
"Que fait console.log(\"salut\") ?",
[
"Il affiche « salut » dans la console du navigateur",
"Il ouvre une fenêtre popup",
"Il enregistre un fichier",
"Il envoie un mail"
],
"La console s'ouvre avec F12 : c'est l'outil n°1 pour déboguer."
],
[
"d18",
"dev",
"JavaScript",
"i",
"Que donne \"5\" + 3 en JavaScript ?",
[
"\"53\"",
"8",
"Une erreur",
"NaN"
],
"Avec + et un texte, JavaScript colle les deux en texte. Pour additionner : Number(\"5\") + 3 = 8."
],
[
"d19",
"dev",
"JavaScript",
"i",
"Que compare l'opérateur === ?",
[
"La valeur ET le type",
"Seulement la valeur",
"Rien, il donne une valeur",
"La longueur"
],
"5 === \"5\" est faux (nombre contre texte), alors que 5 == \"5\" est vrai. On préfère ===."
],
[
"d20",
"dev",
"JavaScript",
"d",
"Dans un tableau, quel est l'indice du premier élément ?",
[
"0",
"1",
"-1",
"Ça dépend"
],
"fruits[0] est le premier élément. C'est pareil en Python."
],
[
"d21",
"dev",
"JavaScript",
"d",
"À quoi sert addEventListener(\"click\", maFonction) ?",
[
"À lancer une fonction quand on clique sur un élément",
"À créer un élément",
"À supprimer la page",
"À changer le style"
],
"C'est comme ça qu'on rend une page interactive."
],
[
"d22",
"dev",
"JavaScript",
"i",
"Que renvoie typeof [] en JavaScript ?",
[
"\"object\"",
"\"array\"",
"\"list\"",
"\"undefined\""
],
"Les tableaux sont des objets en JS. Pour tester un tableau : Array.isArray(x)."
],
[
"d23",
"dev",
"JavaScript",
"i",
"À quoi sert fetch() ?",
[
"À faire une requête HTTP, par exemple appeler une API",
"À faire une boucle",
"À créer une variable",
"À mettre du style"
],
"fetch renvoie une promesse : on l'utilise souvent avec await."
],
[
"d24",
"dev",
"Git",
"d",
"Git, c'est…",
[
"Un outil qui garde l'historique des versions de ton code",
"Un site web",
"Un langage de programmation",
"Un éditeur de texte"
],
"Avec Git, on peut revenir en arrière et voir qui a changé quoi."
],
[
"d25",
"dev",
"Git",
"d",
"GitHub, c'est…",
[
"Un site qui héberge des dépôts Git en ligne pour partager et travailler à plusieurs",
"Exactement la même chose que Git",
"Un antivirus",
"Un langage"
],
"Git est l'outil, GitHub un service en ligne qui l'utilise (comme GitLab)."
],
[
"d26",
"dev",
"Git",
"d",
"Que fait git commit -m \"message\" ?",
[
"Il enregistre une version des changements préparés, avec un message",
"Il envoie le code sur GitHub",
"Il télécharge un projet",
"Il supprime des fichiers"
],
"Un commit = une photo du projet à un moment. Le message explique ce qui a changé."
],
[
"d27",
"dev",
"Git",
"d",
"Que fait git push ?",
[
"Il envoie tes commits vers le dépôt distant (ex. GitHub)",
"Il récupère les changements des autres",
"Il crée une branche",
"Il annule le dernier commit"
],
"push = pousser vers le serveur, pull = tirer depuis le serveur."
],
[
"d28",
"dev",
"Git",
"d",
"Que fait git pull ?",
[
"Il récupère et intègre les changements du dépôt distant",
"Il envoie tes commits",
"Il supprime le dépôt",
"Il crée un nouveau dépôt"
],
"On fait un pull avant de travailler pour partir de la dernière version."
],
[
"d29",
"dev",
"Git",
"d",
"Avant un commit, quelle commande prépare les fichiers ?",
[
"git add",
"git push",
"git clone",
"git log"
],
"Exemple : git add . prépare tous les fichiers modifiés du dossier."
],
[
"d30",
"dev",
"Git",
"i",
"À quoi sert une branche ?",
[
"À travailler sur une nouveauté sans casser la version principale",
"À supprimer du code",
"À sauvegarder un mot de passe",
"À accélérer le PC"
],
"Quand c'est prêt, on fusionne la branche dans la principale (main), souvent via une pull request."
],
[
"d31",
"dev",
"Git",
"d",
"Que fait git clone suivi d'une adresse ?",
[
"Il copie tout un dépôt distant sur ton PC",
"Il crée un dépôt vide",
"Il fusionne deux branches",
"Il supprime le dépôt"
],
"git init crée un dépôt vide ; git clone récupère un dépôt existant."
],
[
"d32",
"dev",
"Python",
"d",
"Comment afficher du texte en Python ?",
[
"print(\"Bonjour\")",
"echo \"Bonjour\"",
"console.log(\"Bonjour\")",
"write \"Bonjour\""
],
"print() affiche dans le terminal. console.log, c'est en JavaScript."
],
[
"d33",
"dev",
"Python",
"d",
"En Python, comment sont délimités les blocs (if, for, def) ?",
[
"Par l'indentation (les espaces en début de ligne)",
"Par des accolades { }",
"Par des points-virgules",
"Par le mot END"
],
"La ligne se termine par « : » et le bloc est décalé, en général de 4 espaces."
],
[
"d34",
"dev",
"Python",
"d",
"Que renvoie len(\"chat\") ?",
[
"4",
"3",
"5",
"\"chat\""
],
"len() donne la longueur : ici 4 lettres."
],
[
"d35",
"dev",
"Python",
"d",
"Laquelle de ces écritures crée une liste en Python ?",
[
"[1, 2, 3]",
"(1, 2, 3)",
"{1, 2, 3}",
"<1, 2, 3>"
],
"Les crochets font une liste. Les parenthèses font un tuple, les accolades un ensemble (set)."
],
[
"d36",
"dev",
"Python",
"i",
"Qu'affiche ce code : for i in range(3): print(i) ?",
[
"0, 1 et 2",
"1, 2 et 3",
"0, 1, 2 et 3",
"Seulement 3"
],
"range(3) part de 0 et s'arrête avant 3."
],
[
"d37",
"dev",
"Python",
"i",
"Un dictionnaire Python…",
[
"Stocke des paires clé : valeur, ex. {\"nom\": \"Geoffroy\"}",
"Est une liste numérotée seulement",
"Est une fonction",
"Est une boucle"
],
"On lit une valeur avec sa clé : personne[\"nom\"]."
],
[
"d38",
"dev",
"Python",
"d",
"Le mot-clé def sert à…",
[
"Définir une fonction",
"Créer une variable",
"Supprimer un fichier",
"Importer un module"
],
"Exemple : def bonjour(nom): return \"Salut \" + nom"
],
[
"d39",
"dev",
"Python",
"i",
"Que fait pip install requests ?",
[
"Il installe le paquet Python « requests »",
"Il lance un programme",
"Il met à jour Windows",
"Il supprime Python"
],
"pip est le gestionnaire de paquets de Python. requests sert à faire des requêtes HTTP."
],
[
"d40",
"dev",
"Python",
"i",
"Combien vaut 10 // 3 en Python ?",
[
"3",
"3.33",
"1",
"30"
],
"// est la division entière. 10 / 3 donne 3.333…, et 10 % 3 donne le reste : 1."
],
[
"d41",
"dev",
"Web & API",
"d",
"HTTP, c'est…",
[
"Le protocole qu'utilisent navigateur et serveur pour échanger pages et données",
"Un langage de programmation",
"Un antivirus",
"Un type de câble"
],
"Le navigateur envoie une requête, le serveur renvoie une réponse."
],
[
"d42",
"dev",
"Web & API",
"d",
"Qu'apporte HTTPS par rapport à HTTP ?",
[
"Les échanges sont chiffrés (le cadenas dans le navigateur)",
"C'est plus rapide à coup sûr",
"C'est gratuit",
"Ça marche sans Internet"
],
"Le S veut dire Secure. Personne au milieu ne peut lire ce qui passe."
],
[
"d43",
"dev",
"Web & API",
"d",
"Que veut dire le code HTTP 404 ?",
[
"Page introuvable",
"Tout va bien",
"Erreur du serveur",
"Redirection"
],
"Codes 4xx = erreur côté client (mauvaise adresse, pas autorisé…)."
],
[
"d44",
"dev",
"Web & API",
"d",
"Que veut dire le code HTTP 200 ?",
[
"Succès, tout va bien",
"Page introuvable",
"Erreur du serveur",
"Accès refusé"
],
"Codes 2xx = succès."
],
[
"d45",
"dev",
"Web & API",
"d",
"Front-end et back-end, c'est…",
[
"Front = ce que l'utilisateur voit dans le navigateur ; back = le serveur, la base de données, la logique",
"L'inverse",
"Exactement la même chose",
"Front = le BIOS, back = Windows"
],
"Un développeur « full-stack » fait les deux."
],
[
"d46",
"dev",
"Web & API",
"d",
"Une API, c'est…",
[
"Une « porte » qui permet à deux programmes de communiquer selon des règles",
"Un écran",
"Un virus",
"Un navigateur"
],
"Exemple : une appli météo demande les prévisions à l'API d'un service météo."
],
[
"d47",
"dev",
"Web & API",
"d",
"Quel format de données est le plus utilisé par les API web ?",
[
"JSON",
"MP3",
"DOCX",
"PNG"
],
"Exemple : {\"ville\": \"Bagnolet\", \"temp\": 12}."
],
[
"d48",
"dev",
"Web & API",
"i",
"En HTTP, quelles méthodes pour lire des données et pour en envoyer ?",
[
"GET pour lire, POST pour envoyer ou créer",
"POST pour lire, GET pour envoyer",
"DELETE pour lire, PUT pour envoyer",
"PATCH pour tout"
],
"On trouve aussi PUT/PATCH pour modifier et DELETE pour supprimer."
],
[
"d49",
"dev",
"Web & API",
"i",
"Que veut dire un code HTTP 500 ?",
[
"Une erreur côté serveur",
"Succès",
"Page introuvable",
"Non connecté"
],
"Codes 5xx = le serveur a planté ou n'arrive pas à répondre."
],
[
"d50",
"dev",
"Web & API",
"i",
"Une clé API, c'est…",
[
"Un code secret qui identifie ton appli auprès d'un service : il ne faut jamais la publier",
"Une information publique",
"Le mot de passe du Wi-Fi",
"Un nom de domaine"
],
"On la garde dans un fichier .env, jamais dans le code envoyé sur GitHub."
],
[
"d51",
"dev",
"IA",
"d",
"Un LLM, c'est…",
[
"Un grand modèle de langage : une IA entraînée sur énormément de texte pour comprendre et écrire du texte",
"Un langage de programmation",
"Un câble réseau",
"Une base de données"
],
"LLM = Large Language Model. Exemples : Grok, ChatGPT, Gemini, Claude."
],
[
"d52",
"dev",
"IA",
"d",
"Un prompt, c'est…",
[
"La consigne ou le message qu'on donne à l'IA",
"La réponse de l'IA",
"Un virus",
"Un serveur"
],
"La qualité du prompt joue beaucoup sur la qualité de la réponse."
],
[
"d53",
"dev",
"IA",
"d",
"Qu'est-ce qui fait un bon prompt ?",
[
"Être précis : le contexte, la tâche et le format de réponse voulu",
"Un seul mot",
"Tout écrire en majuscules",
"Être le plus vague possible"
],
"Ex. : « Explique le DNS à un débutant en 5 lignes, avec un exemple. »"
],
[
"d54",
"dev",
"IA",
"d",
"Une « hallucination » d'IA, c'est…",
[
"Quand l'IA invente une info fausse en ayant l'air sûre d'elle",
"Un bug d'écran",
"Un rêve de l'ordinateur",
"Une mise à jour"
],
"Il faut vérifier les infos importantes avec une vraie source."
],
[
"d55",
"dev",
"IA",
"i",
"Un token (jeton), pour un LLM, c'est…",
[
"Un petit morceau de texte (un mot ou un bout de mot) que le modèle traite",
"Un jeton de casino",
"Un mot de passe",
"Un fichier"
],
"Les limites et les prix des IA se comptent souvent en tokens."
],
[
"d56",
"dev",
"IA",
"d",
"Les données d'entraînement, ce sont…",
[
"Les exemples (textes, images…) à partir desquels le modèle apprend",
"Les réponses de l'IA",
"La RAM du PC",
"Le prompt"
],
"Si les données sont mauvaises ou biaisées, le modèle le sera aussi."
],
[
"d57",
"dev",
"IA",
"d",
"Pourquoi éviter de donner des infos perso sensibles à une IA en ligne ?",
[
"Elles peuvent être stockées ou vues par le service",
"L'IA va planter",
"Ça coûte plus cher",
"Ça la rend plus lente"
],
"Pas de mots de passe, numéros de carte ni papiers d'identité dans un prompt."
],
[
"d58",
"dev",
"IA",
"i",
"La « fenêtre de contexte » d'un LLM, c'est…",
[
"La quantité de texte que le modèle peut prendre en compte à la fois",
"Une fenêtre de Windows",
"La taille de l'écran",
"Le navigateur"
],
"Au-delà, le modèle « oublie » le début de la conversation."
]
];
