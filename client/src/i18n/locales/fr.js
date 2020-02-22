const fr = {
  login_screen: {
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    sign_in: "Se connecter",
    forget_password: "Mot de passe oublié",
    dont_have_an_account: "Vous n'avez pas de compte? S'inscrire",
    or: "OU"
  },
  register_screen: {
    sign_up: "S'inscrire",
    username: "Nom d'utilisateur",
    first_name: "Prénom",
    last_name: "nom de famille",
    email_address: "adresse email",
    password: "mot de passe",
    confirm_password: "Confirmez le mot de passe",
    have_an_account: "Vous avez déjà un compte? se connecter"
  },
  forgetpassword:{
    forgetpassword:'Mot de passe oublié',
    email_address:'adresse email',
    send:'ENVOYER'
  },
  controller: {
    sort: "Trier",
    title: "Titre",
    rating: "Avis",
    year: "Année",
    filter: "Filtre",
    genre: "Genre",
    genrelist: {
      action: "Action",
      adventure: "Aventure",
      comedy: "Comédie",
      drama: "Drame",
      fantasy: "Fantaisie",
      historical: "Historique",
      romance: "Romance",
      science_fiction: "Science fiction",
      western: "Occidental",
      all: "Tout"
    }
  },
  streaming: {
    home: "Accueil",
    library: "Bibliothèque",
    trailler: "Bande annonce",
    description: "La description",
    actor: "Acteur",
    duration: "Durée",
    director: "Réalisateur",
    quality: "Qualité",
    genres: "genres",
    production: "Production",
    language: "Langue",
    release: "Libération"
  },
  footer: {
    made_with: "Fabriqué avec",
    in_1337: " 1337"
  },
  auth_messages: {
    duplicate_email_scope_error:
      "Vous pouvez vous connecter à ce compte en utilisant Google ou 42 intranet",
    email_is_not_verified: "L'email n'est pas verifié",
    email_already_used: "Courriel déjà utilisé par un autre compte",
    verification_email_sent:
      "Un email de vérification vous est envoyé" /* store it in success message */,
    invalid_email_or_password: "Identifiant ou mot de passe incorrect",
    account_not_verified: "Le compte n'est pas vérifié",
    incorrect_password: "Mot de passe incorrect",
    username_not_exist: "Le nom d'utilisateur n'existe pas",
    connect_using_local_strategy:
      "Vous pouvez vous connecter à ce compte email à l'aide d'un nom d'utilisateur et d'un mot de passe",
    put_valid_user_pass:
      "Mettez un nom d'utilisateur et un mot de passe valides",
    put_valid_password: "Mettez un mot de passe valide",
    password_mismatch: "Inadéquation des mots de passe",
    username_is_required: "Nom d'utilisateur est nécessaire",
    username_must_not_contain_spaces:
      "le nom d'utilisateur ne doit pas contenir d'espaces",
    username_length_must_be_at_least_6_characters:
      "la longueur du nom d'utilisateur doit être d'au moins 6 caractères",
    username_length_can_be_maximum_50_chars:
      "la longueur du nom d'utilisateur peut être de 50 caractères maximum",
    Username_must_contain_only_Alphabetic_and_Numeric_characters:
      "Le nom d'utilisateur doit contenir uniquement des caractères alphabétiques et numériques",
    Password_is_required: "Mot de passe requis",
    Password_must_be_String: "Le mot de passe doit être String",
    Password_length_must_be_at_least_8_characters:
      "La longueur du mot de passe doit être d'au moins 8 caractères",
    Password_length_can_be_maximum_100_chars:
      "La longueur du mot de passe peut être de 100 caractères maximum",
    Password_must_contain_uppercase_letters_and_lowercase_letters_and_numbers:
      "Le mot de passe doit contenir des lettres majuscules et des lettres minuscules et des chiffres",
    email_is_required: "email est requis",
    Invalid_email: "Email invalide",
    first_name_is_required: "Le prénom est requis",
    first_name_must_be_String: "le prénom doit être String",
    first_name_must_be_at_least_1_character:
      "le prénom doit contenir au moins 1 caractère",
    last_name_is_required: "nom de famille est requis",
    last_name_must_be_String: "le nom de famille doit être String",
    last_name_must_be_at_least_1_character:
      "le nom de famille doit contenir au moins 1 caractère",
    Email_token_is_required: "Un jeton de messagerie est requis",
    Email_token_must_be_a_string: "Le jeton d'email doit être une chaîne",
    Email_token_must_be_at_least_1_character:
      "Le jeton d'email doit comporter au moins 1 caractère",
    Confirm_new_password_is_required:
      "Confirmer que le nouveau mot de passe est requis",
    Passwords_mismatch: "Inadéquation des mots de passe",
    Bad_email_or_email_token: "Mauvais e-mail ou email_token",
    token_does_not_exists: "le token n'existe pas",
    register_success_email_sent:
      "L'utilisateur a bien été inséré un email de vérification est envoyé",
    Reset_Password_Email_is_sent:
      "Le mot de passe de réinitialisation est envoyé",
    Account_Verified_Successfully: "Compte vérifié avec succès",
    token_exists: "le token existe",
    Email_does_not_belong_to_any_user:
      "L'email n'appartient à aucun utilisateur",
    This_account_does_not_have_a_password_you_can_connect_using_Google_or_42_Intranet_account:
      "Ce compte n'a pas de mot de passe, vous pouvez vous connecter en utilisant Google ou un compte Intranet 42",
    Password_updated_successfully: "Mot de passe mis à jour avec succès",
    first_name_must_be_only_alphabetical_chars: "le prénom ne doit être que des caractères alphabétiques",
    last_name_must_be_only_alphabetical_chars: "le nom de famille ne doit être que des caractères alphabétiques",
    username_must_contain_alphanumeric_and_hyphen_and_underscore_characters: "le nom d'utilisateur doit contenir des caractères alphanumériques et des tirets et des traits de soulignement"
  }
};
export default fr;
