export const errorMessages = {
    name: [
        { type: 'required', message: 'Indtast dit navn' },
        { type: 'minlength', message: 'Dit navn skal være minimum 2 karakterer.' },
      ],
      email: [
        { type: 'required', message: 'Indtast din email ' },
        { type: 'email', message: 'Ugyldig email, tjek evt formatet og prøv igen' },
      ],
      password: [
        {type: 'required', message: 'Indtast adgangskode'},
        {type: 'pattern', message: 'Din adgangskode overholder ikke formatet'},
        {type: 'minlength', message: 'Din adgangskode skal være 8 karakterer eller mere'}
      ],
      phone: [
        { type: 'required', message: 'Indtast telefonnummer'}
      ],
      age: [
        { type: 'required', message: 'Indtast en alder'}
      ],
      zipcode: [
        { type: 'required', message: 'Indtast et postnummer'},
        { type: 'minlength', message: 'Postnummer skal være minimum 4 karakterer'},
        { type: 'maxlength', message: 'Postnummer må maks være 4 karakterer'}
      ],
      city: [
        { type: 'required', message: 'Indtast en by'}
      ],
      title: [
        { type: 'required', message: 'Indtast navn på genstand'}
      ]
}