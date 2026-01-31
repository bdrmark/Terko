export interface StoneType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const stoneTypes: StoneType[] = [
  {
    id: 'trevia-andezit-mix',
    name: 'Trevia Andezit Mix',
    description: 'Modern térkő elegáns andezit árnyalatokkal',
    imageUrl: 'https://koviterko.hu/wp-content/uploads/2022/07/Trevia-terko-andezit-mix-1-800x600-1.jpg',
  },
  {
    id: 'trevia-terra-mix',
    name: 'Trevia Terra Mix',
    description: 'Meleg földtónusú térkő mediterrán hangulattal',
    imageUrl: 'https://koviterko.hu/wp-content/uploads/2022/10/Trevia-terko-Terra-mix-600x600-1.jpg',
  },
  {
    id: 'trevia-homokszin',
    name: 'Trevia Homokszín',
    description: 'Világos homokszínű térkő modern kertekhez',
    imageUrl: 'https://koviterko.hu/wp-content/uploads/2022/08/Trevia-terko-Homokszin-b-kert-1200x1200-1-400x284-1.jpg',
  },
  {
    id: 'trevia-szurke',
    name: 'Trevia Szürke',
    description: 'Elegáns szürke térkő minimalista dizájnnal',
    imageUrl: 'https://koviterko.hu/wp-content/uploads/2022/08/Trevia-terko-szurke-ara-1-400x284-1.jpg',
  },
];
