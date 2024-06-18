import { UserEmblemI } from './user.entitie';

export interface EmblemI {
  id: number;
  slug: string;
  name: string;
  image: string;
  value: number;
  category: string;
  created_at: Date;
  UserEmblem: UserEmblemI[];
}

export const EmblemEnums = [
  {
    slug: 'cda',
    name: 'Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'cda',
    name: 'Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'cda',
    name: 'Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'valley',
    name: 'Cidade Alta Valley',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'valley',
    name: 'Cidade Alta Valley',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'valley',
    name: 'Cidade Alta Valley',
    image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'policia',
    name: 'Policia do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'policia',
    name: 'Policia do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'policia',
    name: 'Policia do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'hospital',
    name: 'Hospital do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'hospital',
    name: 'Hospital do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'hospital',
    name: 'Hospital do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'mecanica',
    name: 'Mecânica do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'mecanica',
    name: 'Mecânica do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'mecanica',
    name: 'Mecânica do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'taxi',
    name: 'Taxi do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'taxi',
    name: 'Taxi do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'taxi',
    name: 'Taxi do Cidade Alta',
    image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'coruja',
    name: 'Coruja',
    image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'coruja',
    name: 'Coruja',
    image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'coruja',
    name: 'Coruja',
    image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'hiena',
    name: 'Hiena',
    image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'hiena',
    name: 'Hiena',
    image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'hiena',
    name: 'Hiena',
    image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'gato',
    name: 'Gato',
    image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'gato',
    name: 'Gato',
    image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'gato',
    name: 'Gato',
    image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
    value: 30,
    category: 'ouro',
  },
  {
    slug: 'urso',
    name: 'Urso',
    image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
    value: 10,
    category: 'bronze',
  },
  {
    slug: 'urso',
    name: 'Urso',
    image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
    value: 20,
    category: 'prata',
  },
  {
    slug: 'urso',
    name: 'Urso',
    image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
    value: 30,
    category: 'ouro',
  },
];
